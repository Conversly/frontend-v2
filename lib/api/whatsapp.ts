import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import { WhatsAppCredentials, WhatsAppIntegrationResponse } from "@/types/integration";

export interface CreateWhatsAppIntegrationInput {
  chatbotId: string; // UUID
  phoneNumberId: string;
  accessToken: string;
  verifyToken: string;
  webhookSecret?: string; // Facebook App Secret for webhook verification
  businessAccountId?: string;
  webhookUrl?: string;
}

export interface UpdateWhatsAppIntegrationInput {
  phoneNumberId?: string;
  accessToken?: string;
  verifyToken?: string;
  webhookSecret?: string; // Facebook App Secret for webhook verification
  businessAccountId?: string;
  webhookUrl?: string;
}

export interface SendWhatsAppMessageInput {
  to: string;
  message: string;
}

export interface SendWhatsAppMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const createWhatsAppIntegration = async (
  input: CreateWhatsAppIntegrationInput
): Promise<WhatsAppIntegrationResponse> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.CREATE_INTEGRATION(),
    {
      method: "POST",
      data: input,
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppIntegrationResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const updateWhatsAppIntegration = async (
  chatbotId: string, // UUID
  input: UpdateWhatsAppIntegrationInput
): Promise<WhatsAppIntegrationResponse> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.UPDATE_INTEGRATION(),
    {
      method: "PATCH",
      params: { chatbotId },
      data: input,
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppIntegrationResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const getWhatsAppIntegration = async (
  chatbotId: string // UUID
): Promise<WhatsAppIntegrationResponse | null> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.GET_INTEGRATION(),
    {
      method: "GET",
      params: { chatbotId },
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppIntegrationResponse | null, Error>;

  if (!res.success) {
    if (res.message.includes('not found')) {
      return null;
    }
    throw new Error(res.message);
  }
  return res.data;
};

export const deleteWhatsAppIntegration = async (
  chatbotId: string // UUID
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.DELETE_INTEGRATION(),
    {
      method: "DELETE",
      params: { chatbotId },
    },
  ).then((res) => res.data) as ApiResponse<{ success: boolean; message: string }, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const sendWhatsAppMessage = async (
  chatbotId: string, // UUID
  input: SendWhatsAppMessageInput
): Promise<SendWhatsAppMessageResponse> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.SEND_MESSAGE(),
    {
      method: "POST",
      params: { chatbotId },
      data: input,
    },
  ).then((res) => res.data) as ApiResponse<SendWhatsAppMessageResponse, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

