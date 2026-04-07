import { fetch } from "@/lib/api/axios";
import { API } from "@/lib/api/config";
import type {
  CloseConversationResponse,
  ConversationItem,
  ConversationMessageItem,
  ConversationState,
  GetConversationMessagesResponse,
  GetConversationsResponse,
  MessageChannel,
} from "@/types/activity";

function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    qs.set(k, String(v));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

function fillPath(pathTemplate: string, params: Record<string, string>): string {
  let out = pathTemplate;
  for (const [k, v] of Object.entries(params)) {
    out = out.replaceAll(`:${k}`, encodeURIComponent(v));
  }
  return out;
}

// New Activity API (conversationId-based).

export async function listConversations(params: {
  chatbotId: string;
  status?: ConversationState;
  channel?: MessageChannel;
  limit?: number;
}): Promise<ConversationItem[]> {
  try {
    const { chatbotId, status, channel, limit } = params;
    if (!chatbotId || chatbotId.trim() === "") {
      throw new Error("chatbotId is required");
    }

    const endpoint =
      API.ENDPOINTS.ACTIVITY.BASE_URL() + API.ENDPOINTS.ACTIVITY.LIST_CONVERSATIONS.path();
    const url = `${endpoint}${buildQuery({ chatbotId, status, channel, limit })}`;

    const res = (await fetch(url, { method: "GET" }).then((r) => r.data)) as GetConversationsResponse;
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch conversations");
  }
}

export async function listContactConversations(contactId: string, limit?: number): Promise<ConversationItem[]> {
  try {
    if (!contactId || contactId.trim() === "") {
      throw new Error("contactId is required");
    }

    const endpoint =
      API.ENDPOINTS.ACTIVITY.BASE_URL() + "/conversations/by-contact";
    const url = `${endpoint}${buildQuery({ contactId, limit })}`;

    const res = (await fetch(url, { method: "GET" }).then((r) => r.data)) as GetConversationsResponse;
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch contact conversations");
  }
}

export async function getConversationMessages(conversationId: string): Promise<ConversationMessageItem[]> {
  try {
    if (!conversationId || !conversationId.trim()) {
      throw new Error("conversationId is required");
    }

    const endpoint =
      API.ENDPOINTS.ACTIVITY.BASE_URL() +
      fillPath(API.ENDPOINTS.ACTIVITY.GET_CONVERSATION_MESSAGES.path(), { conversationId });
    const res = (await fetch(endpoint, { method: "GET" }).then((r) => r.data)) as GetConversationMessagesResponse;
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch conversation messages");
  }
}

export async function closeConversation(conversationId: string): Promise<CloseConversationResponse["data"]> {
  try {
    if (!conversationId || !conversationId.trim()) {
      throw new Error("conversationId is required");
    }

    const endpoint =
      API.ENDPOINTS.ACTIVITY.BASE_URL() +
      fillPath(API.ENDPOINTS.ACTIVITY.CLOSE_CONVERSATION.path(), { conversationId });
    const res = (await fetch(endpoint, { method: "PATCH", data: {} }).then((r) => r.data)) as CloseConversationResponse;
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to close conversation");
  }
}

// Back-compat exports (legacy names used by the dashboard page).
// These now map to the new conversationId-based endpoints.
export const getChatlogs = async (chatbotId: string): Promise<ConversationItem[]> =>
  listConversations({ chatbotId });

export const getMessages = async (_chatbotId: string, conversationId: string): Promise<ConversationMessageItem[]> =>
  getConversationMessages(conversationId);
