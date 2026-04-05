import type { Metadata } from "next";

import Navbar from "@/components/landing/navbar";
import LandingHero from "@/components/landing/home/hero";
import ProofCardsSection from "@/components/landing/home/proof-cards";
import SupportLifecycle from "@/components/landing/home/support-lifecycle";
import ClientAuthRedirect from "@/components/landing/ClientAuthRedirect";
import { siteConfig } from "@/lib/metadata";
import Footer from "@/components/landing/footer";
import PlatformModules from "@/components/landing/home/platform-modules";
import SecurityPrivacySection from "@/components/landing/home/security-privacy";
import { OmnichannelSection } from "@/components/landing/home/channel-sections";
import UseCases from "@/components/landing/UseCases";
import FAQ from "@/components/landing/FAQ";
import HumanEscalationSection from "@/components/landing/human-escalation";
import BackedBy from "@/components/landing/home/backed-by";
import FeatureShowcase from "@/components/landing/home/feature-showcase";
import FullscreenVideo from "@/components/landing/home/fullscreen-video";
import Certificate from "@/components/landing/home/certificate";

export const metadata: Metadata = {
  title: "Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp",
  description:
    "Verly is the AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in. One system for AI, routing, and escalation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp",
    description:
      "The AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in. Replace your fragmented stack with one system.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: "Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp",
    description:
      "The AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in.",
  },
};

export default function Home() {
  return (
    <main className="landing-home-page relative w-full">
      {/* Client-side auth redirect - does not affect server render */}
      <ClientAuthRedirect />

      <Navbar />

      {/* 1. Hero: category, channels, CTA, real product visual */}
      <LandingHero />

      {/* 2. Early trust strip */}
      <BackedBy />

      {/* 3. Main interactive showcase */}
      <PlatformModules />

      {/* 4. Product story: lifecycle */}
      <SupportLifecycle />

      {/* 6. Human handoff section */}
      <HumanEscalationSection />

      {/* 5. Omnichannel proof: web, WhatsApp, voice */}
      <OmnichannelSection />

      <FeatureShowcase />

      {/* 7. Proof cards */}
      <ProofCardsSection />

      {/* 8. Use cases */}
      <UseCases />

      {/* 9. Security & privacy trust block */}
      <SecurityPrivacySection />

      <Certificate />

      {/* 10. FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
