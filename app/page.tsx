import type { Metadata } from "next";

import Navbar from "@/components/landing/navbar";
import LandingHero from "@/components/landing/home/hero";
import SupportLifecycle from "@/components/landing/home/support-lifecycle";
import FeatureShowcase from "@/components/landing/home/feature-showcase";
import ClientAuthRedirect from "@/components/landing/ClientAuthRedirect";
import Certificate from "@/components/landing/home/certificate";
import { siteConfig } from "@/lib/metadata";
import FullscreenVideo from "@/components/landing/home/fullscreen-video";
import Footer from "@/components/landing/footer";
import PlatformModules from "@/components/landing/home/platform-modules";
import {
  OmnichannelSection,
} from "@/components/landing/home/channel-sections";
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
      <LandingHero />

      {/* 2. How it works: support lifecycle */}
      <SupportLifecycle />

      {/* 5. Product demo video */}
      <FullscreenVideo />

      {/* 6. Omnichannel proof: web, WhatsApp, voice */}
      <OmnichannelSection />

      {/* 7. Human handoff section */}
      <HumanEscalationSection />

      {/* 8. Interactive showcase: feature highlights */}
      <FeatureShowcase />

      {/* 9. Platform modules deep-dive */}
      <PlatformModules />

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
