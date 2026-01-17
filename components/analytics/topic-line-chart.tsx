"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];
const MAX_TOPICS = 5;

interface TopicSeries {
  topicId: string;
  topicName: string;
  color?: string | null;
  series: Array<{ date: string; messages: number }>;
}

interface TopicLineChartProps {
  topics?: TopicSeries[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function TopicLineChart({ topics, isLoading, formatDate }: TopicLineChartProps) {

  // Process data to filter Top N + Other
  const processedTopics = (() => {
    if (!topics || topics.length === 0) return [];

    // Calculate total messages per topic to sort
    const topicTotals = topics.map(t => ({
      ...t,
      totalMessages: t.series.reduce((sum, s) => sum + s.messages, 0)
    }));

    // Sort by total messages descending
    topicTotals.sort((a, b) => b.totalMessages - a.totalMessages);

    // If we have few topics, return as is
    if (topicTotals.length <= MAX_TOPICS) {
      return topicTotals;
    }

    // Split into Top N and Rest
    const topTopics = topicTotals.slice(0, MAX_TOPICS);
    const otherTopics = topicTotals.slice(MAX_TOPICS);

    // Create "Other" topic
    // We need to merge all series from otherTopics
    // First, find all unique dates involved in "Other"
    const otherSeriesMap = new Map<string, number>();

    otherTopics.forEach(topic => {
      topic.series.forEach(point => {
        const current = otherSeriesMap.get(point.date) || 0;
        otherSeriesMap.set(point.date, current + point.messages);
      });
    });

    // Convert map to array
    const otherSeries = Array.from(otherSeriesMap.entries()).map(([date, messages]) => ({
      date,
      messages
    }));

    const otherTopic: TopicSeries = {
      topicId: 'other',
      topicName: 'Other',
      color: '#94a3b8', // Gray for Other
      series: otherSeries
    };

    return [...topTopics, otherTopic];
  })();

  // Transform data for MUI X Charts (dataset format)
  const chartDataset = (() => {
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
        dataPoint[topic.topicName] = point?.messages || 0;
      });

      return dataPoint;
    });
  })();

  // Generate series config dynamically
  const chartSeries = processedTopics.map((topic, index) => ({
    dataKey: topic.topicName,
    label: topic.topicName,
    color: topic.topicName === 'Other' ? '#94a3b8' : (topic.color || COLORS[index % COLORS.length]),
    showMark: false,
    connectNulls: true,
    curve: "linear" as const,
  }));

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
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Topic Messages Over Time
        </CardTitle>
        <CardDescription>
          Trend analysis of conversation topics (Top 5)
        </CardDescription>
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
                    itemGap: 10,
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
