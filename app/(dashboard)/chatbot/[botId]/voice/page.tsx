"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useVoiceConfig, useUpdateVoiceConfig } from "@/services/voice";
import {
    Loader2,
    Save,
    Code,
    Play,
    MessageSquare,
    Phone,
} from "lucide-react";
import { toast } from "sonner";

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
    const updateConfig = useUpdateVoiceConfig();

    const [localConfig, setLocalConfig] = React.useState<any>(null);
    const [isDirty, setIsDirty] = React.useState(false);

    React.useEffect(() => {
        if (config) {
            // Parse backend config to frontend state
            const [llmProvider, llmModel] = config.llmModel ? config.llmModel.split(':') : ['openai', 'gpt-4o'];
            const [sttProvider] = config.sttModel ? config.sttModel.split(':') : ['deepgram'];
            const [ttsProvider] = config.ttsModel ? config.ttsModel.split(':') : ['elevenlabs'];

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

    const handleChange = (field: string, value: any) => {
        setLocalConfig((prev: any) => ({ ...prev, [field]: value }));
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
            if (provider === 'deepgram') return 'deepgram:nova-2';
            if (provider === 'assemblyai') return 'assemblyai:assemblyai_default';
            if (provider === 'cartesia') return 'cartesia:cartesia_default';
            return provider;
        };

        const getFullTtsModel = (provider: string) => {
            if (config.ttsModel && config.ttsModel.startsWith(provider)) return config.ttsModel;
            if (provider === 'elevenlabs') return 'elevenlabs:eleven_turbo_v2_5';
            if (provider === 'cartesia') return 'cartesia:sonic-english';
            if (provider === 'rime') return 'rime:rime_default';
            if (provider === 'inworld') return 'inworld:inworld_default';
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

        updateConfig.mutate(
            { chatbotId: botId, data: payload },
            {
                onSuccess: () => {
                    setIsDirty(false);
                    toast.success("Configuration saved");
                },
                onError: (error) => {
                    toast.error("Failed to save configuration");
                    console.error(error);
                },
            }
        );
    };

    if (isLoading || !localConfig) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-background">
            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Configuration */}
                <div className="flex w-2/3 flex-col border-r h-full overflow-hidden">
                    <VoiceConfig
                        config={localConfig}
                        onChange={handleChange}
                        onSave={handleSave}
                        isDirty={isDirty}
                        isSaving={updateConfig.isPending}
                        agentName={localConfig.name || "Voice Agent"}
                        botId={botId}
                    />
                </div>

                {/* Right Pane: Preview */}
                <VoicePreview
                    botId={botId}
                    config={{
                        systemPrompt: localConfig.systemPrompt,
                        voiceId: localConfig.voiceId,
                        language: localConfig.sttLanguage || localConfig.language,
                    }}
                    agentName={localConfig.name || "Voice Agent"}
                />
            </div>
        </div>
    );
}