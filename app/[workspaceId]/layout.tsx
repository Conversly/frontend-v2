"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { WorkspaceProvider } from "@/contexts/workspace-context";
import type { WorkspaceContext } from "@/types/permissions";
import { getWorkspaceContext } from "@/lib/api/workspaces";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import { useRouteProtection } from "@/hooks/use-route-protection";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();
  const workspaceId = params.workspaceId;

  const [ctx, setCtx] = useState<WorkspaceContext | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Route protection will be applied after context is loaded

  useEffect(() => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";

    if (!isLoggedIn) {
      router.replace("/");
      return;
    }

    let cancelled = false;
    setCtx(null);
    setError(null);

    getWorkspaceContext(workspaceId)
      .then((data) => {
        if (cancelled) return;
        setCtx(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message || "Failed to load workspace context");
      });

    return () => {
      cancelled = true;
    };
  }, [router, workspaceId]);

  if (error) {
    // If the workspaceId is invalid for this user, redirect to their first workspace
    getUserWorkspaces()
      .then((ws) => {
        const first = ws[0]?.workspaceId;
        if (first) router.replace(`/${first}/chatbot`);
        else router.replace("/");
      })
      .catch(() => router.replace("/"));
    return null;
  }

  if (!ctx) {
    return null;
  }

  return (
    <WorkspaceProvider value={ctx}>
      <div className="theme-workspace h-full w-full">
        <RouteProtectionWrapper>{children}</RouteProtectionWrapper>
      </div>
    </WorkspaceProvider>
  );
}

// Separate component to use the hook after context is available
function RouteProtectionWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthorized } = useRouteProtection();

  // Show loading state while checking authorization
  if (isAuthorized === null) {
    return <>{children}</>;
  }

  // If unauthorized, show access denied message (redirect happens in hook)
  if (isAuthorized === false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-2xl font-semibold">Access Denied</div>
          <div className="text-muted-foreground">Redirecting you to a safe page...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

