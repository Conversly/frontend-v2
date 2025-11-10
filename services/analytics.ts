import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";
import { 
  getAnalytics, 
  getAnalyticsCharts, 
  getAnalyticsFeedbacks, 
  getAnalyticsSummary,
  getAnalyticsTopicBarChart,
  getAnalyticsTopicPieChart,
} from "@/lib/api/analytics";
import type { 
  AnalyticsData, 
  SummaryMetricsData, 
  ChartsData, 
  FeedbackItem,
  TopicBarChartData,
  TopicPieChartData,
  TopicResponse,
  CreateTopicInput,
  UpdateTopicInput,
  DeleteTopicInput
} from "@/types/analytics";

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

export const useAnalyticsChartsQuery = (chatbotId: string, days: number = 7) =>
  useQuery<ChartsData>({
    queryKey: [QUERY_KEY.ANALYTICS_CHARTS, chatbotId, days],
    queryFn: () => getAnalyticsCharts(chatbotId, days),
    staleTime: 60_000,
  });

export const useAnalyticsFeedbacksQuery = (chatbotId: string, limit: number = 5) =>
  useQuery<FeedbackItem[]>({
    queryKey: [QUERY_KEY.ANALYTICS_FEEDBACKS, chatbotId, limit],
    queryFn: () => getAnalyticsFeedbacks(chatbotId, limit),
    staleTime: 60_000,
  });

export const useTopicBarChartQuery = (chatbotId: string, days: number = 7) =>
  useQuery<TopicBarChartData>({
    queryKey: [QUERY_KEY.TOPIC_BAR_CHART, chatbotId, days],
    queryFn: () => getAnalyticsTopicBarChart(chatbotId, days),
    staleTime: 60_000,
  });

export const useTopicPieChartQuery = (chatbotId: string, days: number = 7) =>
  useQuery<TopicPieChartData>({
    queryKey: [QUERY_KEY.TOPIC_PIE_CHART, chatbotId, days],
    queryFn: () => getAnalyticsTopicPieChart(chatbotId, days),
    staleTime: 60_000,
  });