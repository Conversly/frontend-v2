"use client";

import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StyleState, ToneType, ResponseLengthType } from "./BehaviourState";

interface StyleCardProps {
    state: StyleState;
    onChange: (newState: StyleState) => void;
}

export function StyleCard({ state, onChange }: StyleCardProps) {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const updateState = (updates: Partial<StyleState>) => {
        onChange({ ...state, ...updates });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                        <CardTitle className="text-base">How should it talk?</CardTitle>
                        <CardDescription>Define the conversation style and tone.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <Label>Tone</Label>
                    <Select
                        value={state.tone}
                        onValueChange={(value) => updateState({ tone: value as ToneType })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Friendly">Friendly</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Sales-focused">Sales-focused</SelectItem>
                            <SelectItem value="Casual startup">Casual startup</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label>Response Length</Label>
                    <Select
                        value={state.responseLength}
                        onValueChange={(value) => updateState({ responseLength: value as ResponseLengthType })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Concise">Concise</SelectItem>
                            <SelectItem value="Balanced">Balanced (Recommended)</SelectItem>
                            <SelectItem value="Detailed">Detailed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label>Personality Boost</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <span className="text-sm">Use emojis</span>
                            <Switch
                                checked={state.useEmojis}
                                onCheckedChange={(checked) => updateState({ useEmojis: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <span className="text-sm">Ask follow-up questions</span>
                            <Switch
                                checked={state.askFollowUp}
                                onCheckedChange={(checked) => updateState({ askFollowUp: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <span className="text-sm">Be persuasive</span>
                            <Switch
                                checked={state.bePersuasive}
                                onCheckedChange={(checked) => updateState({ bePersuasive: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <span className="text-sm">Be strictly factual</span>
                            <Switch
                                checked={state.beFactual}
                                onCheckedChange={(checked) => updateState({ beFactual: checked })}
                            />
                        </div>
                    </div>
                </div>

                <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex w-full items-center justify-between p-0 h-auto font-normal text-muted-foreground hover:bg-transparent hover:text-foreground">
                            <span>Advanced instructions</span>
                            {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <Textarea
                            placeholder="Add specific instructions for the AI behavior..."
                            className="min-h-[100px]"
                            value={state.advancedInstructions}
                            onChange={(e) => updateState({ advancedInstructions: e.target.value })}
                        />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}
