import { fetch } from "@/lib/api/axios";
import { API } from "@/lib/api/config";
import { 
  GetAnalyticsResponse, 
  AnalyticsData, 
  GetSummaryResponse, 
  GetFeedbacksResponse, 
  GetChartsResponse,
  TopicBarChartData,
  TopicPieChartData,
  GetTopicBarChartResponse,
  GetTopicPieChartResponse,
  CreateTopicInput,
  UpdateTopicInput,
  DeleteTopicInput,
  TopicResponse,
  GetTopicsResponse,
  CreateTopicResponse,
  UpdateTopicResponse,
  DeleteTopicResponse
} from "@/types/analytics";

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

export const getAnalyticsCharts = async (chatbotId: string, days: number = 7): Promise<any> => {
  try {
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }
    
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_CHARTS();
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
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }
    
    const endpoint = API.ENDPOINTS.ANALYTICS.GET_FEEDBACKS();
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


export const getAnalyticsTopicBarChart = async (chatbotId: string, days: number = 7): Promise<TopicBarChartData> => {
  try {
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_TOPIC_BAR_CHART();
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
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_TOPIC_PIE_CHART();
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

// Topic CRUD operations
export const getTopics = async (chatbotId: string): Promise<TopicResponse[]> => {
  try {
    // Ensure chatbotId is a valid numeric string
    if (!chatbotId || !/^\d+$/.test(chatbotId)) {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid number.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.GET_TOPIC();
    const urlWithParams = `${endpoint}?id=${encodeURIComponent(chatbotId)}`;
    console.log('Get Topics API - Final URL:', urlWithParams);
    
    const res = await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data) as GetTopicsResponse;
    
    if (!res.success) {
      throw new Error("Failed to fetch topics");
    }
    
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch topics");
  }
};

export const createTopic = async (input: CreateTopicInput): Promise<TopicResponse> => {
  try {
    // Ensure chatbotId is a valid number
    if (!input.chatbotId || typeof input.chatbotId !== 'number') {
      throw new Error(`Invalid chatbot ID: ${input.chatbotId}. Must be a valid number.`);
    }

    if (!input.name || input.name.trim() === '') {
      throw new Error('Topic name is required');
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.CREATE_TOPIC();
    console.log('Create Topic API - Final URL:', endpoint);
    console.log('Create Topic API - Payload:', input);
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      data: input,
    }).then((res) => res.data) as CreateTopicResponse;
    
    if (!res.success) {
      throw new Error("Failed to create topic");
    }
    
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to create topic");
  }
};

export const updateTopic = async (input: UpdateTopicInput): Promise<TopicResponse> => {
  try {
    // Ensure id is a valid number
    if (!input.id || typeof input.id !== 'number') {
      throw new Error(`Invalid topic ID: ${input.id}. Must be a valid number.`);
    }

    if (input.name !== undefined && input.name.trim() === '') {
      throw new Error('Topic name cannot be empty');
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.UPDATE_TOPIC();
    console.log('Update Topic API - Final URL:', endpoint);
    console.log('Update Topic API - Payload:', input);
    
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      data: input,
    }).then((res) => res.data) as UpdateTopicResponse;
    
    if (!res.success) {
      throw new Error("Failed to update topic");
    }
    
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to update topic");
  }
};

export const deleteTopic = async (input: DeleteTopicInput): Promise<DeleteTopicResponse> => {
  try {
    // Ensure id is a valid number
    if (!input.id || typeof input.id !== 'number') {
      throw new Error(`Invalid topic ID: ${input.id}. Must be a valid number.`);
    }

    const endpoint = API.ENDPOINTS.ANALYTICS.DELETE_TOPIC().replace(':id', input.id.toString());
    console.log('Delete Topic API - Final URL:', endpoint);
    
    const res = await fetch(endpoint, {
      method: "DELETE",
    }).then((res) => res.data) as DeleteTopicResponse;
    
    if (!res.success) {
      throw new Error("Failed to delete topic");
    }
    
    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to delete topic");
  }
};


