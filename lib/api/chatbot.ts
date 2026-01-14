import { fetch, guardedFetch } from "@/lib/api/axios";
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.CHATBOT.CREATE,
    API.ENDPOINTS.CHATBOT.BASE_URL(),
    {
      method: "POST",
      data: chatbot,
    },
  ).then((res) => res.data) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const getChatbot = async (chatbotId: string): Promise<ChatbotResponse> => {
  const endpoint = API.ENDPOINTS.CHATBOT.GET_CHATBOT.path().replace(
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
    API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.GET_CHATBOTS.path(),
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
    // Note: DELETE on GET_CHATBOT endpoint - this is a mutation but uses the same path
    const endpoint = API.ENDPOINTS.CHATBOT.GET_CHATBOT.path().replace(":chatbotId", input.id);
    const res = await fetch(
      API.ENDPOINTS.CHATBOT.BASE_URL() + endpoint,
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.CHATBOT.CREATE_TOPIC,
    API.ENDPOINTS.CHATBOT.BASE_URL(),
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.CHATBOT.UPDATE_TOPIC,
    API.ENDPOINTS.CHATBOT.BASE_URL(),
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
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const endpointPath = API.ENDPOINTS.CHATBOT.DELETE_TOPIC.path().replace(":id", input.id);
    const res = await guardedFetch(
      API.ENDPOINTS.CHATBOT.DELETE_TOPIC,
      API.ENDPOINTS.CHATBOT.BASE_URL().slice(0, -API.ENDPOINTS.CHATBOT.DELETE_TOPIC.path().length) + endpointPath,
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
  const endpoint = API.ENDPOINTS.CHATBOT.BASE_URL() + API.ENDPOINTS.CHATBOT.GET_TOPICS.path().replace(":chatbotId", chatbotId);
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
