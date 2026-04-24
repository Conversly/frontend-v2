"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCcw, Play } from "lucide-react";
import { PlaygroundWidget } from "@/components/PlaygroundWidget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbot } from "@/lib/api/chatbot";
import type { UIConfigInput } from "@/types/customization";
import type { CustomAction } from "@/types/customActions";
import { cn } from "@/lib/utils";
import {
  useEditorFormData,
  useEditorTestValues,
} from "@/store/custom-action-editor";
import { buildRequestPreview } from "./steps/TestAndSaveStep";

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

function LiveRequestPreview() {
  const formData = useEditorFormData();
  const testValues = useEditorTestValues();
  const preview = buildRequestPreview(formData, testValues);
  const method = formData.apiConfig.method;
  const authType = formData.apiConfig.authType || "none";
  const hasUrl = !!preview.url;

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-y-auto p-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Live request preview
          </span>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Updates as you edit
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-xs rounded-md border border-border bg-muted/20 px-3 py-2 sm:grid-cols-[auto_1fr]">
        <span className="text-muted-foreground">Name</span>
        <span className="font-medium text-foreground truncate">
          {formData.displayName || formData.name || "—"}
        </span>
        <span className="text-muted-foreground">Method</span>
        <span>
          <Badge variant="outline" className="h-5 text-[10px] font-bold uppercase">
            {method}
          </Badge>
        </span>
        <span className="text-muted-foreground">Auth</span>
        <span className="capitalize text-foreground">{authType}</span>
      </div>

      <div className="rounded-md border border-border bg-muted/20 p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          URL
        </div>
        <div className="font-mono text-xs break-all">
          {hasUrl ? preview.url : <span className="text-muted-foreground">Add a URL on the Connection tab.</span>}
        </div>
      </div>

      <div className="rounded-md border border-border bg-muted/20 p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          Headers
        </div>
        <pre className="font-mono text-xs whitespace-pre-wrap break-all">
          {JSON.stringify(preview.headers, null, 2)}
        </pre>
      </div>

      <div className="rounded-md border border-border bg-muted/20 p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          Body
        </div>
        <pre className="font-mono text-xs whitespace-pre-wrap break-all">
          {preview.body !== undefined
            ? JSON.stringify(preview.body, null, 2)
            : "—"}
        </pre>
      </div>

      <p className="text-[11px] text-muted-foreground px-1">
        Playground chat unlocks after a full save.
      </p>
    </div>
  );
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
    <Card className="overflow-hidden border-border bg-card shadow-card">
      <CardContent
        className={cn(
          "flex min-h-[600px] xl:min-h-[720px] 2xl:min-h-[800px] items-stretch justify-center p-5 transition-opacity",
          !enabled && "opacity-100",
        )}
      >
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading playground...
          </div>
        ) : loadError ? (
          <div className="flex flex-1 items-center justify-center max-w-sm text-center text-sm text-destructive">
            {loadError}
          </div>
        ) : enabled && config ? (
          <div className="h-[600px] xl:h-[680px] 2xl:h-[760px] w-full">
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
          <div className="flex flex-1 flex-col gap-3">
            <LiveRequestPreview />
            {!enabled && (
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-[11px] text-muted-foreground self-start">
                <RefreshCcw className="h-3 w-3" />
                Save to unlock end-to-end chat testing.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
