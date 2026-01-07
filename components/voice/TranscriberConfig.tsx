import * as React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STT_PROVIDERS } from "@/lib/constants/voice-options";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";

interface TranscriberConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function TranscriberConfig({ config, onChange }: TranscriberConfigProps) {
    return (
        <div className="space-y-4">


            <CollapsibleSection
                id="stt-config"
                title="Speech-to-Text"
                description="Configure how user speech is transcribed."
                defaultOpen={true}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Provider</Label>
                            <Select
                                value={config.sttModel || "deepgram"}
                                onValueChange={(value) =>
                                    onChange("sttModel", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select STT provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STT_PROVIDERS.map((provider) => (
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
                            <Label>Language</Label>
                            <Select
                                value={config.sttLanguage || "en-US"}
                                onValueChange={(value) =>
                                    onChange("sttLanguage", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en-US">English (US)</SelectItem>
                                    <SelectItem value="en-GB">English (UK)</SelectItem>
                                    <SelectItem value="es-ES">Spanish</SelectItem>
                                    <SelectItem value="fr-FR">French</SelectItem>
                                    <SelectItem value="de-DE">German</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                            <Checkbox
                                id="endpointing"
                                checked={config.endpointing !== false}
                                onCheckedChange={(checked) => onChange("endpointing", checked)}
                            />
                            <Label
                                htmlFor="endpointing"
                                className="text-sm font-normal cursor-pointer"
                            >
                                Enable smart endpointing for natural turn-taking
                            </Label>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                            <Checkbox
                                id="punctuation"
                                checked={config.punctuation !== false}
                                onCheckedChange={(checked) => onChange("punctuation", checked)}
                            />
                            <Label htmlFor="punctuation" className="text-sm font-normal cursor-pointer">
                                Enable Punctuation
                            </Label>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                            <Checkbox
                                id="profanityFilter"
                                checked={config.profanityFilter || false}
                                onCheckedChange={(checked) => onChange("profanityFilter", checked)}
                            />
                            <Label htmlFor="profanityFilter" className="text-sm font-normal cursor-pointer">
                                Profanity Filter
                            </Label>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>
        </div>
    );
}
