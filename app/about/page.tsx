import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  AboutFeatureCard,
  AboutSectionReveal,
} from "@/components/about/AboutClientAnimations";
import { AboutWorkflowVisual } from "@/components/about/AboutSectionVisuals";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://verlyai.xyz" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://verlyai.xyz/about" },
  ],
};

export const metadata: Metadata = {
  title: "About VerlyAI | Connected Customer Support",
  description:
    "Learn how VerlyAI is building a cleaner customer support experience across web chat, voice, and WhatsApp.",
  alternates: {
    canonical: "/about",
  },
};

const WRAP = "mx-auto w-[92%] max-w-[1240px]";

const sectionLabelClass =
  "inline-flex items-center rounded-full border border-[#cdd8f5] bg-[#eff3fe] px-6 py-3 font-sans text-[1.05rem] font-medium text-[#4b6fe2] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]";

const cards = [
  {
    title: "Web chat",
    description: "Answer customers instantly with a branded assistant grounded in your knowledge.",
    icon: "message-square",
  },
  {
    title: "Voice",
    description: "Handle calls naturally and route people to humans when it matters.",
    icon: "phone-call",
  },
  {
    title: "WhatsApp",
    description: "Run support where customers already talk without fragmenting the experience.",
    icon: "bot",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#fcfcfd] text-[#091223] selection:bg-blue-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <Navbar />

        <section className="pt-24 lg:pt-28">
        <div className={WRAP}>
          <AboutSectionReveal>
            {/* <div className="mb-8 flex justify-start">
              <span className={sectionLabelClass}>
                <Sparkles className="mr-2 h-4 w-4" />
                About VerlyAI
              </span>
            </div> */}
            <div className="mx-auto max-w-[860px] text-center">

              <h1 className="font-title-bold text-[clamp(2.9rem,5.2vw,4.8rem)] leading-[1.02] tracking-[-0.055em] text-[#071224]">
                Making customer support feel connected, fast, and frictionless.
              </h1>
              <p className="mx-auto mt-6 max-w-[680px] text-[1.05rem] leading-8 text-[#4e5a73] sm:text-[1.14rem]">
                VerlyAI helps teams run one connected support experience across web chat, voice,
                and WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/solutions">
                  <Button
                    size="lg"
                    className="h-13 rounded-full bg-[#1976d2] px-7 text-sm sm:text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1565c0] hover:shadow-[0_12px_30px_rgba(25,118,210,0.28)]"
                  >
                    Explore solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-13 rounded-full border-black/10 bg-white px-7 text-sm sm:text-base text-[#071224] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
                  >
                    View pricing
                  </Button>
                </Link>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
        </section>

        <section className="py-14 lg:py-18">
        <div className={WRAP}>
          <div className="mb-8 flex justify-center md:justify-start">
            <span className={sectionLabelClass}>Unified AI Platform</span>
          </div>
          <div className="rounded-[2.4rem] border border-[#dde3f0] bg-[#f2f4f9] p-6 shadow-[0_16px_36px_rgba(71,85,105,0.045)] md:p-9">
            <div className="grid gap-5 md:grid-cols-3">
              {cards.map((card, index) => (
                <AboutFeatureCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
        </section>

        <section className="py-14 lg:py-20">
        <div className={WRAP}>
          <div className="mb-8 flex justify-center md:justify-start">
            <span className={sectionLabelClass}>Mission</span>
          </div>
          <div className="rounded-[2.25rem] border border-[#efd9d4] bg-[linear-gradient(180deg,#fdf5f3_0%,#faf6f8_100%)] p-6 shadow-[0_20px_50px_rgba(168,120,120,0.08)] md:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
              <AboutWorkflowVisual />

              <AboutSectionReveal delay={0.1}>
                <div className="max-w-[620px]">
                  <h2 className="font-title-bold text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[1.02] tracking-[-0.05em] text-[#071224]">
                    We believe better support builds stronger relationships.
                  </h2>
                  <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#56627b] sm:text-[1.08rem]">
                    <p>
                      Customers should not feel like they are dealing with different systems just
                      because they move between chat, voice, and WhatsApp.
                    </p>
                    <p>
                      VerlyAI brings those conversations together so teams can respond with better
                      context, faster resolution, and more consistency.
                    </p>
                  </div>
                </div>
              </AboutSectionReveal>
            </div>
          </div>
        </div>
        </section>

        <section className="py-14 lg:py-18">
        <div className={WRAP}>
          <div className="mb-8 flex justify-center md:justify-start">
            <span className={sectionLabelClass}>Our company</span>
          </div>
          <div className="rounded-[2.15rem] border border-[#d9e7dd] bg-[linear-gradient(180deg,#f4fbf5_0%,#f9fcf8_100%)] p-6 shadow-[0_18px_42px_rgba(85,126,95,0.06)] md:p-8">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <AboutSectionReveal>
                <div className="max-w-[620px]">
                  <div className="space-y-5 text-[1.02rem] leading-8 text-[#334057] sm:text-[1.08rem]">
                    <p>
                      Support has become more demanding. Customers expect fast answers, smooth
                      escalation, and continuity across every channel they use.
                    </p>
                    <p>
                      VerlyAI is built as one modern support layer for chat, voice, and WhatsApp, so
                      teams spend less time stitching tools together.
                    </p>
                  </div>
                </div>
              </AboutSectionReveal>

              <AboutSectionReveal delay={0.1}>
                <div className="grid gap-4">
                  {[
                    {
                      label: "Fast setup",
                      text: "Bring in your knowledge and shape behavior without rebuilding your process.",
                    },
                    {
                      label: "Shared context",
                      text: "Keep answers and escalation logic aligned across every channel.",
                    },
                    {
                      label: "Practical control",
                      text: "Improve conversations with better visibility and cleaner workflows.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.6rem] border border-[#d9e7dd] bg-white px-7 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ad1ad] hover:bg-[#f4fbf6] hover:shadow-[0_16px_36px_rgba(68,145,94,0.08)]"
                    >
                      <div className="font-title-bold text-[1.45rem] tracking-[-0.04em] text-[#071224]">
                        {item.label}
                      </div>
                      <p className="mt-3 text-[0.98rem] leading-7 text-[#55627d]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </AboutSectionReveal>
            </div>
          </div>
        </div>
        </section>

        <section className="pb-24 pt-14">
        <div className={WRAP}>
          <div className="mb-8 flex justify-center md:justify-start">
            <span className={sectionLabelClass}>Get started</span>
          </div>
          <AboutSectionReveal>
            <div className="rounded-[2rem] border border-[#d8def0] bg-[linear-gradient(180deg,#ebf0ff_0%,#eef3ff_100%)] px-8 py-12 text-center transition-all duration-300 hover:bg-[linear-gradient(180deg,#e6edff_0%,#eaf0ff_100%)] hover:shadow-[0_18px_48px_rgba(8,15,34,0.08)]">
              <h2 className="font-title-bold mx-auto max-w-[760px] text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.05em] text-[#071224]">
                One support system for every customer conversation.
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[1.02rem] leading-8 text-[#4f5c78] sm:text-[1.08rem]">
                If your team wants a simpler way to run AI support across channels, VerlyAI is
                built for that next step.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="h-13 rounded-full bg-[#111827] px-7 text-sm sm:text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(17,24,39,0.22)]"
                  >
                    Start with VerlyAI
                  </Button>
                </Link>
                <Link href="/help">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-13 rounded-full border-black/10 bg-white px-7 text-sm sm:text-base text-[#071224] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
                  >
                    Talk to our team
                  </Button>
                </Link>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
