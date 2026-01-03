import { fetch } from "./axios";
import { API, ApiResponse } from "./config";

export interface UserPermissions {
  accountId: string;
  role: 'OWNER' | 'ADMIN' | null;
  isOwner: boolean;
  isAdmin: boolean;
  isChatbotAdmin: boolean;
  chatbotIds: string[];
}

export interface AccountMember {
  userId: string;
  email: string | null;
  displayName: string;
  avatarUrl: string | null;
  role: 'OWNER' | 'ADMIN';
  createdAt: string;
}

export interface ChatbotAdmin {
  chatbotId: string;
  chatbotName: string;
  userId: string;
  email: string | null;
  displayName: string;
  avatarUrl: string | null;
  createdAt: string;
}

export const getPermissions = async (): Promise<UserPermissions> => {
  const res = (await fetch(API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.GET_PERMISSIONS()).then(
    (res) => res.data
  )) as ApiResponse<UserPermissions>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAccountMembers = async (): Promise<AccountMember[]> => {
  const res = (await fetch(API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.GET_ACCOUNT_MEMBERS()).then(
    (res) => res.data
  )) as ApiResponse<AccountMember[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const inviteAccountMember = async (email: string, role: 'OWNER' | 'ADMIN'): Promise<void> => {
  const res = (await fetch(API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.INVITE_ACCOUNT_MEMBER(), {
    method: 'POST',
    data: { email, role },
  }).then((res) => res.data)) as ApiResponse<void>;

  if (!res.success) {
    throw new Error(res.message);
  }
};

export const deleteAccountMember = async (userId: string): Promise<void> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.DELETE_ACCOUNT_MEMBER().replace(':userId', userId),
    {
      method: 'DELETE',
    }
  ).then((res) => res.data)) as ApiResponse<void>;

  if (!res.success) {
    throw new Error(res.message);
  }
};

export const getChatbotAdmins = async (chatbotId: string): Promise<ChatbotAdmin[]> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.GET_CHATBOT_ADMINS().replace(':chatbotId', chatbotId)
  ).then((res) => res.data)) as ApiResponse<ChatbotAdmin[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const inviteChatbotAdmin = async (chatbotId: string, email: string): Promise<void> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.INVITE_CHATBOT_ADMIN().replace(':chatbotId', chatbotId),
    {
      method: 'POST',
      data: { email },
    }
  ).then((res) => res.data)) as ApiResponse<void>;

  if (!res.success) {
    throw new Error(res.message);
  }
};

export const deleteChatbotAdmin = async (chatbotId: string, userId: string): Promise<void> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() +
    API.ENDPOINTS.ADMIN.DELETE_CHATBOT_ADMIN()
      .replace(':chatbotId', chatbotId)
      .replace(':userId', userId),
    {
      method: 'DELETE',
    }
  ).then((res) => res.data)) as ApiResponse<void>;

  if (!res.success) {
    throw new Error(res.message);
  }
};

// Pending Invites Types
export interface PendingInvite {
  id: string;
  email: string;
  role: 'OWNER' | 'ADMIN';
  inviteType: 'ACCOUNT' | 'CHATBOT';
  chatbotId?: string;
  chatbotName?: string;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED';
  expiresAt: string;
  createdAt: string;
}

export const getPendingInvites = async (): Promise<PendingInvite[]> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.GET_PENDING_INVITES()
  ).then((res) => res.data)) as ApiResponse<PendingInvite[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const cancelInvite = async (inviteId: string): Promise<void> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + API.ENDPOINTS.ADMIN.CANCEL_INVITE().replace(':inviteId', inviteId),
    {
      method: 'DELETE',
    }
  ).then((res) => res.data)) as ApiResponse<void>;

  if (!res.success) {
    throw new Error(res.message);
  }
};

// Workspaces
export interface Workspace {
  id: string;
  name: string;
}

export interface WorkspaceDetails {
  id: string;
  name: string;
  createdAt: string | null;
  memberCount: number;
  chatbotCount: number;
  walletBalance: string;
  role: 'OWNER' | 'ADMIN';
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + `/workspaces`
  ).then((res) => res.data)) as ApiResponse<Workspace[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getWorkspacesWithDetails = async (): Promise<WorkspaceDetails[]> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + `/workspaces/details`
  ).then((res) => res.data)) as ApiResponse<WorkspaceDetails[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const createWorkspace = async (name: string): Promise<Workspace> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + `/workspaces`,
    {
      method: 'POST',
      data: { name },
    }
  ).then((res) => res.data)) as ApiResponse<Workspace>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

// Public invite endpoints (no auth required)
export interface InviteDetails {
  email: string;
  role: string;
  inviteType: 'ACCOUNT_MEMBER' | 'CHATBOT_ADMIN';
  accountId?: string;
  accountName: string;
  expiresAt: string;
  status: string;
  isValid: boolean;
  chatbotId?: string;
  chatbotName?: string;
}

export const getInviteDetails = async (token: string): Promise<InviteDetails> => {
  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + `/invite/details?token=${token}`
  ).then((res) => res.data)) as ApiResponse<InviteDetails>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export interface AcceptInviteResponse {
  message: string;
  requiresAuth?: boolean;
  data: {
    accepted: boolean;
    accountId: string;
    accountName: string;
    chatbotId?: string;
    chatbotName?: string;
    role?: string;
    inviteType?: string;
  };
}

export const acceptInviteByToken = async (token: string): Promise<AcceptInviteResponse> => {
  try {
    const response = await fetch(
      API.ENDPOINTS.ADMIN.BASE_URL() + `/invite/accept-by-token`,
      {
        method: 'POST',
        data: { token },
      }
    );
    
    const res = response.data as ApiResponse<{
      accepted: boolean;
      accountId?: string;
      accountName?: string;
      chatbotId?: string;
      chatbotName?: string;
      role?: string;
      inviteType?: string;
      requiresAuth?: boolean;
      inviteEmail?: string;
    }>;

    if (!res.success) {
      throw new Error(res.message);
    }

    // Return the response in the expected format with message, requiresAuth, and data fields
    return {
      message: res.message,
      requiresAuth: res.data?.requiresAuth || false,
      data: {
        accepted: res.data.accepted,
        accountId: res.data.accountId || '',
        accountName: res.data.accountName || '',
        chatbotId: res.data.chatbotId,
        chatbotName: res.data.chatbotName,
        role: res.data.role,
        inviteType: res.data.inviteType,
      },
    };
  } catch (error: any) {
    console.error("API error accepting invite:", error);
    // Re-throw with more context
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.message) {
      throw error;
    }
    throw new Error("Failed to accept invite. Please try again.");
  }
};

// Audit Logs
export interface AuditLog {
  id: string;
  accountId: string;
  userId: string;
  userEmail: string | null;
  userDisplayName: string;
  action: string;
  resourceType: string | null;
  resourceId: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface AuditLogFilters {
  limit?: number;
  cursor?: string;
  action?: string;
  resourceType?: string;
}

export const getAuditLogs = async (filters?: AuditLogFilters): Promise<AuditLog[]> => {
  const params = new URLSearchParams();
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.cursor) params.append('cursor', filters.cursor);
  if (filters?.action) params.append('action', filters.action);
  if (filters?.resourceType) params.append('resourceType', filters.resourceType);

  const res = (await fetch(
    API.ENDPOINTS.ADMIN.BASE_URL() + `/audit-logs${params.toString() ? '?' + params.toString() : ''}`
  ).then((res) => res.data)) as ApiResponse<AuditLog[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

