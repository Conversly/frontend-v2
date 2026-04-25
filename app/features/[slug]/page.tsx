import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import {
  ALL_FEATURES,
  FEATURE_UI_ASSETS,
  FEATURE_CATEGORIES,
  getFeatureBySlug,
  ThemeKey,
} from "../constants";
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

const THEME_CLASS: Record<
  ThemeKey,
  {
    pill: string;
    accent: string;
    soft: string;
    border: string;
  }
> = {
  purple: {
    pill: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-200 dark:border-violet-500/20",
    accent: "text-violet-700 dark:text-violet-300",
    soft: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-100 dark:border-violet-500/20",
  },
  blue: {
    pill: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/20",
    accent: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-100 dark:border-blue-500/20",
  },
  teal: {
    pill: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-500/20",
    accent: "text-cyan-700 dark:text-cyan-300",
    soft: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-100 dark:border-cyan-500/20",
  },
  orange: {
    pill: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/20",
    accent: "text-orange-700 dark:text-orange-300",
    soft: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-100 dark:border-orange-500/20",
  },
  green: {
    pill: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/20",
    accent: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-100 dark:border-emerald-500/20",
  },
  violet: {
    pill: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-500/15 dark:text-fuchsia-200 dark:border-fuchsia-500/20",
    accent: "text-fuchsia-700 dark:text-fuchsia-300",
    soft: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
    border: "border-fuchsia-100 dark:border-fuchsia-500/20",
  },
  indigo: {
    pill: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-200 dark:border-indigo-500/20",
    accent: "text-indigo-700 dark:text-indigo-300",
    soft: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-100 dark:border-indigo-500/20",
  },
  sky: {
    pill: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/20",
    accent: "text-sky-700 dark:text-sky-300",
    soft: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-100 dark:border-sky-500/20",
  },
  slate: {
    pill: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/15 dark:text-slate-200 dark:border-slate-500/20",
    accent: "text-slate-700 dark:text-slate-300",
    soft: "bg-slate-50 dark:bg-slate-500/10",
    border: "border-slate-100 dark:border-slate-500/20",
  },
  rose: {
    pill: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/20",
    accent: "text-rose-700 dark:text-rose-300",
    soft: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-100 dark:border-rose-500/20",
  },
  amber: {
    pill: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/20",
    accent: "text-amber-700 dark:text-amber-300",
    soft: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-100 dark:border-amber-500/20",
  },
  cyan: {
    pill: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-500/20",
    accent: "text-cyan-700 dark:text-cyan-300",
    soft: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-100 dark:border-cyan-500/20",
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";
const DEFAULT_FEATURE_HERO_IMAGE = FEATURE_UI_ASSETS.defaultHeroImagePath;
const DEFAULT_FEATURE_HERO_ALT = FEATURE_UI_ASSETS.defaultHeroImageAlt;

function resolveFeatureVisualPath(imagePath?: string) {
  if (!imagePath) return DEFAULT_FEATURE_HERO_IMAGE;

  if (imagePath.startsWith("/images/features/")) {
    return imagePath;
  }

  if (
    imagePath.includes("feature-visual-placeholder") ||
    imagePath.startsWith("./assets/")
  ) {
    return DEFAULT_FEATURE_HERO_IMAGE;
  }

  return imagePath;
}

function FeatureRasterVisual({
  imagePath,
  alt,
  className = "",
  minHeightClass = "min-h-[280px]",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
}: {
  imagePath?: string;
  alt: string;
  className?: string;
  minHeightClass?: string;
  sizes?: string;
}) {
  const src = resolveFeatureVisualPath(imagePath);
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#eaecf5] bg-[#f8fafc] p-3 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:border-[#243146] dark:bg-[#111827] dark:shadow-[0_16px_40px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[22px] bg-white dark:bg-[#0f1728] ${minHeightClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes={sizes}
        />
      </div>
    </div>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

function StickyTrialCard() {
  return (
    <aside className="sticky top-28 w-full space-y-4">
      {/* CTA card */}
      <div className="rounded-2xl border border-[#eaecf5] bg-white p-5 shadow-sm dark:border-[#243146] dark:bg-[#111827]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1976d2]">
            <Image
              src={FEATURE_UI_ASSETS.trialLogoPath}
              alt="Verly logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#242f47] dark:text-white">
              Try Verly free
            </h3>
            <p className="text-[13px] text-[#667085] dark:text-slate-400">
              No credit card required
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-5 text-[#5d6b98] dark:text-slate-300">
          Bring together AI workflows, automation, and team execution in one support platform.
        </p>
        <Link
          href="/login"
          className="mt-4 flex h-10 items-center justify-center rounded-xl bg-[#1976d2] text-sm font-semibold text-white transition-colors hover:bg-[#1565c0]"
        >
          Start free trial
        </Link>
      </div>

      {/* Preview image */}
      <div className="overflow-hidden rounded-2xl border border-[#eaecf5] bg-[#f8fafc] dark:border-[#243146] dark:bg-[#0f1728]">
        <div className="relative aspect-[19/12] w-full">
          <Image
            src={FEATURE_UI_ASSETS.trialBannerImagePath}
            alt={FEATURE_UI_ASSETS.trialBannerImageAlt}
            fill
            sizes="380px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Quick link */}
      <Link
        href="https://calendly.com/rdhakad2002/30min"
        target="_blank"
        className="flex items-center justify-between rounded-2xl border border-[#eaecf5] bg-white px-5 py-3.5 text-sm font-medium text-[#242f47] transition-colors hover:bg-[#f8fafc] dark:border-[#243146] dark:bg-[#111827] dark:text-white dark:hover:bg-[#162033]"
      >
        Book a demo
        <ArrowRight className="h-4 w-4 text-[#667085]" />
      </Link>
    </aside>
  );
}

function FeatureHeroVisual({
  title,
  imagePath,
  alt,
}: {
  title: string;
  imagePath?: string;
  alt?: string;
}) {
  const src = resolveFeatureVisualPath(imagePath);
  const imageAlt =
    alt && !alt.toLowerCase().includes("placeholder")
      ? alt
      : `${title} - ${DEFAULT_FEATURE_HERO_ALT}`;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#eaecf5] bg-white p-5 shadow-[0_24px_60px_rgba(16,24,40,0.08)] dark:border-[#243146] dark:bg-[#0f1728] dark:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
      <div className="relative min-h-[500px] overflow-hidden rounded-[28px] bg-white dark:bg-[#111827]">
        <Image
          src={src}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return ALL_FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    return { title: "Feature not found" };
  }

  return {
    title: `${feature.title} | Features | Verly`,
    description: feature.subtitle,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: `${feature.title} | Verly Features`,
      description: feature.subtitle,
      url: `${siteConfig.url}/features/${feature.slug}`,
      type: "article",
    },
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  const theme = THEME_CLASS[feature.theme];
  const relatedFeatures =
    FEATURE_CATEGORIES.find((category) => category.slug === feature.categorySlug)?.features.filter(
      (item) => item.slug !== feature.slug
    ) ?? [];

  return (
    <main className="relative min-h-screen bg-[#fcfcfd] text-[#0f1e35] selection:bg-blue-100 dark:bg-[#090c14] dark:text-white">
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      <div className="relative z-10">
        <Navbar />

        <section className="pt-28 pb-12">
          <div className={CONTENT_WIDTH}>
            <Breadcrumb>
              <BreadcrumbList className="text-sm text-[#667085] dark:text-slate-400 [&_a]:dark:text-slate-300 [&_svg]:dark:text-slate-500">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/features">Features</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{feature.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${theme.pill}`}
                >
                  <Sparkles className="h-4 w-4" />
                  {feature.categoryName}
                </div>
                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-[#0f1e35] dark:text-white md:text-7xl">
                  {feature.title}
                </h1>
                <p className="mt-6 max-w-2xl text-xl leading-9 text-[#5d6b98] dark:text-slate-300">
                  {feature.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-[#dcdfea] bg-white px-3 py-2 text-sm font-medium text-[#667085] dark:border-[#243146] dark:bg-[#111827] dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <FeatureHeroVisual
                title={feature.title}
                imagePath={feature.heroImagePath}
                alt={feature.heroImageAlt}
              />
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className={`${CONTENT_WIDTH} grid gap-12 lg:grid-cols-[1fr_380px]`}>
            <div className="space-y-16">
              <div className="space-y-8 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                {feature.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937] dark:text-white">
                  What is {feature.title}?
                </h2>
                <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                  <p>{feature.overview}</p>
                  <ul className="space-y-4">
                    {feature.definitionPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className={`mt-1 h-5 w-5 shrink-0 ${theme.accent}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <FeatureRasterVisual
                  imagePath={feature.overviewImagePath}
                  alt={`${feature.title} — overview`}
                  className="mt-10"
                  minHeightClass="min-h-[360px]"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937] dark:text-white">
                  Here&apos;s how you can use the {feature.title} feature
                </h2>
                <ul className="mt-8 space-y-5 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                  {feature.usageList.map((item) => (
                    <li key={item} className="list-disc ml-6 pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                  <span className="font-semibold text-[#242f47] dark:text-white">Workflow hint:</span>{" "}
                  {feature.workflowHint}
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <FeatureRasterVisual
                    imagePath={feature.workflowImagePaths[0]}
                    alt={`${feature.title} — workflow`}
                    minHeightClass="min-h-[240px]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <FeatureRasterVisual
                    imagePath={feature.workflowImagePaths[1]}
                    alt={`${feature.title} — workflow detail`}
                    minHeightClass="min-h-[240px]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937] dark:text-white">
                  How {feature.title} works
                </h2>
                <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                  {feature.howItWorksIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-10 space-y-10">
                  {feature.functionBlocks.map((block) => (
                    <div key={block.name}>
                      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#242f47] dark:text-white">
                        {block.name}
                      </h3>
                      <p className="mt-4 text-[17px] leading-9 text-[#5d6b98] dark:text-slate-300">
                        {block.description}
                      </p>
                      {block.notes ? (
                        <ul className="mt-5 space-y-3 text-[16px] leading-8 text-[#5d6b98] dark:text-slate-300">
                          {block.notes.map((note) => (
                            <li key={note} className="list-disc ml-6 pl-2">
                              {note}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <FeatureRasterVisual
                        imagePath={block.imagePath}
                        alt={block.imageAlt}
                        className="mt-8"
                        minHeightClass="min-h-[300px]"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937] dark:text-white">
                  How to set up {feature.title}
                </h2>
                <div className="mt-10 space-y-8">
                  {feature.setupSteps.map((step) => (
                    <div
                      key={step.title}
                      className={`rounded-[28px] border ${theme.border} bg-white p-8 shadow-sm dark:bg-[#111827] dark:shadow-[0_16px_40px_rgba(0,0,0,0.25)]`}
                    >
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#242f47] dark:text-white">
                        {step.title}
                      </h3>
                      <ul className="mt-5 space-y-3 text-[16px] leading-8 text-[#5d6b98] dark:text-slate-300">
                        {step.items.map((item) => (
                          <li key={item} className="list-disc ml-6 pl-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937] dark:text-white">
                  Frequently asked questions
                </h2>
                <Accordion type="single" collapsible className="mt-8 space-y-3">
                  {feature.faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border border-[#eaecf5] bg-white px-6 dark:border-[#243146] dark:bg-[#111827]">
                      <AccordionTrigger className="text-left text-lg font-semibold text-[#242f47] hover:no-underline dark:text-white">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[16px] leading-8 text-[#667085] dark:text-slate-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            <div>
              <StickyTrialCard />
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className={`${CONTENT_WIDTH} space-y-16`}>
            <section className="rounded-[36px] bg-[linear-gradient(180deg,#16181d,#1f2d4d)] px-8 py-16 text-center text-white shadow-[0_30px_80px_rgba(16,24,40,0.24)]">
              <h2 className="mx-auto max-w-[14ch] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Ship better support, faster.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
                {feature.title} is one of every capability in Verly. One agent across voice, WhatsApp, and web chat — branched, previewed, and rolled back like software.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/login"
                  className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-[#111827]"
                >
                  Start free
                </Link>
                <Link
                  href="https://calendly.com/rdhakad2002/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-base font-semibold text-white"
                >
                  Book a 20-min demo
                </Link>
              </div>
            </section>

            {relatedFeatures.length > 0 && (
              <section>
                <h2 className="text-center text-5xl font-semibold tracking-[-0.05em] text-[#111827] dark:text-white">
                  Learn more
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {relatedFeatures.slice(0, 3).map((relatedFeature) => {
                    const relatedDetail = getFeatureBySlug(relatedFeature.slug);
                    const relatedHero = resolveFeatureVisualPath(
                      relatedDetail?.heroImagePath
                    );
                    return (
                    <Link
                      key={relatedFeature.slug}
                      href={`/features/${relatedFeature.slug}`}
                      className="group block"
                    >
                      <article className="overflow-hidden rounded-[28px] border border-[#eaecf5] bg-white shadow-[0_18px_50px_rgba(42,59,81,0.08)] transition-all duration-200 hover:-translate-y-1 dark:border-[#243146] dark:bg-[#111827] dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                        <div className="relative h-[240px] w-full overflow-hidden border-b border-[#eaecf5] bg-[#f8fafc] dark:border-[#243146] dark:bg-[#0f1728]">
                          <Image
                            src={relatedHero}
                            alt={`${relatedFeature.title} preview`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#242f47] dark:text-white">
                            {relatedFeature.title}
                          </h3>
                          <p className="mt-4 text-[16px] leading-8 text-[#667085] dark:text-slate-300">
                            {relatedFeature.shortDescription}
                          </p>
                          <div className="mt-6 text-sm text-[#7d89b0] dark:text-slate-400">
                            Jan 20, 2026 · 5 min read
                          </div>
                          <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-xl border border-[#dcdfea] bg-[#fcfcfd] px-3 py-1.5 text-sm text-[#667085] dark:border-[#243146] dark:bg-[#0f1728] dark:text-slate-300">
                              {feature.categoryName}
                            </span>
                            <span className="rounded-xl border border-[#dcdfea] bg-[#fcfcfd] px-3 py-1.5 text-sm text-[#667085] dark:border-[#243146] dark:bg-[#0f1728] dark:text-slate-300">
                              Verly
                            </span>
                          </div>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#242f47] group-hover:text-[#1972f5] dark:text-slate-100 dark:group-hover:text-blue-300">
                            Open feature
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </article>
                    </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </section>

        <div className={CONTENT_WIDTH}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
