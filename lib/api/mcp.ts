import { fetch, guardedFetch } from "./axios";
import { API, ApiResponse } from "./config";
import {
  CreateMcpConnectionInput,
  DeleteMcpConnectionInput,
  GetMcpConnectionInput,
  GetMcpConnectionsQuery,
  McpConnectionResponse,
  McpConnectionSummary,
  McpToolSnapshot,
  ToggleMcpConnectionInput,
  UpdateMcpConnectionInput,
  UpdateMcpToolConfigInput,
  VerifyMcpConnectionInput,
  VerifyMcpResponse,
} from "@/types/mcp";

export const verifyMcpConnection = async (data: VerifyMcpConnectionInput) => {
  const res = (await fetch
    .post(API.ENDPOINTS.MCP.BASE_URL() + API.ENDPOINTS.MCP.VERIFY.path(), data)
    .then((response) => response.data)) as ApiResponse<VerifyMcpResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const createMcpConnection = async (data: CreateMcpConnectionInput) => {
  const res = (await guardedFetch(
    API.ENDPOINTS.MCP.CREATE,
    API.ENDPOINTS.MCP.BASE_URL(),
    { method: "POST", data }
  ).then((response) => response.data)) as ApiResponse<McpConnectionResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getMcpConnections = async (data: GetMcpConnectionsQuery) => {
  const res = (await fetch
    .post(API.ENDPOINTS.MCP.BASE_URL() + API.ENDPOINTS.MCP.LIST.path(), data)
    .then((response) => response.data)) as ApiResponse<McpConnectionSummary[]>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getMcpConnection = async (data: GetMcpConnectionInput) => {
  const res = (await fetch
    .post(API.ENDPOINTS.MCP.BASE_URL() + API.ENDPOINTS.MCP.GET.path(), data)
    .then((response) => response.data)) as ApiResponse<McpConnectionResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const updateMcpConnection = async (data: UpdateMcpConnectionInput) => {
  const res = (await guardedFetch(
    API.ENDPOINTS.MCP.UPDATE,
    API.ENDPOINTS.MCP.BASE_URL(),
    { method: "POST", data }
  ).then((response) => response.data)) as ApiResponse<McpConnectionResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const deleteMcpConnection = async (data: DeleteMcpConnectionInput) => {
  const res = (await guardedFetch(
    API.ENDPOINTS.MCP.DELETE,
    API.ENDPOINTS.MCP.BASE_URL(),
    { method: "POST", data }
  ).then((response) => response.data)) as ApiResponse<null>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const toggleMcpConnection = async (data: ToggleMcpConnectionInput) => {
  const res = (await guardedFetch(
    API.ENDPOINTS.MCP.TOGGLE_CONNECTION,
    API.ENDPOINTS.MCP.BASE_URL(),
    { method: "POST", data }
  ).then((response) => response.data)) as ApiResponse<{ isEnabled: boolean }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const updateMcpToolConfig = async (data: UpdateMcpToolConfigInput) => {
  const res = (await guardedFetch(
    API.ENDPOINTS.MCP.UPDATE_TOOL,
    API.ENDPOINTS.MCP.BASE_URL(),
    { method: "POST", data }
  ).then((response) => response.data)) as ApiResponse<McpToolSnapshot>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};
