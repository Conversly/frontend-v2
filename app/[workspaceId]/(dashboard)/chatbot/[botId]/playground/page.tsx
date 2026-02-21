"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PlaygroundWidget } from "@/components/PlaygroundWidget";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbot } from "@/lib/api/chatbot";
import { upsertChannelPrompt } from "@/lib/api/prompt";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import posthog from "posthog-js";

export default function PlaygroundPage() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const workspaceId = Array.isArray(routeParams.workspaceId)
    ? routeParams.workspaceId[0]
    : routeParams.workspaceId;

  const [config, setConfig] = useState<any | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("gpt-5-mini");
  const [temperature, setTemperature] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  // For triggering widget refresh
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    posthog.capture("playground_page_viewed", {
      chatbot_id: botId
    });
  }, [botId]);

  useEffect(() => {
    const loadData = async () => {
      if (!botId) return;

      setIsLoading(true);
      try {
        // Fetch widget config and chatbot in parallel
        const [widgetData, chatbotData] = await Promise.all([
          getWidgetConfig(botId),
          getChatbot(workspaceId, botId),
        ]);

        // Convert payload to UIConfigInput (similar to customization store)
        const partial = widgetData.partial;
        const styles = partial.styles || {};

        const uiConfig: any = {
          DisplayName: styles.displayName || "Support Bot",
          InitialMessage: (partial.initialMessage as string) || "Hi! How can I help you today? 👋",
          suggestedMessages: partial.suggestedMessages || [],
          messagePlaceholder: styles.messagePlaceholder || "Message...",
          keepShowingSuggested: !!styles.continueShowingSuggestedMessages,
          collectFeedback: !!styles.collectUserFeedback,
          allowRegenerate: !!styles.regenerateMessages,
          dismissibleNoticeText: styles.dismissableNoticeText || "",
          footerText: styles.footerText || "",
          autoShowInitial: styles.autoShowInitial ?? true,
          autoShowDelaySec: styles.autoShowDelaySec ?? 0,
          primaryColor: styles.primaryColor || "#0e4b75",
          widgetBubbleColour: styles.widgetBubbleColour || "#0e4b75",
          PrimaryIcon: styles.PrimaryIcon || "",
          widgeticon: styles.widgeticon || "",
          alignChatButton: styles.alignChatButton || "right",
          showButtonText: styles.showButtonText ?? false,
          buttonText: styles.buttonText || "Chat with us",
          appearance: styles.appearance || "light",
          widgetButtonText: styles.buttonText || "Chat with us",
          chatWidth: "420px",
          chatHeight: "620px",
          testing: true,
        };

        setConfig(uiConfig);
        setSystemPrompt(chatbotData.systemPrompt || "");
      } catch (error) {
        console.error("Failed to load playground data:", error);
        toast.error("Failed to load chatbot configuration");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [botId]);

  const handleSavePrompt = async () => {
    posthog.capture("save_system_prompt_clicked", {
      chatbot_id: botId
    });

    if (!botId) return;

    setIsSavingPrompt(true);
    try {
      await upsertChannelPrompt({
        chatbotId: botId,
        channel: "WIDGET",
        systemPrompt,
      });
      toast.success("System prompt saved successfully");
    } catch (error) {
      console.error("Failed to save prompt:", error);
      toast.error("Failed to save system prompt");
    } finally {
      setIsSavingPrompt(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-destructive">Failed to load configuration</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Interface */}
        <div className="flex flex-1 items-center justify-center p-6 overflow-hidden">
          <div className="w-[420px] h-[620px] shadow-2xl rounded-lg overflow-hidden">
            <PlaygroundWidget
              key={widgetKey}
              chatbotId={botId}
              config={config}
              systemPrompt={systemPrompt}
              model={model}
              temperature={temperature}
            />
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-[380px] border-l bg-background flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-4 type-section-title tracking-tight">Configuration</h3>

                <div className="space-y-6">
                  {/* System Instruction Card */}
                  <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-muted/30 px-4 py-3 border-b flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="text-sm font-medium">System Instruction</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSavePrompt}
                        disabled={isSavingPrompt}
                        className="h-7 text-xs bg-background"
                      >
                        {isSavingPrompt ? "Saving..." : "Save"}
                      </Button>
                    </div>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="You are a helpful assistant..."
                      className="h-[250px] overflow-y-auto w-full resize-none border-0 focus-visible:ring-0 p-4 text-sm font-mono leading-relaxed bg-transparent"
                    />
                    <div className="px-4 py-2 bg-muted/30 border-t text-[10px] text-muted-foreground text-right tabular-nums">
                      {systemPrompt.length} characters
                    </div>
                  </div>

                  {/* Model Configuration Card */}
                  <div className="bg-card rounded-xl border shadow-sm p-4 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5 10 10 0 0 0-10 0 4 4 0 0 1 5 5 4 4 0 0 1 5 5" />
                      </svg>
                      <span className="text-sm font-medium">Model Settings</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">
                          Model
                        </label>
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-5">GPT-5</SelectItem>
                            <SelectItem value="gpt-5-mini">GPT-5 Mini</SelectItem>
                            <SelectItem value="gpt-5-nano">GPT-5 Nano</SelectItem>
                            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                            <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs text-muted-foreground">
                            Temperature
                          </label>
                          <span className="text-xs font-mono text-muted-foreground tabular-nums">
                            {temperature.toFixed(2)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.01"
                          value={temperature}
                          onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          className="w-full cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>Precise</span>
                          <span>Creative</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="px-6 pb-6 pt-2">
                <div className="rounded-lg bg-muted/30 p-4 border border-blue-100/50 dark:border-blue-900/20">
                  <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 text-blue-500"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="16" y2="12" />
                      <line x1="12" x2="12.01" y1="8" y2="8" />
                    </svg>
                    Playground Info
                  </h4>
                  <div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
                    <p>
                      This playground is your <strong>testing environment</strong>. It allows you to interact with your chatbot exactly as your users will, helping you verify behavior before deployment.
                    </p>
                    <p>
                      Use the <strong>System Instruction</strong> to define the bot's personality and rules. Changes here are saved and will apply to all future conversations.
                    </p>
                    <p>
                      Experiment with <strong>Models</strong> and <strong>Temperature</strong> to fine-tune responses. These settings are temporary for this session to help you find the perfect balance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
