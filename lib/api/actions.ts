import { fetch } from "./axios";
import { API, ApiResponse } from "./config";
import {
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

export const createCustomAction = async (data: CreateCustomActionInput) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.CREATE(),
        data
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getCustomActions = async (data: GetActionsQuery) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.LIST(),
        data
    ).then((res) => res.data)) as ApiResponse<CustomAction[]>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getCustomAction = async (chatbotId: string, actionId: string) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.GET(),
        { chatbotId, actionId }
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const updateCustomAction = async (data: UpdateCustomActionInput) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.UPDATE(),
        data
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const deleteCustomAction = async (chatbotId: string, actionId: string) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.DELETE(),
        { chatbotId, actionId }
    ).then((res) => res.data)) as ApiResponse<null>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const toggleCustomAction = async (data: ToggleActionInput) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.TOGGLE(),
        data
    ).then((res) => res.data)) as ApiResponse<CustomAction>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const testCustomAction = async (data: TestActionInput) => {
    const res = (await fetch.post(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.TEST(),
        data
    ).then((res) => res.data)) as ApiResponse<TestActionResponse>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getActionTemplates = async (params?: GetTemplatesQuery) => {
    const res = (await fetch.get(
        API.ENDPOINTS.ACTIONS.BASE_URL() + API.ENDPOINTS.ACTIONS.TEMPLATES(),
        { params }
    ).then((res) => res.data)) as ApiResponse<ActionTemplate[]>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};
