import type { DataSourceItem } from "@/types/datasource";

export interface AnalyzeImageInput {
  chatbotId: string;
  imageUrl: string;
}

export interface AnalyzeImageResponse {
  primaryColor: string;
}

export interface InferPromptInput {
  chatbotId: string;
  websiteUrl: string;
  useCase?: string;
}

export interface InferPromptResponse {
  systemPrompt: string;
  name: string;
  description: string;
  logoUrl: string;
}

export interface SearchSourcesInput {
  chatbotId: string;
  websiteUrl: string;
}

export interface SearchSourcesResponse {
  data: DataSourceItem[];
  totalUrls: number;
  totalPages: number;
  totalFiles: number;
  insertedCount: number;
  source: "sitemap" | "crawl";
}

export interface GenerateTopicsInput {
  chatbotId: string;
  websiteUrl: string;
  useCase?: string;
}

export interface GenerateTopicsResponse {
  topics: string[];
}

// Bootstrap Orchestration Types
export interface BootstrapSetupInput {
  chatbotId: string;
  websiteUrl: string;
  useCase?: string;
  imageUrl?: string;
}

export interface BootstrapSetupResult {
  analyzeImage?: AnalyzeImageResponse;
  inferPrompt?: InferPromptResponse;
  searchSources?: SearchSourcesResponse;
  generateTopics?: GenerateTopicsResponse;
  errors: {
    analyzeImage?: string;
    inferPrompt?: string;
    searchSources?: string;
    generateTopics?: string;
  };
}


