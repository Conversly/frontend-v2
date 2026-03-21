"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AssistantPage() {
    const routeParams = useParams<{ workspaceId: string; botId: string }>();
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Ensure we are pointing to the running chat-widget Next.js instance on port 3001
    const WIDGET_BASE_URL = process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:3001";

    // Choose the full-page chat layout route instead of the popup embed route
    const iframeSrc = `${WIDGET_BASE_URL}/chat/${botId}`;

    // Listen for widget:ready message (optional, but good for loading states)
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

    return (
        <div className="w-full h-[calc(100vh-64px)] overflow-hidden bg-background relative flex flex-col">
            <div className="px-6 py-6 border-b flex-shrink-0">
                <h1 className="text-2xl font-semibold tracking-tight">AI Assistant</h1>
                <p className="text-sm text-muted-foreground mt-1">Interact with your deployed agent directly</p>
            </div>
            <div className="flex-1 w-full bg-muted/20 relative">
                <iframe
                    ref={iframeRef}
                    src={iframeSrc}
                    className="w-full h-full border-none"
                    allow="microphone; camera"
                    onLoad={() => setIframeLoaded(true)}
                />
                {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2" />
                    </div>
                )}
            </div>
        </div>
    );
}
