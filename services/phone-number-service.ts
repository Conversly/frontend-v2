import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPhoneNumbers, importPhoneNumber, updatePhoneNumber, deletePhoneNumber, PhoneNumber } from "@/lib/api/phone-numbers";

export const usePhoneNumbers = (botId: string) => {
    return useQuery({
        queryKey: ['voice', botId, 'phone-numbers'],
        queryFn: () => getPhoneNumbers(botId),
    });
};

export const useImportPhoneNumber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ botId, data }: { botId: string, data: any }) => importPhoneNumber(botId, data),
        onSuccess: (_, { botId }) => {
            queryClient.invalidateQueries({ queryKey: ['voice', botId, 'phone-numbers'] });
        },
    });
};

export const useUpdatePhoneNumber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ botId, numberId, data }: { botId: string, numberId: string, data: any }) => updatePhoneNumber(botId, numberId, data),
        onSuccess: (_, { botId }) => {
            queryClient.invalidateQueries({ queryKey: ['voice', botId, 'phone-numbers'] });
        },
    });
};

export const useDeletePhoneNumber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ botId, numberId }: { botId: string, numberId: string }) => deletePhoneNumber(botId, numberId),
        onSuccess: (_, { botId }) => {
            queryClient.invalidateQueries({ queryKey: ['voice', botId, 'phone-numbers'] });
        },
    });
};
