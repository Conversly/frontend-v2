import { guardedFetch } from "./axios";
import { API } from "./config";
import type {
    HandleAbsenceInput,
    HandleAbsenceResponse,
    ClaimEscalationInput,
    ClaimEscalationResponse,
    ResolveEscalationInput,
    ResolveEscalationResponse,
    TransferEscalationInput,
    TransferEscalationResponse,
    ConvertToTicketInput,
    ConvertToTicketResponse,
    CloseEscalationInput,
    CloseEscalationResponse,
} from "@/types/escalate";

/**
 * Fill path parameters in an API template.
 * Example: "/:id" with { id: "123" } -> "/123"
 */
function fillPath(pathTemplate: string, params: Record<string, string>): string {
    let out = pathTemplate;
    for (const [k, v] of Object.entries(params)) {
        out = out.replaceAll(`:${k}`, encodeURIComponent(v));
    }
    return out;
}

export const handleAbsence = async (data: HandleAbsenceInput) => {
    const endpoint = API.ENDPOINTS.ESCALATE.HANDLE_ABSENCE;
    return guardedFetch<HandleAbsenceResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data,
        }
    );
};

export const claimEscalation = async (input: ClaimEscalationInput) => {
    const { escalationId } = input;
    const endpoint = { ...API.ENDPOINTS.ESCALATE.CLAIM };
    // We need to override the path function to include the ID
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { escalationId });

    return guardedFetch<ClaimEscalationResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data: {},
        }
    );
};

export const resolveEscalation = async (input: ResolveEscalationInput) => {
    const { escalationId } = input;
    const endpoint = { ...API.ENDPOINTS.ESCALATE.RESOLVE };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { escalationId });

    return guardedFetch<ResolveEscalationResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data: {},
        }
    );
};

export const transferEscalation = async (input: TransferEscalationInput) => {
    const { escalationId, targetAgentUserId } = input;
    const endpoint = { ...API.ENDPOINTS.ESCALATE.TRANSFER };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { escalationId });

    return guardedFetch<TransferEscalationResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data: { targetAgentUserId },
        }
    );
};

export const convertToTicket = async (input: ConvertToTicketInput) => {
    const { escalationId, subject, title, description, priority } = input;
    const endpoint = { ...API.ENDPOINTS.ESCALATE.CONVERT_TO_TICKET };
    const originalPath = endpoint.path();
    endpoint.path = () => fillPath(originalPath, { escalationId });

    return guardedFetch<ConvertToTicketResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data: { subject: subject ?? title, title, description, priority },
        }
    );
};

export const closeEscalation = async (input: CloseEscalationInput) => {
    const { escalationId } = input;
    const endpoint = { ...API.ENDPOINTS.ESCALATE.RESOLVE };
    const originalPath = endpoint.path();
    // Close reuses the resolve endpoint but the conversation state will be CLOSED.
    // If a dedicated /close endpoint is later added, swap RESOLVE -> CLOSE here.
    endpoint.path = () => fillPath(originalPath, { escalationId });

    return guardedFetch<CloseEscalationResponse>(
        endpoint,
        API.ENDPOINTS.ESCALATE.BASE_URL(),
        {
            method: "POST",
            data: { action: "close" },
        }
    );
};
