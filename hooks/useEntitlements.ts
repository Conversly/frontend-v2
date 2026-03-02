
import { useQuery, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getWorkspaceEntitlements } from '@/lib/api/workspaces';
import type { EntitlementData } from '@/lib/api/workspaces';

// Query key factory for entitlements
export const entitlementsKeys = {
    all: ['workspace'] as const,
    workspace: (workspaceId: string) => [...entitlementsKeys.all, workspaceId] as const,
    entitlements: (workspaceId: string) => [...entitlementsKeys.workspace(workspaceId), 'entitlements'] as const,
};

// Cache configuration for entitlements (change infrequently)
const ENTITLEMENTS_CACHE_CONFIG = {
    staleTime: 10 * 60 * 1000, // 10 minutes - data considered fresh
    gcTime: 30 * 60 * 1000,    // 30 minutes - garbage collection time
};

export const useEntitlements = (workspaceId: string) => {
    return useQuery({
        queryKey: entitlementsKeys.entitlements(workspaceId),
        queryFn: () => getWorkspaceEntitlements(workspaceId),
        enabled: !!workspaceId,
        ...ENTITLEMENTS_CACHE_CONFIG,
    });
};

/**
 * Suspense-enabled hook for fetching workspace entitlements.
 * Use within a React Suspense boundary - will throw a promise while loading.
 */
export const useSuspenseEntitlements = (workspaceId: string) => {
    return useSuspenseQuery<EntitlementData>({
        queryKey: entitlementsKeys.entitlements(workspaceId),
        queryFn: () => getWorkspaceEntitlements(workspaceId),
        ...ENTITLEMENTS_CACHE_CONFIG,
    });
};

/**
 * Hook to prefetch entitlements data.
 * Use for preloading data on hover/navigation before component mounts.
 */
export const usePrefetchEntitlements = () => {
    const queryClient = useQueryClient();

    const prefetchEntitlements = useCallback((workspaceId: string) => {
        if (!workspaceId) return;

        // Only prefetch if not already in cache
        const existingData = queryClient.getQueryData<EntitlementData>(
            entitlementsKeys.entitlements(workspaceId)
        );

        if (!existingData) {
            queryClient.prefetchQuery({
                queryKey: entitlementsKeys.entitlements(workspaceId),
                queryFn: () => getWorkspaceEntitlements(workspaceId),
                ...ENTITLEMENTS_CACHE_CONFIG,
            });
        }
    }, [queryClient]);

    return { prefetchEntitlements };
};

/**
 * Utility to prefetch entitlements outside of React components.
 * Can be used in event handlers for optimal performance.
 */
export const prefetchEntitlementsUtil = (
    queryClient: ReturnType<typeof useQueryClient>,
    workspaceId: string
) => {
    if (!workspaceId) return Promise.resolve();

    return queryClient.prefetchQuery({
        queryKey: entitlementsKeys.entitlements(workspaceId),
        queryFn: () => getWorkspaceEntitlements(workspaceId),
        ...ENTITLEMENTS_CACHE_CONFIG,
    });
};
