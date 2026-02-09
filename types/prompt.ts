export type ChannelType = 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'LEAD_GENERATION' | 'ESCALATION';

// Generate prompt input (AI generation - from scratch)
export interface GeneratePromptInput {
  businessDescription: string;
  tone?: string; // e.g., 'professional', 'friendly', 'casual'
  targetAudience?: string;
  type?: ChannelType;
  chatbotId?: string;
  channel?: ChannelType;
}

// Channel prompt types
export interface UpsertChannelPromptInput {
  chatbotId: string;
  channel: ChannelType;
  systemPrompt: string;
}

export interface UpdateAllChannelsInput {
  chatbotId: string;
  systemPrompt: string;
}

export interface GenerateChannelPromptInput {
  chatbotId: string;
  channel: ChannelType;
  userDescription: string; // What the user wants to change/customize
}

export interface DeleteChannelPromptInput {
  id: string;
}

// Response types
export interface ChannelPromptResponse {
  id: string;
  chatbotId: string;
  channel: ChannelType;
  systemPrompt: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AllPromptsResponse {
  channelPrompts: ChannelPromptResponse[];
}

export interface GeneratedPromptResponse {
  systemPrompt: string;
  channel?: ChannelType;
}

export interface DeletePromptResponse {
  success: boolean;
  message?: string;
}

