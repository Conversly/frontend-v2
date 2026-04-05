import { fetch } from '@/lib/api/axios';
import { ApiResponse } from '@/lib/api/config';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface IdentityVerificationConfig {
  enabled: boolean;
  hasSecret: boolean;
  secret: string | null;
  secretRotatedAt: string | null;
}

export interface TestTokenResult {
  valid: boolean;
  payload?: Record<string, unknown>;
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// API Functions
// ─────────────────────────────────────────────────────────────────────────────

const BASE = '/identity-verification';

/**
 * GET /identity-verification/config?chatbotId=X
 */
export const getIdentityVerificationConfig = async (
  chatbotId: string
): Promise<IdentityVerificationConfig> => {
  const res = await fetch(`${BASE}/config`, {
    method: 'GET',
    params: { chatbotId },
  }).then((r) => r.data) as ApiResponse<IdentityVerificationConfig>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * PATCH /identity-verification/config
 */
export const updateIdentityVerificationConfig = async (
  chatbotId: string,
  enabled: boolean
): Promise<IdentityVerificationConfig> => {
  const res = await fetch(`${BASE}/config`, {
    method: 'PATCH',
    data: { chatbotId, enabled },
  }).then((r) => r.data) as ApiResponse<IdentityVerificationConfig>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * POST /identity-verification/secret?chatbotId=X
 */
export const generateIdentitySecret = async (
  chatbotId: string
): Promise<IdentityVerificationConfig> => {
  const res = await fetch(`${BASE}/secret`, {
    method: 'POST',
    params: { chatbotId },
  }).then((r) => r.data) as ApiResponse<IdentityVerificationConfig>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * DELETE /identity-verification/secret?chatbotId=X
 */
export const revokeIdentitySecret = async (
  chatbotId: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE}/secret`, {
    method: 'DELETE',
    params: { chatbotId },
  }).then((r) => r.data) as ApiResponse<{ success: boolean }>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

/**
 * POST /identity-verification/test
 */
export const testIdentityToken = async (
  chatbotId: string,
  token: string
): Promise<TestTokenResult> => {
  const res = await fetch(`${BASE}/test`, {
    method: 'POST',
    data: { chatbotId, token },
  }).then((r) => r.data) as ApiResponse<TestTokenResult>;

  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};
