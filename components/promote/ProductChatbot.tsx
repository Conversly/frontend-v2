"use client";

import dynamic from "next/dynamic";

// ActualWidget component missing
type UIConfigInput = any;
import { useEffect, useState } from "react";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbotPublic } from "@/lib/api/chatbot";

interface ProductChatbotProps {
    chatbotId: string;
    embedded?: boolean;
}

export function ProductChatbot({ chatbotId, embedded }: ProductChatbotProps) {
    const [config, setConfig] = useState<UIConfigInput | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!chatbotId) return;

            try {
                const [widgetData, chatbotData] = await Promise.all([
                    getWidgetConfig(chatbotId),
                    getChatbotPublic(chatbotId),
                ]);

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
                    widgeticon: styles.widgeticon || "chat",
                    alignChatButton: styles.alignChatButton || "right",
                    showButtonText: styles.showButtonText ?? false,
                    buttonText: styles.buttonText || "Chat with us",
                    appearance: styles.appearance || "light",
                    widgetButtonText: styles.buttonText || "Chat with us",
                    chatWidth: "380px",
                    chatHeight: "600px",
                    converslyWebId: chatbotData.apiKey || "",
                    uniqueClientId: "",
                };

                setConfig(uiConfig);
            } catch (error) {
                console.error("Failed to load chatbot configuration:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [chatbotId]);

    if (isLoading || !config) return null;

    return (

        <div className="p-4 border rounded bg-muted text-center text-sm text-muted-foreground w-full">
            Chat Widget Unavailable (Missing Dependency)
        </div>);
}
