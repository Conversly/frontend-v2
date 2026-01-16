export interface WorkspaceCapabilities {
  canViewChatbots: boolean;
  canCreateChatbot: boolean;
  canEditChatbot: boolean;
  canDeleteChatbot: boolean;

  canViewAnalytics: boolean;
  canViewLogs: boolean;
  canViewActivity: boolean;

  canViewBilling: boolean;
  canManageBilling: boolean;
  canViewBillingAnalytics: boolean;

  canInviteMembers: boolean;
  canManageMembers: boolean;
  canManageWorkspace: boolean;

  canManageCampaigns: boolean;
  canHandleEscalations: boolean;
}

export interface WorkspaceContext {
  workspaceId: string;
  workspaceName: string;
  accountId: string;
  accountName: string;
  workspaceRole: 'OWNER' | 'ADMIN' | 'MEMBER';
  accountRole: 'OWNER' | 'ADMIN' | null;
  capabilities: WorkspaceCapabilities;
}

