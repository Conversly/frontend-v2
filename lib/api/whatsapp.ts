import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import { WhatsAppIntegrationResponse } from "@/types/integration";

export interface CreateWhatsAppIntegrationInput {
  chatbotId: string; // UUID
  phoneNumberId: string;
  phoneNumber: string; // Required - WhatsApp Business phone number in E.164 format
  accessToken: string;
  verifyToken: string;
  webhookSecret?: string; // Facebook App Secret for webhook verification
  businessAccountId: string; // Required - WhatsApp Business Account ID
  webhookUrl?: string;
}

export interface UpdateWhatsAppIntegrationInput {
  phoneNumberId?: string;
  accessToken?: string;
  verifyToken?: string;
  webhookSecret?: string; // Facebook App Secret for webhook verification
  businessAccountId?: string;
  webhookUrl?: string;
  phoneNumber?: string;
}

export interface SendWhatsAppMessageInput {
  to: string;
  type?: 'text' | 'template';
  message?: string;
  template?: {
    name: string;
    language: { code: string };
    components?: Array<{
      type: 'body' | 'header' | 'button';
      parameters?: Array<{
        type: 'text' | 'image' | 'video' | 'document';
        text?: string;
        image?: { link: string };
        video?: { link: string };
        document?: { link: string };
      }>;
    }>;
  };
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
  chatbotId: string, // cuid2
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
  chatbotId: string // cuid2
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
  email?: string;
  channels: string[]; // ['WHATSAPP', etc.]
  metadata: Record<string, any>;
  whatsappUserMetadata: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  userMetadata?: any; // Keeping for backward compatibility if needed, but schema uses metadata/whatsappUserMetadata
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
  ).then((res) => res.data) as ApiResponse<WhatsAppContact[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
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
  ).then((res) => res.data) as ApiResponse<WhatsAppMessage[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};

export interface AddWhatsAppContactInput {
  phoneNumber: string;
  displayName?: string;
  email?: string;
  channels?: string[];
  metadata?: Record<string, any>;
  whatsappUserMetadata?: Record<string, any>;
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
        displayName: input.displayName,
        email: input.email,
        channels: input.channels || ['WHATSAPP'],
        metadata: input.metadata || {},
        whatsappUserMetadata: input.whatsappUserMetadata || {},
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
  ).then((res) => res.data) as ApiResponse<WhatsAppAnalyticsPerDay[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};




export interface WhatsAppTemplate {
  id: string;
  name: string;
  language: string;
  status: string;
  category: string;
  components: any[];
  metaTemplateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppCampaign {
  id: string;
  name: string;
  templateId: string;
  status: 'DRAFT' | 'SCHEDULED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  scheduledAt?: string;
  audienceSize: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  repliedCount: number;
  createdAt: string;
}

export const getWhatsAppTemplates = async (
  chatbotId: string
): Promise<WhatsAppTemplate[]> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.GET_TEMPLATES(),
    {
      method: "GET",
      params: { chatbotId }
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppTemplate[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};

export const syncWhatsAppTemplates = async (
  chatbotId: string
): Promise<WhatsAppTemplate[]> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.SYNC_TEMPLATES(),
    {
      method: "POST",
      data: { chatbotId }
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppTemplate[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};

export const getWhatsAppCampaigns = async (
  chatbotId: string
): Promise<WhatsAppCampaign[]> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.GET_CAMPAIGNS(),
    {
      method: "GET",
      params: { chatbotId }
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppCampaign[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};

export const createWhatsAppCampaign = async (
  chatbotId: string,
  data: { name: string; templateId: string; scheduledAt?: Date }
): Promise<WhatsAppCampaign> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.CREATE_CAMPAIGN(),
    {
      method: "POST",
      data: { chatbotId, ...data }
    }
  ).then((res) => res.data) as ApiResponse<WhatsAppCampaign, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export const launchWhatsAppCampaign = async (
  campaignId: string,
  chatbotId: string,
  contactIds?: string[]
): Promise<any> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.LAUNCH_CAMPAIGN().replace(':id', campaignId);
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "POST",
      data: { chatbotId, contactIds }
    }
  ).then((res) => res.data) as ApiResponse<any, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}




export const getWhatsAppContactsList = async (
  chatbotId: string
): Promise<WhatsAppContact[]> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.GET_CONTACTS_LIST(),
    {
      method: "GET",
      params: { chatbotId }
    },
  ).then((res) => res.data) as ApiResponse<WhatsAppContact[], Error>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data || [];
};

export const createWhatsAppTemplate = async (
  chatbotId: string,
  data: { name: string; category: string; language: string; components: any[] }
): Promise<WhatsAppTemplate> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.CREATE_TEMPLATE(),
    {
      method: "POST",
      data: { chatbotId, ...data }
    }
  ).then((res) => res.data) as ApiResponse<WhatsAppTemplate, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};

export const deleteWhatsAppTemplate = async (
  chatbotId: string,
  templateId: string
): Promise<{ success: boolean; message: string }> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.DELETE_TEMPLATE().replace(':id', templateId);
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "DELETE",
      params: { chatbotId }
    }
  ).then((res) => res.data) as ApiResponse<{ success: boolean; message: string }, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};

export const markWhatsAppMessagesAsRead = async (
  chatbotId: string,
  messageIds: string[]
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.MARK_MESSAGES_READ(),
    {
      method: "POST",
      params: { chatbotId },
      data: { messageIds }
    }
  ).then((res) => res.data) as ApiResponse<{ success: boolean; message: string }, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};

export interface CreateDefaultTemplateParams {
  name: string;
  category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY' | 'TRANSACTIONAL';
  language: string;
  components: any[];
  allowCategoryChange?: boolean;
  saveAsDraft?: boolean;
}

export interface UpdateTemplateParams {
  templateId: string;
  name?: string;
  category?: string;
  language?: string;
  components?: any[];
  allowCategoryChange?: boolean;
}

export const getDefaultWhatsAppTemplates = async (
  chatbotId: string
): Promise<{ all: WhatsAppTemplate[], defaults: WhatsAppTemplate[] }> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.GET_DEFAULT_TEMPLATES(),
    {
      method: "GET",
      params: { chatbotId }
    },
  ).then((res) => res.data) as ApiResponse<{ all: WhatsAppTemplate[], defaults: WhatsAppTemplate[] }, Error>;

  if (!res.success) {
    throw new Error(res.message);
  }

  const { all, defaults } = res.data || { all: [], defaults: [] }; // Handle potential null data

  // Ensure hello_world is present
  const hasHelloWorld = defaults.some(t => t.name === 'hello_world');
  if (!hasHelloWorld) {
    const helloWorldTemplate: WhatsAppTemplate = {
      id: 'hello_world_mock', // Mock ID
      name: 'hello_world',
      status: 'APPROVED',
      category: 'UTILITY',
      language: 'en_US',
      metaTemplateId: 'mock_meta_id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      components: [
        { type: 'HEADER', format: 'TEXT', text: 'Hello World' },
        { type: 'BODY', text: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.' },
        { type: 'FOOTER', text: 'Meta API Team' }
      ]
    };
    defaults.push(helloWorldTemplate);
  }

  return { all, defaults };
};

export const createDefaultWhatsAppTemplate = async (
  chatbotId: string,
  data: CreateDefaultTemplateParams
): Promise<WhatsAppTemplate> => {
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + API.ENDPOINTS.WHATSAPP.CREATE_DEFAULT_TEMPLATE(),
    {
      method: "POST",
      data: { chatbotId, ...data }
    }
  ).then((res) => res.data) as ApiResponse<WhatsAppTemplate, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};

export const updateWhatsAppTemplate = async (
  chatbotId: string,
  params: UpdateTemplateParams
): Promise<WhatsAppTemplate> => {
  const endpoint = API.ENDPOINTS.WHATSAPP.UPDATE_TEMPLATE().replace(':id', params.templateId);
  const res = await fetch(
    API.ENDPOINTS.WHATSAPP.BASE_URL() + endpoint,
    {
      method: "PATCH",
      params: { chatbotId },
      data: {
        name: params.name,
        category: params.category,
        language: params.language,
        components: params.components,
        allowCategoryChange: params.allowCategoryChange
      }
    }
  ).then((res) => res.data) as ApiResponse<WhatsAppTemplate, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
};
