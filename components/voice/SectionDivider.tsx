import * as React from "react";

export function SectionDivider({ label, icon }: { label: string; icon?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 py-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
            </span>
            <div className="flex-1 h-px bg-border" />
        </div>
    );
}
