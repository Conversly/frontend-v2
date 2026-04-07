import { merge } from "@/utils/ui";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import RootClientShell from "@/components/providers/root-client-shell";
import "./globals.css";
import "./landing-page.css";
import { defaultMetadata, organizationSchema, softwareApplicationSchema, websiteSchema } from "@/lib/metadata";

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
        <meta name="google-site-verification" content="zBbV7e5e39RUzbHZUeXcfcjhwYpsMQG9RTHpay76_sg" />
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        {/* Material Symbols Outlined – variable icon font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
        {/* Structured Data for SEO and LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {isTesting && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className={merge(
          lato.variable,
          "h-screen overflow-hidden font-sans antialiased m-0 p-0",
        )}
      >
        <div
          id="main-scroll-container"
          className="relative h-screen overflow-x-hidden overflow-y-auto"
        >
          {children}
        </div>
        <RootClientShell />
        <Script
          src="https://widget.verlyai.xyz/embed.js"
          data-chatbot-id="t5eetmzucjp1o75lafl3duk3"
          data-position="bottom-right"
          data-primary-color="rgb(33, 32, 32)"
          data-testing="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
