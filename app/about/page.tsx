import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
import { WhySwitchSection } from "@/components/crisp-landing/crisp-new-sections";
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
  title: "About Verly | Why We Built a Unified Support Platform",
  description:
    "Verly exists because support teams deserve one operating layer for web chat, voice, and WhatsApp — not five disconnected tools. Learn why we built it.",
  alternates: {
    canonical: "/about",
  },
};

const WRAP = "mx-auto w-full max-w-[1360px]";

const sectionLabelClass =
  "inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm";

/* ─────────────────────────── Page ─────────────────────────── */

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#fbf9f4] text-[#221f1b] selection:bg-blue-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <Navbar />

        {/* ─────── 1. HERO ─────── */}
        <section className="pt-24 lg:pt-28">
          <div className={WRAP}>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <AboutSectionReveal>
                <div className="max-w-[640px]">
                  <div className="mb-6 flex justify-start">
                    <span className={sectionLabelClass}>About Verly</span>
                  </div>

                  <h1 className="font-[Georgia,serif] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.02] tracking-[-0.04em] text-[#221f1b]">
                    Support should feel like one conversation,{" "}
                    <span className="text-[#6e6558]">not five disconnected tools.</span>
                  </h1>

                  <p className="mt-6 max-w-[580px] text-[17px] leading-8 text-[#6d665d] sm:text-[19px]">
                    We built Verly because modern support teams are forced to stitch together
                    chat, WhatsApp, voice, escalation, and automation across too many systems.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/features">
                      <Button
                        size="lg"
                        className="h-13 rounded-full bg-[#1976d2] px-7 text-sm sm:text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1565c0] hover:shadow-[0_12px_30px_rgba(25,118,210,0.28)]"
                      >
                        See the platform
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="https://calendly.com/rdhakad2002/30min" target="_blank">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-13 rounded-full border-black/10 bg-white px-7 text-sm sm:text-base text-[#071224] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
                      >
                        Book demo
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

        {/* ─────── 2. THE PROBLEM WE SAW ─────── */}
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <AboutSectionReveal>
                <div className="max-w-[560px]">
                  <div className="mb-6 flex justify-start">
                    <span className={sectionLabelClass}>The Problem</span>
                  </div>

                  <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                    Support got harder{" "}
                    <span className="text-[#6e6558]">before it got smarter.</span>
                  </h2>

                  <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#6d665d] sm:text-[18px]">
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

        {/* ─────── 3. WHY VERLY EXISTS ─────── */}
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="order-2 lg:order-1">
                <UnifiedSystemVisual />
              </div>

              <AboutSectionReveal>
                <div className="order-1 max-w-[560px] lg:order-2">
                  <div className="mb-6 flex justify-start">
                    <span className={sectionLabelClass}>Our Mission</span>
                  </div>

                  <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                    We built Verly to unify support operations,{" "}
                    <span className="text-[#6e6558]">not just automate replies.</span>
                  </h2>

                  <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#6d665d] sm:text-[18px]">
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
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
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

        {/* ─────── 5. WHAT WE'RE BUILDING ─────── */}
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
            <AboutSectionReveal>
              <div className="mb-10 max-w-[660px]">
                <div className="mb-6 flex justify-start">
                  <span className={sectionLabelClass}>Product Vision</span>
                </div>
                <h2 className="font-[Georgia,serif] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                  What Verly is becoming.
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-[#6d665d] sm:text-[18px]">
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
                },
                {
                  eyebrow: "Escalations with memory",
                  label: "Context preserved",
                  text: "Human workflows stay informed. Every escalation carries the full conversation, intent, and recommended next step.",
                  footer: "No re-explaining for agents",
                  delay: 0.08,
                },
                {
                  eyebrow: "Operational command center",
                  label: "Built for operators",
                  text: "One operating layer across channels — with analytics, routing, and control designed for the people running support, not just the people building it.",
                  footer: "Designed for support leaders",
                  delay: 0.16,
                },
              ].map((item) => (
                <AboutSectionReveal key={item.label} delay={item.delay}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#dfe9e2] bg-[linear-gradient(180deg,#f8fcf8_0%,#ffffff_100%)] px-7 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b8d3be] hover:shadow-[0_20px_46px_rgba(68,145,94,0.10)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(117,179,135,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.85),transparent_28%)]" />

                    <div className="relative inline-flex w-fit rounded-full border border-[#d9e7dd] bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5d8a6a]">
                      {item.eyebrow}
                    </div>

                    <div className="relative mt-8 font-title-bold text-[1.55rem] tracking-[-0.04em] text-[#071224]">
                      {item.label}
                    </div>
                    <p className="relative mt-3 flex-1 text-[0.98rem] leading-7 text-[#55627d]">
                      {item.text}
                    </p>

                    <div className="relative mt-8 flex items-center justify-between border-t border-[#deebe1] pt-4">
                      <span className="text-[0.8rem] font-medium text-[#345144]">{item.footer}</span>
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#87a18e]">
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
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
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

        {/* ─────── 7. TEAM / FOUNDER CREDIBILITY ─────── */}
        <section className="py-16 lg:py-22">
          <div className={WRAP}>
            <AboutSectionReveal>
              <div className="mb-10 text-center">
                <div className="mb-6 flex justify-center">
                  <span className={sectionLabelClass}>Built Close to the Problem</span>
                </div>
                <h2 className="font-[Georgia,serif] mx-auto max-w-[800px] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
                  We are building Verly alongside our earliest customers.
                </h2>
              </div>
            </AboutSectionReveal>

            <FounderNote />
          </div>
        </section>

        {/* ─────── 8. FINAL CTA ─────── */}
        <section className="pb-24 pt-14">
          <div className={WRAP}>
            <AboutSectionReveal>
              <div className="rounded-[2rem] border border-[#d8def0] bg-[linear-gradient(180deg,#ebf0ff_0%,#eef3ff_100%)] px-8 py-14 text-center transition-all duration-300 hover:bg-[linear-gradient(180deg,#e6edff_0%,#eaf0ff_100%)] hover:shadow-[0_18px_48px_rgba(8,15,34,0.08)]">
                <h2 className="font-[Georgia,serif] mx-auto max-w-[900px] text-[clamp(2.2rem,4vw,4.2rem)] leading-[1.02] tracking-[-0.04em] text-[#221f1b]">
                  If your support stack feels fragmented, Verly is built for that next step.
                </h2>
                <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-[#6d665d] sm:text-[18px]">
                  See how one system for AI, human handoff, and omnichannel support can
                  replace the patchwork your team works with today.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="h-13 rounded-full bg-[#111827] px-7 text-sm sm:text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(17,24,39,0.22)]"
                    >
                      See pricing
                    </Button>
                  </Link>
                  <Link href="https://calendly.com/rdhakad2002/30min" target="_blank">
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

        <Footer hideCta />
      </div>
    </main>
  );
}
