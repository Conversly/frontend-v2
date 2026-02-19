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
        planId: "starter",
        planName: "Starter",
        tierType: "PERSONAL",
        priceMonthly: "39",
        priceAnnually: "468",
        currency: "usd",
        description: "Pay yearly (save 40%) — billed $468 yearly",
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
        planId: "growth",
        planName: "Growth",
        tierType: "PRO",
        priceMonthly: "79",
        priceAnnually: "948",
        currency: "usd",
        description: "Pay yearly (save 40%) — billed $948 yearly",
        entitlements: {
            maxChatbots: 2,
            maxUsers: 4,
            allowWhatsApp: true,
            allowVoice: false,
            allowAPI: true,
            allowWebhooks: false,
            allowCustomBranding: false,
            prioritySupport: false,
        },
    },
    {
        planId: "enterprise",
        planName: "Enterprise",
        tierType: "ENTERPRISE",
        priceMonthly: "Custom",
        priceAnnually: "Custom",
        currency: "usd",
        description: "Custom pricing (volume-based)",
        entitlements: {
            maxChatbots: 10000,
            maxUsers: 10000,
            allowWhatsApp: true,
            allowVoice: true,
            allowAPI: true,
            allowWebhooks: true,
            allowCustomBranding: true,
            prioritySupport: true,
            sla: "99.9%",
        },
    },
];


const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
    planId: "starter",
    planName: "Starter",
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
