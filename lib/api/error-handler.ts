/**
 * Enhanced error handling for API responses
 * Handles role-based errors, plan restrictions, and other structured errors
 */

import { toast } from "sonner";

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  requiresUpgrade?: boolean;
  action?: string;
  data?: any;
}

/**
 * Check if error is a role-based access error
 */
export const isRoleError = (error: any): boolean => {
  const code = error?.response?.data?.code || error?.code;
  return code === 'OWNER_REQUIRED' || code === 'ADMIN_REQUIRED' || code === 'CHATBOT_ACCESS_DENIED';
};

/**
 * Check if error is a plan restriction error
 */
export const isPlanRestrictionError = (error: any): boolean => {
  const status = error?.response?.status || error?.status;
  const code = error?.response?.data?.code || error?.code;
  const requiresUpgrade = error?.response?.data?.requiresUpgrade || error?.requiresUpgrade;
  
  return status === 403 || code === 'PLAN_RESTRICTION' || requiresUpgrade === true;
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: any): string => {
  // Try to get message from response
  const message = error?.response?.data?.message || error?.message || 'An error occurred';
  
  // Enhance role-based error messages
  const code = error?.response?.data?.code || error?.code;
  if (code === 'OWNER_REQUIRED') {
    return 'Owner access required. Only account owners can perform this action.';
  }
  if (code === 'ADMIN_REQUIRED') {
    return 'Admin or Owner access required. Please contact your account owner.';
  }
  if (code === 'CHATBOT_ACCESS_DENIED') {
    return 'You do not have access to this chatbot. Please contact your account owner.';
  }
  
  return message;
};

/**
 * Show error toast with appropriate styling
 */
export const showErrorToast = (error: any, defaultMessage?: string): void => {
  const message = getErrorMessage(error) || defaultMessage || 'An error occurred';
  const code = error?.response?.data?.code || error?.code;
  
  // Role-based errors get special styling
  if (isRoleError(error)) {
    toast.error(message, {
      description: 'Please contact your account owner for access.',
      duration: 5000,
    });
  } else if (isPlanRestrictionError(error)) {
    toast.error(message, {
      description: 'Consider upgrading your plan to access this feature.',
      duration: 5000,
      action: {
        label: 'View Plans',
        onClick: () => {
          window.location.href = '/subscription';
        },
      },
    });
  } else {
    toast.error(message);
  }
};

/**
 * Extract error details for custom handling
 */
export const getErrorDetails = (error: any): ApiErrorResponse => {
  return {
    success: false,
    message: getErrorMessage(error),
    code: error?.response?.data?.code || error?.code,
    requiresUpgrade: error?.response?.data?.requiresUpgrade || error?.requiresUpgrade,
    action: error?.response?.data?.action || error?.action,
    data: error?.response?.data?.data || error?.data,
  };
};

