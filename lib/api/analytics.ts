import { fetch } from "@/lib/api/axios";
import { API } from "@/lib/api/config";
import {
  GetAnalyticsResponse,
  AnalyticsData,
  GetSummaryResponse,
  GetFeedbacksResponse,
  GetChartsResponse,
  DashboardData,
  GetDashboardResponse,
  TopicBarChartData,
  TopicPieChartData,
  GetTopicBarChartResponse,
  GetTopicPieChartResponse,
} from "@/types/analytics";

export const getAnalytics = async (chatbotId: string): Promise<AnalyticsData> => {
  try {
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_ANALYTICS.path().replace(
      ":chatbotId",
      chatbotId
    );
    const res = await fetch(API.ENDPOINTS.ANALYTICS.BASE_URL() + endpoint, {
      method: "GET",
    }).then((res) => res.data) as GetAnalyticsResponse;

    if (!res.success) {
      throw new Error("Failed to fetch analytics");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch analytics");
  }
};

export const getAnalyticsSummary = async (chatbotId: string): Promise<any> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_SUMMARY.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}`;
    console.log('Summary API - Final URL:', urlWithParams);

    const res = await fetch(urlWithParams, {
      method: "GET"
    }).then((res) => res.data) as GetSummaryResponse;

    if (!res.success) {
      throw new Error("Failed to fetch analytics summary");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch analytics summary");
  }
};

export const getAnalyticsCharts = async (chatbotId: string, days: number = 7): Promise<any> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_CHARTS.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}&days=${days}`;
    console.log('Charts API - Final URL:', urlWithParams);
    const res = await fetch(urlWithParams, {
      method: "GET"
    }).then((res) => res.data) as GetChartsResponse;
    if (!res.success) {
      throw new Error("Failed to fetch analytics charts");
    }
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch analytics charts");
  }
};

export const getAnalyticsFeedbacks = async (chatbotId: string, limit: number = 5): Promise<any> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_FEEDBACKS.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}&limit=${limit}`;
    console.log('Feedbacks API - Final URL:', urlWithParams);
    const res = await fetch(urlWithParams, {
      method: "GET"
    }).then((res) => res.data) as GetFeedbacksResponse;
    if (!res.success) {
      throw new Error("Failed to fetch analytics feedbacks");
    }
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch analytics feedbacks");
  }
};

export const getAnalyticsDashboard = async (
  chatbotId: string,
  days: number = 7
): Promise<DashboardData> => {
  try {
    if (!chatbotId || chatbotId.trim() === "") {
      throw new Error(
        `Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`
      );
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_DASHBOARD.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}&days=${days}`;
    console.log("Dashboard API - Final URL:", urlWithParams);

    const res = (await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data)) as GetDashboardResponse;

    if (!res.success) {
      throw new Error("Failed to fetch analytics dashboard");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch analytics dashboard");
  }
};


export const getAnalyticsTopicBarChart = async (chatbotId: string, days: number = 7): Promise<TopicBarChartData> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_TOPIC_BAR_CHART.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}&days=${days}`;
    console.log('Topic Bar Chart API - Final URL:', urlWithParams);

    const res = await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data) as GetTopicBarChartResponse;

    if (!res.success) {
      throw new Error("Failed to fetch topic bar chart data");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch topic bar chart data");
  }
};

export const getAnalyticsTopicPieChart = async (chatbotId: string, days: number = 7): Promise<TopicPieChartData> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_TOPIC_PIE_CHART.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}&days=${days}`;
    console.log('Topic Pie Chart API - Final URL:', urlWithParams);

    const res = await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data) as GetTopicPieChartResponse;

    if (!res.success) {
      throw new Error("Failed to fetch topic pie chart data");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch topic pie chart data");
  }
};
