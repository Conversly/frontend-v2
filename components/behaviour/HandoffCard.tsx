"use client";

import { UserPlus, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
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
import { RichTextEditor } from "./RichTextEditor";

const TRIGGERS = [
    { key: "frustration", label: "Visitor frustration detected" },
    { key: "billing", label: "Billing or refund questions" },
    { key: "repeated", label: "Repeated unanswered questions" },
    { key: "legal", label: "Legal or compliance topics" },
] as const;

interface HandoffCardProps {
    state: HandoffState;
    onChange: (newState: HandoffState) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function HandoffCard({ state, onChange, onGenerate, isGenerating }: HandoffCardProps) {
    const updateState = (updates: Partial<HandoffState>) => onChange({ ...state, ...updates });

    const updateTriggers = (trigger: keyof HandoffState["escalationTriggers"], checked: boolean) => {
        updateState({ escalationTriggers: { ...state.escalationTriggers, [trigger]: checked } });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
            {/* ── MAIN: Prompt + Custom Instructions ── */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-secondary)]">

                {/* Prompt Header */}
                <div className="flex items-center justify-between px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                            Escalation System Prompt
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            Used only when the AI escalates a conversation to a human.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (!state.enabled) {
                                toast.error("Enable Human Handoff first.");
                                return;
                            }
                            onGenerate();
                        }}
                        disabled={isGenerating}
                        title="Regenerate prompt from the current settings"
                    >
                        {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
                        {isGenerating ? "Regenerating..." : "Regenerate"}
                    </Button>
                </div>

                <div className="px-5 py-4 space-y-2 border-b border-[var(--border-secondary)]">
                    <RichTextEditor
                        value={state.systemPrompt}
                        onChange={(v) => updateState({ systemPrompt: v })}
                        placeholder="Click Regenerate to create a prompt from your handoff settings..."
                    />
                    <div className="flex items-start gap-1.5 text-[11px] text-[var(--status-info-fg)] bg-[var(--status-info-bg)] border border-[var(--status-info-border)] px-3 py-2 rounded-[var(--radius-input)]">
                        <Sparkles className="size-3 mt-0.5 shrink-0" />
                        <span>Auto-generated from the escalation settings on the right.</span>
                    </div>
                </div>

                {/* Additional Context */}
                <div className="px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        Additional Context
                    </p>
                </div>
                <div className="px-5 py-4">
                    <div className="form-field">
                        <label className="form-field-label">Custom escalation instructions (optional)</label>
                        <Textarea
                            placeholder="e.g. Only escalate for billing issues if they mention 'refund' twice."
                            value={state.additionalInstructions}
                            onChange={(e) => updateState({ additionalInstructions: e.target.value })}
                            className="min-h-[120px]"
                        />
                    </div>
                </div>
            </div>

            {/* ── SIDEBAR: Enable + Triggers ── */}
            <aside className="bg-muted/10">
                <div className="px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        Prompt Signals
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                        Inputs used to generate the prompt.
                    </p>
                </div>

                <div className="divide-y divide-[var(--border-secondary)]">

                    {/* Enable */}
                    <div className="px-5 py-4 flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground">Enable Human Handoff</p>
                            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                                Allow the AI to escalate to a human agent.
                            </p>
                        </div>
                        <Switch
                            checked={state.enabled}
                            onCheckedChange={(checked) => updateState({ enabled: checked })}
                            className="shrink-0"
                        />
                    </div>

                    {/* Support Mode */}
                    <div className="px-5 py-4 space-y-1">
                        <label className="text-[11px] font-medium text-foreground/80">
                            Support Mode
                        </label>
                        <Select value={state.supportMode} onValueChange={(v: any) => updateState({ supportMode: v })}>
                            <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AI only" className="text-xs">AI only</SelectItem>
                                <SelectItem value="When visitor asks" className="text-xs">When visitor asks</SelectItem>
                                <SelectItem value="When AI is unsure" className="text-xs">When AI is unsure (Recommended)</SelectItem>
                                <SelectItem value="Always show 'Talk to human'" className="text-xs">Always show &apos;Talk to human&apos;</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Escalation Triggers */}
                    <div className="px-5 py-4 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                            Escalation Triggers
                        </p>
                        <p className="text-[11px] text-muted-foreground">Escalate when any of these are detected:</p>
                        <div className="space-y-2">
                            {TRIGGERS.map((trigger) => (
                                <label key={trigger.key} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        id={`trigger-${trigger.key}`}
                                        checked={(state.escalationTriggers as any)[trigger.key]}
                                        onCheckedChange={(checked) => updateTriggers(trigger.key as keyof HandoffState["escalationTriggers"], checked as boolean)}
                                    />
                                    <span className="text-xs text-foreground">{trigger.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
