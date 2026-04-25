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
import HowItWorks from "@/components/landing/home/how-it-works-steps";
import TestimonialStrip from "@/components/landing/home/testimonial-strip";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";

export const metadata: Metadata = {
  title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
  description:
    "Deploy an AI support agent across voice, WhatsApp, and web chat. Branch your prompts, preview before you ship, roll back in one click. Live in 10 minutes. Start free.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
    description:
      "One agent for voice, WhatsApp, and web chat. Branch prompts, preview, roll back — without breaking a live conversation. Live in 10 minutes.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: "Verly — AI Customer Support for Voice, WhatsApp & Chat",
    description:
      "One agent for voice, WhatsApp, and web chat. Branch prompts, preview, roll back — without breaking a live conversation. Live in 10 minutes.",
  },
};

export default function Home() {
  return (
    <main className="landing-home-page relative w-full">
      {/* Client-side auth redirect - does not affect server render */}
      <ClientAuthRedirect />

      <Navbar />

      {/* 1. Hero — what it is + outcome */}
      <LandingHero />

      {/* 2. Trust strip */}
      <BackedBy />

      {/* 3. Lifecycle + embedded product video (the demo moment) */}
      <SupportLifecycle />

      {/* 4. How it works in 3 steps — reduces signup anxiety */}
      <HowItWorks />

      {/* 5. Use cases — "is this for me?" (moved up for relevance-first) */}
      <UseCases />

      {/* 6. Omnichannel — channels in action */}
      <OmnichannelSection />

      {/* 7. Human handoff — the differentiator, framed as an objection-kill */}
      <HumanEscalationSection />

      {/* 8. Testimonial / social proof strip */}
      {/* <TestimonialStrip /> */}

      {/* 9. Full product tour */}
      <PlatformModules />

      <FeatureShowcase />

      {/* 10. Proof cards — stack, security, guardrails */}
      <ProofCardsSection />

      {/* 11. Security & privacy trust block */}
      <SecurityPrivacySection />

      <Certificate />

      {/* 12. FAQ */}
      <FAQ />

      <Footer />

      {/* Mobile-only sticky CTA bar */}
      <StickyMobileCta />
    </main>
  );
}
