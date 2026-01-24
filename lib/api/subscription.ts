import { API, ApiResponse } from "@/lib/api/config";

export interface SubscriptionPlan {
    planId: string;
    planName: string;
    tierType: "FREE" | "PERSONAL" | "PRO" | "ENTERPRISE";
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
    status: "active" | "canceled" | "past_due" | "incomplete";
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
        description: "For personal projects and exploration.",
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
        planId: "pro",
        planName: "Pro",
        tierType: "PRO",
        priceMonthly: "29",
        priceAnnually: "290",
        currency: "usd",
        description: "For professionals and growing businesses.",
        entitlements: {
            maxChatbots: 5,
            maxUsers: 3,
            allowWhatsApp: true,
            allowVoice: true,
            allowAPI: true,
            allowWebhooks: true,
            allowCustomBranding: false,
            prioritySupport: true,
        },
    },
    {
        planId: "enterprise",
        planName: "Enterprise",
        tierType: "ENTERPRISE",
        priceMonthly: "99",
        priceAnnually: "990",
        currency: "usd",
        description: "For large teams with advanced needs.",
        entitlements: {
            maxChatbots: -1, // Unlimited
            maxUsers: -1, // Unlimited
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
    planId: "free",
    planName: "Free",
    status: "active",
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
