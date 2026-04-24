"use client";

import { useEffect } from "react";
import { Sparkles, Loader2, Plus, Trash2, RefreshCw, User, Mail, Phone, Building2, AlertTriangle, Lock } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "./RichTextEditor";
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
import { cn } from "@/lib/utils";

const PREDEFINED_FIELDS = [
    { key: 'name', label: 'Name', icon: User, type: 'text', required: true },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', required: true },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'phone', required: false },
    { key: 'company', label: 'Company', icon: Building2, type: 'text', required: false },
] as const;

const SIGNALS = [
    { key: "pricing", label: "Asks about pricing or cost" },
    { key: "demo", label: "Asks for a demo or trial" },
    { key: "human", label: "Wants to talk to a human" },
    { key: "started", label: "Asks how to get started" },
    { key: "plans", label: "Asks about plans / packages" },
    { key: "intent", label: "Shows purchase intent" },
    { key: "repeated", label: "Repeatedly asks questions" },
    { key: "custom", label: "Custom signal..." },
] as const;

interface LeadGenCardProps {
    state: LeadGenState;
    onChange: (newState: LeadGenState) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function LeadGenCard({ state, onChange, onGenerate, isGenerating }: LeadGenCardProps) {
    const form = state.form;
    const hasNoFieldsSelected = form?.isEnabled && form.fields.length === 0;

    const updateState = (updates: Partial<LeadGenState>) => onChange({ ...state, ...updates });
    const updateForm = (updates: Partial<LeadForm>) => {
        if (!form) return;
        updateState({ form: { ...form, ...updates } });
    };

    const isPredefinedFieldAdded = (systemFieldKey: string) =>
        form?.fields.some(f => f.systemField === systemFieldKey) ?? false;

    const updateField = (index: number, updates: Partial<LeadFormField>) => {
        if (!form) return;
        const newFields = [...form.fields];
        newFields[index] = { ...newFields[index], ...updates };
        updateForm({ fields: newFields });
    };

    const addCustomField = () => {
        if (!form) return;
        updateForm({
            fields: [...form.fields, {
                id: `temp_${Date.now()}`, formId: form.id,
                label: "New Field", type: "text", required: false,
                position: form.fields.length, systemField: "none",
            }],
        });
    };

    const isRequiredPredefined = (systemFieldKey: string | null | undefined) =>
        !!systemFieldKey && PREDEFINED_FIELDS.some(p => p.key === systemFieldKey && p.required);

    const removeField = (index: number) => {
        if (!form) return;
        const target = form.fields[index];
        if (isRequiredPredefined(target?.systemField)) {
            toast.error(`${target.label} is required and can't be removed.`);
            return;
        }
        updateForm({ fields: form.fields.filter((_, i) => i !== index) });
    };

    const togglePredefinedField = (systemFieldKey: string, checked: boolean) => {
        if (!form) return;
        if (!checked && isRequiredPredefined(systemFieldKey)) {
            toast.error(`${PREDEFINED_FIELDS.find(p => p.key === systemFieldKey)?.label} is required.`);
            return;
        }
        if (checked) {
            const predefined = PREDEFINED_FIELDS.find(f => f.key === systemFieldKey);
            if (!predefined) return;
            updateForm({
                fields: [...form.fields, {
                    id: `temp_${Date.now()}_${systemFieldKey}`, formId: form.id,
                    label: predefined.label, type: predefined.type as any,
                    required: predefined.required, position: form.fields.length,
                    systemField: systemFieldKey as any,
                }],
            });
        } else {
            updateForm({ fields: form.fields.filter(f => f.systemField !== systemFieldKey) });
        }
    };

    // Ensure required predefined fields (Name, Email) are always present.
    useEffect(() => {
        if (!form) return;
        const missing = PREDEFINED_FIELDS.filter(
            p => p.required && !form.fields.some(f => f.systemField === p.key)
        );
        if (missing.length === 0) return;
        const additions: LeadFormField[] = missing.map((p, i) => ({
            id: `temp_${Date.now()}_${p.key}_${i}`,
            formId: form.id,
            label: p.label,
            type: p.type as any,
            required: true,
            position: form.fields.length + i,
            systemField: p.key as any,
        }));
        updateForm({ fields: [...form.fields, ...additions] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.id]);

    if (!form) {
        return <div className="px-5 py-8 text-sm text-muted-foreground">Loading form configuration...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
            {/* ── MAIN: Prompt + Form Fields ── */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-secondary)]">

                {/* Prompt Header */}
                <div className="flex items-center justify-between px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                            Lead Gen System Prompt
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            Used only during the lead generation flow.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (!form.isEnabled) {
                                toast.error("Enable Lead Generation first.");
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
                        placeholder="Click Regenerate to create a prompt from your lead gen settings..."
                    />
                    <div className="flex items-start gap-1.5 text-[11px] text-[var(--status-info-fg)] bg-[var(--status-info-bg)] border border-[var(--status-info-border)] px-3 py-2 rounded-[var(--radius-input)]">
                        <Sparkles className="size-3 mt-0.5 shrink-0" />
                        <span>Auto-generated from your lead detection strategy and form settings on the right.</span>
                    </div>
                </div>

                {/* Form Appearance */}
                <div className="px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">Form Appearance</p>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border-b border-[var(--border-secondary)]">
                    <div className="form-field">
                        <label className="form-field-label">Form Title</label>
                        <Input value={form.title} onChange={(e) => updateForm({ title: e.target.value })} placeholder="Contact Us" />
                    </div>
                    <div className="form-field">
                        <label className="form-field-label">Subtitle</label>
                        <Input value={form.subtitle || ""} onChange={(e) => updateForm({ subtitle: e.target.value })} placeholder="We'll get back to you..." />
                    </div>
                    <div className="form-field">
                        <label className="form-field-label">CTA Button Text</label>
                        <Input value={form.ctaText || ""} onChange={(e) => updateForm({ ctaText: e.target.value })} placeholder="Send Message" />
                    </div>
                    <div className="form-field">
                        <label className="form-field-label">Success Message</label>
                        <Input value={form.successMessage || ""} onChange={(e) => updateForm({ successMessage: e.target.value })} placeholder="Thanks! We received your message." />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)] flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">Form Fields</p>
                    <Button variant="outline" size="sm" onClick={addCustomField}>
                        <Plus className="size-3.5" /> Add Custom Field
                    </Button>
                </div>

                <div className="px-5 py-4">
                    <p className="text-xs font-medium text-foreground mb-0.5">Predefined Fields</p>
                    <p className="text-[11px] text-muted-foreground mb-3">Click to include standard fields in your form.</p>
                    <div className="flex flex-wrap gap-2">
                        {PREDEFINED_FIELDS.map((field) => {
                            const Icon = field.icon;
                            const isAdded = isPredefinedFieldAdded(field.key);
                            const isLocked = field.required;
                            return (
                                <button
                                    key={field.key}
                                    type="button"
                                    onClick={() => {
                                        if (isLocked) return;
                                        togglePredefinedField(field.key, !isAdded);
                                    }}
                                    disabled={isLocked}
                                    title={isLocked ? `${field.label} is required` : undefined}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-[var(--radius-input)] border text-sm transition-all",
                                        isAdded
                                            ? "bg-[var(--bg-accent-selected)] border-primary text-primary"
                                            : "bg-card border-border text-foreground hover:bg-muted/40",
                                        isLocked ? "cursor-not-allowed opacity-90" : "cursor-pointer"
                                    )}
                                >
                                    <Icon className={cn("size-3.5", isAdded ? "text-primary" : "text-muted-foreground")} />
                                    <span className={isAdded ? "font-medium" : ""}>{field.label}</span>
                                    {isLocked
                                        ? <Lock className="size-3 text-primary/70 ml-0.5" />
                                        : null}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {hasNoFieldsSelected && (
                    <div className="mx-5 mb-4 flex items-start gap-2 px-3 py-2.5 bg-[var(--status-warning-bg)] border border-[var(--status-warning-border)] rounded-[var(--radius-input)]">
                        <AlertTriangle className="size-3.5 text-[var(--status-warning-fg)] shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-[var(--status-warning-fg)]">No fields selected</p>
                            <p className="text-[11px] text-[var(--status-warning-fg)] mt-0.5">Lead generation is enabled, but the form has no fields. Add at least one before saving.</p>
                        </div>
                    </div>
                )}

                {form.fields.length > 0 && (
                    <div className="px-5 pb-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Field Configuration</p>
                        {form.fields.map((field, index) => {
                            const isSystemField = field.systemField && field.systemField !== 'none';
                            const predefinedConfig = isSystemField
                                ? PREDEFINED_FIELDS.find(p => p.key === field.systemField)
                                : null;

                            if (isSystemField) {
                                const Icon = predefinedConfig?.icon || User;
                                const locked = isRequiredPredefined(field.systemField);
                                return (
                                    <div key={field.id || index} className="flex items-center gap-3 px-3 py-2.5 bg-[var(--bg-accent-selected)] border border-primary/20 rounded-[var(--radius-input)]">
                                        <div className="flex size-7 items-center justify-center rounded bg-primary/10">
                                            <Icon className="size-3.5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-medium text-foreground">{field.label}</span>
                                                <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full leading-none">System</span>
                                                {field.required && <span className="text-[10px] text-muted-foreground">(required)</span>}
                                            </div>
                                            <p className="text-[11px] text-muted-foreground">Type: {field.type}</p>
                                        </div>
                                        {locked ? (
                                            <Lock className="size-3.5 text-muted-foreground mr-1" />
                                        ) : (
                                            <Button variant="ghost" size="icon-sm" onClick={() => removeField(index)}
                                                className="text-muted-foreground hover:text-destructive">
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <div key={field.id || index} className="flex items-start gap-3 px-3 py-3 bg-muted/30 border border-border rounded-[var(--radius-input)] group">
                                    <div className="grid grid-cols-12 gap-3 flex-1">
                                        <div className="col-span-4 form-field">
                                            <label className="form-field-label">Label</label>
                                            <Input
                                                value={field.label}
                                                onChange={(e) => updateField(index, { label: e.target.value })}
                                                placeholder="Field label"
                                            />
                                        </div>
                                        <div className="col-span-3 form-field">
                                            <label className="form-field-label">Type</label>
                                            <Select value={field.type} onValueChange={(v: any) => updateField(index, { type: v })}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="phone">Phone</SelectItem>
                                                    <SelectItem value="textarea">Text Area</SelectItem>
                                                    <SelectItem value="select">Dropdown</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="col-span-3 form-field">
                                            <label className="form-field-label">Placeholder</label>
                                            <Input
                                                value={field.placeholder || ""}
                                                onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                                placeholder="Placeholder..."
                                            />
                                        </div>
                                        <div className="col-span-2 form-field flex flex-col justify-end pb-0.5">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <Checkbox
                                                    id={`req-${index}`}
                                                    checked={field.required}
                                                    onCheckedChange={(c) => updateField(index, { required: c as boolean })}
                                                />
                                                <span className="text-xs text-muted-foreground">Required</span>
                                            </label>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost" size="icon-sm"
                                        onClick={() => removeField(index)}
                                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity mt-5"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {form.fields.length === 0 && (
                    <div className="mx-5 mb-4 py-8 border border-dashed border-border rounded-[var(--radius-input)] flex flex-col items-center justify-center gap-1 text-center">
                        <p className="text-sm font-medium text-muted-foreground">No fields added</p>
                        <p className="text-xs text-muted-foreground">Select predefined fields above or add a custom one.</p>
                    </div>
                )}
            </div>

            {/* ── SIDEBAR: Detection Signals / Triggers ── */}
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
                            <p className="text-xs font-medium text-foreground">Enable Lead Generation</p>
                            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                                Capture leads during conversations.
                            </p>
                        </div>
                        <Switch
                            checked={form.isEnabled}
                            onCheckedChange={(checked) => updateForm({ isEnabled: checked })}
                            className="shrink-0"
                        />
                    </div>

                    {/* High-Intent Signals */}
                    <div className="px-5 py-4 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                            High-Intent Signals
                        </p>
                        <p className="text-[11px] text-muted-foreground">Trigger lead form when visitor:</p>
                        <div className="space-y-2">
                            {SIGNALS.map((signal) => (
                                <label key={signal.key} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        id={`signal-${signal.key}`}
                                        checked={(state.leadConfig.signals as any)[signal.key]}
                                        onCheckedChange={(c) => updateState({
                                            leadConfig: { ...state.leadConfig, signals: { ...state.leadConfig.signals, [signal.key]: c } },
                                        })}
                                    />
                                    <span className="text-xs text-foreground">{signal.label}</span>
                                </label>
                            ))}
                        </div>
                        {state.leadConfig.signals.custom && (
                            <Input
                                value={state.leadConfig.customSignal || ""}
                                onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, customSignal: e.target.value } })}
                                placeholder="e.g. enterprise partnership"
                                className="h-8 text-xs"
                            />
                        )}
                    </div>

                    {/* Aggressiveness */}
                    <div className="px-5 py-4 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                            Aggressiveness
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {["Conservative", "Balanced", "Aggressive"].map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => updateState({ leadConfig: { ...state.leadConfig, sensitivity: mode as any } })}
                                    className={cn(
                                        "flex items-center justify-between py-1.5 px-2.5 border rounded-[var(--radius-input)] cursor-pointer transition-all text-left",
                                        state.leadConfig.sensitivity === mode
                                            ? "bg-[var(--bg-accent-selected)] border-primary text-primary"
                                            : "border-border hover:bg-muted/40 text-foreground"
                                    )}
                                >
                                    <span className="text-xs font-medium">{mode}</span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {mode === "Conservative" ? "High confidence" : mode === "Aggressive" ? "More leads" : "Recommended"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Keywords */}
                    <div className="px-5 py-4 space-y-1">
                        <label className="text-[11px] font-medium text-foreground/80">
                            Mandatory Keywords
                        </label>
                        <Input
                            value={state.leadConfig.keywords || ""}
                            onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, keywords: e.target.value } })}
                            placeholder="enterprise, quote, proposal"
                            className="h-8 text-xs"
                        />
                        <p className="text-[10px] text-muted-foreground leading-tight">
                            Comma-separated. Always triggers when message contains any.
                        </p>
                    </div>

                    {/* Target Pages */}
                    <div className="px-5 py-4 space-y-1">
                        <label className="text-[11px] font-medium text-foreground/80">
                            Target Pages
                        </label>
                        <Textarea
                            value={state.leadConfig.pageTriggers || ""}
                            onChange={(e) => updateState({ leadConfig: { ...state.leadConfig, pageTriggers: e.target.value } })}
                            placeholder="/pricing, /contact, /enterprise/*"
                            className="min-h-[64px] text-xs"
                        />
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                            {[
                                { path: "/pricing", label: "Pricing" },
                                { path: "/contact", label: "Contact" },
                                { path: "/features", label: "Features" },
                            ].map((item) => {
                                const isIncluded = (state.leadConfig.pageTriggers || "").includes(item.path);
                                return (
                                    <button
                                        key={item.path}
                                        type="button"
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
                                        className={cn(
                                            "px-2 py-0.5 rounded-full border text-[10px] cursor-pointer transition-colors",
                                            isIncluded
                                                ? "bg-[var(--bg-accent-selected)] border-primary text-primary"
                                                : "bg-card border-border text-foreground hover:bg-muted/40"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
