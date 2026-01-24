// ============================================
// API Configuration Types
// ============================================
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type AuthType = 'none' | 'bearer' | 'api_key' | 'basic';
export type TestStatus = 'passed' | 'failed' | 'not_tested' | 'error';

/**
 * Matches backend yup schema keys (camelCase).
 *
 * Note: static query params are stored in `endpoint` querystring.
 */
export interface ApiConfig {
  method: HttpMethod;
  baseUrl: string;
  endpoint: string; // may include querystring, e.g. "/users?limit=10"

  // Static values (never change per request)
  staticHeaders?: Record<string, string>;
  staticBody?: any;

  // Authentication
  authType?: AuthType;
  authValue?: string;
  authHeader?: string;

  // Response handling
  responseMapping?: string;
  successCodes?: number[];

  // Timeouts & retries
  timeoutSeconds?: number;
  retryCount?: number;
  retryOnCodes?: number[];

  // SSL/Redirects
  followRedirects?: boolean;
  verifySsl?: boolean;
}

// Backwards-compatible alias (older UI code uses CustomActionConfig)
export type CustomActionConfig = ApiConfig;

// ============================================
// Tool Parameter Types
// ============================================
export type ParamType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
export type ParamLocation = 'path' | 'query' | 'header' | 'body';

// Backwards-compatible aliases (older UI code uses ParameterType/ParameterLocation)
export type ParameterType = ParamType;
export type ParameterLocation = ParamLocation;

export interface ToolParameter {
  name: string;
  type: ParamType;
  description: string;
  required: boolean;
  default?: any;
  enum?: string[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;

  // Binding (required by backend schema)
  location: ParamLocation;

  // For query/header params
  key?: string;

  // For body params only
  bodyPath?: string;

  // For array/object types
  items?: { type: ParamType };
  properties?: Record<string, { type: ParamType; description?: string }>;
}

// Canonical name (matches backend)
export type ActionParameter = ToolParameter;

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
  apiConfig: ApiConfig;
  parameters: ToolParameter[];
  triggerExamples?: string[]; // UI-only (not sent to backend create/update)
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
  description: string;
  apiConfig: ApiConfig;
  parameters: ToolParameter[];
}

export interface UpdateCustomActionInput {
  chatbotId: string;
  actionId: string;
  name?: string;
  description?: string;
  apiConfig?: ApiConfig;
  parameters?: ToolParameter[];
}

export interface TestActionInput {
  chatbotId: string;
  apiConfig: ApiConfig;
  parameters: ToolParameter[];
  testArgs?: Record<string, any>;
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
  apiConfig: ApiConfig;
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



