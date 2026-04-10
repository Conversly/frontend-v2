export type McpAuthType = "none" | "bearer" | "api_key";
export type McpConnectionStatus = "not_verified" | "verified" | "failed";
export type McpAccessLevel = "user" | "visitor" | "anonymous";

export interface McpInputBinding {
  parameterName: string;
  source: "contact";
  contactField: string;
}

export interface McpToolConfigInput {
  originalName: string;
  isEnabled?: boolean;
  accessLevel?: McpAccessLevel;
  requiredContactFields?: string[];
  inputBindings?: McpInputBinding[];
}

export interface McpToolSnapshot {
  id: string;
  logicalId: string;
  mcpConnectionId: string;
  originalName: string;
  llmToolName: string;
  description: string;
  inputSchema: Record<string, any>;
  isEnabled: boolean;
  accessLevel: McpAccessLevel;
  requiredContactFields: string[];
  inputBindings: McpInputBinding[];
  suggestedBindings: McpInputBinding[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface McpConnectionSummary {
  id: string;
  chatbotId: string;
  logicalId: string;
  name: string;
  serverUrl: string;
  authType: McpAuthType;
  authHeader?: string | null;
  authValueMasked?: string | null;
  hasAuthValue: boolean;
  isEnabled: boolean;
  connectionStatus: McpConnectionStatus;
  lastVerifiedAt: string | null;
  lastSyncAt: string | null;
  lastError: string | null;
  discoveredToolCount: number;
  enabledToolCount: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface McpConnectionResponse extends McpConnectionSummary {
  tools: McpToolSnapshot[];
}

export interface VerifyMcpConnectionInput {
  chatbotId: string;
  name?: string;
  serverUrl: string;
  authType?: McpAuthType;
  authValue?: string;
  authHeader?: string;
}

export interface VerifyMcpResponse {
  connection: Pick<
    McpConnectionSummary,
    "name" | "serverUrl" | "authType" | "authHeader" | "authValueMasked" | "hasAuthValue"
  >;
  tools: Array<{
    originalName: string;
    description: string;
    inputSchema: Record<string, any>;
    suggestedBindings: McpInputBinding[];
  }>;
}

export interface CreateMcpConnectionInput extends VerifyMcpConnectionInput {
  name: string;
  isEnabled?: boolean;
  tools?: McpToolConfigInput[];
}

export interface UpdateMcpConnectionInput {
  chatbotId: string;
  connectionId: string;
  name?: string;
  serverUrl?: string;
  authType?: McpAuthType;
  authValue?: string;
  authHeader?: string;
  isEnabled?: boolean;
  tools?: McpToolConfigInput[];
}

export interface UpdateMcpToolConfigInput {
  chatbotId: string;
  connectionId: string;
  toolId: string;
  isEnabled?: boolean;
  accessLevel?: McpAccessLevel;
  requiredContactFields?: string[];
  inputBindings?: McpInputBinding[];
}

export interface GetMcpConnectionsQuery {
  chatbotId: string;
}

export interface GetMcpConnectionInput {
  chatbotId: string;
  connectionId: string;
}

export interface DeleteMcpConnectionInput {
  chatbotId: string;
  connectionId: string;
}

export interface ToggleMcpConnectionInput {
  chatbotId: string;
  connectionId: string;
  isEnabled: boolean;
}

export interface McpConnectionFormValues {
  name: string;
  serverUrl: string;
  authType: McpAuthType;
  authValue: string;
  authHeader: string;
  isEnabled: boolean;
  tools: McpToolSnapshot[];
}
