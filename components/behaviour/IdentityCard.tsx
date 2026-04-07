"use client";

import { Sparkles, Loader2, RefreshCw, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
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
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const updateIdentity = (field: keyof IdentityState, value: string) => {
        onIdentityChange({ ...identity, [field]: value });
    };

    const updateStyle = (updates: Partial<StyleState>) => {
        onStyleChange({ ...style, ...updates });
    };

    return (
        <div className="divide-y divide-[var(--border-secondary)]">

            {/* ── SECTION HEADER: Identity ── */}
            <div className="px-5 py-2.5 bg-muted/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Identity</p>
            </div>

            {/* Row: AI Agent Name + Role */}
            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="form-field">
                    <label className="form-field-label">AI Agent Name</label>
                    <Input
                        placeholder="e.g. Alice"
                        value={identity.aiName}
                        onChange={(e) => updateIdentity("aiName", e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label className="form-field-label">Role / Occupation</label>
                    <Select value={identity.role} onValueChange={(v) => updateIdentity("role", v as RoleType)}>
                        <SelectTrigger className="w-full">
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

            {/* Row: Primary Goal */}
            <div className="px-5 py-4">
                <div className="form-field">
                    <label className="form-field-label">Primary Goal</label>
                    <Textarea
                        placeholder="e.g. Answering questions about our pricing and features..."
                        className="min-h-[80px]"
                        value={identity.purpose}
                        onChange={(e) => updateIdentity("purpose", e.target.value)}
                    />
                </div>
            </div>

            {/* Row: Boundaries */}
            <div className="px-5 py-4">
                <div className="form-field">
                    <label className="form-field-label">Boundaries & Guardrails</label>
                    <p className="text-[11px] text-muted-foreground mb-1.5">Topics or actions the AI should avoid.</p>
                    <Textarea
                        placeholder="e.g. Never promise a specific delivery date, don't mention competitors..."
                        className="min-h-[80px]"
                        value={identity.constraints}
                        onChange={(e) => updateIdentity("constraints", e.target.value)}
                    />
                </div>
            </div>

            {/* ── SECTION HEADER: Style ── */}
            <div className="px-5 py-2.5 bg-muted/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Conversation Style</p>
            </div>

            {/* Row: Tone + Response Depth */}
            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="form-field">
                    <label className="form-field-label">Tone of Voice</label>
                    <Select value={style.tone} onValueChange={(v) => updateStyle({ tone: v as ToneType })}>
                        <SelectTrigger className="w-full">
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
                <div className="form-field">
                    <label className="form-field-label">Response Depth</label>
                    <Select value={style.responseLength} onValueChange={(v) => updateStyle({ responseLength: v as ResponseLengthType })}>
                        <SelectTrigger className="w-full">
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

            {/* Row: Toggles */}
            <div className="divide-y divide-[var(--border-secondary)]">
                <div className="flex items-center justify-between px-5 py-3">
                    <div>
                        <p className="text-sm text-foreground">Use emojis</p>
                        <p className="text-xs text-muted-foreground">Include emojis in AI responses</p>
                    </div>
                    <Switch
                        checked={style.useEmojis}
                        onCheckedChange={(checked) => updateStyle({ useEmojis: checked })}
                    />
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <div>
                        <p className="text-sm text-foreground">Ask follow-up questions</p>
                        <p className="text-xs text-muted-foreground">Proactively ask clarifying questions</p>
                    </div>
                    <Switch
                        checked={style.askFollowUp}
                        onCheckedChange={(checked) => updateStyle({ askFollowUp: checked })}
                    />
                </div>
            </div>

            {/* Row: Advanced Instructions (Collapsible) */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-muted/30 transition-colors">
                        <span className="text-xs font-medium text-muted-foreground">Advanced style instructions</span>
                        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="px-5 pb-4">
                        <Textarea
                            placeholder="e.g. Use a bit of British slang, or always start with 'Howdy'..."
                            className="min-h-[80px]"
                            value={style.advancedInstructions}
                            onChange={(e) => updateStyle({ advancedInstructions: e.target.value })}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {/* ── SECTION HEADER: System Prompt ── */}
            <div className="px-5 py-2.5 bg-muted/30 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Master System Prompt</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">The "brain" of your AI — auto-generated from settings above.</p>
                </div>
                <Button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    size="sm"
                    variant="outline"
                >
                    {isGenerating
                        ? <Loader2 className="size-3.5 animate-spin" />
                        : <RefreshCw className="size-3.5" />
                    }
                    {isGenerating ? "Generating..." : "Re-generate"}
                </Button>
            </div>

            {/* Prompt Textarea */}
            <div className="px-5 py-4 space-y-2">
                <Textarea
                    value={systemPrompt}
                    onChange={(e) => onSystemPromptChange(e.target.value)}
                    className="min-h-[200px] font-mono text-xs bg-muted/20"
                    placeholder="Click Re-generate to create instructions from your settings above..."
                />
                <div className="flex items-start gap-1.5 text-[11px] text-[var(--status-info-fg)] bg-[var(--status-info-bg)] border border-[var(--status-info-border)] px-3 py-2 rounded-[var(--radius-input)]">
                    <Sparkles className="size-3 mt-0.5 shrink-0" />
                    <span>Auto-generated from your identity and style settings. You can manually edit it for specific tweaks.</span>
                </div>
            </div>

        </div>
    );
}
