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
  HandoffSection,
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


// ours
// import type { Metadata } from "next";

// // Server Component - renders static HTML for SEO
// import Navbar from "@/components/landing/navbar";
// import Hero from "@/components/landing/hero";

// import Footer from "@/components/landing/footer";
// import UnifiedOfferings from "@/components/landing/unified-offerings";
// import HumanEscalationSection from "@/components/landing/human-escalation";
// import ComparisonSection from "@/components/landing/comparison-section";
// import ExploreSection from "@/components/landing/explore-section";
// import UseCases from "@/components/landing/UseCases";
// import FAQ from "@/components/landing/FAQ";
// import ClientAuthRedirect from "@/components/landing/ClientAuthRedirect";
// import { siteConfig } from "@/lib/metadata";

// export const metadata: Metadata = {
//   title: 'VerlyAI - AI Agent for Customer Support | Voice, WhatsApp & Web Chat',
//   description: 'Automate customer support with VerlyAI. Deploy intelligent AI agents for Voice, WhatsApp, and Web Chat in minutes. Reduce support costs by 80% and handle unlimited conversations simultaneously.',
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: 'VerlyAI - AI Agent for Customer Support | Voice, WhatsApp & Web Chat',
//     description: 'Deploy AI agents that handle 10X more customers without hiring. Instant answers on Voice, WhatsApp, and Web. Start for free.',
//     url: siteConfig.url,
//     type: 'website',
//   },
//   twitter: {
//     title: 'VerlyAI - AI Agent for Customer Support | Voice, WhatsApp & Web Chat',
//     description: 'Deploy AI agents that handle 10X more customers without hiring. Instant answers on Voice, WhatsApp, and Web.',
//   },
// };

// // Single source of truth for content width
// const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

// export default function Home() {
//   return (
//     <main className="bg-background relative w-full">
//       {/* Client-side auth redirect - does not affect server render */}
//       <ClientAuthRedirect />

//       {/* Global Grid Background */}
//       <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

//       <div className="relative z-10">
//         <Navbar />

//         <div className={CONTENT_WIDTH}>
//           {/* Hero Section - Contains H1 and primary messaging */}
//           <Hero />

//           {/* Unified Offerings Section - Contains H2 and feature cards */}
//           <UnifiedOfferings />
//         </div>

//         {/* Explore Platform Section - Visual showcase */}
//         <ExploreSection />

//         <div className={CONTENT_WIDTH}>
//           {/* Comparison Section - AI vs Human */}
//           <ComparisonSection />

//           {/* Human Escalation Section */}
//           <HumanEscalationSection />

//           {/* Use Cases Section - SEO content for different industries */}
//           <UseCases />

//           {/* FAQ Section - Structured data for SEO */}
//           <FAQ />

//           {/* Footer */}
//           <Footer />
//         </div>
//       </div>
//     </main>
//   );
// } 
