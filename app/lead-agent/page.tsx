import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MessageSquareText,
  Route,
  SearchCheck,
  UserRoundPlus,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { siteConfig } from "@/lib/metadata";
import { salesAgentUseCase } from "@/lib/use-cases-data";

export const metadata: Metadata = {
  title: "AI Lead Agent That Qualifies & Converts Visitors | Verly",
  description:
    "Turn high-intent website traffic into pipeline with an AI lead agent that answers product questions, qualifies buyer intent, and routes real opportunities to your team.",
  alternates: { canonical: "/lead-agent" },
  openGraph: {
    title: "AI Lead Agent That Qualifies & Converts Visitors | Verly",
    description:
      "Turn high-intent website traffic into pipeline with an AI lead agent that answers product questions, qualifies buyer intent, and routes real opportunities to your team.",
    url: `${siteConfig.url}/lead-agent`,
    type: "website",
  },
};

const solutionIcons = [
  MessageSquareText,
  UserRoundPlus,
  SearchCheck,
  Route,
  Clock3,
  CircleDollarSign,
];

export default function LeadAgentPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}` },
      { "@type": "ListItem", position: 2, name: "Lead Agent", item: `${siteConfig.url}/lead-agent` },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.14),transparent_20%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_18%),radial-gradient(circle_at_70%_34%,rgba(139,92,246,0.10),transparent_16%),linear-gradient(180deg,#fdfbf6_0%,#f7f9ff_24%,#f8fcf7_50%,#fff8ef_74%,#f7f8ff_100%)] text-[#221f1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Blur blob decorations */}
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-[22rem] w-[22rem] rounded-full bg-blue-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-[28rem] h-[20rem] w-[20rem] rounded-full bg-emerald-300/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[18rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-violet-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(120,145,201,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-18 pt-28 md:px-8 md:pt-36">
          {/* Section tone: blue/gold hero */}
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(49,94,234,0.10),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(212,175,55,0.07),transparent_40%),linear-gradient(180deg,rgba(255,253,249,0.7)_0%,rgba(247,249,255,0.5)_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />

          <div className="relative mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[720px]">
              <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                Lead Agent
              </div>
              <h1 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.02] tracking-[-0.04em]">
                <span className="text-[#221f1b]">Turn visitors into </span>
                <span className="text-[#6e6558]">qualified pipeline</span>
              </h1>
              <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-[#6d665d] md:text-[18px]">
                {salesAgentUseCase.heroSubtitle}
              </p>

              <div className="mt-7 space-y-3">
                {salesAgentUseCase.heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-[#e7edf8] bg-white/90 px-4 py-3 shadow-[0_10px_24px_rgba(44,56,92,0.04)] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#315EEA]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-[14px] leading-6 text-[#5e5a53]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#141923] px-7 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(20,25,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d2432]"
                >
                  Build your agent for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="https://calendly.com/rdhakad2002/30min"
                  target="_blank"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-[#e4ddd4] bg-white px-7 text-sm font-semibold text-[#1e1c19] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fafaf9]"
                >
                  Book a demo
                </Link>
              </div>

              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7f8ca3]">
                {salesAgentUseCase.trustedLabel}
              </p>
            </div>

            <div className="rounded-[32px] border border-[#dce6f6] bg-white/92 p-3 shadow-[0_28px_72px_rgba(45,58,96,0.10)]">
              <div className="overflow-hidden rounded-[28px] border border-[#dce6f6] bg-[linear-gradient(180deg,#fcfdff_0%,#f1f6ff_100%)]">
                <div className="flex items-center justify-between border-b border-[#e4ebf7] px-5 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f7d96]">
                    Lead qualification flow
                  </div>
                  <div className="rounded-full bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold text-[#315EEA]">
                    Live on site
                  </div>
                </div>
                <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] p-5">
                  <div className="rounded-[24px] border border-[#dde6f4] bg-white p-4 shadow-[0_12px_28px_rgba(44,56,92,0.06)]">
                    <div className="inline-flex rounded-full border border-[#dce6ff] bg-[#f5f8ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315EEA]">
                      Pricing page visitor
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="max-w-[88%] rounded-[18px] rounded-bl-md bg-[#eef3fb] px-4 py-3 text-[13px] leading-6 text-[#2f3a52]">
                        We need SSO, WhatsApp, and billing controls. Is Enterprise the right fit?
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-[18px] rounded-br-md bg-[#315EEA] px-4 py-3 text-[13px] leading-6 text-white">
                        Yes. Verly supports enterprise agreements, advanced routing, and secure
                        deployment paths. Are you evaluating for one team or a multi-brand setup?
                      </div>
                      <div className="rounded-[18px] border border-[#e7edf8] bg-[#fbfdff] px-4 py-3">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d8aa2]">
                          Qualification captured
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["500+ employees", "Multi-workspace", "Enterprise intent", "Needs demo"].map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[#dce6ff] bg-[#f5f8ff] px-3 py-1 text-[11px] font-medium text-[#315EEA]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[20px] border border-[#e8e2d8] bg-[#fffaf1] px-4 py-3 text-[13px] leading-6 text-[#5f584f]">
                        Next step: Verly routes the buyer to the right sales owner and offers a demo
                        booking path immediately.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics (dark) */}
        <section className="relative overflow-hidden bg-[#0f1b3d] py-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(49,94,234,0.12),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.08),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto grid max-w-[1360px] grid-cols-2 gap-5 px-5 md:grid-cols-4 md:px-8">
            {[
              { value: "24/7", label: "lead response on high-intent pages" },
              { value: "<10s", label: "time to answer common buying questions" },
              { value: "1", label: "conversation path from question to routing" },
              { value: "0", label: "waiting for a rep to start qualification" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:-translate-y-1"
              >
                <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] tracking-[-0.04em] text-white md:text-[40px]">
                  {metric.value}
                </div>
                <div className="mt-1 text-[12px] font-medium leading-5 text-white/60 md:text-[13px]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem - sky tone */}
        <section className="relative overflow-hidden py-16 md:py-22">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_20%_30%,rgba(62,128,241,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.06),transparent_40%),linear-gradient(180deg,rgba(247,250,255,0.8)_0%,rgba(255,255,255,0.6)_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
            <div className="mx-auto max-w-[780px] text-center">
              <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                Problem
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                {salesAgentUseCase.problemTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-[720px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                {salesAgentUseCase.problemIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {salesAgentUseCase.problems.map((problem) => (
                <div
                  key={problem.title}
                  className="rounded-[24px] border border-[#dde6f4] bg-white p-5 shadow-[0_10px_24px_rgba(44,56,92,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,56,92,0.09)]"
                >
                  <h3 className="text-[18px] font-semibold text-[#221f1b]">{problem.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#6d665d]">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution - mint tone */}
        <section className="relative overflow-hidden py-16 md:py-22">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_25%_40%,rgba(16,185,129,0.07),transparent_45%),radial-gradient(circle_at_75%_60%,rgba(62,128,241,0.06),transparent_40%),linear-gradient(180deg,rgba(248,252,247,0.8)_0%,rgba(255,255,255,0.6)_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                  Solution
                </div>
                <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,2.875rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                  {salesAgentUseCase.solutionTitle}
                </h2>
                <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                  {salesAgentUseCase.solutionIntro}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {salesAgentUseCase.solutions.map((item, index) => {
                  const Icon = solutionIcons[index % solutionIcons.length];
                  return (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-[#dde6f4] bg-white p-5 shadow-[0_10px_24px_rgba(44,56,92,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,56,92,0.09)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#315EEA]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 text-[17px] font-semibold text-[#221f1b]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How it works - warm tone */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_30%_30%,rgba(217,166,79,0.08),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(212,175,55,0.06),transparent_40%),linear-gradient(180deg,rgba(255,252,244,0.8)_0%,rgba(255,255,255,0.6)_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
            <div className="mx-auto max-w-[780px] text-center">
              <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                How it works
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,2.875rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                {salesAgentUseCase.stepsTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                {salesAgentUseCase.stepsIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {salesAgentUseCase.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[26px] border border-[#e4ddd2] bg-white p-6 shadow-[0_10px_24px_rgba(59,43,22,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(59,43,22,0.09)]"
                >
                  <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[42px] leading-none tracking-[-0.05em] text-[#315EEA]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold text-[#221f1b]">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#6d665d]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live scenarios - violet tone */}
        <section className="relative overflow-hidden py-16 md:py-22">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_25%_35%,rgba(139,92,246,0.07),transparent_45%),radial-gradient(circle_at_75%_65%,rgba(62,128,241,0.06),transparent_40%),linear-gradient(180deg,rgba(250,248,255,0.8)_0%,rgba(255,255,255,0.6)_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                  Live scenarios
                </div>
                <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,2.875rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                  {salesAgentUseCase.examplesTitle}
                </h2>
                <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                  {salesAgentUseCase.examplesIntro}
                </p>
              </div>

              <div className="space-y-4">
                {salesAgentUseCase.examples.map((example) => (
                  <div
                    key={example.title}
                    className="rounded-[24px] border border-[#dde6f4] bg-white/95 p-5 shadow-[0_10px_24px_rgba(44,56,92,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,56,92,0.09)]"
                  >
                    <h3 className="text-[17px] font-semibold text-[#221f1b]">{example.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[30px] border border-[#dce6f6] bg-[linear-gradient(135deg,#f3f7ff_0%,#ffffff_42%,#fff9ef_100%)] p-7 shadow-[0_18px_42px_rgba(49,94,234,0.08)] md:p-9">
              <p className="font-[Georgia,Times,'Times_New_Roman',serif] text-[24px] leading-[1.4] tracking-[-0.03em] text-[#2e3a58] md:text-[30px]">
                &ldquo;{salesAgentUseCase.testimonial.quote}&rdquo;
              </p>
              <div className="mt-5">
                <div className="text-[15px] font-semibold text-[#221f1b]">
                  {salesAgentUseCase.testimonial.name}
                </div>
                <div className="text-[13px] text-[#6d7f9e]">{salesAgentUseCase.testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA (dark) */}
        <section className="relative overflow-hidden bg-[#0f1b3d] py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(49,94,234,0.10),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.08),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[840px] px-5 text-center md:px-8">
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-[-0.04em] text-white">
              {salesAgentUseCase.finalTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-7 text-white/65 md:text-[17px]">
              {salesAgentUseCase.finalSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex h-13 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#0f1b3d] shadow-[0_18px_40px_rgba(20,25,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90"
              >
                Build your agent for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </section>

        <Footer hideCta />
      </div>
    </main>
  );
}
