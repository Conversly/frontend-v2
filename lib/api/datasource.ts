import { fetch, guardedFetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
  ProcessRequest,
  DatasourceResponse,
  AddCitationRequest,
  AddCitationResponse,
  FetchEmbeddingsResponse,
  DeleteKnowledgeResponse,
  FetchDataSourcesResponse,
} from "@/types/datasource";
import { handleEntitlementError } from "@/lib/api-error-handler";

export const processDataSource = async (
  request: ProcessRequest
): Promise<ApiResponse<DatasourceResponse>> => {
  try {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
      API.ENDPOINTS.DATA_SOURCE.PROCESS,
      API.ENDPOINTS.DATA_SOURCE.BASE_URL(),
      {
        method: "POST",
        data: request,
      },
    ).then((res) => res.data) as ApiResponse<DatasourceResponse>;

    if (!res.success) {
      throw new Error(res.message);
    }

    return res;
  } catch (error: any) {
    if (handleEntitlementError(error)) {
      throw error;
    }
    console.error(error);
    throw new Error(error.message || "Failed to process data source");
  }
};

export const addCitation = async (
  request: AddCitationRequest
): Promise<ApiResponse<AddCitationResponse["data"]>> => {
  try {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
      API.ENDPOINTS.DATA_SOURCE.ADD_CITATION,
      API.ENDPOINTS.DATA_SOURCE.BASE_URL(),
      {
        method: "PUT",
        data: request,
      },
    ).then((res) => res.data) as ApiResponse<AddCitationResponse["data"]>;

    if (!res.success) {
      throw new Error(res.message);
    }

    return res;
  } catch (error: any) {
    if (handleEntitlementError(error)) {
      throw error;
    }
    console.error(error);
    throw new Error(error.message || "Failed to add citation");
  }
};

export const fetchEmbeddings = async (
  dataSourceId: string
): Promise<FetchEmbeddingsResponse["data"]> => {
  try {
    const endpoint = API.ENDPOINTS.DATA_SOURCE.EMBEDDINGS.path().replace(
      ":dataSourceId",
      dataSourceId
    );
    const res = await fetch(API.ENDPOINTS.DATA_SOURCE.BASE_URL() + endpoint, {
      method: "GET",
    }).then((res) => res.data) as FetchEmbeddingsResponse;

    if (!res.success) {
      throw new Error("Failed to fetch embeddings");
    }

    return res.data;
  } catch (error: any) {
    if (handleEntitlementError(error)) {
      throw error;
    }
    console.error(error);
    throw new Error(error.message || "Failed to fetch embeddings");
  }
};

export const deleteKnowledge = async (
  chatbotId: string,
  datasourceId: string
): Promise<DeleteKnowledgeResponse> => {
  try {
    // DEV_ONLY - Uses guardedFetch for automatic mode checking
    const res = await guardedFetch(
      API.ENDPOINTS.DATA_SOURCE.DELETE_KNOWLEDGE,
      API.ENDPOINTS.DATA_SOURCE.BASE_URL(),
      {
        method: "DELETE",
        data: { chatbotId, datasourceId },
      },
    ).then((res) => res.data) as DeleteKnowledgeResponse;

    if (!res.success) {
      throw new Error(res.message);
    }

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to delete knowledge");
  }
};

export const fetchDataSources = async (
  chatbotId: string
): Promise<FetchDataSourcesResponse["data"]> => {
  try {
    const endpoint = API.ENDPOINTS.DATA_SOURCE.GET_DATA_SOURCES.path().replace(
      ":chatbotId",
      chatbotId
    );
    const res = await fetch(API.ENDPOINTS.DATA_SOURCE.BASE_URL() + endpoint, {
      method: "GET",
    }).then((res) => res.data) as FetchDataSourcesResponse;

    if (!res.success) {
      throw new Error("Failed to fetch data sources");
    }

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch data sources");
  }
};