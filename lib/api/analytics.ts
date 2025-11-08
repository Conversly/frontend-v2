import { fetch } from "@/lib/api/axios";
import { API } from "@/lib/api/config";
import { GetAnalyticsResponse, AnalyticsData, GetSummaryResponse, GetFeedbacksResponse, GetChartsResponse } from "@/types/analytics";

export const getAnalytics = async (chatbotId: string): Promise<AnalyticsData> => {
  try {
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_ANALYTICS().replace(
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
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_SUMMARY();
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

export const getAnalyticsCharts = async (chatbotId: string): Promise<any> => {
  try {
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }
    
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_CHARTS();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}`;
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

export const getAnalyticsFeedbacks = async (chatbotId: string): Promise<any> => {
  try {
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }
    
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_FEEDBACKS();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}`;
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
