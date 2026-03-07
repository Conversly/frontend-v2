import {
    claimEscalation,
    closeEscalation,
    convertToTicket,
    handleAbsence,
    resolveEscalation,
    transferEscalation,
} from "@/lib/api/escalate";
import { QUERY_KEY } from "@/utils/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    ClaimEscalationInput,
    CloseEscalationInput,
    ConvertToTicketInput,
    HandleAbsenceInput,
    ResolveEscalationInput,
    TransferEscalationInput,
} from "@/types/escalate";

export const useClaimEscalation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: ClaimEscalationInput) => claimEscalation(input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS] });
            queryClient.invalidateQueries({ queryKey: ["ACTIVITY_ESCALATION", variables.escalationId] });
        },
    });
};

export const useResolveEscalation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: ResolveEscalationInput) => resolveEscalation(input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS] });
            queryClient.invalidateQueries({ queryKey: ["ACTIVITY_ESCALATION", variables.escalationId] });
        },
    });
};

export const useTransferEscalation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: TransferEscalationInput) => transferEscalation(input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS] });
            queryClient.invalidateQueries({ queryKey: ["ACTIVITY_ESCALATION", variables.escalationId] });
        },
    });
};

export const useConvertToTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: ConvertToTicketInput) => convertToTicket(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TICKETS] });
        },
    });
};

export const useCloseEscalation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CloseEscalationInput) => closeEscalation(input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY_ESCALATIONS] });
            queryClient.invalidateQueries({ queryKey: ["ACTIVITY_ESCALATION", variables.escalationId] });
        },
    });
};

export const useHandleAbsence = () => {
    return useMutation({
        mutationFn: (data: HandleAbsenceInput) => handleAbsence(data),
    });
};
