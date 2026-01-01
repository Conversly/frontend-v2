import { googleOauth } from "@/lib/api/auth";
import { API } from "@/lib/api/config";
import { useNewUserModal } from "@/store/new-user-modal";
import { GoogleOauthResponse } from "@/types/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthConfig {
  redirectTo?: string;
  onSuccess?: () => Promise<void> | void;
  onError?: (error: string) => void;
}

interface UseAuthReturn {
  authenticateWithGoogle: (
    idToken: string,
  ) => Promise<void>;
  isAuthenticated: () => boolean;
  startGoogleRedirect: (inviteCode?: string) => void;
}

export const useAuth = (config: AuthConfig = {}): UseAuthReturn => {
  const router = useRouter();
  const { showModal } = useNewUserModal();
  const queryClient = useQueryClient();

  const { redirectTo = "/", onSuccess, onError } = config;

  const handleAuthSuccess = useCallback(
    async (message: string, response: GoogleOauthResponse) => {
      try {
        const { isNewUser } = response;

        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");

        // Invalidate and refetch user query to update navbar
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LOGGED_IN_USER],
        });
        
        // Refetch immediately to update the UI
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEY.LOGGED_IN_USER],
        });

        if (onSuccess) {
          await onSuccess();
        }

        if (isNewUser) {
          showModal();
        }

        router.push(redirectTo);

        // Note: Toast functionality removed as react-hot-toast is not installed
        console.log(message);
      } catch (error) {
        console.error("Auth success handler error:", error);
        throw new Error("Authentication successful but navigation failed");
      }
    },
    [router, redirectTo, onSuccess, showModal, queryClient],
  );

  const authenticateWithGoogle = useCallback(
    async (idToken: string): Promise<void> => {
      try {
        const response = await googleOauth(null, idToken);

        if (!response.success || !response.data) {
          throw new Error(response.message || "Google authentication failed");
        }
        
        await handleAuthSuccess(
          "Successfully logged in with Google!",
          response.data,
        );
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Failed to authenticate with Google";

        if (onError) onError(errorMessage);
        console.error(errorMessage);
        throw error;
      }
    },
    [handleAuthSuccess, onError],
  );

  const isAuthenticated = useCallback((): boolean => {
    return localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
  }, []);

  const startGoogleRedirect = useCallback((inviteCode?: string): void => {
    // Store invite code in localStorage before redirect
    if (inviteCode) {
      localStorage.setItem(LOCAL_STORAGE_KEY.INVITE_CODE, inviteCode);
    }
    const origin = window.location.origin;
    const url = `${API.BASE_URL}${API.ENDPOINTS.AUTH.BASE_URL()}/google?origin=${encodeURIComponent(origin)}`;
    window.location.href = url;
  }, []);

  return {
    authenticateWithGoogle,
    isAuthenticated,
    startGoogleRedirect,
  };
};
