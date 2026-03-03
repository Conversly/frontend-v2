"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { getUserWorkspaces } from "@/lib/api/workspaces";

/**
 * Client-side auth redirect wrapper
 * Separates client-side logic from server component
 */
export default function ClientAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
      if (isLoggedIn === "true") {
        getUserWorkspaces()
          .then((ws) => {
            const first = ws[0]?.workspaceId;
            if (first) router.replace(`/${first}/chatbot`);
          })
          .catch(() => {
            // Local flag says logged-in, but backend says no (cookie expired, etc).
            // Clear it to prevent redirect ping-pong between `/` and `/:workspaceId/...`.
            localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "false");
          });
      }
    } catch { }
  }, [router]);

  return null;
}
