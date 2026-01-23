import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";
import {
  getChatlogs,
  getMessages,
  listConversations,
  listEscalations,
} from "@/lib/api/activity";
import type {
  ConversationItem,
  ConversationMessageItem,
  EscalationItem,
} from "@/types/activity";

export const useChatlogsQuery = (chatbotId: string) =>
  useQuery<ConversationItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_CHATLOGS, chatbotId],
    queryFn: () => getChatlogs(chatbotId),
    staleTime: 60_000,
    enabled: Boolean(chatbotId),
  });

export const useMessagesQuery = (chatbotId: string, conversationId: string) =>
  useQuery<ConversationMessageItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_MESSAGES, chatbotId, conversationId],
    queryFn: () => getMessages(chatbotId, conversationId),
    staleTime: 60_000,
    enabled: Boolean(conversationId),
  });

export const useConversationsQuery = (chatbotId: string) =>
  useQuery<ConversationItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_CONVERSATIONS, chatbotId],
    queryFn: () => listConversations({ chatbotId }),
    staleTime: 30_000,
    enabled: Boolean(chatbotId),
  });

export const useEscalationsQuery = (chatbotId: string) =>
  useQuery<EscalationItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS, chatbotId],
    queryFn: () => listEscalations({ chatbotId }),
    staleTime: 10_000,
    enabled: Boolean(chatbotId),
  });


