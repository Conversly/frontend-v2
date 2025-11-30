import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleSectionProps } from "./types";

export function CollapsibleSection({
    id,
    title,
    description,
    icon,
    children,
    defaultOpen = false,
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="rounded-lg border bg-card overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon && <div className="text-muted-foreground">{icon}</div>}
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        {description && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
            </button>
            {isOpen && (
                <div className="border-t px-4 py-4 space-y-4">{children}</div>
            )}
        </div>
    );
}
