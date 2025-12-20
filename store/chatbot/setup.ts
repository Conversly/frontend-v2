'use client';

import { create } from 'zustand';
import { createChatBot } from '@/lib/api/chatbot';
import { runInitialSetup } from '@/services/setup';
import type { BootstrapSetupResult } from '@/types/setup';

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

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

  setStep: (s: WizardStep) => void;
  setProtocol: (p: 'https://' | 'http://') => void;
  setHost: (h: string) => void;
  setUseCase: (u: string) => void;
  setIsSubmitting: (b: boolean) => void;
  setChatbotId: (id: string) => void;
  reset: () => void;

  startProcessing: (input: StartProcessingInput) => Promise<StartProcessingResult>;
}

export const useSetupStore = create<SetupWizardState>((set, get) => ({
  step: 1,
  protocol: 'https://',
  host: '',
  useCase: 'General AI Agent',
  isSubmitting: false,
  chatbotId: '',

  setStep: (s) => set({ step: s }),
  setProtocol: (p) => set({ protocol: p }),
  setHost: (h) => set({ host: h }),
  setUseCase: (u) => set({ useCase: u }),
  setIsSubmitting: (b) => set({ isSubmitting: b }),
  setChatbotId: (id) => set({ chatbotId: id }),
  reset: () => set({
    step: 1,
    protocol: 'https://',
    host: '',
    useCase: 'General AI Agent',
    isSubmitting: false,
    chatbotId: '',
  }),

  startProcessing: async ({ websiteUrl, useCase, host }) => {
    set({ isSubmitting: true });
    try {
      const defaultName = `${host.trim()} Agent`;
      const defaultDescription = `${useCase} initialized via link setup for ${websiteUrl}`;

      const created = await createChatBot({
        name: defaultName,
        description: defaultDescription,
      });
      const createdId = String(created.id);
      set({ chatbotId: createdId });

      // runInitialSetup will infer and save the prompt via the prompt API
      const result = await runInitialSetup({
        chatbotId: createdId,
        websiteUrl,
        useCase,
      });

      return { ...result, createdId };
    } finally {
      set({ isSubmitting: false });
    }
  },
}));


