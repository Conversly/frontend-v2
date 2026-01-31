"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { PieChart as PieChartIcon, TrendingUp, Smile } from "lucide-react";
import { useMemo } from "react";
import type { DashboardData } from "@/types/analytics";

const SENTIMENT_COLORS: Record<
  "veryNegative" | "negative" | "neutral" | "positive" | "veryPositive",
  string
> = {
  veryNegative: "#ef4444", // red-500
  negative: "#f97316", // orange-500
  neutral: "#94a3b8", // slate-400
  positive: "#22c55e", // green-500
  veryPositive: "#16a34a", // green-600
};

interface SentimentDashboardCardProps {
  dashboard?: DashboardData;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function SentimentDashboardCard({
  dashboard,
  isLoading,
  formatDate,
}: SentimentDashboardCardProps) {
  const dateRangeLabel =
    dashboard?.dateRange?.startDate && dashboard?.dateRange?.endDate
      ? `Data from ${dashboard.dateRange.startDate} to ${dashboard.dateRange.endDate}`
      : null;

  const dataset = useMemo(() => {
    const perDay = dashboard?.sentiment?.perDay ?? [];
    return perDay.map((d) => ({
      dateStr: formatDate(d.date),
      veryNegative: d.veryNegative,
      negative: d.negative,
      neutral: d.neutral,
      positive: d.positive,
      veryPositive: d.veryPositive,
    }));
  }, [dashboard?.sentiment?.perDay, formatDate]);

  const pieData = useMemo(() => {
    const totals = dashboard?.sentiment?.totals;
    if (!totals) return [];

    const items = [
      { id: 0, key: "veryNegative" as const, label: "Very Negative" },
      { id: 1, key: "negative" as const, label: "Negative" },
      { id: 2, key: "neutral" as const, label: "Neutral" },
      { id: 3, key: "positive" as const, label: "Positive" },
      { id: 4, key: "veryPositive" as const, label: "Very Positive" },
    ];

    return items
      .map((i) => ({
        id: i.id,
        value: totals[i.key] ?? 0,
        label: i.label,
        color: SENTIMENT_COLORS[i.key],
      }))
      .filter((i) => i.value > 0);
  }, [dashboard?.sentiment?.totals]);

  const chartSetting = {
    grid: { horizontal: true },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
      [`.${chartsGridClasses.line}`]: {
        strokeDasharray: "3 3",
        stroke: "#e2e8f0",
      },
      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem",
      },
      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem",
      },
      "& .MuiChartsLegend-series text": {
        fontSize: "0.75rem !important",
        fill: "#64748b !important",
      },
      "& .MuiAreaElement-root": {
        fillOpacity: 0.25,
      },
    },
  };

  return (
    <Tabs defaultValue="line" className="gap-0">
      <Card className="shadow-sm border-border/50 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-4 w-4 text-muted-foreground" />
                Sentiment
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {dateRangeLabel ?? "Sentiment distribution and trends"}
              </div>
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
              <div className="w-full h-[300px]">
                {dataset.length > 0 ? (
                  <LineChart
                    dataset={dataset}
                    xAxis={[
                      {
                        scaleType: "point",
                        dataKey: "dateStr",
                        tickLabelStyle: { fontSize: 12 },
                      },
                    ]}
                    series={[
                      {
                        dataKey: "veryNegative",
                        label: "Very Negative",
                        color: SENTIMENT_COLORS.veryNegative,
                        area: true,
                        showMark: false,
                        connectNulls: true,
                        curve: "linear",
                      },
                      {
                        dataKey: "negative",
                        label: "Negative",
                        color: SENTIMENT_COLORS.negative,
                        area: true,
                        showMark: false,
                        connectNulls: true,
                        curve: "linear",
                      },
                      {
                        dataKey: "neutral",
                        label: "Neutral",
                        color: SENTIMENT_COLORS.neutral,
                        area: true,
                        showMark: false,
                        connectNulls: true,
                        curve: "linear",
                      },
                      {
                        dataKey: "positive",
                        label: "Positive",
                        color: SENTIMENT_COLORS.positive,
                        area: true,
                        showMark: false,
                        connectNulls: true,
                        curve: "linear",
                      },
                      {
                        dataKey: "veryPositive",
                        label: "Very Positive",
                        color: SENTIMENT_COLORS.veryPositive,
                        area: true,
                        showMark: false,
                        connectNulls: true,
                        curve: "linear",
                      },
                    ]}
                    {...chartSetting}
                    margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
                    slotProps={{
                      legend: {
                        position: { vertical: "bottom", horizontal: "center" },
                      },
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No data available for the selected period
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
                  <PieChart
                    series={[
                      {
                        data: pieData,
                        innerRadius: 30,
                        outerRadius: 110,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: {
                          innerRadius: 20,
                          additionalRadius: -20,
                          color: "gray",
                        },
                      },
                    ]}
                    width={340}
                    height={260}
                    margin={{ top: 10, bottom: 30, left: 10, right: 10 }}
                    slotProps={{
                      legend: {
                        position: { vertical: "bottom", horizontal: "center" },
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground text-sm">
                    No data available
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

