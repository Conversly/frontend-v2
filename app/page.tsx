// Server Component - renders static HTML for SEO
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import PricingSection from "@/components/landing/pricing";
import Footer from "@/components/landing/footer";
import UnifiedOfferings from "@/components/landing/unified-offerings";
import HumanEscalationSection from "@/components/landing/human-escalation";
import ComparisonSection from "@/components/landing/comparison-section";
import ExploreSection from "@/components/landing/explore-section";
import UseCases from "@/components/landing/UseCases";
import FAQ from "@/components/landing/FAQ";
import ClientAuthRedirect from "@/components/landing/ClientAuthRedirect";

// Single source of truth for content width
const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

export default function Home() {
  return (
    <main className="bg-background relative w-full">
      {/* Client-side auth redirect - does not affect server render */}
      <ClientAuthRedirect />

      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <div className={CONTENT_WIDTH}>
          {/* Hero Section - Contains H1 and primary messaging */}
          <Hero />

          {/* Unified Offerings Section - Contains H2 and feature cards */}
          <UnifiedOfferings />
        </div>

        {/* Explore Platform Section - Visual showcase */}
        <ExploreSection />

        <div className={CONTENT_WIDTH}>
          {/* Comparison Section - AI vs Human */}
          <ComparisonSection />

          {/* Human Escalation Section */}
          <HumanEscalationSection />

          {/* Use Cases Section - SEO content for different industries */}
          <UseCases />

          {/* Pricing Section */}
          <PricingSection />

          {/* FAQ Section - Structured data for SEO */}
          <FAQ />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
