import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/metadata";

import {
  AboutHeroPanel,
  AboutMetricCard,
  AboutPillars,
  AboutSectionReveal,
  FounderNote,
  FragmentedStackVisual,
  UnifiedSystemVisual,
} from "@/components/about/AboutClientAnimations";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { WhySwitchSection } from "@/components/landing/home/channel-sections";
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
  title: "About Verly — Why We Built a Unified Support Platform",
  description:
    "Verly exists because support teams deserve one operating layer for web chat, voice, and WhatsApp — not five disconnected tools. Read the founder's note on why we built it and who we built it for.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Verly — Why We Built a Unified Support Platform",
    description:
      "A short note from the founder on why Verly exists — and the support teams we built it for. One operating layer for web chat, voice, and WhatsApp.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    title: "About Verly — Why We Built a Unified Support Platform",
    description:
      "A founder's note on why Verly exists — one operating layer for web chat, voice, and WhatsApp support. Read the story behind the product.",
  },
};

const WRAP = "mx-auto w-full max-w-[1360px]";

const sectionLabelClass =
  "inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm";

const sectionContentWrap = `${WRAP} relative z-10`;

function AboutSectionBackground({
  tone,
}: {
  tone: "hero" | "sky" | "mint" | "warm" | "violet" | "neutral";
}) {
  const toneClass = {
    hero:
      "bg-[radial-gradient(circle_at_top_left,rgba(57,118,255,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(240,198,116,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(45,87,193,0.10),transparent_26%),linear-gradient(180deg,rgba(244,240,233,0.96)_0%,rgba(236,241,252,0.98)_58%,rgba(229,236,250,1)_100%)]",
    sky:
      "bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.70)_0%,rgba(246,249,255,0.96)_100%)]",
    mint:
      "bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(62,128,241,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(244,252,247,0.96)_100%)]",
    warm:
      "bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%),linear-gradient(180deg,rgba(255,253,248,0.75)_0%,rgba(255,248,238,0.96)_100%)]",
    violet:
      "bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(62,128,241,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.70)_0%,rgba(248,246,255,0.96)_100%)]",
    neutral:
      "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(251,248,243,0.92)_100%)]",
  }[tone];

  return (
    <>
      <div
        className={`pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] md:inset-x-6 ${toneClass}`}
      />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
    </>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.14),transparent_20%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_18%),radial-gradient(circle_at_70%_34%,rgba(139,92,246,0.10),transparent_16%),linear-gradient(180deg,#fdfbf6_0%,#f7f9ff_24%,#f8fcf7_50%,#fff8ef_74%,#f7f8ff_100%)] text-[#221f1b] selection:bg-blue-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pointer-events-none absolute left-[-8rem] top-20 h-[22rem] w-[22rem] rounded-full bg-blue-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-[28rem] h-[20rem] w-[20rem] rounded-full bg-emerald-300/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[18rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-violet-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(120,145,201,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10">
        <Navbar />

        {/* ─────── 1. HERO ─────── */}
        <section className="relative overflow-hidden pb-14 pt-24 md:pb-18 lg:pt-28">
          <AboutSectionBackground tone="hero" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(92,112,156,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(92,112,156,0.10)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className={sectionContentWrap}>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <AboutSectionReveal>
                <div className="max-w-[640px]">
                  <div className="mb-6 flex justify-start">
                    <span className={sectionLabelClass}>About Verly</span>
                  </div>

                  <h1 className="font-[Georgia,serif] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.02] tracking-[-0.04em] text-[#221f1b]">
                    We&rsquo;re building Verly because support{" "}
                    <span className="text-[#6e6558]">shouldn&rsquo;t be the reason you can&rsquo;t scale.</span>
                  </h1>

                  <p className="mt-6 max-w-[580px] text-[17px] leading-8 text-[#6d665d] sm:text-[19px]">
                    A short note from the founder on why this product exists — and the customers it was built for.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="h-13 rounded-full bg-[#141923] px-7 text-sm text-white shadow-[0_18px_40px_rgba(20,25,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d2432] hover:shadow-[0_22px_46px_rgba(20,25,35,0.24)] sm:text-base"
                      >
                        Start free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="https://calendly.com/rdhakad2002/30min" target="_blank">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-13 rounded-full border-[#d6d9e2] bg-white/78 px-7 text-sm text-[#071224] shadow-[0_16px_30px_rgba(58,47,25,0.08)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8cfdd] hover:bg-white sm:text-base"
                      >
                        Book a 20-min demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </AboutSectionReveal>

              {/* Hero panel — shows the product at a glance */}
              <div className="hidden lg:block">
                <AboutHeroPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ─────── 1b. WHY SWITCH — fragmented stack vs Verly ─────── */}
        <WhySwitchSection />

        {/* ─────── 2. THE PROBLEM WE SAW (dark navy) ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22 bg-[#0f172a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.10),transparent_22%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className={sectionContentWrap}>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <AboutSectionReveal>
                <div className="max-w-[560px]">
                  <div className="mb-6 flex justify-start">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 shadow-sm backdrop-blur-sm">The Problem</span>
                  </div>

                  <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-white">
                    Support got harder{" "}
                    <span className="text-white/50">before it got smarter.</span>
                  </h2>

                  <div className="mt-6 space-y-5 text-[16px] leading-8 text-white/60 sm:text-[18px]">
                    <p>
                      Customers switch channels constantly — they start on chat, follow up on
                      WhatsApp, and call when something is urgent. But support teams lose
                      context at every handoff.
                    </p>
                    <p>
                      AI tools have gotten better, but most only solve one layer. They automate
                      replies without fixing the underlying problem: fragmented operations.
                    </p>
                    <p>
                      Human handoff still breaks. Routing still relies on guesswork. And teams
                      end up managing five tools instead of helping customers.
                    </p>
                  </div>
                </div>
              </AboutSectionReveal>

              <FragmentedStackVisual />
            </div>
          </div>
        </section>

        {/* ─────── 3. WHY VERLY EXISTS (warm beige/tan) ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22 bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(197,119,34,0.06),transparent_26%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,100,60,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,100,60,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className={sectionContentWrap}>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="order-2 lg:order-1">
                <UnifiedSystemVisual />
              </div>

              <AboutSectionReveal>
                <div className="order-1 max-w-[560px] lg:order-2">
                  <div className="mb-6 flex justify-start">
                    <span className="inline-flex items-center rounded-full border border-[#d4c9b5] bg-white/70 px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a6d55] shadow-sm">Our Mission</span>
                  </div>

                  <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#2c2418]">
                    We built Verly to unify support operations,{" "}
                    <span className="text-[#8a7a62]">not just automate replies.</span>
                  </h2>

                  <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#6d6352] sm:text-[18px]">
                    <p>
                      AI support should not mean another disconnected tool. The product should
                      share knowledge, routing, context, and escalation across every channel.
                    </p>
                    <p>
                      Teams need operational control — not a black-box automation layer that
                      handles easy questions and drops everything else.
                    </p>
                    <p>
                      Verly is built as one system: one knowledge core, one routing layer, one
                      escalation logic — connected to web chat, voice, and WhatsApp.
                    </p>
                  </div>
                </div>
              </AboutSectionReveal>
            </div>
          </div>
        </section>

        {/* ─────── 4. WHAT MAKES VERLY DIFFERENT ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22">
          <AboutSectionBackground tone="warm" />
          <div className={sectionContentWrap}>
            <AboutSectionReveal>
              <div className="mb-10 max-w-[660px]">
                <div className="mb-6 flex justify-start">
                  <span className={sectionLabelClass}>What Sets Us Apart</span>
                </div>
                <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                  Four principles that{" "}
                  <span className="text-[#6e6558]">shape how Verly is built.</span>
                </h2>
              </div>
            </AboutSectionReveal>

            <AboutPillars
              items={[
                {
                  icon: "brain-circuit",
                  title: "One support brain",
                  description:
                    "Every channel draws from the same knowledge base, prompts, and behavior rules. No duplication. No drift between what chat says and what voice says.",
                },
                {
                  icon: "shield-check",
                  title: "Built-in human handoff",
                  description:
                    "Escalation is not an afterthought — it is part of the core architecture. AI hands off to humans with full context, summary, and intent classification.",
                },
                {
                  icon: "workflow",
                  title: "Voice, WhatsApp, and web",
                  description:
                    "Customers pick the channel they prefer. Verly treats them all equally — same routing, same resolution path, same analytics.",
                },
                {
                  icon: "eye",
                  title: "Operational visibility",
                  description:
                    "Support leaders need to see what is working, what is breaking, and where handoffs fail. Verly surfaces this without requiring a separate analytics product.",
                },
              ]}
            />
          </div>
        </section>

        {/* ─────── 5. WHAT WE'RE BUILDING (dark) ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22 bg-[#04060d]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_22%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className={sectionContentWrap}>
            <AboutSectionReveal>
              <div className="mb-10 max-w-[660px]">
                <div className="mb-6 flex justify-start">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 shadow-sm backdrop-blur-sm">Product Vision</span>
                </div>
                <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-white">
                  What Verly is becoming.
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-white/55 sm:text-[18px]">
                  We are building toward a world where support teams run one system, not a
                  patchwork — and where AI handles repetition while humans handle judgment.
                </p>
              </div>
            </AboutSectionReveal>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  eyebrow: "End-to-end automation",
                  label: "Resolution first",
                  text: "AI that resolves repetitive support end-to-end — not just drafts a response and waits for an agent to press send.",
                  footer: "Reduce repetitive queue work",
                  delay: 0,
                  accent: "rgba(83,104,255,0.18)",
                },
                {
                  eyebrow: "Escalations with memory",
                  label: "Context preserved",
                  text: "Human workflows stay informed. Every escalation carries the full conversation, intent, and recommended next step.",
                  footer: "No re-explaining for agents",
                  delay: 0.08,
                  accent: "rgba(16,185,129,0.18)",
                },
                {
                  eyebrow: "Operational command center",
                  label: "Built for operators",
                  text: "One operating layer across channels — with analytics, routing, and control designed for the people running support, not just the people building it.",
                  footer: "Designed for support leaders",
                  delay: 0.16,
                  accent: "rgba(139,92,246,0.18)",
                },
              ].map((item) => (
                <AboutSectionReveal key={item.label} delay={item.delay}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,11,20,0.98),rgba(4,6,13,0.98))] px-7 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/14 hover:shadow-[0_20px_46px_rgba(0,0,0,0.30)]">
                    <div className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,${item.accent},transparent_34%)]`} />

                    <div className="relative inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                      {item.eyebrow}
                    </div>

                    <div className="relative mt-8 font-title-bold text-[1.55rem] tracking-[-0.04em] text-white">
                      {item.label}
                    </div>
                    <p className="relative mt-3 flex-1 text-[0.98rem] leading-7 text-white/50">
                      {item.text}
                    </p>

                    <div className="relative mt-8 flex items-center justify-between border-t border-white/8 pt-4">
                      <span className="text-[0.8rem] font-medium text-white/40">{item.footer}</span>
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/30">
                        Vision
                      </span>
                    </div>
                  </div>
                </AboutSectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── 6. TRUST / STAGE / PROOF ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22">
          <AboutSectionBackground tone="violet" />
          <div className={sectionContentWrap}>
            <AboutSectionReveal>
              <div className="mb-10 max-w-[660px]">
                <div className="mb-6 flex justify-start">
                  <span className={sectionLabelClass}>Trust & Traction</span>
                </div>
                <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                  Where Verly stands today.
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-[#6d665d] sm:text-[18px]">
                  We are an early-stage company shipping fast and working closely with every
                  customer. Here is what we have built so far.
                </p>
              </div>
            </AboutSectionReveal>

            <div className="rounded-[2.2rem] border border-[#e3e7f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(244,247,255,0.92)_100%)] p-4 shadow-[0_20px_60px_rgba(27,36,64,0.05)] md:p-6">
              <div className="mb-5 flex flex-col gap-3 rounded-[1.6rem] border border-white/80 bg-white/70 px-5 py-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7f8db0]">
                    Snapshot
                  </p>
                  <p className="mt-1 text-[0.98rem] text-[#44506d]">
                    Early proof across channels, setup, and operator workflows.
                  </p>
                </div>
                <div className="inline-flex w-fit rounded-full border border-[#dae4ff] bg-[#eef3ff] px-4 py-2 text-[0.78rem] font-semibold text-[#4764b2]">
                  Shipping with design intent
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <AboutMetricCard
                  value="3"
                  label="Channels supported — web chat, voice, and WhatsApp"
                  icon="channels"
                  delay={0}
                />
                <AboutMetricCard
                  value="AI + Human"
                  label="Built-in handoff with full conversation context"
                  icon="handoff"
                  delay={0.07}
                />
                <AboutMetricCard
                  value="Minutes"
                  label="Fast setup — connect knowledge and deploy"
                  icon="setup"
                  delay={0.14}
                />
                <AboutMetricCard
                  value="Teams"
                  label="Built for support operators, not just developers"
                  icon="teams"
                  delay={0.21}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─────── 7. TEAM / FOUNDER CREDIBILITY (warm beige) ─────── */}
        <section className="relative overflow-hidden py-16 lg:py-22 bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_50%,#f7f4ee_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,127,30,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.04),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,100,60,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,100,60,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className={sectionContentWrap}>
            <AboutSectionReveal>
              <div className="mb-10 text-center">
                <div className="mb-6 flex justify-center">
                  <span className="inline-flex items-center rounded-full border border-[#d4c9b5] bg-white/70 px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a6d55] shadow-sm">Built Close to the Problem</span>
                </div>
                <h2 className="font-[Georgia,serif] mx-auto max-w-[800px] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#2c2418]">
                  We are building Verly alongside our earliest customers.
                </h2>
              </div>
            </AboutSectionReveal>

            <FounderNote />
          </div>
        </section>

        {/* ─────── 8. FINAL CTA (dark navy with gradient accent) ─────── */}
        <section className="relative overflow-hidden pb-24 pt-14 bg-[#0f172a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,128,241,0.14),transparent_40%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_30%)]" />
          <div className={sectionContentWrap}>
            <AboutSectionReveal>
              <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-8 py-14 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/12 hover:shadow-[0_18px_48px_rgba(0,0,0,0.20)]">
                <h2 className="font-[Georgia,serif] mx-auto max-w-[900px] text-[clamp(2.2rem,4vw,4.2rem)] leading-[1.02] tracking-[-0.04em] text-white">
                  If your support stack feels fragmented, Verly is built for that next step.
                </h2>
                <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-white/55 sm:text-[18px]">
                  See how one system for AI, human handoff, and omnichannel support can
                  replace the patchwork your team works with today.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="h-13 rounded-full bg-white px-7 text-sm sm:text-base text-[#0f172a] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_12px_28px_rgba(255,255,255,0.12)]"
                    >
                      Start free
                    </Button>
                  </Link>
                  <Link href="https://calendly.com/rdhakad2002/30min" target="_blank">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-13 rounded-full border-white/20 bg-transparent px-7 text-sm sm:text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
                    >
                      Book a 20-min demo
                    </Button>
                  </Link>
                </div>
              </div>
            </AboutSectionReveal>
          </div>
        </section>

        <Footer hideCta />
      </div>
    </main>
  );
}
