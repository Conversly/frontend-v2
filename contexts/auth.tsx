"use client";

import { getLoggedInUser } from "@/lib/api/user";
import { getVerlyIdentityToken } from "@/lib/api/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";

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

  // ─── Verly AI Widget Identity Verification ───
  // When the user is authenticated, fetch an identity JWT and identify them
  // to the embedded support chatbot widget so it can greet them by name.
  const identifiedUserRef = useRef<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!user?.id) {
      if (identifiedUserRef.current && typeof (window as any).verly === "function") {
        (window as any).verly("resetUser");
      }
      identifiedUserRef.current = null;
      return;
    }

    if (identifiedUserRef.current === user.id) return;

    let cancelled = false;
    let retryTimeout: number | null = null;
    const script = document.querySelector('script[src*="verlyai.xyz/embed.js"]');
    const identifyPayload = {
      name: user.displayName || user.username || "",
    };

    const tryIdentify = (token: string) => {
      if (cancelled || identifiedUserRef.current === user.id) return true;

      if (typeof (window as any).verly !== "function") {
        return false;
      }

      (window as any).verly("identify", {
        token,
        ...identifyPayload,
      });
      identifiedUserRef.current = user.id;
      return true;
    };

    const scheduleIdentifyRetries = (token: string) => {
      let attempts = 0;
      const maxAttempts = 20;
      const retryDelayMs = 250;

      const attempt = () => {
        if (tryIdentify(token) || cancelled) return;
        attempts += 1;
        if (attempts >= maxAttempts) return;
        retryTimeout = window.setTimeout(attempt, retryDelayMs);
      };

      attempt();
    };

    const handleScriptLoad = () => {
      getVerlyIdentityToken().then((token) => {
        if (!token || cancelled) return;
        if (!tryIdentify(token)) {
          scheduleIdentifyRetries(token);
        }
      }).catch(() => {
        // Silent — identity verification is best-effort, never blocks the app
      });
    };

    if (script) {
      script.addEventListener("load", handleScriptLoad, { once: true });
    }

    handleScriptLoad();

    return () => {
      cancelled = true;
      if (retryTimeout !== null) {
        window.clearTimeout(retryTimeout);
      }
      if (script) {
        script.removeEventListener("load", handleScriptLoad);
      }
    };
  }, [user]);

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
