import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAssistants,
    getAssistant,
    createAssistant,
    updateAssistant,
    updateBehavior,
    updateProvider,
    generateAssistantToken,
    makeOutboundCall
} from "@/lib/api/voice-assistant";
import {
    CreateVoiceAssistantInput,
    UpdateVoiceAssistantInput,
    UpdateVoiceAssistantBehaviorInput,
    UpdateVoiceAssistantProviderInput
} from "@/types/voice-assistant";

export const useAssistants = (chatbotId: string) => {
    return useQuery({
        queryKey: ["voice-assistants", chatbotId],
        queryFn: () => getAssistants(chatbotId),
        enabled: !!chatbotId,
    });
};

export const useAssistant = (assistantId: string) => {
    return useQuery({
        queryKey: ["voice-assistant", assistantId],
        queryFn: () => getAssistant(assistantId),
        enabled: !!assistantId,
    });
};

export const useCreateAssistant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateVoiceAssistantInput) => createAssistant(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["voice-assistants", variables.chatbotId] });
        },
    });
};

export const useUpdateAssistant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ assistantId, data }: { assistantId: string; data: UpdateVoiceAssistantInput }) =>
            updateAssistant(assistantId, data),
        onMutate: async ({ assistantId, data }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["voice-assistant", assistantId] });

            // Snapshot previous value
            const previousAssistant = queryClient.getQueryData(["voice-assistant", assistantId]);

            // Optimistically update
            queryClient.setQueryData(["voice-assistant", assistantId], (old: any) => {
                if (!old) return old;
                return { ...old, ...data };
            });

            return { previousAssistant };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousAssistant) {
                queryClient.setQueryData(["voice-assistant", newTodo.assistantId], context.previousAssistant);
            }
        },
        onSettled: (_, __, { assistantId }) => {
            queryClient.invalidateQueries({ queryKey: ["voice-assistant", assistantId] });
            queryClient.invalidateQueries({ queryKey: ["voice-assistants"] });
        },
    });
};

export const useUpdateBehavior = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ assistantId, data }: { assistantId: string; data: UpdateVoiceAssistantBehaviorInput }) =>
            updateBehavior(assistantId, data),
        onMutate: async ({ assistantId, data }) => {
            await queryClient.cancelQueries({ queryKey: ["voice-assistant", assistantId] });
            const previousAssistant = queryClient.getQueryData(["voice-assistant", assistantId]);

            queryClient.setQueryData(["voice-assistant", assistantId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    behavior: { ...old.behavior, ...data }
                };
            });

            return { previousAssistant };
        },
        onError: (err, variables, context) => {
            if (context?.previousAssistant) {
                queryClient.setQueryData(["voice-assistant", variables.assistantId], context.previousAssistant);
            }
        },
        onSettled: (_, __, { assistantId }) => {
            queryClient.invalidateQueries({ queryKey: ["voice-assistant", assistantId] });
        },
    });
};

export const useUpdateProvider = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ assistantId, data }: { assistantId: string; data: UpdateVoiceAssistantProviderInput }) =>
            updateProvider(assistantId, data),
        onMutate: async ({ assistantId, data }) => {
            await queryClient.cancelQueries({ queryKey: ["voice-assistant", assistantId] });
            const previousAssistant = queryClient.getQueryData<any>(["voice-assistant", assistantId]);

            queryClient.setQueryData(["voice-assistant", assistantId], (old: any) => {
                if (!old || !old.providers) return old;

                // Deep update of the specific provider in the array
                const newProviders = old.providers.map((p: any) => {
                    if (p.capabilityType === data.capabilityType) {
                        // Merge config if present
                        const mergedConfig = data.config ? { ...p.config, ...data.config } : p.config;
                        return { ...p, ...data, config: mergedConfig };
                    }
                    return p;
                });

                return { ...old, providers: newProviders };
            });

            return { previousAssistant };
        },
        onError: (err, variables, context) => {
            if (context?.previousAssistant) {
                queryClient.setQueryData(["voice-assistant", variables.assistantId], context.previousAssistant);
            }
        },
        onSettled: (_, __, { assistantId }) => {
            queryClient.invalidateQueries({ queryKey: ["voice-assistant", assistantId] });
        },
    });
};

export const useMakeOutboundCall = () => {
    return useMutation({
        mutationFn: ({ assistantId, phoneNumber }: { assistantId: string; phoneNumber: string }) =>
            makeOutboundCall(assistantId, phoneNumber),
    });
};

export const useGenerateAssistantToken = () => {
    return useMutation({
        mutationFn: (assistantId: string) => generateAssistantToken(assistantId),
    });
};
