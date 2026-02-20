"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import type { UIConfigInput } from "@/types/customization";

interface LivePreviewWidgetProps {
    chatbotId: string;
    config: UIConfigInput;
    className?: string;
    style?: React.CSSProperties;
}

export function LivePreviewWidget({
    chatbotId,
    config,
    className,
    style
}: LivePreviewWidgetProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Widget Base URL from environment or default
    const WIDGET_BASE_URL = process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:3001";

    // Construct iframe source URL
    // We use playground=true to signal playground/preview mode
    // We use testing=true (or false based on needs, but usually false for live preview of draft?) 
    // Actually, for customization preview, we want it to behave like the real widget but with overridden config.
    // 'testing=true' in PlaygroundWidget meant "don't load from API".
    // Here we DO want it to potentially load initial state but mostly we want to OVERRIDE it with our draft config.
    // Let's use testing=true to avoid double-loading or API calls if we are pushing all config via postMessage anyway.
    // However, existing EmbeddedWidget logic for testing=true loads a hardcoded default.
    // Let's stick to what PlaygroundWidget does: testing=false so it tries to load, but we override it immediately?
    // Or if we want to be purely driven by passed config, maybe we should use testing=true and sending FULL config?
    // Re-reading EmbeddedWidget: "In testing mode, use a default config instead of API call".
    // If we use testing=true, it loads defaults. Then we send 'widget:config_update' to override.
    // This seems safer than loading stale production config and then flashing to new config.

    // BUT! EmbeddedWidget logic:
    // useEffect(() => { ... if (merged.chatbotId || testing || playgroundOverrides) setConfig(merged) ... })
    // If we pass playground=true in URL, EmbeddedWidget sets isPlayground: true.

    // Let's use: playground=true & testing=true.
    // testing=true prevents API fetch.
    // playground=true sets isPlayground=true.
    // Then we send config updates.

    const iframeSrc = useMemo(() => {
        return `${WIDGET_BASE_URL}/embed/${chatbotId}?playground=true&testing=true&t=${Date.now()}`;
    }, [chatbotId, WIDGET_BASE_URL]);

    // Listen for widget:ready
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data || typeof event.data !== "object") return;
            if (event.data.type === "widget:ready") {
                setIframeLoaded(true);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Send configuration updates
    useEffect(() => {
        if (!iframeLoaded || !iframeRef.current?.contentWindow) return;

        // Map UIConfigInput to WidgetConfig expectation
        // Based on EmbeddedWidget.tsx transformation logic and UIConfigInput definition
        const widgetConfigPayload = {
            // Branding
            brandName: config.DisplayName,
            brandLogo: config.PrimaryIcon || undefined,
            primaryColor: config.primaryColor,
            bubbleColor: config.widgetBubbleColour,
            widgetIcon: config.widgeticon || undefined,

            // Content
            greeting: config.InitialMessage,
            placeholder: config.messagePlaceholder,
            footerText: config.footerText || undefined,
            dismissableNoticeText: config.dismissibleNoticeText || undefined,

            // Appearance
            appearance: config.appearance,
            position: config.alignChatButton === "left" ? "bottom-left" : "bottom-right",

            // Size & Layout (these affect the internal container in the iframe, if applicable)
            chatWidth: config.chatWidth,
            chatHeight: config.chatHeight,

            // Button Options
            showButtonText: config.showButtonText,
            buttonText: config.buttonText || config.widgetButtonText, // fallback

            // Behavior
            autoShowInitial: config.autoShowInitial,
            autoShowDelaySec: config.autoShowDelaySec,

            // Features
            enableVoice: config.callEnabled,
            collectUserFeedback: config.collectFeedback,
            regenerateMessages: config.allowRegenerate,
            continueSuggestedMessages: config.keepShowingSuggested,

            // Suggested Messages
            suggestedMessages: config.starterQuestions || [],

            // Attention
            messagePopupEnabled: config.attention?.messagePopupEnabled,
            popupSoundEnabled: config.attention?.popupSoundEnabled,
            popupSoundUrl: config.attention?.soundUrl,

        };

        const updateMessage = {
            source: "verly-widget-host",
            type: "widget:config_update",
            payload: widgetConfigPayload
        };

        iframeRef.current.contentWindow.postMessage(updateMessage, WIDGET_BASE_URL);

    }, [iframeLoaded, config, chatbotId]);

    return (
        <div className={className} style={style}>
            <iframe
                ref={iframeRef}
                src={iframeSrc}
                className="w-full h-full border-none bg-transparent"
                allow="microphone; camera; autoplay"
                title="Chat Widget Preview"
            />
        </div>
    );
}

