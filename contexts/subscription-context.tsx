"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useMaybeWorkspace } from "./workspace-context";
import { getWorkspaceSubscription, SubscriptionContextData } from "@/lib/api/subscription";

// Define the shape of the subscription context
// Must match the API response from /api/workspaces/:id/billing

interface SubscriptionContextType extends SubscriptionContextData {
    isLoading: boolean;
    error: string | null;
    refreshSubscription: () => Promise<void>;
}

// Default state to avoid null checks everywhere
const defaultState: SubscriptionContextData = {
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

    const [data, setData] = useState<SubscriptionContextData>(defaultState);
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

            const subscriptionData = await getWorkspaceSubscription(workspaceId);
            setData(subscriptionData);
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
