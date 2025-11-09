'use client';

import { analyzeImage, bootstrapAgentSetup } from '@/lib/api/setup';
import type { BootstrapSetupInput, BootstrapSetupResult } from '@/types/setup';
import type { DataSourceItem } from '@/types/datasource';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import type { DataSource } from '@/store/chatbot/data-sources';
import { useSystemPromptStore } from '@/store/chatbot/system-prompt';
import { useCustomizationStore } from '@/store/chatbot/customization';

function mapDataSources(items: DataSourceItem[]): DataSource[] {
  return items.map((s) => ({
    id: String(s.id),
    type: (() => {
      const t = String(s.type || '').toLowerCase();
      if (t.includes('url') || t.includes('website') || t === 'web') return 'url';
      if (t.includes('doc') || t.includes('file') || t === 'document') return 'file';
      return 'text';
    })(),
    name: s.name,
    createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : undefined,
  }));
}

export async function runInitialSetup(
  input: BootstrapSetupInput
): Promise<BootstrapSetupResult> {
  const result = await bootstrapAgentSetup(input);

  if (!result.analyzeImage && result.inferPrompt?.logoUrl) {
    try {
      const analysis = await analyzeImage({
        chatbotId: input.chatbotId,
        imageUrl: result.inferPrompt.logoUrl,
      });
      result.analyzeImage = analysis;
    } catch {
    }
  }

  // Hydrate data sources
  if (result.searchSources?.data) {
    const ds = mapDataSources(result.searchSources.data);
    useDataSourcesStore.getState().setSources(ds);
  }

  // Hydrate system prompt
  if (result.inferPrompt?.systemPrompt) {
    useSystemPromptStore.getState().setSavedPrompt(result.inferPrompt.systemPrompt);
  }

  // Hydrate customization from server, then apply suggestions (name, color, logo if provided)
  const customization = useCustomizationStore.getState();
  if (customization.loadCustomization) {
    try {
      await customization.loadCustomization(input.chatbotId);
    } catch {
      // Non-fatal; proceed with local defaults if remote load fails
    }
  }
  const draft = customization.draftConfig ?? customization.savedPayload ? customization.draftConfig : null;
  const primaryColor =
    result.analyzeImage?.primaryColor ||
    customization.draftConfig?.primaryColor ||
    '#0e4b75';
  const displayName =
    result.inferPrompt?.name ||
    customization.draftConfig?.DisplayName ||
    'Support Bot';
  const primaryIcon =
    result.inferPrompt?.logoUrl || customization.draftConfig?.PrimaryIcon || '';

  if (customization.setDraftConfig) {
    customization.setDraftConfig({
      ...(draft ?? {
        DisplayName: 'Support Bot',
        InitialMessage: 'Hi! How can I help you today? 👋',
        starterQuestions: [],
        messagePlaceholder: 'Message...',
        keepShowingSuggested: false,
        collectFeedback: false,
        allowRegenerate: true,
        dismissibleNoticeText: '',
        footerText: '',
        autoShowInitial: false,
        autoShowDelaySec: 3,
        widgetEnabled: true,
        primaryColor: '#0e4b75',
        widgetBubbleColour: '#0e4b75',
        PrimaryIcon: '',
        widgeticon: 'chat',
        buttonAlignment: 'right',
        showButtonText: false,
        buttonText: 'Chat with us',
        appearance: 'light',
        widgetButtonText: 'Chat with us',
        chatWidth: '350px',
        chatHeight: '500px',
        displayStyle: 'corner',
        converslyWebId: '',
        uniqueClientId: '',
        testing: false,
      }),
      DisplayName: displayName,
      PrimaryIcon: primaryIcon,
      primaryColor,
      widgetBubbleColour: primaryColor,
    });
  }

  return result;
}


