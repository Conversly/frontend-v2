"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { UIConfigInput } from "@conversly/chat-widget";

const ActualWidget = dynamic(
  () => import("@conversly/chat-widget").then((mod) => mod.ActualWidget),
  { ssr: false }
);
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbot } from "@/lib/api/chatbot";
import { upsertChannelPrompt } from "@/lib/api/prompt";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PlaygroundPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const [config, setConfig] = useState<UIConfigInput | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("gemini-2.0");
  const [temperature, setTemperature] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  // For triggering widget refresh
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!botId) return;
      
      setIsLoading(true);
      try {
        // Fetch widget config and chatbot in parallel
        const [widgetData, chatbotData] = await Promise.all([
          getWidgetConfig(botId),
          getChatbot(botId),
        ]);

        // Convert payload to UIConfigInput (similar to customization store)
        const partial = widgetData.partial;
        const styles = partial.styles || {};
        
        const uiConfig: UIConfigInput = {
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
          converslyWebId: chatbotData.apiKey || "",
          uniqueClientId: "",
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

  const handleResetChat = () => {
    // Trigger widget remount by changing key
    setWidgetKey(prev => prev + 1);
    toast.success("Chat reset");
  };

  // Auto-reset chat when model or temperature changes
  useEffect(() => {
    if (!isLoading && config) {
      setWidgetKey(prev => prev + 1);
    }
  }, [model, temperature]);

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
            <ActualWidget 
              key={widgetKey}
              config={config} 
              playgroundConfig={{
                chatbotId: botId,
                systemPrompt,
                model,
                temperature,
              }}
              contained
            />
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-[380px] border-l bg-background overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold">Configuration</h3>
              
              <div className="space-y-5">
                {/* System Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-foreground/70">
                      System Prompt
                    </label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSavePrompt}
                      disabled={isSavingPrompt}
                      className="h-7 text-xs"
                    >
                      {isSavingPrompt ? "Saving..." : "Save"}
                    </Button>
                  </div>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="You are a helpful assistant..."
                    className="h-[200px] font-mono text-[11px] resize-none overflow-y-auto"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {systemPrompt.length} characters
                  </p>
                </div>

                {/* Model */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-foreground/70">
                    Model
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="gemini-2.0">Gemini 2.0</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
                
                {/* Temperature */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-foreground/70">
                    Temperature: {temperature.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={handleResetChat}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                  Reset Chat
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="pt-4 border-t">
              <h3 className="mb-3 text-sm font-semibold">About</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  The playground allows you to test your chatbot with different configurations
                  without affecting the production settings.
                </p>
                <p className="pt-2">
                  <strong className="text-foreground">Note:</strong> Changes to model and temperature
                  are local to this session only. Save the system prompt to persist changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
