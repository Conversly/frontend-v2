import {
    bulkImportContacts,
    createContact,
    deleteContact,
    getContact,
    getContacts,
    updateContact,
} from "@/lib/api/contacts";
import { QUERY_KEY } from "@/utils/query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
    BulkImportInput,
    CreateContactInput,
    GetContactsQuery,
    UpdateContactInput
} from "@/types/contacts";

export const useGetContacts = (query: GetContactsQuery) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_CONTACTS, query.chatbotId, query.search, query.limit, query.offset],
        queryFn: async () => {
            const res = await getContacts(query);
            return res.data?.data || [];
        },
        enabled: !!query.chatbotId,
    });
};

export const useGetContact = (id: string, chatbotId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_CONTACT, id, chatbotId],
        queryFn: () => getContact({ id }, { chatbotId }),
        enabled: !!id && !!chatbotId,
    });
};

export const useCreateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateContactInput) => createContact(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CONTACTS, variables.chatbotId],
            });
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            chatbotId,
            data
        }: {
            id: string;
            chatbotId: string;
            data: UpdateContactInput
        }) => updateContact(id, { chatbotId }, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CONTACTS, variables.chatbotId],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CONTACT, variables.id, variables.chatbotId],
            });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, chatbotId }: { id: string; chatbotId: string }) =>
            deleteContact({ id }, { chatbotId }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CONTACTS, variables.chatbotId],
            });
        },
    });
};

export const useBulkImportContacts = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BulkImportInput) => bulkImportContacts(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CONTACTS, variables.chatbotId],
            });
        }
    });
};
