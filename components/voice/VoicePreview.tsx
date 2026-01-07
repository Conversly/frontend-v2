"use client";

import * as React from "react";
import { App } from "./livekit/app/app";
import { APP_CONFIG_DEFAULTS, type AppConfig } from "./livekit/app-config";
import { AgentConfigState } from "./livekit/agent-config";

interface VoicePreviewProps {
    botId: string;
    agentConfig: AgentConfigState;
    agentName?: string;
    appConfigOverrides?: Partial<AppConfig>;
}

/**
 * Voice preview panel with LiveKit integration
 * Uses the full LiveKit frontend implementation from livekit/frontend-livekit
 */
export function VoicePreview({
    botId,
    agentConfig,
    agentName = "Voice Agent",
    appConfigOverrides,
}: VoicePreviewProps) {
    // Build app config (display-only)
    // agentName used for display; keep empty string for token to match Python agent registration
    const appConfig: AppConfig = React.useMemo(() => ({
        ...APP_CONFIG_DEFAULTS,
        startButtonText: 'Start Call',
        agentName: "voice-assistant", // Match backend and python agent
        ...appConfigOverrides,
    }), [appConfigOverrides]);

    return (
        <div className="flex w-1/3 flex-col bg-muted/5 h-full overflow-hidden">
            {/* Header */}
            <div className="flex flex-col h-14 justify-center border-b px-4 bg-background">
                <span className="text-sm font-medium">Sandbox Call Tester</span>
                <span className="text-xs text-muted-foreground">Testing only – does not affect live calls</span>
            </div>

            {/* LiveKit App */}
            <div className="flex-1 overflow-hidden">
                <App
                    appConfig={appConfig}
                    botId={botId}
                    agentConfig={agentConfig}
                />
            </div>
        </div>
    );
}
