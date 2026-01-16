export interface CreateChatbotInput {
  name: string;
  description: string;
  workspaceId?: string;
}

export interface ChatbotResponse {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  systemPrompt: string;  // widget channel system prompt
  createdAt: Date | null;
  updatedAt: Date | null;
  apiKey: string | null;
  createdBy?: string | null;
}

export interface GetChatbotsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date | null;
  workspaceId: string;
}

export interface DeleteChatbotInput {
  id: string;
  workspaceId?: string;
}

export interface DeleteChatbotResponse {
  success: boolean;
  message?: string;
}

// Topic types
export interface CreateTopicInput {
  chatbotId: string;
  name: string;
}

export interface TopicResponse {
  id: string;
  chatbotId: string;
  name: string;
  color: string | null;
  createdAt: Date | null;
}

export interface UpdateTopicInput {
  id: string;
  name?: string;
}

export interface DeleteTopicInput {
  id: string;
}

export interface DeleteTopicResponse {
  success: boolean;
  message?: string;
}