import { api } from "./axios";
import { Campaign, CreateCampaignInput, LaunchCampaignInput } from "@/types/campaign";

export const getCampaigns = async (chatbotId: string): Promise<Campaign[]> => {
    const { data } = await api.get(`/campaigns?chatbotId=${chatbotId}`);
    return data;
};

export const createCampaign = async (input: CreateCampaignInput): Promise<Campaign> => {
    const { data } = await api.post("/campaigns", input);
    return data;
};

export const launchCampaign = async (campaignId: string): Promise<{ success: boolean; processed: number; message: string }> => {
    const { data } = await api.post(`/campaigns/${campaignId}/launch`);
    return data;
};

export const getCampaign = async (campaignId: string): Promise<Campaign> => {
    const { data } = await api.get(`/campaigns/${campaignId}`);
    return data;
};
