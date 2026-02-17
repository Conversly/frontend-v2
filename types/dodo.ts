
export interface CreateCheckoutInput {
    planId: string;
    interval: string; // 'month' | 'year'
    accountId: string;
    workspaceId: string;
}

export interface CreateCheckoutResponse {
    url: string;
}

export interface CreatePortalInput {
    accountId: string;
}

export interface CreatePortalResponse {
    url: string;
}

export interface UsageResponse {
    periodStart: string; // ISO Date string
    periodEnd: string;   // ISO Date string
    usage: {
        usageType: string;
        unit: string;
        totalQuantity: number;
    }[];
    subscriptionStatus: string;
    planName: string;
    creditBalance: number;
    totalCreditsPurchased: number;
    totalCreditsConsumed: number;
}

export interface Plan {
    id: string;
    createAt: Date;
    updatedAt: Date;
    name: string;
    description: string | null;
    monthlyPriceCents: number;
    isActive: boolean;
    creditsPerCycle: number;
    trialCredits: number;
    prices: {
        id: string;
        planId: string;
        amount: number;
        currency: string;
        interval: string;
        isActive: boolean;
        dodoProductId: string;
    }[];
}

export interface EnrollFreeInput {
    planId: string;
    accountId: string;
}
