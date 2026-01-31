"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

import type { DayCount } from "@/lib/dummy/escalation-analytics";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

interface EscalationVolumeCardProps {
  isLoading: boolean;
  conversationsPerDay: DayCount[];
  escalationsPerDay: DayCount[];
  formatDate: (dateString: string) => string;
}

const chartConfig = {
  conversations: { label: "Conversations", color: "#0ea5e9" },
  escalations: { label: "Escalations", color: "#ef4444" },
} satisfies ChartConfig;

export function EscalationVolumeCard({
  isLoading,
  conversationsPerDay,
  escalationsPerDay,
  formatDate,
}: EscalationVolumeCardProps) {
  const dataset = useMemo(() => {
    const allDates = new Set<string>();
    (conversationsPerDay ?? []).forEach((d) => allDates.add(d.date));
    (escalationsPerDay ?? []).forEach((d) => allDates.add(d.date));
    const sortedDates = Array.from(allDates).sort();

    return sortedDates.map((date) => {
      const conv = conversationsPerDay?.find((d) => d.date === date)?.count ?? 0;
      const esc = escalationsPerDay?.find((d) => d.date === date)?.count ?? 0;
      return { dateStr: formatDate(date), conversations: conv, escalations: esc };
    });
  }, [conversationsPerDay, escalationsPerDay, formatDate]);

  const tickEvery = useMemo(() => {
    const n = dataset.length;
    if (n <= 8) return 1;
    if (n <= 16) return 2;
    if (n <= 32) return 4;
    return 6;
  }, [dataset.length]);

  const xInterval = Math.max(0, tickEvery - 1);

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Volume (Conversations vs Escalations)
        </CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          Daily trend for total conversations and escalations
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="w-full">
            {dataset.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={dataset} margin={{ left: 8, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="#f1f5f9" vertical={false} />

                  <XAxis
                    dataKey="dateStr"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    interval={xInterval}
                  />
                  <YAxis axisLine={false} tickLine={false} width={36} />

                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <ChartLegend verticalAlign="bottom" height={36} />

                  {/* Primary ownership: Conversations as area */}
                  <Area
                    type="monotone"
                    dataKey="conversations"
                    stroke="var(--color-conversations)"
                    fill="var(--color-conversations)"
                    fillOpacity={0.25}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />

                  {/* Exception: escalations line-only */}
                  <Line
                    type="monotone"
                    dataKey="escalations"
                    stroke="var(--color-escalations)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
                No data available for the selected period
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

