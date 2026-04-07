'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinWaitlist } from "@/lib/api/waitlist";
import { Loader2, Plus, Sparkles, CheckCircle2, Globe, FileText, MessageSquare, AlignLeft, Clock, Mail } from "lucide-react";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PendingSourcesPanel } from "./PendingSourcesPanel";
import { UpgradeDialog } from "@/components/billingsdk/UpgradeDialog";
import { useSubscription } from "@/contexts/subscription-context";
import Image from "next/image";

export type SourceCategory = 'all' | 'URL' | 'DOCUMENT' | 'QNA' | 'TXT';

interface SourcesCategorySidebarProps {
  selectedCategory: SourceCategory;
  onCategoryChange: (category: SourceCategory) => void;
  onAddKnowledge: () => void;
  chatbotId: string;
  sourceCounts?: {
    all: number;
    URL: number;
    DOCUMENT: number;
    QNA: number;
    TXT: number;
  };
}

const categories = [
  { id: 'all' as const, label: 'All Sources', icon: FileText },
  { id: 'URL' as const, label: 'Websites', icon: Globe },
  { id: 'DOCUMENT' as const, label: 'Documents', icon: FileText },
  { id: 'QNA' as const, label: 'Q&A', icon: MessageSquare },
  { id: 'TXT' as const, label: 'Text', icon: AlignLeft },
];

const comingSoonIntegrations = [
  { id: 'notion', label: 'Notion', logo: '/integrations/notion.png' },
  { id: 'confluence', label: 'Confluence', logo: '/integrations/confluence.png' },
];

export function SourcesCategorySidebar({
  selectedCategory,
  onCategoryChange,
  onAddKnowledge,
  chatbotId,
  sourceCounts = { all: 0, URL: 0, DOCUMENT: 0, QNA: 0, TXT: 0 }
}: SourcesCategorySidebarProps) {
  const { subscription, accountStatus } = useSubscription();
  const isPaidUser = (
    accountStatus === 'ACTIVE' &&
    (subscription?.planName?.toLowerCase() === 'standard' || subscription?.planName?.toLowerCase() === 'pro')
  );

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState("");

  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonIntegrationName, setComingSoonIntegrationName] = useState("");
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

  const handleIntegrationClick = (name: string) => {
    if (isPaidUser) {
      setComingSoonIntegrationName(name);
      setIsComingSoonOpen(true);
    } else {
      setIsUpgradeDialogOpen(true);
    }
  };

  const resetRequestForm = () => {
    setIsRequestSuccess(false);
    setIntegrationName("");
    setRequestEmail("");
    setRequestError("");
  };

  const handleRequestSubmit = async () => {
    if (!integrationName.trim()) {
      setRequestError("Please specify the integration name");
      return;
    }

    if (!requestEmail.trim()) {
      setRequestError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestEmail)) {
      setRequestError("Please enter a valid email address");
      return;
    }

    setIsRequestSubmitting(true);
    setRequestError("");

    try {
      await joinWaitlist({
        email: requestEmail,
        comments: `Integration Request: ${integrationName}`,
      });
      setIsRequestSuccess(true);
      toast.success("Request submitted successfully!");
    } catch (error: any) {
      console.error("Integration request error:", error);
      setRequestError(error.message || "Failed to submit request");
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-[272px] flex-col overflow-hidden border-r border-sidebar-border/80 bg-sidebar">
      <div className="border-b border-sidebar-border/70 px-4 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Knowledge Base</p>
        <p className="mt-1 text-sm font-semibold text-foreground">Sources & training queue</p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Source Categories */}
        <div className="space-y-1.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = sourceCounts[category.id];
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition-all',
                  isSelected
                    ? 'border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-primary shadow-xs'
                    : 'border-transparent text-muted-foreground hover:border-sidebar-border/60 hover:bg-sidebar-accent/60 hover:text-foreground'
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background shadow-xs transition-colors",
                  isSelected
                    ? "text-sidebar-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="min-w-0 flex-1 text-left font-medium">{category.label}</span>
                {count > 0 && (
                  <span className={cn(
                    'rounded-full border px-2 py-0.5 text-2xs font-medium',
                    isSelected
                      ? 'border-sidebar-border/70 bg-background text-sidebar-primary'
                      : 'border-sidebar-border/60 bg-background text-muted-foreground'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Coming Soon Integrations */}
        <div className="mt-4 border-t border-sidebar-border/60 pt-4">
          <p className="px-1 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">Integrations</p>
          <div className="space-y-1.5">
            {comingSoonIntegrations.map((integration) => (
              <button
                key={integration.id}
                onClick={() => handleIntegrationClick(integration.label)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm text-muted-foreground transition-all hover:border-sidebar-border/60 hover:bg-sidebar-accent/60 hover:text-foreground"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-background shadow-xs">
                  <Image src={integration.logo} alt={integration.label} width={20} height={20} className="object-contain" />
                </div>
                <span className="min-w-0 flex-1 text-left font-medium">{integration.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Request Integration */}
        <div className="mt-auto border-t border-sidebar-border/60 p-2 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start border-sidebar-border/70 bg-background text-muted-foreground shadow-xs hover:bg-sidebar-accent/60 hover:text-foreground"
            onClick={() => setIsRequestModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="type-body font-medium">Request Integration</span>
          </Button>
        </div>
      </div>

      {/* Pending Sources Panel (at bottom of sidebar) */}
      <div className="mt-auto border-t border-sidebar-border/60 bg-sidebar p-4">
        <PendingSourcesPanel chatbotId={chatbotId} />
      </div>

      {/* Coming Soon Modal (for paid Standard/Pro users) */}
      <Dialog open={isComingSoonOpen} onOpenChange={setIsComingSoonOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-border bg-background shadow-2xl gap-0">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle className="text-xl font-bold mb-2">
              {comingSoonIntegrationName} — Coming Soon
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed mb-6">
              We're actively building the <strong>{comingSoonIntegrationName}</strong> integration. As a valued subscriber, you'll get early access as soon as it's ready.
            </DialogDescription>
            <a
              href={`mailto:support@conversly.ai?subject=${encodeURIComponent(`Early access: ${comingSoonIntegrationName} integration`)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mb-3"
            >
              <Mail className="w-4 h-4" />
              Get notified by email
            </a>
            <Button variant="ghost" size="sm" onClick={() => setIsComingSoonOpen(false)} className="text-muted-foreground">
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upgrade Dialog (for free/hobby users) */}
      <UpgradeDialog
        open={isUpgradeDialogOpen}
        onOpenChange={setIsUpgradeDialogOpen}
        title="Unlock third-party integrations"
        description="Upgrade your plan to connect Notion, Confluence, and more as knowledge sources for your chatbot."
      />

      {/* Request Integration Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={(open) => {
        setIsRequestModalOpen(open);
        if (!open) setTimeout(resetRequestForm, 300);
      }}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-background shadow-2xl gap-0">
          <AnimatePresence mode="wait">
            {!isRequestSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <div className="p-6 pb-0">
                  <DialogHeader className="mb-6 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="type-page-title">
                      Request Integration
                    </DialogTitle>
                    <DialogDescription className="type-body-muted text-base leading-relaxed">
                      Looking for a specific data source or integration? Let us know what you need and we'll prioritize it.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="integration-name" className="type-micro-heading flex items-center gap-1">
                        Integration Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="integration-name"
                        placeholder="e.g. Notion, Hubspot, Google Drive..."
                        value={integrationName}
                        onChange={(e) => setIntegrationName(e.target.value)}
                        disabled={isRequestSubmitting}
                        className="h-11 bg-muted/30 focus:bg-background transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="req-email" className="type-micro-heading flex items-center gap-1">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="req-email"
                        type="email"
                        placeholder="you@company.com"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        disabled={isRequestSubmitting}
                        className={`h-11 bg-muted/30 focus:bg-background transition-colors ${requestError && (!requestEmail || (requestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestEmail))) ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>

                    {requestError && (
                      <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        {requestError}
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="p-6 pt-8 bg-muted/20 mt-6 border-t border-border/50">
                  <Button variant="ghost" onClick={() => setIsRequestModalOpen(false)} disabled={isRequestSubmitting} className="mr-auto hover:bg-background">
                    Cancel
                  </Button>
                  <Button onClick={handleRequestSubmit} disabled={isRequestSubmitting} size="lg" className="min-w-[140px] shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all">
                    {isRequestSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </DialogFooter>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Request Received!</h3>
                <p className="text-muted-foreground max-w-[300px] mb-8">
                  We've noted your request for <strong>{integrationName}</strong>. We'll verify the details and notify you at <strong>{requestEmail}</strong>.
                </p>
                <Button onClick={() => setIsRequestModalOpen(false)} size="lg" className="w-full sm:w-auto min-w-[140px]">
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
