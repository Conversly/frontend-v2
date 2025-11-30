import * as React from "react";
import { InfoTooltip } from "./InfoTooltip";

export function CostLatencyIndicator({
    cost,
    latency,
}: {
    cost: number;
    latency: number;
}) {
    // Calculate percentages for the gradient bars
    const costPercentage = Math.min((cost / 0.5) * 100, 100);
    const latencyPercentage = Math.min((latency / 2000) * 100, 100);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">Cost</span>
                        <InfoTooltip content="Estimated cost per minute based on your selected providers" />
                    </div>
                    <span className="text-sm font-semibold">~${cost.toFixed(2)} /min</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${costPercentage}%`,
                            background: `linear-gradient(to right, 
                                #22c55e 0%, 
                                #22c55e 30%, 
                                #eab308 30%, 
                                #eab308 50%, 
                                #f97316 50%, 
                                #f97316 70%, 
                                #3b82f6 70%, 
                                #3b82f6 100%
                            )`,
                        }}
                    />
                </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">Latency</span>
                        <InfoTooltip content="Estimated response latency based on your selected models" />
                    </div>
                    <span className="text-sm font-semibold">~{latency} ms</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${latencyPercentage}%`,
                            background: `linear-gradient(to right, 
                                #ef4444 0%, 
                                #ef4444 40%, 
                                #f97316 40%, 
                                #f97316 60%, 
                                #eab308 60%, 
                                #eab308 80%, 
                                #ec4899 80%, 
                                #ec4899 100%
                            )`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
