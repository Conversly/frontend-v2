"use client";

import { Target, Magnet } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LeadGenState } from "./BehaviourState";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

interface LeadGenCardProps {
    state: LeadGenState;
    onChange: (newState: LeadGenState) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function LeadGenCard({ state, onChange, onGenerate, isGenerating }: LeadGenCardProps) {
    const updateState = (updates: Partial<LeadGenState>) => {
        onChange({ ...state, ...updates });
    };

    const updateWhenToAsk = (field: keyof LeadGenState["whenToAsk"], value: boolean | number) => {
        updateState({
            whenToAsk: {
                ...state.whenToAsk,
                [field]: value,
            },
        });
    };

    const updateInfo = (field: keyof LeadGenState["infoToCollect"], value: boolean | string) => {
        updateState({
            infoToCollect: {
                ...state.infoToCollect,
                [field]: value,
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 text-green-600">
                        <Magnet className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-base">Turn visitors into customers</CardTitle>
                        <CardDescription>Lead capture strategy and timing.</CardDescription>
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
                        <Label>Capture Strategy</Label>
                        <Select
                            value={state.strategy}
                            onValueChange={(value: any) => updateState({ strategy: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select strategy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Passive (intent-based)">Passive (intent-based) ⭐ Recommended</SelectItem>
                                <SelectItem value="After helpful conversation">After helpful conversation</SelectItem>
                                <SelectItem value="Early proactive">Early proactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>When to ask</Label>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="when-pricing"
                                    checked={state.whenToAsk.afterPricing}
                                    onCheckedChange={(checked) => updateWhenToAsk("afterPricing", checked as boolean)}
                                />
                                <Label htmlFor="when-pricing" className="font-normal text-sm">After pricing discussion</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="when-recommendation"
                                    checked={state.whenToAsk.afterRecommendation}
                                    onCheckedChange={(checked) => updateWhenToAsk("afterRecommendation", checked as boolean)}
                                />
                                <Label htmlFor="when-recommendation" className="font-normal text-sm">After product recommendation</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="when-returning"
                                    checked={state.whenToAsk.returningVisitor}
                                    onCheckedChange={(checked) => updateWhenToAsk("returningVisitor", checked as boolean)}
                                />
                                <Label htmlFor="when-returning" className="font-normal text-sm">Returning visitor</Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Information to collect</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="info-name"
                                    checked={state.infoToCollect.name}
                                    onCheckedChange={(checked) => updateInfo("name", checked as boolean)}
                                />
                                <Label htmlFor="info-name" className="font-normal text-sm">Name</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="info-email"
                                    checked={state.infoToCollect.email}
                                    onCheckedChange={(checked) => updateInfo("email", checked as boolean)}
                                />
                                <Label htmlFor="info-email" className="font-normal text-sm">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="info-phone"
                                    checked={state.infoToCollect.phone}
                                    onCheckedChange={(checked) => updateInfo("phone", checked as boolean)}
                                />
                                <Label htmlFor="info-phone" className="font-normal text-sm">Phone</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="info-company"
                                    checked={state.infoToCollect.company}
                                    onCheckedChange={(checked) => updateInfo("company", checked as boolean)}
                                />
                                <Label htmlFor="info-company" className="font-normal text-sm">Company</Label>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Message shown to visitor</Label>
                        <Textarea
                            value={state.message}
                            onChange={(e) => updateState({ message: e.target.value })}
                            className="min-h-[60px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Additional Context (Your Own Words)</Label>
                        <Textarea
                            placeholder="e.g. Be very polite when asking for email, and mention we don't spam."
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
