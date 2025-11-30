import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
    VoiceConfig,
    UpdateVoiceConfigInput,
    VoiceWidgetConfig,
    VoiceCallSession,
} from "@/types/voice";

export const getVoiceConfig = async (chatbotId: string): Promise<VoiceConfig> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GET_CONFIG().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, {
        method: "GET",
    }).then((res) => res.data) as ApiResponse<VoiceConfig, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const updateVoiceConfig = async (
    chatbotId: string,
    data: UpdateVoiceConfigInput
): Promise<VoiceConfig> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.UPDATE_CONFIG().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, {
        method: "PATCH",
        data,
    }).then((res) => res.data) as ApiResponse<VoiceConfig, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const deleteVoiceConfig = async (chatbotId: string): Promise<void> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.DELETE_CONFIG().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, {
        method: "DELETE",
    }).then((res) => res.data) as ApiResponse<null, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
};

export const getVoiceWidgetConfig = async (chatbotId: string): Promise<VoiceWidgetConfig> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GET_WIDGET_CONFIG().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, {
        method: "GET",
    }).then((res) => res.data) as ApiResponse<VoiceWidgetConfig, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};

export const getVoiceCallSessions = async (chatbotId: string): Promise<VoiceCallSession[]> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() + API.ENDPOINTS.VOICE.GET_SESSIONS().replace(":chatbotId", chatbotId);
    const res = await fetch(endpoint, {
        method: "GET",
    }).then((res) => res.data) as ApiResponse<VoiceCallSession[], Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    return res.data;
};
