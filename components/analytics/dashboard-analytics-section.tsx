"use client";

import type { DashboardData } from "@/types/analytics";
import { TopicsDashboardCard } from "@/components/analytics/topics-dashboard-card";
import { SentimentDashboardCard } from "@/components/analytics/sentiment-dashboard-card";

interface DashboardAnalyticsSectionProps {
  dashboard?: DashboardData;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function DashboardAnalyticsSection({
  dashboard,
  isLoading,
  formatDate,
}: DashboardAnalyticsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 items-stretch">
      <TopicsDashboardCard
        dashboard={dashboard}
        isLoading={isLoading}
        formatDate={formatDate}
      />
      <SentimentDashboardCard
        dashboard={dashboard}
        isLoading={isLoading}
        formatDate={formatDate}
      />
    </div>
  );
}

