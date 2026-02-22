import { API, ApiResponse } from "@/lib/api/config";

export interface SubscriptionPlan {
    planId: string;
    planName: string;
    tierType: "FREE" | "HOBBY" | "STANDARD" | "PRO";
    priceMonthly: string;
    priceAnnually: string;
    currency: string;
    description: string;
    entitlements: {
        maxChatbots: number;
        maxUsers: number;
        allowWhatsApp: boolean;
        allowVoice: boolean;
        allowAPI: boolean;
        allowWebhooks: boolean;
        allowCustomBranding: boolean;
        prioritySupport: boolean;
        sla?: string;
    };
}

export interface CurrentSubscription {
    planId: string;
    planName: string;
    status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "INCOMPLETE" | "TRIAL" | "UNPAID" | "INCOMPLETE_EXPIRED";
    currentPeriodEnd: string;
    usage: {
        chatbots: number;
        users: number;
    };
    entitlements: SubscriptionPlan["entitlements"];
}

// Mock Data
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
