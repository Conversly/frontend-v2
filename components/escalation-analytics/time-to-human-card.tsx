"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Timer } from "lucide-react";
import { useMemo } from "react";

import type { TimeToHumanPoint } from "@/lib/dummy/escalation-analytics";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

interface TimeToHumanCardProps {
  isLoading: boolean;
  points: TimeToHumanPoint[];
  formatDate: (dateString: string) => string;
}

const chartConfig = {
  p50Min: { label: "p50", color: "#22c55e" },
  avgMin: { label: "avg", color: "#0ea5e9" },
  p95Min: { label: "p95", color: "#ef4444" },
} satisfies ChartConfig;

export function TimeToHumanCard({ isLoading, points, formatDate }: TimeToHumanCardProps) {
  const dataset = useMemo(() => {
    return (points ?? []).map((p) => ({
      dateStr: formatDate(p.date),
      p50Min: p.p50Min,
      p95Min: p.p95Min,
      avgMin: p.avgMin,
    }));
  }, [points, formatDate]);

  const tickEvery = useMemo(() => {
    const n = dataset.length;
    if (n <= 8) return 1;
    if (n <= 16) return 2;
    if (n <= 32) return 4;
    return 6;
  }, [dataset.length]);

  const xInterval = Math.max(0, tickEvery - 1);

  return (
    <Card className="shadow-sm border-border/50 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          Time to Human (minutes)
        </CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          Pickup time distribution (p50 / avg / p95)
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

                  {/* Primary: p50 owns the area */}
                  <Area
                    type="monotone"
                    dataKey="p50Min"
                    stroke="var(--color-p50Min)"
                    fill="var(--color-p50Min)"
                    fillOpacity={0.25}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />

                  {/* Supporting metrics: lines only */}
                  <Line
                    type="monotone"
                    dataKey="avgMin"
                    stroke="var(--color-avgMin)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="p95Min"
                    stroke="var(--color-p95Min)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
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

