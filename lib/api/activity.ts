import { fetch } from "@/lib/api/axios";
import { API } from "@/lib/api/config";
import type {
  ChatlogItem,
  GetChatlogsResponse,
  GetMessagesResponse,
  MessageItem,
} from "@/types/activity";

export const getChatlogs = async (chatbotId: string): Promise<ChatlogItem[]> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }

    const endpoint = API.ENDPOINTS.ACTIVITY.BASE_URL() + API.ENDPOINTS.ACTIVITY.GET_CHATLOGS.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(chatbotId)}`;

    const res = (await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data)) as GetChatlogsResponse;

    if (!res.success) {
      throw new Error("Failed to fetch chat logs");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch chat logs");
  }
};

export const getMessages = async (
  chatbotId: string,
  uniqueConvId: string,
): Promise<MessageItem[]> => {
  try {
    if (!chatbotId || chatbotId.trim() === '') {
      throw new Error(`Invalid chatbot ID: ${chatbotId}. Must be a valid UUID string.`);
    }
    if (!uniqueConvId || !uniqueConvId.trim()) {
      throw new Error("uniqueConvId is required");
    }

    const endpoint = API.ENDPOINTS.ACTIVITY.BASE_URL() + API.ENDPOINTS.ACTIVITY.GET_MESSAGES.path();
    const urlWithParams = `${endpoint}?chatbotId=${encodeURIComponent(
      chatbotId,
    )}&uniqueConvId=${encodeURIComponent(uniqueConvId)}`;

    const res = (await fetch(urlWithParams, {
      method: "GET",
    }).then((res) => res.data)) as GetMessagesResponse;

    if (!res.success) {
      throw new Error("Failed to fetch messages");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch messages");
  }
};
