import {
    CreateTemplateInput,
    CreateTemplateResponse,
    DeleteTemplateParams,
    DeleteTemplateResponse,
    // GenerateTemplateBodySchema, // Removed as it's not exported
    GetTemplateParams,
    // GetTemplateQuery, // Removed as it's defined locally or not exported
    GetTemplateResponse,
    GetTemplatesQuery,
    GetTemplatesResponse,
    UpdateTemplateInput,
    UpdateTemplateResponse,
    GenerateTemplateResponse
} from "../../types/templates";
import { API } from "./config";
import { guardedFetch, getPath } from "./axios";

interface GenerateTemplateInput {
    prompt: string;
    language: string;
    style?: 'Normal' | 'Poetic' | 'Exciting' | 'Funny';
    optimizeFor?: 'Click Rate' | 'Reply Rate';
}

// ============================================================================
// Template API Actions
// ============================================================================

export const getTemplates = async (query: GetTemplatesQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_TEMPLATES;
    return guardedFetch<GetTemplatesResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            params: query,
        }
    );
};

export const getTemplate = async (params: GetTemplateParams, query: GetTemplateQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_TEMPLATE;
    const path = getPath(endpoint).replace(":id", params.id);
    return guardedFetch<GetTemplateResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            url: path, // Override url construction since we replaced param
            params: query,
        }
    );
};

export const createTemplate = async (data: CreateTemplateInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.CREATE_TEMPLATE;
    return guardedFetch<CreateTemplateResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};

export const updateTemplate = async (id: string, query: GetTemplateQuery, data: UpdateTemplateInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.UPDATE_TEMPLATE;
    const path = getPath(endpoint).replace(":id", id);

    return guardedFetch<UpdateTemplateResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "PATCH",
            url: path,
            params: query,
            data,
        }
    );
};

export const deleteTemplate = async (params: DeleteTemplateParams, query: DeleteTemplateQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.DELETE_TEMPLATE;
    const path = getPath(endpoint).replace(":id", params.id);
    return guardedFetch<DeleteTemplateResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "DELETE",
            url: path,
            params: query,
        }
    );
};

export const generateTemplates = async (data: GenerateTemplateInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GENERATE_TEMPLATE;
    return guardedFetch<GenerateTemplateResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};

// Also defining these locally if they were missing from the export list I checked earlier
// but expected to be in the file based on usage:
interface GetTemplateQuery {
    chatbotId: string;
}

interface DeleteTemplateQuery {
    chatbotId: string;
}

export const getDefaultTemplates = async (query: { chatbotId: string }) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_DEFAULT_TEMPLATES;
    return guardedFetch<{ all: any[], defaults: any[] }>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            params: query,
        }
    );
};

export const syncTemplates = async (data: { chatbotId: string }) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.SYNC_TEMPLATES;
    return guardedFetch<any[]>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};
