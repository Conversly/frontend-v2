import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
    VoiceConfig,
    UpdateVoiceConfigInput,
    VoiceWidgetConfig,
    VoiceCallSession,
    VoiceAgentConfig,
    LiveKitTokenResponse,
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

/**
 * Generate a LiveKit room token with agent configuration
 * This token is used to connect to a LiveKit room and dispatch a voice agent
 * 
 * z-terminal API: POST /voice/:chatbotId/token
 * Request body: { agent_config: VoiceAgentConfig }
 * Response: { success: true, data: LiveKitTokenResponse }
 */
export const generateVoiceToken = async (
    chatbotId: string,
    agentConfig: VoiceAgentConfig,
    agentName?: string
): Promise<LiveKitTokenResponse> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() +
        API.ENDPOINTS.VOICE.GENERATE_TOKEN().replace(":chatbotId", chatbotId);

    // Build request body matching z-terminal API structure
    const requestBody: any = {
        agent_config: agentConfig,
    };

    // Add room_config with agent_name if provided (including empty string "")
    // Empty string is valid and matches Python agent registration: {"agent_name": ""}
    if (agentName !== undefined) {
        requestBody.room_config = {
            agents: [{
                agent_name: agentName, // Can be "" (empty string) to match registered agent
            }],
        };
    }

    console.log('[Voice API] Generating token with:', { 
        chatbotId, 
        agentName: agentName === '' ? '(empty string)' : agentName, 
        agentConfig 
    });

    const res = await fetch(endpoint, {
        method: "POST",
        data: requestBody,
    }).then((res) => res.data) as ApiResponse<LiveKitTokenResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }

    console.log('[Voice API] Token generated successfully:', res.data);
    return res.data;
};

