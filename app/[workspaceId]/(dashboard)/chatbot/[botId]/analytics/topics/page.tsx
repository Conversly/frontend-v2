"use client";

import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  useTopicBarChartQuery,
  useTopicPieChartQuery
} from "@/services/analytics";
import { useState } from "react";
import { ManageTopicsDialog } from "@/components/analytics/manage-topics-dialog";
import { TimePeriodSelector } from "@/components/analytics/time-period-selector";
import { TopicLineChart } from "@/components/analytics/topic-line-chart";
import { TopicPieChart } from "@/components/analytics/topic-pie-chart";
import { TopicSummaryTable } from "@/components/analytics/topic-summary-table";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

export default function TopicsPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const [selectedDays, setSelectedDays] = useState<number>(7);

  // Chart data queries
  const { data: barChartData, isLoading: barChartLoading, error: barChartError } = useTopicBarChartQuery(botId, selectedDays);
  const { data: pieChartData, isLoading: pieChartLoading, error: pieChartError } = useTopicPieChartQuery(botId, selectedDays);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Transform pie chart data for recharts
  const transformPieChartData = () => {
    if (!pieChartData?.topics || pieChartData.topics.length === 0) return [];

    return pieChartData.topics.map((topic, index) => ({
      name: topic.topicName,
      value: topic.messages,
      likes: topic.likes,
      dislikes: topic.dislikes,
      color: topic.color || COLORS[index % COLORS.length]
    }));
  };

  if (barChartError || pieChartError) {
    return (
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
          <p className="text-sm text-muted-foreground">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <Card className="p-4">
          <p className="text-sm text-destructive">Error loading topic data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  const transformedPieData = transformPieChartData();

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="type-page-title">Topics</h1>
          <p className="type-body-muted">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <ManageTopicsDialog botId={botId} />
      </div>

      <TimePeriodSelector
        selectedDays={selectedDays}
        onDaysChange={setSelectedDays}
        startDate={barChartData?.dateRange?.startDate || pieChartData?.dateRange?.startDate}
        endDate={barChartData?.dateRange?.endDate || pieChartData?.dateRange?.endDate}
      />


      <div className="grid gap-4 md:grid-cols-2">
        <TopicLineChart
          topics={barChartData?.topics}
          isLoading={barChartLoading}
          formatDate={formatDate}
        />

        <TopicPieChart
          topics={transformedPieData}
          isLoading={pieChartLoading}
        />
      </div>

      <TopicSummaryTable
        topics={transformedPieData}
        isLoading={pieChartLoading}
      />
    </div>
  );
}
