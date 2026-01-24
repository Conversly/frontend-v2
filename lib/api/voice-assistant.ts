import { fetch, guardedFetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
    VoiceAssistant,
    VoiceAssistantFullDetails,
    CreateVoiceAssistantInput,
    UpdateVoiceAssistantInput,
    UpdateVoiceAssistantBehaviorInput,
    UpdateVoiceAssistantProviderInput
} from "@/types/voice-assistant";

export const getAssistants = async (chatbotId: string): Promise<VoiceAssistant[]> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.LIST_ASSISTANTS.path().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, { method: "GET" }).then(res => res.data) as ApiResponse<VoiceAssistant[], Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const createAssistant = async (data: CreateVoiceAssistantInput): Promise<VoiceAssistantFullDetails> => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.CREATE_ASSISTANT,
        API.ENDPOINTS.VOICE.BASE_URL(),
        { method: "POST", data }
    ).then(res => res.data) as ApiResponse<VoiceAssistantFullDetails, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const getAssistant = async (assistantId: string): Promise<VoiceAssistantFullDetails> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GET_ASSISTANT.path().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "GET" }).then(res => res.data) as ApiResponse<VoiceAssistantFullDetails, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateAssistant = async (assistantId: string, data: UpdateVoiceAssistantInput): Promise<VoiceAssistant> => {
    const endpointPath = API.ENDPOINTS.VOICE.UPDATE_ASSISTANT.path().replace(":assistantId", assistantId);
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.UPDATE_ASSISTANT,
        API.ENDPOINTS.VOICE.BASE_URL() + endpointPath.replace(API.ENDPOINTS.VOICE.UPDATE_ASSISTANT.path(), ''),
        { method: "PATCH", data }
    ).then(res => res.data) as ApiResponse<VoiceAssistant, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateBehavior = async (assistantId: string, data: UpdateVoiceAssistantBehaviorInput): Promise<{ behavior: any }> => {
    const endpointPath = API.ENDPOINTS.VOICE.UPDATE_BEHAVIOR.path().replace(":assistantId", assistantId);
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.UPDATE_BEHAVIOR,
        API.ENDPOINTS.VOICE.BASE_URL() + endpointPath.replace(API.ENDPOINTS.VOICE.UPDATE_BEHAVIOR.path(), ''),
        { method: "PATCH", data }
    ).then(res => res.data) as ApiResponse<{ behavior: any }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateProvider = async (assistantId: string, data: UpdateVoiceAssistantProviderInput): Promise<{ provider: any }> => {
    const endpointPath = API.ENDPOINTS.VOICE.UPDATE_PROVIDER.path().replace(":assistantId", assistantId);
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.UPDATE_PROVIDER,
        API.ENDPOINTS.VOICE.BASE_URL() + endpointPath.replace(API.ENDPOINTS.VOICE.UPDATE_PROVIDER.path(), ''),
        { method: "PATCH", data }
    ).then(res => res.data) as ApiResponse<{ provider: any }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const makeOutboundCall = async (assistantId: string, phoneNumber: string): Promise<any> => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const endpoint = `${API.ENDPOINTS.VOICE.BASE_URL()}/assistants/${assistantId}/call`;
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.MAKE_CALL,
        endpoint.replace(API.ENDPOINTS.VOICE.MAKE_CALL.path(), ''),
        { method: "POST", data: { phoneNumber } }
    ).then(res => res.data) as ApiResponse<any, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const generateAssistantToken = async (assistantId: string): Promise<{ accessToken: string; url: string }> => {
    const endpointPath = API.ENDPOINTS.VOICE.GENERATE_TOKEN.path().replace(":assistantId", assistantId);
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
        API.ENDPOINTS.VOICE.GENERATE_TOKEN,
        API.ENDPOINTS.VOICE.BASE_URL() + endpointPath.replace(API.ENDPOINTS.VOICE.GENERATE_TOKEN.path(), ''),
        { method: "POST" }
    ).then(res => res.data) as ApiResponse<{ accessToken: string; url: string }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};
