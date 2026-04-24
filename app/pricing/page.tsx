import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import ROICalculator from "@/components/landing/roi-calculator";
import PricingSection from "@/components/landing/pricing";
import PricingDecisionBanner from "@/components/landing/pricing-decision-banner";
import PricingFounderNote from "@/components/landing/pricing-founder-note";
import { pricingFaqs } from "@/lib/pricing-faqs";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo-schema";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: 'Pricing — AI Customer Support Plans from $0',
  description: 'Transparent pricing that scales with your tickets, not your headcount. Free for builders, $29.99 for startups, custom for enterprise. No per-seat fees.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing — AI Customer Support Plans from $0',
    description: 'Pay for the conversations Verly resolves, not the agents you hire. Start free with 50 messages, upgrade when you are ready.',
    url: `${siteConfig.url}/pricing`,
    type: 'website',
  },
  twitter: {
    title: 'Pricing — AI Customer Support Plans from $0',
    description: 'Transparent pricing. No per-seat fees. No surprise overage bills.',
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

const faqSchema = buildFaqSchema(pricingFaqs);

export default function PricingPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_18%,#eef5ff_52%,#ffffff_100%)] text-[#111827]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
        <div className="absolute left-[-12%] top-24 h-[26rem] w-[26rem] rounded-full bg-[#bfdbfe]/50 blur-[120px]" />
        <div className="absolute right-[-8%] top-[22rem] h-[24rem] w-[24rem] rounded-full bg-[#dbeafe] blur-[120px]" />
        <div className="absolute bottom-[-8rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#e0f2fe] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className={`${CONTENT_WIDTH} relative`}>
          <PricingSection />
        </div>

        {/* Full-bleed editorial founder note + pricing FAQ */}
        <PricingFounderNote />

        <div className={`${CONTENT_WIDTH} relative`}>
          <ROICalculator />
          <PricingDecisionBanner />
          <Footer />
        </div>
      </div>
    </main>
  );
}
