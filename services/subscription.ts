import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getSubscriptionPlans,
    getCurrentSubscription,
    getWorkspaceSubscription,
    cancelSubscription,
    resumeSubscription,
    createPortalSession,
    downloadInvoice
} from "@/lib/api/subscription";
import { QUERY_KEY } from "@/utils/query-key";

// --- Queries ---

export const useGetSubscriptionPlans = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SUBSCRIPTION_PLANS],
        queryFn: getSubscriptionPlans,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useGetCurrentSubscription = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION],
        queryFn: getCurrentSubscription,
    });
};

export const useGetWorkspaceSubscription = (workspaceId: string | undefined) => {
    return useQuery({
        queryKey: [QUERY_KEY.WORKSPACE_SUBSCRIPTION, workspaceId],
        queryFn: () => getWorkspaceSubscription(workspaceId!),
        enabled: !!workspaceId,
    });
};

// --- Mutations ---

export const useCancelSubscription = (workspaceId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_SUBSCRIPTION, workspaceId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION] });
        },
    });
};

export const useResumeSubscription = (workspaceId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: resumeSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WORKSPACE_SUBSCRIPTION, workspaceId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION] });
        },
    });
};

export const useCreatePortalSession = () => {
    return useMutation({
        mutationFn: (accountId: string) => createPortalSession(accountId),
    });
};

export const useDownloadInvoice = () => {
    return useMutation({
        mutationFn: (paymentId: string) => downloadInvoice(paymentId),
    });
};
