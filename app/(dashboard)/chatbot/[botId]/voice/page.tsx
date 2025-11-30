"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { ProviderIndicator } from "@/components/voice/types";
import { ProviderLegend } from "@/components/voice/ProviderLegend";
import { CostLatencyIndicator } from "@/components/voice/CostLatencyIndicator";
import { ModelConfig } from "@/components/voice/ModelConfig";
import { VoiceConfig } from "@/components/voice/VoiceConfig";
import { TranscriberConfig } from "@/components/voice/TranscriberConfig";
import { ToolsConfig } from "@/components/voice/ToolsConfig";
import { AnalysisConfig } from "@/components/voice/AnalysisConfig";
import { AdvancedConfig } from "@/components/voice/AdvancedConfig";
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
    const [activeTab, setActiveTab] = React.useState("model");

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

    // Calculate active providers for legend
    const activeProviders: ProviderIndicator[] = [
        { name: localConfig.ttsModel || "elevenlabs", color: "#22c55e" },
        { name: localConfig.sttModel || "deepgram", color: "#ef4444" },
        { name: localConfig.llmModel || "gpt-4o", color: "#eab308" },
        { name: "vapi", color: "#3b82f6" },
    ];

    const tabs = [
        { id: "model", label: "Model", icon: "⚙️" },
        { id: "voice", label: "Voice", icon: "🎤" },
        { id: "transcriber", label: "Transcriber", icon: "📝" },
        { id: "tools", label: "Tools", icon: "🔧" },
        { id: "analysis", label: "Analysis", icon: "📊" },
        { id: "advanced", label: "Advanced", icon: "⚡" },
    ];

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

            {/* Tab Navigation */}
            <div className="border-b px-4 shrink-0">
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium 
                                border-b-2 transition-colors
                                ${activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                }
                            `}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Configuration */}
                <div className="flex w-2/3 flex-col border-r h-full overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-6">
                            {/* Provider Legend + Cost/Latency */}
                            <div className="space-y-4">
                                <ProviderLegend providers={activeProviders} />
                                <CostLatencyIndicator cost={0.15} latency={1050} />
                            </div>

                            {/* Tab Content */}
                            {activeTab === "model" && (
                                <ModelConfig config={localConfig} onChange={handleChange} />
                            )}
                            {activeTab === "voice" && (
                                <VoiceConfig config={localConfig} onChange={handleChange} />
                            )}
                            {activeTab === "transcriber" && (
                                <TranscriberConfig config={localConfig} onChange={handleChange} />
                            )}
                            {activeTab === "tools" && (
                                <ToolsConfig config={localConfig} onChange={handleChange} />
                            )}
                            {activeTab === "analysis" && (
                                <AnalysisConfig config={localConfig} onChange={handleChange} />
                            )}
                            {activeTab === "advanced" && (
                                <AdvancedConfig config={localConfig} onChange={handleChange} />
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Pane: Preview */}
                <VoicePreview />
            </div>
        </div>
    );
}