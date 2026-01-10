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

// Legacy configuration functions removed. Use voice-assistant.ts instead.

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

/**
 * Initiate an outbound call via LiveKit SIP
 */
export const makeOutboundCall = async (
    chatbotId: string,
    phoneNumber: string,
    agentConfig: VoiceAgentConfig,
    agentName?: string
): Promise<LiveKitTokenResponse> => {
    const endpoint = API.ENDPOINTS.VOICE.BASE_URL() +
        API.ENDPOINTS.VOICE.MAKE_CALL().replace(":chatbotId", chatbotId);

    const requestBody = {
        phone_number: phoneNumber,
        agent_config: agentConfig,
        room_config: agentName ? { agents: [{ agent_name: agentName }] } : undefined
    };

    const res = await fetch(endpoint, {
        method: "POST",
        data: requestBody,
    }).then((res) => res.data) as ApiResponse<LiveKitTokenResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

