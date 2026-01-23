
// Client types for the Activity API (agent dashboard).
//
// IMPORTANT:
// - Backend returns timestamps as ISO strings, not Date objects.
// - This file intentionally models the HTTP/JSON shapes, not DB schema types.

export type ConversationStatus = "OPEN" | "CLOSED";

// Keep this in sync with backend `MessageChannel` enum.
export type MessageChannel =
  | "WIDGET"
  | "WHATSAPP"
  | "SMS"
  | "EMAIL"
  | "VOICE"
  | (string & {});

// Matches backend `messages.type` (lowercase in the current API).
export type MessageType = "user" | "assistant" | "system" | "tool";

export type EscalationStatus =
  | "REQUESTED"
  | "WAITING_FOR_AGENT"
  | "ASSIGNED"
  | "HUMAN_ACTIVE"
  | "RESOLVED"
  | "TIMED_OUT"
  | "CANCELLED"
  | (string & {});

export const Feedback = {
  None: 0,
  Like: 1,
  Dislike: 2,
  Neutral: 3,
} as const;

export type FeedbackType = (typeof Feedback)[keyof typeof Feedback];

export interface ConversationItem {
  conversationId: string;
  workspaceId: string;
  chatbotId: string;
  channel: MessageChannel;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
  closedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface GetConversationsResponse {
  success: true;
  data: ConversationItem[];
}

export interface ConversationMessageItem {
  id: string;
  type: MessageType;
  content: string;
  createdAt: string;
  citations: unknown[];
  feedback: FeedbackType;
  feedbackComment: string | null;
}

export interface GetConversationMessagesResponse {
  success: true;
  data: ConversationMessageItem[];
}

export interface CloseConversationResponse {
  success: true;
  data: {
    conversationId: string;
    status: "CLOSED";
    closedAt: string;
  };
}

export interface EscalationItem {
  escalationId: string;
  conversationId: string;
  status: EscalationStatus;
  requestedAt: string;
  acceptedAt: string | null;
  resolvedAt: string | null;
  reason: string | null;
  firstNotifiedAt: string | null;
  lastNotifiedAt: string | null;
  agentUserId: string | null;
  assignedAt: string | null;
}

export interface GetEscalationsResponse {
  success: true;
  data: EscalationItem[];
}

export interface GetEscalationResponse {
  success: true;
  data: {
    escalation: EscalationItem;
    conversation: {
      conversationId: string;
      status: ConversationStatus;
      channel: MessageChannel;
      createdAt: string;
      updatedAt: string;
      lastMessageAt: string | null;
      closedAt: string | null;
    };
  };
}
