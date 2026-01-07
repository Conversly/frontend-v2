import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getVoiceConfig,
    updateVoiceConfig,
    deleteVoiceConfig,
    getVoiceWidgetConfig,
    getVoiceCallSessions,
    generateVoiceToken,
    makeOutboundCall
} from "@/lib/api/voice";
import { UpdateVoiceConfigInput, VoiceAgentConfig } from "@/types/voice";

export const useVoiceConfig = (chatbotId: string) => {
    return useQuery({
        queryKey: ["voiceConfig", chatbotId],
        queryFn: () => getVoiceConfig(chatbotId),
        enabled: !!chatbotId,
    });
};

export const useUpdateVoiceConfig = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            chatbotId,
            data,
        }: {
            chatbotId: string;
            data: UpdateVoiceConfigInput;
        }) => updateVoiceConfig(chatbotId, data),
        onSuccess: (_, { chatbotId }) => {
            queryClient.invalidateQueries({ queryKey: ["voiceConfig", chatbotId] });
        },
    });
};

export const useDeleteVoiceConfig = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatbotId: string) => deleteVoiceConfig(chatbotId),
        onSuccess: (_, chatbotId) => {
            queryClient.invalidateQueries({ queryKey: ["voiceConfig", chatbotId] });
        },
    });
};

export const useVoiceWidgetConfig = (chatbotId: string) => {
    return useQuery({
        queryKey: ["voiceWidgetConfig", chatbotId],
        queryFn: () => getVoiceWidgetConfig(chatbotId),
        enabled: !!chatbotId,
    });
};

export const useVoiceCallSessions = (chatbotId: string) => {
    return useQuery({
        queryKey: ["voiceCallSessions", chatbotId],
        queryFn: () => getVoiceCallSessions(chatbotId),
        enabled: !!chatbotId,
    });
};

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
