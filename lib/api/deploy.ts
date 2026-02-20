import { fetch, guardedFetch, ApiModeError } from '@/lib/api/axios';
import { API, ApiResponse, isEndpointAccessible } from '@/lib/api/config';
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

export interface DeployResult {
	success: boolean;
	liveVersion: number;
	deployedAt: string | Date;
}

export interface RollbackResult {
	success: boolean;
	restoredToVersion: number;
}

export interface DeployStatus {
	deployStatusField: 'NOT_DEPLOYED' | 'SYNCED' | 'DEPLOYING' | 'LOCKED' | 'DEV_DIRTY';
	devVersion: number;
	liveVersion: number;
	lastDeployedAt: string | Date | null;
	hasUnpublishedChanges?: boolean;
}

type DeployStatusValue = DeployStatus['deployStatusField'];

// What the backend *may* return (we normalize to DeployStatus).
interface DeployStatusApiResponse {
	deployStatusField?: DeployStatusValue;
	deployStatus?: DeployStatusValue;
	devVersion: number;
	liveVersion: number;
	lastDeployedAt: string | Date | null;
	hasUnpublishedChanges?: boolean;
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

// Deployment Functions

/**
 * Push DEV configuration to LIVE.
 */
export const pushToLive = async (chatbotId: string): Promise<DeployResult> => {
	const endpointObj = API.ENDPOINTS.DEPLOY.DEPLOY;
	if (!isEndpointAccessible(endpointObj)) {
		throw new ApiModeError(endpointObj.path());
	}

	const endpoint = endpointObj.path().replace(':chatbotId', chatbotId);
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'POST',
		}
	).then((r) => r.data) as ApiResponse<DeployResult, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

/**
 * Rollback DEV changes - discard draft and restore from LIVE.
 */
export const rollbackDev = async (chatbotId: string): Promise<RollbackResult> => {
	const endpointObj = API.ENDPOINTS.DEPLOY.ROLLBACK;
	if (!isEndpointAccessible(endpointObj)) {
		throw new ApiModeError(endpointObj.path());
	}

	const endpoint = endpointObj.path().replace(':chatbotId', chatbotId);
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'POST',
		}
	).then((r) => r.data) as ApiResponse<RollbackResult, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}
	return res.data;
};

/**
 * Get deployment status info.
 */
export const getDeployStatus = async (chatbotId: string): Promise<DeployStatus> => {
	const endpointObj = API.ENDPOINTS.DEPLOY.DEPLOY_STATUS;
	if (!isEndpointAccessible(endpointObj)) {
		throw new ApiModeError(endpointObj.path());
	}

	const endpoint = endpointObj.path().replace(':chatbotId', chatbotId);
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'GET',
		}
	).then((r) => r.data) as ApiResponse<DeployStatusApiResponse, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}

	// Normalize field-name mismatch between backend (`deployStatus`) and frontend (`deployStatusField`).
	const deployStatusField = res.data.deployStatusField ?? res.data.deployStatus ?? 'SYNCED';

	return {
		...res.data,
		deployStatusField,
	};
};

// ============================================================================
// DEPLOYMENT DIFF
// ============================================================================

export type DiffType = 'CREATED' | 'UPDATED' | 'DELETED' | 'UNCHANGED';

export interface FieldDiff {
	path: string;
	oldValue: any;
	newValue: any;
}

export interface ResourceChange {
	resourceType: string;
	logicalId: string;
	name?: string;
	changeType: DiffType;
	diffs?: FieldDiff[];
	newValue?: any;
	oldValue?: any;
}

export interface DeploymentDiffResult {
	lastDeployedAt: Date | string | null;
	changes: ResourceChange[];
}

/**
 * Get the deployment diff between DEV and LIVE.
 */
export const getDeploymentDiff = async (chatbotId: string): Promise<DeploymentDiffResult> => {
	const endpointObj = API.ENDPOINTS.DEPLOY.GET_DIFF;
	if (!isEndpointAccessible(endpointObj)) {
		throw new ApiModeError(endpointObj.path());
	}

	const endpoint = endpointObj.path().replace(':chatbotId', chatbotId);
	const res = await fetch(
		API.ENDPOINTS.DEPLOY.BASE_URL() + endpoint,
		{
			method: 'GET',
		}
	).then((r) => r.data) as ApiResponse<DeploymentDiffResult, Error>;

	if (!res.success) {
		throw new Error(res.message);
	}

	return res.data;
};
