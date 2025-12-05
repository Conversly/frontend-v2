"use client";

import * as React from "react";
import { App } from "./livekit/app/app";
import { APP_CONFIG_DEFAULTS, type AppConfig } from "./livekit/app-config";
import { AgentConfigState } from "./livekit/agent-config";

interface VoicePreviewProps {
    botId: string;
    config?: {
        systemPrompt?: string | null;
        voiceId?: string;
        language?: string;
    };
    agentName?: string;
}

/**
 * Voice preview panel with LiveKit integration
 * Uses the full LiveKit frontend implementation from livekit/frontend-livekit
 */
export function VoicePreview({ botId, config, agentName = "Voice Agent" }: VoicePreviewProps) {
    // Build app config
    // Note: agentName in appConfig is for display, but we pass empty string to match Python agent registration
    const appConfig: AppConfig = {
        ...APP_CONFIG_DEFAULTS,
        startButtonText: 'Start Call',
        agentName: "", // Empty string to match Python agent registration (registered with empty agent_name)
    };

    // Build agent config from current voice settings
    const agentConfig: AgentConfigState = React.useMemo(() => ({
        instructions: config?.systemPrompt || "You are a helpful voice assistant.",
        tts_voice: config?.voiceId || "21m00Tcm4TlvDq8ikWAM", // Default ElevenLabs voice
        stt_language: config?.language || "en",
        tts_language: config?.language || "en",
    }), [config]);

    const handleConfigChange = React.useCallback((newConfig: AgentConfigState) => {
        // Optional: handle config changes if needed
        console.log('Agent config changed:', newConfig);
    }, []);

    return (
        <div className="flex w-1/3 flex-col bg-muted/5 h-full overflow-hidden">
            {/* Header */}
            <div className="flex h-12 items-center justify-between border-b px-4 bg-background">
                <span className="text-sm font-medium">Preview</span>
            </div>

            {/* LiveKit App */}
            <div className="flex-1 overflow-hidden">
                <App 
                    appConfig={appConfig}
                    botId={botId}
                    agentConfig={agentConfig}
                    onConfigChange={handleConfigChange}
                />
            </div>
        </div>
    );
}
