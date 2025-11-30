import * as React from "react";
import { ProviderIndicator } from "./types";

export function ProviderLegend({ providers }: { providers: ProviderIndicator[] }) {
    return (
        <div className="flex items-center gap-4 flex-wrap">
            {providers.map((provider) => (
                <div key={provider.name} className="flex items-center gap-1.5">
                    <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: provider.color }}
                    />
                    <span className="text-xs text-muted-foreground">{provider.name}</span>
                </div>
            ))}
        </div>
    );
}
