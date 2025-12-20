
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
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
import { AnalysisConfig } from "./AnalysisConfig";
import { AdvancedConfig } from "./AdvancedConfig";
import { ProviderLegend } from "./ProviderLegend";

interface VoiceSectionProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

interface VoiceConfigProps extends VoiceSectionProps {
    onSave: () => void;
    isDirty: boolean;
    isSaving: boolean;
    agentName: string;
    botId: string;
}

// Renamed original VoiceConfig to VoiceSettings
function VoiceSettings({ config, onChange }: VoiceSectionProps) {
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
                                <SelectTrigger className="w-full">
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
                                <SelectTrigger className="w-full">
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
export function VoiceConfig({
    config,
    onChange,
    onSave,
    isDirty,
    isSaving,
    agentName,
    botId
}: VoiceConfigProps) {
    const [activeSection, setActiveSection] = React.useState("model");

    const sections = [
        { id: "model", label: "Model", icon: "⚙️", component: ModelConfig },
        { id: "voice", label: "Voice", icon: "🎤", component: VoiceSettings },
        { id: "transcriber", label: "Transcriber", icon: "📝", component: TranscriberConfig },
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
            <div className="shrink-0 border-b bg-background z-10 sticky top-0 h-12 flex items-center justify-between px-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Agent Name */}
                    <div className="shrink-0 flex items-center gap-2">
                        <span className="text-sm font-semibold truncate max-w-[150px]" title={agentName}>
                            {agentName}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="h-4 w-px bg-border shrink-0" />

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mask-linear-fade">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                                    activeSection === section.id
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <span className="text-xs">{section.icon}</span>
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Button
                        size="sm"
                        variant={isDirty ? "default" : "ghost"}
                        className={cn("h-8 text-xs", !isDirty && "text-muted-foreground")}
                        onClick={onSave}
                        disabled={!isDirty || isSaving}
                    >
                        {isSaving ? (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-3 w-3" />
                        )}
                        Save
                    </Button>
                </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 min-h-0">
                <div className="p-8 space-y-10 max-w-4xl mx-auto">
                    {/* Header Info */}
                    <div className="space-y-4 pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <ProviderLegend providers={activeProviders} />
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
                                    <Component config={config} onChange={onChange} chatbotId={botId} />
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
