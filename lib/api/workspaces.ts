import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import type { WorkspaceContext } from "@/types/permissions";

export interface UserWorkspaceRow {
  workspaceId: string;
  workspaceName: string;
  accountId: string;
  accountName: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export async function getUserWorkspaces(): Promise<UserWorkspaceRow[]> {
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + API.ENDPOINTS.WORKSPACES.LIST.path(),
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<UserWorkspaceRow[], Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function getWorkspaceContext(workspaceId: string): Promise<WorkspaceContext> {
  const endpoint = API.ENDPOINTS.WORKSPACES.CONTEXT.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<WorkspaceContext, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export interface CreateWorkspaceInput {
  name: string;
}

export interface CreateWorkspaceResponse {
  workspaceId: string;
}

export async function createWorkspace(input: CreateWorkspaceInput): Promise<CreateWorkspaceResponse> {
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + API.ENDPOINTS.WORKSPACES.CREATE.path(),
    {
      method: "POST",
      data: input,
    }
  ).then((r) => r.data)) as ApiResponse<CreateWorkspaceResponse, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

// Invitation types and functions
export interface CreateInvitationInput {
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface InvitationResponse {
  id: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  expiresAt: string;
}

export interface InvitationDetails {
  id: string;
  workspaceId: string;
  workspaceName: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  invitedBy: string;
  inviterName: string;
  inviterEmail: string;
  expiresAt: string;
  status: string;
}

export interface WorkspaceInvitation {
  id: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  status: string;
  invitedBy: string;
  inviterName: string;
  expiresAt: string;
  createdAt: string;
}

export async function createInvitation(
  workspaceId: string,
  input: CreateInvitationInput
): Promise<InvitationResponse> {
  const endpoint = API.ENDPOINTS.WORKSPACES.INVITATIONS.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    {
      method: "POST",
      data: input,
    }
  ).then((r) => r.data)) as ApiResponse<InvitationResponse, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function getInvitationByToken(token: string): Promise<InvitationDetails> {
  const endpoint = API.ENDPOINTS.WORKSPACES.INVITATION.path().replace(":token", token);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<InvitationDetails, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function acceptInvitation(token: string): Promise<{ workspaceId: string; workspaceName: string }> {
  const endpoint = API.ENDPOINTS.WORKSPACES.ACCEPT_INVITATION.path().replace(":token", token);
  try {
    const res = await fetch(
      API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
      { method: "POST" }
    );
    const data = res.data as ApiResponse<{ workspaceId: string; workspaceName: string }, Error>;

    if (!data.success) {
      const error = new Error(data.message) as any;
      error.response = { data };
      throw error;
    }
    return data.data;
  } catch (error: any) {
    // Handle axios errors (HTTP errors)
    if (error.response?.data) {
      const apiError = new Error(error.response.data.message || error.message) as any;
      apiError.response = error.response;
      throw apiError;
    }
    // Handle non-axios errors
    throw error;
  }
}

export async function listInvitations(workspaceId: string): Promise<WorkspaceInvitation[]> {
  const endpoint = API.ENDPOINTS.WORKSPACES.INVITATIONS.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<WorkspaceInvitation[], Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function revokeInvitation(workspaceId: string, inviteId: string): Promise<void> {
  const endpoint = API.ENDPOINTS.WORKSPACES.INVITATIONS.path()
    .replace(":workspaceId", workspaceId)
    .replace(":inviteId", inviteId);

  // Using our fetch wrapper which returns AxiosResponse
  await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint.replace(":inviteId", inviteId),
    { method: "DELETE" }
  );
  // If fetch throws on non-2xx status, it will be caught by caller. 
  // If it doesn't throw, we assume success.
}

export async function removeWorkspaceMember(workspaceId: string, memberId: string): Promise<void> {
  const endpoint = API.ENDPOINTS.WORKSPACES.BASE_URL() + `/${workspaceId}/members/${memberId}`;
  await fetch(
    endpoint,
    { method: "DELETE" }
  );
}


export interface WorkspaceMember {
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  joinedAt: string;
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
}

export async function getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
  const endpoint = API.ENDPOINTS.WORKSPACES.BASE_URL() + `/${workspaceId}/members`;
  const res = (await fetch(
    endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<WorkspaceMember[], Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export interface BillingInfo {
  balance: string;
  currency: 'CREDITS' | 'USD';
  subscription: {
    status: string;
    periodEnd: string | null;
    planId: string;
    planName: string;
    price: string;
    limits: {
      messages: number;
    };
  } | null;
  usage: {
    messagesSent: number;
  };
  accountStatus: string;
}

export interface UserInvoice {
  id: string;
  date: string;               // ISO 8601
  description: string;        // Human-readable (e.g. "Subscription Renewal")
  type: 'credit_grant' | 'payment';
  creditsAdded: number;
  balanceAfter: number;
  paymentAmount?: number;     // In cents (e.g. 2900 = $29.00)
  currency?: string;          // 'USD'
  paymentStatus?: string;     // 'succeeded' | 'failed' | 'pending' | 'canceled'
  dodoPaymentId?: string | null;
  dodoInvoiceId?: string | null;
  planName?: string;
}

export async function getWorkspaceBilling(workspaceId: string): Promise<BillingInfo> {
  const endpoint = API.ENDPOINTS.WORKSPACES.BILLING.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<BillingInfo, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function getWorkspaceInvoices(workspaceId: string): Promise<UserInvoice[]> {
  const endpoint = API.ENDPOINTS.WORKSPACES.INVOICES.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<UserInvoice[], Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function updateWorkspace(workspaceId: string, name: string): Promise<UserWorkspaceRow> {
  const endpoint = API.ENDPOINTS.WORKSPACES.BASE_URL() + `/${workspaceId}`;
  const res = (await fetch(
    endpoint,
    {
      method: "PATCH",
      data: { name }
    }
  ).then((r) => r.data)) as ApiResponse<UserWorkspaceRow, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function deleteWorkspace(workspaceId: string): Promise<void> {
  const endpoint = API.ENDPOINTS.WORKSPACES.BASE_URL() + `/${workspaceId}`;
  const res = await fetch(
    endpoint,
    { method: "DELETE" }
  );

  if (res.status >= 400) {
    const error = (res as any).data || { message: "Failed to delete workspace" };
    throw new Error(error.message);
  }
}

export interface EntitlementData {
  features: Record<string, boolean>;
  limits: Record<string, number | boolean>;
  usage: {
    chatbots: number;
    datasources: number;
    actionsNum: number;
    team_members: number;
    messages_per_month: number;
    storage_mb: number;
    workspaces: number;
  };
}

export async function getWorkspaceEntitlements(workspaceId: string): Promise<EntitlementData> {
  const endpoint = API.ENDPOINTS.WORKSPACES.ENTITLEMENTS.path().replace(":workspaceId", workspaceId);
  const res = (await fetch(
    API.ENDPOINTS.WORKSPACES.BASE_URL() + endpoint,
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<EntitlementData, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}
