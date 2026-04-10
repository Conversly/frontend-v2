"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageSquareDashed, RefreshCcw } from "lucide-react";
import { PlaygroundWidget } from "@/components/PlaygroundWidget";
import { Card, CardContent } from "@/components/ui/card";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbot } from "@/lib/api/chatbot";
import type { UIConfigInput } from "@/types/customization";
import type { CustomAction } from "@/types/customActions";
import { cn } from "@/lib/utils";

interface ActionPlaygroundPanelProps {
  workspaceId: string;
  chatbotId: string;
  lastSavedAction?: CustomAction;
  enabled: boolean;
  hasUnsavedChanges: boolean;
  playgroundVersion: number;
}

function mapWidgetConfigToUiConfig(
  partial: Awaited<ReturnType<typeof getWidgetConfig>>["partial"],
): UIConfigInput {
  const styles = partial.styles || {};

  return {
    DisplayName: styles.displayName || "Support Bot",
    InitialMessage:
      (partial.initialMessage as string) || "Hi! How can I help you today?",
    starterQuestions: partial.suggestedMessages || [],
    messagePlaceholder: styles.messagePlaceholder || "Message...",
    keepShowingSuggested: !!styles.continueShowingSuggestedMessages,
    collectFeedback: !!styles.collectUserFeedback,
    allowRegenerate: !!styles.regenerateMessages,
    dismissibleNoticeText: styles.dismissableNoticeText || "",
    footerText: styles.footerText || "",
    autoShowInitial: styles.autoShowInitial ?? true,
    autoShowDelaySec: styles.autoShowDelaySec ?? 0,
    widgetEnabled: true,
    callEnabled: !!partial.callEnabled,
    attention: {
      messagePopupEnabled: !!partial.attention?.messagePopupEnabled,
      popupSoundEnabled: !!partial.attention?.popupSoundEnabled,
      soundUrl: partial.attention?.soundUrl || "",
    },
    primaryColor: styles.primaryColor || "#0e4b75",
    widgetBubbleColour: styles.widgetBubbleColour || "#0e4b75",
    PrimaryIcon: styles.PrimaryIcon || "",
    widgeticon: styles.widgeticon || "",
    alignChatButton: styles.alignChatButton || "right",
    buttonAlignment: styles.alignChatButton || "right",
    showButtonText: styles.showButtonText ?? false,
    buttonText: styles.buttonText || "Chat with us",
    appearance: styles.appearance || "light",
    widgetButtonText: styles.buttonText || "Chat with us",
    chatWidth: styles.chatWidth || "420px",
    chatHeight: styles.chatHeight || "620px",
    testing: true,
  };
}

export function ActionPlaygroundPanel({
  workspaceId,
  chatbotId,
  enabled,
  playgroundVersion,
}: ActionPlaygroundPanelProps) {
  const [config, setConfig] = useState<UIConfigInput | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPlaygroundData = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [widgetData, chatbotData] = await Promise.all([
          getWidgetConfig(chatbotId, true),
          getChatbot(workspaceId, chatbotId),
        ]);

        if (cancelled) return;

        setConfig(mapWidgetConfigToUiConfig(widgetData.partial));
        setSystemPrompt(chatbotData.systemPrompt || "");
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load action playground data:", error);
        setLoadError("Failed to load chatbot playground settings.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPlaygroundData();

    return () => {
      cancelled = true;
    };
  }, [chatbotId, workspaceId]);

  return (
    <Card className="h-full overflow-hidden border-border bg-card shadow-card">
      <CardContent
        className={cn(
          "flex min-h-[760px] items-center justify-center p-5 transition-opacity",
          !enabled && "opacity-75",
        )}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading playground...
          </div>
        ) : loadError ? (
          <div className="max-w-sm text-center text-sm text-destructive">
            {loadError}
          </div>
        ) : !config ? (
          <div className="max-w-sm text-center text-sm text-muted-foreground">
            Playground configuration is unavailable for this chatbot.
          </div>
        ) : enabled ? (
          <div className="h-[700px] w-full">
            <PlaygroundWidget
              key={`${chatbotId}-${playgroundVersion}`}
              chatbotId={chatbotId}
              config={config}
              systemPrompt={systemPrompt}
              model="gpt-5-mini"
              temperature={1}
              resetKey={playgroundVersion}
            />
          </div>
        ) : (
          <div className="flex max-w-sm flex-col items-center gap-4 text-center text-sm text-muted-foreground">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm">
              <MessageSquareDashed className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Playground unlocks after a full save
              </p>
              <p className="mt-2">
                Raw request testing still happens in the form. End-to-end AI
                behavior testing starts only after the action is fully valid and
                saved to the DEV branch.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs">
              <RefreshCcw className="h-3.5 w-3.5" />
              Save remounts the widget and clears the prior test conversation.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
