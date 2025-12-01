export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1",
  RESPONSE_BASE_URL: process.env.NEXT_PUBLIC_RESPONSE_API_BASE_URL,
  ENDPOINTS: {
    USER: {
      BASE_URL: () => "/user",
      GET_USER: () => "/me",  // get
    },
    AUTH: {
      BASE_URL: () => "/auth",
      LOGOUT: () => "/logout",  // post
      GOOGLE_OAUTH: () => "/google-oauth",
      SYSTEM_TIME: () => "/system-time",
      EMAIL_REGISTER: () => '/register',
      EMAIL_LOGIN: () => '/login',
      VERIFY_EMAIL: () => '/verify-email',
    },
    CHATBOT: {
      BASE_URL: () => "/chatbot",
      CREATE: () => "/create",  // post
      GENERATE_INSTRUCTIONS: () => "/generate-prompt",
      EDIT_INSTRUCTIONS: () => "/prompt",  // post
      GET_CHATBOT: () => "/:chatbotId",  // get
      GET_CHATBOTS: () => "/",  // get
      CREATE_TOPIC: () => "/topics",  // post
      UPDATE_TOPIC: () => "/topics",  // patch
      DELETE_TOPIC: () => "/topics/:id",  // delete
      GET_TOPIC: () => "/topics/:id",  // get (single topic by topic ID)
      GET_TOPICS: () => "/:chatbotId/topics",  // get (all topics for a chatbot)

    },
    DATA_SOURCE: {
      BASE_URL: () => "/datasource",
      PROCESS: () => "/process",  // post
      ADD_CITATION: () => "/citation",   // put
      EMBEDDINGS: () => "/embeddings/:dataSourceId", // get
      DELETE_KNOWLEDGE: () => "/knowledge",  // delete
      GET_DATA_SOURCES: () => "/:chatbotId",  // get
    },
    ANALYTICS: {
      BASE_URL: () => "/analytics",
      GET_ANALYTICS: () => "/:chatbotId",
      GET_SUMMARY: () => "/analytics/summary",
      GET_CHARTS: () => "/analytics/charts",
      GET_FEEDBACKS: () => "/analytics/feedbacks",
      GET_TOPIC_BAR_CHART: () => "/analytics/topics/bar-chart",
      GET_TOPIC_PIE_CHART: () => "/analytics/topics/pie-chart"
    },
    ACTIVITY: {
      BASE_URL: () => "/activity",
      GET_CHATLOGS: () => "/chatlogs",  // get
      GET_MESSAGES: () => "/messages",  // get
    },
    DEPLOY: {
      BASE_URL: () => "/deploy",
      WIDGET: () => "/widget/config",  // get
      UPDATE_CHATBOT_WIDGET: () => "/widget",  // post
      GET_DOMAIN_ALLOWLIST: () => "/widget/domains",  // get
      UPDATE_DOMAIN_ALLOWLIST: () => "/widget/domains",  // post
      GET_API_KEY: () => "/key",  // get
      CREATE_API_KEY: () => "/key",  // post
    },

    RESPONSE: {
      BASE_URL: () => "/",
      RESPONSE: () => "/response",
      PLAYGROUND: () => "/playground/response",  // get
      FEEDBACK: () => "/feedback",  // post
    },
    SETUP: {
      BASE_URL: () => "/setup",
      FETCH_SITEMAP: () => "/sitemap",  // get
      ANALYZE_IMAGE: () => "/analyze-image",  // post
      INFER_PROMPT: () => "/infer-prompt",  // post
      SEARCH_SOURCES: () => "/search-sources",  // post
      TOPIC: () => "/topic",  // post
    },
    WHATSAPP: {
      BASE_URL: () => "/whatsapp",
      CREATE_INTEGRATION: () => "/integration",  // post
      UPDATE_INTEGRATION: () => "/integration",  // patch
      GET_INTEGRATION: () => "/integration",  // get
      DELETE_INTEGRATION: () => "/integration",  // delete
      SEND_MESSAGE: () => "/send",  // post
      GET_CHATS: () => "/chats/:chatbotId/:whatsappId",  // get
      GET_CONTACT_MESSAGES: () => "/chats/:chatbotId/:whatsappId/:contactId",  // get
      ADD_CONTACT: () => "/contacts/:chatbotId/:whatsappId",  // post
      GET_ANALYTICS: () => "/analytics/:chatbotId/:whatsappId",  // get
      GET_ANALYTICS_PER_DAY: () => "/analytics/per-day/:chatbotId/:whatsappId",  // get
    },
    ACTIONS: {
      BASE_URL: () => "/actions",
      CREATE: () => "/create", // post
      LIST: () => "/list", // post
      GET: () => "/get", // post
      UPDATE: () => "/update", // post
      DELETE: () => "/delete", // post
      TOGGLE: () => "/toggle", // post
      TEST: () => "/test", // post
      TEMPLATES: () => "/templates", // get
    },
    VOICE: {
      BASE_URL: () => "/voice",
      GET_CONFIG: () => "/:chatbotId/config",
      UPDATE_CONFIG: () => "/:chatbotId/config",
      DELETE_CONFIG: () => "/:chatbotId/config",
      GET_WIDGET_CONFIG: () => "/:chatbotId/widget-config",
      GET_SESSIONS: () => "/:chatbotId/sessions",
    },
    PROMOTE: {
      BASE_URL: () => "/promote",
      GET_PRODUCTS: () => "/", // get (all products)
      CREATE_PRODUCT: () => "/", // post
      GET_PRODUCT: () => "/:id", // get
      UPDATE_PRODUCT: () => "/:id", // put
      UPVOTE_PRODUCT: () => "/:id/upvote", // post
      ADD_COMMENT: () => "/:id/comment", // post
      REPLY_COMMENT: () => "/:id/comment/:commentId/reply", // post
      UPVOTE_COMMENT: () => "/:id/comment/:commentId/upvote", // post
      UPLOAD: () => "/upload", // post
      MY_PRODUCTS: () => "/my-products", // get
    }
  },
};

export type ApiResponse<T, U = never> =
  | { success: false; message: string; data: U }
  | { success: true; message: string; data: T };
