import {
  createChatBot,
  getChatbots,
  getChatbot,
  deleteChatbot,
  updateChatbot,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} from "@/lib/api/chatbot";
import type { TopicResponse, ChatbotResponse, GetChatbotsResponse } from "@/types/chatbot";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback } from "react";

// Cache configuration for chatbots
const CHATBOT_CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000,  // 5 minutes
  gcTime: 15 * 60 * 1000,    // 15 minutes
};

export const useCreateChatbot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_CHATBOT],
    mutationFn: createChatBot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });
    },
  });
};

export const useGetChatbots = (workspaceId?: string) => {
  const isAuthenticated = typeof window !== "undefined"
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_CHATBOTS, workspaceId ?? "ALL"],
    queryFn: () => {
      if (!workspaceId) throw new Error("workspaceId is required");
      return getChatbots(workspaceId);
    },
    enabled: isAuthenticated && !!workspaceId, // Only fetch when authenticated + workspace known
    ...CHATBOT_CACHE_CONFIG,
  });
};

/**
 * Hook to prefetch chatbots for a workspace.
 * Use for preloading data on hover/navigation before page mount.
 */
export const usePrefetchChatbots = () => {
  const queryClient = useQueryClient();

  const prefetchChatbots = useCallback((workspaceId: string) => {
    if (!workspaceId) return;

    // Only prefetch if not already in cache
    const existingData = queryClient.getQueryData<GetChatbotsResponse[]>(
      [QUERY_KEY.GET_CHATBOTS, workspaceId]
    );

    if (!existingData) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.GET_CHATBOTS, workspaceId],
        queryFn: () => getChatbots(workspaceId),
        ...CHATBOT_CACHE_CONFIG,
      });
    }
  }, [queryClient]);

  return { prefetchChatbots };
};

/**
 * Utility to prefetch chatbots outside of React components.
 * Can be used in event handlers for optimal performance.
 */
export const prefetchChatbotsUtil = (
  queryClient: ReturnType<typeof useQueryClient>,
  workspaceId: string
) => {
  if (!workspaceId) return Promise.resolve();

  return queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_CHATBOTS, workspaceId],
    queryFn: () => getChatbots(workspaceId),
    ...CHATBOT_CACHE_CONFIG,
  });
};

export const useChatbot = (chatbotId: string) => {
  // deprecated: keep signature but require callers to use useChatbotInWorkspace
  const isAuthenticated = typeof window !== "undefined"
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_CHATBOT, chatbotId],
    queryFn: () => {
      throw new Error("useChatbot(chatbotId) is deprecated; use useChatbotInWorkspace(workspaceId, chatbotId)");
    },
    enabled: false,
    staleTime: 60_000,
  });
};

export const useChatbotInWorkspace = (workspaceId: string, chatbotId: string) => {
  const isAuthenticated =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
      : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_CHATBOT, workspaceId, chatbotId],
    queryFn: () => getChatbot(workspaceId, chatbotId),
    enabled: isAuthenticated && !!workspaceId && !!chatbotId,
    staleTime: 60_000,
  });
};

export const useDeleteChatbot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_CHATBOT],
    mutationFn: deleteChatbot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });
    },
  });
};

export const useUpdateChatbotMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.UPDATE_CHATBOT],
    mutationFn: updateChatbot,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOT, data.workspaceId, data.id] });
    },
  });
};


// Topic CRUD hooks
export const useTopicsQuery = (chatbotId: string) =>
  useQuery<TopicResponse[]>({
    queryKey: [QUERY_KEY.TOPICS, chatbotId],
    queryFn: () => getTopic(chatbotId),
    staleTime: 60_000,
  });

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: (data, variables) => {
      // Invalidate topics query to refetch data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPICS, variables.chatbotId]
      });
      // Also invalidate topic charts as they might have changed
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_BAR_CHART, variables.chatbotId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_PIE_CHART, variables.chatbotId]
      });
    },
  });
};

export const useUpdateTopicMutation = (chatbotId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTopic,
    onSuccess: () => {
      // Invalidate topics query to refetch data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPICS, chatbotId]
      });
      // Also invalidate topic charts as they might have changed
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_BAR_CHART, chatbotId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_PIE_CHART, chatbotId]
      });
    },
  });
};

export const useDeleteTopicMutation = (chatbotId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      // Invalidate topics query to refetch data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPICS, chatbotId]
      });
      // Also invalidate topic charts as they might have changed
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_BAR_CHART, chatbotId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOPIC_PIE_CHART, chatbotId]
      });
    },
  });
};

// Suspense-enabled hooks for streaming architecture

/**
 * Suspense-enabled hook for fetching chatbots in a workspace.
 * Use within a React Suspense boundary - will throw a promise while loading.
 */
export const useSuspenseGetChatbots = (workspaceId: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.GET_CHATBOTS, workspaceId ?? "ALL"],
    queryFn: (): Promise<GetChatbotsResponse[]> => {
      if (!workspaceId) throw new Error("workspaceId is required");
      return getChatbots(workspaceId);
    },
    ...CHATBOT_CACHE_CONFIG,
  });
};

/**
 * Suspense-enabled hook for fetching a single chatbot in a workspace.
 * Use within a React Suspense boundary - will throw a promise while loading.
 */
export const useSuspenseChatbotInWorkspace = (workspaceId: string, chatbotId: string) => {
  return useSuspenseQuery<ChatbotResponse>({
    queryKey: [QUERY_KEY.GET_CHATBOT, workspaceId, chatbotId],
    queryFn: () => getChatbot(workspaceId, chatbotId),
    ...CHATBOT_CACHE_CONFIG,
  });
};

/**
 * Hook to prefetch a single chatbot.
 * Use for preloading data when hovering over chatbot links.
 */
export const usePrefetchChatbot = () => {
  const queryClient = useQueryClient();

  const prefetchChatbot = useCallback((workspaceId: string, chatbotId: string) => {
    if (!workspaceId || !chatbotId) return;

    // Only prefetch if not already in cache
    const existingData = queryClient.getQueryData<ChatbotResponse>(
      [QUERY_KEY.GET_CHATBOT, workspaceId, chatbotId]
    );

    if (!existingData) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.GET_CHATBOT, workspaceId, chatbotId],
        queryFn: () => getChatbot(workspaceId, chatbotId),
        ...CHATBOT_CACHE_CONFIG,
      });
    }
  }, [queryClient]);

  return { prefetchChatbot };
};

/**
 * Utility to prefetch a single chatbot outside of React components.
 */
export const prefetchChatbotUtil = (
  queryClient: ReturnType<typeof useQueryClient>,
  workspaceId: string,
  chatbotId: string
) => {
  if (!workspaceId || !chatbotId) return Promise.resolve();

  return queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_CHATBOT, workspaceId, chatbotId],
    queryFn: () => getChatbot(workspaceId, chatbotId),
    ...CHATBOT_CACHE_CONFIG,
  });
};

