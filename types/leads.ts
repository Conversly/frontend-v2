// ============================================================================
// Input Types
// ============================================================================

export interface CreateLeadInput {
    chatbotId: string;
    conversationId?: string;
    visitorId: string;
    topicId?: string | null;
    source: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    // Legacy fields removed, but we might accept them loosely if needed for migration scripts, 
    // but for V1 strict architecture we remove them. 
    // If controllers send them, they will be ignored by strict types, 
    // so we might want `[key: string]: any` if we want to be lenient, 
    // but let's be strict as per "no backward compatibility".
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

// ============================================================================
// Response Types
// ============================================================================

export interface LeadResponse {
    id: string;
    chatbotId: string;
    conversationId: string | null;
    visitorId: string;
    topicId: string | null;
    source: string;
    createdAt: Date;
    updatedAt?: Date | null;
    createdAtStr?: string;

    // New dynamic data
    responses: Array<{
        label: string;
        value: any;
        systemField: string | null;
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
