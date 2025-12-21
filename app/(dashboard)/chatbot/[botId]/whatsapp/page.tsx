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

  const webhookUrl = process.env.NEXT_PUBLIC_WHATSAPP_WEBHOOK_URL || "https://webhook-wa-mcnp.onrender.com/webhook";
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

    if (!credentials.phoneNumberId || !credentials.accessToken || !credentials.verifyToken) {
      toast.error('Please fill in all required fields');
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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/chatbot/${botId}`}>
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  WhatsApp Integration Setup
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connect your chatbot to WhatsApp Business API
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Setup Steps */}
        <div className="w-80 border-r bg-muted/30 overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-foreground mb-2">Setup Steps</h2>
            <p className="text-sm text-muted-foreground">
              Follow these steps to connect your WhatsApp account
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {setupSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "relative pl-8 pb-6",
                      stepNumber < setupSteps.length && "border-l-2 border-border"
                    )}
                  >
                    {/* Step Number Circle */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                        isCompleted && "bg-green-500 text-white border-2 border-green-500",
                        isCurrent && "bg-primary text-primary-foreground border-2 border-primary",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground border-2 border-border"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        stepNumber
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className={cn(
                        "font-semibold text-sm",
                        isCurrent && "text-primary",
                        !isCurrent && "text-foreground"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      {step.tip && (
                        <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-md">
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            💡 {step.tip}
                          </p>
                        </div>
                      )}
                      {step.externalLink && (
                        <a
                          href={step.externalLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        >
                          {step.externalLink.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right Side - Setup Form */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
            <Card className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
                    Credentials
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your WhatsApp Business API credentials from Meta Developer Console
                  </p>
                </div>

                {/* Webhook URL (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    Webhook URL
                    <span className="text-xs text-muted-foreground font-normal">(Copy this for Meta Console)</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhookUrl"
                      value={webhookUrl}
                      readOnly
                      className="flex-1 bg-muted/50 font-mono text-sm border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                      className="shrink-0 border-border hover:bg-muted"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This URL will be used to receive messages from WhatsApp. Copy it to Meta Developer Console → WhatsApp → Configuration → Webhook.
                  </p>
                </div>

                {/* Phone Number ID */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumberId" className="text-sm font-medium text-foreground">
                    Phone Number ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phoneNumberId"
                    value={credentials.phoneNumberId}
                    onChange={(e) => handleInputChange('phoneNumberId', e.target.value)}
                    placeholder="Enter your Phone Number ID (15-16 digits)"
                    required
                    className="border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Found in Meta Developer Console → WhatsApp → API Setup
                  </p>
                </div>

                {/* Access Token */}
                <div className="space-y-2">
                  <Label htmlFor="accessToken" className="text-sm font-medium text-foreground">
                    Access Token <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="accessToken"
                    type="password"
                    value={credentials.accessToken}
                    onChange={(e) => handleInputChange('accessToken', e.target.value)}
                    placeholder="Enter your WhatsApp Access Token"
                    required
                    className="border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Generate a permanent token from System User in Business Settings. Temporary tokens expire in 24 hours.
                  </p>
                </div>

                {/* Verify Token */}
                <div className="space-y-2">
                  <Label htmlFor="verifyToken" className="text-sm font-medium text-foreground">
                    Verify Token <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="verifyToken"
                      value={credentials.verifyToken}
                      onChange={(e) => handleInputChange('verifyToken', e.target.value)}
                      placeholder="Enter or generate a verify token"
                      required
                      minLength={8}
                      className="flex-1 border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateVerifyToken}
                      className="shrink-0 border-border hover:bg-muted"
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A secure random string (min 8 characters). Use the same token in Meta Console webhook settings.
                  </p>
                </div>

                {/* Business Account ID (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="businessAccountId" className="text-sm font-medium text-foreground">
                    Business Account ID <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="businessAccountId"
                    value={credentials.businessAccountId}
                    onChange={(e) => handleInputChange('businessAccountId', e.target.value)}
                    placeholder="Enter your Business Account ID"
                    className="border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your WhatsApp Business Account ID (optional, but recommended for production)
                  </p>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Next Steps
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground ml-2">
                  <li className="leading-relaxed">
                    Copy the <strong className="text-foreground">Webhook URL</strong> above
                  </li>
                  <li className="leading-relaxed">
                    Go to{' '}
                    <a
                      href="https://developers.facebook.com/apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Meta Developer Console <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    → WhatsApp → Configuration
                  </li>
                  <li className="leading-relaxed">
                    Paste the Webhook URL in the <strong className="text-foreground">Callback URL</strong> field
                  </li>
                  <li className="leading-relaxed">
                    Enter your <strong className="text-foreground">Verify Token</strong> in the Verify Token field
                  </li>
                  <li className="leading-relaxed">Click <strong className="text-foreground">"Verify and Save"</strong></li>
                  <li className="leading-relaxed">
                    Subscribe to events: <strong className="text-foreground">messages</strong> and{' '}
                    <strong className="text-foreground">message_template_status_update</strong>
                  </li>
                </ol>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Integration...
                  </>
                ) : (
                  'Connect WhatsApp'
                )}
              </Button>
              <Link href={`/chatbot/${botId}`} className="sm:w-auto w-full">
                <Button type="button" variant="outline" className="w-full sm:w-auto border-border hover:bg-muted">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

