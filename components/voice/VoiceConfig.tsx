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
import { TTS_PROVIDERS, VOICE_OPTIONS } from "@/lib/constants/voice-options";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";
import { InfoTooltip } from "./InfoTooltip";

interface VoiceConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function VoiceConfig({ config, onChange }: VoiceConfigProps) {
    return (
        <div className="space-y-4">
            <SectionDivider label="Voice" icon={<span>🎤</span>} />

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
