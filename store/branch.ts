'use client';

import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Branch = 'DEV' | 'LIVE';
export type DeployState = 'SYNCED' | 'DEV_DIRTY' | 'DEPLOYING' | 'LOCKED';

interface BranchState {
    activeBranch: Branch;
    deployState: DeployState;
    devVersion: number;
    liveVersion: number;
}

interface BranchActions {
    switchBranch: (branch: Branch) => void;
    setDeployState: (state: DeployState) => void;
    incrementDevVersion: () => void;
    syncVersions: () => void;
    setVersions: (devVersion: number, liveVersion: number) => void;
}

interface BranchStore extends BranchState, BranchActions { }

// ─────────────────────────────────────────────────────────────────────────────
// Branch Store (Single Source of Truth)
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'conversly-branch-state';

export const useBranchStore = create<BranchStore>()(
    persist(
        (set, get) => ({
            // State
            activeBranch: 'DEV',
            deployState: 'SYNCED',
            devVersion: 1,
            liveVersion: 1,

            // Actions
            switchBranch: (branch) => {
                const { deployState } = get();
                if (deployState === 'DEPLOYING' || deployState === 'LOCKED') {
                    toast.warning('Cannot switch branches', {
                        description: 'A deployment is in progress. Please wait.',
                    });
                    return;
                }

                set({ activeBranch: branch });

                if (branch === 'DEV') {
                    toast.info('DEV mode', {
                        description: 'Changes will not affect the live chatbot',
                        duration: 2000,
                    });
                } else {
                    toast.info('LIVE mode', {
                        description: 'Viewing production configuration (read-only)',
                        duration: 2000,
                    });
                }
            },

            setDeployState: (deployState) => set({ deployState }),

            incrementDevVersion: () => {
                set((state) => ({
                    devVersion: state.devVersion + 1,
                    deployState: 'DEV_DIRTY',
                }));
            },

            syncVersions: () => {
                set((state) => ({
                    liveVersion: state.devVersion,
                    deployState: 'SYNCED',
                }));
            },

            setVersions: (devVersion, liveVersion) => {
                set({ devVersion, liveVersion });
            },
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ activeBranch: state.activeBranch }),
        }
    )
);

// ─────────────────────────────────────────────────────────────────────────────
// Standalone Guard Functions (can be used anywhere, including Zustand stores)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if editing is currently allowed.
 * Can be called from anywhere - components, stores, utilities.
 */
export function canEdit(): boolean {
    const state = useBranchStore.getState();
    return (
        state.activeBranch === 'DEV' &&
        state.deployState !== 'DEPLOYING' &&
        state.deployState !== 'LOCKED'
    );
}

/**
 * Guard an action - only executes if editing is allowed.
 * Shows appropriate toast messages when blocked.
 * 
 * @example
 * // In a component
 * const handleSave = () => guardEdit(() => saveData());
 * 
 * // In a Zustand store action
 * removeSource: (id) => guardEdit(() => set(...))
 */
export function guardEdit<T>(action: () => T): T | undefined {
    const state = useBranchStore.getState();

    if (!canEdit()) {
        if (state.activeBranch === 'LIVE') {
            toast.warning('Switch to DEV mode to edit', {
                description: 'You are viewing the LIVE configuration',
            });
        } else if (state.deployState === 'DEPLOYING') {
            toast.warning('Editing is disabled', {
                description: 'A deployment is in progress',
            });
        } else if (state.deployState === 'LOCKED') {
            toast.error('Editing is locked', {
                description: 'The system is in a locked state. Please contact support.',
            });
        }
        return undefined;
    }

    return action();
}

/**
 * Async version of guardEdit for async actions.
 */
export async function guardEditAsync<T>(
    action: () => Promise<T>
): Promise<T | undefined> {
    if (!canEdit()) {
        const state = useBranchStore.getState();
        if (state.activeBranch === 'LIVE') {
            toast.warning('Switch to DEV mode to edit', {
                description: 'You are viewing the LIVE configuration',
            });
        } else if (state.deployState === 'DEPLOYING') {
            toast.warning('Editing is disabled', {
                description: 'A deployment is in progress',
            });
        } else if (state.deployState === 'LOCKED') {
            toast.error('Editing is locked', {
                description: 'The system is in a locked state. Please contact support.',
            });
        }
        return undefined;
    }

    return action();
}

// ─────────────────────────────────────────────────────────────────────────────
// guardedAction - Wrapper for individual store actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wrap a store action function with edit guard.
 * Use this to guard specific actions in your Zustand store.
 * 
 * @example
 * export const useMyStore = create((set) => ({
 *   deleteItem: guardedAction((id: string) => {
 *     set((state) => ({ items: state.items.filter(i => i.id !== id) }));
 *   }),
 * }));
 */
export function guardedAction<TArgs extends unknown[], TReturn>(
    action: (...args: TArgs) => TReturn
): (...args: TArgs) => TReturn | undefined {
    return (...args: TArgs) => guardEdit(() => action(...args));
}

/**
 * Async version of guardedAction.
 */
export function guardedAsyncAction<TArgs extends unknown[], TReturn>(
    action: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn | undefined> {
    return (...args: TArgs) => guardEditAsync(() => action(...args));
}

// ─────────────────────────────────────────────────────────────────────────────
// withEditGuard - Zustand Middleware
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Zustand middleware that guards all state mutations.
 * When edit is not allowed, state changes are blocked and a toast is shown.
 * 
 * @example
 * export const useCustomizationStore = create<CustomizationState>()(
 *   withEditGuard((set, get) => ({
 *     setDraftConfig: (draft) => set({ draftConfig: draft }), // automatically guarded
 *   }))
 * );
 */
export const withEditGuard = <T extends object>(
    config: StateCreator<T, [], []>
): StateCreator<T, [], []> => {
    return (set, get, api) => {
        const guardedSet = ((partial: unknown, replace?: boolean) => {
            if (!canEdit()) {
                const state = useBranchStore.getState();
                if (state.activeBranch === 'LIVE') {
                    toast.warning('Switch to DEV mode to edit', {
                        description: 'You are viewing the LIVE configuration',
                    });
                } else if (state.deployState === 'DEPLOYING') {
                    toast.warning('Editing is disabled', {
                        description: 'A deployment is in progress',
                    });
                } else if (state.deployState === 'LOCKED') {
                    toast.error('Editing is locked', {
                        description: 'The system is in a locked state. Please contact support.',
                    });
                }
                return;
            }
            (set as (partial: unknown, replace?: boolean) => void)(partial, replace);
        }) as typeof set;

        return config(guardedSet, get, api);
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// React Hooks (for component usage)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook for components that need edit guarding functionality.
 * This is the recommended way to access guards in React components.
 */
export function useEditGuard() {
    const activeBranch = useBranchStore((s) => s.activeBranch);
    const deployState = useBranchStore((s) => s.deployState);

    return {
        canEdit,
        guardEdit,
        guardEditAsync,
        isLiveMode: activeBranch === 'LIVE',
        isDevMode: activeBranch === 'DEV',
        activeBranch,
        deployState,
    };
}

/**
 * Full branch hook with all state and actions.
 */
export function useBranch() {
    const state = useBranchStore();

    return {
        ...state,
        canEdit,
        guardEdit,
        guardEditAsync,
        isDevMode: state.activeBranch === 'DEV',
        activeBranch: state.activeBranch,
        deployState: state.deployState,
        setVersions: state.setVersions,
        hasUnpublishedChanges: state.devVersion > state.liveVersion,
    };
}
