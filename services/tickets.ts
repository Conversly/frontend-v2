import {
    listTickets,
    getTicket,
    updateTicket,
    assignTicket,
    resolveTicket,
    closeTicket,
} from "@/lib/api/tickets";
import { QUERY_KEY } from "@/utils/query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
    ListTicketsQuery,
    ListTicketsResponse,
    GetTicketResponse,
    UpdateTicketInput,
    AssignTicketInput,
} from "@/types/tickets";

export const useGetTickets = (query: ListTicketsQuery) => {
    return useQuery<ListTicketsResponse>({
        queryKey: [
            QUERY_KEY.GET_TICKETS,
            query.workspaceId,
            query.status,
            query.priority,
            query.assignedAgentUserId,
            query.search,
            query.page,
            query.limit
        ],
        queryFn: async () => {
            const res = await listTickets(query);
            return res.data;
        },
        enabled: !!query.workspaceId,
    });
};

export const useGetTicket = (ticketId: string) => {
    return useQuery<GetTicketResponse["data"]>({
        queryKey: [QUERY_KEY.GET_TICKET, ticketId],
        queryFn: async () => {
            const res = await getTicket(ticketId);
            return res.data.data;
        },
        enabled: !!ticketId,
    });
};

export const useUpdateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ ticketId, data }: { ticketId: string; data: UpdateTicketInput }) =>
            updateTicket(ticketId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKETS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKET, variables.ticketId] });
        },
    });
};

export const useAssignTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ ticketId, input }: { ticketId: string; input: AssignTicketInput }) =>
            assignTicket(ticketId, input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKETS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKET, variables.ticketId] });
        },
    });
};

export const useResolveTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ticketId: string) => resolveTicket(ticketId),
        onSuccess: (_, ticketId) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKETS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKET, ticketId] });
        },
    });
};

export const useCloseTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ticketId: string) => closeTicket(ticketId),
        onSuccess: (_, ticketId) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKETS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKET, ticketId] });
        },
    });
};
