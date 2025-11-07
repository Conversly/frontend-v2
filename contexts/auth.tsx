"use client";

import { getLoggedInUser } from "@/lib/api/user";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface AuthContextType {}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Only fetch user data if authenticated flag is set
  const isAuthenticated = typeof window !== "undefined" 
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  const { data: user, error } = useQuery({
    queryKey: [QUERY_KEY.LOGGED_IN_USER],
    queryFn: async () => {
      return await getLoggedInUser();
    },
    enabled: isAuthenticated, // Only fetch when authenticated
    retry: false,
  });

  // Protect dashboard routes - redirect to home if not authenticated
  useEffect(() => {
    // Skip protection for public routes
    const publicRoutes = ["/", "/auth/callback", "/login"];
    if (publicRoutes.includes(pathname)) return;

    // Protect dashboard routes
    if (pathname.startsWith("/chatbot") || pathname.startsWith("/dashboard")) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [router, pathname, isAuthenticated]);

  // Update Zustand store with user data
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      // Clear auth flag on error (e.g., expired session)
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "false");
      }
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
