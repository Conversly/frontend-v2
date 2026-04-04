import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getIdentityVerificationConfig,
  updateIdentityVerificationConfig,
  generateIdentitySecret,
  revokeIdentitySecret,
  testIdentityToken,
} from '@/lib/api/identity-verification';
import type {
  IdentityVerificationConfig,
  TestTokenResult,
} from '@/lib/api/identity-verification';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

export const identityVerificationKeys = {
  all: ['identity-verification'] as const,
  config: (chatbotId: string) =>
    [...identityVerificationKeys.all, 'config', chatbotId] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

export function useIdentityVerificationConfig(chatbotId: string) {
  return useQuery({
    queryKey: identityVerificationKeys.config(chatbotId),
    queryFn: () => getIdentityVerificationConfig(chatbotId),
    enabled: !!chatbotId,
    staleTime: 30_000,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────────────────────────────────────

export function useToggleIdentityVerification(chatbotId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enabled: boolean) =>
      updateIdentityVerificationConfig(chatbotId, enabled),
    onSuccess: (data) => {
      queryClient.setQueryData<IdentityVerificationConfig>(
        identityVerificationKeys.config(chatbotId),
        data
      );
    },
  });
}

export function useGenerateIdentitySecret(chatbotId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateIdentitySecret(chatbotId),
    onSuccess: (data) => {
      queryClient.setQueryData<IdentityVerificationConfig>(
        identityVerificationKeys.config(chatbotId),
        data
      );
    },
  });
}

export function useRevokeIdentitySecret(chatbotId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => revokeIdentitySecret(chatbotId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: identityVerificationKeys.config(chatbotId),
      });
    },
  });
}

export function useTestIdentityToken(chatbotId: string) {
  return useMutation({
    mutationFn: (token: string) => testIdentityToken(chatbotId, token),
  });
}
