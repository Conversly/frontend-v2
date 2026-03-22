import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import ROICalculator from "@/components/landing/roi-calculator";
import PricingSection from "@/components/landing/pricing";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: 'Pricing - Plans & ROI Calculator | VerlyAI',
  description: 'See VerlyAI pricing plans and calculate your potential savings. AI-powered customer support automation can reduce costs by up to 80%.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing - Plans & ROI Calculator | VerlyAI',
    description: 'Explore VerlyAI pricing plans. Calculate how much you can save with AI customer support automation.',
    url: `${siteConfig.url}/pricing`,
    type: 'website',
  },
  twitter: {
    title: 'Pricing - Plans & ROI Calculator | VerlyAI',
    description: 'Explore VerlyAI pricing plans and calculate your savings.',
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

export default function PricingPage() {
  return (
    <main className="bg-background relative w-full">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <div className={CONTENT_WIDTH}>
          <ROICalculator />
          <PricingSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
