"use client";

import { useRef } from "react";
import { Loader2, RefreshCw, Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";

export type PaletteControl =
    | {
          kind: "input";
          label: string;
          value: string;
          onChange: (v: string) => void;
          placeholder?: string;
      }
    | {
          kind: "select";
          label: string;
          value: string;
          options: { label: string; value: string }[];
          onChange: (v: string) => void;
      }
    | {
          kind: "toggle";
          label: string;
          description?: string;
          checked: boolean;
          onChange: (v: boolean) => void;
      }
    | {
          kind: "insert";
          label: string;
          snippet: string;
      };

export interface PaletteGroup {
    label: string;
    controls: PaletteControl[];
}

interface PromptEditorProps {
    value: string;
    onChange: (value: string) => void;
    onRegenerateFromControls: () => void;
    isRegenerating: boolean;
    placeholder?: string;
    palette: PaletteGroup[];
    onInsertSnippet?: (snippet: string) => void;
}

export function PromptEditor({
    value,
    onChange,
    onRegenerateFromControls,
    isRegenerating,
    placeholder,
    palette,
}: PromptEditorProps) {
    // For insert-snippet buttons: we expose an imperative handle so the rich
    // editor can receive a snippet string and append it. We store the handler
    // as a ref set by RichTextEditor via a callback prop.
    const insertSnippetRef = useRef<((snippet: string) => void) | null>(null);

    const handleInsert = (snippet: string) => {
        if (insertSnippetRef.current) {
            insertSnippetRef.current(snippet);
        } else {
            // Fallback: append to raw value
            onChange(value + (value && !value.endsWith("\n") ? "\n\n" : "") + snippet);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* ── PROMPT EDITOR ── */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-secondary)]">
                <div className="flex items-center justify-between px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                            System Prompt
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            The instructions your AI actually receives. Edit directly or use the palette.
                        </p>
                    </div>
                    <Button
                        onClick={onRegenerateFromControls}
                        disabled={isRegenerating}
                        size="sm"
                        variant="outline"
                        title="Rewrite prompt based on the current palette values"
                    >
                        {isRegenerating ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <RefreshCw className="size-3.5" />
                        )}
                        {isRegenerating ? "Regenerating..." : "Regenerate"}
                    </Button>
                </div>
                <div className="flex-1 p-5">
                    <RichTextEditor
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        onInsertSnippetReady={(fn) => { insertSnippetRef.current = fn; }}
                    />
                    <div className="mt-3 flex items-start gap-1.5 text-[11px] text-[var(--status-info-fg)] bg-[var(--status-info-bg)] border border-[var(--status-info-border)] px-3 py-2 rounded-[var(--radius-input)]">
                        <Sparkles className="size-3 mt-0.5 shrink-0" />
                        <span>
                            This is the source of truth for your AI's behavior. Palette
                            values are saved alongside as authoring helpers.
                        </span>
                    </div>
                </div>
            </div>

            {/* ── QUICK CONTROLS PALETTE ── */}
            <aside className="bg-muted/10">
                <div className="px-5 py-2.5 bg-muted/30 border-b border-[var(--border-secondary)]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        Quick Controls
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                        Helpers for good prompt generation.
                    </p>
                </div>
                <div className="divide-y divide-[var(--border-secondary)]">
                    {palette.map((group) => (
                        <div key={group.label} className="px-5 py-4 space-y-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                                {group.label}
                            </p>
                            {group.controls.map((ctrl, idx) => (
                                <PaletteControlRenderer
                                    key={`${group.label}-${idx}`}
                                    control={ctrl}
                                    onInsert={handleInsert}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}

function PaletteControlRenderer({
    control,
    onInsert,
}: {
    control: PaletteControl;
    onInsert: (snippet: string) => void;
}) {
    if (control.kind === "input") {
        return (
            <div className="space-y-1">
                <label className="text-[11px] font-medium text-foreground/80">
                    {control.label}
                </label>
                <Input
                    value={control.value}
                    placeholder={control.placeholder}
                    onChange={(e) => control.onChange(e.target.value)}
                    className="h-8 text-xs"
                />
            </div>
        );
    }
    if (control.kind === "select") {
        return (
            <div className="space-y-1">
                <label className="text-[11px] font-medium text-foreground/80">
                    {control.label}
                </label>
                <Select value={control.value} onValueChange={control.onChange}>
                    <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {control.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }
    if (control.kind === "toggle") {
        return (
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <p className="text-xs text-foreground">{control.label}</p>
                    {control.description && (
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                            {control.description}
                        </p>
                    )}
                </div>
                <Switch
                    checked={control.checked}
                    onCheckedChange={control.onChange}
                    className="shrink-0"
                />
            </div>
        );
    }
    // insert
    return (
        <Button
            variant="outline"
            size="sm"
            className="w-full justify-start h-8 text-xs font-normal"
            onClick={() => onInsert(control.snippet)}
        >
            <Plus className="size-3" />
            {control.label}
        </Button>
    );
}
