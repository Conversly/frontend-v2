import { fetch, guardedFetch } from '@/lib/api/axios';
import { API, ApiResponse } from '@/lib/api/config';
import { ChatbotCustomizationPartial, ChatbotCustomizationPayload } from '@/types/customization';

export type GetWidgetResponse = ChatbotCustomizationPayload;

export interface UpdateWidgetRequest extends ChatbotCustomizationPartial { }
export type UpdateWidgetResponse = ChatbotCustomizationPayload;

// Domain Types
export interface DomainInfo {
	id: string;
	domain: string;
	createdAt: Date | null;
}

export interface AllowedDomainsResponse {
	domains: DomainInfo[];
}

export interface AddDomainRequest {
	chatbotId: string;
	domain: string;
}

export interface AddDomainResponse {
	id: string;
	domain: string;
	createdAt: Date | null;
}

// API Key Types
export interface ApiKeyResponse {
	apiKey: string;
}

export interface ApiKeyGetResponse {
	apiKey: string | null;
}

export const getWidgetConfig = async (chatbotId: string): Promise<GetWidgetResponse> => {
	const endpoint = API.ENDPOINTS.DEPLOY.WIDGET.path();
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'GET',
			params: {
				chatbotId
			}
		}
	).then((r) => r.data) as ApiResponse<GetWidgetResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};


export const updateWidgetConfig = async (
	chatbotId: string,
	partial: UpdateWidgetRequest
): Promise<UpdateWidgetResponse> => {
	// DEV_ONLY - Uses guardedFetch for automatic mode checking
	const res = await guardedFetch(
		API.ENDPOINTS.DEPLOY.UPDATE_CHATBOT_WIDGET,
		API.ENDPOINTS.DEPLOY.BASE_URL(),
		{
			method: 'POST',
			data: {
				chatbotId,
				partial
			}
		}
	).then((r) => r.data) as ApiResponse<UpdateWidgetResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

// Domain Management Functions
export const getDomainAllowlist = async (chatbotId: string): Promise<AllowedDomainsResponse> => {
	const endpoint = API.ENDPOINTS.DEPLOY.GET_DOMAIN_ALLOWLIST.path();
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'GET',
			params: {
				chatbotId
			}
		}
	).then((r) => r.data) as ApiResponse<AllowedDomainsResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

export const addDomainToAllowlist = async (
	chatbotId: string,
	domain: string
): Promise<AddDomainResponse> => {
	// DEV_ONLY - Uses guardedFetch for automatic mode checking
	const res = await guardedFetch(
		API.ENDPOINTS.DEPLOY.UPDATE_DOMAIN_ALLOWLIST,
		API.ENDPOINTS.DEPLOY.BASE_URL(),
		{
			method: 'POST',
			data: { domain },
			params: {
				chatbotId
			}
		}
	).then((r) => r.data) as ApiResponse<AddDomainResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

// API Key Management Functions
export const getApiKey = async (chatbotId: string): Promise<ApiKeyGetResponse> => {
	const endpoint = API.ENDPOINTS.DEPLOY.GET_API_KEY.path();
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'GET',
			params: {
				chatbotId
			}
		}
	).then((r) => r.data) as ApiResponse<ApiKeyGetResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

export const createApiKey = async (chatbotId: string): Promise<ApiKeyResponse> => {
	// DEV_ONLY - Uses guardedFetch for automatic mode checking
	const res = await guardedFetch(
		API.ENDPOINTS.DEPLOY.CREATE_API_KEY,
		API.ENDPOINTS.DEPLOY.BASE_URL(),
		{
			method: 'POST',
			params: {
				chatbotId
			}
		}
	).then((r) => r.data) as ApiResponse<ApiKeyResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};
