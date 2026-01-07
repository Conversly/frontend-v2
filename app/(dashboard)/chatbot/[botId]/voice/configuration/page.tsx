"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useVoiceConfig, useUpdateVoiceConfig } from "@/services/voice";
import { useChannelPrompt, useUpsertChannelPrompt } from "@/services/prompt";
import {
    Loader2,
    Save,
    Code,
    Play,
    MessageSquare,
    Phone,
} from "lucide-react";
import { toast } from "sonner";
import { type AgentConfigState } from "@/components/voice/livekit/agent-config";

// Import sub-components
import { VoiceConfig } from "@/components/voice/VoiceConfig";
import { VoicePreview } from "@/components/voice/VoicePreview";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VoiceConfigPage() {
    const params = useParams();
    const botId = params.botId as string;

    const { data: config, isLoading } = useVoiceConfig(botId);
    const { data: voicePrompt, isLoading: isLoadingPrompt } = useChannelPrompt(botId, "VOICE");
    const updateConfig = useUpdateVoiceConfig();
    const upsertPrompt = useUpsertChannelPrompt();

    const [localConfig, setLocalConfig] = React.useState<any>(null);
    const [localPrompt, setLocalPrompt] = React.useState<string>("");
    const [isDirty, setIsDirty] = React.useState(false);

    React.useEffect(() => {
        if (config) {
            // Parse backend config to frontend state
            // Default to Google Gemini / AssemblyAI / Google TTS if not set
            const [llmProvider, llmModel] = config.llmModel ? config.llmModel.split(':') : ['gemini', 'gemini-1.5-flash'];
            const [sttProvider] = config.sttModel ? config.sttModel.split(':') : ['assemblyai'];
            const [ttsProvider] = config.ttsModel ? config.ttsModel.split(':') : ['google'];

            setLocalConfig({
                ...config,
                llmProvider,
                llmModel: llmModel || config.llmModel,
                sttModel: sttProvider,
                ttsModel: ttsProvider,
                sttLanguage: config.language,
                voiceSpeed: config.voiceSettings?.speed,
                voiceStability: config.voiceSettings?.stability,
                firstMessageMode: config.voiceSettings?.firstMessageMode || 'assistant',
            });
        }
    }, [config]);

    // Sync local prompt with fetched voice prompt
    React.useEffect(() => {
        if (voicePrompt?.systemPrompt) {
            setLocalPrompt(voicePrompt.systemPrompt);
        }
    }, [voicePrompt]);

    const handleChange = (field: string, value: any) => {
        if (field === "systemPrompt") {
            setLocalPrompt(value);
        } else {
            setLocalConfig((prev: any) => ({ ...prev, [field]: value }));
        }
        setIsDirty(true);
    };

    const handleSave = () => {
        if (!localConfig || !config) return;

        // Format frontend state back to backend config
        const {
            llmProvider,
            llmModel,
            sttModel,
            ttsModel,
            sttLanguage,
            voiceSpeed,
            voiceStability,
            firstMessageMode,
            ...rest
        } = localConfig;

        // Helper to reconstruct full model string with defaults
        const getFullSttModel = (provider: string) => {
            if (config.sttModel && config.sttModel.startsWith(provider)) return config.sttModel;
            if (provider === 'assemblyai') return 'assemblyai:assemblyai_default';
            return provider;
        };

        const getFullTtsModel = (provider: string) => {
            if (config.ttsModel && config.ttsModel.startsWith(provider)) return config.ttsModel;
            if (provider === 'google') return 'google:en-US-Neural2-F';
            return provider;
        };

        const payload = {
            ...rest,
            llmModel: `${llmProvider}:${llmModel}`,
            sttModel: getFullSttModel(sttModel),
            ttsModel: getFullTtsModel(ttsModel),
            language: sttLanguage,
            voiceSettings: {
                ...rest.voiceSettings,
                speed: voiceSpeed,
                stability: voiceStability,
                firstMessageMode: firstMessageMode,
            },
        };

        // Save voice config and prompt in parallel
        Promise.all([
            new Promise<void>((resolve, reject) => {
                updateConfig.mutate(
                    { chatbotId: botId, data: payload },
                    { onSuccess: () => resolve(), onError: reject }
                );
            }),
            new Promise<void>((resolve, reject) => {
                upsertPrompt.mutate(
                    { chatbotId: botId, channel: "VOICE", systemPrompt: localPrompt },
                    { onSuccess: () => resolve(), onError: reject }
                );
            }),
        ])
            .then(() => {
                setIsDirty(false);
                toast.success("Configuration saved");
            })
            .catch((error) => {
                toast.error("Failed to save configuration");
                console.error(error);
            });
    };

    if (isLoading || !localConfig) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const previewAgentConfig: AgentConfigState = {
        instructions: localPrompt || "You are a helpful voice assistant.",
        tts_voice: localConfig.voiceId || "en-US-Neural2-F",
        stt_language: localConfig.sttLanguage || localConfig.language || "en",
        tts_language: localConfig.language || "en",
    };

    return (
        <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-background">
            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Configuration */}
                <div className="flex w-2/3 flex-col border-r h-full overflow-hidden">
                    <VoiceConfig
                        config={{ ...localConfig, systemPrompt: localPrompt }}
                        onChange={handleChange}
                        onSave={handleSave}
                        isDirty={isDirty}
                        isSaving={updateConfig.isPending || upsertPrompt.isPending}
                        agentName={localConfig.name || "Voice Agent"}
                        botId={botId}
                    />
                </div>

                {/* Right Pane: Preview */}
                <VoicePreview
                    botId={botId}
                    agentConfig={previewAgentConfig}
                    agentName={localConfig.name || "Voice Agent"}
                />
            </div>
        </div>
    );
}
