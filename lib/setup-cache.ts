/**
 * setup-cache.ts
 *
 * Lightweight localStorage cache for the AI setup wizard results.
 *
 * Key format : `setup:<chatbotId>`
 * TTL        : 30 minutes (configurable via CACHE_TTL_MS)
 * Version    : Bump CACHE_VERSION whenever the shape of CachedSetupData changes
 *              – old entries with a different version will be silently dropped.
 *
 * Debug      : In the browser console, run:
 *              localStorage.getItem('setup:<chatbotId>')   // inspect raw entry
 *              setupCache.clear('<chatbotId>')              // clear one entry
 */

import type { BootstrapSetupResult } from '@/types/setup';

// ─── Constants ────────────────────────────────────────────────────────────────

const CACHE_VERSION = 1;           // bump when CachedSetupData shape changes
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const KEY_PREFIX = 'setup:';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CachedSetupData {
    /** The full result returned by runInitialSetup / bootstrapAgentSetup */
    result: BootstrapSetupResult;
    /** ISO timestamp of when the entry was saved */
    savedAt: string;
    /** Schema version – entries with a different version are ignored */
    version: number;
    /** The chatbot id this cache belongs to (for easy debugging) */
    chatbotId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function storageKey(chatbotId: string): string {
    return `${KEY_PREFIX}${chatbotId}`;
}

function isExpired(savedAt: string): boolean {
    return Date.now() - new Date(savedAt).getTime() > CACHE_TTL_MS;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Persist the result of the AI setup run into localStorage.
 * Safe to call even in SSR – localStorage access is guarded.
 */
export function saveSetupCache(chatbotId: string, result: BootstrapSetupResult): void {
    if (typeof window === 'undefined') return;
    try {
        const entry: CachedSetupData = {
            result,
            savedAt: new Date().toISOString(),
            version: CACHE_VERSION,
            chatbotId,
        };
        localStorage.setItem(storageKey(chatbotId), JSON.stringify(entry));
        console.debug('[setup-cache] saved', chatbotId, entry.savedAt);
    } catch (e) {
        // localStorage may be full or blocked – fail gracefully
        console.warn('[setup-cache] could not save cache', e);
    }
}

/**
 * Load a cached result for the given chatbot.
 * Returns `null` if:
 *   - No entry exists
 *   - The entry is expired (> 30 min)
 *   - The entry's version doesn't match CACHE_VERSION
 */
export function loadSetupCache(chatbotId: string): CachedSetupData | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(storageKey(chatbotId));
        if (!raw) {
            console.debug('[setup-cache] miss (no entry)', chatbotId);
            return null;
        }

        const entry = JSON.parse(raw) as CachedSetupData;

        if (entry.version !== CACHE_VERSION) {
            console.debug('[setup-cache] miss (version mismatch – clearing)', chatbotId);
            clearSetupCache(chatbotId);
            return null;
        }

        if (isExpired(entry.savedAt)) {
            console.debug('[setup-cache] miss (expired)', chatbotId, entry.savedAt);
            clearSetupCache(chatbotId);
            return null;
        }

        const ageSeconds = Math.round((Date.now() - new Date(entry.savedAt).getTime()) / 1000);
        console.debug(`[setup-cache] HIT – ${ageSeconds}s old`, chatbotId);
        return entry;
    } catch (e) {
        console.warn('[setup-cache] corrupt entry – clearing', e);
        clearSetupCache(chatbotId);
        return null;
    }
}

/**
 * Remove the cache entry for a specific chatbot.
 * Call this when the setup wizard reaches Step 7 (completion) or is reset.
 */
export function clearSetupCache(chatbotId: string): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(storageKey(chatbotId));
        console.debug('[setup-cache] cleared', chatbotId);
    } catch { }
}
