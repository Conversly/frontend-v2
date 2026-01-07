import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleSection } from "./CollapsibleSection";
import { InfoTooltip } from "./InfoTooltip";
import { Checkbox } from "@/components/ui/checkbox";

interface CallBehaviorConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

const END_CALL_CONDITIONS = [
    { label: "Silence Timeout", value: "silence_timeout" },
    { label: "User Request", value: "user_request" },
    { label: "Goal Achieved", value: "goal_achieved" },
    { label: "Max Duration Reached", value: "max_duration" },
];

export function CallBehaviorConfig({ config, onChange }: CallBehaviorConfigProps) {
    const handleConditionChange = (checked: boolean, value: string) => {
        const current = config.endCallConditions || [];
        if (checked) {
            onChange("endCallConditions", [...current, value]);
        } else {
            onChange("endCallConditions", current.filter((c: string) => c !== value));
        }
    };

    return (
        <CollapsibleSection
            id="call-behavior"
            title="Call Behavior"
            description="Configure how the agent manages call flow and duration."
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            Max Silence Duration (seconds)
                            <InfoTooltip content="Time to wait before ending call due to silence" />
                        </Label>
                        <Input
                            type="number"
                            min="10"
                            value={config.maxSilenceDuration || 30}
                            onChange={(e) => onChange("maxSilenceDuration", parseInt(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            Max Call Duration (minutes)
                            <InfoTooltip content="Hard limit for call length" />
                        </Label>
                        <Input
                            type="number"
                            min="1"
                            value={config.maxCallDuration || 10}
                            onChange={(e) => onChange("maxCallDuration", parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                        Retry Question Count
                        <InfoTooltip content="How many times to repeat a question if no answer" />
                    </Label>
                    <Input
                        type="number"
                        min="0"
                        max="5"
                        value={config.retryQuestionCount || 1}
                        onChange={(e) => onChange("retryQuestionCount", parseInt(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="mb-2 block">End Call Conditions</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {END_CALL_CONDITIONS.map((cond) => (
                            <div key={cond.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cond-${cond.value}`}
                                    checked={(config.endCallConditions || []).includes(cond.value)}
                                    onCheckedChange={(checked) => handleConditionChange(checked as boolean, cond.value)}
                                />
                                <Label htmlFor={`cond-${cond.value}`} className="font-normal">{cond.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CollapsibleSection>
    );
}
