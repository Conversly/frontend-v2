'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Trash2, MessageCircle, AlertTriangle } from 'lucide-react';
import { getWhatsAppIntegration, deleteWhatsAppIntegration } from '@/lib/api/whatsapp';
import { WhatsAppIntegrationResponse } from '@/types/integration';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function WhatsAppProfilePage() {
  const routeParams = useParams<{ botId: string; id: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

  const [integration, setIntegration] = useState<WhatsAppIntegrationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const sidebarItems = getIntegrationSidebarItems('whatsapp');
  const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

  useEffect(() => {
    const fetchIntegration = async () => {
      if (!botId) return;
      
      setIsLoading(true);
      try {
        const data = await getWhatsAppIntegration(botId);
        setIntegration(data);
      } catch (error: any) {
        toast.error('Failed to load integration: ' + (error.message || 'Unknown error'));
        console.error('Error fetching integration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntegration();
  }, [botId]);

  const handleDeleteIntegration = async () => {
    if (!botId) return;

    setIsDeleting(true);
    try {
      await deleteWhatsAppIntegration(botId);
      toast.success('WhatsApp integration removed successfully');
      router.push(`/chatbot/${botId}/integration`);
    } catch (error: any) {
      toast.error('Failed to remove integration: ' + (error.message || 'Unknown error'));
      console.error('Error deleting integration:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

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
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  WhatsApp Integration Profile
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your WhatsApp Business API integration settings
                </p>
              </div>
            </div>
          </div>

          {/* Integration Details */}
          {integration && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Integration Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone Number ID</label>
                      <p className="text-sm text-foreground mt-1 font-mono">{integration.phoneNumberId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Business Account ID</label>
                      <p className="text-sm text-foreground mt-1">
                        {integration.businessAccountId || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Webhook URL</label>
                      <p className="text-sm text-foreground mt-1 break-all font-mono">
                        {integration.webhookUrl || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created At</label>
                      <p className="text-sm text-foreground mt-1">
                        {integration.createdAt
                          ? new Date(integration.createdAt).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/50">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h2>
                <p className="text-sm text-muted-foreground">
                  Removing this integration will disconnect your WhatsApp account and stop all messaging functionality.
                  This action cannot be undone.
                </p>
              </div>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Integration
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Remove WhatsApp Integration?
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                      Are you sure you want to remove this WhatsApp integration? This will:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Disconnect your WhatsApp Business API account</li>
                        <li>Stop all incoming and outgoing messages</li>
                        <li>Delete all integration settings</li>
                      </ul>
                      <strong className="block mt-3">This action cannot be undone.</strong>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteIntegration}
                      disabled={isDeleting}
                      variant="destructive"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Removing...
                        </>
                      ) : (
                        'Remove Integration'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

