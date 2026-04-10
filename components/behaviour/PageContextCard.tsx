"use client";

import { FileSearch } from "lucide-react";

import { Switch } from "@/components/ui/switch";

interface PageContextCardProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

export function PageContextCard({ enabled, onChange }: PageContextCardProps) {
    return (
        <div className="divide-y divide-[var(--border-secondary)]">
            <div className="px-5 py-2.5 bg-muted/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Page Context Awareness</p>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-[var(--radius-input)] bg-primary/10">
                        <FileSearch className="size-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Enable Page Context Awareness</p>
                        <p className="text-xs text-muted-foreground">Let the AI read the current page&apos;s headings, buttons, links, and visible content to guide users contextually.</p>
                    </div>
                </div>
                <Switch
                    checked={enabled}
                    onCheckedChange={onChange}
                />
            </div>

            <div className="px-5 py-4">
                <div className="rounded-[var(--radius-input)] border border-[var(--status-info-border)] bg-[var(--status-info-bg)] px-3 py-3">
                    <p className="text-xs font-medium text-[var(--status-info-fg)]">What this does</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--status-info-fg)]">
                        When enabled, the widget can send page-level context so the AI can answer questions like what section is below a heading,
                        which button is visible, or what content appears on the current page.
                    </p>
                </div>
            </div>
        </div>
    );
}
