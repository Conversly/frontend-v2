import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Zap, Target, BarChart3, Shield } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import {
  solutions,
  getSolutionBySlug,
  getAllSolutionSlugs,
} from "@/lib/solutions-data";
import { siteConfig } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: "Solution Not Found" };

  return {
    title: `${solution.title} - AI Support Solution | Verly`,
    description: solution.heroSubtitle,
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: {
      title: `${solution.title} - AI Support Solution | Verly`,
      description: solution.heroSubtitle,
      url: `${siteConfig.url}/solutions/${slug}`,
      type: "article",
    },
  };
}

const PAIN_ICONS = [Target, Zap, Shield, BarChart3];

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const related = solution.relatedSlugs
    .map((s) => solutions.find((sol) => sol.slug === s))
    .filter(Boolean);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: solution.title, item: `${siteConfig.url}/solutions/${slug}` },
    ],
  };

  const faqSchema = solution.faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: solution.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#efeade_60%,#f7f4ee_100%)] pt-28 pb-0 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,123,247,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
          <Breadcrumb>
            <BreadcrumbList className="text-[13px] text-[#8a8275]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-[#221f1b]">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/solutions" className="hover:text-[#221f1b]">Solutions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-[#221f1b]">{solution.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-10 grid gap-10 pb-16 md:pb-20 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[680px]">
              <div className="mb-5 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
                {solution.category} Solution
              </div>
              <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[56px]">
                {solution.heroTagline}
              </h1>
              <p className="mt-5 max-w-[560px] text-[16px] leading-8 text-[#6d665d] md:text-[18px]">
                {solution.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(49,94,234,0.3)] transition-all hover:bg-[#2850d0] hover:shadow-[0_12px_32px_rgba(49,94,234,0.4)]"
                >
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="https://calendly.com/rdhakad2002/30min"
                  target="_blank"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-[#e4ddd4] bg-white px-7 text-[14px] font-semibold text-[#1e1c19] transition-all hover:bg-[#fafaf9] hover:shadow-[0_8px_16px_rgba(59,43,22,0.06)]"
                >
                  Book a demo
                </Link>
              </div>
            </div>

            {/* Tags cluster */}
            <div className="hidden flex-wrap gap-2 lg:flex lg:max-w-[280px]">
              {solution.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e0dbd3] bg-white px-4 py-2 text-[13px] font-medium text-[#5a5549] shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="relative -mt-1 bg-[#0B1536] py-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.15),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-[1360px] grid-cols-2 gap-6 px-5 md:grid-cols-4 md:px-8">
          {solution.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] font-semibold tracking-[-0.03em] text-white md:text-[42px]">
                {m.value}
              </div>
              <div className="mt-1 text-[13px] font-medium text-white/50">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[660px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-[12px] font-semibold text-red-600">
              <Target className="h-3.5 w-3.5" />
              The Challenge
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[42px]">
              Why {solution.title.toLowerCase()} teams choose Verly
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {solution.painPoints.map((point, i) => {
              const Icon = PAIN_ICONS[i % PAIN_ICONS.length];
              return (
                <div
                  key={point.title}
                  className="group rounded-[24px] border border-[#ece8e0] bg-white p-6 transition-all hover:border-red-100 hover:shadow-[0_12px_40px_rgba(239,68,68,0.06)] md:p-8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#221f1b]">
                    {point.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#6d665d]">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(49,94,234,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[660px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[12px] font-semibold text-[#315EEA]">
              <Zap className="h-3.5 w-3.5" />
              Capabilities
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[42px]">
              What Verly does for {solution.title.toLowerCase()}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solution.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="group rounded-[24px] border border-blue-100/60 bg-white p-6 shadow-[0_4px_20px_rgba(49,94,234,0.04)] transition-all hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(49,94,234,0.08)] md:p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#315EEA]/10 text-[#315EEA] font-bold text-[15px]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[16px] font-semibold text-[#221f1b]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[660px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-1.5 text-[12px] font-semibold text-purple-600">
              <BarChart3 className="h-3.5 w-3.5" />
              Use Cases
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[42px]">
              See it in action
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {solution.useCases.map((uc, i) => (
              <div
                key={uc.title}
                className="flex flex-col overflow-hidden rounded-[24px] border border-[#e8e4f8] bg-gradient-to-b from-white to-purple-50/30"
              >
                <div className="p-6 md:p-7">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-[14px] font-bold text-purple-600">
                    {i + 1}
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#221f1b]">
                    {uc.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#6d665d]">
                    {uc.scenario}
                  </p>
                </div>
                <div className="mt-auto border-t border-emerald-100 bg-emerald-50/50 px-6 py-4 md:px-7">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Outcome
                    </span>
                  </div>
                  <p className="text-[13px] leading-6 text-emerald-800/70">
                    {uc.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features list (from card data) ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[12px] font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Key Features
              </div>
              <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[42px]">
                Built specifically for {solution.title.toLowerCase()}
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-[#6d665d]">
                Every feature is designed around the workflows, compliance needs, and customer
                expectations of your industry.
              </p>
            </div>
            <div className="space-y-3">
              {solution.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3.5 rounded-[18px] border border-[#ddd7ca] bg-white px-5 py-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-[15px] font-medium text-[#2c2f30]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {solution.faqItems.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-5 md:px-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-1.5 text-[12px] font-semibold text-amber-700">
                FAQ
              </div>
              <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[42px]">
                Common questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {solution.faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="overflow-hidden rounded-[18px] border border-[#ece8e0] bg-[#faf8f5] px-5 data-[state=open]:border-amber-200 data-[state=open]:bg-white data-[state=open]:shadow-[0_8px_24px_rgba(217,162,50,0.06)]"
                >
                  <AccordionTrigger className="py-4 text-left text-[15px] font-semibold text-[#221f1b] hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[14px] leading-7 text-[#6d665d]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-[#0B1536] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-[800px] px-5 text-center md:px-8">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-white md:text-[44px]">
            Ready to transform your {solution.title.toLowerCase()} support?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-white/55">
            Deploy AI agents in minutes. No engineering required. Start free and scale as you grow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-8 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(49,94,234,0.4)] transition-all hover:bg-[#2850d0]"
            >
              Try Verly free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-[14px] font-semibold text-white transition-all hover:bg-white/10"
            >
              Schedule a demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Solutions ── */}
      {related.length > 0 && (
        <section className="bg-[#faf8f5] py-16 md:py-24">
          <div className="mx-auto max-w-[1360px] px-5 md:px-8">
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#221f1b] md:text-[36px]">
              Explore more solutions
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map(
                (sol) =>
                  sol && (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="group rounded-[24px] border border-[#e8e4dc] bg-white p-6 shadow-[0_4px_16px_rgba(59,43,22,0.04)] transition-all hover:shadow-[0_16px_48px_rgba(59,43,22,0.10)] md:p-7"
                    >
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${sol.bg} ${sol.color}`}
                      >
                        <sol.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[16px] font-semibold text-[#221f1b] transition-colors group-hover:text-[#315EEA]">
                        {sol.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">
                        {sol.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8a8275] transition-colors group-hover:text-[#315EEA]">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ),
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
