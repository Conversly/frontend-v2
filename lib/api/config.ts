// ─────────────────────────────────────────────────────────────────────────────
// API Mode Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * API access modes:
 * - 'ALL': Available in both DEV and LIVE modes (read operations)
 * - 'DEV_ONLY': Only available in DEV mode (mutating operations)
 */
export type ApiMode = 'ALL' | 'DEV_ONLY';

/**
 * Endpoint definition with mode metadata.
 * Each endpoint specifies its path and which modes it's accessible in.
 */
export interface ApiEndpoint {
  path: () => string;
  mode: ApiMode;
}

/**
 * Helper to create an endpoint that's available in all modes (read operations)
 */
const allMode = (path: () => string): ApiEndpoint => ({ path, mode: 'ALL' });

/**
 * Helper to create an endpoint that's only available in DEV mode (mutations)
 */
const devMode = (path: () => string): ApiEndpoint => ({ path, mode: 'DEV_ONLY' });

// ─────────────────────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1",
  RESPONSE_BASE_URL: process.env.NEXT_PUBLIC_RESPONSE_API_BASE_URL,
  ENDPOINTS: {
    USER: {
      BASE_URL: () => "/user",
      GET_USER: allMode(() => "/me"),
    },
    AUTH: {
      BASE_URL: () => "/auth",
      LOGOUT: allMode(() => "/logout"),
      GOOGLE_OAUTH: allMode(() => "/google-oauth"),
      SYSTEM_TIME: allMode(() => "/system-time"),
      EMAIL_REGISTER: allMode(() => '/register'),
      EMAIL_LOGIN: allMode(() => '/login'),
      VERIFY_EMAIL: allMode(() => '/verify-email'),
    },
    CHATBOT: {
      BASE_URL: () => "/chatbot",
      CREATE: allMode(() => "/create"),
      GET_CHATBOT: allMode(() => "/:chatbotId"),
      GET_CHATBOTS: allMode(() => "/"),
      CREATE_TOPIC: allMode(() => "/topics"),
      UPDATE_TOPIC: devMode(() => "/topics"),
      DELETE_TOPIC: devMode(() => "/topics/:id"),
      GET_TOPIC: allMode(() => "/topics/:id"),
      GET_TOPICS: allMode(() => "/:chatbotId/topics"),
    },
    DATA_SOURCE: {
      BASE_URL: () => "/datasource",
      PROCESS: devMode(() => "/process"),
      ADD_CITATION: devMode(() => "/citation"),
      EMBEDDINGS: allMode(() => "/embeddings/:dataSourceId"),
      DELETE_KNOWLEDGE: devMode(() => "/knowledge"),
      GET_DATA_SOURCES: allMode(() => "/:chatbotId"),
    },
    ANALYTICS: {
      BASE_URL: () => "/analytics",
      GET_ANALYTICS: allMode(() => "/:chatbotId"),
      GET_SUMMARY: allMode(() => "/analytics/summary"),
      GET_CHARTS: allMode(() => "/analytics/charts"),
      GET_FEEDBACKS: allMode(() => "/analytics/feedbacks"),
      GET_TOPIC_BAR_CHART: allMode(() => "/analytics/topics/bar-chart"),
      GET_TOPIC_PIE_CHART: allMode(() => "/analytics/topics/pie-chart"),
    },
    ACTIVITY: {
      BASE_URL: () => "/activity",
      GET_CHATLOGS: allMode(() => "/chatlogs"),
      GET_MESSAGES: allMode(() => "/messages"),
    },
    DEPLOY: {
      BASE_URL: () => "/deploy",
      WIDGET: allMode(() => "/widget/config"),
      UPDATE_CHATBOT_WIDGET: devMode(() => "/widget"),
      GET_DOMAIN_ALLOWLIST: allMode(() => "/widget/domains"),
      UPDATE_DOMAIN_ALLOWLIST: devMode(() => "/widget/domains"),
      GET_API_KEY: allMode(() => "/key"),
      CREATE_API_KEY: devMode(() => "/key"),
    },

    RESPONSE: {
      BASE_URL: () => "/",
      RESPONSE: allMode(() => "/response"),
      PLAYGROUND: allMode(() => "/playground/response"),
      FEEDBACK: allMode(() => "/feedback"),
    },
    SETUP: {
      BASE_URL: () => "/setup",
      FETCH_SITEMAP: allMode(() => "/sitemap"),
      ANALYZE_IMAGE: allMode(() => "/analyze-image"),
      INFER_PROMPT: allMode(() => "/infer-prompt"),
      SEARCH_SOURCES: allMode(() => "/search-sources"),
      TOPIC: allMode(() => "/topic"),
      WIDGET_CONFIG: allMode(() => "/widget-config"),
    },
    WHATSAPP: {
      BASE_URL: () => "/whatsapp",
      CREATE_INTEGRATION: devMode(() => "/"),
      UPDATE_INTEGRATION: devMode(() => "/"),
      GET_INTEGRATION: allMode(() => "/"),
      DELETE_INTEGRATION: devMode(() => "/"),
      GET_DEFAULT_TEMPLATES: allMode(() => "/templates/defaults"),
      CREATE_DEFAULT_TEMPLATE: devMode(() => "/templates/default"),
      UPDATE_TEMPLATE: devMode(() => "/templates/:id"),
      GET_TEMPLATES: allMode(() => "/templates"),
      SYNC_TEMPLATES: devMode(() => "/templates/sync"),
      CREATE_TEMPLATE: devMode(() => "/templates"),
      DELETE_TEMPLATE: devMode(() => "/templates/:id"),
      SEND_MESSAGE: devMode(() => "/send"),
      GET_CHATS: allMode(() => "/chats/:chatbotId/:whatsappId"),
      GET_CONTACT_MESSAGES: allMode(() => "/chats/:chatbotId/:whatsappId/:contactId"),
      ADD_CONTACT: devMode(() => "/contacts/:chatbotId/:whatsappId"),
      GET_ANALYTICS: allMode(() => "/analytics/:chatbotId/:whatsappId"),
      GET_ANALYTICS_PER_DAY: allMode(() => "/analytics/per-day/:chatbotId/:whatsappId"),
      SEND_TEMPLATE: devMode(() => "/send-template"),
      TOGGLE_INTERVENTION: devMode(() => "/intervene"),
      GET_CAMPAIGNS: allMode(() => "/campaigns"),
      CREATE_CAMPAIGN: devMode(() => "/campaigns"),
      LAUNCH_CAMPAIGN: devMode(() => "/campaigns/:id/launch"),
      GET_CAMPAIGN_STATS: allMode(() => "/campaigns/:id/stats"),
      GET_CONTACTS_LIST: allMode(() => "/contacts-list"),
      MARK_MESSAGES_READ: devMode(() => "/messages/read"),
    },
    ACTIONS: {
      BASE_URL: () => "/actions",
      CREATE: devMode(() => "/create"),
      LIST: allMode(() => "/list"),
      GET: allMode(() => "/get"),
      UPDATE: devMode(() => "/update"),
      DELETE: devMode(() => "/delete"),
      TOGGLE: devMode(() => "/toggle"),
      TEST: allMode(() => "/test"),  // Testing is read-like, doesn't persist changes
      TEMPLATES: allMode(() => "/templates"),
    },
    VOICE: {
      BASE_URL: () => "/voice",
      // Assistant Management
      LIST_ASSISTANTS: allMode(() => "/:chatbotId/assistants"),
      CREATE_ASSISTANT: devMode(() => "/assistants"),
      GET_ASSISTANT: allMode(() => "/assistants/:assistantId"),
      UPDATE_ASSISTANT: devMode(() => "/assistants/:assistantId"),
      UPDATE_BEHAVIOR: devMode(() => "/assistants/:assistantId/behavior"),
      UPDATE_PROVIDER: devMode(() => "/assistants/:assistantId/provider"),

      // Token Generation
      GENERATE_TOKEN: devMode(() => "/assistants/:assistantId/token"),

      MAKE_CALL: devMode(() => "/:chatbotId/call"),
    },
    PROMOTE: {
      BASE_URL: () => "/promote",
      GET_PRODUCTS: allMode(() => "/"),
      CREATE_PRODUCT: devMode(() => "/"),
      GET_PRODUCT: allMode(() => "/:id"),
      UPDATE_PRODUCT: devMode(() => "/:id"),
      UPVOTE_PRODUCT: devMode(() => "/:id/upvote"),
      ADD_COMMENT: devMode(() => "/:id/comment"),
      REPLY_COMMENT: devMode(() => "/:id/comment/:commentId/reply"),
      UPVOTE_COMMENT: devMode(() => "/:id/comment/:commentId/upvote"),
      UPLOAD: devMode(() => "/upload"),
      MY_PRODUCTS: allMode(() => "/my-products"),
    },
    PROMPT: {
      BASE_URL: () => "/prompts",
      GENERATE: allMode(() => "/generate"),
      GENERATE_CHANNEL: allMode(() => "/generate/channel"),
      UPDATE_ALL: devMode(() => "/all"),
      UPSERT_CHANNEL: devMode(() => "/channel"),
      DELETE_CHANNEL: devMode(() => "/channel/:id"),
      GET_ALL: allMode(() => "/:chatbotId"),
      GET_CHANNEL: allMode(() => "/:chatbotId/channel/:channel"),
    },
    WAITLIST: {
      BASE_URL: () => "/waitlist",
      JOIN: devMode(() => "/join"),
    },
    INVITES: {
      BASE_URL: () => "/invites",
      CREATE: devMode(() => "/create"),
      LIST_INVITES: allMode(() => "/list"),
      LIST_USERS: allMode(() => "/list/user"),
      CHECK_INVITE: allMode(() => "/check-invite"),
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type ApiResponse<T, U = never> =
  | { success: false; message: string; data: U }
  | { success: true; message: string; data: T };

// ─────────────────────────────────────────────────────────────────────────────
// API Guard Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if an endpoint is accessible in the current mode.
 * Import useBranchStore dynamically to avoid circular dependencies.
 */
export function isEndpointAccessible(endpoint: ApiEndpoint): boolean {
  if (endpoint.mode === 'ALL') return true;

  // Dynamic import to check branch state
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useBranchStore } = require('@/store/branch');
  const activeBranch = useBranchStore.getState().activeBranch;

  return activeBranch === 'DEV';
}

/**
 * Get the path from an endpoint (whether it's the new object format or legacy function).
 * This provides backward compatibility during migration.
 */
export function getEndpointPath(endpoint: ApiEndpoint | (() => string)): string {
  if (typeof endpoint === 'function') {
    return endpoint();
  }
  return endpoint.path();
}

/**
 * Check if an endpoint requires DEV mode.
 */
export function isDevOnly(endpoint: ApiEndpoint): boolean {
  return endpoint.mode === 'DEV_ONLY';
}
