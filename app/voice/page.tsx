import type { Metadata } from "next";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { siteConfig } from "@/lib/metadata";
import { VoiceMarketingPage } from "@/components/voice-marketing/voice-marketing-page";

export const metadata: Metadata = {
  title: "Voice AI Agents for Support, Sales, and Website Calls | VerlyAI",
  description:
    "Build VerlyAI voice agents for website voice widgets, inbound customer support, outbound campaigns, and lead qualification. Launch phone and web voice workflows with knowledge, actions, analytics, and escalation in one platform.",
  alternates: {
    canonical: "/voice",
  },
  openGraph: {
    title: "Voice AI Agents for Support, Sales, and Website Calls | VerlyAI",
    description:
      "Deploy VerlyAI voice agents for inbound calls, outbound campaigns, customer support, website voice, and lead qualification with a single platform.",
    url: `${siteConfig.url}/voice`,
    type: "website",
  },
  twitter: {
    title: "Voice AI Agents for Support, Sales, and Website Calls | VerlyAI",
    description:
      "Launch VerlyAI voice agents for support, outreach, website conversations, and lead qualification.",
  },
};

export default function VoicePage() {
  return (
    <main className="relative min-h-screen bg-[#050816]">
      <Navbar />
      <VoiceMarketingPage />
      <Footer />
    </main>
  );
}
