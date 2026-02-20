"use client";

import React, { useEffect, useRef, useState } from "react";

interface PlaygroundWidgetProps {
    chatbotId: string;
    config: any; // Using any for now to match UIConfigInput structure
    systemPrompt: string;
    model: string;
    temperature: number;
}

export function PlaygroundWidget({
    chatbotId,
    config,
    systemPrompt,
    model,
    temperature
}: PlaygroundWidgetProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Widget Base URL from environment or default to localhost:3000
    const WIDGET_BASE_URL = process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:3001";

    // Construct iframe source URL
    // We use testing=true to avoid immediate API calls until we send config
    // We add a timestamp to force reload if chatbotId changes (though key prop in parent handles that too)
    // Construct iframe source URL
    // We use playground=true to signal playground mode immediately
    // We use testing=false to avoid immediate API calls until we send config
    // Memoize to prevent reload on every render
    const iframeSrc = React.useMemo(() => {
        return `${WIDGET_BASE_URL}/embed/${chatbotId}?playground=true&testing=false&t=${Date.now()}`;
    }, [chatbotId, WIDGET_BASE_URL]);

    // Listen for widget:ready message
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data || typeof event.data !== "object") return;
            // Check if message is from our widget
            if (event.data.type === "widget:ready") {
                setIframeLoaded(true);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Send configuration updates to the iframe
    useEffect(() => {
        // We wait for widget:ready (iframeLoaded) before sending
        if (!iframeLoaded || !iframeRef.current?.contentWindow) return;

        // Send initial config / style updates
        const styleUpdate = {
            source: "verly-widget-host",
            type: "widget:config_update",
            payload: {
                // Map UI config to WidgetConfig expectation
                brandName: config.DisplayName,
                greeting: config.InitialMessage,
                primaryColor: config.primaryColor,
                bubbleColor: config.widgetBubbleColour,
            }
        };

        // Send playground settings (system prompt, model, etc.)
        const playgroundUpdate = {
            source: "verly-widget-host",
            type: "widget:playground_update",
            payload: {
                chatbotId,
                systemPrompt,
                model,
                temperature,
                brandName: config.DisplayName,
                greeting: config.InitialMessage,
            }
        };

        iframeRef.current.contentWindow.postMessage(styleUpdate, WIDGET_BASE_URL);
        iframeRef.current.contentWindow.postMessage(playgroundUpdate, WIDGET_BASE_URL);

    }, [iframeLoaded, chatbotId, config, systemPrompt, model, temperature]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden border bg-background relative">
            <iframe
                ref={iframeRef}
                src={iframeSrc}
                className="w-full h-full border-none"
                // onLoad={() => setIframeLoaded(true)} // Handled by widget:ready message now
                allow="microphone; camera"
                title="Chat Widget Playground"
            />
            {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <div className="text-sm text-muted-foreground">Loading widget...</div>
                </div>
            )}
        </div>
    );
}
