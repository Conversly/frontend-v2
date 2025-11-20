import AppContextProvider from "@/contexts";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { merge } from "@/utils/ui";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConverslyAI",
  description:
    "ConverslyAI - Empowering Conversations with Intelligent Chatbots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTesting = process.env.NEXT_PUBLIC_TESTING_ENABLED === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {isTesting && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body
        className={merge(
          inter.variable,
          "font-sans antialiased",
        )}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <ThemeProvider attribute="class" enableSystem>
            <AppContextProvider>{children}</AppContextProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
        <Script
          src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/conversly/loader.min-sRNyhzUvzlVBnixhJK0bLNS4FwyhxX.js"
          data-chatbot-id="s34qkifi608kgew21flmb5bl"
          data-testing="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}