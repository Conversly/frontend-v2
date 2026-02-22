import { API, ApiResponse } from "@/lib/api/config";
import { api, getPath } from "@/lib/api/axios";
import { SubscriptionPlan, CurrentSubscription } from "@/types/subscription";

export type { SubscriptionPlan, CurrentSubscription };

export interface SubscriptionContextData {
    subscription: {
        status: 'ACTIVE' | 'TRIAL' | 'PAST_DUE' | 'CANCELED' | 'UNPAID' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED';
        planId: string | null;
        planName: string;
        validUntil: string | null;
    };
    credits: {
        balance: number;
        totalPurchased: number;
        totalConsumed: number;
    };
    usage: {
        messagesSent: number;
    };
    accountStatus: string;
}

const MOCK_PLANS: SubscriptionPlan[] = [
    {
        planId: "free",
        planName: "Free",
        tierType: "FREE",
        priceMonthly: "0",
        priceAnnually: "0",
        currency: "usd",
        description: "Free plan",
        entitlements: {
            maxChatbots: 1,
            maxUsers: 1,
            allowWhatsApp: false,
            allowVoice: false,
            allowAPI: false,
            allowWebhooks: false,
            allowCustomBranding: false,
            prioritySupport: false,
        },
    },
    {
        planId: "hobby",
        planName: "Hobby",
        tierType: "HOBBY",
        priceMonthly: "29.99",
        priceAnnually: "359.88",
        currency: "usd",
        description: "Hobby plan",
        entitlements: {
            maxChatbots: 3,
            maxUsers: 2,
            allowWhatsApp: false,
            allowVoice: false,
            allowAPI: false,
            allowWebhooks: false,
            allowCustomBranding: false,
            prioritySupport: false,
        },
    },
];

const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
    planId: "free",
    planName: "Free",
    status: "ACTIVE",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usage: {
        chatbots: 1,
        users: 1,
    },
    entitlements: MOCK_PLANS[0].entitlements,
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PLANS;
};

export const getCurrentSubscription = async (): Promise<CurrentSubscription> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CURRENT_SUBSCRIPTION;
};

export const getWorkspaceSubscription = async (workspaceId: string): Promise<SubscriptionContextData> => {
    const baseUrl = getPath(API.ENDPOINTS.WORKSPACES.BASE_URL);
    const endpointPath = getPath(API.ENDPOINTS.WORKSPACES.BILLING);
    // Combine but avoid double slash if any
    const servicePath = baseUrl.replace(/\/$/, '') + '/' + endpointPath.replace(/^\//, '');

    const finalUrl = servicePath.replace(':workspaceId', workspaceId);

    const response = await api.get<ApiResponse<SubscriptionContextData>>(finalUrl);

    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch subscription');
    }

    return response.data.data;
};

/**
 * Cancel subscription at the end of the current billing period.
 * The user keeps their plan until `currentPeriodEnd`, then it cancels.
 * Calls PATCH /subscription with { cancelAtPeriodEnd: true }.
 */
export const cancelSubscription = async (): Promise<void> => {
    const baseUrl = getPath(API.ENDPOINTS.SUBSCRIPTION.BASE_URL);
    const url = baseUrl; // PATCH /subscription

    const response = await api.patch<ApiResponse<{ message: string }>>(url, {
        cancelAtPeriodEnd: true,
    });

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to cancel subscription");
    }
};

/**
 * Undo a scheduled cancellation — keeps the subscription active past period end.
 * Calls PATCH /subscription with { cancelAtPeriodEnd: false }.
 */
export const resumeSubscription = async (): Promise<void> => {
    const baseUrl = getPath(API.ENDPOINTS.SUBSCRIPTION.BASE_URL);
    const url = baseUrl;

    const response = await api.patch<ApiResponse<{ message: string }>>(url, {
        cancelAtPeriodEnd: false,
    });

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to resume subscription");
    }
};

/**
 * Open the Dodo customer portal for managing payment methods, invoices, and billing.
 * Returns a redirect URL — redirect the user to it.
 */
export const createPortalSession = async (accountId: string): Promise<string> => {
    const baseUrl = getPath(API.ENDPOINTS.DODO.BASE_URL);
    const endpointPath = getPath(API.ENDPOINTS.DODO.PORTAL);
    const url = baseUrl + endpointPath;

    const response = await api.post<ApiResponse<{ url: string }>>(url, { accountId });

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create portal session");
    }

    return response.data.data.url;
};

export const downloadInvoice = async (paymentId: string) => {
    const baseUrl = getPath(API.ENDPOINTS.SUBSCRIPTION.BASE_URL);
    const endpointPath = getPath(API.ENDPOINTS.SUBSCRIPTION.GET_INVOICE_PDF);
    const url = baseUrl + endpointPath.replace(':id', paymentId);

    const response = await api.get(url, {
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `invoice-${paymentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
};
