// ============================================================================
// Input Types
// ============================================================================

export interface CreateContactInput {
    chatbotId: string;
    phoneNumber: string;
    displayName?: string;
    email?: string;
}

export interface UpdateContactInput {
    displayName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface GetContactsQuery {
    chatbotId: string;
    search?: string;
    limit?: number;
    offset?: number;
}

export interface BulkImportInput {
    chatbotId: string;
    fileUrl: string;
    originalFileName?: string;
}

// ============================================================================
// Response Types
// ============================================================================

export interface ContactResponse {
    id: string;
    chatbotId: string;
    displayName: string | null;
    phoneNumber: string | null;
    email: string | null;
    channels: string[];
    createdAt: Date | null;
    updatedAt: Date | null;
    metadata?: Record<string, any>;
    userMetadata?: Record<string, any>;
}

export interface GetContactsResponse {
    success: boolean;
    data: ContactResponse[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
    };
}

export interface CreateContactResponse {
    success: boolean;
    data: ContactResponse;
}

export interface UpdateContactResponse {
    success: boolean;
    data: ContactResponse;
}

export interface DeleteContactResponse {
    success: boolean;
    message: string;
    deletedId: string;
}

// ============================================================================
// Bulk Import Types
// ============================================================================


export interface BulkImportResponse {
    jobId: string;
    status: string;
    message: string;
    timestamp: string;
}

// ============================================================================
// CSV Parsing Types
// ============================================================================

export interface ParsedCSVRow {
    phone: string;
    name?: string;
    email?: string;
}

export interface CSVValidationError {
    row: number;
    phone?: string;
    reason: string;
}
