"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { useMemo, useState } from "react";
import type { TopicSeries as TopicSeriesType } from "@/types/analytics";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];
const DEFAULT_VISIBLE_TOPICS = 8;

interface TopicLineChartProps {
  topics?: TopicSeriesType[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function TopicLineChart({ topics, isLoading, formatDate }: TopicLineChartProps) {

  const [showAllTopics, setShowAllTopics] = useState(false);

  const sortedTopics = useMemo(() => {
    if (!topics || topics.length === 0) return [];

    return [...topics]
      .map((t) => ({
        ...t,
        totalMessages: t.series.reduce((sum, s) => sum + s.messages, 0),
      }))
      .sort((a, b) => b.totalMessages - a.totalMessages);
  }, [topics]);

  const processedTopics = useMemo(() => {
    if (sortedTopics.length === 0) return [];
    if (showAllTopics) return sortedTopics;
    return sortedTopics.slice(0, DEFAULT_VISIBLE_TOPICS);
  }, [sortedTopics, showAllTopics]);

  // Transform data for MUI X Charts (dataset format)
  const chartDataset = useMemo(() => {
    if (processedTopics.length === 0) return [];

    // Get all unique dates from the processed topics (including Other)
    const allDates = new Set<string>();
    processedTopics.forEach(topic => {
      topic.series.forEach(point => allDates.add(point.date));
    });

    const sortedDates = Array.from(allDates).sort();

    // Create dataset
    return sortedDates.map(date => {
      const dataPoint: any = {
        date: new Date(date),
        dateStr: formatDate(date)
      };

      processedTopics.forEach(topic => {
        const point = topic.series.find(p => p.date === date);
        dataPoint[topic.topicId] = point?.messages || 0;
      });

      return dataPoint;
    });
  }, [processedTopics, formatDate]);

  // Generate series config dynamically
  const chartSeries = useMemo(
    () =>
      processedTopics.map((topic, index) => ({
        dataKey: topic.topicId,
        label: topic.topicName,
        color: topic.color || COLORS[index % COLORS.length],
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
        transform: 'translate(-20px, 0)',
      },
      [`.${chartsGridClasses.line}`]: { strokeDasharray: '3 3', stroke: '#e2e8f0' },
      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      "& .MuiChartsLegend-series text": {
        fontSize: "0.75rem !important",
        fill: "#64748b !important"
      }
    },
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Topic Messages Over Time
            </CardTitle>
            <CardDescription>
              {sortedTopics.length <= DEFAULT_VISIBLE_TOPICS
                ? "Trend analysis of conversation topics"
                : showAllTopics
                  ? `Showing all topics (${sortedTopics.length})`
                  : `Showing top ${DEFAULT_VISIBLE_TOPICS} topics by volume`}
            </CardDescription>
          </div>

          {sortedTopics.length > DEFAULT_VISIBLE_TOPICS && (
            <button
              type="button"
              onClick={() => setShowAllTopics((v) => !v)}
              className="text-xs font-medium text-primary hover:underline whitespace-nowrap mt-1"
            >
              {showAllTopics ? "Show top topics" : `Show all (${sortedTopics.length})`}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="w-full h-[300px]">
            {chartDataset.length > 0 ? (
              <LineChart
                dataset={chartDataset}
                xAxis={[{
                  scaleType: 'point',
                  dataKey: 'dateStr',
                  tickLabelStyle: { fontSize: 12 }
                }]}
                series={chartSeries}
                {...chartSetting}
                margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
                slotProps={{
                  legend: {
                    position: { vertical: 'bottom', horizontal: 'center' },
                  }
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No data available for the selected period
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
