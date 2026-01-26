"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, PieChart as PieChartIcon, MessageSquare } from "lucide-react";
import { useMemo, useState } from "react";
import type { DashboardData } from "@/types/analytics";
import { TopicPieChart } from "@/components/analytics/topic-pie-chart";
import {
  DEFAULT_VISIBLE_TOPICS,
  TopicsDashboardLineChart,
} from "@/components/analytics/topics-dashboard-line-chart";

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

interface TopicsDashboardCardProps {
  dashboard?: DashboardData;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function TopicsDashboardCard({
  dashboard,
  isLoading,
  formatDate,
}: TopicsDashboardCardProps) {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const topicsSortedByVolume = useMemo(() => {
    const perDay = dashboard?.topics?.perDay ?? [];
    return [...perDay]
      .map((t) => ({
        ...t,
        totalConversations: t.series.reduce(
          (sum, s) => sum + (s.conversations ?? 0),
          0
        ),
      }))
      .sort((a, b) => b.totalConversations - a.totalConversations);
  }, [dashboard?.topics?.perDay]);

  const pieTopics = useMemo(() => {
    const totals = dashboard?.topics?.totals ?? [];
    return totals.map((topic, index) => ({
      name: topic.topicName,
      value: topic.conversations,
      likes: topic.likes,
      dislikes: topic.dislikes,
      color: topic.color || COLORS[index % COLORS.length],
    }));
  }, [dashboard?.topics?.totals]);

  const dateRangeLabel =
    dashboard?.dateRange?.startDate && dashboard?.dateRange?.endDate
      ? `Data from ${dashboard.dateRange.startDate} to ${dashboard.dateRange.endDate}`
      : null;

  return (
    <Tabs defaultValue="line" className="gap-0">
      <Card className="shadow-sm border-border/50 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Topics
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {dateRangeLabel ?? "Topic distribution and trends"}
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
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-muted-foreground">
              {topicsSortedByVolume.length <= DEFAULT_VISIBLE_TOPICS
                ? "Trend analysis (conversations per topic)"
                : showAllTopics
                  ? `Showing all topics (${topicsSortedByVolume.length})`
                  : `Showing top ${DEFAULT_VISIBLE_TOPICS} topics by volume`}
            </div>

            {topicsSortedByVolume.length > DEFAULT_VISIBLE_TOPICS ? (
              <button
                type="button"
                onClick={() => setShowAllTopics((v) => !v)}
                className="text-xs font-medium text-primary hover:underline whitespace-nowrap"
              >
                {showAllTopics
                  ? "Show top topics"
                  : `Show all (${topicsSortedByVolume.length})`}
              </button>
            ) : null}
          </div>

          <TabsContent value="line" className="mt-0 flex-1">
            <TopicsDashboardLineChart
              topics={dashboard?.topics?.perDay}
              isLoading={isLoading}
              formatDate={formatDate}
              showAllTopics={showAllTopics}
            />
          </TabsContent>

          <TabsContent value="pie" className="mt-0 flex-1">
            <TopicPieChart
              topics={pieTopics}
              isLoading={isLoading}
              showCard={false}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

