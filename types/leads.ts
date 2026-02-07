// ============================================================================
// Input Types
// ============================================================================

export interface CreateLeadInput {
    chatbotId: string;
    conversationId: string;
    name: string;
    email: string;
    phoneNumber: string;
    source: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    topicId?: string;
}

export interface GetLeadsQuery {
    chatbotId: string;
    topicId?: string;
    source?: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    startDate?: string;
    endDate?: string;
    search?: string;
    limit?: number;
    cursor?: string | null;
}

// ============================================================================
// Response Types
// ============================================================================

export interface LeadResponse {
    id: string;
    chatbotId: string;
    conversationId: string;
    name: string;
    email: string;
    phoneNumber: string;
    source: string;
    topicId: string | null;
    topicName: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface GetLeadsResponse {
    success: boolean;
    data: LeadResponse[];
    nextCursor: string | null;
    hasMore: boolean;
}

export interface CreateLeadResponse {
    success: boolean;
    data: LeadResponse;
}
