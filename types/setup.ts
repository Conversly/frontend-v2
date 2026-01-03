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
  success: boolean;
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

export interface Topic {
  id: string;
  name: string;
  color: string;
}

export interface GenerateTopicsResponse {
  chatbotId: string;
  topics: Topic[];
}

// Bootstrap Orchestration Types
export interface BootstrapSetupInput {
  chatbotId: string;
  websiteUrl: string;
  useCase?: string;
  brandName?: string;
}

export interface BootstrapSetupResult {
  inferPrompt?: InferPromptResponse;
  generateTopics?: GenerateTopicsResponse;
  searchSources?: SearchSourcesResponse;
  widgetConfig?: GenerateWidgetConfigResponse;
  errors: {
    inferPrompt?: string;
    generateTopics?: string;
    searchSources?: string;
    widgetConfig?: string;
  };
}

export interface FetchSitemapInput {
  chatbotId: string;
  websiteUrl: string;
}


export interface FetchSitemapResponse {
  urls: string[];
  pages: string[];
  files: string[];
  source: 'sitemap' | 'crawl';
  totalCount: number;
}

export interface GenerateWidgetConfigInput {
  chatbotId: string;
  websiteUrl: string;
  brandName: string;
  useCase?: string;
}

export interface GenerateWidgetConfigResponse {
  chatbotId: string;
  logoUrl: string;
  primaryColor: string;
  initialMessage: string;
  suggestedMessages: string[];
  widgetConfigId: string;
  originDomainAdded: boolean;
}
