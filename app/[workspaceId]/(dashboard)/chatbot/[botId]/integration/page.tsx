'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HelpCircle, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { IntegrationCard, IntegrationSetupModal, IntegrationSidebar } from '@/components/chatbot/integration';
import {
  INTEGRATION_PLATFORMS,
  getIntegrationSetupGuide,
  getIntegrationSidebarItems
} from '@/lib/constants/integrations';
import { IntegrationConfig, IntegrationPlatform } from '@/types/integration';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinWaitlist } from "@/lib/api/waitlist";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, Mail, MessageSquare, ArrowRight } from "lucide-react";
import posthog from "posthog-js";

export default function IntegrationPage() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;

  if (!botId) {
    return null;
  }

  // State management
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(INTEGRATION_PLATFORMS);
  const [selectedPlatform, setSelectedPlatform] = useState<IntegrationPlatform | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState<IntegrationPlatform | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoadingIntegrations] = useState(false);

  // Integration Request State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState("");

  // Filter integrations by category
  const filteredIntegrations = useMemo(() => {
    if (categoryFilter === 'all') return integrations;
    return integrations.filter(integration => integration.category === categoryFilter);
  }, [integrations, categoryFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(integrations.map(i => i.category)));
    return ['all', ...cats];
  }, [integrations]);

  // Handle setup initiation
  // Handle setup initiation
  const handleSetup = async (platformId: string) => {
    posthog.capture("integration_setup_clicked", {
      chatbot_id: botId,
      integration_id: platformId,
    });

    const integration = integrations.find(i => i.id === platformId);

    if (!integration) return;

    if (integration.status === 'coming-soon') {
      // Pre-fill the request modal with this integration's name
      setIntegrationName(integration.name);
      setIsRequestModalOpen(true);
      return;
    }

    if (integration.status === 'connected') {
      // If already connected, show the integration sidebar
      setActiveIntegration(platformId as IntegrationPlatform);
      return;
    }

    // Open setup modal for platforms
    setSelectedPlatform(platformId as IntegrationPlatform);
    setIsSetupModalOpen(true);
  };

  // Handle connection
  const handleConnect = async (credentials: Record<string, string>) => {
    if (!selectedPlatform || !botId) return;

    try {
      setIsSetupModalOpen(false);

      // For platforms, use placeholder implementation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update integration status
      setIntegrations(prev =>
        prev.map(integration =>
          integration.id === selectedPlatform
            ? { ...integration, status: 'connected' as const }
            : integration
        )
      );

      // Show the integration sidebar
      setActiveIntegration(selectedPlatform);
      posthog.capture("integration_connected", {
        chatbot_id: botId,
        integration_id: selectedPlatform,
      });
      toast.success(`${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} connected successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect integration');
      console.error('Connection error:', error);
    }
  };

  // Handle disconnection
  const handleDisconnect = (platformId: IntegrationPlatform) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === platformId
          ? { ...integration, status: 'not-connected' as const }
          : integration
      )
    );
    setActiveIntegration(null);
    posthog.capture("integration_disconnected", {
      chatbot_id: botId,
      integration_id: platformId,
    });
    toast.success('Integration disconnected');
  };

  // Get setup guide for selected platform
  const setupGuide = selectedPlatform ? getIntegrationSetupGuide(selectedPlatform) : null;

  // Get sidebar items for active integration
  const sidebarItems = activeIntegration ? getIntegrationSidebarItems(activeIntegration) : [];

  const handleRequestSubmit = async () => {
    posthog.capture("integration_request_submit_clicked", {
      chatbot_id: botId
    });

    if (!integrationName.trim()) {
      setRequestError("Please enter an integration name");
      return;
    }
    if (!requestEmail.trim()) {
      setRequestError("Please enter your email address");
      return;
    }

    // Basic email validation
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
      posthog.capture("integration_requested", {
        chatbot_id: botId,
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

  const resetRequestForm = () => {
    setIsRequestSuccess(false);
    setIntegrationName("");
    setRequestEmail("");
    setRequestError("");
  };

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const availableIntegrations = filteredIntegrations.filter(i => i.status !== 'connected');

  if (isLoadingIntegrations) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full relative">
      {/* Integration Sidebar (appears after connection) */}
      {activeIntegration && sidebarItems.length > 0 && (
        <div className="animate-in slide-in-from-left duration-300">
          <IntegrationSidebar
            platform={activeIntegration}
            items={sidebarItems}
            basePath={`/${workspaceId}/chatbot/${botId}/integration/${activeIntegration}`}
            onClose={() => {
              setActiveIntegration(null);
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-background overflow-y-auto">
        <div className="container mx-auto px-6 py-6 max-w-[1920px] space-y-8">
          {/* Header & Filters */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="page-header mb-0">
              <h1 className="page-title">
                Integrations
              </h1>
              <p className="page-subtitle">
                Connect your Agent to external services and platforms to extend functionality
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <Filter className="w-4 h-4" />
                <span>Filter by:</span>
              </div>
              <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
                <TabsList className="bg-muted/50 h-9">
                  {categories.map(category => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                    >
                      {category === 'all' ? 'All' : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          <Separator className="-mt-6 mb-8" />

          {/* Connected Integrations Section */}
          {connectedIntegrations.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top duration-500">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                <h2 className="type-section-title">
                  Active Integrations
                </h2>
                <span className="px-2.5 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                  {connectedIntegrations.length}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {connectedIntegrations.map(integration => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                    onSetup={handleSetup}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Available Integrations Section */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between">
              <h2 className="type-section-title">
                {connectedIntegrations.length > 0
                  ? 'Available Integrations'
                  : 'Connect Your First Integration'}
              </h2>
              {availableIntegrations.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {availableIntegrations.length} available
                </span>
              )}
            </div>
            {availableIntegrations.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableIntegrations.map(integration => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                    onSetup={handleSetup}
                  />
                ))}

                {/* Request New Integration Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-2 border-dashed border-border hover:border-primary/50 cursor-pointer group flex flex-col"
                    onClick={() => setIsRequestModalOpen(true)}
                  >
                    <div className="p-6 space-y-4 flex flex-col h-full">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20 group-hover:border-primary/30 bg-muted/30 group-hover:bg-primary/5 transition-all duration-300">
                        <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <div className="space-y-2 flex-1">
                        <h3 className="type-section-title group-hover:text-primary transition-colors">
                          Request Integration
                        </h3>
                        <p className="type-body-muted line-clamp-2 leading-relaxed">
                          Don't see what you need? Request a new integration and we'll prioritize it.
                        </p>
                      </div>

                      <div className="pt-2 mt-auto">
                        <Button
                          variant="outline"
                          className="w-full justify-between group-hover:border-primary/30 group-hover:text-primary"
                        >
                          Request Access
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="type-section-title mb-2">
                  All integrations connected!
                </h3>
                <p className="type-body-muted">
                  You've connected all available integrations. More coming soon!
                </p>
              </div>
            )}
          </div>

          {/* Request Integration Feature */}


          {/* Feature Request */}

        </div>
      </div>

      {/* Setup Modal */}
      {setupGuide && (
        <IntegrationSetupModal
          isOpen={isSetupModalOpen}
          onClose={() => {
            setIsSetupModalOpen(false);
            setSelectedPlatform(null);
          }}
          setupGuide={setupGuide}
          onConnect={handleConnect}
        />
      )}
      {/* Request Integration Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={(open) => {
        setIsRequestModalOpen(open);
        if (!open) setTimeout(resetRequestForm, 300);
      }}>
        <DialogContent className="sm:max-w-[425px] overflow-hidden border-border bg-background shadow-lg">
          <AnimatePresence mode="wait">
            {!isRequestSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Request Integration
                  </DialogTitle>
                  <DialogDescription>
                    Tell us which tool you want to connect, and we'll notify you when it's ready.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="int-name" className="text-sm font-semibold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Integration Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="int-name"
                      placeholder="e.g. Salesforce, HubSpot, Jira..."
                      value={integrationName}
                      onChange={(e) => setIntegrationName(e.target.value)}
                      disabled={isRequestSubmitting}
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="req-email" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="req-email"
                      type="email"
                      placeholder="Where should we notify you?"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      disabled={isRequestSubmitting}
                      className={requestError && !requestEmail ? "border-destructive" : ""}
                    />
                  </div>

                  {requestError && (
                    <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                      {requestError}
                    </p>
                  )}
                </div>

                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setIsRequestModalOpen(false)} disabled={isRequestSubmitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleRequestSubmit} disabled={isRequestSubmitting} className="min-w-[100px]">
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
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Request Received!</h3>
                <p className="text-muted-foreground max-w-[280px] mb-6 text-sm">
                  Thank you for your feedback. We've added <strong>{integrationName}</strong> to our roadmap wishlist.
                </p>
                <Button onClick={() => setIsRequestModalOpen(false)} className="w-full sm:w-auto">
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
