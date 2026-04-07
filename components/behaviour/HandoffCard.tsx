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
        <div className="divide-y divide-[var(--border-secondary)]">

            {/* ── SECTION HEADER ── */}
            <div className="px-5 py-2.5 bg-muted/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">Human Handoff</p>
            </div>

            {/* Toggle Row */}
            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-[var(--radius-input)] bg-primary/10">
                        <UserPlus className="size-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Enable Human Handoff</p>
                        <p className="text-xs text-foreground/70">Allow AI to escalate to a human agent</p>
                    </div>
                </div>
                <Switch
                    checked={state.enabled}
                    onCheckedChange={(checked) => updateState({ enabled: checked })}
                />
            </div>

            {state.enabled && (
                <>
                    {/* Support Mode */}
                    <div className="px-5 py-4">
                        <div className="form-field">
                            <label className="form-field-label">Support Mode</label>
                            <Select value={state.supportMode} onValueChange={(v: any) => updateState({ supportMode: v })}>
                                <SelectTrigger className="w-full md:max-w-xs">
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
                    </div>

                    {/* ── SECTION HEADER: Triggers ── */}
                    <div className="px-5 py-2.5 bg-muted/30">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">Escalation Triggers</p>
                        <p className="text-[11px] text-foreground/70 mt-0.5">Escalate when any of these are detected.</p>
                    </div>

                    {/* Trigger Checkboxes */}
                    <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {[
                            { key: "frustration", label: "Visitor frustration detected" },
                            { key: "billing", label: "Billing or refund questions" },
                            { key: "repeated", label: "Repeated unanswered questions" },
                            { key: "legal", label: "Legal or compliance topics" },
                        ].map((trigger) => (
                            <label key={trigger.key} className="flex items-center gap-2.5 cursor-pointer group">
                                <Checkbox
                                    id={`trigger-${trigger.key}`}
                                    checked={(state.escalationTriggers as any)[trigger.key]}
                                    onCheckedChange={(checked) => updateTriggers(trigger.key as keyof HandoffState["escalationTriggers"], checked as boolean)}
                                />
                                <span className="text-sm text-foreground group-hover:text-foreground">{trigger.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* ── SECTION HEADER: Additional Context ── */}
                    <div className="px-5 py-2.5 bg-muted/30">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">Additional Context</p>
                    </div>

                    <div className="px-5 py-4">
                        <div className="form-field">
                            <label className="form-field-label">Custom escalation instructions (optional)</label>
                            <Textarea
                                placeholder="e.g. Only escalate for billing issues if they mention 'refund' twice."
                                value={state.additionalInstructions}
                                onChange={(e) => updateState({ additionalInstructions: e.target.value })}
                                className="min-h-[80px]"
                            />
                        </div>
                    </div>

                    {/* ── SECTION HEADER: Prompt ── */}
                    <div className="px-5 py-2.5 bg-muted/30 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">Escalation System Prompt</p>
                            <p className="text-[11px] text-foreground/70 mt-0.5">Auto-generated from your handoff settings.</p>
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
                        >
                            {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
                            {isGenerating ? "Generating..." : "Re-generate"}
                        </Button>
                    </div>

                    <div className="px-5 py-4 space-y-2">
                        <Textarea
                            value={state.systemPrompt}
                            onChange={(e) => updateState({ systemPrompt: e.target.value })}
                            className="min-h-[140px] font-mono text-xs bg-muted/20"
                            placeholder="Click Re-generate to create a prompt from your settings..."
                        />
                        <div className="flex items-start gap-1.5 text-[11px] text-[var(--status-info-fg)] bg-[var(--status-info-bg)] border border-[var(--status-info-border)] px-3 py-2 rounded-[var(--radius-input)]">
                            <Sparkles className="size-3 mt-0.5 shrink-0" />
                            <span>Used only when the AI decides to escalate a conversation to a human agent.</span>
                        </div>
                    </div>
                </>
            )}

            {!state.enabled && (
                <div className="px-5 py-16 flex flex-col items-center justify-center gap-3 text-center">
                    <div className="size-10 rounded-lg bg-muted/50 flex items-center justify-center">
                        <UserPlus className="size-5 text-muted-foreground/50" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Human Handoff is disabled</p>
                        <p className="text-xs text-foreground/60 mt-1">Enable the toggle above to configure escalation rules.</p>
                    </div>
                </div>
            )}

        </div>
    );
}
