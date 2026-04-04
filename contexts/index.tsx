"use client";

import QueryClientProvider from "@/contexts/query";
import { AuthProvider } from "@/contexts/auth";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Uncomment and add proper imports when needed
  // useEffect(() => {
  //   createClient({
  //     baseApiUrl: MAINNET_RELAY_API,
  //     source: "trench.ag",
  //     chains: CHAINS as any,
  //   });
  // }, []);

  return (
    <QueryClientProvider>
      <AuthProvider>
        <Suspense>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}
