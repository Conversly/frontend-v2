import {
    createTemplate,
    deleteTemplate,
    generateTemplates,
    getDefaultTemplates,
    getTemplate,
    getTemplates,
    syncTemplates,
    updateTemplate,
} from "@/lib/api/template";
import { QUERY_KEY } from "@/utils/query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
    CreateTemplateInput,
    GetTemplatesQuery,
    UpdateTemplateInput
} from "@/types/templates";

// GenerateTemplateInput was defined locally in api/template.ts
interface GenerateTemplateInput {
    prompt: string;
    language: string;
    style?: 'Normal' | 'Poetic' | 'Exciting' | 'Funny';
    optimizeFor?: 'Click Rate' | 'Reply Rate';
}

export const useGetTemplates = (query: GetTemplatesQuery) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_TEMPLATES, query.chatbotId, query.channel, query.status, query.limit, query.offset],
        queryFn: async () => {
            const res = await getTemplates(query);
            return res.data?.data || [];
        },
        enabled: !!query.chatbotId,
    });
};

export const useGetTemplate = (id: string, chatbotId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_TEMPLATE, id, chatbotId],
        queryFn: () => getTemplate({ id }, { chatbotId }),
        enabled: !!id && !!chatbotId,
    });
};

export const useCreateTemplate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTemplateInput) => createTemplate(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_TEMPLATES, variables.chatbotId],
            });
        },
    });
};

export const useUpdateTemplate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            chatbotId,
            data
        }: {
            id: string;
            chatbotId: string;
            data: UpdateTemplateInput
        }) => updateTemplate(id, { chatbotId }, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_TEMPLATES, variables.chatbotId],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_TEMPLATE, variables.id, variables.chatbotId],
            });
        },
    });
};

export const useDeleteTemplate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, chatbotId }: { id: string; chatbotId: string }) =>
            deleteTemplate({ id }, { chatbotId }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_TEMPLATES, variables.chatbotId],
            });
        },
    });
};

export const useGetDefaultTemplates = (chatbotId: string) => {
    return useQuery({
        queryKey: ['GET_DEFAULT_TEMPLATES', chatbotId],
        queryFn: async () => {
            const res = await getDefaultTemplates({ chatbotId });
            return res.data;
        },
        enabled: !!chatbotId,
    });
};

export const useSyncTemplates = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { chatbotId: string }) => syncTemplates(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_TEMPLATES, variables.chatbotId],
            });
            queryClient.invalidateQueries({
                queryKey: ['GET_DEFAULT_TEMPLATES', variables.chatbotId],
            });
        },
    });
};

export const useGenerateTemplates = () => {
    return useMutation({
        mutationFn: (data: GenerateTemplateInput) => generateTemplates(data),
    });
};
