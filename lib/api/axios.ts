import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API, ApiEndpoint, isEndpointAccessible } from "./config";

async function getActiveBranch(): Promise<"DEV" | "LIVE"> {
  // Never import client-only branch store during SSR.
  if (typeof window === "undefined") return "DEV";

  try {
    const mod = await import("@/store/branch");
    return mod.useBranchStore.getState().activeBranch;
  } catch {
    return "DEV";
  }
}

export const fetch = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

export const api = fetch;

fetch.interceptors.request.use(
  async (config) => {
    const activeBranch = await getActiveBranch();
    const mode = activeBranch.toLowerCase(); // 'dev' or 'live'

    // Add mode to request based on method
    if (config.method && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
      // For POST/PUT/PATCH, add to body
      if (config.data) {
        // If data is FormData, append to it
        if (config.data instanceof FormData) {
          config.data.append('mode', mode);
        } else if (typeof config.data === 'object') {
          // If data is an object, add mode property
          config.data = { ...config.data, mode };
        }
      } else {
        // If no data, create an object with mode
        config.data = { mode };
      }
    } else {
      // For GET/DELETE, add as query parameter
      config.params = { ...config.params, mode };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// Guarded Fetch - Auto-enforces API mode restrictions
// ─────────────────────────────────────────────────────────────────────────────

export class ApiModeError extends Error {
  constructor(endpointPath: string) {
    super(`This action is only available in DEV mode. Endpoint: ${endpointPath}`);
    this.name = 'ApiModeError';
  }
}

/**
 * Makes an API call with automatic mode checking.
 * If the endpoint is DEV_ONLY and we're in LIVE mode, throws ApiModeError.
 * 
 * @param endpoint - The API endpoint with mode metadata
 * @param baseUrl - The base URL for the endpoint category
 * @param config - Axios request configuration
 * @returns Promise with the API response
 * 
 * @example
 * const res = await guardedFetch(
 *   API.ENDPOINTS.DATA_SOURCE.PROCESS,
 *   API.ENDPOINTS.DATA_SOURCE.BASE_URL(),
 *   { method: 'POST', data: request }
 * );
 */
export async function guardedFetch<T = unknown>(
  endpoint: ApiEndpoint,
  baseUrl: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  // Check if endpoint is accessible in current mode
  if (!(await isEndpointAccessible(endpoint))) {
    throw new ApiModeError(endpoint.path());
  }

  const url = baseUrl + endpoint.path();
  return fetch<T>(url, config);
}

/**
 * Like {@link guardedFetch}, but uses a fully resolved URL path relative to the API client baseURL.
 * Use this when the route contains dynamic segments (e.g. assistant IDs); {@link guardedFetch}
 * only supports `baseUrl + endpoint.path()` with a static template and must not be given a
 * baseUrl that already includes the resolved path.
 */
export async function guardedFetchByUrl<T = unknown>(
  endpoint: ApiEndpoint,
  url: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  if (!(await isEndpointAccessible(endpoint))) {
    throw new ApiModeError(endpoint.path());
  }
  return fetch<T>(url, config);
}

/**
 * Helper to get the path from an endpoint.
 * Works with both new ApiEndpoint objects and legacy function format.
 */
export function getPath(endpoint: ApiEndpoint | (() => string)): string {
  if (typeof endpoint === 'function') {
    return endpoint();
  }
  return endpoint.path();
}
