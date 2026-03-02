import { guardedFetch } from "./axios";
import { API, ApiResponse } from "./config";
import {
    LeadForm,
    SubmitLeadInput,
    UpsertLeadFormConfigInput
} from "@/types/lead-forms";
import { CreateLeadResponse } from "@/types/leads";

export const getLeadFormConfig = async (chatbotId: string): Promise<LeadForm | null> => {
    const resolvedEndpoint = {
        ...API.ENDPOINTS.LEAD_FORMS.GET_CONFIG,
        path: () => API.ENDPOINTS.LEAD_FORMS.GET_CONFIG.path().replace(":chatbotId", chatbotId)
    };

    const res = (await guardedFetch<LeadForm>(
        resolvedEndpoint,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "GET",
        }
    ).then((res) => res.data)) as ApiResponse<LeadForm, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

export const upsertLeadFormConfig = async (data: UpsertLeadFormConfigInput): Promise<LeadForm> => {
    const res = (await guardedFetch<LeadForm>(
        API.ENDPOINTS.LEAD_FORMS.UPSERT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "POST",
            data,
        }
    ).then((res) => res.data)) as ApiResponse<LeadForm, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

export const submitLeadForm = async (data: SubmitLeadInput): Promise<CreateLeadResponse> => {
    const res = (await guardedFetch<CreateLeadResponse>(
        API.ENDPOINTS.LEAD_FORMS.SUBMIT,
        API.ENDPOINTS.LEAD_FORMS.BASE_URL(),
        {
            method: "POST",
            data,
        }
    ).then((res) => res.data)) as ApiResponse<CreateLeadResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};
