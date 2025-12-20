import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPrompts,
  getChannelPrompt,
  generatePrompt,
  generateChannelPrompt,
  upsertChannelPrompt,
  updateAllChannels,
  deleteChannelPrompt,
} from "@/lib/api/prompt";
import type {
  ChannelType,
  GeneratePromptInput,
  GenerateChannelPromptInput,
  UpsertChannelPromptInput,
  UpdateAllChannelsInput,
} from "@/types/prompt";
import { QUERY_KEY } from "@/utils/query-key";

// ============================================================================
// Query Hooks
// ============================================================================

/**
 * Fetch all channel prompts for a chatbot
 */
export const useAllPrompts = (chatbotId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.PROMPTS, chatbotId],
    queryFn: () => getAllPrompts(chatbotId),
    enabled: !!chatbotId,
    staleTime: 60_000,
  });
};

/**
 * Fetch specific channel prompt (WIDGET, WHATSAPP, VOICE)
 */
export const useChannelPrompt = (chatbotId: string, channel: ChannelType) => {
  return useQuery({
    queryKey: [QUERY_KEY.PROMPTS, chatbotId, channel],
    queryFn: () => getChannelPrompt(chatbotId, channel),
    enabled: !!chatbotId && !!channel,
    staleTime: 60_000,
  });
};

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * Create or update a single channel prompt
 */
export const useUpsertChannelPrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpsertChannelPromptInput) => upsertChannelPrompt(input),
    onSuccess: (data) => {
      // Invalidate all prompts for this chatbot
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROMPTS, data.chatbotId] });
      // Also invalidate specific channel
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROMPTS, data.chatbotId, data.channel] });
      // Invalidate chatbot query since getChatbot returns widget prompt
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOT, data.chatbotId] });
    },
  });
};

/**
 * Update all channel prompts at once (sync)
 */
export const useUpdateAllChannels = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateAllChannelsInput) => updateAllChannels(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROMPTS, variables.chatbotId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOT, variables.chatbotId] });
    },
  });
};

/**
 * Generate prompt using AI (doesn't save, just returns generated text)
 */
export const useGeneratePrompt = () => {
  return useMutation({
    mutationFn: (input: GeneratePromptInput) => generatePrompt(input),
  });
};

/**
 * Generate/modify channel-specific prompt using AI
 */
export const useGenerateChannelPrompt = () => {
  return useMutation({
    mutationFn: (input: GenerateChannelPromptInput) => generateChannelPrompt(input),
  });
};

/**
 * Delete a channel prompt
 */
export const useDeleteChannelPrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChannelPrompt(id),
    onSuccess: () => {
      // Invalidate all prompt queries - we don't have chatbotId in delete response
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROMPTS] });
    },
  });
};

