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
    WORKSPACES: {
      BASE_URL: () => "/workspaces",
      LIST: allMode(() => "/"),
      CREATE: allMode(() => "/"),
      CONTEXT: allMode(() => "/:workspaceId/context"),
      CHATBOTS: allMode(() => "/:workspaceId/chatbots"),
      CHATBOT: allMode(() => "/:workspaceId/chatbots/:botId"),
      INVITATIONS: allMode(() => "/:workspaceId/invitations"),
      INVITATION: allMode(() => "/invitations/:token"),
      ACCEPT_INVITATION: allMode(() => "/invitations/:token/accept"),
      BILLING: allMode(() => "/:workspaceId/billing"),
      INVOICES: allMode(() => "/:workspaceId/billing/invoices"),
    },
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
      DELETE_TOPIC: devMode(() => "/topics"),
      GET_TOPIC: allMode(() => "/topics/:id"),
      GET_TOPICS: allMode(() => "/:chatbotId/topics"),
      UPDATE_CHATBOT: devMode(() => "/:id")
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
      GET_DASHBOARD: allMode(() => "/analytics/dashboard"),
      GET_TOPIC_BAR_CHART: allMode(() => "/analytics/topics/bar-chart"),
      GET_TOPIC_PIE_CHART: allMode(() => "/analytics/topics/pie-chart"),
    },
    ACTIVITY: {
      BASE_URL: () => "/activity",
      // New conversationId-based Activity API (agent dashboard)
      LIST_CONVERSATIONS: allMode(() => "/conversations"),
      GET_CONVERSATION_MESSAGES: allMode(() => "/conversations/:conversationId/messages"),
      CLOSE_CONVERSATION: allMode(() => "/conversations/:conversationId/close"),

      LIST_ESCALATIONS: allMode(() => "/escalations"),
      GET_ESCALATION: allMode(() => "/escalations/:escalationId"),
      MARK_ESCALATION_READ: allMode(() => "/escalations/:escalationId/read"),
    },
    DEPLOY: {
      BASE_URL: () => "/deploy",
      WIDGET: allMode(() => "/widget/config"),
      UPDATE_CHATBOT_WIDGET: devMode(() => "/widget"),
      GET_DOMAIN_ALLOWLIST: allMode(() => "/widget/domains"),
      UPDATE_DOMAIN_ALLOWLIST: devMode(() => "/widget/domains"),
      GET_API_KEY: allMode(() => "/key"),
      CREATE_API_KEY: devMode(() => "/key"),
      DEPLOY: devMode(() => "/:chatbotId/deploy"),
      ROLLBACK: devMode(() => "/:chatbotId/rollback-dev"),
      DEPLOY_STATUS: allMode(() => "/:chatbotId/deploy-status"),
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

      // Templates
      GET_TEMPLATES: allMode(() => "/template"),
      GET_TEMPLATE: allMode(() => "/template/:id"),
      CREATE_TEMPLATE: devMode(() => "/template"),
      UPDATE_TEMPLATE: devMode(() => "/template/:id"),
      DELETE_TEMPLATE: devMode(() => "/template/:id"),
      GENERATE_TEMPLATE: devMode(() => "/template/generate"),
      SYNC_TEMPLATES: devMode(() => "/template/sync"),
      SEND_TEMPLATE: devMode(() => "/send-template"),

      // Contacts
      GET_CONTACTS: allMode(() => "/contacts"),
      GET_CONTACT: allMode(() => "/contacts/:id"),
      CREATE_CONTACT: devMode(() => "/contacts"),
      UPDATE_CONTACT: devMode(() => "/contacts/:id"),
      DELETE_CONTACT: devMode(() => "/contacts/:id"),
      BULK_IMPORT_CONTACTS: devMode(() => "/contacts/bulk-contacts"),

      // Existing others
      SEND_MESSAGE: devMode(() => "/send"),
      GET_CHATS: allMode(() => "/chats/:chatbotId/:whatsappId"),
      GET_CONTACT_MESSAGES: allMode(() => "/chats/:chatbotId/:whatsappId/:contactId"),
      ADD_CONTACT: devMode(() => "/contacts/:chatbotId/:whatsappId"), // Keep for backward compat if needed, or remove if replaced
      GET_ANALYTICS: allMode(() => "/analytics/:chatbotId/:whatsappId"),
      GET_ANALYTICS_PER_DAY: allMode(() => "/analytics/per-day/:chatbotId/:whatsappId"),
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
    LEADS: {
      BASE_URL: () => "/leads",
      CREATE: allMode(() => "/"),   //POST
      GET_LEADS: allMode(() => "/"), //GET
    },
    LEAD_FORMS: {
      BASE_URL: () => "/lead-forms",
      GET_CONFIG: allMode(() => "/:chatbotId"),
      UPSERT: devMode(() => "/"),
      SUBMIT: allMode(() => "/submit"),
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// WebSocket Configuration
// ─────────────────────────────────────────────────────────────────────────────
//
// Backend expects: ws(s)://<SOCKET_SERVER_HOST>/terminal?client_type=<widget|agent>
//
// We treat NEXT_PUBLIC_WS_URL as the base host (no trailing slash), e.g.
// - wss://terminal.apps.verlyai.xyz
// - ws://localhost:3002
//
// If you instead set NEXT_PUBLIC_WS_URL to include "/terminal", this also works.
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "";

export function buildWsUrl(clientType: "widget" | "agent"): string {
  const base = WS_BASE_URL.replace(/\/$/, "");
  if (!base) return "";

  const hasTerminal = /\/terminal$/.test(base);
  const terminalUrl = hasTerminal ? base : `${base}/terminal`;

  // NOTE: server currently expects only client_type in querystring.
  return `${terminalUrl}?client_type=${encodeURIComponent(clientType)}`;
}

// Back-compat export used by the existing socket store.
// Default is `agent` since this is the dashboard app.
export const WS_URL = buildWsUrl("agent");

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
 *
 * IMPORTANT:
 * - This file must be safe to import in SSR.
 * - `@/store/branch` is a `'use client'` module that touches `localStorage`, so it
 *   must never be imported on the server.
 *
 * We therefore lazily read branch state only in the browser via `import()`.
 */
export async function isEndpointAccessible(endpoint: ApiEndpoint): Promise<boolean> {
  if (endpoint.mode === "ALL") return true;

  // On the server, never attempt to import client-only state. Default to allowing.
  // (Server shouldn't be using these UI guards anyway.)
  if (typeof window === "undefined") return true;

  try {
    const mod = await import("@/store/branch");
    const activeBranch = mod.useBranchStore.getState().activeBranch;
    return activeBranch === "DEV";
  } catch {
    // Fail-open: don't break the app if branch store can't be loaded for any reason.
    return true;
  }
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
