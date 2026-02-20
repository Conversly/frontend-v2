import { guardedFetch } from "./axios";
import { API } from "./config";
import {
    LeadFormResponse,
    SubmitLeadInput,
    UpsertLeadFormConfigInput
} from "@/types/lead-forms";
import { CreateLeadResponse } from "@/types/leads";

export const getLeadFormConfig = async (chatbotId: string) => {
    const resolvedEndpoint = {
        ...API.ENDPOINTS.LEAD_FORMS.GET_CONFIG,
        path: () => API.ENDPOINTS.LEAD_FORMS.GET_CONFIG.path().replace(":chatbotId", chatbotId)
    };

    return guardedFetch<LeadFormResponse>(
        resolvedEndpoint,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "GET",
        }
    );
};

export const upsertLeadFormConfig = async (data: UpsertLeadFormConfigInput) => {
    return guardedFetch<LeadFormResponse>(
        API.ENDPOINTS.LEAD_FORMS.UPSERT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};

export const submitLeadForm = async (data: SubmitLeadInput) => {
    return guardedFetch<CreateLeadResponse>(
        API.ENDPOINTS.LEAD_FORMS.SUBMIT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};
