"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useMaybeWorkspace } from "./workspace-context";
import { getWorkspaceSubscription, SubscriptionContextData } from "@/lib/api/subscription";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
        status: 'TRIAL',
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
    const queryClient = useQueryClient();

    const { data: subscriptionData, isLoading, error } = useQuery({
        queryKey: ['subscription', workspaceId],
        queryFn: async () => {
            if (!workspaceId) return defaultState;
            return getWorkspaceSubscription(workspaceId);
        },
        enabled: !!workspaceId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const refreshSubscription = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ['subscription', workspaceId] });
    }, [queryClient, workspaceId]);

    const value: SubscriptionContextType = {
        ...(subscriptionData || defaultState),
        isLoading: isLoading && !!workspaceId, // Only loading if we are actually fetching
        error: error ? (error as Error).message : null,
        refreshSubscription,
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
