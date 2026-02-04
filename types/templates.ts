

// ============================================================================
// Input Types
// ============================================================================


export interface WhatsAppTemplateComponent {
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS' | 'CAROUSEL';
    format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string;
    buttons?: any[];
    example?: any;
    cards?: any[];
}


export interface CreateTemplateInput {
    chatbotId: string;
    name: string;
    channel?: 'WHATSAPP' | 'EMAIL' | 'SMS';
    subject?: string; // For EMAIL/SMS
    content: string;
    variables?: string[];

    // WhatsApp specific
    language?: string; // e.g. en_US
    category?: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
    components?: WhatsAppTemplateComponent[];

    // Builder/app-layer fields
    label?: string;
    templateLanguage?: string; // e.g. "English (UK)"
    messageType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    actionType?: 'QuickReplies' | 'CallToAction' | 'Buttons' | 'Carousel';

    // Interactive config
    quickReplies?: string[];
    callToAction?: any[];
    buttons?: any[];
    carouselCards?: any[];

    // Sample/parameterization
    templateParams?: string[];
    sampleMessage?: string;
}

export interface UpdateTemplateInput {
    name?: string;
    subject?: string;
    content?: string;
    variables?: string[];
    status?: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE' | 'DRAFT';

    // WhatsApp specific
    language?: string;
    category?: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
    components?: WhatsAppTemplateComponent[];

    // Builder/app-layer fields
    label?: string;
    templateLanguage?: string;
    messageType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    actionType?: 'QuickReplies' | 'CallToAction' | 'Buttons' | 'Carousel';

    // Interactive config
    quickReplies?: string[];
    callToAction?: any[];
    buttons?: any[];
    carouselCards?: any[];

    // Sample/parameterization
    templateParams?: string[];
    sampleMessage?: string;
}

export interface GetTemplatesQuery {
    chatbotId: string;
    channel?: 'WHATSAPP' | 'EMAIL' | 'SMS';
    status?: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE' | 'DRAFT';
    limit?: number;
    offset?: number;
}

export interface GetTemplateParams {
    id: string;
}

export interface DeleteTemplateParams {
    id: string;
}

// ============================================================================
// Response Types
// ============================================================================

export interface TemplateResponse {
    id: string;
    chatbotId: string;
    channel: 'WHATSAPP' | 'EMAIL' | 'SMS';
    name: string;
    subject: string | null;
    format: string | null;
    content: string;
    variables: string[];
    status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE' | 'DRAFT';

    // WhatsApp specific
    metaTemplateId: string | null;
    language: string | null;
    category: string | null;
    components: WhatsAppTemplateComponent[] | null;

    // Builder/app-layer fields
    label: string | null;
    templateLanguage: string | null;
    messageType: string | null;
    actionType: string | null;
    assistantId: string | null;

    // Interactive config
    quickReplies: string[];
    callToAction: any[];
    buttons: any[];
    carouselCards: any[];

    // Sample/parameterization
    parameterCount: number | null;
    templateParams: string[];
    sampleMessage: string | null;

    // Timestamps
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface GetTemplatesResponse {
    success: boolean;
    data: TemplateResponse[];
    pagination?: {
        total: number;
        limit: number;
        offset: number;
    };
}

export interface GetTemplateResponse {
    success: boolean;
    data: TemplateResponse;
}

export interface CreateTemplateResponse {
    success: boolean;
    data: TemplateResponse;
}

export interface UpdateTemplateResponse {
    success: boolean;
    data: TemplateResponse;
}

export interface DeleteTemplateResponse {
    success: boolean;
    message: string;
    deletedId: string;
}

export interface GeneratedTemplateItem {
    actionType: string;
    format: string;
    templateParams: string[];
    quickReplies: string[];
}

export interface GenerateTemplateResponse {
    success: boolean;
    data: GeneratedTemplateItem[];
}
