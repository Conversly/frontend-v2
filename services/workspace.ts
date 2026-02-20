import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceEntitlements,
  type CreateWorkspaceInput,
} from "@/lib/api/workspaces";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export const useGetWorkspaces = () => {
  const isAuthenticated =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
      : false;

  return useQuery({
    queryKey: [QUERY_KEY.GET_WORKSPACES],
    queryFn: getUserWorkspaces,
    enabled: isAuthenticated,
    staleTime: 60_000, // 1 minute
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_WORKSPACE],
    mutationFn: (input: CreateWorkspaceInput) => createWorkspace(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_WORKSPACES] });
    },
  });
};

/**
 * Fetches the workspace quota limits + current usage.
 * Used to decide whether to gate the "Create new workspace" action.
 */
export const useGetWorkspaceEntitlements = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: ["workspace-entitlements", workspaceId],
    queryFn: () => getWorkspaceEntitlements(workspaceId!),
    enabled: !!workspaceId,
    staleTime: 60_000, // 1 minute
  });
};
