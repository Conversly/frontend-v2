import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import {
  AnalyzeImageInput,
  AnalyzeImageResponse,
  InferPromptInput,
  InferPromptResponse,
  SearchSourcesInput,
  SearchSourcesResponse,
  GenerateTopicsInput,
  GenerateTopicsResponse,
  BootstrapSetupInput,
  BootstrapSetupResult,
  FetchSitemapInput,
  FetchSitemapResponse,
} from "@/types/setup";

export const analyzeImage = async (
  input: AnalyzeImageInput
): Promise<AnalyzeImageResponse> => {
  const res = await fetch(
    API.ENDPOINTS.SETUP.BASE_URL() + API.ENDPOINTS.SETUP.ANALYZE_IMAGE(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as ApiResponse<AnalyzeImageResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};


export const fetchSitemap = async (
  input: FetchSitemapInput
): Promise<FetchSitemapResponse> => {
  const res = await fetch(
    API.ENDPOINTS.SETUP.BASE_URL() + API.ENDPOINTS.SETUP.FETCH_SITEMAP(),
    {
      method: "POST",
      data : {
        chatbotId: input.chatbotId,
        websiteUrl: input.websiteUrl,
      },
    }).then((r) => r.data) as ApiResponse<FetchSitemapResponse>;

    if (!res.success) {
      throw new Error(res.message);
    }
  
    return res.data;
};



export const inferPrompt = async (
  input: InferPromptInput
): Promise<InferPromptResponse> => {
  const res = await fetch(
    API.ENDPOINTS.SETUP.BASE_URL() + API.ENDPOINTS.SETUP.INFER_PROMPT(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as ApiResponse<InferPromptResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const searchSources = async (
  input: SearchSourcesInput
): Promise<SearchSourcesResponse> => {
  const res = await fetch(
    API.ENDPOINTS.SETUP.BASE_URL() + API.ENDPOINTS.SETUP.SEARCH_SOURCES(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as ApiResponse<SearchSourcesResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const generateTopics = async (
  input: GenerateTopicsInput
): Promise<GenerateTopicsResponse> => {
  const res = await fetch(
    API.ENDPOINTS.SETUP.BASE_URL() + API.ENDPOINTS.SETUP.TOPIC(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as ApiResponse<GenerateTopicsResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

/**
 * Runs the initial 4 setup calls in parallel and aggregates results.
 * Does not throw unless every call fails; individual errors are captured.
 */
export const bootstrapAgentSetup = async (
  input: BootstrapSetupInput
): Promise<BootstrapSetupResult> => {
  const { chatbotId, websiteUrl, useCase, imageUrl } = input;

  const analyzeImageInput: AnalyzeImageInput | null = imageUrl
    ? { chatbotId, imageUrl }
    : null;

  const inferPromptInput: InferPromptInput = { chatbotId, websiteUrl, useCase };
  const searchSourcesInput: SearchSourcesInput = { chatbotId, websiteUrl };
  const generateTopicsInput: GenerateTopicsInput = { chatbotId, websiteUrl, useCase };

  const [analyzeR, promptR, sourcesR, topicsR] = await Promise.allSettled([
    analyzeImageInput ? analyzeImage(analyzeImageInput) : Promise.resolve(undefined),
    inferPrompt(inferPromptInput),
    searchSources(searchSourcesInput),
    generateTopics(generateTopicsInput),
  ]);

  const result: BootstrapSetupResult = { errors: {} };

  if (analyzeR.status === "fulfilled") {
    result.analyzeImage = analyzeR.value as AnalyzeImageResponse | undefined;
  } else if (analyzeR.status === "rejected") {
    if (analyzeImageInput) result.errors.analyzeImage = analyzeR.reason?.message || "Failed to analyze image";
  }

  if (promptR.status === "fulfilled") {
    result.inferPrompt = promptR.value;
  } else {
    result.errors.inferPrompt = (promptR as PromiseRejectedResult).reason?.message || "Failed to infer prompt";
  }

  if (sourcesR.status === "fulfilled") {
    result.searchSources = sourcesR.value;
  } else {
    result.errors.searchSources = (sourcesR as PromiseRejectedResult).reason?.message || "Failed to search sources";
  }

  if (topicsR.status === "fulfilled") {
    result.generateTopics = topicsR.value;
  } else {
    result.errors.generateTopics = (topicsR as PromiseRejectedResult).reason?.message || "Failed to generate topics";
  }

  // If everything failed, throw a consolidated error
  const allFailed =
    (!result.analyzeImage && !!analyzeImageInput) &&
    !result.inferPrompt &&
    !result.searchSources &&
    !result.generateTopics;

  if (allFailed) {
    throw new Error("All setup requests failed");
  }

  return result;
};


