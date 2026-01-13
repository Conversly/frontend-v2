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

export default function IntegrationPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

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
  const handleSetup = async (platformId: string) => {
    const integration = integrations.find(i => i.id === platformId);

    if (!integration) return;

    if (integration.status === 'coming-soon') {
      toast.info(`${integration.name} integration is coming soon!`);
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
    toast.success('Integration disconnected');
  };

  // Get setup guide for selected platform
  const setupGuide = selectedPlatform ? getIntegrationSetupGuide(selectedPlatform) : null;

  // Get sidebar items for active integration
  const sidebarItems = activeIntegration ? getIntegrationSidebarItems(activeIntegration) : [];

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
            basePath={`/chatbot/${botId}/integration/${activeIntegration}`}
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

          {/* Feature Request */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="type-subtitle mb-1">
                  Don't see your integration?
                </h4>
                <p className="type-body-muted">
                  Request a new integration and we'll prioritize it for development
                </p>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm">
                Request Integration
              </Button>
            </div>
          </div>
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
    </div>
  );
}
