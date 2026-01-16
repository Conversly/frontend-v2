'use client';
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Testimonial from "@/components/landing/testimonial";
import HowItWorks from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing";
import QuestionsSection from "@/components/landing/questions";
import Footer from "@/components/landing/footer";
import UnifiedOfferings from "@/components/landing/unified-offerings";
import BroadcastSection from "@/components/landing/broadcast-section";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import TestimonialsSection from "@/components/landing/Testinomials";

// Single source of truth for content width
const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
      if (isLoggedIn === "true") {
        getUserWorkspaces()
          .then((ws) => {
            const first = ws[0]?.workspaceId;
            if (first) router.replace(`/${first}/chatbot`);
          })
          .catch(() => {});
      }
    } catch { }
  }, [router]);

  return (
    <main className="bg-background relative min-h-screen">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        
        <div className={CONTENT_WIDTH}>
          <Hero />
          {/* <Testimonial /> */}
          <UnifiedOfferings />
          <BroadcastSection />
          <HowItWorks />
          <PricingSection />
          {/* <QuestionsSection /> */}
          <TestimonialsSection/>
          <Footer />
        </div>
      </div>
    </main>
  );
}
