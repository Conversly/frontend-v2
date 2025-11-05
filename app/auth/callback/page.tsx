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
      localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGGED_IN_USER] });
      await queryClient.refetchQueries({ queryKey: [QUERY_KEY.LOGGED_IN_USER] });
      router.replace("/");
    };
    run();
  }, [router, queryClient]);

  return null;
}


