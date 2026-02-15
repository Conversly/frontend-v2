import { API, ApiResponse } from "@/lib/api/config";
import { SubscriptionPlan, CurrentSubscription } from "@/types/subscription";


const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
    planId: "starter",
    planName: "Starter",
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
