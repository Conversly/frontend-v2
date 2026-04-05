import { guardedFetch } from "./axios";
import { API } from "./config";
import { GetLeadsQuery, GetLeadsResponse, ExportLeadsQuery } from "@/types/leads";

export const getLeads = async (query: GetLeadsQuery) => {
    const endpoint = API.ENDPOINTS.LEADS.GET_LEADS;
    return guardedFetch<GetLeadsResponse>(
        endpoint,
        API.ENDPOINTS.LEADS.BASE_URL(),
        {
            method: "GET",
            params: query,
        }
    );
};

export const exportLeadsCsv = async (query: ExportLeadsQuery) => {
    const endpoint = API.ENDPOINTS.LEADS.EXPORT;
    const response = await guardedFetch<Blob>(
        endpoint,
        API.ENDPOINTS.LEADS.BASE_URL(),
        {
            method: "GET",
            params: query,
            responseType: "blob",
        }
    );
    return response.data;
};
