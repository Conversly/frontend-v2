"use client";

import { Magnet, Sparkles, Loader2, Plus, Trash2, GripVertical, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LeadGenState } from "./BehaviourState";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LeadForm, LeadFormField } from "@/types/lead-forms";
import { Separator } from "@/components/ui/separator";

interface LeadGenCardProps {
    state: LeadGenState;
    onChange: (newState: LeadGenState) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function LeadGenCard({ state, onChange, onGenerate, isGenerating }: LeadGenCardProps) {
    const form = state.form;

    const updateState = (updates: Partial<LeadGenState>) => {
        onChange({ ...state, ...updates });
    };

    const updateForm = (updates: Partial<LeadForm>) => {
        if (!form) return;
        updateState({ form: { ...form, ...updates } });
    };

    const updateField = (index: number, updates: Partial<LeadFormField>) => {
        if (!form) return;
        const newFields = [...form.fields];
        newFields[index] = { ...newFields[index], ...updates };
        updateForm({ fields: newFields });
    };

    const addField = () => {
        if (!form) return;
        const newField: LeadFormField = {
            id: `temp_${Date.now()}`,
            formId: form.id,
            label: "New Field",
            type: "text",
            required: true,
            position: form.fields.length,
            systemField: "none",
        };
        updateForm({ fields: [...form.fields, newField] });
    };

    const removeField = (index: number) => {
        if (!form) return;
        const newFields = form.fields.filter((_, i) => i !== index);
        updateForm({ fields: newFields });
    };

    if (!form) {
        return (
            <div className="text-sm text-muted-foreground">Loading form configuration...</div>
        );
    }

    return (
        <div>
            {/* Toggle Row */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Magnet className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Enable Lead Generation</p>
                        <p className="text-xs text-muted-foreground">Capture leads during conversations</p>
                    </div>
                </div>
                <Switch
                    checked={form.isEnabled}
                    onCheckedChange={(checked) => updateForm({ isEnabled: checked })}
                />
            </div>

            {form.isEnabled && (
                <div className="space-y-6">

                    {/* 1. Lead Detection Strategy */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold text-muted-foreground">Lead Detection Strategy</h3>
                        </div>

                        {/* High Intent Signals */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">1. High-Intent Signals</Label>
                            <p className="text-sm text-muted-foreground">Trigger lead form when visitor:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { key: "pricing", label: "Asks about pricing or cost" },
                                    { key: "demo", label: "Asks for a demo or trial" },
                                    { key: "human", label: "Wants to talk to a human" },
                                    { key: "started", label: "Asks how to get started" },
                                    { key: "plans", label: "Asks about plans/packages" },
                                    { key: "intent", label: "Shows purchase intent ('I want this')" },
                                    { key: "repeated", label: "Repeatedly asks questions" },
                                ].map((signal) => (
                                    <div key={signal.key} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`signal-${signal.key}`}
                                            checked={(state.leadConfig.signals as any)[signal.key]}
                                            onCheckedChange={(c) => updateState({
                                                leadConfig: {
                                                    ...state.leadConfig,
                                                    signals: { ...state.leadConfig.signals, [signal.key]: c },
                                                },
                                            })}
                                        />
                                        <Label htmlFor={`signal-${signal.key}`} className="font-normal text-sm">{signal.label}</Label>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="signal-custom"
                                        checked={state.leadConfig.signals.custom}
                                        onCheckedChange={(c) => updateState({
                                            leadConfig: {
                                                ...state.leadConfig,
                                                signals: { ...state.leadConfig.signals, custom: c as boolean },
                                            },
                                        })}
                                    />
                                    <Label htmlFor="signal-custom" className="font-normal text-sm">Custom...</Label>
                                </div>
                            </div>

                            {state.leadConfig.signals.custom && (
                                <div className="ml-1 mt-2">
                                    <Input
                                        value={state.leadConfig.customSignal || ""}
                                        onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, customSignal: e.target.value } })}
                                        placeholder="e.g. Asks about enterprise partnership"
                                    />
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Aggressiveness */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">2. Aggressiveness</Label>
                            <div className="grid grid-cols-3 gap-3">
                                {["Conservative", "Balanced", "Aggressive"].map((mode) => (
                                    <div
                                        key={mode}
                                        className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${state.leadConfig.sensitivity === mode
                                            ? "bg-primary/5 border-primary ring-1 ring-primary"
                                            : "border-border hover:bg-muted/50"
                                            }`}
                                        onClick={() => updateState({ leadConfig: { ...state.leadConfig, sensitivity: mode as any } })}
                                    >
                                        <span className="font-medium text-sm">{mode}</span>
                                        <span className="text-[10px] text-muted-foreground mt-1">
                                            {mode === "Conservative" ? "High confidence only" : mode === "Aggressive" ? "Capture more leads" : "Recommended"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Keywords */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">3. Mandatory Keywords (Optional)</Label>
                            <Input
                                value={state.leadConfig.keywords || ""}
                                onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, keywords: e.target.value } })}
                                placeholder="enterprise, quote, proposal, hire us"
                            />
                            <p className="text-[10px] text-muted-foreground">Always trigger if message contains these words.</p>
                        </div>

                        <Separator />

                        {/* Target Pages */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">4. Target Pages</Label>
                            <p className="text-sm text-muted-foreground">Which pages should trigger lead capture aggressively?</p>
                            <div className="grid gap-3">
                                <Textarea
                                    value={state.leadConfig.pageTriggers || ""}
                                    onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, pageTriggers: e.target.value } })}
                                    placeholder="/pricing, /contact, /enterprise/*"
                                    className="min-h-[80px]"
                                />
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-muted-foreground mr-2 self-center">Quick Add:</span>
                                    {[
                                        { path: "/pricing", label: "Pricing" },
                                        { path: "/contact", label: "Contact" },
                                        { path: "/features", label: "Features" },
                                    ].map((item) => {
                                        const isIncluded = (state.leadConfig.pageTriggers || "").includes(item.path);
                                        return (
                                            <div
                                                key={item.path}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs cursor-pointer transition-colors ${isIncluded
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-card border-border hover:bg-muted/50"
                                                    }`}
                                                onClick={() => {
                                                    const current = state.leadConfig.pageTriggers || "";
                                                    let newValue = current;
                                                    if (isIncluded) {
                                                        newValue = current.replace(new RegExp(`${item.path},? ?`), "").trim();
                                                        if (newValue.endsWith(",")) newValue = newValue.slice(0, -1);
                                                    } else {
                                                        newValue = current ? `${current}, ${item.path}` : item.path;
                                                    }
                                                    updateState({ leadConfig: { ...state.leadConfig, pageTriggers: newValue } });
                                                }}
                                            >
                                                {isIncluded && <span className="text-[10px]">✔</span>} {item.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* 2. Form Appearance */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Magnet className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold text-muted-foreground">Form Appearance</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Form Title</Label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => updateForm({ title: e.target.value })}
                                    placeholder="Contact Us"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Subtitle</Label>
                                <Input
                                    value={form.subtitle || ""}
                                    onChange={(e) => updateForm({ subtitle: e.target.value })}
                                    placeholder="We'll get back to you..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">CTA Button Text</Label>
                                <Input
                                    value={form.ctaText || ""}
                                    onChange={(e) => updateForm({ ctaText: e.target.value })}
                                    placeholder="Send Message"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Success Message</Label>
                                <Input
                                    value={form.successMessage || ""}
                                    onChange={(e) => updateForm({ successMessage: e.target.value })}
                                    placeholder="Thanks! We received your message."
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* 3. Fields Editor */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-semibold text-muted-foreground">Form Fields</h3>
                            </div>
                            <Button variant="outline" size="sm" onClick={addField}>
                                <Plus className="h-3 w-3 mr-1" /> Add Field
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {form.fields.map((field, index) => (
                                <div key={field.id || index} className="flex items-start gap-3 p-3 bg-muted/40 border border-border rounded-md group">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1">
                                        <div className="md:col-span-4 space-y-1">
                                            <Label className="text-xs text-muted-foreground">Label</Label>
                                            <Input
                                                value={field.label}
                                                onChange={(e) => updateField(index, { label: e.target.value })}
                                                className="h-8"
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-1">
                                            <Label className="text-xs text-muted-foreground">Type</Label>
                                            <Select
                                                value={field.type}
                                                onValueChange={(value: any) => updateField(index, { type: value })}
                                            >
                                                <SelectTrigger className="h-8">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="phone">Phone</SelectItem>
                                                    <SelectItem value="textarea">Text Area</SelectItem>
                                                    <SelectItem value="select">Select (Dropdown)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="md:col-span-3 space-y-1">
                                            <Label className="text-xs text-muted-foreground">Placeholder</Label>
                                            <Input
                                                value={field.placeholder || ""}
                                                onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                                className="h-8"
                                                placeholder="Placeholder..."
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-1 flex flex-col justify-end pb-1">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`req-${index}`}
                                                    checked={field.required}
                                                    onCheckedChange={(c) => updateField(index, { required: c as boolean })}
                                                />
                                                <Label htmlFor={`req-${index}`} className="text-xs font-normal">Required</Label>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeField(index)}
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            {form.fields.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg text-muted-foreground text-sm">
                                    No fields added yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. Magic Prompt — same style as HandoffCard */}
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
                                    if (!form.isEnabled) {
                                        toast.error("Please enable Lead Generation first to generate a prompt.");
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
                            <p className="text-[10px] text-muted-foreground italic">
                                This prompt is used ONLY during the lead generation flow.
                            </p>
                        </div>
                    </div>

                </div>
            )}

            {!form.isEnabled && (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                    <Magnet className="h-8 w-8 text-muted-foreground/40" />
                    <div>
                        <p className="font-medium text-sm text-foreground">Lead Generation is disabled</p>
                        <p className="text-xs mt-1">Enable the toggle above to configure lead capture settings.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
