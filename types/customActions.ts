// ============================================
// API Configuration Types
// ============================================
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type AuthType = 'none' | 'bearer' | 'api_key' | 'basic';
export type TestStatus = 'passed' | 'failed' | 'not_tested';

export interface CustomActionConfig {
  method: HttpMethod;
  baseUrl: string;
  endpoint: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  bodyTemplate?: string;
  responseMapping?: string;
  dataAccess?: 'full' | 'limited';
  successCodes?: number[];
  timeoutSeconds?: number;
  retryCount?: number;
  authType?: AuthType;
  authValue?: string;
  followRedirects?: boolean;
  verifySsl?: boolean;
}

// ============================================
// Tool Parameter Types
// ============================================
export type ParameterType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

export interface ToolParameter {
  name: string;
  type: ParameterType;
  description: string;
  required?: boolean;
  default?: string;
  enum?: string[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
}

export interface ToolSchema {
  type: 'object';
  properties: Record<string, any>;
  required: string[];
}

// ============================================
// Custom Action Types
// ============================================
export interface CustomAction {
  id: string;
  chatbotId: string;
  name: string;
  displayName: string;
  description: string;
  isEnabled: boolean;
  apiConfig: CustomActionConfig;
  parameters: ToolParameter[];
  triggerExamples?: string[]; // "get price of iPhone", "how much does {{product}} cost"
  toolSchema?: ToolSchema;
  version: number;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy?: string | null;
  lastTestedAt: string | null;
  testStatus: TestStatus | null;
  testResult?: Record<string, any> | null;
}

export interface TestResult {
  success: boolean;
  statusCode?: number;
  responseBody?: string;
  responseTime?: number;
  error?: string;
  requestUrl?: string;
  extractedData?: any;
}

// ============================================
// Request/Response Types
// ============================================
export interface CreateCustomActionInput {
  chatbotId: string;
  name: string;
  displayName: string;
  description: string;
  apiConfig: CustomActionConfig;
  parameters: ToolParameter[];
  triggerExamples?: string[];
}

export interface UpdateCustomActionInput {
  chatbotId: string;
  actionId: string;
  name?: string;
  displayName?: string;
  description?: string;
  apiConfig?: CustomActionConfig;
  parameters?: ToolParameter[];
  triggerExamples?: string[];
}

export interface TestActionInput {
  chatbotId: string;
  config: CustomActionConfig;
  testParameters?: Record<string, any>;
}

export interface TestActionResponse {
  success: boolean;
  statusCode?: number;
  responseBody?: string;
  responseTime?: number;
  error?: string;
  requestUrl?: string;
  extractedData?: any;
}

export interface CustomActionResponse {
  id: string;
  chatbotId: string;
  name: string;
  displayName: string;
  description: string;
  isEnabled: boolean;
  apiConfig: CustomActionConfig;
  parameters: ToolParameter[];
  version: number;
  createdAt: string | null;
  updatedAt: string | null;
  lastTestedAt: string | null;
  testStatus: TestStatus | null;
}

export interface ToggleActionInput {
  chatbotId: string;
  actionId: string;
  isEnabled: boolean;
}

// ============================================
// Action Template Types
// ============================================
export interface ActionTemplate {
  id: string;
  name: string;
  category: string;
  displayName: string;
  description: string;
  iconUrl: string | null;
  templateConfig: Record<string, any>;
  requiredFields: string[];
  isPublic: boolean;
  usageCount: number;
  createdAt: string | null;
}

export interface CreateTemplateInput {
  name: string;
  category: string;
  displayName: string;
  description: string;
  iconUrl?: string;
  templateConfig: Record<string, any>;
  requiredFields: string[];
  isPublic?: boolean;
}

// ============================================
// Query Parameters
// ============================================
export interface GetActionsQuery {
  chatbotId: string;
  enabled?: boolean;
}

export interface GetLogsQuery {
  limit?: number;
  onlyFailed?: boolean;
}

export interface GetTemplatesQuery {
  category?: string;
}



