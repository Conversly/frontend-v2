'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageCircle, 
  Slack, 
  CreditCard, 
  Calendar, 
  Cloud,
  HelpCircle,
  Copy,
  CheckCircle2,
  ExternalLink,
  Lock,
  Facebook
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhatsAppSetupChecklist } from '@/components/chatbot/WhatsAppSetupChecklist';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isAvailable: boolean;
  isConnected?: boolean;
}

export default function IntegrationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const botId = params.botId as string;
  
  // WhatsApp connection state
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumberId: '',
    accessToken: '',
    verifyToken: '',
    businessAccountId: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<'facebook' | 'manual'>('facebook');
  
  // Facebook OAuth state
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  
  // Load Facebook SDK
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    
    if (!appId) {
      console.error('NEXT_PUBLIC_FACEBOOK_APP_ID is not set');
      return;
    }

    // SDK initialization - Initialize the SDK when it loads
    window.fbAsyncInit = function() {
      try {
        window.FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v24.0' // Graph API version here (latest)
        });
        setSdkLoaded(true);
        console.log('Facebook SDK initialized successfully', { appId });
      } catch (error) {
        console.error('Facebook SDK initialization error:', error);
        toast.error('Failed to initialize Facebook SDK');
      }
    };

    // SDK loading - Load the Facebook JavaScript SDK asynchronously
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onerror = () => {
        console.error('Failed to load Facebook SDK');
        toast.error('Failed to load Facebook SDK. Please check your internet connection.');
      };
      
      script.onload = () => {
        console.log('Facebook SDK script loaded');
        // If SDK loaded but fbAsyncInit wasn't called, check if FB is available
        if (window.FB && !sdkLoaded) {
          // SDK might have loaded before fbAsyncInit was set
          window.fbAsyncInit();
        }
      };
      
      document.body.appendChild(script);
    } else if (window.FB) {
      // SDK already loaded
      console.log('Facebook SDK already loaded');
      setSdkLoaded(true);
      // Initialize if not already initialized
      try {
        window.FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v24.0'
        });
      } catch (error) {
        console.warn('SDK already initialized or initialization failed:', error);
      }
    }

    return () => {
      // Cleanup not needed - SDK persists across page
    };
  }, []);

  // Session logging message event listener
  // Captures business customer's asset IDs, abandonment info, or error reports
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check - only accept messages from facebook.com
      if (!event.origin.endsWith('facebook.com')) return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          console.log('message event: ', data); // remove after testing
          handleEmbeddedSignupEvent(data);
        }
      } catch {
        console.log('message event: ', event.data); // remove after testing
        // If parsing fails, check if it's already an object
        if (event.data && event.data.type === 'WA_EMBEDDED_SIGNUP') {
          handleEmbeddedSignupEvent(event.data);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [botId]);

  const handleEmbeddedSignupEvent = async (data: any) => {
    // Successful flow completion structure
    if (data.event === 'FINISH' || data.event === 'FINISH_ONLY_WABA' || data.event === 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING') {
      const { phone_number_id, waba_id, business_id } = data.data;
      
      toast.success('WhatsApp Business Account connected!', {
        description: `WABA ID: ${waba_id}`
      });
      
      // Save to state (will be completed when we get the access token)
      setWhatsappConfig(prev => ({
        ...prev,
        phoneNumberId: phone_number_id || '',
        businessAccountId: waba_id || business_id || ''
      }));
      
      // Store WABA ID and phone number ID for onboarding
      // These will be used after token exchange completes
      sessionStorage.setItem('whatsapp_waba_id', waba_id || '');
      sessionStorage.setItem('whatsapp_phone_number_id', phone_number_id || '');
      
    } 
    // Abandoned flow structure
    else if (data.event === 'CANCEL') {
      // User reported errors
      if (data.data.error_message) {
        toast.error(`Error: ${data.data.error_message}`, {
          description: `Error ID: ${data.data.error_id}`
        });
        console.error('Embedded Signup Error:', {
          error_id: data.data.error_id,
          session_id: data.data.session_id,
          timestamp: data.data.timestamp
        });
      } 
      // User abandoned at a specific step
      else if (data.data.current_step) {
        toast.info(`Setup cancelled at: ${data.data.current_step}`);
        console.log('User cancelled at step:', data.data.current_step);
      }
    }
  };

  // Response callback - Receives exchangeable token code (30-second TTL)
  const handleFacebookCallback = async (response: any) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log('response: ', code); // remove after testing
      
      setIsFacebookLoading(true);
      try {
        // Step 1: Exchange code for business token on your server
        const tokenResponse = await fetch('/api/integrations/whatsapp/exchange-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, botId })
        });
        
        if (!tokenResponse.ok) throw new Error('Failed to exchange token');
        
        const tokenData = await tokenResponse.json();
        const businessToken = tokenData.accessToken;
        
        // Get WABA ID and phone number ID from session storage (set by handleEmbeddedSignupEvent)
        const wabaId = sessionStorage.getItem('whatsapp_waba_id') || whatsappConfig.businessAccountId;
        const phoneNumberId = sessionStorage.getItem('whatsapp_phone_number_id') || whatsappConfig.phoneNumberId;
        
        // Clear session storage
        sessionStorage.removeItem('whatsapp_waba_id');
        sessionStorage.removeItem('whatsapp_phone_number_id');
        
        if (!wabaId || !phoneNumberId) {
          throw new Error('Missing WABA ID or Phone Number ID. Please complete the Embedded Signup flow.');
        }
        
        // Step 2-5: Complete Solution Partner onboarding
        toast.info('Completing onboarding steps...', {
          description: 'This may take a few moments'
        });
        
        const onboardingResponse = await fetch('/api/integrations/whatsapp/onboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessToken,
            wabaId,
            phoneNumberId,
            botId,
            currency: 'USD' // Default currency, can be made configurable
            // Optional: testMessagePhoneNumber and testMessageBody can be added here
          })
        });
        
        if (!onboardingResponse.ok) {
          const onboardingError = await onboardingResponse.json();
          console.warn('Onboarding completed with errors:', onboardingError);
          // Continue anyway - some steps may have succeeded
        } else {
          const onboardingData = await onboardingResponse.json();
          console.log('Onboarding results:', onboardingData);
          
          // Check if critical steps succeeded
          const criticalStepsFailed = onboardingData.results?.step2?.status === 'error' || 
                                     onboardingData.results?.step4?.status === 'error';
          
          if (criticalStepsFailed) {
            toast.warning('Onboarding completed with some errors', {
              description: 'Check console for details'
            });
          }
        }
        
        setWhatsappConfig(prev => ({
          ...prev,
          accessToken: businessToken,
          verifyToken: tokenData.verifyToken || `verify_${botId}_${Date.now()}`,
          phoneNumberId,
          businessAccountId: wabaId
        }));
        
        setWhatsappConnected(true);
        toast.success('WhatsApp connected and onboarded successfully!');
        
      } catch (error) {
        toast.error('Failed to complete setup');
        console.error('Setup error:', error);
      } finally {
        setIsFacebookLoading(false);
      }
    } else {
      console.log('response: ', response); // remove after testing
      toast.error('Facebook authentication failed');
    }
  };

  // Launch method and callback registration
  const launchWhatsAppSignup = () => {
    console.log('Launching WhatsApp Signup...', {
      FB: !!window.FB,
      sdkLoaded,
      configId: process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID,
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    });

    if (!window.FB) {
      console.error('Facebook SDK not available');
      toast.error('Facebook SDK not loaded. Please refresh the page and try again.', {
        duration: 5000
      });
      return;
    }

    const configId = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID;
    if (!configId) {
      console.error('Configuration ID not set');
      toast.error('Facebook configuration not set. Please check your environment variables.', {
        duration: 5000
      });
      return;
    }

    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId) {
      console.error('App ID not set');
      toast.error('Facebook App ID not configured. Please check your environment variables.', {
        duration: 5000
      });
      return;
    }

    setIsFacebookLoading(true);
    
    try {
      // Store botId in sessionStorage for the callback to retrieve
      sessionStorage.setItem('whatsapp_setup_bot_id', botId);
      
      // Launch Embedded Signup flow with callback registration
      console.log('Calling FB.login with config:', { config_id: configId, botId });
      
      window.FB.login(
        (response: any) => {
          console.log('FB.login callback received:', response);
          handleFacebookCallback(response);
        },
        {
          config_id: configId,
          response_type: 'code',
          override_default_response_type: true,
          extras: {
            setup: {},
            featureType: '',
            sessionInfoVersion: '3'
          }
        }
      );
    } catch (error) {
      console.error('Error launching WhatsApp signup:', error);
      toast.error('Failed to launch WhatsApp signup. Please try again.', {
        duration: 5000
      });
      setIsFacebookLoading(false);
    }
  };

  const integrations: Integration[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Connect your chatbot to WhatsApp Business API',
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      isAvailable: true,
      isConnected: whatsappConnected
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Manage your Slack conversations',
      icon: <Slack className="w-6 h-6 text-purple-500" />,
      isAvailable: false
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Manage payments, billing, and automate financial operations',
      icon: <CreditCard className="w-6 h-6 text-blue-500" />,
      isAvailable: false
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Manage your Calendly events',
      icon: <Calendar className="w-6 h-6 text-blue-400" />,
      isAvailable: false
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: 'Create Zendesk tickets',
      icon: <Cloud className="w-6 h-6 text-teal-600" />,
      isAvailable: false
    },
  ];

  const handleWhatsAppConnect = async () => {
    // Validate required fields
    if (!whatsappConfig.phoneNumberId || !whatsappConfig.accessToken || !whatsappConfig.verifyToken) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsConnecting(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setWhatsappConnected(true);
      toast.success('WhatsApp connected successfully!');
    } catch (error) {
      toast.error('Failed to connect WhatsApp. Please try again.');
      console.error('WhatsApp connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleWhatsAppDisconnect = () => {
    setWhatsappConnected(false);
    setWhatsappConfig({
      phoneNumberId: '',
      accessToken: '',
      verifyToken: '',
      businessAccountId: ''
    });
    toast.success('WhatsApp disconnected');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const webhookUrl = `https://api.conversly.ai/webhook/whatsapp/${botId}`;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your Agent to external services to use integration-specific actions.
          </p>
        </div>

        {/* WhatsApp Integration - Detailed Section */}
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">WhatsApp Business</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your chatbot to WhatsApp Business API to handle customer conversations
                </p>
              </div>
            </div>
            {whatsappConnected && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Connected</span>
              </div>
            )}
          </div>

          {!whatsappConnected ? (
            <div className="space-y-6">
              {/* Connection Method Tabs */}
              <Tabs value={connectionMethod} onValueChange={(value) => setConnectionMethod(value as 'facebook' | 'manual')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="facebook" className="gap-2">
                    <Facebook className="w-4 h-4" />
                    Connect with Facebook
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    Manual Setup
                  </TabsTrigger>
                </TabsList>

                {/* Facebook Login Tab */}
                <TabsContent value="facebook" className="space-y-6">
                  {/* Setup Checklist */}
                  <WhatsAppSetupChecklist />

                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Facebook className="w-8 h-8 text-blue-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Quick Setup with Facebook</h3>
                      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        Connect your WhatsApp Business account in just one click. You'll be redirected to Facebook 
                        to authorize access to your WhatsApp Business API credentials.
                      </p>
                    </div>

                    <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-4 text-left">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold text-foreground">Before you begin:</p>
                          <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Ensure you have a Facebook Business account</li>
                            <li>Your WhatsApp Business account must be set up in Meta Business Suite</li>
                            <li>You must be an admin of the WhatsApp Business account</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Debug Info (Development Only) */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-xs space-y-1 font-mono">
                        <div className="font-semibold mb-2">Debug Info:</div>
                        <div><strong>SDK Status:</strong> {sdkLoaded ? '✅ Loaded' : '❌ Not Loaded'}</div>
                        <div><strong>FB Object:</strong> {typeof window !== 'undefined' && window.FB ? '✅ Available' : '❌ Not Available'}</div>
                        <div><strong>App ID:</strong> {process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ? `✅ ${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID.substring(0, 10)}...` : '❌ Missing'}</div>
                        <div><strong>Config ID:</strong> {process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID ? `✅ ${process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID}` : '❌ Missing'}</div>
                        <div className="text-yellow-600 dark:text-yellow-400 mt-2">
                          💡 Check browser console for detailed logs
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={launchWhatsAppSignup}
                      disabled={isFacebookLoading || !sdkLoaded}
                      className="w-full max-w-md mx-auto bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isFacebookLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Connecting...
                        </>
                      ) : !sdkLoaded ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Loading SDK...
                        </>
                      ) : (
                        <>
                          <Facebook className="w-5 h-5" />
                          Continue with Facebook
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      By connecting, you agree to share your WhatsApp Business credentials with Conversly
                    </p>
                  </div>
                </TabsContent>

                {/* Manual Setup Tab */}
                <TabsContent value="manual" className="space-y-6">
                  {/* Setup Instructions */}
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">Setup Instructions</h3>
                    <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
                      <li>Create a WhatsApp Business account at <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">business.facebook.com <ExternalLink className="w-3 h-3" /></a></li>
                      <li>Get your Phone Number ID and Access Token from Meta Business Suite</li>
                      <li>Configure webhook URL in your WhatsApp Business settings</li>
                      <li>Enter your credentials below and click Connect</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Webhook URL */}
              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-foreground flex items-center gap-2">
                  Webhook URL
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Use this URL in your WhatsApp Business webhook configuration</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    readOnly
                    className="flex-1 bg-muted/50 border-border text-foreground font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Configuration Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone-number-id" className="text-foreground">
                    Phone Number ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone-number-id"
                    placeholder="Enter your Phone Number ID"
                    value={whatsappConfig.phoneNumberId}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumberId: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-account-id" className="text-foreground">
                    Business Account ID
                  </Label>
                  <Input
                    id="business-account-id"
                    placeholder="Enter your Business Account ID (optional)"
                    value={whatsappConfig.businessAccountId}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, businessAccountId: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="access-token" className="text-foreground">
                    Access Token <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="access-token"
                    type="password"
                    placeholder="Enter your WhatsApp Access Token"
                    value={whatsappConfig.accessToken}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accessToken: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="verify-token" className="text-foreground flex items-center gap-2">
                    Verify Token <span className="text-red-500">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">A secure string you create to verify webhook requests. Use the same token in your WhatsApp webhook configuration.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="verify-token"
                    placeholder="Enter your Verify Token"
                    value={whatsappConfig.verifyToken}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, verifyToken: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>
              </div>

              <Button
                onClick={handleWhatsAppConnect}
                disabled={isConnecting || !whatsappConfig.phoneNumberId || !whatsappConfig.accessToken || !whatsappConfig.verifyToken}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90"
              >
                {isConnecting ? 'Connecting...' : 'Connect WhatsApp'}
              </Button>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connected State */}
              <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-2">WhatsApp is Connected</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium">Phone Number ID:</span> {whatsappConfig.phoneNumberId}</p>
                      {whatsappConfig.businessAccountId && (
                        <p><span className="font-medium">Business Account ID:</span> {whatsappConfig.businessAccountId}</p>
                      )}
                      <p><span className="font-medium">Webhook URL:</span> {webhookUrl}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppDisconnect}
                variant="outline"
                className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10"
              >
                Disconnect WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* Other Integrations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.filter(i => i.id !== 'whatsapp').map((integration) => (
            <div
              key={integration.id}
              className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 relative"
            >
              {!integration.isAvailable && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-muted/50">
                  {integration.icon}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </div>

                <Button
                  disabled={!integration.isAvailable}
                  variant={integration.isAvailable ? "default" : "outline"}
                  className={integration.isAvailable 
                    ? "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90" 
                    : "w-full cursor-not-allowed"
                  }
                >
                  {integration.isAvailable ? 'Connect' : 'Coming Soon'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation Link */}
        <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Check out our documentation for detailed integration guides
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://docs.conversly.ai/integrations" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                View Docs
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
