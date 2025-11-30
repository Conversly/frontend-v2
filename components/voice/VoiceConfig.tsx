
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TTS_PROVIDERS, VOICE_OPTIONS } from "@/lib/constants/voice-options";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";
import { InfoTooltip } from "./InfoTooltip";

// Import other config sections
import { ModelConfig } from "./ModelConfig";
import { TranscriberConfig } from "./TranscriberConfig";
import { ToolsConfig } from "./ToolsConfig";
import { AnalysisConfig } from "./AnalysisConfig";
import { AdvancedConfig } from "./AdvancedConfig";
import { ProviderLegend } from "./ProviderLegend";
import { CostLatencyIndicator } from "./CostLatencyIndicator";

interface VoiceConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

// Renamed original VoiceConfig to VoiceSettings
function VoiceSettings({ config, onChange }: VoiceConfigProps) {
    return (
        <div className="space-y-4">
            <CollapsibleSection
                id="voice-config"
                title="Voice Configuration"
                description="Select a voice from the list, or sync your voice library if it's missing."
                defaultOpen={true}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>TTS Provider</Label>
                            <Select
                                value={config.ttsModel || "elevenlabs"}
                                onValueChange={(value) =>
                                    onChange("ttsModel", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select TTS provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TTS_PROVIDERS.map((provider) => (
                                        <SelectItem
                                            key={provider.value}
                                            value={provider.value}
                                        >
                                            {provider.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Voice</Label>
                            <Select
                                value={config.voiceId || "alice"}
                                onValueChange={(value) =>
                                    onChange("voiceId", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select voice" />
                                </SelectTrigger>
                                <SelectContent>
                                    {VOICE_OPTIONS.map((voice) => (
                                        <SelectItem key={voice.value} value={voice.value}>
                                            {voice.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Checkbox id="customVoice" />
                        <Label
                            htmlFor="customVoice"
                            className="text-sm font-normal cursor-pointer"
                        >
                            Enable custom voice and add a voice ID manually
                        </Label>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                id="voice-additional"
                title="Additional Configuration"
                description="Configure additional settings for the voice of your assistant."
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5">
                                Speed
                                <InfoTooltip content="Speaking speed of the voice" />
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                min="0.5"
                                max="2"
                                value={config.voiceSpeed || 1}
                                onChange={(e) =>
                                    onChange(
                                        "voiceSpeed",
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5">
                                Stability
                                <InfoTooltip content="Voice consistency vs expressiveness" />
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="1"
                                value={config.voiceStability || 0.5}
                                onChange={(e) =>
                                    onChange(
                                        "voiceStability",
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </CollapsibleSection>
        </div>
    );
}

// Main Container Component
export function VoiceConfig({ config, onChange }: VoiceConfigProps) {
    const [activeSection, setActiveSection] = React.useState("model");

    const sections = [
        { id: "model", label: "Model", icon: "⚙️", component: ModelConfig },
        { id: "voice", label: "Voice", icon: "🎤", component: VoiceSettings },
        { id: "transcriber", label: "Transcriber", icon: "📝", component: TranscriberConfig },
        { id: "tools", label: "Tools", icon: "🔧", component: ToolsConfig },
        { id: "analysis", label: "Analysis", icon: "📊", component: AnalysisConfig },
        { id: "advanced", label: "Advanced", icon: "⚡", component: AdvancedConfig },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection(id);
        }
    };

    // Calculate active providers for legend (reused logic)
    const activeProviders = [
        { name: config.ttsModel || "elevenlabs", color: "#22c55e" },
        { name: config.sttModel || "deepgram", color: "#ef4444" },
        { name: config.llmModel || "gpt-4o", color: "#eab308" },
        { name: "vapi", color: "#3b82f6" },
    ];

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Horizontal Sticky Header */}
            <div className="shrink-0 border-b bg-background z-10 sticky top-0">
                <div className="flex items-center px-4 overflow-x-auto no-scrollbar">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                activeSection === section.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/20"
                            )}
                        >
                            <span className="text-base">{section.icon}</span>
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 min-h-0">
                <div className="p-8 space-y-10 max-w-4xl mx-auto">
                    {/* Header Info */}
                    <div className="space-y-4 pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <ProviderLegend providers={activeProviders} />
                            <CostLatencyIndicator cost={0.15} latency={1050} />
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {sections.map((section) => {
                            const Component = section.component;
                            return (
                                <div
                                    key={section.id}
                                    id={`section-${section.id}`}
                                    className="scroll-mt-14 space-y-4"
                                >
                                    <div className="flex items-center gap-2 pb-2 border-b">
                                        <span className="text-xl">{section.icon}</span>
                                        <h2 className="text-lg font-semibold">
                                            {section.label}
                                        </h2>
                                    </div>
                                    <Component config={config} onChange={onChange} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom padding for better scrolling experience */}
                    <div className="h-20" />
                </div>
            </ScrollArea>
        </div>
    );
}
