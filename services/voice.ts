import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    generateVoiceToken,
    makeOutboundCall
} from "@/lib/api/voice";
import { VoiceAgentConfig } from "@/types/voice";

// Legacy hooks removed. Use voice-assistant-service.ts instead.

/**
 * React Query mutation for generating a LiveKit voice token
 * Used to initiate a voice call with the agent
 */
export const useGenerateVoiceToken = () => {
    return useMutation({
        mutationFn: ({
            chatbotId,
            agentConfig,
            agentName,
        }: {
            chatbotId: string;
            agentConfig: VoiceAgentConfig;
            agentName?: string;
        }) => generateVoiceToken(chatbotId, agentConfig, agentName),
    });
};

/**
 * React Query mutation for initiating an outbound call
 */
export const useMakeOutboundCall = () => {
    return useMutation({
        mutationFn: ({
            chatbotId,
            phoneNumber,
            agentConfig,
            agentName,
        }: {
            chatbotId: string;
            phoneNumber: string;
            agentConfig: VoiceAgentConfig;
            agentName?: string;
        }) => makeOutboundCall(chatbotId, phoneNumber, agentConfig, agentName),
    });
};
