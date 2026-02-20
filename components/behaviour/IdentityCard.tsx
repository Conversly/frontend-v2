"use client";

import { User, MessageSquare, Sparkles, Loader2, RefreshCw, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IdentityState, RoleType, StyleState, ToneType, ResponseLengthType } from "./BehaviourState";

interface IdentityCardProps {
    identity: IdentityState;
    onIdentityChange: (newState: IdentityState) => void;
    style: StyleState;
    onStyleChange: (newState: StyleState) => void;
    systemPrompt: string;
    onSystemPromptChange: (newPrompt: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function IdentityCard({
    identity,
    onIdentityChange,
    style,
    onStyleChange,
    systemPrompt,
    onSystemPromptChange,
    onGenerate,
    isGenerating
}: IdentityCardProps) {
    const [isAdvancedStyleOpen, setIsAdvancedStyleOpen] = useState(false);

    const handleIdentityChange = (field: keyof IdentityState, value: string) => {
        onIdentityChange({ ...identity, [field]: value });
    };

    const handleStyleUpdate = (updates: Partial<StyleState>) => {
        onStyleChange({ ...style, ...updates });
    };

    return (
        <div className="divide-y divide-border">

            {/* 1. IDENTITY SECTION */}
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-muted-foreground">1. Identity</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="ai-name" className="text-sm font-medium">AI Agent Name</Label>
                        <Input
                            id="ai-name"
                            placeholder="e.g. Alice"
                            value={identity.aiName}
                            onChange={(e) => handleIdentityChange("aiName", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role" className="text-sm font-medium">Role / Occupation</Label>
                        <Select
                            value={identity.role}
                            onValueChange={(value) => handleIdentityChange("role", value as RoleType)}
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Customer Support Agent">Customer Support Agent</SelectItem>
                                <SelectItem value="Sales Assistant">Sales Assistant</SelectItem>
                                <SelectItem value="Product Expert">Product Expert</SelectItem>
                                <SelectItem value="Consultant">Consultant</SelectItem>
                                <SelectItem value="Custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="purpose" className="text-sm font-medium">Primary Goal</Label>
                    <Textarea
                        id="purpose"
                        placeholder="e.g. Answering questions about our pricing and features..."
                        className="min-h-[80px] text-sm"
                        value={identity.purpose}
                        onChange={(e) => handleIdentityChange("purpose", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="constraints" className="text-sm font-medium">Boundaries & Guardrails</Label>
                    <Textarea
                        id="constraints"
                        placeholder="e.g. Never promise a specific delivery date, don't mention competitors..."
                        className="min-h-[80px] text-sm"
                        value={identity.constraints}
                        onChange={(e) => handleIdentityChange("constraints", e.target.value)}
                    />
                </div>
            </div>

            {/* 2. STYLE SECTION */}
            <div className="p-6 space-y-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-muted-foreground">2. Conversation Style</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Tone of Voice</Label>
                        <Select
                            value={style.tone}
                            onValueChange={(value) => handleStyleUpdate({ tone: value as ToneType })}
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
                        <Label className="text-sm font-medium">Response Depth</Label>
                        <Select
                            value={style.responseLength}
                            onValueChange={(value) => handleStyleUpdate({ responseLength: value as ResponseLengthType })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Concise">Concise</SelectItem>
                                <SelectItem value="Balanced">Balanced</SelectItem>
                                <SelectItem value="Detailed">Detailed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between rounded-md border border-border bg-card p-3 hover:border-primary/30 transition-colors">
                        <span className="text-sm font-medium">Use emojis</span>
                        <Switch
                            checked={style.useEmojis}
                            onCheckedChange={(checked) => handleStyleUpdate({ useEmojis: checked })}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-border bg-card p-3 hover:border-primary/30 transition-colors">
                        <span className="text-sm font-medium">Ask follow-ups</span>
                        <Switch
                            checked={style.askFollowUp}
                            onCheckedChange={(checked) => handleStyleUpdate({ askFollowUp: checked })}
                        />
                    </div>
                </div>

                <Collapsible open={isAdvancedStyleOpen} onOpenChange={setIsAdvancedStyleOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex w-full items-center justify-between p-0 h-auto font-normal text-muted-foreground hover:bg-transparent hover:text-foreground">
                            <span className="text-xs">Advanced instructions for tone...</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedStyleOpen ? "rotate-180" : ""}`} />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <Textarea
                            placeholder="e.g. Use a bit of British slang, or always start by saying 'Howdy'..."
                            className="min-h-[80px] text-sm"
                            value={style.advancedInstructions}
                            onChange={(e) => handleStyleUpdate({ advancedInstructions: e.target.value })}
                        />
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* MASTER PROMPT SECTION */}
            <div className="p-6 bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <div>
                            <Label className="text-foreground font-semibold block">Master Instruction (System Prompt)</Label>
                            <span className="text-[10px] text-muted-foreground">The "brain" of your AI widget.</span>
                        </div>
                    </div>
                    <Button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className="h-9"
                    >
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                        Generate Brain
                    </Button>
                </div>

                <div className="space-y-3">
                    <Textarea
                        value={systemPrompt}
                        onChange={(e) => onSystemPromptChange(e.target.value)}
                        className="min-h-[200px] font-mono text-xs bg-card border-border shadow-sm focus-visible:ring-primary/30"
                        placeholder="Click generate to create instructions from your settings..."
                    />
                    <div className="flex items-start gap-2 text-[11px] text-primary bg-primary/5 p-2 rounded border border-primary/20">
                        <Sparkles className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>This prompt is auto-generated based on your identity and style settings. You can manually edit it if you need specific tweaks.</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
