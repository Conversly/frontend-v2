'use client';
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing";
import QuestionsSection from "@/components/landing/questions";
import Footer from "@/components/landing/footer";

import ScalabilitySection from "@/components/landing/scalability";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import HighlightsSection from "@/components/landing/highlight";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
      if (isLoggedIn === "true") {
        router.replace("/chatbot"); 
      }
    } catch { }
  }, [router]);

  return (
    <main className="bg-background relative min-h-screen">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <Navbar />
        <Hero />
        <HighlightsSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />

        <QuestionsSection />
        <Footer />
      </div>
    </main>
  );
}
