import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceEntitlements,
  getWorkspaceContext,
  createInvitation,
  getInvitationByToken,
  acceptInvitation,
  listInvitations,
  revokeInvitation,
  removeWorkspaceMember,
  getWorkspaceMembers,
  getWorkspaceBilling,
  getWorkspaceInvoices,
  updateWorkspace,
  deleteWorkspace,
  type CreateWorkspaceInput,
  type CreateInvitationInput,
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
    queryKey: [QUERY_KEY.WORKSPACE_ENTITLEMENTS, workspaceId],
    queryFn: () => getWorkspaceEntitlements(workspaceId!),
    enabled: !!workspaceId,
    staleTime: 60_000, // 1 minute
  });
};

export const useGetWorkspaceContext = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_CONTEXT, workspaceId],
    queryFn: () => getWorkspaceContext(workspaceId!),
    enabled: !!workspaceId,
  });
};

// --- Invitations ---

export const useListInvitations = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_INVITATIONS, workspaceId],
    queryFn: () => listInvitations(workspaceId!),
    enabled: !!workspaceId,
  });
};

export const useCreateInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateInvitationInput) => createInvitation(workspaceId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_INVITATIONS, workspaceId] });
    },
  });
};

export const useGetInvitation = (token: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.INVITATION, token],
    queryFn: () => getInvitationByToken(token!),
    enabled: !!token,
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_WORKSPACES] });
    },
  });
};

export const useRevokeInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) => revokeInvitation(workspaceId, inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_INVITATIONS, workspaceId] });
    },
  });
};

// --- Members ---

export const useGetWorkspaceMembers = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_MEMBERS, workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId!),
    enabled: !!workspaceId,
  });
};

export const useRemoveWorkspaceMember = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => removeWorkspaceMember(workspaceId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_MEMBERS, workspaceId] });
    },
  });
};

// --- Billing ---

export const useGetWorkspaceBilling = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_BILLING, workspaceId],
    queryFn: () => getWorkspaceBilling(workspaceId!),
    enabled: !!workspaceId,
  });
};

export const useGetWorkspaceInvoices = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_INVOICES, workspaceId],
    queryFn: () => getWorkspaceInvoices(workspaceId!),
    enabled: !!workspaceId,
  });
};

// --- Workspace Management ---

export const useUpdateWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => updateWorkspace(workspaceId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_WORKSPACES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_CONTEXT, workspaceId] });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceId: string) => deleteWorkspace(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_WORKSPACES] });
    },
  });
};
