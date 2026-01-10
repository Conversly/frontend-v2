export interface Campaign {
    id: string;
    chatbotId: string;
    name: string;
    channel: 'WHATSAPP' | 'SMS' | 'EMAIL' | 'VOICE';
    templateId: string;
    status: 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'FAILED' | 'ARCHIVED';
    scheduledAt: string | null;
    createdAt: string;
    updatedAt: string;
    stats?: CampaignStats;
}

export interface CampaignStats {
    campaignId: string;
    totalTargets: number;
    processedCount: number;
    successCount: number;
    failedCount: number;
    readCount: number;
    repliedCount: number;
    answeredCalls: number;
    avgCallDurationSec: number | null;
    callDropRate: number | null;
    totalCost: string;
    avgCostPerTarget: string | null;
    updatedAt: string;
}

export interface CreateCampaignInput {
    chatbotId: string;
    name: string;
    channel: 'WHATSAPP' | 'SMS' | 'EMAIL' | 'VOICE';
    templateId?: string;
    voiceAssistantId?: string;
    scheduledAt?: string;
    dailyLimit?: number;
    audienceFilter?: Record<string, any>;
    targetAudienceIds?: string[];
    audienceList?: {
        phoneNumber: string;
        name?: string;
        email?: string;
    }[];
}

export interface LaunchCampaignInput {
    campaignId: string;
}
