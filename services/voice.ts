import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getVoiceConfig,
    updateVoiceConfig,
    deleteVoiceConfig,
    getVoiceWidgetConfig,
    getVoiceCallSessions,
} from "@/lib/api/voice";
import { UpdateVoiceConfigInput } from "@/types/voice";

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
