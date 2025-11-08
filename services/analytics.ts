import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";
import { getAnalytics, getAnalyticsCharts, getAnalyticsFeedbacks, getAnalyticsSummary } from "@/lib/api/analytics";
import type { AnalyticsData, SummaryMetricsData, ChartsData, FeedbackItem } from "@/types/analytics";

export const useAnalyticsQuery = (chatbotId: string) =>
  useQuery<AnalyticsData>({
    queryKey: [QUERY_KEY.ANALYTICS, chatbotId],
    queryFn: () => getAnalytics(chatbotId),
    staleTime: 60_000,
  });


  export const useAnalyticsSummaryQuery = (chatbotId: string) =>
  
  useQuery<SummaryMetricsData>({
    queryKey: [QUERY_KEY.ANALYTICS_SUMMARY, chatbotId],
    queryFn: () => getAnalyticsSummary(chatbotId),
    staleTime: 60_000,
  });

export const useAnalyticsChartsQuery = (chatbotId: string) =>
  useQuery<ChartsData>({
    queryKey: [QUERY_KEY.ANALYTICS_CHARTS, chatbotId],
    queryFn: () => getAnalyticsCharts(chatbotId),
    staleTime: 60_000,
  });

export const useAnalyticsFeedbacksQuery = (chatbotId: string) =>
  useQuery<FeedbackItem[]>({
    queryKey: [QUERY_KEY.ANALYTICS_FEEDBACKS, chatbotId],
    queryFn: () => getAnalyticsFeedbacks(chatbotId),
    staleTime: 60_000,
  });