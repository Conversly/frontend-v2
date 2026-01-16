import { API, ApiResponse } from "@/lib/api/config";

export interface CreateCreditRequestInput {
    chatbotId: string;
    amount: number;
    reason: string;
}

export const createCreditRequest = async (input: CreateCreditRequestInput): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, this would POST to an endpoint
    console.log("Credit request submitted:", input);

    // Mock success
    return;
};
