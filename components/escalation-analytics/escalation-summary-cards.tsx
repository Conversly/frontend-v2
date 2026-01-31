"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Gauge, Timer, UserX } from "lucide-react";

interface EscalationSummaryCardsProps {
  summary?: {
    totalEscalations: number;
    escalationRatePercent: number;
    avgTimeToHumanMin: number;
    abandonmentRatePercent: number;
    aiHandledPercent: number;
  };
  isLoading: boolean;
}

export function EscalationSummaryCards({
  summary,
  isLoading,
}: EscalationSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Total Escalations</p>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-20 mt-1" />
          ) : (
            <div className="text-2xl font-bold">
              {summary?.totalEscalations?.toLocaleString() ?? 0}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {isLoading ? <Skeleton className="h-3 w-28 mt-2" /> : "For selected period"}
        </p>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Escalation Rate</p>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <div className="text-2xl font-bold">
              {summary?.escalationRatePercent?.toFixed(1) ?? "0.0"}%
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {isLoading ? (
            <Skeleton className="h-3 w-40 mt-2" />
          ) : (
            <>AI handled: {summary?.aiHandledPercent?.toFixed(1) ?? "0.0"}%</>
          )}
        </p>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Avg. Time to Human</p>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <div className="text-2xl font-bold">
              {summary?.avgTimeToHumanMin?.toFixed(1) ?? "0.0"} min
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Average pickup time</p>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">User Abandonment</p>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <div className="text-2xl font-bold">
              {summary?.abandonmentRatePercent?.toFixed(1) ?? "0.0"}%
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Of escalations where user left
        </p>
      </Card>
    </div>
  );
}

