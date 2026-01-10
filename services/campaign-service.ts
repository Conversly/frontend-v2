import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCampaigns,
    getCampaign,
    createCampaign,
    launchCampaign
} from "@/lib/api/campaign";
import { CreateCampaignInput } from "@/types/campaign";

export const useCampaigns = (chatbotId: string) => {
    return useQuery({
        queryKey: ["campaigns", chatbotId],
        queryFn: () => getCampaigns(chatbotId),
        enabled: !!chatbotId,
    });
};

export const useCampaign = (campaignId: string) => {
    return useQuery({
        queryKey: ["campaign", campaignId],
        queryFn: () => getCampaign(campaignId),
        enabled: !!campaignId,
    });
};

export const useCreateCampaign = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCampaignInput) => createCampaign(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["campaigns", variables.chatbotId] });
        },
    });
};

export const useLaunchCampaign = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (campaignId: string) => launchCampaign(campaignId),
        onSuccess: () => {
            // Invalidate specific campaign or all
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
    });
};
