import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";
import {
  getMessages,
  listConversations,
  type ListConversationsParams,
} from "@/lib/api/activity";
import { listEscalations } from "@/lib/api/escalate";
import type {
  ConversationItem,
  ConversationMessageItem,
  ConversationState,
  EscalationItem,
  MessageChannel,
} from "@/types/activity";

export const useMessagesQuery = (chatbotId: string, conversationId: string) =>
  useQuery<ConversationMessageItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_MESSAGES, chatbotId, conversationId],
    queryFn: () => getMessages(chatbotId, conversationId),
    staleTime: 60_000,
    enabled: Boolean(conversationId),
  });

export const useConversationsQuery = (
  chatbotId: string,
  params?: {
    status?: ConversationState;
    channel?: MessageChannel;
    limit?: number;
    offset?: number;
    search?: string;
  },
) =>
  useQuery<ConversationItem[]>({
    queryKey: [
      QUERY_KEY.ACTIVITY_CONVERSATIONS,
      chatbotId,
      params?.status,
      params?.channel,
      params?.limit,
      params?.offset,
      params?.search,
    ],
    queryFn: () => listConversations({ chatbotId, ...params } satisfies ListConversationsParams),
    staleTime: 30_000,
    enabled: Boolean(chatbotId),
  });

export const useEscalationsQuery = (
  chatbotId: string,
  params?: { mine?: boolean; status?: ConversationState; limit?: number; offset?: number; search?: string },
) =>
  useQuery<EscalationItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS, chatbotId, params?.mine, params?.status, params?.limit, params?.offset, params?.search],
    queryFn: () => listEscalations({ chatbotId, mine: params?.mine, status: params?.status, limit: params?.limit, offset: params?.offset, search: params?.search }),
    staleTime: 10_000,
    enabled: Boolean(chatbotId),
  });
