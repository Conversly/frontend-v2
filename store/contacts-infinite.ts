import { create } from "zustand";
import type { ContactResponse, GetContactsQuery } from "@/types/contacts";
import { getContactsWithConfig } from "@/lib/api/contacts";
import axios from "axios";

type ContactsQuery = {
  chatbotId: string;
  search?: string;
};

type ContactsInfiniteState = {
  // source-of-truth for list rendering
  items: ContactResponse[];
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  error: string | null;

  // query context (cursor must never be reused across these)
  activeFilters: ContactsQuery | null;

  // race / cancellation / dedupe
  inFlightRequestId: number;
  abortController: AbortController | null;
  seenIds: Record<string, true>;

  // actions
  setQuery: (filters: ContactsQuery) => void;
  reset: () => void;
  fetchFirstPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
};

const PAGE_LIMIT = 20;

function queryKey(q: ContactsQuery | null) {
  if (!q?.chatbotId) return "";
  return `${q.chatbotId}::${q.search ?? ""}`;
}

function safeErrorMessage(err: unknown): string {
  if (!err) return "request_failed";
  if (axios.isAxiosError(err)) {
    const msg =
      (err.response?.data as any)?.message ||
      (err.response?.data as any)?.error ||
      err.message;
    return String(msg || "request_failed");
  }
  if (err instanceof Error) return err.message || "request_failed";
  return String(err);
}

export const useContactsInfiniteStore = create<ContactsInfiniteState>((set, get) => ({
  items: [],
  cursor: null,
  hasMore: true,
  loading: false,
  error: null,

  activeFilters: null,

  inFlightRequestId: 0,
  abortController: null,
  seenIds: {},

  setQuery: (filters) => {
    const prevKey = queryKey(get().activeFilters);
    const nextKey = queryKey(filters);

    // Always set activeFilters (even if same) so callers can rely on it
    if (prevKey === nextKey) {
      set({ activeFilters: filters });
      return;
    }

    // Query context changed → abort + hard reset (cursor must never cross contexts)
    get().abortController?.abort();
    set({
      activeFilters: filters,
      items: [],
      cursor: null,
      hasMore: true,
      loading: false,
      error: null,
      abortController: null,
      seenIds: {},
      // bump request id so any late responses are ignored
      inFlightRequestId: get().inFlightRequestId + 1,
    });
  },

  reset: () => {
    get().abortController?.abort();
    set({
      items: [],
      cursor: null,
      hasMore: true,
      loading: false,
      error: null,
      abortController: null,
      seenIds: {},
      inFlightRequestId: get().inFlightRequestId + 1,
    });
  },

  fetchFirstPage: async () => {
    get().reset();
    await get().fetchNextPage();
  },

  fetchNextPage: async () => {
    const state = get();
    const filters = state.activeFilters;
    if (state.loading || !state.hasMore) return;
    if (!filters?.chatbotId) return;

    const requestId = state.inFlightRequestId + 1;
    const abortController = new AbortController();

    set({
      loading: true,
      error: null,
      inFlightRequestId: requestId,
      abortController,
    });

    const query: GetContactsQuery = {
      chatbotId: filters.chatbotId,
      search: filters.search,
      limit: PAGE_LIMIT,
      cursor: state.cursor,
    };

    try {
      const res = await getContactsWithConfig(query, { signal: abortController.signal });

      // Ignore stale/out-of-order responses
      if (get().inFlightRequestId !== requestId) return;

      const payload = res.data;
      const incoming = payload?.data ?? [];
      const nextCursor = payload?.nextCursor ?? null;
      const hasMore = Boolean(payload?.hasMore);

      set((s) => {
        const nextItems = s.items.length ? [...s.items] : [];
        const nextSeen = { ...s.seenIds };

        // Optional safety: id-based dedupe (prevents double-append if same cursor fetched twice)
        for (const it of incoming) {
          if (!it?.id) continue;
          if (nextSeen[it.id]) continue;
          nextSeen[it.id] = true;
          nextItems.push(it);
        }

        return {
          items: nextItems,
          cursor: nextCursor,
          hasMore,
          loading: false,
          error: null,
          abortController: null,
          seenIds: nextSeen,
        };
      });
    } catch (err) {
      // If aborted due to query change/reset, don't treat as failure.
      const isCanceled =
        axios.isCancel(err) ||
        (axios.isAxiosError(err) && err.code === "ERR_CANCELED") ||
        (err as any)?.name === "CanceledError";
      if (isCanceled) {
        if (get().inFlightRequestId === requestId) {
          set({ loading: false, abortController: null });
        }
        return;
      }

      const message = safeErrorMessage(err);
      const failedCursor = get().cursor;

      // Per requirement: reset whole page on error.
      // Avoid infinite retry loops: only auto-refetch if this wasn't the first page.
      get().abortController?.abort();
      set({
        items: [],
        cursor: null,
        hasMore: true,
        loading: false,
        error: message,
        abortController: null,
        seenIds: {},
        inFlightRequestId: get().inFlightRequestId + 1,
      });

      if (failedCursor) {
        await get().fetchNextPage();
      }
    }
  },
}));

// Granular selectors (per repo best practices)
export const useContactsItems = () => useContactsInfiniteStore((s) => s.items);
export const useContactsCursor = () => useContactsInfiniteStore((s) => s.cursor);
export const useContactsHasMore = () => useContactsInfiniteStore((s) => s.hasMore);
export const useContactsLoading = () => useContactsInfiniteStore((s) => s.loading);
export const useContactsError = () => useContactsInfiniteStore((s) => s.error);
export const useContactsActiveFilters = () => useContactsInfiniteStore((s) => s.activeFilters);

export const useContactsSetQuery = () => useContactsInfiniteStore((s) => s.setQuery);
export const useContactsReset = () => useContactsInfiniteStore((s) => s.reset);
export const useContactsFetchFirstPage = () => useContactsInfiniteStore((s) => s.fetchFirstPage);
export const useContactsFetchNextPage = () => useContactsInfiniteStore((s) => s.fetchNextPage);

