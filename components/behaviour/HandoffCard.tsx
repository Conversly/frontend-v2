"use client";

import { UserPlus, AlertTriangle } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
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
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
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
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 text-amber-600">
                        <UserPlus className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-base">When should a human join?</CardTitle>
                        <CardDescription>Escalation rules and handoff triggers.</CardDescription>
                    </div>
                    <Switch
                        checked={state.enabled}
                        onCheckedChange={(checked) => updateState({ enabled: checked })}
                    />
                </div>
            </CardHeader>
            {state.enabled && (
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label>Support Mode</Label>
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
                        <Label>Escalation Triggers</Label>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="trigger-frustration"
                                    checked={state.escalationTriggers.frustration}
                                    onCheckedChange={(checked) => updateTriggers("frustration", checked as boolean)}
                                />
                                <Label htmlFor="trigger-frustration" className="font-normal text-sm">Visitor frustration detected</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="trigger-billing"
                                    checked={state.escalationTriggers.billing}
                                    onCheckedChange={(checked) => updateTriggers("billing", checked as boolean)}
                                />
                                <Label htmlFor="trigger-billing" className="font-normal text-sm">Billing or refund questions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="trigger-repeated"
                                    checked={state.escalationTriggers.repeated}
                                    onCheckedChange={(checked) => updateTriggers("repeated", checked as boolean)}
                                />
                                <Label htmlFor="trigger-repeated" className="font-normal text-sm">Repeated unanswered questions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="trigger-legal"
                                    checked={state.escalationTriggers.legal}
                                    onCheckedChange={(checked) => updateTriggers("legal", checked as boolean)}
                                />
                                <Label htmlFor="trigger-legal" className="font-normal text-sm">Legal or compliance topics</Label>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>If no human is available</Label>
                        <Select
                            value={state.fallbackAction}
                            onValueChange={(value: any) => updateState({ fallbackAction: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select fallback" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Collect email">Collect email</SelectItem>
                                <SelectItem value="Create ticket">Create ticket</SelectItem>
                                <SelectItem value="Notify business owner">Notify business owner</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Additional Context (Your Own Words)</Label>
                        <Textarea
                            placeholder="e.g. Only escalate for billing issues if they mention 'refund' twice."
                            value={state.additionalInstructions}
                            onChange={(e) => updateState({ additionalInstructions: e.target.value })}
                            className="min-h-[60px]"
                        />
                    </div>

                    <div className="rounded-lg border bg-slate-50 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                <Label className="text-purple-700 font-medium">Magic Prompt</Label>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onGenerate}
                                disabled={isGenerating}
                                className="h-8 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
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
                                className="min-h-[120px] font-mono text-sm bg-white"
                                placeholder="Click generate to create a prompt from your settings..."
                            />
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
