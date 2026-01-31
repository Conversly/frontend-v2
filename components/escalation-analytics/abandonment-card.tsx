"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, UserX } from "lucide-react";
import { useMemo } from "react";

import type { AbandonmentPoint } from "@/lib/dummy/escalation-analytics";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface AbandonmentCardProps {
  isLoading: boolean;
  points: AbandonmentPoint[];
  formatDate: (dateString: string) => string;
}

const chartConfig = {
  abandonedCount: { label: "Abandoned", color: "#f97316" },
  abandonmentRatePercent: { label: "Abandonment %", color: "#ef4444" },
} satisfies ChartConfig;

export function AbandonmentCard({ isLoading, points, formatDate }: AbandonmentCardProps) {
  const dataset = useMemo(() => {
    return (points ?? []).map((p) => ({
      dateStr: formatDate(p.date),
      abandonedCount: p.abandonedCount,
      abandonmentRatePercent: p.abandonmentRatePercent,
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
    <Tabs defaultValue="count" className="gap-0">
      <Card className="shadow-sm border-border/50 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-4 w-4 text-muted-foreground" />
                User Abandonment
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                Users leaving before human engagement
              </div>
            </div>

            <TabsList>
              <TabsTrigger value="count" className="text-xs">
                <TrendingUp className="h-3.5 w-3.5" />
                Count
              </TabsTrigger>
              <TabsTrigger value="rate" className="text-xs">
                <TrendingUp className="h-3.5 w-3.5" />
                Rate
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col">
          <TabsContent value="count" className="mt-0 flex-1">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="w-full">
                {dataset.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                      data={dataset}
                      margin={{ left: 8, right: 12, top: 10, bottom: 0 }}
                    >
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
                      <Area
                        type="monotone"
                        dataKey="abandonedCount"
                        stroke="var(--color-abandonedCount)"
                        fill="var(--color-abandonedCount)"
                        fillOpacity={0.25}
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
          </TabsContent>

          <TabsContent value="rate" className="mt-0 flex-1">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="w-full">
                {dataset.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                      data={dataset}
                      margin={{ left: 8, right: 12, top: 10, bottom: 0 }}
                    >
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
                      <Area
                        type="monotone"
                        dataKey="abandonmentRatePercent"
                        stroke="var(--color-abandonmentRatePercent)"
                        fill="var(--color-abandonmentRatePercent)"
                        fillOpacity={0.25}
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
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

