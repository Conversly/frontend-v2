import { fetch, guardedFetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import { BehaviourConfigResponse, BehaviourSectionType } from "@/types/chatbot";

/**
 * Get all behaviour configs for a chatbot
 */
export const getBehaviourConfigs = async (
    chatbotId: string
): Promise<BehaviourConfigResponse[]> => {
    const endpoint =
        API.ENDPOINTS.CHATBOT.BASE_URL() +
        API.ENDPOINTS.CHATBOT.GET_BEHAVIOUR_CONFIGS.path().replace(":chatbotId", chatbotId);

    const res = (await fetch(endpoint, {
        method: "GET",
    }).then((res) => res.data)) as ApiResponse<BehaviourConfigResponse[], Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

/**
 * Upsert a behaviour config for a chatbot section
 */
export const upsertBehaviourConfig = async (
    chatbotId: string,
    section: BehaviourSectionType,
    config: any
): Promise<BehaviourConfigResponse> => {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    // We override the path function in a shallow copy of the endpoint object 
    // to strictly enforce our parameterized replacements, ensuring guardedFetch constructs 
    // the correct final URL without us modifying core utilities.
    const resolvedEndpoint = {
        ...API.ENDPOINTS.CHATBOT.UPSERT_BEHAVIOUR_CONFIG,
        path: () => API.ENDPOINTS.CHATBOT.UPSERT_BEHAVIOUR_CONFIG.path()
            .replace(":chatbotId", chatbotId)
            .replace(":section", section)
    };

    const res = (await guardedFetch(
        resolvedEndpoint,
        API.ENDPOINTS.CHATBOT.BASE_URL(),
        {
            method: "PUT",
            data: { config },
        }
    ).then((res) => res.data)) as ApiResponse<BehaviourConfigResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};
