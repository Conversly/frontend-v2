'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function IntegrationPage() {
  const routeParams = useParams<{ botId: string }>();
  const router = useRouter();
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
  const [isLoadingIntegrations, setIsLoadingIntegrations] = useState(true);

  // Get webhook URL for the current bot
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
  const webhookUrl = process.env.NEXT_PUBLIC_WHATSAPP_WEBHOOK_URL || "https://webhook-wa-mcnp.onrender.com/webhook";

  // Check WhatsApp integration status on mount
  useEffect(() => {
    const checkWhatsAppIntegration = async () => {
      if (!botId) return;
      
      try {
        const { getWhatsAppIntegration } = await import('@/lib/api/whatsapp');
        const whatsappIntegration = await getWhatsAppIntegration(botId);
        
        if (whatsappIntegration) {
          // Update WhatsApp integration status to connected
          setIntegrations(prev =>
            prev.map(integration =>
              integration.id === 'whatsapp'
                ? { ...integration, status: 'connected' as const }
                : integration
            )
          );
        }
      } catch (error: any) {
        // Integration doesn't exist or error occurred
        if (!error.message?.includes('not found')) {
          console.error('Error checking WhatsApp integration:', error);
        }
        // Ensure WhatsApp is marked as not-connected if no integration exists
        setIntegrations(prev =>
          prev.map(integration =>
            integration.id === 'whatsapp'
              ? { ...integration, status: 'not-connected' as const }
              : integration
          )
        );
      } finally {
        setIsLoadingIntegrations(false);
      }
    };

    checkWhatsAppIntegration();
  }, [botId]);

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
      // If already connected, redirect to integration page
      if (platformId === 'whatsapp') {
        // Get WhatsApp integration ID
        try {
          const { getWhatsAppIntegration } = await import('@/lib/api/whatsapp');
          const whatsappIntegration = await getWhatsAppIntegration(botId);
          if (whatsappIntegration?.id) {
            router.push(`/chatbot/${botId}/integration/whatsapp/${whatsappIntegration.id}`);
          } else {
            router.push(`/chatbot/${botId}/integration/whatsapp`);
          }
        } catch (error) {
          router.push(`/chatbot/${botId}/integration/whatsapp`);
        }
      } else {
        setActiveIntegration(platformId as IntegrationPlatform);
      }
      return;
    }

    // For WhatsApp, redirect to setup page instead of modal
    if (platformId === 'whatsapp') {
      router.push(`/chatbot/${botId}/integration/whatsapp`);
      return;
    }

    // Open setup modal for other platforms
    setSelectedPlatform(platformId as IntegrationPlatform);
    setIsSetupModalOpen(true);
  };

  // Handle connection
  const handleConnect = async (credentials: Record<string, string>) => {
    if (!selectedPlatform || !botId) return;

    try {
      setIsSetupModalOpen(false);
      
      if (selectedPlatform === 'whatsapp') {
        // Import WhatsApp API function
        const { createWhatsAppIntegration } = await import('@/lib/api/whatsapp');
        
        const result = await createWhatsAppIntegration({
          chatbotId: botId, // UUID string
          phoneNumberId: credentials.phoneNumberId,
          accessToken: credentials.accessToken,
          verifyToken: credentials.verifyToken,
          webhookSecret: credentials.webhookSecret,
          businessAccountId: credentials.businessAccountId,
          webhookUrl: credentials.webhookUrl || webhookUrl,
        });
        
        // Redirect to WhatsApp integration page after successful setup
        if (result?.id) {
          router.push(`/chatbot/${botId}/integration/whatsapp/${result.id}`);
        } else {
          router.push(`/chatbot/${botId}/integration/whatsapp`);
        }
      } else {
        // For other platforms, use placeholder
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Update integration status
        setIntegrations(prev =>
          prev.map(integration =>
            integration.id === selectedPlatform
              ? { ...integration, status: 'connected' as const }
              : integration
          )
        );

        // Show the integration sidebar and collapse main sidebar
        setActiveIntegration(selectedPlatform);
        toast.success(`${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} connected successfully!`);
      }
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
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-background overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
          <div className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Integrations
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Connect your Agent to external services and platforms to extend functionality
                  </p>
                </div>
              </div>
          </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Filter by:</span>
              </div>
              <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
                <TabsList className="bg-muted/50">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {category === 'all' ? 'All' : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
                  </div>
                </div>

          {/* Connected Integrations Section */}
          {connectedIntegrations.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top duration-500">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                <h2 className="text-2xl font-semibold text-foreground">
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
              <h2 className="text-2xl font-semibold text-foreground">
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
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  All integrations connected!
                </h3>
                <p className="text-sm text-muted-foreground">
                  You've connected all available integrations. More coming soon!
                </p>
            </div>
          )}
        </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Check out our comprehensive integration guides and documentation
                  </p>
                </div>
              </div>
                <Button
                variant="outline" 
                asChild
                className="bg-background hover:bg-muted border-border shadow-sm"
              >
                <a 
                  href="https://docs.conversly.ai/integrations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
                </Button>
              </div>
        </div>

          {/* Feature Request */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Don't see your integration?
                </h4>
                <p className="text-sm text-muted-foreground">
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

      {/* Integration Sidebar (appears after connection) */}
      {activeIntegration && sidebarItems.length > 0 && (
        <div className="animate-in slide-in-from-right duration-300">
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
          webhookUrl={selectedPlatform === 'whatsapp' ? webhookUrl : undefined}
        />
      )}
    </div>
  );
}
