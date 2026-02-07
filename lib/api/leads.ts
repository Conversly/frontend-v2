import { guardedFetch } from "./axios";
import { API } from "./config";
import { GetLeadsQuery, GetLeadsResponse } from "@/types/leads";

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
