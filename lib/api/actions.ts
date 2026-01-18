import { fetch, guardedFetch, getPath } from "./axios";
import { API, ApiResponse } from "./config";
import {
    ApiConfig,
    CreateCustomActionInput,
    CustomAction,
    GetActionsQuery,
    UpdateCustomActionInput,
    ToggleActionInput,
    TestActionInput,
    TestActionResponse,
    ActionTemplate,
    GetTemplatesQuery,
} from "@/types/customActions";

function normalizeApiConfigForBackend(config: ApiConfig): ApiConfig {
    // Strip any accidental legacy keys by explicit pick.
    return {
        method: config.method,
        baseUrl: config.baseUrl,
        endpoint: config.endpoint,
        staticHeaders: config.staticHeaders ?? {},
        staticBody: config.staticBody,
        authType: config.authType ?? "none",
        authValue: config.authValue,
        authHeader: config.authHeader,
        responseMapping: config.responseMapping,
        successCodes: config.successCodes,
        timeoutSeconds: config.timeoutSeconds,
        retryCount: config.retryCount,
        retryOnCodes: config.retryOnCodes,
        followRedirects: config.followRedirects,
        verifySsl: config.verifySsl,
    };
}

export const createCustomAction = async (data: CreateCustomActionInput) => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = (await guardedFetch(
        API.ENDPOINTS.ACTIONS.CREATE,
        API.ENDPOINTS.ACTIONS.BASE_URL(),
        {
            method: "POST",
            data: {
                ...data,
                apiConfig: normalizeApiConfigForBackend(data.apiConfig),
            },
        }
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getCustomActions = async (data: GetActionsQuery) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.LIST.path(),
        data
    ).then((res) => res.data)) as ApiResponse<CustomAction[]>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getCustomAction = async (chatbotId: string, actionId: string) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.GET.path(),
        { chatbotId, actionId }
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const updateCustomAction = async (data: UpdateCustomActionInput) => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = (await guardedFetch(
        API.ENDPOINTS.ACTIONS.UPDATE,
        API.ENDPOINTS.ACTIONS.BASE_URL(),
        {
            method: "POST",
            data: {
                ...data,
                apiConfig: data.apiConfig ? normalizeApiConfigForBackend(data.apiConfig) : undefined,
            },
        }
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const deleteCustomAction = async (chatbotId: string, actionId: string) => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = (await guardedFetch(
        API.ENDPOINTS.ACTIONS.DELETE,
        API.ENDPOINTS.ACTIONS.BASE_URL(),
        { method: "POST", data: { chatbotId, actionId } }
    ).then((res) => res.data)) as ApiResponse<null>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const toggleCustomAction = async (data: ToggleActionInput) => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = (await guardedFetch(
        API.ENDPOINTS.ACTIONS.TOGGLE,
        API.ENDPOINTS.ACTIONS.BASE_URL(),
        { method: "POST", data }
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const testCustomAction = async (data: TestActionInput) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.TEST.path(),
        {
            chatbotId: data.chatbotId,
            apiConfig: normalizeApiConfigForBackend(data.apiConfig),
            parameters: data.parameters,
            testArgs: data.testArgs ?? {},
        }
    ).then((res) => res.data)) as ApiResponse<TestActionResponse>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getActionTemplates = async (params?: GetTemplatesQuery) => {
    const res = (await fetch.get(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.TEMPLATES.path(),
        { params }
    ).then((res) => res.data)) as ApiResponse<ActionTemplate[]>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};
