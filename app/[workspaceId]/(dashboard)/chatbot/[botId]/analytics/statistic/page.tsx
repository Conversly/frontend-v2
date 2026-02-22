"use client";

import { Card } from "@/components/ui/card";
import {
  useAnalyticsSummaryQuery,
  useAnalyticsChartsQuery,
  useAnalyticsFeedbacksQuery,
  useAnalyticsDashboardQuery,
} from "@/services/analytics";
import { useState, use } from "react";
import { ControlsCard } from "@/components/analytics/controls-card";
import { SummaryCards } from "@/components/analytics/summary-cards";
import { ChartsSection } from "@/components/analytics/charts-section";
import { RecentFeedbackTable } from "@/components/analytics/recent-feedback-table";
import { DashboardAnalyticsSection } from "@/components/analytics/dashboard-analytics-section";
import { CountryAnalyticsCard } from "@/components/analytics/country-analytics-card";

interface StatisticPageProps {
  params: Promise<{
    botId: string;
  }>;
}

export default function StatisticPage({ params }: StatisticPageProps) {
  const { botId } = use(params);
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [feedbackLimit, setFeedbackLimit] = useState<number>(10);

  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useAnalyticsSummaryQuery(botId);
  const { data: chartsData, isLoading: chartsLoading, error: chartsError } = useAnalyticsChartsQuery(botId, selectedDays);
  const { data: feedbacksData, isLoading: feedbacksLoading, error: feedbacksError } = useAnalyticsFeedbacksQuery(botId, feedbackLimit);
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useAnalyticsDashboardQuery(botId, selectedDays);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatFeedbackDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Calculate feedback distribution from actual feedback data
  const calculateFeedbackDistribution = () => {
    if (!feedbacksData || feedbacksData.length === 0) {
      return { likes: 0, dislikes: 0, none: 0 };
    }

    const likes = feedbacksData.filter(item => item.feedback === 'like').length;
    const dislikes = feedbacksData.filter(item => item.feedback === 'dislike').length;

    return { likes, dislikes, none: 0 };
  };

  const feedbackDistribution = chartsData?.feedbackDistribution ?? calculateFeedbackDistribution();

  if (summaryError || chartsError || feedbacksError || dashboardError) {
    return (
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Statistics</h1>
          <p className="text-sm text-muted-foreground">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <Card className="p-4">
          <p className="text-sm text-destructive">Error loading analytics data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-4">
      <div className="mb-4">
        <h1 className="type-page-title">Statistics</h1>
        <p className="type-body-muted">
          Analyze conversation topics and trending themes
        </p>
      </div>

      <ControlsCard
        selectedDays={selectedDays}
        onDaysChange={setSelectedDays}
        feedbackLimit={feedbackLimit}
        onFeedbackLimitChange={setFeedbackLimit}
      />

      <SummaryCards summaryData={summaryData} isLoading={summaryLoading} />

      <ChartsSection
        chartsData={chartsData}
        chartsLoading={chartsLoading}
        feedbackDistribution={feedbackDistribution}
        feedbacksLoading={feedbacksLoading}
        formatDate={formatDate}
      />

      <DashboardAnalyticsSection
        dashboard={dashboardData}
        isLoading={dashboardLoading}
        formatDate={formatDate}
      />

      <CountryAnalyticsCard
        country={dashboardData?.country}
        isLoading={dashboardLoading}
      />

      <RecentFeedbackTable
        feedbacksData={feedbacksData}
        isLoading={feedbacksLoading}
        formatFeedbackDate={formatFeedbackDate}
      />
    </div>
  );
}
