import { useWorkspace } from '@/contexts/workspace-context';
import { useEntitlements } from './useEntitlements';
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
