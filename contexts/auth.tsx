"use client";

import { getLoggedInUser } from "@/lib/api/user";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface AuthContextType { }
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setAuthStatus } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Read authentication flag for route protection only
  const isAuthenticated = typeof window !== "undefined"
    ? localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
    : false;

  const { data: user, error, isFetching } = useQuery({
    queryKey: [QUERY_KEY.LOGGED_IN_USER],
    queryFn: async () => {
      return await getLoggedInUser();
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update auth status based on query state
  useEffect(() => {
    if (isFetching) {
      setAuthStatus('loading');
    } else if (user) {
      setAuthStatus('authenticated');
      setUser({
        ...user,
        name: user.displayName || "",
        username: user.username || "",
        avatarUrl: user.avatarUrl || null,
      });
    } else {
      setAuthStatus('unauthenticated');
      setUser(null);
    }
  }, [isFetching, user, setAuthStatus, setUser]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      setAuthStatus('unauthenticated');
      setUser(null);
      console.error("Authentication error:", error);
    }
  }, [error, setAuthStatus, setUser]);

  // Protect dashboard routes - redirect to home if not authenticated
  useEffect(() => {
    // Skip protection for public routes
    const publicRoutes = ["/", "/auth/callback", "/login"];
    if (publicRoutes.includes(pathname)) return;

    // Protect dashboard routes
    const segs = pathname.split("/").filter(Boolean);
    const isWorkspaceRoute =
      segs.length >= 2 &&
      [
        "chatbot",
        "promote-manager",
        "profile",
        "activity",
        "analytics",
        "billing",
        "audit-logs",
        "team",
      ].includes(segs[1]);

    if (isWorkspaceRoute) {
      if (!isAuthenticated) {
        // TODO: Change back to "/login" when launching properly
        router.push("/");
        // router.push("/login");
      }
    }
  }, [router, pathname, isAuthenticated]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
