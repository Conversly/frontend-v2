

import { API, ApiResponse } from "@/lib/api/config";
import {
  ChatbotResponseRequest,
  ChatbotResponseData,
  FeedbackRequest,
  FeedbackResponse,
  ChatMessage,
  PlaygroundResponseRequest,
} from "@/types/response";
import axios from "axios";

// Create a separate axios instance for response API
export const responseFetch = axios.create({
  baseURL: API.RESPONSE_BASE_URL,
  withCredentials: true,
});

responseFetch.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Send a chat query to the chatbot and get a response
 * @param messages - Array of chat messages (conversation history)
 * @param user - User information including unique_client_id and conversly_web_id (API_KEY)
 * @param mode - Response mode (default: "default")
 * @param metadata - Optional metadata like origin_url
 * @returns ChatbotResponseData with response text and citations
 */
export const getChatbotResponse = async (
  messages: ChatMessage[],
  user: ChatbotResponseRequest["user"],
  mode: string = "default",
  metadata?: ChatbotResponseRequest["metadata"],
): Promise<ChatbotResponseData> => {
  const requestBody: ChatbotResponseRequest = {
    query: JSON.stringify(messages),
    mode,
    user,
    metadata,
  };

  const res = await responseFetch(API.ENDPOINTS.RESPONSE.BASE_URL(), {
    method: "POST",
    data: requestBody,
  }).then((res) => res.data as ChatbotResponseData);

  if (!res.success) {
    throw new Error("Failed to get chatbot response");
  }

  return res;
};



/**
 * Send a chat query to the chatbot and get a response
 * @param messages - Array of chat messages (conversation history)
 * @param user - User information including unique_client_id and conversly_web_id (API_KEY)
 * @param mode - Response mode (default: "default")
 * @param chatbotId - ID of the chatbot
 * @param systemPrompt - System prompt for the assistant
 * @param temperature - Temperature setting for the model
 * @param model - Model to use for the playground
 * @param metadata - Optional metadata like origin_url
 * @returns ChatbotResponseData with response text and citations
 */
export const getPlaygroundResponse = async (
  messages: ChatMessage[],
  user: PlaygroundResponseRequest["user"],
  mode: string = "default",
  chatbotId: string,
  systemPrompt: string,
  temperature: number,
  model: string,
  metadata?: PlaygroundResponseRequest["metadata"],
): Promise<ChatbotResponseData> => {
  const requestBody: PlaygroundResponseRequest = {
    query: JSON.stringify(messages),
    mode,
    chatbot: {
      chatbotId: chatbotId,
      chatbotSystemPrompt: systemPrompt,
      chatbotModel: model,
      chatbotTemperature: temperature,
    },
    chatbotId: chatbotId,
    user,
    metadata,
  };

  // Use responseFetch instead of base axios instance
  const res = await responseFetch(
    API.ENDPOINTS.RESPONSE.PLAYGROUND.path(),
    {
      method: "POST",
      data: requestBody,
    },
  ).then((res) => res.data as ChatbotResponseData);

  if (!res.success) {
    throw new Error("Failed to get playground response");
  }

  return res;
};




/**
 * Submit feedback for a chatbot response
 * @param responseId - The responseId from the original chatbot response
 * @param feedback - Either "like" or "dislike"
 * @param comment - Optional comment about the feedback
 * @returns FeedbackResponse with success status
 */
export const submitFeedback = async (
  responseId: string,
  feedback: "like" | "dislike",
  comment?: string,
): Promise<FeedbackResponse> => {
  const requestBody: FeedbackRequest = {
    responseId: responseId,
    feedback,
    comment,
  };

  const res = await responseFetch(
    API.ENDPOINTS.RESPONSE.BASE_URL() + API.ENDPOINTS.RESPONSE.FEEDBACK.path(),
    {
      method: "POST",
      data: requestBody,
    },
  ).then((res) => res.data as ApiResponse<FeedbackResponse>);

  if (!res.success) {
    throw new Error(res.message || "Failed to submit feedback");
  }

  return res.data;
};
