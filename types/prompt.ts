export type ChannelType = 'WIDGET' | 'WHATSAPP' | 'VOICE';

// Generate prompt input (AI generation)

export interface GeneratePromptInput {
  chatbotId?: string; // Optional for fresh generation (required for channel-specific generation)
  channel?: ChannelType; // Optional for fresh generation
  businessDescription: string;
  tone?: string; // e.g., 'professional', 'friendly', 'casual'
  targetAudience?: string;
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

