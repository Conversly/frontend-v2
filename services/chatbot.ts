import {
  createChatBot,
  getChatbots,
  getChatbot,
  deleteChatbot,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} from "@/lib/api/chatbot";
import type { TopicResponse } from "@/types/chatbot";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetChatbots = () => {
  const isAuthenticated = typeof window !== "undefined" 
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_CHATBOTS],
    queryFn: getChatbots,
    enabled: isAuthenticated, // Only fetch when authenticated
    staleTime: 60_000,
  });
};

export const useChatbot = (chatbotId: string) => {
  const isAuthenticated = typeof window !== "undefined" 
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_CHATBOT, chatbotId],
    queryFn: () => getChatbot(chatbotId),
    enabled: isAuthenticated && !!chatbotId,
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
  
