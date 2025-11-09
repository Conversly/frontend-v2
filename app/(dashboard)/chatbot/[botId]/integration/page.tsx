'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [showSetupSteps, setShowSetupSteps] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2, 3, 4, 5]);

  const toggleStep = (step: number) => {
    const wasCompleted = completedSteps.includes(step);
    
    if (wasCompleted) {
      // If unchecking, expand the step
      setCompletedSteps(prev => prev.filter(s => s !== step));
      setExpandedSteps(prev => [...prev, step]);
    } else {
      // If checking, mark complete and collapse after a moment
      setCompletedSteps(prev => [...prev, step]);
      setTimeout(() => {
        setExpandedSteps(prev => prev.filter(s => s !== step));
      }, 300);
    }
  };

  const toggleStepExpansion = (step: number) => {
    setExpandedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
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
              {/* Future OAuth Notice */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Coming Soon: One-Click Setup</h3>
                    <p className="text-xs text-muted-foreground">
                      We're working on seamless OAuth integration. For now, use the manual setup below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Setup Guide */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <button
                    onClick={() => setShowSetupSteps(!showSetupSteps)}
                    className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors"
                  >
                    <span className={`transform transition-transform ${showSetupSteps ? 'rotate-90' : ''}`}>▶</span>
                    Setup Steps {showSetupSteps ? '(Click to hide)' : '(Click to show)'}
                  </button>
                  <div className="flex items-center gap-2">
                    {showSetupSteps && (
                      <button
                        onClick={() => {
                          const allExpanded = expandedSteps.length === 5;
                          setExpandedSteps(allExpanded ? [] : [1, 2, 3, 4, 5]);
                        }}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20"
                      >
                        {expandedSteps.length === 5 ? '📁 Collapse All' : '📂 Expand All'}
                      </button>
                    )}
                    <a 
                      href="https://github.com/Conversly/frontend-v2/blob/main/docs/WHATSAPP_MANUAL_SETUP_GUIDE.md" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      📖 Detailed Guide
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {showSetupSteps && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {/* Progress Bar */}
                    <div className={`rounded-xl p-4 transition-all duration-500 ${
                      completedSteps.length === 5 
                        ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50' 
                        : 'bg-muted/50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">
                          {completedSteps.length === 5 ? (
                            <span className="flex items-center gap-2 animate-in fade-in slide-in-from-left duration-500">
                              🎉 All steps completed! Now enter your credentials below.
                            </span>
                          ) : (
                            `Progress: ${completedSteps.length} of 5 steps completed`
                          )}
                        </span>
                        <span className={`text-sm font-semibold transition-colors duration-300 ${
                          completedSteps.length === 5 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                        }`}>
                          {Math.round((completedSteps.length / 5) * 100)}%
                        </span>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                        {/* Background segments indicator */}
                        <div className="absolute inset-0 flex z-0">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <div 
                              key={step}
                              className="flex-1 border-r border-background/50 last:border-r-0"
                            />
                          ))}
                        </div>
                        
                        {/* Animated fill bar */}
                        <div 
                          className={`absolute inset-y-0 left-0 z-10 ${
                            completedSteps.length === 0
                              ? 'bg-transparent'
                              : completedSteps.length === 5 
                              ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg shadow-green-500/50 animate-pulse' 
                              : 'bg-gradient-to-r from-blue-400 via-blue-500 to-green-500'
                          }`}
                          style={{ 
                            width: `${(completedSteps.length / 5) * 100}%`,
                            transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease'
                          }}
                        >
                          {/* Shimmer effect */}
                          {completedSteps.length > 0 && completedSteps.length < 5 && (
                            <div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              style={{
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s infinite'
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Step markers */}
                        <div className="absolute inset-0 flex items-center justify-between px-[2%] z-20">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <div 
                              key={step}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                                completedSteps.includes(step)
                                  ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50 scale-110'
                                  : 'bg-background border-muted-foreground/30 text-muted-foreground'
                              }`}
                              style={{
                                transitionDelay: `${step * 50}ms`
                              }}
                            >
                              {completedSteps.includes(step) ? '✓' : step}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Individual step indicators */}
                      <div className="flex justify-between mt-2 px-[1%]">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div 
                            key={step}
                            className={`text-[10px] font-medium transition-all duration-500 ${
                              completedSteps.includes(step)
                                ? 'text-green-600 dark:text-green-400 scale-105'
                                : 'text-muted-foreground/50'
                            }`}
                          >
                            Step {step}
                          </div>
                        ))}
                      </div>
                    </div>

                {/* Step 1 */}
                <div className={`rounded-xl transition-all duration-300 ${
                  completedSteps.includes(1) 
                    ? 'bg-green-500/5 border border-green-500/30 shadow-sm' 
                    : 'bg-card border border-border'
                }`}>
                  <div 
                    className="flex gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl"
                    onClick={() => toggleStepExpansion(1)}
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(1);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          completedSteps.includes(1) 
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                            : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:scale-110'
                        }`}
                      >
                        {completedSteps.includes(1) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">1</span>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm transition-colors ${
                          completedSteps.includes(1) ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          Create Meta App
                        </h4>
                        <span className={`text-xs transition-transform duration-300 ${
                          expandedSteps.includes(1) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {completedSteps.includes(1) && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Step completed</p>
                      )}
                    </div>
                  </div>
                  
                  {expandedSteps.includes(1) && (
                    <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-muted-foreground pl-12">
                        Go to <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">Meta for Developers <ExternalLink className="w-3 h-3" /></a> and create a new Business app.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground ml-12">
                        <p className="font-medium text-foreground mb-1">Quick tip:</p>
                        <p>Choose "Business" as app type → Add WhatsApp product</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2 */}
                <div className={`rounded-xl transition-all duration-300 ${
                  completedSteps.includes(2) 
                    ? 'bg-green-500/5 border border-green-500/30 shadow-sm' 
                    : 'bg-card border border-border'
                }`}>
                  <div 
                    className="flex gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl"
                    onClick={() => toggleStepExpansion(2)}
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(2);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          completedSteps.includes(2) 
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:scale-110'
                        }`}
                      >
                        {completedSteps.includes(2) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">2</span>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm transition-colors ${
                          completedSteps.includes(2) ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          Get Phone Number ID
                        </h4>
                        <span className={`text-xs transition-transform duration-300 ${
                          expandedSteps.includes(2) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {completedSteps.includes(2) && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Step completed</p>
                      )}
                    </div>
                  </div>
                  
                  {expandedSteps.includes(2) && (
                    <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-muted-foreground pl-12">
                        In your app dashboard, go to WhatsApp → API Setup. Copy the Phone Number ID (15-16 digits).
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3 text-xs ml-12">
                        <p className="font-medium text-foreground mb-1">Example:</p>
                        <code className="text-blue-500">123456789012345</code>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div className={`rounded-xl transition-all duration-300 ${
                  completedSteps.includes(3) 
                    ? 'bg-green-500/5 border border-green-500/30 shadow-sm' 
                    : 'bg-card border border-border'
                }`}>
                  <div 
                    className="flex gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl"
                    onClick={() => toggleStepExpansion(3)}
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(3);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          completedSteps.includes(3) 
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                            : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:scale-110'
                        }`}
                      >
                        {completedSteps.includes(3) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">3</span>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm transition-colors ${
                          completedSteps.includes(3) ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          Generate Access Token
                        </h4>
                        <span className={`text-xs transition-transform duration-300 ${
                          expandedSteps.includes(3) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {completedSteps.includes(3) && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Step completed</p>
                      )}
                    </div>
                  </div>
                  
                  {expandedSteps.includes(3) && (
                    <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-muted-foreground pl-12">
                        For production, create a System User in Business Settings and generate a permanent token with <code className="text-xs bg-muted px-1 py-0.5 rounded">whatsapp_business_messaging</code> permission.
                      </p>
                      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 text-xs ml-12">
                        <p className="font-medium text-yellow-700 dark:text-yellow-500 mb-1">⚠️ Important:</p>
                        <p className="text-muted-foreground">Temporary tokens expire in 24 hours. Use System User tokens for production.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 4 */}
                <div className={`rounded-xl transition-all duration-300 ${
                  completedSteps.includes(4) 
                    ? 'bg-green-500/5 border border-green-500/30 shadow-sm' 
                    : 'bg-card border border-border'
                }`}>
                  <div 
                    className="flex gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl"
                    onClick={() => toggleStepExpansion(4)}
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(4);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          completedSteps.includes(4) 
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                            : 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:scale-110'
                        }`}
                      >
                        {completedSteps.includes(4) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">4</span>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm transition-colors ${
                          completedSteps.includes(4) ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          Create Verify Token
                        </h4>
                        <span className={`text-xs transition-transform duration-300 ${
                          expandedSteps.includes(4) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {completedSteps.includes(4) && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Step completed</p>
                      )}
                    </div>
                  </div>
                  
                  {expandedSteps.includes(4) && (
                    <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-muted-foreground pl-12">
                        Create a secure random string (8+ characters) to verify webhook requests.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3 text-xs ml-12">
                        <p className="font-medium text-foreground mb-1">Generate one:</p>
                        <code className="text-blue-500">openssl rand -hex 20</code>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 5 */}
                <div className={`rounded-xl transition-all duration-300 ${
                  completedSteps.includes(5) 
                    ? 'bg-green-500/5 border border-green-500/30 shadow-sm' 
                    : 'bg-card border border-border'
                }`}>
                  <div 
                    className="flex gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-xl"
                    onClick={() => toggleStepExpansion(5)}
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(5);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          completedSteps.includes(5) 
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                            : 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 hover:scale-110'
                        }`}
                      >
                        {completedSteps.includes(5) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">5</span>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm transition-colors ${
                          completedSteps.includes(5) ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          Configure Webhook in Meta
                        </h4>
                        <span className={`text-xs transition-transform duration-300 ${
                          expandedSteps.includes(5) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {completedSteps.includes(5) && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Step completed</p>
                      )}
                    </div>
                  </div>
                  
                  {expandedSteps.includes(5) && (
                    <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-muted-foreground pl-12">
                        In WhatsApp → Configuration, add the webhook URL below and your verify token.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground ml-12">
                        <p className="font-medium text-foreground mb-1">Subscribe to events:</p>
                        <p>✓ messages • message_template_status_update</p>
                      </div>
                    </div>
                  )}
                </div>
                  </div>
                )}
              </div>

              {/* Configuration Section */}
              <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-2 border-dashed border-blue-500/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Enter Your Credentials</h3>
                </div>

              {/* Webhook URL */}
              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-foreground flex items-center gap-2">
                  Webhook URL <span className="text-xs text-muted-foreground">(Step 5)</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Copy this URL and paste it in Meta WhatsApp Configuration → Webhook settings</p>
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
                  <Label htmlFor="phone-number-id" className="text-foreground flex items-center gap-2">
                    Phone Number ID <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Step 2)</span>
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
                  <Label htmlFor="business-account-id" className="text-foreground flex items-center gap-2">
                    Business Account ID
                    <span className="text-xs text-muted-foreground">(Optional)</span>
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
                  <Label htmlFor="access-token" className="text-foreground flex items-center gap-2">
                    Access Token <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Step 3)</span>
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
                    <span className="text-xs text-muted-foreground">(Step 4 & 5)</span>
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
              </div>
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
