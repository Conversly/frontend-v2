/** Maps to the ChatbotStatus DB enum: DRAFT → TRAINING → ACTIVE | INACTIVE */
export type ChatbotStatus = 'DRAFT' | 'TRAINING' | 'ACTIVE' | 'INACTIVE';

/** Per-step status values for setup wizard tracking */
export type SetupStepStatus = 'not_started' | 'in_progress' | 'completed' | 'processing' | 'failed';
/** Maps step number (as string key) to its status */
export type StepStatuses = Record<string, SetupStepStatus>;

export interface CreateChatbotInput {
  name: string;
  description: string;
  workspaceId?: string;
  websiteUrl?: string;
  useCase?: string;
  /** Defaults to 'DRAFT' when created via the AI setup wizard */
  status?: ChatbotStatus;
}

export interface ChatbotResponse {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  systemPrompt: string; // From WIDGET channel
  status: ChatbotStatus;
  logoUrl?: string | null;
  primaryColor?: string | null;
  leadGenerationEnabled?: boolean;
  escalationEnabled?: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  devVersion: number;
  liveVersion: number;
  deployStatusField: string | null;
  lastDeployedAt: Date | null;
  apiKey: string | null;
  createdBy?: string | null;
  websiteUrl?: string | null;
  useCase?: string | null;

  // Setup wizard progress
  setupCurrentStep: number;
  setupStepStatuses: StepStatuses;
  setupCompletedAt: Date | null;
  version: number;
}

export interface GetChatbotsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date | null;
  status: ChatbotStatus;
  userId: string;
  devVersion: number;
  liveVersion: number;
  deployStatusField: string | null;
  lastDeployedAt: Date | null;
  workspaceId: string;
  logoUrl?: string | null;
  primaryColor?: string | null;
  websiteUrl?: string;
  useCase?: string;
  // Setup wizard progress
  setupCurrentStep: number;
  setupStepStatuses: StepStatuses;
  setupCompletedAt: Date | null;
  // Aggregated metrics
  conversationCount: number;
}


export interface UpdateChatbotInput {
  id: string;
  logoUrl?: string;
  primaryColor?: string;
  status?: ChatbotStatus;
  leadGenerationEnabled?: boolean;
  escalationEnabled?: boolean;
  workspaceId: string;
  // Setup wizard progress
  setupCurrentStep?: number;
  setupStepStatuses?: StepStatuses;
  setupCompletedAt?: Date | null;
  // Optimistic locking
  version?: number;
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

// Behaviour Config types
export type BehaviourSectionType = 'IDENTITY' | 'LEAD_GENERATION' | 'HANDOFF';

export interface BehaviourConfigResponse {
  id: string;
  chatbotId: string;
  section: BehaviourSectionType;
  config: any;
  createdAt: string;
  updatedAt: string;
}