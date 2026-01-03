import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
  ChatbotResponse,
  CreateChatbotInput,
  GetChatbotsResponse,
  DeleteChatbotInput,
  DeleteChatbotResponse,
  CreateTopicInput,
  TopicResponse,
  UpdateTopicInput,
  DeleteTopicInput,
  DeleteTopicResponse,
} from "@/types/chatbot";

export const createChatBot = async (chatbot: CreateChatbotInput) => {
  try {
    const res = await fetch(
      API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.CREATE(),
      {
        method: "POST",
        data: chatbot,
      },
    );
    
    const data = res.data as ApiResponse<ChatbotResponse, Error>;

    if (!data.success) {
      const error = new Error(data.message) as any;
      error.response = {
        data: {
          message: data.message,
          code: (data as any).code,
          requiresUpgrade: (data as any).requiresUpgrade,
        },
        status: res.status,
      };
      throw error;
    }
    return data.data;
  } catch (error: any) {
    // Axios throws errors for non-2xx status codes
    // The error.response contains the response data
    if (error.response) {
      // Preserve the original axios error structure
      // This ensures React Query receives the error with response.data intact
      throw error;
    }
    // Network error or other error without response
    throw error;
  }
};

export const getChatbot = async (chatbotId: string): Promise<ChatbotResponse> => {
  const endpoint = API.ENDPOINTS.CHATBOT.GET_CHATBOT().replace(
    ":chatbotId",
    chatbotId
  );
  const res = await fetch(API.ENDPOINTS.CHATBOT.BASE_URL() + endpoint, {
    method: "GET",
  }).then((res) => res.data) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getChatbots = async (): Promise<GetChatbotsResponse[]> => {
  const res = await fetch(
    API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.GET_CHATBOTS(),
    {
      method: "GET",
    },
  ).then((res) => res.data) as ApiResponse<GetChatbotsResponse[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const deleteChatbot = async (
  input: DeleteChatbotInput
): Promise<DeleteChatbotResponse> => {
  try {
    const res = await fetch(
      API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.GET_CHATBOT().replace(":chatbotId", input.id),
      {
        method: "DELETE",
      },
    ).then((res) => res.data) as DeleteChatbotResponse;

    if (!res.success) {
      throw new Error(res.message || "Failed to delete chatbot");
    }

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to delete chatbot");
  }
};

export const createTopic = async (input: CreateTopicInput): Promise<TopicResponse> => {
  const res = await fetch(
    API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.CREATE_TOPIC(),
    {
      method: "POST",
      data: input,
    },
  ).then((res) => res.data) as ApiResponse<TopicResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const updateTopic = async (input: UpdateTopicInput): Promise<TopicResponse> => {
  const res = await fetch(
    API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.UPDATE_TOPIC(),
    {
      method: "PATCH",
      data: input,
    },
  ).then((res) => res.data) as ApiResponse<TopicResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const deleteTopic = async (input: DeleteTopicInput): Promise<DeleteTopicResponse> => {
  try {
    const endpoint = API.ENDPOINTS.CHATBOT.BASE_URL() +  API.ENDPOINTS.CHATBOT.DELETE_TOPIC().replace(":id", input.id);
    const res = await fetch(
      endpoint,
      {
        method: "DELETE",
      },
    ).then((res) => res.data) as DeleteTopicResponse;

    if (!res.success) {
      throw new Error(res.message || "Failed to delete topic");
    }

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to delete topic");
  }
};

export const getTopic = async (chatbotId: string): Promise<TopicResponse[]> => {
  const endpoint = API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.GET_TOPICS().replace(":chatbotId", chatbotId);
  const res = await fetch(
    endpoint,
    {
      method: "GET",
    },
  ).then((res) => res.data) as ApiResponse<TopicResponse[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

