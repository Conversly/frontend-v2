"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbot } from "@/lib/api/chatbot";
import type { UIConfigInput } from "@/types/customization";
import { CornerWidget } from "@/components/widget/CornerWidget";
import { getChatbotResponse, submitFeedback } from "@/lib/api/response";
import { convertBackendToUIMessage, convertUIToBackendMessages } from "@/types/response";
import type { Message } from "@/components/widget/helpers/chat-message";

interface ProductChatbotProps {
    chatbotId: string;
    embedded?: boolean;
}

export function ProductChatbot({ chatbotId, embedded }: ProductChatbotProps) {
    const [config, setConfig] = useState<UIConfigInput | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!chatbotId) return;

            try {
                const [widgetData, chatbotData] = await Promise.all([
                    getWidgetConfig(chatbotId),
                    getChatbot(chatbotId),
                ]);

                const partial = widgetData.partial;
                const styles = partial.styles || {};

                const uiConfig: UIConfigInput = {
                    DisplayName: styles.displayName || "Support Bot",
                    InitialMessage: (partial.initialMessage as string) || "Hi! How can I help you today? 👋",
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
                    primaryColor: styles.primaryColor || "#0e4b75",
                    widgetBubbleColour: styles.widgetBubbleColour || "#0e4b75",
                    PrimaryIcon: styles.PrimaryIcon || "",
                    widgeticon: styles.widgeticon || "chat",
                    buttonAlignment: styles.alignChatButton || "right",
                    showButtonText: styles.showButtonText ?? false,
                    buttonText: styles.buttonText || "Chat with us",
                    appearance: styles.appearance || "light",
                    widgetButtonText: styles.buttonText || "Chat with us",
                    chatWidth: "380px",
                    chatHeight: "600px",
                    displayStyle: "corner",
                    converslyWebId: chatbotData.apiKey || "",
                    uniqueClientId: "",
                };

                setConfig(uiConfig);
            } catch (error) {
                console.error("Failed to load chatbot configuration:", error);
            }
        };

        loadData();
    }, [chatbotId]);

    const uniqueClientId = useMemo(() => {
        if (!config) return "";
        if (typeof window === "undefined") return config.uniqueClientId || "";
        const KEY = "conversly_unique_client_id";
        let id = config.uniqueClientId || window.localStorage.getItem(KEY);
        if (!id) {
            id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
            window.localStorage.setItem(KEY, id);
        }
        return id;
    }, [config?.uniqueClientId]);

    useEffect(() => {
        if (!config) return;

        const initialMessages: Message[] = config.InitialMessage
            ? [
                {
                    id: "initial-assistant",
                    role: "assistant",
                    content: config.InitialMessage,
                    createdAt: new Date(),
                },
            ]
            : [];

        setMessages(initialMessages);
    }, [config?.InitialMessage]);

    const sendToBackend = async (allMessages: Message[], mode: string = "default") => {
        if (!config) throw new Error("Config not loaded");

        const backendMessages = convertUIToBackendMessages(allMessages);

        const res = await getChatbotResponse(
            backendMessages,
            {
                uniqueClientId,
                converslyWebId: config.converslyWebId,
            },
            mode,
            typeof window !== "undefined" ? { originUrl: window.location.href } : undefined
        );
        return convertBackendToUIMessage(res, "assistant");
    };

    const handleSendMessage = async (content: string) => {
        const trimmed = content.trim();
        if (!trimmed) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmed,
            createdAt: new Date(),
        };

        const next = [...messages, userMessage];
        setMessages(next);
        setInput("");
        setIsTyping(true);
        try {
            const assistantMessage = await sendToBackend(next, "default");
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSendMessage(suggestion);
    };

    const handleRegenerate = async () => {
        const lastUser = [...messages].reverse().find((m) => m.role === "user");
        if (!lastUser) return;
        setIsTyping(true);
        try {
            const assistantMessage = await sendToBackend(messages, "regenerate");
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsTyping(false);
        }
    };

    const handleRating = async (
        messageId: string,
        rating: "thumbs-up" | "thumbs-down",
        feedback?: {
            issue?: string;
            incorrect?: boolean;
            irrelevant?: boolean;
            unaddressed?: boolean;
        }
    ) => {
        const sentiment = rating === "thumbs-up" ? "like" : "dislike";
        const comment = feedback
            ? typeof feedback.issue === "string"
                ? feedback.issue
                : [
                    feedback.incorrect && "Incorrect",
                    feedback.irrelevant && "Irrelevant",
                    feedback.unaddressed && "Unaddressed",
                    feedback.issue,
                ]
                    .filter(Boolean)
                    .join(" | ")
            : undefined;
        try {
            await submitFeedback(messageId, sentiment as "like" | "dislike", comment);
        } catch {
            // ignore errors
        }
    };

    if (!config) return null;

    return (
        <CornerWidget
            config={config}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            messages={messages}
            input={input}
            setInput={setInput}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            handleSuggestionClick={handleSuggestionClick}
            handleRegenerate={handleRegenerate}
            handleRating={handleRating}
            embedded={embedded}
        />
    );
}
