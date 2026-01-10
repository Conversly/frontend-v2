import { fetch } from "@/lib/api/axios";
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
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.LIST_ASSISTANTS().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, { method: "GET" }).then(res => res.data) as ApiResponse<VoiceAssistant[], Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const createAssistant = async (data: CreateVoiceAssistantInput): Promise<VoiceAssistantFullDetails> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.CREATE_ASSISTANT();
    const res = await fetch(endpoint, { method: "POST", data }).then(res => res.data) as ApiResponse<VoiceAssistantFullDetails, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const getAssistant = async (assistantId: string): Promise<VoiceAssistantFullDetails> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GET_ASSISTANT().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "GET" }).then(res => res.data) as ApiResponse<VoiceAssistantFullDetails, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateAssistant = async (assistantId: string, data: UpdateVoiceAssistantInput): Promise<VoiceAssistant> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.UPDATE_ASSISTANT().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "PATCH", data }).then(res => res.data) as ApiResponse<VoiceAssistant, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateBehavior = async (assistantId: string, data: UpdateVoiceAssistantBehaviorInput): Promise<{ behavior: any }> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.UPDATE_BEHAVIOR().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "PATCH", data }).then(res => res.data) as ApiResponse<{ behavior: any }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const updateProvider = async (assistantId: string, data: UpdateVoiceAssistantProviderInput): Promise<{ provider: any }> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.UPDATE_PROVIDER().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "PATCH", data }).then(res => res.data) as ApiResponse<{ provider: any }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const makeOutboundCall = async (assistantId: string, phoneNumber: string): Promise<any> => {
    // Add call endpoint to config if not present, or construct manually 
    // We didn't add MAKE_CALL specific for assistant in config.ts yet, let's fix that or use literal string for now if config isn't updated.
    // Actually config has `GENERATE_TOKEN` as `/assistants/:assistantId/token`. 
    // I should add `MAKE_CALL` to config properly in next step or use string builder here.
    // Let's use string builder for now to match router: /assistants/:assistantId/call
    const endpoint = `${API.ENDPOINTS.VOICE.BASE_URL()}/assistants/${assistantId}/call`;
    const res = await fetch(endpoint, { method: "POST", data: { phoneNumber } }).then(res => res.data) as ApiResponse<any, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};

export const generateAssistantToken = async (assistantId: string): Promise<{ accessToken: string; url: string }> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GENERATE_TOKEN().replace(":assistantId", assistantId);
    const res = await fetch(endpoint, { method: "POST" }).then(res => res.data) as ApiResponse<{ accessToken: string; url: string }, Error>;
    if (!res.success) throw new Error(res.message);
    return res.data;
};
