
// ============================================================================
// Input Types
// ============================================================================

export interface CreateLeadFormInput {
    chatbotId: string;
    title: string;
    subtitle?: string;
    ctaText?: string;
    successMessage?: string;
    isEnabled?: boolean;
    pageTriggers?: string[];
    keywordTriggers?: string[];
    minMessageCount?: number;
    cooldownHours?: number;
    collectAfterBotFallback?: boolean;
}

export interface UpdateLeadFormInput {
    id: string; // formId
    title?: string;
    subtitle?: string;
    ctaText?: string;
    successMessage?: string;
    isEnabled?: boolean;
    pageTriggers?: string[];
    keywordTriggers?: string[];
    minMessageCount?: number;
    cooldownHours?: number;
    collectAfterBotFallback?: boolean;
}

export interface LeadFormFieldInput {
    id?: string; // if updating existing
    label: string;
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: any; // jsonb
    position: number;
    systemField?: 'name' | 'email' | 'phone' | 'company' | 'none';
}

export interface LeadFormTriggerInput {
    id?: string; // if updating
    type: 'page' | 'keyword' | 'message_count';
    config: any; // jsonb
    isEnabled?: boolean;
}

export interface UpsertLeadFormConfigInput {
    chatbotId: string;
    form: Omit<CreateLeadFormInput, 'chatbotId'> & { id?: string };
    fields: LeadFormFieldInput[];
    triggers: LeadFormTriggerInput[];
}

export interface SubmitLeadInput {
    chatbotId: string;
    formId: string;
    conversationId?: string;
    visitorId: string;
    pageUrl?: string;
    source: 'WIDGET' | 'WHATSAPP' | 'VOICE' | 'SMS';
    responses: Record<string, any>; // fieldId -> value
}

// ============================================================================
// Response Types
// ============================================================================

export interface LeadFormField {
    id: string;
    formId: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
    placeholder?: string | null;
    required: boolean;
    position: number;
    systemField?: 'name' | 'email' | 'phone' | 'company' | 'none' | null;
    options?: string[] | null;
}

export interface LeadFormTrigger {
    id: string;
    formId: string;
    type: 'page' | 'keyword' | 'message_count';
    config: any;
    isEnabled: boolean;
}

export interface LeadForm {
    id: string;
    chatbotId: string;
    title: string;
    subtitle?: string | null;
    ctaText?: string | null;
    successMessage?: string | null;
    isEnabled: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    fields: LeadFormField[];
    triggers: LeadFormTrigger[];
    pageTriggers?: string[] | null;
    keywordTriggers?: string[] | null;
    minMessageCount?: number | null;
    cooldownHours?: number | null;
    collectAfterBotFallback?: boolean | null;
}

export interface LeadFormResponse {
    success: boolean;
    data: LeadForm;
}


