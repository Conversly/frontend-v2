"use client";

/**
 * Centralized prefetch hook for navigation optimization.
 * 
 * This hook provides a unified interface for prefetching data when users
 * hover over or interact with navigation links. It coordinates multiple
 * data fetches to warm up the cache before page transitions.
 * 
 * @example
 * ```tsx
 * const { prefetchPage } = usePrefetchNavigation();
 * 
 * <Link 
 *   href={`/${workspaceId}/chatbot/${botId}/sources`}
 *   onMouseEnter={() => prefetchPage('sources', { workspaceId, botId })}
 * >
 *   Data Sources
 * </Link>
 * ```
 */

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePrefetchEntitlements, entitlementsKeys } from './useEntitlements';
import { usePrefetchSubscription, subscriptionKeys } from '@/contexts/subscription-context';
import { usePrefetchChatbots, usePrefetchChatbot } from '@/services/chatbot';
import { usePrefetchDataSources } from '@/services/datasource';

type PageType = 
  | 'chatbot-list' 
  | 'chatbot-detail' 
  | 'sources' 
  | 'actions' 
  | 'analytics' 
  | 'billing' 
  | 'workspace-settings'
  | string;

interface PrefetchContext {
  workspaceId?: string;
  botId?: string;
  dataSourceId?: string;
}

export function usePrefetchNavigation() {
  const queryClient = useQueryClient();
  const { prefetchEntitlements } = usePrefetchEntitlements();
  const { prefetchSubscription } = usePrefetchSubscription();
  const { prefetchChatbots } = usePrefetchChatbots();
  const { prefetchChatbot } = usePrefetchChatbot();
  const { prefetchDataSources } = usePrefetchDataSources();

  /**
   * Prefetch data for a specific page type based on context.
   * Call this on hover or focus events for navigation links.
   */
  const prefetchPage = useCallback((pageType: PageType, context: PrefetchContext = {}) => {
    const { workspaceId, botId } = context;

    // Always prefetch common data that most pages need
    if (workspaceId) {
      prefetchEntitlements(workspaceId);
      prefetchSubscription();
    }

    // Page-specific prefetching
    switch (pageType) {
      case 'chatbot-list':
        if (workspaceId) {
          prefetchChatbots(workspaceId);
        }
        break;

      case 'chatbot-detail':
      case 'sources':
      case 'actions':
      case 'analytics':
        if (workspaceId && botId) {
          prefetchChatbot(workspaceId, botId);
        }
        // Sources page also needs data sources
        if (pageType === 'sources' && botId) {
          prefetchDataSources(botId);
        }
        break;

      case 'billing':
        // Subscription is already fetched above
        break;

      case 'workspace-settings':
        // Entitlements already fetched above
        break;

      default:
        // For unknown pages, try to infer from URL patterns if context provided
        if (workspaceId && botId) {
          prefetchChatbot(workspaceId, botId);
        }
        break;
    }
  }, [
    prefetchChatbots,
    prefetchChatbot,
    prefetchDataSources,
    prefetchEntitlements,
    prefetchSubscription,
  ]);

  /**
   * Prefetch a URL directly by parsing its pattern.
   * Useful for dynamic navigation items.
   */
  const prefetchUrl = useCallback((url: string, workspaceId?: string) => {
    if (!workspaceId) return;

    // Always prefetch common data
    prefetchEntitlements(workspaceId);
    prefetchSubscription();

    // Parse URL to determine what to prefetch
    const segments = url.split('/').filter(Boolean);

    // Workspace-level chatbot list: /:workspaceId/chatbot
    if (segments.length === 2 && segments[1] === 'chatbot') {
      prefetchChatbots(workspaceId);
      return;
    }

    // Chatbot-specific routes: /:workspaceId/chatbot/:botId/*
    const botId = segments[2];
    if (botId && botId !== 'create') {
      prefetchChatbot(workspaceId, botId);

      // Data sources page
      if (segments[3] === 'sources') {
        prefetchDataSources(botId);
      }
    }
  }, [
    prefetchChatbots,
    prefetchChatbot,
    prefetchDataSources,
    prefetchEntitlements,
    prefetchSubscription,
  ]);

  /**
   * Check if data for a page is already cached.
   * Useful for avoiding unnecessary prefetches.
   */
  const isPageCached = useCallback((pageType: PageType, context: PrefetchContext = {}): boolean => {
    const { workspaceId, botId } = context;

    switch (pageType) {
      case 'chatbot-list':
        if (!workspaceId) return false;
        // Check if chatbots list is cached
        return queryClient.getQueryData(['chatbots', workspaceId]) !== undefined;

      case 'chatbot-detail':
      case 'sources':
        if (!workspaceId || !botId) return false;
        // Check if chatbot detail is cached
        return queryClient.getQueryData(['chatbot', workspaceId, botId]) !== undefined;

      case 'billing':
        if (!workspaceId) return false;
        return queryClient.getQueryData(subscriptionKeys.workspace(workspaceId)) !== undefined;

      default:
        return false;
    }
  }, [queryClient]);

  return {
    prefetchPage,
    prefetchUrl,
    isPageCached,
  };
}

// Re-export individual prefetch hooks for selective usage
export {
  usePrefetchEntitlements,
  usePrefetchSubscription,
  usePrefetchChatbots,
  usePrefetchChatbot,
  usePrefetchDataSources,
};
