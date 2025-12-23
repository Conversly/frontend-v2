import { logout as apiLogout } from "@/lib/api/auth";
import { User } from "@/types/user";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  authStatus: 'loading' | 'authenticated' | 'unauthenticated';
  setUser: (user: User | null) => void;
  setAuthStatus: (status: 'loading' | 'authenticated' | 'unauthenticated') => void;
  logout: (queryClient?: QueryClient) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authStatus: 'loading',
      setUser: (user) => set({ user }),
      setAuthStatus: (authStatus) => set({ authStatus }),
      logout: async (queryClient?: QueryClient) => {
        if (queryClient) {
          queryClient.removeQueries({
            queryKey: [QUERY_KEY.LOGGED_IN_USER],
          });
        }

        // Clear localStorage flag
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "false");
        
        // Clear active workspace ID to prevent cross-user workspace access
        localStorage.removeItem("activeAccountId");

        set({
          user: null,
          authStatus: 'unauthenticated',
        });
        await apiLogout();
        window.location.reload();
      },
    }),
    {
      name: LOCAL_STORAGE_KEY.AUTH,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
