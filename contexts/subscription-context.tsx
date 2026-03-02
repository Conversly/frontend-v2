"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useMaybeWorkspace } from "./workspace-context";
import { getWorkspaceSubscription, SubscriptionContextData } from "@/lib/api/subscription";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

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

// Query key factory for subscription
export const subscriptionKeys = {
    all: ['subscription'] as const,
    workspace: (workspaceId: string | undefined) =>
        workspaceId ? [...subscriptionKeys.all, workspaceId] as const : subscriptionKeys.all,
};

// Cache configuration for subscription (changes infrequently)
const SUBSCRIPTION_CACHE_CONFIG = {
    staleTime: 10 * 60 * 1000, // 10 minutes - data considered fresh
    gcTime: 30 * 60 * 1000,    // 30 minutes - garbage collection time
};

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const workspace = useMaybeWorkspace();
    const workspaceId = workspace?.workspaceId;
    const queryClient = useQueryClient();

    const { data: subscriptionData, isLoading, error } = useQuery({
        queryKey: subscriptionKeys.workspace(workspaceId),
        queryFn: async () => {
            if (!workspaceId) return defaultState;
            return getWorkspaceSubscription(workspaceId);
        },
        enabled: !!workspaceId,
        ...SUBSCRIPTION_CACHE_CONFIG,
    });

    const refreshSubscription = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: subscriptionKeys.workspace(workspaceId) });
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

/**
 * Hook to prefetch subscription data.
 * Use for preloading data on hover/navigation before component mounts.
 */
export const usePrefetchSubscription = () => {
    const queryClient = useQueryClient();
    const workspace = useMaybeWorkspace();
    const workspaceId = workspace?.workspaceId;

    const prefetchSubscription = useCallback(() => {
        if (!workspaceId) return;

        // Only prefetch if not already in cache
        const existingData = queryClient.getQueryData<SubscriptionContextData>(
            subscriptionKeys.workspace(workspaceId)
        );

        if (!existingData) {
            queryClient.prefetchQuery({
                queryKey: subscriptionKeys.workspace(workspaceId),
                queryFn: () => getWorkspaceSubscription(workspaceId),
                ...SUBSCRIPTION_CACHE_CONFIG,
            });
        }
    }, [queryClient, workspaceId]);

    return { prefetchSubscription };
};

/**
 * Utility to prefetch subscription outside of React components.
 * Can be used in event handlers for optimal performance.
 */
export const prefetchSubscriptionUtil = (
    queryClient: ReturnType<typeof useQueryClient>,
    workspaceId: string
) => {
    if (!workspaceId) return Promise.resolve();

    return queryClient.prefetchQuery({
        queryKey: subscriptionKeys.workspace(workspaceId),
        queryFn: () => getWorkspaceSubscription(workspaceId),
        ...SUBSCRIPTION_CACHE_CONFIG,
    });
};

/**
 * Suspense-enabled hook for subscription data.
 * Use within a React Suspense boundary - will throw a promise while loading.
 * Note: This can be used in components that need guaranteed data availability.
 */
export const useSuspenseSubscription = (workspaceId: string) => {
    return useSuspenseQuery<SubscriptionContextData>({
        queryKey: subscriptionKeys.workspace(workspaceId),
        queryFn: () => getWorkspaceSubscription(workspaceId),
        ...SUBSCRIPTION_CACHE_CONFIG,
    });
};
