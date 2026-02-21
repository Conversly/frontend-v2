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
import { Loader2, Plus, Sparkles, CheckCircle2, Globe, FileText, MessageSquare, AlignLeft } from "lucide-react";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import posthog from "posthog-js";

export type SourceCategory = 'all' | 'URL' | 'DOCUMENT' | 'QNA' | 'TXT';

interface SourcesCategorySidebarProps {
  selectedCategory: SourceCategory;
  onCategoryChange: (category: SourceCategory) => void;
  onAddKnowledge: () => void;
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

export function SourcesCategorySidebar({
  selectedCategory,
  onCategoryChange,
  onAddKnowledge,
  sourceCounts = { all: 0, URL: 0, DOCUMENT: 0, QNA: 0, TXT: 0 }
}: SourcesCategorySidebarProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState("");

  const resetRequestForm = () => {
    setIsRequestSuccess(false);
    setIntegrationName("");
    setRequestEmail("");
    setRequestError("");
  };

  const handleRequestSubmit = async () => {
    // Just the submit click
    posthog.capture("data_source_integration_submit_clicked");

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
      posthog.capture("data_source_integration_requested", {
        integration_name: integrationName,
        email: requestEmail,
      });
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
    <div className="w-[240px] border-r border-border bg-card h-full flex flex-col overflow-hidden">
      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Source Categories */}
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = sourceCounts[category.id];
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isSelected
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-[--sidebar-accent] hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{category.label}</span>
                {count > 0 && (
                  <span className={cn(
                    'text-2xs px-2 py-0.5 rounded-full font-medium',
                    isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Request Integration */}
        <div className="mt-auto p-2 pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-[--sidebar-accent]"
            onClick={() => {
              posthog.capture("data_source_request_integration_clicked");
              setIsRequestModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="type-body font-medium">Request Integration</span>
          </Button>
        </div>
      </div>

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
