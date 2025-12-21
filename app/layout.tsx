import AppContextProvider from "@/contexts";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { merge } from "@/utils/ui";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Space_Grotesk } from "next/font/google";
import { FONTS } from "@/lib/theme/fonts";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VerlyAI",
  description:
    "VerlyAI - Empowering Conversations with Intelligent Chatbots",
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
        <meta name="facebook-domain-verification" content="zq5gdmewsckb4auh452okb9sadoojz" />
        {isTesting && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body
        className={merge(
          spaceGrotesk.variable,
          roboto.variable,
          "font-sans antialiased m-0 p-0",
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
          src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/conversly/loader.min-3EpIMWVWfZ7JgXgUQ8VMmyJYEMX08t.js"
          data-chatbot-id="k56bbuvfjxxcwi1b4617wsr6"
          data-testing="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}