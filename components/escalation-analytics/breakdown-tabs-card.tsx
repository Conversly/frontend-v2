"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { useMemo } from "react";

import type { BreakdownSeries, BreakdownTotals } from "@/lib/dummy/escalation-analytics";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
} from "recharts";

type TabsDefault = "line" | "pie";

interface BreakdownTabsCardProps {
  title: string;
  description?: string;
  isLoading: boolean;
  totals: BreakdownTotals[];
  perDay: BreakdownSeries[];
  formatDate: (dateString: string) => string;
  defaultTab?: TabsDefault;
  emptyLineText?: string;
  emptyPieText?: string;
  areaByCategoryId?: Record<string, boolean>;
  tickEvery?: number;
}

export function BreakdownTabsCard({
  title,
  description,
  isLoading,
  totals,
  perDay,
  formatDate,
  defaultTab = "line",
  emptyLineText = "No data available for the selected period",
  emptyPieText = "No data available",
  areaByCategoryId,
  tickEvery,
}: BreakdownTabsCardProps) {
  const sortedTotals = useMemo(() => {
    return [...(totals ?? [])].sort((a, b) => b.value - a.value);
  }, [totals]);

  const pieData = useMemo(() => {
    return sortedTotals
      .map((t) => ({
        id: t.id,
        value: t.value,
        label: t.label,
      }))
      .filter((i) => i.value > 0);
  }, [sortedTotals]);

  const chartDataset = useMemo(() => {
    if (!perDay?.length) return [];

    const allDates = new Set<string>();
    perDay.forEach((series) => {
      series.points.forEach((p) => allDates.add(p.date));
    });

    const sortedDates = Array.from(allDates).sort();

    return sortedDates.map((date) => {
      const dataPoint: Record<string, any> = {
        dateStr: formatDate(date),
      };

      perDay.forEach((series) => {
        const point = series.points.find((p) => p.date === date);
        dataPoint[series.categoryId] = point?.value ?? 0;
      });

      return dataPoint;
    });
  }, [perDay, formatDate]);

  const chartSeries = useMemo(() => {
    return (perDay ?? []).map((series) => ({
      dataKey: series.categoryId,
      label: series.categoryLabel,
      color: series.color,
      area: areaByCategoryId?.[series.categoryId] ?? false,
    }));
  }, [areaByCategoryId, perDay]);

  const effectiveTickEvery = useMemo(() => {
    if (tickEvery && tickEvery > 0) return Math.floor(tickEvery);
    const n = chartDataset.length;
    if (n <= 8) return 1;
    if (n <= 16) return 2;
    if (n <= 32) return 4;
    return 6;
  }, [chartDataset.length, tickEvery]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    (sortedTotals ?? []).forEach((t) => {
      config[t.id] = { label: t.label, color: t.color };
    });
    return config;
  }, [sortedTotals]);

  const xInterval = Math.max(0, effectiveTickEvery - 1);

  return (
    <Tabs defaultValue={defaultTab} className="gap-0">
      <Card className="shadow-sm border-border/50 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description ? (
                <div className="text-sm text-muted-foreground mt-1">{description}</div>
              ) : null}
            </div>

            <TabsList>
              <TabsTrigger value="line" className="text-xs">
                <TrendingUp className="h-3.5 w-3.5" />
                Line
              </TabsTrigger>
              <TabsTrigger value="pie" className="text-xs">
                <PieChartIcon className="h-3.5 w-3.5" />
                Pie
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col">
          <TabsContent value="line" className="mt-0 flex-1">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="w-full">
                {chartDataset.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ComposedChart
                      data={chartDataset}
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

                      {chartSeries.map((s) =>
                        s.area ? (
                          <Area
                            key={s.dataKey}
                            type="monotone"
                            dataKey={s.dataKey}
                            stroke={`var(--color-${s.dataKey})`}
                            fill={`var(--color-${s.dataKey})`}
                            fillOpacity={0.25}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        ) : (
                          <Line
                            key={s.dataKey}
                            type="monotone"
                            dataKey={s.dataKey}
                            stroke={`var(--color-${s.dataKey})`}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        )
                      )}
                    </ComposedChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
                    {emptyLineText}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pie" className="mt-0 flex-1">
            {isLoading ? (
              <div className="min-h-[300px] flex items-center justify-center">
                <Skeleton className="h-[250px] w-[250px] rounded-full" />
              </div>
            ) : (
              <div className="w-full min-h-[300px] flex items-center justify-center">
                {pieData.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <RechartsPieChart margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            indicator="dot"
                            nameKey="id"
                            labelKey="id"
                          />
                        }
                      />
                      <ChartLegend verticalAlign="bottom" height={36} />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="id"
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={2}
                        cornerRadius={6}
                      >
                        {pieData.map((p) => (
                          <Cell key={p.id} fill={`var(--color-${p.id})`} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ChartContainer>
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground text-sm">
                    {emptyPieText}
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

