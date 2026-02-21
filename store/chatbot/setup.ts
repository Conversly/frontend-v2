'use client';

import { create } from 'zustand';
import { createChatBot, updateChatbot } from '@/lib/api/chatbot';
import { runInitialSetup } from '@/services/setup';
import { saveSetupCache, clearSetupCache } from '@/lib/setup-cache';
import type { BootstrapSetupResult } from '@/types/setup';
import type { ChatbotResponse, StepStatuses, SetupStepStatus } from '@/types/chatbot';

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface StartProcessingInput {
  websiteUrl: string;
  useCase: string;
  host: string;
}

interface StartProcessingResult extends BootstrapSetupResult {
  createdId: string;
}

interface SetupWizardState {
  step: WizardStep;
  protocol: 'https://' | 'http://';
  host: string;
  useCase: string;
  isSubmitting: boolean;
  chatbotId: string;
  workspaceId?: string;
  /** Prompt inferred during Step 2 – available immediately without a re-fetch. */
  inferredPrompt: string;
  /** Server-persisted version for optimistic locking */
  version: number;
  /** Per-step completion statuses (mirrored from DB) */
  stepStatuses: StepStatuses;

  setStep: (s: WizardStep) => void;
  setProtocol: (p: 'https://' | 'http://') => void;
  setHost: (h: string) => void;
  setUseCase: (u: string) => void;
  setIsSubmitting: (b: boolean) => void;
  setChatbotId: (id: string) => void;
  setWorkspaceId: (id?: string) => void;
  setInferredPrompt: (p: string) => void;
  reset: () => void;

  startProcessing: (input: StartProcessingInput) => Promise<StartProcessingResult>;

  /** Persist current step + statuses to the backend (fire-and-forget). */
  persistStep: (targetStep: WizardStep, status: SetupStepStatus) => void;
  /** Load wizard state from a ChatbotResponse (used on resume/refresh). */
  hydrateFromServer: (bot: ChatbotResponse) => void;
}

export const useSetupStore = create<SetupWizardState>((set, get) => ({
  step: 1,
  protocol: 'https://',
  host: '',
  useCase: 'General AI Agent',
  isSubmitting: false,
  chatbotId: '',
  workspaceId: undefined,
  inferredPrompt: '',
  version: 1,
  stepStatuses: {},

  setStep: (s) => {
    set({ step: s });
    // Fire-and-forget persistence to backend
    get().persistStep(s, 'in_progress');
  },
  setProtocol: (p) => set({ protocol: p }),
  setHost: (h) => set({ host: h }),
  setUseCase: (u) => set({ useCase: u }),
  setIsSubmitting: (b) => set({ isSubmitting: b }),
  setChatbotId: (id) => set({ chatbotId: id }),
  setWorkspaceId: (id) => set({ workspaceId: id }),
  setInferredPrompt: (p) => set({ inferredPrompt: p }),
  reset: () => {
    const { chatbotId } = get();
    if (chatbotId) clearSetupCache(chatbotId);
    set({
      step: 1,
      protocol: 'https://',
      host: '',
      useCase: 'General AI Agent',
      isSubmitting: false,
      chatbotId: '',
      workspaceId: undefined,
      inferredPrompt: '',
      version: 1,
      stepStatuses: {},
    });
  },

  persistStep: async (targetStep, status) => {
    const { chatbotId, stepStatuses, version, workspaceId } = get();
    if (!chatbotId || !workspaceId) return;

    const updated = { ...stepStatuses, [String(targetStep)]: status };
    set({ stepStatuses: updated });

    try {
      const res = await updateChatbot({
        id: chatbotId,
        workspaceId,
        setupCurrentStep: targetStep,
        setupStepStatuses: updated,
        version,
      });
      // Sync the server version back
      if (res.version) {
        set({ version: res.version });
      }
    } catch (e) {
      console.warn('[setup] Failed to persist step', e);
    }
  },

  hydrateFromServer: (bot) => {
    set({
      chatbotId: bot.id,
      step: (bot.setupCurrentStep || 1) as WizardStep,
      stepStatuses: bot.setupStepStatuses || {},
      version: bot.version || 1,
      host: bot.websiteUrl ? (() => { try { return new URL(bot.websiteUrl).hostname; } catch { return ''; } })() : '',
      protocol: bot.websiteUrl?.startsWith('http://') ? 'http://' : 'https://',
      useCase: bot.useCase || '',
    });
  },

  startProcessing: async ({ websiteUrl, useCase, host }) => {
    set({ isSubmitting: true });
    try {
      const defaultName = `${host.trim()} Agent`;
      const defaultDescription = `${useCase} initialized via link setup for ${websiteUrl}`;

      const created = await createChatBot({
        name: defaultName,
        description: defaultDescription,
        workspaceId: get().workspaceId,
        status: 'DRAFT',
        websiteUrl,
        useCase,
      });
      const createdId = String(created.id);
      set({
        chatbotId: createdId,
        version: created.version || 1,
        stepStatuses: (created.setupStepStatuses as StepStatuses) || {},
      });

      // runInitialSetup will infer and save the prompt via the prompt API
      const result = await runInitialSetup({
        chatbotId: createdId,
        websiteUrl,
        useCase,
      });

      // Cache the inferred prompt so Step 6 shows it immediately without re-fetching
      const promptText = result.inferPrompt?.systemPrompt || '';
      if (promptText) {
        set({ inferredPrompt: promptText });
      }

      // Persist result to localStorage so a resume within 30 min skips re-calling the APIs
      saveSetupCache(createdId, result);

      return { ...result, createdId };
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
