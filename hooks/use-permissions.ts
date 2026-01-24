import { useAuth } from "@/store/auth";
import { useWorkspace } from "@/contexts/workspace-context";

export function usePermissions() {
    const { user } = useAuth();
    const { workspaceRole } = useWorkspace();

    // Check roles against the workspace context
    const isOwner = workspaceRole === 'OWNER';

    return {
        isOwner,
        canManageBilling: isOwner,
        canManageMembers: isOwner,
    };
}
