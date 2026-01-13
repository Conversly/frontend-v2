// for help page chatbot response
import { API } from "@/lib/api/config";
import type { ApiResponse } from "@/lib/api/config";
import type {
    ChatbotResponseRequest,
    ChatbotResponseData,
    FeedbackRequest,
    FeedbackResponse,
    ChatMessage,
} from "@/types/response";
import axios, { type InternalAxiosRequestConfig } from "axios";

// Create a separate axios instance for response API
export const responseFetch = axios.create({
    baseURL: API.RESPONSE_BASE_URL,
    withCredentials: true,
});

responseFetch.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: unknown) => {
        return Promise.reject(error);
    },
);

/**
 * Send a chat query to the chatbot and get a response
 * @param messages - Array of chat messages (conversation history)
 * @param user - User information including uniqueClientId and converslyWebId (API_KEY)
 * @param mode - Response mode (default: "default")
 * @param metadata - Optional metadata like originUrl
 * @returns ChatbotResponseData with response text and citations
 */
export const getChatbotResponse = async (
    messages: ChatMessage[],
    user: ChatbotResponseRequest["user"],
    mode: string = "default",
    metadata?: ChatbotResponseRequest["metadata"],
): Promise<ChatbotResponseData> => {

    // Real API call
    const requestBody: ChatbotResponseRequest = {
        query: JSON.stringify(messages),
        mode,
        user,
        metadata,
    };

    const res = await responseFetch(API.ENDPOINTS.RESPONSE.RESPONSE(), {
        method: "POST",
        data: requestBody,
    }).then((res: any) => res.data as ChatbotResponseData);

    // The backend might return success: false inside the data
    // @ts-ignore
    if (res.success === false) {
        // @ts-ignore
        throw new Error(res.message || "Failed to get chatbot response");
    }

    return res;
};

/**
 * Submit feedback for a chatbot response
 * @param responseId - The responseId from the original chatbot response
 * @param feedback - Either "positive" or "negative"
 * @param comment - Optional comment about the feedback
 * @returns FeedbackResponse with success status
 */
export const submitFeedback = async (
    responseId: string,
    feedback: "like" | "dislike",
    comment?: string,
): Promise<FeedbackResponse> => {

    // Real API call
    const requestBody: FeedbackRequest = {
        responseId: responseId,
        feedback,
        comment,
    };

    const res = await responseFetch(
        API.ENDPOINTS.RESPONSE.FEEDBACK(),
        {
            method: "POST",
            data: requestBody,
        },
    ).then((res: any) => res.data as ApiResponse<FeedbackResponse>);

    if (!res.success) {
        throw new Error(res.message || "Failed to submit feedback");
    }

    return res.data;
};
