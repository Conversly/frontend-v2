
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Settings, Mic, FileText, Brain, Siren, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
// Import config sections
import { ModelConfig } from "./ModelConfig";
import { TranscriberConfig } from "./TranscriberConfig";
import { CallBehaviorConfig } from "./CallBehaviorConfig";
import { EscalationConfig } from "./EscalationConfig";
import { ComplianceConfig } from "./ComplianceConfig";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CollapsibleSection } from "./CollapsibleSection";
import { InfoTooltip } from "./InfoTooltip";
import { TTS_PROVIDERS, ALL_VOICE_OPTIONS } from "@/lib/constants/voice-options";

// Interface for sub-components
interface VoiceSectionProps {
    config: any;
    onChange: (field: string, value: any) => void;
    chatbotId?: string;
}

interface VoiceConfigProps extends VoiceSectionProps {
    onSave: () => void;
    isDirty: boolean;
    isSaving: boolean;
    agentName: string;
    botId: string;
}

// Inline VoiceSettings component (Refactored from original VoiceConfig.tsx)
function VoiceSettings({ config, onChange }: VoiceSectionProps) {
    return (
        <CollapsibleSection
            id="voice-settings"
            title="Voice Settings"
            description="Configure voice provider, persona, and speech characteristics."
            defaultOpen={true}
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Voice Provider</Label>
                        <Select
                            value={config.ttsModel || "elevenlabs"}
                            onValueChange={(value) => onChange("ttsModel", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select TTS provider" />
                            </SelectTrigger>
                            <SelectContent>
                                {TTS_PROVIDERS.map((provider) => (
                                    <SelectItem key={provider.value} value={provider.value}>
                                        {provider.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Voice Name</Label>
                        <Select
                            value={config.voiceId || "alice"}
                            onValueChange={(value) => onChange("voiceId", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_VOICE_OPTIONS.map((voice) => (
                                    <SelectItem key={voice.value} value={voice.value}>
                                        {voice.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            Speaking Speed
                            <InfoTooltip content="Speed multiplier (0.5x to 2.0x)" />
                        </Label>
                        <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="2"
                            value={config.voiceSpeed || 1}
                            onChange={(e) => onChange("voiceSpeed", parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Checkbox
                        id="interruptHandling"
                        checked={config.allowInterruptions !== false}
                        onCheckedChange={(checked) => onChange("allowInterruptions", checked)}
                    />
                    <Label htmlFor="interruptHandling" className="text-sm font-normal cursor-pointer">
                        Handle Interruptions
                    </Label>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Checkbox
                        id="fillerWords"
                        checked={config.fillerWords || false}
                        onCheckedChange={(checked) => onChange("fillerWords", checked)}
                    />
                    <Label htmlFor="fillerWords" className="text-sm font-normal cursor-pointer">
                        Use Filler Words
                    </Label>
                </div>
            </div>
        </CollapsibleSection>
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
        { id: "model", label: "Model", icon: <Settings className="h-4 w-4" />, component: ModelConfig },
        { id: "voice", label: "Voice", icon: <Mic className="h-4 w-4" />, component: VoiceSettings },
        { id: "transcriber", label: "Transcription", icon: <FileText className="h-4 w-4" />, component: TranscriberConfig },
        { id: "behavior", label: "Behavior", icon: <Brain className="h-4 w-4" />, component: CallBehaviorConfig },
        { id: "escalation", label: "Escalation", icon: <Siren className="h-4 w-4" />, component: EscalationConfig },
        { id: "compliance", label: "Compliance", icon: <Shield className="h-4 w-4" />, component: ComplianceConfig },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection(id);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Horizontal Sticky Header */}
            <div className="shrink-0 border-b bg-background z-10 sticky top-0 h-14 flex items-center justify-between px-6">
                {/* Navigation Tabs - Pill Style */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-linear-fade flex-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap border",
                                activeSection === section.id
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-background text-muted-foreground border-transparent hover:bg-muted font-normal"
                            )}
                        >
                            {section.icon}
                            {section.label}
                        </button>
                    ))}
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
