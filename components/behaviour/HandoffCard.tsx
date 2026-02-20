"use client";

import { UserPlus, AlertTriangle, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HandoffState } from "./BehaviourState";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface HandoffCardProps {
    state: HandoffState;
    onChange: (newState: HandoffState) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function HandoffCard({ state, onChange, onGenerate, isGenerating }: HandoffCardProps) {
    const updateState = (updates: Partial<HandoffState>) => {
        onChange({ ...state, ...updates });
    };

    const updateTriggers = (trigger: keyof HandoffState["escalationTriggers"], checked: boolean) => {
        updateState({
            escalationTriggers: {
                ...state.escalationTriggers,
                [trigger]: checked,
            },
        });
    };

    return (
        <div>
            {/* Toggle Row */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <UserPlus className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Enable Human Handoff</p>
                        <p className="text-xs text-muted-foreground">Allow AI to escalate to a human agent</p>
                    </div>
                </div>
                <Switch
                    checked={state.enabled}
                    onCheckedChange={(checked) => updateState({ enabled: checked })}
                />
            </div>

            {state.enabled && (
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Support Mode</Label>
                        <Select
                            value={state.supportMode}
                            onValueChange={(value: any) => updateState({ supportMode: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AI only">AI only</SelectItem>
                                <SelectItem value="When visitor asks">When visitor asks</SelectItem>
                                <SelectItem value="When AI is unsure">When AI is unsure (Recommended)</SelectItem>
                                <SelectItem value="Always show 'Talk to human'">Always show "Talk to human"</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Escalation Triggers</Label>
                        <div className="grid gap-2">
                            {[
                                { key: "frustration", label: "Visitor frustration detected" },
                                { key: "billing", label: "Billing or refund questions" },
                                { key: "repeated", label: "Repeated unanswered questions" },
                                { key: "legal", label: "Legal or compliance topics" },
                            ].map((trigger) => (
                                <div key={trigger.key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`trigger-${trigger.key}`}
                                        checked={(state.escalationTriggers as any)[trigger.key]}
                                        onCheckedChange={(checked) => updateTriggers(trigger.key as keyof HandoffState["escalationTriggers"], checked as boolean)}
                                    />
                                    <Label htmlFor={`trigger-${trigger.key}`} className="font-normal text-sm">{trigger.label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Additional Context (Your Own Words)</Label>
                        <Textarea
                            placeholder="e.g. Only escalate for billing issues if they mention 'refund' twice."
                            value={state.additionalInstructions}
                            onChange={(e) => updateState({ additionalInstructions: e.target.value })}
                            className="min-h-[60px]"
                        />
                    </div>

                    {/* Generated Prompt */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-primary" />
                                <Label className="text-primary font-medium">Magic Prompt</Label>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (!state.enabled) {
                                        toast.error("Please enable Human Handoff first to generate a prompt.");
                                        return;
                                    }
                                    onGenerate();
                                }}
                                disabled={isGenerating}
                                className="h-8 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                            >
                                {isGenerating ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-2 h-3 w-3" />}
                                Generate from Settings
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Generated System Prompt</Label>
                            <Textarea
                                value={state.systemPrompt}
                                onChange={(e) => updateState({ systemPrompt: e.target.value })}
                                className="min-h-[120px] font-mono text-sm bg-card border-border"
                                placeholder="Click generate to create a prompt from your settings..."
                            />
                        </div>
                    </div>
                </div>
            )}

            {!state.enabled && (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground/40" />
                    <div>
                        <p className="font-medium text-sm text-foreground">Human Handoff is disabled</p>
                        <p className="text-xs mt-1">Enable the toggle above to configure escalation rules.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
