import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { QUERY_KEY } from "@/utils/query-key";
import {
  fetchDataSources,
  processDataSource,
  deleteKnowledge,
  fetchEmbeddings,
  fetchSourceContent,
  addCitation,
} from "@/lib/api/datasource";
import type { ProcessRequest, DataSourceItem } from "@/types/datasource";

// Cache configuration for data sources
const DATASOURCE_CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000,  // 5 minutes
  gcTime: 15 * 60 * 1000,    // 15 minutes
};

export const useDataSourcesQuery = (chatbotId: string) =>
  useQuery<DataSourceItem[]>({
    queryKey: [QUERY_KEY.DATASOURCES, chatbotId],
    queryFn: () => fetchDataSources(chatbotId),
    ...DATASOURCE_CACHE_CONFIG,
  });

/**
 * Hook to prefetch data sources for a chatbot.
 * Use for preloading data on hover/navigation before page mount.
 */
export const usePrefetchDataSources = () => {
  const queryClient = useQueryClient();

  const prefetchDataSources = useCallback((chatbotId: string) => {
    if (!chatbotId) return;

    // Only prefetch if not already in cache
    const existingData = queryClient.getQueryData<DataSourceItem[]>(
      [QUERY_KEY.DATASOURCES, chatbotId]
    );

    if (!existingData) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.DATASOURCES, chatbotId],
        queryFn: () => fetchDataSources(chatbotId),
        ...DATASOURCE_CACHE_CONFIG,
      });
    }
  }, [queryClient]);

  return { prefetchDataSources };
};

/**
 * Utility to prefetch data sources outside of React components.
 * Can be used in event handlers for optimal performance.
 */
export const prefetchDataSourcesUtil = (
  queryClient: ReturnType<typeof useQueryClient>,
  chatbotId: string
) => {
  if (!chatbotId) return Promise.resolve();

  return queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.DATASOURCES, chatbotId],
    queryFn: () => fetchDataSources(chatbotId),
    ...DATASOURCE_CACHE_CONFIG,
  });
};

export const useProcessDataSource = (chatbotId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.DATASOURCES_PROCESS, chatbotId],
    mutationFn: (input: ProcessRequest) => processDataSource(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.DATASOURCES, chatbotId] });
    },
  });
};

export const useDeleteKnowledge = (chatbotId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.DATASOURCES_DELETE, chatbotId],
    mutationFn: (vars: { chatbotId: string; datasourceId: string }) =>
      deleteKnowledge(vars.chatbotId, vars.datasourceId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.DATASOURCES, chatbotId] });
    },
  });
};

export const useEmbeddingsQuery = (dataSourceId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.DATASOURCES_EMBEDDINGS, dataSourceId],
    queryFn: () => fetchEmbeddings(dataSourceId),
    staleTime: 60_000,
    enabled: !!dataSourceId,
  });

export const useAddCitation = (chatbotId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addCitation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.DATASOURCES, chatbotId] });
    },
  });
};

// Suspense-enabled hooks for streaming architecture

/**
 * Suspense-enabled hook for fetching data sources for a chatbot.
 * Use within a React Suspense boundary - will throw a promise while loading.
 */
export const useSuspenseDataSources = (chatbotId: string) =>
  useSuspenseQuery<DataSourceItem[]>({
    queryKey: [QUERY_KEY.DATASOURCES, chatbotId],
    queryFn: () => fetchDataSources(chatbotId),
    ...DATASOURCE_CACHE_CONFIG,
  });

/**
 * Suspense-enabled hook for fetching embeddings for a data source.
 * Use within a React Suspense boundary - will throw a promise while loading.
 */
export const useSuspenseEmbeddings = (dataSourceId: string) =>
  useSuspenseQuery({
    queryKey: [QUERY_KEY.DATASOURCES_EMBEDDINGS, dataSourceId],
    queryFn: () => fetchEmbeddings(dataSourceId),
    ...DATASOURCE_CACHE_CONFIG,
  });

/**
 * Suspense-enabled hook for fetching structured source content for a data source.
 * Returns the full document content for clean UI display.
 */
export const useSuspenseSourceContent = (dataSourceId: string) =>
  useSuspenseQuery({
    queryKey: [QUERY_KEY.DATASOURCES_CONTENT, dataSourceId],
    queryFn: () => fetchSourceContent(dataSourceId),
    ...DATASOURCE_CACHE_CONFIG,
  });