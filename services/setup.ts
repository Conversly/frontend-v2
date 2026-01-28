'use client';

import { bootstrapAgentSetup } from '@/lib/api/setup';
import type { BootstrapSetupInput, BootstrapSetupResult } from '@/types/setup';
import type { DataSourceItem } from '@/types/datasource';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import type { DataSource } from '@/store/chatbot/data-sources';
import { useCustomizationStore } from '@/store/chatbot/customization';

function mapDataSources(items: DataSourceItem[]): DataSource[] {
  return items.map((s) => {
    const t = String(s.type || '').toLowerCase();
    const isUrl = t.includes('url') || t.includes('website') || t === 'web';
    const isFile = t.includes('doc') || t.includes('file') || t === 'document';

    return {
      id: String(s.id),
      type: isUrl ? 'url' : isFile ? 'file' : 'text',
      // For URLs, use citation (actual URL) instead of name (just domain)
      name: isUrl && s.citation ? s.citation : s.name,
      createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : undefined,
    };
  });
}

/**
 * Runs the initial setup flow sequentially:
 * 1. inferPrompt → name, description, systemPrompt, logoUrl
 * 2. generateTopics → topics
 * 3. searchSources → dataSources
 * 4. generateWidgetConfig → logo, color, widget styles, suggestions, domains
 *
 * The widget-config endpoint handles:
 * - Logo detection & extraction
 * - Primary color extraction from logo
 * - Initial message & suggested messages generation
 * - Widget configuration creation/update
 * - Origin domain setup for API validation
 */
export async function runInitialSetup(
  input: BootstrapSetupInput
): Promise<BootstrapSetupResult> {
  const result = await bootstrapAgentSetup(input);

  // Hydrate data sources store
  if (result.searchSources?.data) {
    const ds = mapDataSources(result.searchSources.data);
    useDataSourcesStore.getState().setSources(ds);
  }

  // Hydrate customization store with widget config results
  if (result.widgetConfig) {
    const customization = useCustomizationStore.getState();

    // Load existing customization first (if any)
    if (customization.loadCustomization) {
      try {
        await customization.loadCustomization(input.chatbotId);
      } catch {
        // Non-fatal; proceed with defaults
      }
    }

    // Apply the widget config from setup
    const draft = customization.draftConfig;
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
          callEnabled: false,
          attention: {
            messagePopupEnabled: false,
            popupSoundEnabled: false,
            soundUrl: '',
          },
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
          converslyWebId: '',
          uniqueClientId: '',
          testing: false,
        }),
        callEnabled: false,
        attention: {
          messagePopupEnabled: true,
          popupSoundEnabled: true,
        },

        DisplayName: result.inferPrompt?.name || draft?.DisplayName || 'Support Bot',
        PrimaryIcon: result.widgetConfig.logoUrl || draft?.PrimaryIcon || '',
        primaryColor: result.widgetConfig.primaryColor || draft?.primaryColor || '#0e4b75',
        widgetBubbleColour: result.widgetConfig.primaryColor || draft?.widgetBubbleColour || '#0e4b75',
        InitialMessage: result.widgetConfig.initialMessage || draft?.InitialMessage || 'Hi! How can I help you today? 👋',
        starterQuestions: result.widgetConfig.suggestedMessages || draft?.starterQuestions || [],
      });
    }
  }

  return result;
}
