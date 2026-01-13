"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from 'react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import {
  Bot,
  MessageCircle,
  HelpCircle,
  MessageSquare,
  BrainCircuit,
  Settings2,
  Code,
  Palette,
  Sparkles,
} from 'lucide-react';
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import type { UIConfigInput as PackageUIConfig } from '@conversly/chat-widget';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const PreviewWidget = dynamic(
  () => import('@conversly/chat-widget').then((mod) => mod.PreviewWidget),
  { ssr: false }
);
import { useCustomizationDraft, useCustomizationStore } from '@/store/chatbot/customization';
import type { UIConfigInput } from '@/types/customization';
import { SectionHeader } from './SectionHeader';
import { ContentTab } from './ContentTab';
import { AppearanceTab } from './AppearanceTab';
import { AITab } from './AITab';
import { IntegrationTab } from './IntegrationTab';

interface CustomizationTabProps {
  chatbotId: string;
  systemPrompt: string;
}

export function CustomizationTab({ chatbotId, systemPrompt: initialSystemPrompt }: CustomizationTabProps) {
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  // Update systemPrompt when initialSystemPrompt changes
  useEffect(() => {
    setSystemPrompt(initialSystemPrompt);
  }, [initialSystemPrompt]);

  // Icons array for widget customization
  const icons = [
    { id: 'chat', component: <MessageCircle className="w-6 h-6" /> },
    { id: 'bot', component: <Bot className="w-6 h-6" /> },
    { id: 'brain', component: <BrainCircuit className="w-6 h-6" /> },
    { id: 'help', component: <HelpCircle className="w-6 h-6" /> },
    { id: 'message', component: <MessageSquare className="w-6 h-6" /> },
  ];

  // Pull centralized draft + actions from the store
  const draft = useCustomizationDraft();
  const {
    setDraftConfig,
    loadCustomization,
    saveCustomization,
    resetDraftFromSaved,
    isSaving,
    // Domain management
    domains,
    isLoadingDomains,
    isSavingDomain,
    loadDomains,
    addDomain,
    // API Key management
    apiKey,
    isLoadingApiKey,
    isCreatingApiKey,
    loadApiKey,
    generateApiKey,
  } = useCustomizationStore();

  // Local default to seed the store on first mount
  const defaultConfig: UIConfigInput = {
    DisplayName: 'Support Bot',
    InitialMessage: 'Hi! How can I help you today? 👋',
    starterQuestions: ['What is this about?', 'How do I get started?', '', ''],
    messagePlaceholder: 'Message...',
    keepShowingSuggested: false,
    collectFeedback: true,
    allowRegenerate: true,
    dismissibleNoticeText: '',
    footerText: '',
    autoShowInitial: true,
    autoShowDelaySec: 3,
    widgetEnabled: true,
    primaryColor: '#0e4b75',
    widgetBubbleColour: '#0e4b75',
    PrimaryIcon: 'https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/Screenshot%202025-11-01%20at%203.18.10%E2%80%AFpm.png',
    widgeticon: 'https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/Screenshot%202025-11-01%20at%203.18.10%E2%80%AFpm.png',
    buttonAlignment: 'right',
    showButtonText: false,
    buttonText: 'Chat with us',
    appearance: 'light',
    widgetButtonText: 'Chat with us',
    chatWidth: '350px',
    chatHeight: '500px',
    converslyWebId: '',
    uniqueClientId: '',
    testing: false,
  };

  // Load configuration on mount
  useEffect(() => {
    if (!draft) setDraftConfig(defaultConfig);
    loadCustomization(chatbotId).catch(() => { });
    loadDomains(chatbotId).catch(() => { });
    loadApiKey(chatbotId).catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatbotId]);

  const config: UIConfigInput = draft ?? defaultConfig;

  // Helper to update draft
  const updateConfig = (updates: Partial<UIConfigInput>) => {
    setDraftConfig({ ...config, ...updates });
  };

  // Icon upload handler
  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      if (!res.ok) throw new Error('Upload failed');
      const blob = await res.json();
      updateConfig({ PrimaryIcon: blob.url as string, widgeticon: '' });
      toast.success('Profile picture uploaded');
    } catch (e: any) {
      toast.error(e?.message || 'Upload failed');
    }
  };

  // Domain management handler
  const handleAddDomain = async (domain: string) => {
    await addDomain(chatbotId, domain);
  };

  // API key generation handler
  const handleGenerateApiKey = async () => {
    await generateApiKey(chatbotId);
  };

  return (
    <TooltipProvider>
      {/* Save Confirmation Dialog */}
      <AlertDialog open={showSaveConfirm} onOpenChange={setShowSaveConfirm}>
        <AlertDialogContent className="border-2 border-amber-500/50 bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="text-amber-500">⚠</span>
              Deploy Changes?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-muted-foreground pt-2">
              <span className="block font-semibold text-foreground mb-2">
                This will auto-deploy changes to your live chatbot.
              </span>
              If you have the widget deployed on your website, visitors will immediately see these updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2 pt-4">
            <AlertDialogCancel className="border-border">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await saveCustomization(chatbotId);
                  toast.success('Customization saved & deployed');
                } catch (err: any) {
                  toast.error(err?.message || 'Failed to save');
                }
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save & Deploy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6 pb-8">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="page-header mb-0">
            <h1 className="page-title">Customize</h1>
            <p className="page-subtitle">
              Configure your chatbot's appearance, behavior, and integrations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 mr-2">
              <span className="text-sm text-muted-foreground">Widget status</span>
              <input
                type="checkbox"
                checked={config.widgetEnabled}
                onChange={(e) => updateConfig({ widgetEnabled: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-muted/50 accent-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => resetDraftFromSaved()}
                className="border-border text-foreground hover:bg-muted/50"
              >
                Reset
              </Button>
              <Button
                disabled={isSaving}
                onClick={() => setShowSaveConfirm(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[80px]"
              >
                {isSaving ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
        <Separator />

        {/* Two-column layout: settings left, preview right */}
        <div className="grid lg:grid-cols-[1fr_580px] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            {/* Main Settings Tabs */}
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="bg-card/60 p-1 rounded-xl flex flex-wrap">
                <TabsTrigger
                  value="content"
                  className="font-sans text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Settings2 className="w-4 h-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="font-sans text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="font-sans text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  AI
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="font-sans text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Integration
                </TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content">
                <ContentTab config={config} updateConfig={updateConfig} />
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <AppearanceTab
                  config={config}
                  updateConfig={updateConfig}
                  icons={icons}
                  onIconUpload={handleIconUpload}
                />
              </TabsContent>

              {/* AI Tab */}
              <TabsContent value="ai">
                <AITab
                  config={config}
                  updateConfig={updateConfig}
                  systemPrompt={systemPrompt}
                  onSystemPromptChange={setSystemPrompt}
                  chatbotId={chatbotId}
                />
              </TabsContent>

              {/* Integration Tab */}
              <TabsContent value="integration">
                <IntegrationTab
                  config={config}
                  chatbotId={chatbotId}
                  systemPrompt={systemPrompt}
                  domains={domains}
                  isLoadingDomains={isLoadingDomains}
                  isSavingDomain={isSavingDomain}
                  onAddDomain={handleAddDomain}
                  apiKey={apiKey}
                  isLoadingApiKey={isLoadingApiKey}
                  isCreatingApiKey={isCreatingApiKey}
                  onGenerateApiKey={handleGenerateApiKey}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Right Column */}
          <div className="sticky top-6">
            <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 min-h-[600px]">
              <SectionHeader
                title="Live Preview"
                description="See how your chatbot will appear on your website"
                icon={Sparkles}
              />
              <div className="mt-6 flex justify-center">
                <div className="w-[420px] h-[620px] rounded-lg overflow-hidden shadow-lg">
                  <PreviewWidget
                    config={{
                      ...config,
                      suggestedMessages: config.starterQuestions,
                      alignChatButton: config.buttonAlignment,
                    } as PackageUIConfig}
                    contained
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

