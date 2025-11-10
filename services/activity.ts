import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";
import { getChatlogs, getMessages } from "@/lib/api/activity";
import type { ChatlogItem, MessageItem } from "@/types/activity";

export const useChatlogsQuery = (chatbotId: string) =>
  useQuery<ChatlogItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_CHATLOGS, chatbotId],
    queryFn: () => getChatlogs(chatbotId),
    staleTime: 60_000,
    enabled: Boolean(chatbotId),
  });

export const useMessagesQuery = (chatbotId: string, uniqueConvId: string) =>
  useQuery<MessageItem[]>({
    queryKey: [QUERY_KEY.ACTIVITY_MESSAGES, chatbotId, uniqueConvId],
    queryFn: () => getMessages(chatbotId, uniqueConvId),
    staleTime: 60_000,
    enabled: Boolean(chatbotId && uniqueConvId),
  });


