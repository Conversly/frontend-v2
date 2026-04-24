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
  title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
  description:
    "Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Verly answers 80% of tickets and hands the rest to your team with full context. Start free.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
    description:
      "Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Answers 80% of tickets, hands off the rest with full context.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
    description:
      "Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Answers 80% of tickets, hands off the rest with full context.",
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

      {/* 4. Product story: lifecycle */}
      <SupportLifecycle />

      {/* 6. Human handoff section */}
      <HumanEscalationSection />

      {/* 3. Main interactive showcase */}
      <PlatformModules />

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
