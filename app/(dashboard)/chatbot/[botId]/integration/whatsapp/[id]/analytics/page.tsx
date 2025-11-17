'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Card } from '@/components/ui/card';
import { Loader2, MessageCircle, Users, TrendingUp, Clock } from 'lucide-react';
import { getWhatsAppIntegration, getWhatsAppAnalytics, getWhatsAppAnalyticsPerDay } from '@/lib/api/whatsapp';
import { toast } from 'sonner';

export default function WhatsAppAnalyticsPage() {
  const routeParams = useParams<{ botId: string; id: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  const sidebarItems = getIntegrationSidebarItems('whatsapp');
  const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!botId || !integrationId) return;
      
      setIsLoading(true);
      try {
        const analyticsData = await getWhatsAppAnalytics(botId, integrationId);
        setAnalytics(analyticsData);
      } catch (error: any) {
        toast.error('Failed to load analytics: ' + (error.message || 'Unknown error'));
        console.error('Error fetching analytics:', error);
        // Set default values on error
        setAnalytics({
          totalMessages: 0,
          totalContacts: 0,
          activeConversations: 0,
          userMessages: 0,
          aiResponses: 0,
          agentResponses: 0,
          uniqueWhatsappConversations: 0,
          uniqueContacts: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [botId, integrationId]);

  if (isLoading) {
    return (
      <div className="flex h-full">
        <IntegrationSidebar
          platform="whatsapp"
          items={sidebarItems}
          basePath={basePath}
          onClose={() => router.push(`/chatbot/${botId}/integration`)}
        />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* WhatsApp Sidebar - Left Side */}
      <IntegrationSidebar
        platform="whatsapp"
        items={sidebarItems}
        basePath={basePath}
        onClose={() => router.push(`/chatbot/${botId}/integration`)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  WhatsApp Analytics
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your WhatsApp integration performance and engagement
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-foreground">
                    {analytics?.totalMessages || 0}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>User: {analytics?.userMessages || 0}</span>
                    <span>AI: {analytics?.aiResponses || 0}</span>
                    <span>Agent: {analytics?.agentResponses || 0}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Contacts</p>
                  <p className="text-3xl font-bold text-foreground">
                    {analytics?.uniqueContacts || analytics?.totalContacts || 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unique contacts
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conversations</p>
                  <p className="text-3xl font-bold text-foreground">
                    {analytics?.uniqueWhatsappConversations || analytics?.activeConversations || 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unique conversations
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Placeholder for charts */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Message Trends</h2>
            <div className="flex items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Analytics charts coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

