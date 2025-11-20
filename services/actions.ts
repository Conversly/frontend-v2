import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCustomAction,
    deleteCustomAction,
    getActionTemplates,
    getCustomAction,
    getCustomActions,
    testCustomAction,
    toggleCustomAction,
    updateCustomAction,
} from "@/lib/api/actions";
import {
    CreateCustomActionInput,
    GetActionsQuery,
    GetTemplatesQuery,
    TestActionInput,
    ToggleActionInput,
    UpdateCustomActionInput,
} from "@/types/customActions";
import { toast } from "sonner";

export const useCustomActions = (query: GetActionsQuery) => {
    return useQuery({
        queryKey: ["custom-actions", query],
        queryFn: () => getCustomActions(query),
    });
};

export const useCustomAction = (chatbotId: string, actionId: string) => {
    return useQuery({
        queryKey: ["custom-action", chatbotId, actionId],
        queryFn: () => getCustomAction(chatbotId, actionId),
        enabled: !!actionId,
    });
};

export const useCreateCustomAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCustomActionInput) => createCustomAction(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["custom-actions", { chatbotId: variables.chatbotId }],
            });
            toast.success("Custom action created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

export const useUpdateCustomAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCustomActionInput) => updateCustomAction(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["custom-actions", { chatbotId: variables.chatbotId }],
            });
            queryClient.invalidateQueries({
                queryKey: ["custom-action", variables.chatbotId, variables.actionId],
            });
            toast.success("Custom action updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

export const useDeleteCustomAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            chatbotId,
            actionId,
        }: {
            chatbotId: string;
            actionId: string;
        }) => deleteCustomAction(chatbotId, actionId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["custom-actions", { chatbotId: variables.chatbotId }],
            });
            toast.success("Custom action deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

export const useToggleCustomAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ToggleActionInput) => toggleCustomAction(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["custom-actions", { chatbotId: variables.chatbotId }],
            });
            toast.success(
                `Custom action ${variables.isEnabled ? "enabled" : "disabled"} successfully`
            );
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

export const useTestCustomAction = () => {
    return useMutation({
        mutationFn: (data: TestActionInput) => testCustomAction(data),
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

export const useActionTemplates = (query?: GetTemplatesQuery) => {
    return useQuery({
        queryKey: ["action-templates", query],
        queryFn: () => getActionTemplates(query),
    });
};
