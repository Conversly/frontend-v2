import { guardedFetch, fetch } from "./axios";
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
import type {
    ConversationState,
    EscalationItem,
    GetEscalationResponse,
    GetEscalationsResponse,
    MarkEscalationReadResponse,
} from "@/types/activity";

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

// ─── Escalation Listing & Details (moved from activity.ts) ──────────────────

function buildQuery(params: Record<string, string | number | undefined | null>): string {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === "") continue;
        qs.set(k, String(v));
    }
    const s = qs.toString();
    return s ? `?${s}` : "";
}

export async function listEscalations(params: {
    chatbotId: string;
    mine?: boolean;
    status?: ConversationState;
    limit?: number;
}): Promise<EscalationItem[]> {
    try {
        const { chatbotId, mine, status, limit } = params;
        if (!chatbotId || chatbotId.trim() === "") {
            throw new Error("chatbotId is required");
        }

        const endpoint =
            API.ENDPOINTS.ESCALATE.BASE_URL() + API.ENDPOINTS.ESCALATE.LIST.path();
        const url = `${endpoint}${buildQuery({ chatbotId, mine: mine ? "true" : undefined, status, limit })}`;

        const res = (await fetch(url, { method: "GET" }).then((r) => r.data)) as GetEscalationsResponse;
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch escalations");
    }
}

export async function getEscalation(escalationId: string): Promise<GetEscalationResponse["data"]> {
    try {
        if (!escalationId || !escalationId.trim()) {
            throw new Error("escalationId is required");
        }

        const endpoint =
            API.ENDPOINTS.ESCALATE.BASE_URL() +
            fillPath(API.ENDPOINTS.ESCALATE.GET.path(), { escalationId });
        const res = (await fetch(endpoint, { method: "GET" }).then((r) => r.data)) as GetEscalationResponse;
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch escalation");
    }
}

export async function markEscalationRead(escalationId: string): Promise<MarkEscalationReadResponse["data"]> {
    try {
        if (!escalationId || !escalationId.trim()) {
            throw new Error("escalationId is required");
        }

        const endpoint =
            API.ENDPOINTS.ESCALATE.BASE_URL() +
            fillPath(API.ENDPOINTS.ESCALATE.MARK_READ.path(), { escalationId });

        const res = (await fetch(endpoint, { method: "POST", data: {} }).then((r) => r.data)) as MarkEscalationReadResponse;
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to mark escalation read");
    }
}
