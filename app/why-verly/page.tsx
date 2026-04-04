import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import WhyVerlyShowcase from "@/components/why-verly/why-verly-showcase";
import {
  WhyComparison,
  WhyFaq,
  WhyFinalCta,
  WhyHero,
  WhyReasonsIndex,
  WhyProofBand,
  WhyUseCases,
} from "@/components/why-verly/why-verly-sections";
import { WHY_VERLY_PAGE } from "@/components/why-verly/why-verly-content";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Why Verly | AI Customer Support That Resolves More",
  description:
    "See why fast-growing teams choose Verly for AI customer support across voice, WhatsApp, and web chat. Explore the architecture, workflow, and ROI advantages.",
  alternates: {
    canonical: "/why-verly",
  },
  openGraph: {
    title: "Why Verly | AI Customer Support That Resolves More",
    description:
      "Discover the six reasons support teams choose Verly for AI-native customer support across voice, WhatsApp, and web chat.",
    url: `${siteConfig.url}/why-verly`,
    type: "website",
  },
  twitter: {
    title: "Why Verly | AI Customer Support That Resolves More",
    description:
      "Explore why teams choose Verly for faster replies, lower support cost, and omnichannel AI support.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Why Verly", item: `${siteConfig.url}/why-verly` },
  ],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: WHY_VERLY_PAGE.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function WhyVerlyPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Navbar />
      <WhyHero />
      <WhyReasonsIndex />
      <WhyVerlyShowcase />
      <WhyProofBand />
      <WhyComparison />
      <WhyUseCases />
      <WhyFaq />
      <WhyFinalCta />
      <Footer hideCta />
    </main>
  );
}
