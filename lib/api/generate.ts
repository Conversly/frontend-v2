import { guardedFetch } from "./axios";
import { API } from "./config";

export type ImproveAction =
    | "expand"
    | "rephrase"
    | "fix-grammar"
    | "more-friendly"
    | "more-formal"
    | "predict"
    | "copilot";

export interface ImproveMessageInput {
    text: string;
    action: ImproveAction;
    conversationContext?: string;
}

export interface ImproveMessageResponse {
    success: boolean;
    data: { improvedText: string };
}

export const improveMessage = async (input: ImproveMessageInput): Promise<ImproveMessageResponse> => {
    const endpoint = API.ENDPOINTS.GENERATE.IMPROVE_MESSAGE;
    return guardedFetch<ImproveMessageResponse>(
        endpoint,
        API.ENDPOINTS.GENERATE.BASE_URL(),
        {
            method: "POST",
            data: input,
        },
    );
};
