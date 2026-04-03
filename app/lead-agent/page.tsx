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
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#f5f8ff_18%,#fbf7ef_56%,#ffffff_100%)] text-[#221f1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <section className="relative overflow-hidden px-5 pb-18 pt-28 md:px-8 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,94,234,0.16),transparent_32%),radial-gradient(circle_at_top_left,rgba(125,164,255,0.12),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-[720px]">
            <div className="inline-flex rounded-full border border-[#d8e3f7] bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d7f9e] shadow-[0_10px_24px_rgba(49,94,234,0.06)]">
              Lead Agent
            </div>
            <h1 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[42px] leading-[0.98] tracking-[-0.05em] text-[#221f1b] md:text-[68px]">
              {salesAgentUseCase.heroTitle}
            </h1>
            <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-[#6d665d] md:text-[18px]">
              {salesAgentUseCase.heroSubtitle}
            </p>

            <div className="mt-7 space-y-3">
              {salesAgentUseCase.heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[18px] border border-[#e7edf8] bg-white/90 px-4 py-3 shadow-[0_10px_24px_rgba(44,56,92,0.04)]"
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
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(49,94,234,0.28)] transition-all hover:bg-[#264fd4]"
              >
                Build your agent for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex h-13 items-center justify-center rounded-full border border-[#e4ddd4] bg-white px-7 text-[14px] font-semibold text-[#1e1c19] transition-all hover:bg-[#fafaf9]"
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

      <section className="bg-[#0f1b3d] py-10 md:py-14">
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-5 px-5 md:grid-cols-4 md:px-8">
          {[
            { value: "24/7", label: "lead response on high-intent pages" },
            { value: "<10s", label: "time to answer common buying questions" },
            { value: "1", label: "conversation path from question to routing" },
            { value: "0", label: "waiting for a rep to start qualification" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
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

      <section className="bg-[linear-gradient(180deg,#fffdf9_0%,#f8fbff_100%)] py-16 md:py-22">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[780px] text-center">
            <div className="inline-flex rounded-full border border-[#dde6f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#5f6f8c]">
              Problem
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
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
                className="rounded-[24px] border border-[#dde6f4] bg-white p-5 shadow-[0_10px_24px_rgba(44,56,92,0.05)]"
              >
                <h3 className="text-[18px] font-semibold text-[#221f1b]">{problem.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[#6d665d]">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-16 md:py-22">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#dce6ff] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#315EEA]">
                Solution
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[46px]">
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
                    className="rounded-[24px] border border-[#dde6f4] bg-white p-5 shadow-[0_10px_24px_rgba(44,56,92,0.05)]"
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

      <section className="bg-[linear-gradient(180deg,#f7f4ee_0%,#f5efe5_58%,#f8fbff_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[780px] text-center">
            <div className="inline-flex rounded-full border border-[#e6ddd0] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#86694b]">
              How it works
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[46px]">
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
                className="rounded-[26px] border border-[#e4ddd2] bg-white p-6 shadow-[0_10px_24px_rgba(59,43,22,0.05)]"
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

      <section className="bg-white py-16 md:py-22">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#dde6f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#5f6f8c]">
                Live scenarios
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[46px]">
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
                  className="rounded-[24px] border border-[#dde6f4] bg-[#fbfdff] p-5 shadow-[0_10px_24px_rgba(44,56,92,0.04)]"
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

      <section className="bg-[#0f1b3d] py-16 md:py-24">
        <div className="mx-auto max-w-[840px] px-5 text-center md:px-8">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.04] tracking-[-0.04em] text-white md:text-[48px]">
            {salesAgentUseCase.finalTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-7 text-white/65 md:text-[17px]">
            {salesAgentUseCase.finalSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-8 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(49,94,234,0.34)] transition-all hover:bg-[#264fd4]"
            >
              Build your agent for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-[14px] font-semibold text-white transition-all hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <Footer hideCta />
    </main>
  );
}
