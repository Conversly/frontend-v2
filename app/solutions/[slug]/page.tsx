import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import {
  getAllSolutionSlugs,
  getSolutionBySlug,
  solutions,
} from "@/lib/solutions-data";
import { siteConfig } from "@/lib/metadata";
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

const HERO_SHOWCASE_IMAGES: Record<string, { src: string; alt: string }> = {
  "e-commerce-retail": {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&h=1400&fit=crop&crop=faces",
    alt: "Retail team handling customer support and commerce operations",
  },
  "saas-platforms": {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&h=1400&fit=crop",
    alt: "SaaS team collaborating on product support and onboarding",
  },
  healthcare: {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&h=1400&fit=crop",
    alt: "Healthcare support staff assisting patients in a clinical setting",
  },
  "restaurants-hospitality": {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&h=1400&fit=crop",
    alt: "Restaurant and hospitality team serving guests",
  },
  "real-estate": {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=1400&fit=crop",
    alt: "Real estate professionals reviewing property inquiries",
  },
  education: {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&h=1400&fit=crop",
    alt: "Students and staff in an education support environment",
  },
  "travel-tourism": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=1400&fit=crop",
    alt: "Travel operations scene with aircraft and passenger movement",
  },
  "professional-services": {
    src: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1800&h=1400&fit=crop",
    alt: "Professional services team in a client-facing working session",
  },
};

const STORY_IMAGES: Record<string, [string, string, string]> = {
  "e-commerce-retail": [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=1200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&h=1200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=1200&fit=crop",
  ],
  "saas-platforms": [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop",
  ],
  healthcare: [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=1200&fit=crop",
  ],
  "restaurants-hospitality": [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=1200&fit=crop",
  ],
  "real-estate": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&h=1200&fit=crop",
  ],
  education: [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=1200&fit=crop",
  ],
  "travel-tourism": [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=1200&fit=crop",
  ],
  "professional-services": [
    "https://images.unsplash.com/photo-1552581234-26160f608093?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1200&fit=crop",
  ],
};

function SolutionStorySection({
  eyebrow,
  title,
  description,
  bullets,
  image,
  imageAlt,
  reverse = false,
  accent,
  calloutLabel,
  calloutValue,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  accent: {
    chipBg: string;
    chipText: string;
    cardBorder: string;
    cardBg: string;
    accentBg: string;
    accentText: string;
  };
  calloutLabel: string;
  calloutValue: string;
  note: string;
}) {
  return (
    <section className="bg-[linear-gradient(180deg,#fffdf9_0%,#f8fbff_100%)] py-16 md:py-22">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div
          className={`grid gap-8 lg:items-center ${reverse ? "lg:grid-cols-[0.98fr_1.02fr]" : "lg:grid-cols-[1.02fr_0.98fr]"}`}
        >
          <div className={reverse ? "lg:order-2" : ""}>
            <div className={`mb-4 inline-flex rounded-full border px-4 py-1.5 text-[12px] font-semibold ${accent.chipBg} ${accent.chipText}`}>
              {eyebrow}
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.04em] text-[#221f1b] md:text-[44px]">
              {title}
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              {description}
            </p>
            <div className="mt-6 space-y-3">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-3 rounded-[18px] border border-[#e7edf8] bg-white/95 px-4 py-3 shadow-[0_10px_24px_rgba(44,56,92,0.04)]"
                >
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent.accentBg} ${accent.accentText}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[14px] leading-6 text-[#5e5a53]">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <div className={`rounded-[32px] border p-3 shadow-[0_24px_64px_rgba(46,56,92,0.09)] ${accent.cardBorder} ${accent.cardBg}`}>
              <div className="overflow-hidden rounded-[26px] border border-[#dde6f4] bg-white">
                <div className="relative aspect-[1.22/1] overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,48,0.06)_0%,rgba(13,22,48,0.28)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66748e]">
                    {calloutLabel}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end gap-3">
                    <div className="max-w-[420px] rounded-[20px] border border-white/60 bg-white/92 px-4 py-3 shadow-[0_16px_32px_rgba(17,24,39,0.12)]">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7b95]">
                        {calloutLabel}
                      </div>
                      <div className={`mt-1 text-[18px] font-semibold leading-6 ${accent.accentText}`}>
                        {calloutValue}
                      </div>
                    </div>
                    <div className="rounded-full border border-white/60 bg-[#0f1b3d]/88 px-4 py-2 text-[12px] font-medium text-white shadow-[0_16px_32px_rgba(17,24,39,0.18)]">
                      {note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const related = solution.relatedSlugs
    .map((s) => solutions.find((sol) => sol.slug === s))
    .filter(Boolean);
  const heroShowcase = HERO_SHOWCASE_IMAGES[solution.slug] ?? {
    src: solution.heroImage,
    alt: solution.heroImageAlt,
  };
  const storyImages = STORY_IMAGES[solution.slug] ?? [
    solution.heroImage,
    solution.heroImage,
    solution.heroImage,
  ];

  const painBullets = solution.painPoints.slice(0, 3).map((point) => point.title);
  const capabilityBullets = solution.capabilities.slice(0, 3).map((capability) => capability.title);
  const useCaseBullets = solution.useCases.slice(0, 3).map((useCase) => `${useCase.title}: ${useCase.outcome}`);

  const storyAccents = [
    {
      chipBg: "border-[#dde6f7] bg-white/90",
      chipText: "text-[#4f6487]",
      cardBorder: "border-[#dde6f7]",
      cardBg: "bg-[linear-gradient(180deg,#fffdfa_0%,#f6f9ff_100%)]",
      accentBg: "bg-[#eef4ff]",
      accentText: "text-[#315EEA]",
    },
    {
      chipBg: "border-[#dce6ff] bg-[#f8fbff]",
      chipText: "text-[#315EEA]",
      cardBorder: "border-[#dce6ff]",
      cardBg: "bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]",
      accentBg: "bg-[#eaf0ff]",
      accentText: "text-[#315EEA]",
    },
    {
      chipBg: "border-[#e7e0d6] bg-[#fbf8f2]",
      chipText: "text-[#7f7464]",
      cardBorder: "border-[#e4ddd2]",
      cardBg: "bg-[linear-gradient(180deg,#fffdfa_0%,#f7f3eb_100%)]",
      accentBg: "bg-[#eef4ff]",
      accentText: "text-[#315EEA]",
    },
  ] as const;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: solution.title, item: `${siteConfig.url}/solutions/${slug}` },
    ],
  };

  const faqSchema = solution.faqItems.length
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
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#f4f0e8_16%,#f7fbff_45%,#ffffff_100%)] text-[#221f1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <Navbar />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#f4f8ff_18%,#f7f4ee_58%,#ffffff_100%)] pt-28 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,94,234,0.16),transparent_32%),radial-gradient(circle_at_top_left,rgba(125,164,255,0.14),transparent_28%),radial-gradient(circle_at_left_center,rgba(245,169,88,0.08),transparent_24%)]" />
        <div className="absolute left-[12%] top-12 h-[15rem] w-[15rem] rounded-full bg-[#d7e6ff] blur-[110px]" />
        <div className="absolute right-[10%] top-24 h-[17rem] w-[17rem] rounded-full bg-[#edf3ff] blur-[120px]" />
        <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="grid gap-10 pb-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
            <div className="max-w-[700px]">
              <div className="mb-5 inline-flex rounded-full border border-[#d8e3f7] bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d7f9e] shadow-[0_10px_24px_rgba(49,94,234,0.06)]">
                {solution.category} Solution
              </div>
              <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[38px] leading-[1.03] tracking-[-0.05em] text-[#221f1b] md:text-[62px]">
                {solution.heroTagline}
              </h1>
              <p className="mt-5 max-w-[620px] text-[16px] leading-8 text-[#6d665d] md:text-[18px]">
                {solution.heroSubtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e6ded1] bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-[#5f584f] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(49,94,234,0.28)] transition-all hover:bg-[#264fd4] hover:shadow-[0_14px_30px_rgba(49,94,234,0.34)]"
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

            <div className="rounded-[32px] border border-[#dce6f6] bg-white/90 p-3 shadow-[0_28px_72px_rgba(45,58,96,0.10)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-[28px] border border-[#dce6f6] bg-[linear-gradient(180deg,#fcfdff_0%,#f1f6ff_100%)]">
                <div className="flex items-center justify-between border-b border-[#e4ebf7] px-5 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f7d96]">
                    {solution.heroPanelLabel}
                  </div>
                  <div className="rounded-full bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold text-[#315EEA]">
                    Verly workflow
                  </div>
                </div>
                <div className="relative aspect-[1.16/0.9] overflow-hidden border-b border-[#e4ebf7] bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(49,94,234,0.12),transparent_34%)]" />
                  <Image
                    src={heroShowcase.src}
                    alt={heroShowcase.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,21,44,0.00)_0%,rgba(10,21,44,0.10)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647592] shadow-[0_10px_24px_rgba(20,32,64,0.10)]">
                    {solution.title}
                  </div>
                </div>
                <div className="bg-white px-5 py-5 md:px-6">
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7d899d]">
                    What teams automate first
                  </div>
                  <div className="space-y-3">
                    {solution.heroSummary.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[18px] border border-[#e9eef7] bg-[#fbfdff] px-4 py-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff] text-[#315EEA]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <p className="text-[13px] leading-6 text-[#586173]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0f1b3d] py-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,151,255,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,188,111,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[1360px] grid-cols-2 gap-5 px-5 md:grid-cols-4 md:px-8">
          {solution.metrics.map((metric) => (
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

      <SolutionStorySection
        eyebrow="The Challenge"
        title={`Why ${solution.title.toLowerCase()} teams change the support model`}
        description="The biggest problem is rarely just volume. It is repetitive operational work, poor after-hours coverage, and support handoff that happens too late."
        bullets={painBullets}
        image={storyImages[0]}
        imageAlt={`${solution.title} support team working session`}
        accent={storyAccents[0]}
        calloutLabel="Pressure point"
        calloutValue={solution.painPoints[0]?.title ?? solution.description}
        note={solution.metrics[0]?.label ?? "High-volume support motion"}
      />

      <SolutionStorySection
        eyebrow="Operating Model"
        title={`What Verly automates first for ${solution.title.toLowerCase()}`}
        description="Most teams begin with the highest-volume support motion, connect the right knowledge and routing rules, and then expand once resolution quality is proven."
        bullets={capabilityBullets}
        image={storyImages[1]}
        imageAlt={`${solution.title} support workflow in action`}
        reverse
        accent={storyAccents[1]}
        calloutLabel="Automation layer"
        calloutValue={solution.capabilities[0]?.title ?? solution.heroSummary[0]}
        note={solution.metrics[1]?.label ?? "Fast resolution path"}
      />

      <SolutionStorySection
        eyebrow="Real Scenarios"
        title="How the workflow looks once it is live"
        description="The goal is not a generic chatbot interaction. It is a guided support motion that resolves the request, captures the right context, and only escalates when necessary."
        bullets={useCaseBullets}
        image={storyImages[2]}
        imageAlt={`${solution.title} customer support scenario`}
        accent={storyAccents[2]}
        calloutLabel="Example flow"
        calloutValue={solution.useCases[0]?.title ?? solution.heroSummary[0]}
        note={solution.useCases[0]?.title ?? "Live workflow example"}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#f4efe8_58%,#f8fbff_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9f0e4] bg-white px-4 py-1.5 text-[12px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Solution Coverage
              </div>
              <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.04em] text-[#221f1b] md:text-[46px]">
                Built specifically for {solution.title.toLowerCase()}
              </h2>
              <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                The feature mix is tailored to the workflows, channel expectations, and escalation
                requirements that matter most in this operating environment.
              </p>
            </div>

            <div className="space-y-3">
              {solution.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3.5 rounded-[20px] border border-[#dde6f4] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(44,56,92,0.05)]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-[15px] font-medium leading-7 text-[#2c2f30]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-16 md:py-22">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dde6f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#5f6f8c]">
              Support signals
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.04em] text-[#221f1b] md:text-[44px]">
              Core pressure points this page is designed around
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {solution.painPoints.map((point, index) => {
              const Icon = PAIN_ICONS[index % PAIN_ICONS.length];
              return (
                <div
                  key={point.title}
                  className="rounded-[24px] border border-[#dde6f4] bg-white p-5 shadow-[0_10px_24px_rgba(44,56,92,0.05)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#315EEA]">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#221f1b]">{point.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#6d665d]">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {solution.faqItems.length ? (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[820px] px-5 md:px-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f0dfbc] bg-[#fff7e8] px-4 py-1.5 text-[12px] font-semibold text-[#b07b1a]">
                FAQ
              </div>
              <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.04em] text-[#221f1b] md:text-[44px]">
                Common questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {solution.faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-[18px] border border-[#ece8e0] bg-[#faf8f5] px-5 data-[state=open]:border-[#ead9b8] data-[state=open]:bg-white data-[state=open]:shadow-[0_8px_24px_rgba(217,162,50,0.06)]"
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
      ) : null}

      <section className="relative overflow-hidden bg-[#0f1b3d] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,151,255,0.20),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,188,111,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-[840px] px-5 text-center md:px-8">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.04em] text-white md:text-[48px]">
            Ready to redesign your {solution.title.toLowerCase()} support workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-white/60 md:text-[17px]">
            Start with one high-volume motion, prove resolution quality, then expand across the
            channels and workflows your team actually operates every day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-8 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(49,94,234,0.34)] transition-all hover:bg-[#264fd4]"
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

      {related.length ? (
        <section className="bg-[#faf8f5] py-16 md:py-24">
          <div className="mx-auto max-w-[1360px] px-5 md:px-8">
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.08] tracking-[-0.04em] text-[#221f1b] md:text-[38px]">
              Explore more solutions
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) =>
                item ? (
                  <Link
                    key={item.slug}
                    href={`/solutions/${item.slug}`}
                    className="group overflow-hidden rounded-[26px] border border-[#e8e4dc] bg-white shadow-[0_10px_28px_rgba(59,43,22,0.05)] transition-all hover:shadow-[0_18px_48px_rgba(59,43,22,0.10)]"
                  >
                    <div className="relative aspect-[1.28/1] overflow-hidden border-b border-[#ece6dc]">
                      <Image
                        src={item.cardImage}
                        alt={item.cardImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6 md:p-7">
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[16px] font-semibold text-[#221f1b] transition-colors group-hover:text-[#315EEA]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">{item.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8a8275] transition-colors group-hover:text-[#315EEA]">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
