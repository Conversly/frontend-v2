import { useQuery } from "@tanstack/react-query";
import { getPermissions, UserPermissions } from "@/lib/api/admin";
import { QUERY_KEY } from "@/utils/query-key";
import { useAuth } from "@/store/auth";
import { useWorkspaces } from "./use-workspaces";

export const usePermissions = () => {
  const { user } = useAuth();
  const { activeWorkspaceId } = useWorkspaces();

  const { data: permissions, isLoading, error, isFetching } = useQuery<UserPermissions>({
    queryKey: [QUERY_KEY.PERMISSIONS, activeWorkspaceId],
    queryFn: getPermissions,
    enabled: !!user && !!activeWorkspaceId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  // Determine if we're actually loading (including initial fetch)
  // isLoading is true during initial load, but can be false if query is disabled
  // isFetching is true whenever a fetch is in progress
  const isActuallyLoading = isLoading || (isFetching && !permissions);

  return {
    permissions: permissions || null,
    // Only return true if permissions are loaded AND the value is true
    // Never default to false when permissions haven't loaded yet
    isOwner: permissions ? (permissions.isOwner ?? false) : false,
    isAdmin: permissions ? (permissions.isAdmin ?? false) : false,
    isChatbotAdmin: permissions ? (permissions.isChatbotAdmin ?? false) : false,
    role: permissions?.role ?? null,
    isLoading: isActuallyLoading,
    error,
    // Expose whether permissions have been loaded at least once
    hasLoaded: !!permissions,
  };
};


