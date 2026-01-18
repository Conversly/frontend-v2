import AppContextProvider from "@/contexts";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { merge } from "@/utils/ui";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Lato } from "next/font/google";
import { FONTS } from "@/lib/theme/fonts";
import "./globals.css";
import { CalendlyWidget } from "@/components/landing/calendly-widget";
import { defaultMetadata, organizationSchema } from "@/lib/metadata";

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

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
        <meta name="google-site-verification" content="9XuDInfIUwvzXqkGdpiv9lcsQ0kIRvymv3wuCRlkQG0" />
        {/* Structured Data for SEO and LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {isTesting && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body
        className={merge(
          lato.variable,
          "font-sans antialiased m-0 p-0 h-full w-full flex flex-col overflow-hidden",
        )}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <ThemeProvider attribute="class" enableSystem>
            <AppContextProvider>
              <div className="flex-1 overflow-y-auto h-full w-full relative" id="main-scroll-container">
                {children}
              </div>
            </AppContextProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
        <Script
          src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/conversly/loader.min-6ZKnVNM1zLHWjlcvYW3dJCYSJwwIdS.js"
          data-chatbot-id="qtiggf3l7ptqshvuqm8iktsn"
          data-testing="false"
          strategy="afterInteractive"
        />
        <CalendlyWidget />
      </body>
    </html>
  );
}