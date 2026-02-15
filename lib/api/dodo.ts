
import { fetch, guardedFetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
    CreateCheckoutInput,
    CreateCheckoutResponse,
    CreatePortalInput,
    CreatePortalResponse,
    UsageResponse,
    Plan
} from "@/types/dodo";

export const getPlans = async (): Promise<Plan[]> => {
    const res = (await fetch(
        API.ENDPOINTS.DODO.BASE_URL() + API.ENDPOINTS.DODO.PLANS.path(),
        {
            method: "GET",
        }
    ).then((res) => res.data)) as ApiResponse<Plan[], Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

export const createCheckoutSession = async (input: CreateCheckoutInput): Promise<CreateCheckoutResponse> => {
    const res = (await fetch(
        API.ENDPOINTS.DODO.BASE_URL() + API.ENDPOINTS.DODO.CHECKOUT.path(),
        {
            method: "POST",
            data: input,
        }
    ).then((res) => res.data)) as ApiResponse<CreateCheckoutResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

export const createPortalSession = async (input: CreatePortalInput): Promise<CreatePortalResponse> => {
    const res = (await fetch(
        API.ENDPOINTS.DODO.BASE_URL() + API.ENDPOINTS.DODO.PORTAL.path(),
        {
            method: "POST",
            data: input,
        }
    ).then((res) => res.data)) as ApiResponse<CreatePortalResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};

export const getUsage = async (accountId: string): Promise<UsageResponse> => {
    const endpoint = API.ENDPOINTS.DODO.USAGE.path().replace(":accountId", accountId);
    const res = (await fetch(
        API.ENDPOINTS.DODO.BASE_URL() + endpoint,
        {
            method: "GET",
        }
    ).then((res) => res.data)) as ApiResponse<UsageResponse, Error>;

    if (!res.success) {
        throw new Error(res.message);
    }
    return res.data;
};
