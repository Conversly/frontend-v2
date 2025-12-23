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
        
        // Invalidate cached user data
        await queryClient.invalidateQueries({ 
          queryKey: [QUERY_KEY.LOGGED_IN_USER] 
        });
        
        // Fetch fresh user data
        await queryClient.refetchQueries({ 
          queryKey: [QUERY_KEY.LOGGED_IN_USER] 
        });
        
        // Wait for user data to be fetched
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Invalidate workspaces to refresh after auto-accepted invites
        await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        await queryClient.refetchQueries({ queryKey: ["workspaces"] });
        
        // Check if there's a redirect URL in the URL params (for invite flow)
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get("redirect");
        
        // Small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Redirect to invite page if that's where they came from, otherwise chatbot page
        if (redirectUrl) {
          router.replace(redirectUrl);
        } else {
          // Redirect to chatbot page (workspace will be auto-selected by useWorkspaces hook)
          router.replace("/chatbot");
        }
      } catch (error) {
        console.error("Error during auth callback:", error);
        // On error, redirect to login
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


