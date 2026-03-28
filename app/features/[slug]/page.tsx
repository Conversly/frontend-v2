import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import {
  ALL_FEATURES,
  FEATURE_CATEGORIES,
  getFeatureBySlug,
  ThemeKey,
} from "../data";
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
    pill: "bg-violet-100 text-violet-700 border-violet-200",
    accent: "text-violet-700",
    soft: "bg-violet-50",
    border: "border-violet-100",
  },
  blue: {
    pill: "bg-blue-100 text-blue-700 border-blue-200",
    accent: "text-blue-700",
    soft: "bg-blue-50",
    border: "border-blue-100",
  },
  teal: {
    pill: "bg-cyan-100 text-cyan-700 border-cyan-200",
    accent: "text-cyan-700",
    soft: "bg-cyan-50",
    border: "border-cyan-100",
  },
  orange: {
    pill: "bg-orange-100 text-orange-700 border-orange-200",
    accent: "text-orange-700",
    soft: "bg-orange-50",
    border: "border-orange-100",
  },
  green: {
    pill: "bg-emerald-100 text-emerald-700 border-emerald-200",
    accent: "text-emerald-700",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
  },
  violet: {
    pill: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    accent: "text-fuchsia-700",
    soft: "bg-fuchsia-50",
    border: "border-fuchsia-100",
  },
  indigo: {
    pill: "bg-indigo-100 text-indigo-700 border-indigo-200",
    accent: "text-indigo-700",
    soft: "bg-indigo-50",
    border: "border-indigo-100",
  },
  sky: {
    pill: "bg-sky-100 text-sky-700 border-sky-200",
    accent: "text-sky-700",
    soft: "bg-sky-50",
    border: "border-sky-100",
  },
  slate: {
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "text-slate-700",
    soft: "bg-slate-50",
    border: "border-slate-100",
  },
  rose: {
    pill: "bg-rose-100 text-rose-700 border-rose-200",
    accent: "text-rose-700",
    soft: "bg-rose-50",
    border: "border-rose-100",
  },
  amber: {
    pill: "bg-amber-100 text-amber-700 border-amber-200",
    accent: "text-amber-700",
    soft: "bg-amber-50",
    border: "border-amber-100",
  },
  cyan: {
    pill: "bg-cyan-100 text-cyan-700 border-cyan-200",
    accent: "text-cyan-700",
    soft: "bg-cyan-50",
    border: "border-cyan-100",
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

type Props = {
  params: Promise<{ slug: string }>;
};

function SvgPlaceholder({
  title,
  alt,
  className = "",
}: {
  title: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#eaecf5] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#1972f514] text-[#1972f5]">
          <ImageIcon className="h-8 w-8" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[#242f47]">{title}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#667085]">
            SVG placeholder for: {alt}
          </p>
        </div>
      </div>
    </div>
  );
}

function StickyTrialCard() {
  return (
    <aside className="sticky top-28 mx-auto w-full max-w-[360px] rounded-[28px] border border-[#2f3442] bg-[#202123] p-8 text-white shadow-[0_24px_60px_rgba(16,24,40,0.25)]">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff9f43]">
          <Image
            src="/verly_logo.png"
            alt="VerlyAI logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </div>
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
          Start your free trial
        </h3>
        <p className="mt-4 max-w-[280px] text-base leading-8 text-white/75">
          Get professional customer support with VerlyAI. Bring together AI workflows, automation, and team execution in one platform.
        </p>
      </div>
      <div className="mt-8">
        <Link
          href="/login"
          className="flex h-12 items-center justify-center rounded-2xl bg-[#ff9f43] px-5 text-base font-semibold text-white transition-colors hover:bg-[#f28c28]"
        >
          Try VerlyAI free
        </Link>
      </div>
      <SvgPlaceholder
        title="Feature promo visual"
        alt="Feature trial promo illustration"
        className="mt-8 min-h-[190px] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"
      />
    </aside>
  );
}

export function generateStaticParams() {
  return ALL_FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    return { title: "Feature not found | VerlyAI" };
  }

  return {
    title: `${feature.title} | Features | VerlyAI`,
    description: feature.subtitle,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: `${feature.title} | VerlyAI Features`,
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
    <main className="bg-[#fcfcfd] relative min-h-screen selection:bg-blue-100">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="relative z-10">
        <Navbar />

        <section className="pt-28 pb-12">
          <div className={CONTENT_WIDTH}>
            <Breadcrumb>
              <BreadcrumbList className="text-sm text-[#667085]">
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
                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-[#0f1e35] md:text-7xl">
                  {feature.title}
                </h1>
                <p className="mt-6 max-w-2xl text-xl leading-9 text-[#5d6b98]">
                  {feature.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-[#dcdfea] bg-white px-3 py-2 text-sm font-medium text-[#667085]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <SvgPlaceholder
                title={`${feature.title} hero visual`}
                alt={`${feature.title} SVG hero illustration`}
                className="min-h-[500px]"
              />
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className={`${CONTENT_WIDTH} grid gap-12 lg:grid-cols-[1fr_380px]`}>
            <div className="space-y-16">
              <div className="space-y-8 text-[17px] leading-9 text-[#5d6b98]">
                {feature.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937]">
                  What is {feature.title}?
                </h2>
                <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#5d6b98]">
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
                <SvgPlaceholder
                  title={`${feature.title} general view`}
                  alt={`${feature.title} detailed section illustration`}
                  className="mt-10"
                />
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937]">
                  Here&apos;s how you can use the {feature.title} feature
                </h2>
                <ul className="mt-8 space-y-5 text-[17px] leading-9 text-[#5d6b98]">
                  {feature.usageList.map((item) => (
                    <li key={item} className="list-disc ml-6 pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[17px] leading-9 text-[#5d6b98]">
                  <span className="font-semibold text-[#242f47]">Workflow hint:</span>{" "}
                  {feature.workflowHint}
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <SvgPlaceholder
                    title="Primary workflow placeholder"
                    alt={`${feature.title} workflow step one`}
                  />
                  <SvgPlaceholder
                    title="Secondary workflow placeholder"
                    alt={`${feature.title} workflow step two`}
                  />
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937]">
                  How {feature.title} works
                </h2>
                <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#5d6b98]">
                  {feature.howItWorksIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-10 space-y-10">
                  {feature.functionBlocks.map((block) => (
                    <div key={block.name}>
                      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#242f47]">
                        {block.name}
                      </h3>
                      <p className="mt-4 text-[17px] leading-9 text-[#5d6b98]">
                        {block.description}
                      </p>
                      {block.notes ? (
                        <ul className="mt-5 space-y-3 text-[16px] leading-8 text-[#5d6b98]">
                          {block.notes.map((note) => (
                            <li key={note} className="list-disc ml-6 pl-2">
                              {note}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <SvgPlaceholder
                        title={`${block.name} visual`}
                        alt={block.imageAlt}
                        className="mt-8"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2937]">
                  How to set up {feature.title}
                </h2>
                <div className="mt-10 space-y-8">
                  {feature.setupSteps.map((step) => (
                    <div
                      key={step.title}
                      className={`rounded-[28px] border ${theme.border} bg-white p-8 shadow-sm`}
                    >
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#242f47]">
                        {step.title}
                      </h3>
                      <ul className="mt-5 space-y-3 text-[16px] leading-8 text-[#5d6b98]">
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

              <section className="common-faq">
                <h2 className="common-faq__title text-[#1f2937]">
                  Frequently asked questions
                </h2>
                <Accordion type="single" collapsible className="common-faq-list">
                  {feature.faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`faq-${index}`} className="border-[#eaecf5]">
                      <AccordionTrigger className="common-faq-list__question text-left text-xl font-semibold text-[#242f47] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="common-faq-list__answer ml-0 pt-0 text-[16px] leading-8 text-[#667085]">
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
              <h2 className="mx-auto max-w-[10ch] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Improve your sales communication
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
                Bring more clarity, speed, and quality to every customer conversation with {feature.title}.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/login"
                  className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-[#111827]"
                >
                  Try VerlyAI
                </Link>
                <Link
                  href="/about"
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-base font-semibold text-white"
                >
                  Schedule a demo
                </Link>
              </div>
            </section>

            {relatedFeatures.length > 0 && (
              <section>
                <h2 className="text-center text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
                  Learn more
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {relatedFeatures.slice(0, 3).map((relatedFeature) => (
                    <Link
                      key={relatedFeature.slug}
                      href={`/features/${relatedFeature.slug}`}
                      className="group block"
                    >
                      <article className="overflow-hidden rounded-[28px] border border-[#eaecf5] bg-white shadow-[0_18px_50px_rgba(42,59,81,0.08)] transition-all duration-200 hover:-translate-y-1">
                        <SvgPlaceholder
                          title={`${relatedFeature.title} preview`}
                          alt={`${relatedFeature.title} related content image placeholder`}
                          className="rounded-none border-0 border-b min-h-[240px]"
                        />
                        <div className="p-8">
                          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#242f47]">
                            {relatedFeature.title}
                          </h3>
                          <p className="mt-4 text-[16px] leading-8 text-[#667085]">
                            {relatedFeature.shortDescription}
                          </p>
                          <div className="mt-6 text-sm text-[#7d89b0]">
                            Jan 20, 2026 · 5 min read
                          </div>
                          <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-xl border border-[#dcdfea] bg-[#fcfcfd] px-3 py-1.5 text-sm text-[#667085]">
                              {feature.categoryName}
                            </span>
                            <span className="rounded-xl border border-[#dcdfea] bg-[#fcfcfd] px-3 py-1.5 text-sm text-[#667085]">
                              VerlyAI
                            </span>
                          </div>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#242f47] group-hover:text-[#1972f5]">
                            Open feature
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
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
