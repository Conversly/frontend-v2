"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";
import { useWorkspaces } from "@/hooks/use-workspaces";

export default function AuthCallback() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setActiveWorkspace } = useWorkspaces();

  useEffect(() => {
    const run = async () => {
      try {
        // Mark user as logged in
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");

        // Parallel data fetching for performance
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGGED_IN_USER] }),
          queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
        ]);

        const [userData, workspacesData] = await Promise.all([
          queryClient.fetchQuery({ queryKey: [QUERY_KEY.LOGGED_IN_USER] }),
          queryClient.fetchQuery({ queryKey: ["workspaces"] })
        ]);

        // Determine redirect destination
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get("redirect");

        if (redirectUrl) {
          router.replace(redirectUrl);
        } else {
          // Redirect to chatbot page (workspace will be auto-selected by useWorkspaces hook or middleware)
          router.replace("/chatbot");
        }
      } catch (error) {
        console.error("Error during auth callback:", error);
        router.replace("/login");
      }
    };
    run();
  }, [router, queryClient, setActiveWorkspace]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}


