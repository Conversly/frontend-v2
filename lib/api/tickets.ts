import { guardedFetch } from "./axios";
import { API } from "./config";
import type {
    ListTicketsQuery,
    ListTicketsResponse,
    GetTicketResponse,
    UpdateTicketInput,
    UpdateTicketResponse,
    AssignTicketInput,
    AssignTicketResponse,
    ResolveTicketResponse,
    CloseTicketResponse,
} from "@/types/tickets";

/**
 * Fill path parameters in an API template.
 */
function fillPath(pathTemplate: string, params: Record<string, string>): string {
    let out = pathTemplate;
    for (const [k, v] of Object.entries(params)) {
        out = out.replaceAll(`:${k}`, encodeURIComponent(v));
    }
    return out;
}

export const listTickets = async (query: ListTicketsQuery) => {
    const endpoint = API.ENDPOINTS.TICKETS.LIST;
    return guardedFetch<ListTicketsResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "GET",
            params: query,
        }
    );
};

export const getTicket = async (ticketId: string) => {
    const endpoint = { ...API.ENDPOINTS.TICKETS.GET };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { ticketId });

    return guardedFetch<GetTicketResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "GET",
        }
    );
};

export const updateTicket = async (ticketId: string, data: UpdateTicketInput) => {
    const endpoint = { ...API.ENDPOINTS.TICKETS.UPDATE };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { ticketId });

    return guardedFetch<UpdateTicketResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "PATCH",
            data,
        }
    );
};

export const assignTicket = async (ticketId: string, input: AssignTicketInput) => {
    const endpoint = { ...API.ENDPOINTS.TICKETS.ASSIGN };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { ticketId });

    return guardedFetch<AssignTicketResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "POST",
            data: input,
        }
    );
};

export const resolveTicket = async (ticketId: string) => {
    const endpoint = { ...API.ENDPOINTS.TICKETS.RESOLVE };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { ticketId });

    return guardedFetch<ResolveTicketResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "POST",
            data: {},
        }
    );
};

export const closeTicket = async (ticketId: string) => {
    const endpoint = { ...API.ENDPOINTS.TICKETS.CLOSE };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { ticketId });

    return guardedFetch<CloseTicketResponse>(
        endpoint,
        API.ENDPOINTS.TICKETS.BASE_URL(),
        {
            method: "POST",
            data: {},
        }
    );
};
