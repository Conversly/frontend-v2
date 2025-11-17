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

export interface WhatsAppContact {
  id: string;
  phoneNumber: string;
  displayName?: string;
  userMetadata?: any;
}

export interface WhatsAppMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant' | 'agent';
  timestamp: Date | string;
  metadata?: any;
  channelMessageMetadata?: {
    messageId?: string;
    status?: 'sent' | 'delivered' | 'read' | 'failed';
    waId?: string;
    from?: string;
    timestamp?: string;
    [key: string]: any;
  };
}

export const getWhatsAppChats = async (
  chatbotId: string,
  whatsappId: string
): Promise<WhatsAppContact[]> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.GET_CHATS()
    .replace(':chatbotId', chatbotId)
    .replace(':whatsappId', whatsappId);
  
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "GET",
    },
  ).then((res) => res.data) as ApiResponse<{ success: boolean; data: WhatsAppContact[] }, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data.data || [];
};

export const getWhatsAppContactMessages = async (
  chatbotId: string,
  whatsappId: string,
  contactId: string
): Promise<WhatsAppMessage[]> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.GET_CONTACT_MESSAGES()
    .replace(':chatbotId', chatbotId)
    .replace(':whatsappId', whatsappId)
    .replace(':contactId', contactId);
  
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "GET",
    },
  ).then((res) => res.data) as ApiResponse<{ success: boolean; data: WhatsAppMessage[] }, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data.data || [];
};

export interface AddWhatsAppContactInput {
  phoneNumber: string;
  displayName?: string;
}

export const addWhatsAppContact = async (
  chatbotId: string,
  whatsappId: string,
  input: AddWhatsAppContactInput
): Promise<WhatsAppContact> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.ADD_CONTACT()
    .replace(':chatbotId', chatbotId)
    .replace(':whatsappId', whatsappId);
  
  // Ensure phoneNumber contains only digits (remove any non-digit characters)
  const cleanPhoneNumber = String(input.phoneNumber).replace(/[^0-9]/g, '');
  
  // Validate phoneNumber is digits only
  if (!/^[0-9]+$/.test(cleanPhoneNumber)) {
    throw new Error('Phone number must contain only digits');
  }
  
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "POST",
      data: {
        ...input,
        phoneNumber: cleanPhoneNumber, // Send cleaned phone number
      },
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppContact, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export interface WhatsAppAnalytics {
  totalMessages: number;
  totalContacts: number;
  activeConversations: number;
  userMessages: number;
  aiResponses: number;
  agentResponses: number;
  uniqueWhatsappConversations: number;
  uniqueContacts: number;
}

export interface WhatsAppAnalyticsPerDay {
  date: string;
  userMessages: number;
  aiResponses: number;
  agentResponses: number;
  uniqueWhatsappConversations: number;
  uniqueContacts: number;
}

export const getWhatsAppAnalytics = async (
  chatbotId: string,
  whatsappId: string
): Promise<WhatsAppAnalytics> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.GET_ANALYTICS()
    .replace(':chatbotId', chatbotId)
    .replace(':whatsappId', whatsappId);
  
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "GET",
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppAnalytics, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const getWhatsAppAnalyticsPerDay = async (
  chatbotId: string,
  whatsappId: string,
  days: number = 30
): Promise<WhatsAppAnalyticsPerDay[]> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.GET_ANALYTICS_PER_DAY()
    .replace(':chatbotId', chatbotId)
    .replace(':whatsappId', whatsappId);
  
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "GET",
      params: { days },
    },
  ).then((res) => res.data) as ApiResponse<{ success: boolean; data: WhatsAppAnalyticsPerDay[] }, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data.data || [];
};

