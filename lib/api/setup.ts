import { fetch, guardedFetch } from "@/lib/api/axios";
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
  GenerateWidgetConfigInput,
  GenerateWidgetConfigResponse,
} from "@/types/setup";

export const analyzeImage = async (
  input: AnalyzeImageInput
): Promise<AnalyzeImageResponse> => {
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.ANALYZE_IMAGE,
    API.ENDPOINTS.SETUP.BASE_URL(),
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.FETCH_SITEMAP,
    API.ENDPOINTS.SETUP.BASE_URL(),
    {
      method: "POST",
      data: {
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.INFER_PROMPT,
    API.ENDPOINTS.SETUP.BASE_URL(),
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
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.SEARCH_SOURCES,
    API.ENDPOINTS.SETUP.BASE_URL(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as SearchSourcesResponse;

  if (!res.success) {
    throw new Error("Failed to search sources");
  }

  return res;
};

export const generateTopics = async (
  input: GenerateTopicsInput
): Promise<GenerateTopicsResponse> => {
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.TOPIC,
    API.ENDPOINTS.SETUP.BASE_URL(),
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

export const generateWidgetConfig = async (
  input: GenerateWidgetConfigInput
): Promise<GenerateWidgetConfigResponse> => {
  // DEV_ONLY - Uses guardedFetch for automatic mode checking
  const res = await guardedFetch(
    API.ENDPOINTS.SETUP.WIDGET_CONFIG,
    API.ENDPOINTS.SETUP.BASE_URL(),
    {
      method: "POST",
      data: input,
    },
  ).then((r) => r.data) as ApiResponse<GenerateWidgetConfigResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

/**
 * Runs setup calls with optimal parallelization:
 * 
 * PARALLEL: inferPrompt + generateTopics + searchSources
 * THEN: generateWidgetConfig (needs brandName from inferPrompt)
 *
 * Does not throw unless all calls fail; individual errors are captured.
 */
export const bootstrapAgentSetup = async (
  input: BootstrapSetupInput
): Promise<BootstrapSetupResult> => {
  const { chatbotId, websiteUrl, useCase, brandName } = input;
  const result: BootstrapSetupResult = { errors: {} };

  // Step 1: Fire independent calls in parallel
  const [promptR, topicsR, sourcesR] = await Promise.allSettled([
    inferPrompt({ chatbotId, websiteUrl, useCase }),
    generateTopics({ chatbotId, websiteUrl, useCase }),
    searchSources({ chatbotId, websiteUrl }),
  ]);

  if (promptR.status === "fulfilled") {
    result.inferPrompt = promptR.value;
  } else {
    result.errors.inferPrompt = promptR.reason?.message || "Failed to infer prompt";
  }

  if (topicsR.status === "fulfilled") {
    result.generateTopics = topicsR.value;
  } else {
    result.errors.generateTopics = topicsR.reason?.message || "Failed to generate topics";
  }

  if (sourcesR.status === "fulfilled") {
    result.searchSources = sourcesR.value;
  } else {
    result.errors.searchSources = sourcesR.reason?.message || "Failed to search sources";
  }

  // Step 2: Generate widget config (depends on inferPrompt for brandName)
  const finalBrandName = brandName || result.inferPrompt?.name || "Support Bot";
  try {
    result.widgetConfig = await generateWidgetConfig({
      chatbotId,
      websiteUrl,
      brandName: finalBrandName,
      useCase,
    });
  } catch (err: any) {
    result.errors.widgetConfig = err?.message || "Failed to generate widget config";
  }

  // Check if all calls failed
  const allFailed =
    !result.inferPrompt &&
    !result.generateTopics &&
    !result.searchSources &&
    !result.widgetConfig;

  if (allFailed) {
    throw new Error("All setup requests failed");
  }

  return result;
};
