'use client';

import { bootstrapAgentSetup } from '@/lib/api/setup';
import type { BootstrapSetupInput, BootstrapSetupResult } from '@/types/setup';
import type { DataSourceItem } from '@/types/datasource';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { useSystemPromptStore } from '@/store/chatbot/system-prompt';
import { useCustomizationStore } from '@/store/chatbot/customization';

function mapDataSources(items: DataSourceItem[]) {
  return items.map((s) => ({
    id: String(s.id),
    type:
      s.type === 'DOCUMENT'
        ? 'file'
        : s.type === 'URL'
        ? 'url'
        : 'text',
    name: s.name,
    createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : undefined,
  }));
}

export async function runInitialSetup(
  input: BootstrapSetupInput
): Promise<BootstrapSetupResult> {
  const result = await bootstrapAgentSetup(input);

  // Hydrate data sources
  if (result.searchSources?.data) {
    const ds = mapDataSources(result.searchSources.data);
    useDataSourcesStore.getState().setSources(ds);
  }

  // Hydrate system prompt
  if (result.inferPrompt?.systemPrompt) {
    useSystemPromptStore.getState().setSavedPrompt(result.inferPrompt.systemPrompt);
  }

  // Hydrate customization (name, color, logo if provided)
  const customization = useCustomizationStore.getState();
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


