"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { useMemo } from "react";
import type { TopicWithSeries } from "@/types/analytics";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7c7c",
];

export const DEFAULT_VISIBLE_TOPICS = 8;

interface TopicsDashboardLineChartProps {
  topics?: TopicWithSeries[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
  showAllTopics: boolean;
}

export function TopicsDashboardLineChart({
  topics,
  isLoading,
  formatDate,
  showAllTopics,
}: TopicsDashboardLineChartProps) {
  const sortedTopics = useMemo(() => {
    if (!topics?.length) return [];

    return [...topics]
      .map((t) => ({
        ...t,
        totalConversations: t.series.reduce(
          (sum, s) => sum + (s.conversations ?? 0),
          0
        ),
      }))
      .sort((a, b) => b.totalConversations - a.totalConversations);
  }, [topics]);

  const processedTopics = useMemo(() => {
    if (!sortedTopics.length) return [];
    if (showAllTopics) return sortedTopics;
    return sortedTopics.slice(0, DEFAULT_VISIBLE_TOPICS);
  }, [sortedTopics, showAllTopics]);

  const chartDataset = useMemo(() => {
    if (!processedTopics.length) return [];

    const allDates = new Set<string>();
    processedTopics.forEach((topic) => {
      topic.series.forEach((point) => allDates.add(point.date));
    });

    const sortedDates = Array.from(allDates).sort();

    return sortedDates.map((date) => {
      const dataPoint: Record<string, any> = {
        date: new Date(date),
        dateStr: formatDate(date),
      };

      processedTopics.forEach((topic) => {
        const point = topic.series.find((p) => p.date === date);
        dataPoint[topic.topicId] = point?.conversations ?? 0;
      });

      return dataPoint;
    });
  }, [processedTopics, formatDate]);

  const chartSeries = useMemo(
    () =>
      processedTopics.map((topic, index) => ({
        dataKey: topic.topicId,
        label: topic.topicName,
        color: topic.color || COLORS[index % COLORS.length],
        area: true,
        showMark: false,
        connectNulls: true,
        curve: "linear" as const,
      })),
    [processedTopics]
  );

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

  if (isLoading) return <Skeleton className="h-[300px] w-full" />;

  return (
    <div className="w-full h-[300px]">
      {chartDataset.length > 0 ? (
        <LineChart
          dataset={chartDataset}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "dateStr",
              tickLabelStyle: { fontSize: 12 },
            },
          ]}
          series={chartSeries}
          {...chartSetting}
          margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
          slotProps={{
            legend: { position: { vertical: "bottom", horizontal: "center" } },
          }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          No data available for the selected period
        </div>
      )}
    </div>
  );
}

