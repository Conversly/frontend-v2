import { fetch as axiosInstance } from "./axios";

export interface PhoneNumber {
    id: string;
    phoneNumber: string;
    provider: 'TWILIO' | 'VONAGE' | 'VAPI';
    label?: string;
    assistantId?: string | null;
    smsEnabled: boolean;
    createdAt: string;
}

export const getPhoneNumbers = async (botId: string): Promise<PhoneNumber[]> => {
    const response = await axiosInstance.get(`/voice/${botId}/numbers`);
    return response.data;
};

export const importPhoneNumber = async (botId: string, data: {
    phoneNumber: string,
    provider: string,
    credentials: any,
    label?: string
}): Promise<PhoneNumber> => {
    const response = await axiosInstance.post(`/voice/${botId}/numbers`, data);
    return response.data;
};

export const updatePhoneNumber = async (botId: string, numberId: string, data: {
    label?: string;
    assistantId?: string | null;
}): Promise<PhoneNumber> => {
    const response = await axiosInstance.patch(`/voice/${botId}/numbers/${numberId}`, data);
    return response.data;
};

export const deletePhoneNumber = async (botId: string, numberId: string): Promise<void> => {
    await axiosInstance.delete(`/voice/${botId}/numbers/${numberId}`);
};
