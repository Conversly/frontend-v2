// ============================================================================
// Input Types
// ============================================================================

export interface CreateLeadInput {
    chatbotId: string;
    contactId: string;
    conversationId?: string;
    topicId?: string | null;
    source: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
}

export interface GetLeadsQuery {
    chatbotId: string;
    source?: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    startDate?: string;
    endDate?: string;
    search?: string; // We might need to implement search on responses later
    limit?: number;
    cursor?: string | null;
    topicId?: string;
}

export interface ExportLeadsQuery {
    chatbotId: string;
    source?: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    startDate?: string;
    endDate?: string;
    search?: string;
    topicId?: string;
}

// ============================================================================
// Response Types
// ============================================================================

export interface LeadResponse {
    id: string;
    chatbotId: string;
    contactId: string;
    conversationId: string | null;
    topicId: string | null;
    source: string;
    role: string;
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    firstSeenAt: Date | null;
    createdAt: Date;

    // Custom form field responses from contact_attributes
    attributes: Array<{
        key: string;
        value: any;
    }>;
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
