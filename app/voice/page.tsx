import type { Metadata } from "next";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import AppProviders from "@/components/providers/app-providers";
import { siteConfig } from "@/lib/metadata";
import { VoiceMarketingPage } from "@/components/voice-marketing/voice-marketing-page";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Voice AI Agents for Support, Sales, and Website Calls",
  description:
    "Build Verly voice agents for website voice widgets, inbound customer support, outbound campaigns, and lead qualification. Launch phone and web voice workflows with knowledge, actions, analytics, and escalation in one platform.",
  alternates: {
    canonical: "/voice",
  },
  openGraph: {
    title: "Voice AI Agents for Support, Sales, and Website Calls",
    description:
      "Deploy Verly voice agents for inbound calls, outbound campaigns, customer support, website voice, and lead qualification with a single platform.",
    url: `${siteConfig.url}/voice`,
    type: "website",
  },
  twitter: {
    title: "Voice AI Agents for Support, Sales, and Website Calls",
    description:
      "Launch Verly voice agents for support, outreach, website conversations, and lead qualification.",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Voice AI", path: "/voice" },
]);

export default function VoicePage() {
  return (
    <AppProviders>
      <main className="relative min-h-screen bg-[#050816]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Navbar />
        <VoiceMarketingPage />
        <Footer hideCta />
      </main>
    </AppProviders>
  );
}
