// ─── Shared / List ───────────────────────────────────────────────────────────

export type TicketStatus = 'OPEN' | 'PENDING_USER' | 'PENDING_INTERNAL' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketSource = 'ESCALATION' | 'AI_AUTOMATION' | 'MANUAL_AGENT' | 'EMAIL';

export interface ListTicketsQuery {
    workspaceId: string;
    contactId?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    assignedAgentUserId?: string;
    search?: string;         // searches subject / description / contact email
    page?: number;
    limit?: number;
    sort?: 'id' | 'status' | 'assignedAgentUserId' | 'updatedAt' | 'priority';
    order?: 'asc' | 'desc';
}

export interface TicketListItem {
    id: string;
    status: TicketStatus;
    priority: TicketPriority | null;
    subject: string | null;
    source: TicketSource;
    createdAt: string | null;  // ISO Date string
    updatedAt: string | null;
    firstResponseAt: string | null;
    resolvedAt: string | null;
    closedAt: string | null;
    conversationId: string | null;
    contact: {
        id: string;
        displayName: string | null;
        email: string | null;
        avatarUrl: string | null;
    } | null;
    assignedAgent: {
        id: string;
        displayName: string;
        avatarUrl: string | null;
    } | null;
}

export interface ListTicketsResponse {
    success: boolean;
    data: TicketListItem[];
    total: number;
    page: number;
    limit: number;
}

// ─── Get by ID ───────────────────────────────────────────────────────────────

export interface GetTicketResponse {
    success: boolean;
    data: TicketDetail;
}

export interface TicketDetail extends TicketListItem {
    description: string | null;
    requesterEmail: string | null;
    workspaceId: string;
    chatbotId: string;
    conversationId: string;
    escalationId: string | null;
    metadata: Record<string, unknown>;
}

// ─── Update ──────────────────────────────────────────────────────────────────

export interface UpdateTicketInput {
    status?: TicketStatus;
    priority?: TicketPriority;
    subject?: string;
    description?: string;
    assignedAgentUserId?: string | null;  // null = unassign
}

export interface UpdateTicketResponse {
    success: boolean;
    data: { ticketId: string };
}

// ─── Assign ──────────────────────────────────────────────────────────────────

export interface AssignTicketInput {
    agentUserId: string;     // agent to assign to
}

export interface AssignTicketResponse {
    success: boolean;
    data: { ticketId: string; agentUserId: string };
}

// ─── Resolve / Close ─────────────────────────────────────────────────────────

export interface ResolveTicketResponse {
    success: boolean;
    data: { ticketId: string; resolvedAt: string };
}

export interface CloseTicketResponse {
    success: boolean;
    data: { ticketId: string; closedAt: string };
}

// ─── Counts ──────────────────────────────────────────────────────────────────

export type TicketCountsData = Record<TicketStatus | 'ALL', number>;

export interface GetTicketCountsResponse {
    success: boolean;
    data: TicketCountsData;
}
