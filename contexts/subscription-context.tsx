"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useMaybeWorkspace } from "./workspace-context";

// Define the shape of the subscription context
// Must match the API response from /api/workspaces/:id/billing
interface SubscriptionData {
    subscription: {
        status: 'active' | 'trial' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete';
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

interface SubscriptionContextType extends SubscriptionData {
    isLoading: boolean;
    error: string | null;
    refreshSubscription: () => Promise<void>;
}

// Default state to avoid null checks everywhere
const defaultState: SubscriptionData = {
    subscription: {
        status: 'trial',
        planId: null,
        planName: 'Free',
        validUntil: null,
    },
    credits: {
        balance: 0,
        totalPurchased: 0,
        totalConsumed: 0,
    },
    usage: {
        messagesSent: 0,
    },
    accountStatus: 'TRIAL',
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const workspace = useMaybeWorkspace();
    const workspaceId = workspace?.workspaceId;

    const [data, setData] = useState<SubscriptionData>(defaultState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = useCallback(async () => {
        if (!workspaceId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            // We use the existing billing endpoint which we enriched
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/workspaces/${workspaceId}/billing`, {
                // Assuming auth headers are handled by a global interceptor or cookies
                // If using cookies (credentials: include), ensure it's set
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch subscription: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                setData(result.data);
            } else {
                // Fallback or error if format is unexpected
                console.warn("Unexpected billing API response format", result);
            }
        } catch (err: any) {
            console.error("Error fetching subscription context:", err);
            setError(err.message || "Failed to load subscription data");
        } finally {
            setIsLoading(false);
        }
    }, [workspaceId]);

    // Initial fetch when workspace changes
    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    const value: SubscriptionContextType = {
        ...data,
        isLoading,
        error,
        refreshSubscription: fetchSubscription,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const ctx = useContext(SubscriptionContext);
    if (!ctx) {
        throw new Error("useSubscription must be used within SubscriptionProvider");
    }
    return ctx;
}
