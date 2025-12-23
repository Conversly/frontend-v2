import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";

// ============================================
// TYPES - Billing Overview (existing)
// ============================================

export type BillingOverview = {
  wallet: { balance: string; currency: string };
  budgets: Array<{
    serviceType: "CHATBOT" | "WHATSAPP" | "VOICE";
    balance: string;
    lowBalanceThreshold: string;
    hardBlocked: boolean;
  }>;
};

// ============================================
// TYPES - Billing Dashboard
// ============================================

export type ServiceType = "CHATBOT" | "WHATSAPP" | "VOICE";
export type TransactionStatus = "PROCESSED" | "ESCALATED" | "PENDING";
export type TrendType = "up" | "down" | "flat";

export type BillingDashboard = {
  credits: {
    total: number;
    available: number;
    currency: string;
    breakdown: {
      chatbot: { used: number; limit: number };
      whatsapp: { used: number; limit: number };
      voice: { used: number; limit: number };
    };
    burnRate: number;
    estimatedDepletionDays: number;
  };
  chatbots?: Array<{
    id: string;
    name: string;
    allocatedCredits: number;
    remainingCredits: number;
    usagePercentage: number;
  }>;
  spendSnapshot: {
    periodDays: number;
    chatbot: {
      totalSpend: number;
      totalConversations: number;
      avgCostPerConv: number;
      percentage: number;
    };
    whatsapp: {
      totalSpend: number;
      windowsBilled: number;
      costPerWindow: number;
      escalationRate: number;
      percentage: number;
    };
    voice: {
      totalSpend: number;
      minutesBilled: number;
      avgDuration: number;
      costPerCall: number;
      percentage: number;
    };
  };
  topCostDrivers: Array<{
    chatbotId: string;
    name: string;
    totalCost: number;
    conversations: number;
    escalationRate: number;
    trend: TrendType;
  }>;
  recentTransactions: Array<{
    id: string;
    date: string;
    service: ServiceType;
    chatbotId: string;
    chatbotName: string;
    userEmail: string;
    tokens: number;
    amount: number;
    status: TransactionStatus;
  }>;
};

// ============================================
// TYPES - Per-Chatbot Analytics
// ============================================

export type ChatbotAnalytics = {
  chatbot: {
    id: string;
    name: string;
  };
  overview: {
    totalSpend: number;
    totalConversations: number;
    estimatedCompletions: number;
    avgTimeToResolution: number;
  };
  spendByService: {
    chatbot: { spend: number; percentage: number };
    whatsapp: { spend: number; percentage: number };
    voice: { spend: number; percentage: number };
  };
  spendTrend: Array<{
    date: string;
    chatbot: number;
    whatsapp: number;
    voice: number;
    burnRate: number;
  }>;
  burnRateTable: Array<{
    date: string;
    userEmail: string;
    tokens: number;
    cost?: number;
    amount?: number;
    service?: ServiceType;
    status?: TransactionStatus;
  }>;
  costBreakdown: Array<{
    status: TransactionStatus;
    count: number;
    totalCost: number;
  }>;
  adminPerformance: Array<{
    date: string;
    adminEmail: string;
    tokens: number;
    cost: number;
    status: TransactionStatus;
  }>;
};

// ============================================
// TYPES - Ledger (transactions history)
// ============================================

export type LedgerTransaction = {
  id: string;
  timestamp: string;
  serviceType: ServiceType;
  chatbotId: string;
  chatbotName: string;
  conversationId?: string;
  userEmail: string;
  tokens: number;
  amount: number;
  status: TransactionStatus;
  description: string;
};

export type LedgerResponse = {
  transactions: LedgerTransaction[];
  nextCursor?: string;
  hasMore: boolean;
};

// ============================================
// TYPES - Pricing Rates
// ============================================

export type PricingRates = {
  chatbot: {
    perToken: number;
    perConversation: number;
    currency: string;
  };
  whatsapp: {
    perWindow: number;
    perMessage: number;
    currency: string;
  };
  voice: {
    perMinute: number;
    perCall: number;
    currency: string;
  };
};

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Get billing overview (wallet + budgets)
 */
export const getBillingOverview = async (): Promise<BillingOverview> => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.OVERVIEW(), {
    method: "GET",
  }).then((r) => r.data) as ApiResponse<BillingOverview>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Get main billing dashboard data
 */
export const getBillingDashboard = async (): Promise<BillingDashboard> => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.DASHBOARD(), {
    method: "GET",
  }).then((r) => r.data) as ApiResponse<BillingDashboard>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Get per-chatbot usage analytics
 */
export const getChatbotAnalytics = async (
  chatbotId: string,
  period: number = 30
): Promise<ChatbotAnalytics> => {
  const res = await fetch(
    API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.ANALYTICS() + `/${chatbotId}?period=${period}`,
    { method: "GET" }
  ).then((r) => r.data) as ApiResponse<ChatbotAnalytics>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Allocate credits to a service budget
 */
export const allocateBudget = async (serviceType: ServiceType, amount: number) => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.ALLOCATE(), {
    method: "POST",
    data: { serviceType, amount },
  }).then((r) => r.data) as ApiResponse<{ newBalance: number; serviceBalance: number }>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Allocate credits to a specific chatbot
 */
export const allocateChatbotCredit = async (chatbotId: string, amount: number) => {
  // TODO: Add backend endpoint for this. Using a hypothetical endpoint for now.
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + `/allocate/chatbot`, {
    method: "POST",
    data: { chatbotId, amount },
  }).then((r) => r.data) as ApiResponse<{ newBalance: number; chatbotBalance: number }>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Get transaction ledger with pagination
 */
export const getLedger = async (params?: {
  limit?: number;
  cursor?: string;
  chatbotId?: string;
  service?: ServiceType;
  startDate?: string;
  endDate?: string;
}): Promise<LedgerResponse> => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.LEDGER(), {
    method: "GET",
    params,
  }).then((r) => r.data) as ApiResponse<LedgerResponse>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Get current pricing rates
 */
export const getPricingRates = async (): Promise<PricingRates> => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.RATES(), {
    method: "GET",
  }).then((r) => r.data) as ApiResponse<PricingRates>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

/**
 * Save auto-recharge settings
 */
export const saveAutoRechargeSettings = async (payload: {
  enabled: boolean;
  mode: "AUTO" | "CONFIRM";
  threshold?: number;
  topupAmount?: number;
  monthlyCap?: number;
}) => {
  const res = await fetch(API.ENDPOINTS.BILLING.BASE_URL() + API.ENDPOINTS.BILLING.AUTO_RECHARGE_SETTINGS(), {
    method: "POST",
    data: payload,
  }).then((r) => r.data) as ApiResponse<unknown>;
  if (!res.success) throw new Error(res.message);
  return res.data;
};

// ============================================
// LEGACY ALIASES (for backward compatibility)
// ============================================

/** @deprecated Use getBillingDashboard instead */
export type BillingAnalytics = BillingDashboard;

/** @deprecated Use getChatbotAnalytics instead */
export type ChatbotBillingAnalytics = ChatbotAnalytics;

/** @deprecated Use getBillingDashboard instead */
export const getBillingAnalytics = getBillingDashboard;

/** @deprecated Use getChatbotAnalytics instead */
export const getChatbotBillingAnalytics = getChatbotAnalytics;

