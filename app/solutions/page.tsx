import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { SolutionsClientContent } from "@/components/solutions/SolutionsClientContent";
import { solutions } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "Solutions - AI Customer Support for Every Industry",
  description:
    "Discover AI customer support solutions for E-commerce, Healthcare, SaaS, Real Estate, Travel & more. Deploy voice AI agents, WhatsApp chatbots, and omnichannel support tailored to your industry.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions - AI Customer Support for Every Industry",
    description:
      "See how businesses across E-commerce, Healthcare, SaaS, Real Estate, and more use Verly to automate support and save thousands monthly.",
    url: "https://verlyai.xyz/solutions",
    type: "website",
  },
  twitter: {
    title: "Solutions - AI Customer Support for Every Industry",
    description:
      "See how businesses across E-commerce, Healthcare, SaaS, and more use Verly to automate support.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://verlyai.xyz" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://verlyai.xyz/solutions" },
  ],
};

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#f3f7ff_16%,#f7f4ee_52%,#ffffff_100%)] text-[#171717]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-18 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(49,94,234,0.16),transparent_32%),radial-gradient(circle_at_top_left,rgba(125,164,255,0.18),transparent_24%),linear-gradient(180deg,#eef5ff_0%,#f4f8ff_32%,#f7f4ee_100%)]" />
        <div className="absolute left-1/2 top-10 h-[18rem] w-[18rem] -translate-x-1/2 transform-gpu rounded-full bg-[#d7e6ff] blur-[80px]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-[820px] text-center">
            <div className="mb-5 inline-flex rounded-full border border-[#d6e2fb] bg-white/86 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60708d] shadow-[0_12px_28px_rgba(49,94,234,0.08)]">
              Industry Solutions
            </div>
            <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[38px] leading-[1.03] tracking-[-0.05em] text-[#221f1b] md:text-[64px]">
              Support that knows
              <span className="block bg-[linear-gradient(180deg,#4f7dff_0%,#315EEA_100%)] bg-clip-text text-transparent">
                your industry on day one.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-7 text-[#6d665d] md:text-[18px] md:leading-8">
              A SaaS onboarding question isn&rsquo;t a healthcare reschedule. Verly ships with industry-specific intents, tone, compliance defaults, and escalation rules — so your agent doesn&rsquo;t sound generic on the first conversation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[26px] border border-[#dde6f4] bg-white/92 p-6 shadow-[0_18px_42px_rgba(49,94,234,0.07)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e7d95]">
                Coverage
              </div>
              <div className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] tracking-[-0.04em] text-[#221f1b]">
                {solutions.length} industries
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#6d665d]">
                40+ pre-built intents across support, voice, commerce, internal ops, and sales-led conversations.
              </p>
            </div>

            <div className="rounded-[26px] border border-[#dbe5ff] bg-[linear-gradient(180deg,#fdfefe_0%,#eef4ff_100%)] p-6 shadow-[0_18px_42px_rgba(49,94,234,0.10)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b78cb]">
                Channels
              </div>
              <div className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] tracking-[-0.04em] text-[#17316f]">
                Voice, WhatsApp, web
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#53617f]">
                Live on day one. One operating layer across urgent calls, messaging, and embedded support.
              </p>
            </div>

            <div className="rounded-[26px] border border-[#e4ddd2] bg-[linear-gradient(180deg,#fffdfa_0%,#f7f3eb_100%)] p-6 shadow-[0_18px_42px_rgba(120,96,58,0.06)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9d7443]">
                Time to value
              </div>
              <div className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] tracking-[-0.04em] text-[#493622]">
                2 weeks
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#6f6256]">
                Average time from first login to your first fully automated resolution — across every industry.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-[#dbe5ff] bg-[linear-gradient(135deg,#ffffff_0%,#f3f7ff_42%,#fff9ef_100%)] p-6 shadow-[0_18px_42px_rgba(49,94,234,0.08)] md:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-[#dce6ff] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#315EEA]">
                  Enterprise Solution
                </div>
                <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.04] tracking-[-0.04em] text-[#221f1b] md:text-[42px]">
                  Security, deployment, and custom workflow support for larger teams
                </h2>
                <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                  Enterprise now lives inside Solutions so buyers can evaluate Verly in one place:
                  industry workflows, use-case fit, and enterprise rollout requirements together.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Dedicated rollout support, enterprise agreements, and custom routing control",
                  "Security-sensitive deployment paths including stricter data-handling options",
                  "Custom integrations and workflow design for complex support operations",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[#dde6f4] bg-white/92 px-4 py-3 text-[14px] leading-6 text-[#4a5568]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ddd7ca] border-t-[#221f1b]" />
          </div>
        }
      >
        <SolutionsClientContent />
      </Suspense>

      <Footer />
    </main>
  );
}
