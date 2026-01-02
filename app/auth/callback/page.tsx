"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { QUERY_KEY } from "@/utils/query-key";

export default function AuthCallback() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
        
        // Small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirect to dashboard
        router.replace("/chatbot");
      } catch (error) {
        console.error("Error during auth callback:", error);
        // On error, redirect to login
        router.replace("/login");
      }
    };
    run();
  }, [router, queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}


