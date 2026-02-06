import {
    BulkImportInput,
    BulkImportResponse,
    CreateContactInput,
    CreateContactResponse,
    DeleteContactResponse,
    GetContactsQuery,
    GetContactsResponse,
    UpdateContactInput,
    UpdateContactResponse,
    ContactResponse
} from "../../types/contacts";
import { API } from "./config";
import { guardedFetch, getPath } from "./axios";
import type { AxiosRequestConfig } from "axios";

// Interface definitions that might be missing from exports or just for clarity
interface GetContactParams {
    id: string;
}

interface GetContactQuery {
    chatbotId: string;
}

interface DeleteContactParams {
    id: string;
}

interface DeleteContactQuery {
    chatbotId: string;
}

interface GetContactResponse {
    success: boolean;
    data: ContactResponse;
}


// ============================================================================
// Contact API Actions
// ============================================================================

export const getContacts = async (query: GetContactsQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_CONTACTS;
    return guardedFetch<GetContactsResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            params: query,
        }
    );
};

export const getContactsWithConfig = async (
    query: GetContactsQuery,
    config?: AxiosRequestConfig
) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_CONTACTS;
    return guardedFetch<GetContactsResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            params: query,
            ...(config || {}),
        }
    );
};

export const getContact = async (params: GetContactParams, query: GetContactQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.GET_CONTACT;
    const path = getPath(endpoint).replace(":id", params.id);
    return guardedFetch<GetContactResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "GET",
            url: path,
            params: query,
        }
    );
};

export const createContact = async (data: CreateContactInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.CREATE_CONTACT;
    return guardedFetch<CreateContactResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};

export const updateContact = async (id: string, query: GetContactQuery, data: UpdateContactInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.UPDATE_CONTACT;
    const path = getPath(endpoint).replace(":id", id);
    return guardedFetch<UpdateContactResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "PATCH",
            url: path,
            params: query,
            data,
        }
    );
};

export const deleteContact = async (params: DeleteContactParams, query: DeleteContactQuery) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.DELETE_CONTACT;
    const path = getPath(endpoint).replace(":id", params.id);
    return guardedFetch<DeleteContactResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "DELETE",
            url: path,
            params: query,
        }
    );
};

export const bulkImportContacts = async (data: BulkImportInput) => {
    const endpoint = API.ENDPOINTS.WHATSAPP.BULK_IMPORT_CONTACTS;
    return guardedFetch<BulkImportResponse>(
        endpoint,
        API.ENDPOINTS.WHATSAPP.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};
