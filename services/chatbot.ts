import {
  createChatBot,
  getInstructions,
  getChatbots,
  getChatbot,
  deleteChatbot,
} from "@/lib/api/chatbot";
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

export const useGetInstructions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.GET_INSTRUCTIONS],
    mutationFn: getInstructions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_INSTRUCTIONS] });
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