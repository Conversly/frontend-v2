import { API } from './config';
import { ApiResponse } from './config';

export interface SubscriptionPlan {
  planId: string;
  planName: string;
  tierType: 'FREE' | 'PERSONAL' | 'PRO' | 'ENTERPRISE' | null;
  description: string | null;
  isActive: boolean;
  durationInDays: number | null;
  priceMonthly: string;
  priceAnnually: string;
  currency: string;
  entitlements: {
    maxChatbots?: number;
    maxUsers?: number;
    allowWhatsApp?: boolean;
    whatsappLimit?: 'META_FREE' | 'META_PAID' | 'UNLIMITED';
    allowVoice?: boolean;
    voiceMinutesPerMonth?: number;
    allowCustomBranding?: boolean;
    allowAPI?: boolean;
    apiRateLimit?: number;
    allowWebhooks?: boolean;
    maxDataSources?: number;
    maxStorageGB?: number;
    prioritySupport?: boolean;
    sla?: 'NONE' | 'STANDARD' | 'PREMIUM';
  } | null;
  usageBasedPricing: {
    enabled: boolean;
    meters: Array<{
      name: string;
      unitPrice: number;
      includedUnits?: number;
    }>;
  } | null;
  isPublic: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentSubscription {
  id: string;
  accountId: string;
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused';
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialStart: string | null;
  trialEnd: string | null;
  entitlements: SubscriptionPlan['entitlements'];
  usage: {
    chatbots: number;
    users: number;
  };
}

export interface EntitlementCheck {
  allowed: boolean;
  reason?: string;
}

/**
 * Get all available subscription plans
 */
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.GET_PLANS()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subscription plans');
  }

  const data: ApiResponse<SubscriptionPlan[]> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch subscription plans');
  }

  return data.data;
};

/**
 * Get current subscription for the account
 */
export const getCurrentSubscription = async (): Promise<CurrentSubscription | null> => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.GET_CURRENT()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch current subscription');
  }

  const data: ApiResponse<CurrentSubscription | null> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch current subscription');
  }

  return data.data;
};

/**
 * Check entitlements for a specific action
 */
export const checkEntitlements = async (action: string): Promise<EntitlementCheck> => {
  const response = await fetch(
    `${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.CHECK_ENTITLEMENTS()}?action=${encodeURIComponent(action)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to check entitlements');
  }

  const data: ApiResponse<EntitlementCheck> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to check entitlements');
  }

  return data.data;
};

/**
 * Upgrade subscription to a new plan
 */
export const upgradeSubscription = async (
  planId: string,
  billingPeriod: 'monthly' | 'annual' = 'monthly'
): Promise<{ subscriptionId: string }> => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.UPGRADE()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ planId, billingPeriod }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to upgrade subscription');
  }

  const data: ApiResponse<{ subscriptionId: string }> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to upgrade subscription');
  }

  return data.data;
};

/**
 * Purchase a plan (simulated payment)
 */
export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export const purchasePlan = async (
  planId: string,
  billingPeriod: 'monthly' | 'annual' = 'monthly',
  cardDetails: CardDetails
): Promise<{ subscriptionId: string }> => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.PURCHASE()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ planId, billingPeriod, cardDetails }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to purchase plan');
  }

  const data: ApiResponse<{ subscriptionId: string }> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to purchase plan');
  }

  return data.data;
};

