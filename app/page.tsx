'use client';
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing";
import QuestionsSection from "@/components/landing/questions";
import Footer from "@/components/landing/footer";
import RelatedArticles from "@/components/landing/blogs";
import ScalabilitySection from "@/components/landing/scalability";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
      if (isLoggedIn === "true") {
        router.replace("/chatbot");
      }
    } catch {}
  }, [router]);

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ScalabilitySection />
      <HowItWorks />
      <PricingSection />
      <RelatedArticles />
      <QuestionsSection />
      <Footer />
    </main>
  );
}
