"use client";

// import { useState } from "react";
// import dynamic from 'next/dynamic';
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { joinWaitlist } from "@/lib/api/waitlist";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Loader2,
//   Sparkles,
//   MessageCircle,
//   CheckCircle2,
//   Megaphone,
//   Zap,
//   Smartphone,
//   Users,
// } from "lucide-react";

// // Dynamic import for visual component
// const WhatsAppVisual = dynamic(() => import('@/components/whatsapp/WhatsAppVisual'), {
//   ssr: false,
//   loading: () => <div className="w-full h-full bg-slate-50 dark:bg-slate-900 animate-pulse" />
// });

// export default function WhatsAppPage() {
//   const params = useParams();

//   // Request Modal State
//   const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
//   const [requestEmail, setRequestEmail] = useState("");
//   const [useCase, setUseCase] = useState("");
//   const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
//   const [isRequestSuccess, setIsRequestSuccess] = useState(false);
//   const [requestError, setRequestError] = useState("");

//   const handleRequestSubmit = async () => {
//     if (!useCase.trim()) {
//       setRequestError("Please describe your use case");
//       return;
//     }

//     if (!requestEmail.trim()) {
//       setRequestError("Please enter your email address");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(requestEmail)) {
//       setRequestError("Please enter a valid email address");
//       return;
//     }

//     setIsRequestSubmitting(true);
//     setRequestError("");

//     try {
//       await joinWaitlist({
//         email: requestEmail,
//         comments: `Integration Request: WhatsApp - ${useCase}`,
//       });
//       setIsRequestSuccess(true);
//       toast.success("Request submitted successfully!");
//     } catch (error: any) {
//       console.error("WhatsApp request error:", error);
//       setRequestError(error.message || "Failed to submit request");
//       toast.error("Failed to submit request. Please try again.");
//     } finally {
//       setIsRequestSubmitting(false);
//     }
//   };

//   const resetRequestForm = () => {
//     setIsRequestSuccess(false);
//     setUseCase("");
//     setRequestEmail("");
//     setRequestError("");
//   };

//   return (
//     <div className="w-full h-full bg-background overflow-hidden flex flex-col">
//       <div className="flex-1 overflow-y-auto">
//         <div className="container mx-auto px-6 py-6 max-w-[1920px] h-full flex flex-col justify-center">

//           <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-dashed rounded-xl bg-white dark:bg-slate-950 overflow-hidden min-h-[600px] shadow-sm dark:border-slate-800">

//             {/* Left side - Content */}
//             <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center relative z-10">
//               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
//                 <MessageCircle className="h-9 w-9 text-white fill-white/20" />
//               </div>

//               <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
//                 WhatsApp Agents
//               </h1>

//               <p className="text-muted-foreground mb-8 max-w-md leading-relaxed text-lg">
//                 Connect with billions of users on WhatsApp. Automate support, send broadcasts, and drive engagement with AI-powered conversations.
//               </p>

//               {/* Feature highlights */}
//               <div className="flex flex-wrap justify-center gap-3 mb-10">
//                 {[
//                   { icon: Zap, label: "24/7 Automation" },
//                   { icon: Users, label: "Mass Broadcasts" },
//                   { icon: Smartphone, label: "Rich Media" },
//                 ].map((feature, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-800"
//                   >
//                     <feature.icon className="h-4 w-4 text-green-600 dark:text-green-500" />
//                     {feature.label}
//                   </div>
//                 ))}
//               </div>

//               <Button
//                 size="lg"
//                 className="h-12 px-8 text-base shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5 bg-[#25D366] hover:bg-[#20bd5a] text-white"
//                 onClick={() => setIsRequestModalOpen(true)}
//               >
//                 <Sparkles className="w-5 h-5 mr-2" />
//                 Request Access
//               </Button>
//             </div>

//             {/* Right side - Visual */}
//             <div className="hidden lg:block border-l border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
//               <WhatsAppVisual />
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* Request Modal */}
//       <Dialog open={isRequestModalOpen} onOpenChange={(open) => {
//         setIsRequestModalOpen(open);
//         if (!open) setTimeout(resetRequestForm, 300);
//       }}>
//         <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-background shadow-2xl gap-0">
//           <AnimatePresence mode="wait">
//             {!isRequestSuccess ? (
//               <motion.div
//                 key="form"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="flex flex-col"
//               >
//                 <div className="p-6 pb-0">
//                   <DialogHeader className="mb-6 space-y-3">
//                     <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
//                       <Sparkles className="w-6 h-6 text-green-600 dark:text-green-500" />
//                     </div>
//                     <DialogTitle className="text-2xl font-bold">
//                       Request WhatsApp Access
//                     </DialogTitle>
//                     <DialogDescription className="text-base leading-relaxed text-muted-foreground/80">
//                       WhatsApp integration is currently in private beta. Tell us about your business use case to get early access.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="space-y-5">
//                     <div className="space-y-2">
//                       <Label htmlFor="use-case" className="text-sm font-semibold flex items-center gap-1">
//                         Use Case <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="use-case"
//                         placeholder="e.g. Automated customer support for my e-commerce store..."
//                         value={useCase}
//                         onChange={(e) => setUseCase(e.target.value)}
//                         disabled={isRequestSubmitting}
//                         className="h-11 bg-muted/30 focus:bg-background transition-colors"
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="req-email" className="text-sm font-semibold flex items-center gap-1">
//                         Email Address <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="req-email"
//                         type="email"
//                         placeholder="you@company.com"
//                         value={requestEmail}
//                         onChange={(e) => setRequestEmail(e.target.value)}
//                         disabled={isRequestSubmitting}
//                         className={`h-11 bg-muted/30 focus:bg-background transition-colors ${requestError && (!requestEmail || (requestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestEmail))) ? "border-destructive focus-visible:ring-destructive" : ""}`}
//                       />
//                     </div>

//                     {requestError && (
//                       <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
//                         <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
//                         {requestError}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <DialogFooter className="p-6 pt-8 bg-muted/20 mt-6 border-t border-border/50">
//                   <Button variant="ghost" onClick={() => setIsRequestModalOpen(false)} disabled={isRequestSubmitting} className="mr-auto hover:bg-background">
//                     Cancel
//                   </Button>
//                   <Button onClick={handleRequestSubmit} disabled={isRequestSubmitting} size="lg" className="min-w-[140px] shadow-lg shadow-green-500/20 bg-[#25D366] hover:bg-[#20bd5a] text-white">
//                     {isRequestSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       "Submit Request"
//                     )}
//                   </Button>
//                 </DialogFooter>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="success"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex flex-col items-center justify-center py-8 text-center"
//               >
//                 <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
//                   <CheckCircle2 className="w-10 h-10" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">Request Received!</h3>
//                 <p className="text-muted-foreground max-w-[300px] mb-8">
//                   We've received your request for WhatsApp access. We'll be in touch with you shortly at <strong>{requestEmail}</strong>.
//                 </p>
//                 <Button onClick={() => setIsRequestModalOpen(false)} size="lg" className="w-full sm:w-auto min-w-[140px]">
//                   Done
//                 </Button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// ==========================================
// PREVIOUS IMPLEMENTATION (COMMENTED OUT)
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { getWhatsAppIntegration, createWhatsAppIntegration, exchangeWhatsAppToken, onboardWhatsAppClient } from '@/lib/api/whatsapp';
import { Loader2, ArrowLeft, Copy, CheckCircle2, MessageCircle, ExternalLink, Check } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_SETUP_GUIDE } from '@/lib/constants/integrations';
import { cn } from '@/lib/utils';
import { useFacebookSDK } from '@/hooks/use-facebook-sdk';
import { Separator } from "@/components/ui/separator";
import posthog from "posthog-js";

export default function WhatsAppSetupPage() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const router = useRouter();
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmbeddedSignupLoading, setIsEmbeddedSignupLoading] = useState(false);
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

  // Facebook App configuration
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '1363495505416375';
  const facebookConfigId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID || '1916779739722901';

  // Store signup data from message event
  const [signupData, setSignupData] = useState<{
    phoneNumberId: string;
    wabaId: string;
    businessId?: string;
    adAccountIds?: string[];
    pageIds?: string[];
    datasetIds?: string[];
  } | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);

  // Facebook SDK hook
  const { isSDKLoaded, isLoading: isSDKLoading, launchEmbeddedSignup } = useFacebookSDK({
    appId: facebookAppId,
    version: 'v24.0',
    onSignupComplete: async (data) => {

      // Store the WABA ID and Phone Number ID from the message event
      // Also capture additional fields: business_id, ad_account_ids, page_ids, dataset_ids
      const newSignupData = {
        phoneNumberId: data.phone_number_id,
        wabaId: data.waba_id,
        businessId: data.business_id,
        adAccountIds: data.ad_account_ids,
        pageIds: data.page_ids,
        datasetIds: data.dataset_ids,
      };

      setSignupData(newSignupData);
      // The useEffect will handle processing when both authCode and signupData are available
      // Note: Token code expires in 30 seconds, so processing must happen quickly
    },
    onSignupCancel: (step) => {
      toast.error(`Signup cancelled at step: ${step}`);
      setIsEmbeddedSignupLoading(false);
      setSignupData(null);
      setAuthCode(null);
    },
    onSignupError: (error) => {
      toast.error(`Signup error: ${error}`);
      setIsEmbeddedSignupLoading(false);
      setSignupData(null);
      setAuthCode(null);
    },
  });

  useEffect(() => {
    const checkExistingIntegration = async () => {
      if (!botId) return;

      try {
        const integration = await getWhatsAppIntegration(botId);
        if (integration) {
          setExistingIntegration(integration);
          // Redirect to live-chat page by default
          router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${integration.id}/live-chat`);
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

  const [hasStartedFillingForm, setHasStartedFillingForm] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (!hasStartedFillingForm) {
      posthog.capture("whatsapp_form_started", { chatbot_id: botId });
      setHasStartedFillingForm(true);
    }
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const generateVerifyToken = () => {
    posthog.capture("whatsapp_generate_token_clicked", { chatbot_id: botId });
    const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setCredentials(prev => ({ ...prev, verifyToken: token }));
    return token;
  };

  // Enhanced handler that processes the complete flow
  // IMPORTANT: Token code expires in 30 seconds, so this must complete quickly
  const processEmbeddedSignup = useCallback(async (phoneNumberId: string, wabaId: string, code: string) => {

    setIsEmbeddedSignupLoading(true);

    let tokenExchangeSucceeded = false;

    try {
      // Ensure we have a verify token
      let verifyToken = credentials.verifyToken;
      if (!verifyToken) {

        verifyToken = generateVerifyToken();
      }


      // Step 1: Exchange code for access token (must happen within 30 seconds)

      toast.info('Exchanging authorization code for access token...');
      const tokenResponse = await exchangeWhatsAppToken({
        code,
        chatbotId: botId,
        phoneNumberId,
        wabaId,
      });

      if (!tokenResponse || !tokenResponse.accessToken) {
        throw new Error('Failed to get access token from exchange');
      }


      tokenExchangeSucceeded = true; // Mark token exchange as successful

      // Step 2: Onboard client (subscribe webhooks, get phone details, create integration)

      toast.info('Completing onboarding...');
      const onboardResponse = await onboardWhatsAppClient({
        chatbotId: botId,
        phoneNumberId,
        wabaId,
        accessToken: tokenResponse.accessToken,
        webhookUrl,
        verifyToken,
      });



      if (onboardResponse.success) {
        toast.success('WhatsApp integration completed successfully!');
        posthog.capture("whatsapp_connected", {
          chatbot_id: botId,
          method: "facebook_oauth",
          phone_number_id: phoneNumberId,
          waba_id: wabaId,
        });
        // Refresh to check for integration
        const integration = await getWhatsAppIntegration(botId);
        if (integration) {
          router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${integration.id}/live-chat`);
        } else {
          router.push(`/${workspaceId}/chatbot/${botId}/whatsapp`);
        }
      } else {
        // Check if integration was created despite webhook subscription failure
        const integration = await getWhatsAppIntegration(botId);
        if (integration) {
          posthog.capture("whatsapp_connected", {
            chatbot_id: botId,
            method: "facebook_oauth",
            phone_number_id: phoneNumberId,
            partial: true,
          });
          toast.success('WhatsApp integration created! Please configure webhooks manually in Meta Dashboard.');
          router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${integration.id}/live-chat`);
        } else {
          throw new Error(onboardResponse.message || 'Onboarding failed');
        }
      }
    } catch (error: any) {
      console.error('Error processing embedded signup:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });

      // Check if error is due to authorization code already being used
      const isCodeUsedError = error.message?.includes('authorization code has been used') ||
        error.message?.includes('code has been used');

      if (isCodeUsedError || tokenExchangeSucceeded) {
        // Don't reset hasProcessed if:
        // 1. Code was already used (can't retry)
        // 2. Token exchange succeeded (code is now used, can't retry)
        toast.error('Authorization code was already used. Please start the signup process again.');
      } else {
        // Check if integration was created despite error
        try {
          const integration = await getWhatsAppIntegration(botId);
          if (integration) {
            toast.warning('Integration created but some steps failed. Please configure webhooks manually in Meta Dashboard.');
            router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${integration.id}/live-chat`);
            return; // Don't reset hasProcessed if integration exists
          }
        } catch (checkError) {
          // Integration doesn't exist, continue with error handling
        }

        toast.error(error.message || 'Failed to complete embedded signup');
        // Only reset if token exchange failed (code is still valid for retry)
        setHasProcessed(false);
      }
    } finally {
      setIsEmbeddedSignupLoading(false);
    }
  }, [botId, webhookUrl, credentials.verifyToken, router]);

  // Process embedded signup when both auth code and signup data are available
  // Use a ref to prevent duplicate processing
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // Debug logging


    // Process when we have both pieces of data and haven't processed yet
    if (authCode && signupData && !hasProcessed) {

      setHasProcessed(true);
      processEmbeddedSignup(signupData.phoneNumberId, signupData.wabaId, authCode);
    }
  }, [authCode, signupData, hasProcessed, processEmbeddedSignup]);

  const handleEmbeddedSignup = async () => {
    posthog.capture("whatsapp_connect_facebook_clicked", { chatbot_id: botId });
    if (!isSDKLoaded) {
      toast.error('Facebook SDK is still loading. Please wait...');
      return;
    }

    setIsEmbeddedSignupLoading(true);
    setSignupData(null);
    setAuthCode(null);
    setHasProcessed(false); // Reset processed flag
    generateVerifyToken(); // Generate verify token before starting

    if (!facebookConfigId) {
      toast.error('Facebook Config ID is not configured');
      setIsEmbeddedSignupLoading(false);
      return;
    }

    try {
      launchEmbeddedSignup(facebookConfigId, async (response: any) => {

        if (response.authResponse?.code) {
          const code = response.authResponse.code;

          setAuthCode(code);
          // Token code expires in 30 seconds - we need to exchange it quickly
          toast.info('Authorization code received. Processing signup...');
          // The useEffect will handle processing when both authCode and signupData are available
        } else {
          console.error('No authorization code in response:', response);
          toast.error('Failed to get authorization code');
          setIsEmbeddedSignupLoading(false);
        }
      });
    } catch (error: any) {
      console.error('Error launching embedded signup:', error);
      toast.error(error.message || 'Failed to launch embedded signup');
      setIsEmbeddedSignupLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    posthog.capture("whatsapp_connect_clicked", { chatbot_id: botId });

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
      posthog.capture("whatsapp_connected", {
        chatbot_id: botId,
        method: "manual",
        phone_number_id: credentials.phoneNumberId,
      });

      // Redirect to live-chat page by default
      if (result?.id) {
        router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${result.id}/live-chat`);
      } else {
        router.push(`/${workspaceId}/chatbot/${botId}/whatsapp`);
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
    <div className="w-full h-full overflow-y-auto">
      <div className="container mx-auto px-6 py-6 max-w-[1920px]">

        {/* Standard Page Header */}
        <div className="page-header">
          <h1 className="page-title">Connect WhatsApp</h1>
          <p className="page-subtitle">
            Add a WhatsApp Business number to your chatbot
          </p>
          <Separator className="mt-2" />
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">

          {/* Quick Connect Option */}
          <Button
            type="button"
            className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold gap-2 w-full sm:max-w-xs mx-auto block"
            onClick={handleEmbeddedSignup}
            disabled={isEmbeddedSignupLoading || !isSDKLoaded || isSDKLoading}
          >
            {isEmbeddedSignupLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting...</span>
              </span>
            ) : (
              <span className="font-bold">Connect with Facebook</span>
            )}
          </Button>
          {!isSDKLoaded && (
            <p className="text-xs text-muted-foreground text-center">
              Loading Facebook SDK...
            </p>
          )}
          <div className="relative pt-2">
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
