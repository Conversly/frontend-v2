import { useWorkspace, useMaybeWorkspace } from '@/contexts/workspace-context';
import { useEntitlements, useSuspenseEntitlements } from './useEntitlements';
import { useSubscription } from '@/contexts/subscription-context';

export function useAccessControl(workspaceId: string) {
    const { capabilities } = useWorkspace();
    const { data: entitlements, isLoading: isEntitlementsLoading } = useEntitlements(workspaceId);
    const { accountStatus, isLoading: isSubscriptionLoading } = useSubscription();

    const isLoading = isEntitlementsLoading || isSubscriptionLoading;

    // Active status generally implies TRIAL or ACTIVE (not PAST_DUE or CANCELED where features are locked)
    const isAccountActive = accountStatus !== 'PAST_DUE' && accountStatus !== 'CANCELED';

    return {
        isLoading,

        actions: {
            canManage: capabilities.canEditChatbot,
            isEnabledOnPlan: !!entitlements?.features?.actions && isAccountActive,
            limit: entitlements?.limits?.actionsNum ?? -1,
        },

        datasources: {
            canManage: capabilities.canEditChatbot,
            isEnabledOnPlan: isAccountActive, // All plans have datasources, they just have different limits
            limit: entitlements?.limits?.datasources ?? -1,
        },

        chatbots: {
            canManage: true, // Typically all admins/owners can create chatbots
            isEnabledOnPlan: isAccountActive,
            limit: entitlements?.limits?.chatbots ?? -1,
        },

        team_members: {
            canManage: capabilities.canManageMembers,
            isEnabledOnPlan: isAccountActive,
            limit: entitlements?.limits?.team_members ?? -1,
        },

        // Extensible for future features (e.g. custom domain, remove branding, etc.)
    };
}

export type Features = keyof Omit<ReturnType<typeof useAccessControl>, "isLoading">;

export interface AccessControlResult {
    isLoading: false;
    actions: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number | boolean;
    };
    datasources: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number | boolean;
    };
    chatbots: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number | boolean;
    };
    team_members: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number | boolean;
    };
}

/**
 * Suspense-enabled hook for access control.
 * Use within a React Suspense boundary - will throw a promise while loading.
 * Note: This still depends on useSubscription from subscription-context which is not suspense-enabled.
 * When SubscriptionProvider is updated to support suspense, this can be fully suspense-enabled.
 */
export function useSuspenseAccessControl(workspaceId: string): AccessControlResult {
    const { capabilities } = useWorkspace();
    const { data: entitlements } = useSuspenseEntitlements(workspaceId);
    const { accountStatus } = useSubscription();

    // Active status generally implies TRIAL or ACTIVE (not PAST_DUE or CANCELED where features are locked)
    const isAccountActive = accountStatus !== 'PAST_DUE' && accountStatus !== 'CANCELED';

    return {
        isLoading: false,

        actions: {
            canManage: capabilities.canEditChatbot,
            isEnabledOnPlan: !!entitlements?.features?.actions && isAccountActive,
            limit: entitlements?.limits?.actionsNum ?? -1,
        },

        datasources: {
            canManage: capabilities.canEditChatbot,
            isEnabledOnPlan: isAccountActive, // All plans have datasources, they just have different limits
            limit: entitlements?.limits?.datasources ?? -1,
        },

        chatbots: {
            canManage: true, // Typically all admins/owners can create chatbots
            isEnabledOnPlan: isAccountActive,
            limit: entitlements?.limits?.chatbots ?? -1,
        },

        team_members: {
            canManage: capabilities.canManageMembers,
            isEnabledOnPlan: isAccountActive,
            limit: entitlements?.limits?.team_members ?? -1,
        },
    };
}

// Default optimistic values - assume user has access until proven otherwise
const defaultOptimisticAccess = {
    canManage: true,
    isEnabledOnPlan: true,
    limit: -1, // -1 typically means unlimited
};

interface OptimisticAccessControlResult {
    isLoading: boolean;
    isOptimistic: boolean;
    actions: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number;
    };
    datasources: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number;
    };
    chatbots: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number;
    };
    team_members: {
        canManage: boolean;
        isEnabledOnPlan: boolean;
        limit: number;
    };
}

/**
 * Optimistic access control hook that shows UI immediately while validating in background.
 * Uses cached data if available, otherwise assumes optimistic defaults.
 * 
 * Best for: UI elements that should render immediately without waiting for validation,
 * with background permission checks that may disable features if needed.
 * 
 * @example
 * ```tsx
 * // Button shows immediately (optimistically enabled)
 * // Gets disabled in background if user lacks permission
 * const { actions, isLoading } = useOptimisticAccessControl(workspaceId);
 * 
 * <Button disabled={!actions.canManage || isLoading}>
 *   Manage Actions
 * </Button>
 * ```
 */
export function useOptimisticAccessControl(workspaceId: string): OptimisticAccessControlResult {
    const workspaceCtx = useMaybeWorkspace();
    const { data: entitlements, isLoading: isEntitlementsLoading } = useEntitlements(workspaceId);
    const { accountStatus, isLoading: isSubscriptionLoading } = useSubscription();

    const isLoading = isEntitlementsLoading || isSubscriptionLoading;

    // Use optimistic defaults if data is not yet loaded
    const capabilities = workspaceCtx?.capabilities;
    const isAccountActive = accountStatus !== 'PAST_DUE' && accountStatus !== 'CANCELED';

    // Build result with optimistic fallbacks
    return {
        isLoading,
        isOptimistic: isLoading, // True when showing optimistic values

        actions: {
            canManage: capabilities?.canEditChatbot ?? defaultOptimisticAccess.canManage,
            isEnabledOnPlan: (!!entitlements?.features?.actions && isAccountActive) ?? defaultOptimisticAccess.isEnabledOnPlan,
            limit: entitlements?.limits?.actionsNum ?? defaultOptimisticAccess.limit,
        },

        datasources: {
            canManage: capabilities?.canEditChatbot ?? defaultOptimisticAccess.canManage,
            isEnabledOnPlan: isAccountActive ?? defaultOptimisticAccess.isEnabledOnPlan,
            limit: entitlements?.limits?.datasources ?? defaultOptimisticAccess.limit,
        },

        chatbots: {
            canManage: defaultOptimisticAccess.canManage, // Typically all admins/owners can create chatbots
            isEnabledOnPlan: isAccountActive ?? defaultOptimisticAccess.isEnabledOnPlan,
            limit: entitlements?.limits?.chatbots ?? defaultOptimisticAccess.limit,
        },

        team_members: {
            canManage: capabilities?.canManageMembers ?? defaultOptimisticAccess.canManage,
            isEnabledOnPlan: isAccountActive ?? defaultOptimisticAccess.isEnabledOnPlan,
            limit: entitlements?.limits?.team_members ?? defaultOptimisticAccess.limit,
        },
    };
}
