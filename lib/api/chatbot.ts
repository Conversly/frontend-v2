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
  UpdateChatbotInput,
} from "@/types/chatbot";

export const updateChatbot = async (chatbot: UpdateChatbotInput): Promise<ChatbotResponse> => {
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = (await guardedFetch(
    {
      ...API.ENDPOINTS.CHATBOT.UPDATE_CHATBOT,
      path: () => API.ENDPOINTS.CHATBOT.UPDATE_CHATBOT.path().replace(":id", chatbot.id),
    },
    API.ENDPOINTS.CHATBOT.BASE_URL(),
    {
      method: "PATCH",
      data: chatbot,
    }
  ).then((res) => res.data)) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const createChatBot = async (chatbot: CreateChatbotInput) => {
  if (!chatbot.workspaceId) {
    throw new Error("workspaceId is required to create a chatbot");
  }

  const endpoint = API.ENDPOINTS.WORKSPACES.CHATBOTS.path().replace(
    ":workspaceId",
    chatbot.workspaceId
  );

  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    {
      method: "POST",
      data: chatbot,
    }
  ).then((res) => res.data)) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const getChatbot = async (
  workspaceId: string,
  chatbotId: string
): Promise<ChatbotResponse> => {
  const endpoint = API.ENDPOINTS.WORKSPACES.CHATBOT.path()
    .replace(":workspaceId", workspaceId)
    .replace(":botId", chatbotId);

  const res = (await fetch(API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint, {
    method: "GET",
  }).then((res) => res.data)) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

// Public/legacy fetch by botId only (used in public deploy pages where workspaceId isn't in the URL)
export const getChatbotPublic = async (chatbotId: string): Promise<ChatbotResponse> => {
  const endpoint = API.ENDPOINTS.CHATBOT.GET_CHATBOT.path().replace(
    ":chatbotId",
    chatbotId
  );
  const res = (await fetch(API.ENDPOINTS.CHATBOT.BASE_URL() + endpoint, {
    method: "GET",
  }).then((res) => res.data)) as ApiResponse<ChatbotResponse, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};

export const getChatbots = async (workspaceId: string): Promise<GetChatbotsResponse[]> => {
  const url =
    API.ENDPOINTS.WORKSPACES.BASE_URL() +
    API.ENDPOINTS.WORKSPACES.CHATBOTS.path().replace(":workspaceId", workspaceId);

  const res = await fetch(url, { method: "GET" }).then((res) => res.data) as ApiResponse<
    GetChatbotsResponse[],
    Error
  >;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const deleteChatbot = async (
  input: DeleteChatbotInput
): Promise<DeleteChatbotResponse> => {
  try {
    if (!input.workspaceId) {
      throw new Error("workspaceId is required to delete a chatbot");
    }

    const url =
      API.ENDPOINTS.WORKSPACES.BASE_URL() +
      API.ENDPOINTS.WORKSPACES.CHATBOT.path()
        .replace(":workspaceId", input.workspaceId)
        .replace(":botId", input.id);

    const res = await fetch(url, { method: "DELETE" }).then(
      (res) => res.data
    ) as DeleteChatbotResponse;

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
    const res = await guardedFetch(
      API.ENDPOINTS.CHATBOT.DELETE_TOPIC,
      API.ENDPOINTS.CHATBOT.BASE_URL(),
      {
        method: "DELETE",
        params: { id: input.id },
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
