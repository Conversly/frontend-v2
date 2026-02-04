import type { FeedbackType, MessageType } from "@/types/activity";

export interface WhatsAppContactMessageItem {
  id: string;
  type: MessageType;
  content: string;
  createdAt: Date;
  citations: string[];
  feedback: FeedbackType;
  feedbackComment: string | null;
  // WhatsApp-specific metadata stored on the message
  metadata: unknown;
}

export interface GetWhatsAppContactMessagesResponse {
  success: boolean;
  data: WhatsAppContactMessageItem[];
}

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
  userMetadata?: any; // Back-compat (older schema)
}

export interface GetWhatsAppChatsResponse {
  success: boolean;
  data: WhatsAppContact[];
}
