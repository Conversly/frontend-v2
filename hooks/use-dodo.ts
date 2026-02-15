
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCheckoutSession, createPortalSession, getUsage, getPlans } from "@/lib/api/dodo";
import { CreateCheckoutInput, CreatePortalInput } from "@/types/dodo";

export const usePlans = () => {
    return useQuery({
        queryKey: ["plans"],
        queryFn: () => getPlans(),
    });
};

export const useCheckout = () => {
    return useMutation({
        mutationFn: (input: CreateCheckoutInput) => createCheckoutSession(input),
    });
};

export const usePortal = () => {
    return useMutation({
        mutationFn: (input: CreatePortalInput) => createPortalSession(input),
    });
};

export const useUsage = (accountId: string | undefined) => {
    return useQuery({
        queryKey: ["usage", accountId],
        queryFn: () => getUsage(accountId!),
        enabled: !!accountId,
    });
};
