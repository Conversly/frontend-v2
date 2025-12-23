import { useQuery } from "@tanstack/react-query";
import { getPermissions, UserPermissions } from "@/lib/api/admin";
import { QUERY_KEY } from "@/utils/query-key";
import { useAuth } from "@/store/auth";
import { useWorkspaces } from "./use-workspaces";

export const usePermissions = () => {
  const { user } = useAuth();
  const { activeWorkspaceId } = useWorkspaces();

  const { data: permissions, isLoading, error } = useQuery<UserPermissions>({
    queryKey: [QUERY_KEY.PERMISSIONS, activeWorkspaceId],
    queryFn: getPermissions,
    enabled: !!user && !!activeWorkspaceId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return {
    permissions: permissions || null,
    isOwner: permissions?.isOwner ?? false,
    isBillingAdmin: permissions?.isBillingAdmin ?? false,
    isChatbotAdmin: permissions?.isChatbotAdmin ?? false,
    role: permissions?.role ?? null,
    isLoading,
    error,
  };
};


