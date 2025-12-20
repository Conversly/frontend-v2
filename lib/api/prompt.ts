import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
  ChannelType,
  GeneratePromptInput,
  UpsertChannelPromptInput,
  UpdateAllChannelsInput,
  GenerateChannelPromptInput,
  ChannelPromptResponse,
  AllPromptsResponse,
  GeneratedPromptResponse,
  DeletePromptResponse,
} from "@/types/prompt";

/**
 * Get all prompts for a chatbot (all channel prompts)
 */
export const getAllPrompts = async (chatbotId: string): Promise<AllPromptsResponse> => {
  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + 
    API.ENDPOINTS.PROMPT.GET_ALL().replace(":chatbotId", chatbotId);
  
  const res = await fetch(endpoint, {
    method: "GET",
  }).then((res) => res.data) as ApiResponse<AllPromptsResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Get specific channel prompt
 */
export const getChannelPrompt = async (
  chatbotId: string,
  channel: ChannelType
): Promise<ChannelPromptResponse> => {
  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + 
    API.ENDPOINTS.PROMPT.GET_CHANNEL()
      .replace(":chatbotId", chatbotId)
      .replace(":channel", channel);
  
  const res = await fetch(endpoint, {
    method: "GET",
  }).then((res) => res.data) as ApiResponse<ChannelPromptResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Generate prompt from scratch using AI (returns prompt, doesn't save)
 * Uses BASE_PROMPT_GENERATOR for fresh prompt generation
 * chatbotId and channel are optional - only needed if you want channel-specific context
 */
export const generatePrompt = async (
  input: GeneratePromptInput
): Promise<GeneratedPromptResponse> => {
  const params = new URLSearchParams();
  if (input.chatbotId) params.append("chatbotId", input.chatbotId);
  if (input.channel) params.append("channel", input.channel);
  params.append("businessDescription", input.businessDescription);
  if (input.tone) params.append("tone", input.tone);
  if (input.targetAudience) params.append("targetAudience", input.targetAudience);

  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + 
    API.ENDPOINTS.PROMPT.GENERATE() + `?${params.toString()}`;
  
  const res = await fetch(endpoint, {
    method: "GET",
  }).then((res) => res.data) as ApiResponse<GeneratedPromptResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Modify channel prompt based on user description (AI generation)
 */
export const generateChannelPrompt = async (
  input: GenerateChannelPromptInput
): Promise<GeneratedPromptResponse> => {
  const params = new URLSearchParams();
  params.append("chatbotId", input.chatbotId);
  params.append("channel", input.channel);
  params.append("userDescription", input.userDescription);

  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + 
    API.ENDPOINTS.PROMPT.GENERATE_CHANNEL() + `?${params.toString()}`;
  
  const res = await fetch(endpoint, {
    method: "GET",
  }).then((res) => res.data) as ApiResponse<GeneratedPromptResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Update all channel prompts at once (sync all channels)
 */
export const updateAllChannels = async (
  input: UpdateAllChannelsInput
): Promise<ChannelPromptResponse[]> => {
  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + API.ENDPOINTS.PROMPT.UPDATE_ALL();
  
  const res = await fetch(endpoint, {
    method: "PUT",
    data: input,
  }).then((res) => res.data) as ApiResponse<ChannelPromptResponse[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Upsert channel prompt (create or update single channel)
 */
export const upsertChannelPrompt = async (
  input: UpsertChannelPromptInput
): Promise<ChannelPromptResponse> => {
  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + API.ENDPOINTS.PROMPT.UPSERT_CHANNEL();
  
  const res = await fetch(endpoint, {
    method: "POST",
    data: input,
  }).then((res) => res.data) as ApiResponse<ChannelPromptResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * Delete channel prompt
 */
export const deleteChannelPrompt = async (id: string): Promise<DeletePromptResponse> => {
  const endpoint = API.ENDPOINTS.PROMPT.BASE_URL() + 
    API.ENDPOINTS.PROMPT.DELETE_CHANNEL().replace(":id", id);
  
  const res = await fetch(endpoint, {
    method: "DELETE",
  }).then((res) => res.data) as ApiResponse<DeletePromptResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

