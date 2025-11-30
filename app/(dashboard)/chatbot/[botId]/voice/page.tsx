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
            setLocalConfig(config);
        }
    }, [config]);

    const handleChange = (field: string, value: any) => {
        setLocalConfig((prev: any) => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSave = () => {
        if (!localConfig) return;
        updateConfig.mutate(
            { chatbotId: botId, data: localConfig },
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
            {/* Header */}
            <header className="flex h-14 items-center justify-between border-b px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-sm font-semibold">{localConfig.name || "Voice Agent"}</h1>
                        <p className="text-xs text-muted-foreground font-mono">
                            {botId.slice(0, 8)}...
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Code className="h-3.5 w-3.5" />
                        Code
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Play className="h-3.5 w-3.5" />
                        Test
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Chat
                    </Button>
                    <Button size="sm" variant="default" className="gap-2 bg-teal-600 hover:bg-teal-700">
                        <Phone className="h-3.5 w-3.5" />
                        Talk to Assistant
                    </Button>
                    <div className="h-6 w-px bg-border mx-1" />
                    {isDirty && (
                        <span className="text-xs text-muted-foreground">Unsaved</span>
                    )}
                    <Button
                        size="sm"
                        variant={isDirty ? "default" : "secondary"}
                        onClick={handleSave}
                        disabled={!isDirty || updateConfig.isPending}
                    >
                        {updateConfig.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Configuration */}
                <div className="flex w-2/3 flex-col border-r h-full overflow-hidden">
                    <VoiceConfig config={localConfig} onChange={handleChange} />
                </div>

                {/* Right Pane: Preview */}
                <VoicePreview />
            </div>
        </div>
    );
}