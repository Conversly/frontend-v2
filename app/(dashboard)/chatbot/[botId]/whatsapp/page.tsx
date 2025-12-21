'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { getWhatsAppIntegration, createWhatsAppIntegration } from '@/lib/api/whatsapp';
import { Loader2, ArrowLeft, Copy, CheckCircle2, MessageCircle, ExternalLink, Check } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_SETUP_GUIDE } from '@/lib/constants/integrations';
import { cn } from '@/lib/utils';

export default function WhatsAppSetupPage() {
  const routeParams = useParams<{ botId: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingIntegration, setExistingIntegration] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState({
    phoneNumberId: '',
    accessToken: '',
    verifyToken: '',
    businessAccountId: '',
  });

  const webhookUrl = `https://response.apps.verlyai.xyz/whatsapp/webhook/${botId}`;
  const setupSteps = WHATSAPP_SETUP_GUIDE.steps;

  useEffect(() => {
    const checkExistingIntegration = async () => {
      if (!botId) return;

      try {
        const integration = await getWhatsAppIntegration(botId);
        if (integration) {
          setExistingIntegration(integration);
          // Redirect to live-chat page by default
          router.push(`/chatbot/${botId}/whatsapp/${integration.id}/live-chat`);
        }
      } catch (error: any) {
        // Integration doesn't exist, show setup form
        if (!error.message?.includes('not found')) {
          console.error('Error checking integration:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingIntegration();
  }, [botId, router]);

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const generateVerifyToken = () => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setCredentials(prev => ({ ...prev, verifyToken: token }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.phoneNumberId || !credentials.accessToken || !credentials.verifyToken || !credentials.businessAccountId || !(credentials as any).phoneNumber) {
      toast.error('Please fill in all required fields (Phone Number ID, Access Token, Verify Token, Business Account ID, and Phone Number)');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createWhatsAppIntegration({
        chatbotId: botId,
        phoneNumberId: credentials.phoneNumberId,
        accessToken: credentials.accessToken,
        verifyToken: credentials.verifyToken,
        businessAccountId: credentials.businessAccountId,
        phoneNumber: (credentials as any).phoneNumber,
        webhookUrl: webhookUrl,
      });

      toast.success('WhatsApp integration created successfully!');

      // Redirect to live-chat page by default
      if (result?.id) {
        router.push(`/chatbot/${botId}/whatsapp/${result.id}/live-chat`);
      } else {
        router.push(`/chatbot/${botId}/whatsapp`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create WhatsApp integration');
      console.error('Error creating integration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Checking integration status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/5 via-background to-background pointer-events-none" />

      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-green-500/20">
              <MessageCircle className="w-6 h-6 text-white text-fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                Connect WhatsApp
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Add a WhatsApp Business number to your chatbot
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 w-full bg-muted/20 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">

          {/* Quick Connect Option */}
          <Button
            type="button"
            className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold gap-2 w-full sm:max-w-xs mx-auto"
            onClick={() => toast.info('Facebook Embedded Signup would launch here')}
          >
            <span className="font-bold">Connect with Facebook</span>
          </Button>
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or Connect Manually</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 1. Webhook Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">1</div>
                <h2 className="text-lg font-semibold">Webhook Configuration</h2>
              </div>

              <Card className="p-6 border-border shadow-sm bg-card/80 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                      <ExternalLink className="w-4 h-4" />
                      Meta Developer Console
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Go to your <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Meta App Dashboard</a> → WhatsApp → Configuration.
                      Paste the values below into the "Webhook" section.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Webhook URL</Label>
                      <div className="flex gap-2">
                        <Input readOnly value={webhookUrl} className="bg-muted font-mono text-xs" />
                        <Button type="button" size="icon" variant="outline" onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Verify Token</Label>
                      <div className="flex gap-2">
                        <Input readOnly value={credentials.verifyToken} className="bg-muted font-mono text-xs"
                          placeholder="Generate a token..." />
                        {credentials.verifyToken ? (
                          <Button type="button" size="icon" variant="outline" onClick={() => copyToClipboard(credentials.verifyToken, 'Verify Token')}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button type="button" variant="secondary" onClick={generateVerifyToken} className="whitespace-nowrap px-3">
                            Generate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* 2. Credentials */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">2</div>
                <h2 className="text-lg font-semibold">API Credentials</h2>
              </div>

              <Card className="p-6 border-border shadow-sm bg-card/80 backdrop-blur-sm">
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Find these in <strong>WhatsApp → API Setup</strong> in your Meta App Dashboard.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Phone Number ID <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="e.g. 1045923..."
                        value={credentials.phoneNumberId}
                        onChange={(e) => handleInputChange('phoneNumberId', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Access Token <span className="text-destructive">*</span>
                        <span className="text-xs text-muted-foreground font-normal ml-2">(System User Token recommended)</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="EAAG..."
                        value={credentials.accessToken}
                        onChange={(e) => handleInputChange('accessToken', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>WhatsApp Business Account ID <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="e.g. 1002938..."
                        value={credentials.businessAccountId}
                        onChange={(e) => handleInputChange('businessAccountId', e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Found in Meta Business Manager → WhatsApp → Phone Numbers
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="e.g. +1234567890"
                        value={(credentials as any).phoneNumber || ''}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        The WhatsApp Business phone number in E.164 format (e.g., +1234567890)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="pt-8 pb-12 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white min-w-[160px] shadow-md"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Connect WhatsApp
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

