import AppContextProvider from "@/contexts";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { merge } from "@/utils/ui";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Space_Grotesk } from "next/font/google";
import { FONTS } from "@/lib/theme/fonts";
import "./globals.css";
import { CalendlyWidget } from "@/components/landing/calendly-widget";
import { defaultMetadata, organizationSchema } from "@/lib/metadata";
import GlobalChatWidget from "@/components/shared/GlobalChatWidget";

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
        <GlobalChatWidget />
        <CalendlyWidget />
      </body>
    </html>
  );
}