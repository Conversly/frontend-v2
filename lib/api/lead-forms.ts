import { guardedFetch } from "./axios";
import { API } from "./config";
import {
    LeadFormResponse,
    SubmitLeadInput,
    UpsertLeadFormConfigInput
} from "@/types/lead-forms";
import { CreateLeadResponse } from "@/types/leads";

export const getLeadFormConfig = async (chatbotId: string) => {
    const endpoint = API.ENDPOINTS.LEAD_FORMS.GET_CONFIG;
    // Replace :chatbotId in the path
    // Since guardedFetch doesn't automatically replace path params if we pass them as a separate arg in a standard way unless we handle it.
    // However, looking at other api files, it seems `endpoint.path()` returns the string with `:chatbotId`.
    // We need to construct the URL manually if `guardedFetch` doesn't do interpolation. 
    // Looking at `config.ts`, `allMode(() => "/:chatbotId")`.
    // I should check `client_v2/lib/api/chatbot.ts` or similar to see how they handle path params. 
    // Assuming we need to replace it.

    // Actually, `API.ENDPOINTS.LEAD_FORMS.BASE_URL()` returns `/lead-forms`.
    // `GET_CONFIG.path()` returns `/:chatbotId`.
    // So the full path is `/lead-forms/:chatbotId`.

    // A safe way is to construct the path string.
    const path = API.ENDPOINTS.LEAD_FORMS.GET_CONFIG.path().replace(":chatbotId", chatbotId);

    return guardedFetch<LeadFormResponse>(
        API.ENDPOINTS.LEAD_FORMS.GET_CONFIG,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL() + path,
        {
            method: "GET",
        }
    );
};

export const upsertLeadFormConfig = async (data: UpsertLeadFormConfigInput) => {
    return guardedFetch<LeadFormResponse>(
        API.ENDPOINTS.LEAD_FORMS.UPSERT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL() + API.ENDPOINTS.LEAD_FORMS.UPSERT.path(),
        {
            method: "POST",
            data,
        }
    );
};

export const submitLeadForm = async (data: SubmitLeadInput) => {
    return guardedFetch<CreateLeadResponse>(
        API.ENDPOINTS.LEAD_FORMS.SUBMIT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL() + API.ENDPOINTS.LEAD_FORMS.SUBMIT.path(),
        {
            method: "POST",
            data,
        }
    );
};
