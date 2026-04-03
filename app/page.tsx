import type { Metadata } from "next";

import Navbar from "@/components/landing/navbar";
import CrispHero from "@/components/crisp-landing/crisp-hero";
import CrispSupportLifecycle from "@/components/crisp-landing/crisp-support-lifecycle";
import CrispFeatures from "@/components/crisp-landing/crisp-features";
import ClientAuthRedirect from "@/components/landing/ClientAuthRedirect";
import Certificate from "@/components/crisp-landing/certificate";
import { siteConfig } from "@/lib/metadata";
import CrispFullscreenImage from "@/components/crisp-landing/crisp-fullscreen-image";
import Footer from "@/components/crisp-landing/crisp-footer";
import CrispPlatformModules from "@/components/crisp-landing/crisp-platform-modules";
import {
  OmnichannelSection,
} from "@/components/crisp-landing/crisp-new-sections";
import UseCases from "@/components/landing/UseCases";
import FAQ from "@/components/landing/FAQ";
import HumanEscalationSection from "@/components/landing/human-escalation";

export const metadata: Metadata = {
  title: 'Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp',
  description: 'Verly is the AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in. One system for AI, routing, and escalation.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp',
    description: 'The AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in. Replace your fragmented stack with one system.',
    url: siteConfig.url,
    type: 'website',
  },
  twitter: {
    title: 'Verly - AI Customer Support Platform | Web Chat, Voice & WhatsApp',
    description: 'The AI customer support platform for web chat, voice, and WhatsApp — with human handoff built in.',
  },
};

export default function Home() {
  return (
    <main className="bg-white relative w-full">
      {/* Client-side auth redirect - does not affect server render */}
      <ClientAuthRedirect />

      <Navbar />

      {/* 1. Hero: category, channels, CTA, real product visual */}
      <CrispHero />

      {/* 2. How it works: support lifecycle */}
      <CrispSupportLifecycle />

      {/* 5. Product demo video */}
      <CrispFullscreenImage />

      {/* 6. Omnichannel proof: web, WhatsApp, voice */}
      <OmnichannelSection />

      {/* 7. Human handoff section */}
      <HumanEscalationSection />

      {/* 8. Interactive showcase: feature highlights */}
      <CrispFeatures />

      {/* 9. Platform modules deep-dive */}
      <CrispPlatformModules />

      {/* 10. Use cases */}
      <UseCases />

      {/* 11. Trust & certifications */}
      <Certificate />

      {/* 12. FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
