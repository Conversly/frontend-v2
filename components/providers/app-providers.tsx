"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThemeProvider } from "@/components/shared/themeProvider";
import AppContextProvider from "@/contexts";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <ThemeProvider attribute="class" enableSystem>
        <AppContextProvider>{children}</AppContextProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
