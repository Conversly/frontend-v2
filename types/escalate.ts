export interface HandleAbsenceInput {
    conversationId: string;
    escalationId: string;
    name: string;
    email: string;
    chatbotId: string;
    submittedAt: string; // ISO string from widget
}

export interface HandleAbsenceResponse {
    success: boolean;
    data: {
        escalationId: string;
        ackEmailSent: boolean;
    };
}

// ─── Claim ──────────────────────────────────────────────────────────────────

export interface ClaimEscalationInput {
    escalationId: string;
}

export interface ClaimEscalationResponse {
    success: boolean;
    data: {
        escalationId: string;
        conversationId: string;
        assignedAt: string; // ISO string
    };
}

// ─── Resolve ─────────────────────────────────────────────────────────────────

export interface ResolveEscalationInput {
    escalationId: string;
}

export interface ResolveEscalationResponse {
    success: boolean;
    data: {
        escalationId: string;
        conversationId: string;
        resolvedAt: string; // ISO string
    };
}

// ─── Transfer ────────────────────────────────────────────────────────────────

export interface TransferEscalationInput {
    escalationId: string;
    targetAgentUserId: string;
}

export interface TransferEscalationResponse {
    success: boolean;
    data: {
        escalationId: string;
        newAgentUserId: string;
        assignedAt: string; // ISO string
    };
}

// ─── Convert To Ticket ───────────────────────────────────────────────────────

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface ConvertToTicketInput {
    escalationId: string;
    subject?: string;
    /** Full ticket title shown in ticket management */
    title: string;
    /** Longer description of the issue */
    description?: string;
    /** Priority level */
    priority?: TicketPriority;
}

export interface ConvertToTicketResponse {
    success: boolean;
    data: {
        ticketId: string;
        escalationId: string;
        conversationId: string;
    };
}

// ─── Close (CLOSED state – support decided to discard) ───────────────────────

export interface CloseEscalationInput {
    escalationId: string;
}

export interface CloseEscalationResponse {
    success: boolean;
    data: {
        escalationId: string;
        conversationId: string;
    };
}
