import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BookOpen,
  Languages,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
  Trophy,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { FEATURE_CATEGORIES, FEATURES_PAGE_CONTENT, ThemeKey } from "./constants";
import { siteConfig } from "@/lib/metadata";
import FeaturesSearch from "./features-search";
import { getFeatureIconComponent } from "./feature-icon";

export const metadata: Metadata = {
  title: "Features | VerlyAI",
  description: FEATURES_PAGE_CONTENT.intro,
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features | VerlyAI",
    description: FEATURES_PAGE_CONTENT.intro,
    url: `${siteConfig.url}/features`,
    type: "website",
  },
};

const HERO_ICONS: Record<ThemeKey, typeof Sparkles> = {
  purple: Bot,
  blue: Ticket,
  teal: MessageCircleMore,
  orange: PhoneCall,
  green: BarChart3,
  violet: Trophy,
  indigo: Languages,
  sky: BookOpen,
  slate: Smartphone,
  rose: ShieldCheck,
  amber: Workflow,
  cyan: Sparkles,
};

const THEME_STYLES: Record<
  ThemeKey,
  {
    container: string;
    iconWrap: string;
    iconColor: string;
    accentText: string;
    badge: string;
  }
> = {
  purple: {
    container: "common-colored-container--purple dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-violet-100 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-300",
    accentText: "text-violet-700 dark:text-violet-200",
    badge:
      "common-tag common-tag--purple dark:!border-violet-400/20 dark:!bg-violet-400/10 dark:!text-violet-200",
  },
  blue: {
    container: "common-colored-container--blue dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-blue-100 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-300",
    accentText: "text-blue-700 dark:text-blue-200",
    badge:
      "common-tag common-tag--blue dark:!border-blue-400/20 dark:!bg-blue-400/10 dark:!text-blue-200",
  },
  teal: {
    container: "common-colored-container--light-blue dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-cyan-100 dark:bg-cyan-500/15",
    iconColor: "text-cyan-700 dark:text-cyan-300",
    accentText: "text-cyan-700 dark:text-cyan-200",
    badge:
      "common-tag common-tag--blue dark:!border-cyan-400/20 dark:!bg-cyan-400/10 dark:!text-cyan-200",
  },
  orange: {
    container: "common-colored-container--orange dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-orange-100 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-300",
    accentText: "text-orange-700 dark:text-orange-200",
    badge:
      "common-tag common-tag--orange dark:!border-orange-400/20 dark:!bg-orange-400/10 dark:!text-orange-200",
  },
  green: {
    container: "common-colored-container--green dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    accentText: "text-emerald-700 dark:text-emerald-200",
    badge:
      "common-tag common-tag--green dark:!border-emerald-400/20 dark:!bg-emerald-400/10 dark:!text-emerald-200",
  },
  violet: {
    container: "common-colored-container--purple dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-fuchsia-100 dark:bg-fuchsia-500/15",
    iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
    accentText: "text-fuchsia-700 dark:text-fuchsia-200",
    badge:
      "common-tag common-tag--purple dark:!border-fuchsia-400/20 dark:!bg-fuchsia-400/10 dark:!text-fuchsia-200",
  },
  indigo: {
    container: "common-colored-container--light-blue dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-indigo-100 dark:bg-indigo-500/15",
    iconColor: "text-indigo-700 dark:text-indigo-300",
    accentText: "text-indigo-700 dark:text-indigo-200",
    badge:
      "common-tag common-tag--blue dark:!border-indigo-400/20 dark:!bg-indigo-400/10 dark:!text-indigo-200",
  },
  sky: {
    container: "common-colored-container--blue dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-sky-100 dark:bg-sky-500/15",
    iconColor: "text-sky-700 dark:text-sky-300",
    accentText: "text-sky-700 dark:text-sky-200",
    badge:
      "common-tag common-tag--blue dark:!border-sky-400/20 dark:!bg-sky-400/10 dark:!text-sky-200",
  },
  slate: {
    container: "common-colored-container--white dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-slate-100 dark:bg-slate-500/15",
    iconColor: "text-slate-700 dark:text-slate-300",
    accentText: "text-slate-700 dark:text-slate-200",
    badge:
      "common-tag common-tag--gray dark:!border-slate-400/20 dark:!bg-slate-400/10 dark:!text-slate-200",
  },
  rose: {
    container: "common-colored-container--white dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-rose-100 dark:bg-rose-500/15",
    iconColor: "text-rose-700 dark:text-rose-300",
    accentText: "text-rose-700 dark:text-rose-200",
    badge:
      "common-tag common-tag--orange dark:!border-rose-400/20 dark:!bg-rose-400/10 dark:!text-rose-200",
  },
  amber: {
    container: "common-colored-container--orange dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-amber-100 dark:bg-amber-500/15",
    iconColor: "text-amber-700 dark:text-amber-300",
    accentText: "text-amber-700 dark:text-amber-200",
    badge:
      "common-tag common-tag--orange dark:!border-amber-400/20 dark:!bg-amber-400/10 dark:!text-amber-200",
  },
  cyan: {
    container: "common-colored-container--light-blue dark:!border-[#243146] dark:!bg-[#0f1728]",
    iconWrap: "bg-cyan-100 dark:bg-cyan-500/15",
    iconColor: "text-cyan-700 dark:text-cyan-300",
    accentText: "text-cyan-700 dark:text-cyan-200",
    badge:
      "common-tag common-tag--blue dark:!border-cyan-400/20 dark:!bg-cyan-400/10 dark:!text-cyan-200",
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1360px] mx-auto";

export default function FeaturesPage() {
  const totalFeatures = FEATURE_CATEGORIES.reduce(
    (count, category) => count + category.features.length,
    0
  );

  return (
    <main className="relative min-h-screen bg-[#fcfcfd] text-[#0f1e35] selection:bg-blue-100 dark:bg-[#090c14] dark:text-white">
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      <div className="relative z-10">
        <Navbar />

        <section className="pt-32 pb-14">
          <div className={CONTENT_WIDTH}>
            <header className="relative rounded-[36px] border border-[#dcdfea] bg-[radial-gradient(circle_at_top_left,rgba(149,92,244,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(25,114,245,0.14),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,252,253,0.92))] p-6 shadow-[0_24px_80px_rgba(42,59,81,0.08)] dark:border-[#243146] dark:bg-[radial-gradient(circle_at_top_left,rgba(149,92,244,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(25,114,245,0.14),transparent_36%),linear-gradient(180deg,rgba(15,23,40,0.98),rgba(9,12,20,0.98))] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-60 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
              </div>
              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#dcdfea] bg-white px-4 py-2 text-sm font-medium text-[#404968] shadow-sm dark:border-[#243146] dark:bg-[#0f1728] dark:text-slate-200">
                    <Sparkles className="h-4 w-4 text-[#955cf4] dark:text-violet-300" />
                    Product capabilities
                  </div>
                  <h1 className="mt-6 max-w-[11ch] text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#0f1e35] dark:text-white sm:text-5xl lg:text-[70px]">
                    Every VerlyAI feature in one place
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#5d6b98] dark:text-slate-300 sm:text-lg">
                    {FEATURES_PAGE_CONTENT.intro}
                  </p>

                  <FeaturesSearch categories={FEATURE_CATEGORIES} />

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="common-badge common-badge--white common-badge--large dark:!border-[#243146] dark:!bg-[#0f1728] dark:shadow-none">
                      <span className="common-badge__label dark:!text-slate-200">{FEATURE_CATEGORIES.length} categories</span>
                    </div>
                    <div className="common-badge common-badge--white common-badge--large dark:!border-[#243146] dark:!bg-[#0f1728] dark:shadow-none">
                      <span className="common-badge__label dark:!text-slate-200">{totalFeatures} individual features</span>
                    </div>
                    <div className="common-badge common-badge--purple common-badge--large dark:!border-violet-400/20 dark:!bg-violet-400/10 dark:shadow-none">
                      <span className="common-badge__label dark:!text-violet-100">Click any feature for details</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_16px_45px_rgba(42,59,81,0.08)] backdrop-blur-sm dark:border-[#243146] dark:bg-[#0f1728]/90 dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    <div className="grid gap-4">
                      {FEATURE_CATEGORIES.slice(0, 3).map((category, index) => {
                        const Icon = HERO_ICONS[category.theme];
                        const theme = THEME_STYLES[category.theme];

                        return (
                          <div
                            key={category.slug}
                            className={`rounded-[24px] border border-[#eaecf5] bg-white p-4 shadow-sm dark:border-[#243146] dark:bg-[#111827] ${
                              index === 1 ? "ml-6" : index === 2 ? "mr-10" : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.iconWrap}`}
                              >
                                <Icon className={`h-5 w-5 ${theme.iconColor}`} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-base font-semibold text-[#242f47] dark:text-white">
                                  {category.name}
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5d6b98] dark:text-slate-300">
                                  {category.summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </section>

        <section className="pb-24">
          <div className={`${CONTENT_WIDTH} flex flex-col gap-14`}>
            {FEATURE_CATEGORIES.map((category) => {
              const theme = THEME_STYLES[category.theme];
              const Icon = HERO_ICONS[category.theme];

              return (
                <section
                  key={category.slug}
                  id={category.slug}
                  className="scroll-mt-28"
                >
                  <div
                    className={`common-colored-container common-colored-container--horizontal ${theme.container} overflow-hidden`}
                  >
                    <div className="common-colored-container__content gap-10 lg:items-center">
                      <div className="flex-1">
                        <span className={theme.badge}>Category</span>
                        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#0f1e35] dark:text-white md:text-4xl">
                          {category.name}
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5d6b98] dark:text-slate-300">
                          {category.summary}
                        </p>
                        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-medium text-[#404968] shadow-sm dark:border-[#243146] dark:bg-[#111827] dark:text-slate-200">
                          <span>{category.features.length} features</span>
                          <span className="h-1 w-1 rounded-full bg-[#955cf4]" />
                          <span>Structured for quick browsing</span>
                        </div>
                      </div>

                      <div className="flex flex-1 justify-end">
                        <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-4 shadow-[0_20px_60px_rgba(149,92,244,0.15)] backdrop-blur-sm dark:border-[#243146] dark:bg-[#0f1728]/90 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                          <div className="absolute inset-y-0 right-0 w-1/2 rounded-r-[28px] bg-[linear-gradient(180deg,rgba(149,92,244,0.12),rgba(25,114,245,0.08))] dark:bg-[linear-gradient(180deg,rgba(149,92,244,0.12),rgba(25,114,245,0.18))]" />
                          <div className="relative z-10">
                            <div className="relative overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-sm dark:border-[#243146] dark:bg-[#111827]">
                              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:18px_18px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
                              <div className="relative flex min-h-[320px] items-center justify-center">
                                {category.imagePath ? (
                                  <Image
                                    src={category.imagePath}
                                    alt={`${category.name} visual`}
                                    width={460}
                                    height={320}
                                    className="h-auto max-h-[300px] w-auto max-w-full object-contain"
                                  />
                                ) : (
                                  <div
                                    className={`flex h-20 w-20 items-center justify-center rounded-3xl ${theme.iconWrap}`}
                                  >
                                    <Icon className={`h-10 w-10 ${theme.iconColor}`} />
                                  </div>
                                )}
                              </div>

                              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-3 py-2 shadow-sm dark:border-[#243146] dark:bg-[#0f1728]/95">
                                <div
                                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${theme.iconWrap}`}
                                >
                                  <Icon className={`h-5 w-5 ${theme.iconColor}`} />
                                </div>
                                <div>
                                  <div className={`text-sm font-semibold ${theme.accentText}`}>
                                    {category.features[0]?.title}
                                  </div>
                                  <div className="text-xs text-[#7d89b0] dark:text-slate-400">Popular in this category</div>
                                </div>
                              </div>

                              {category.features[1] ? (
                                <div className="pointer-events-none absolute bottom-5 right-5 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-sm dark:border-[#243146] dark:bg-[#0f1728]/95">
                                  <div className="text-sm font-semibold text-[#242f47] dark:text-white">
                                    {category.features[1].title}
                                  </div>
                                  <div className="mt-1 text-xs text-[#7d89b0] dark:text-slate-400">Feature highlight</div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {category.features.map((feature) => (
                      <Link
                        key={feature.slug}
                        href={`/features/${feature.slug}`}
                        className="group block h-full"
                      >
                        <article className="common-card common-card--white-feature h-full rounded-[24px] border border-[#eaecf5] bg-white p-2 transition-all duration-200 hover:-translate-y-1 hover:border-[#c6d7ff] hover:shadow-[0_20px_45px_rgba(42,59,81,0.08)] dark:border-[#243146] dark:bg-[#0f1728] dark:hover:border-[#35507a] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                          <div className="flex h-full flex-col rounded-[22px] border border-white bg-white p-8 dark:border-[#1d293d] dark:bg-[#111827]">
                            {(() => {
                              const FeatureIcon = getFeatureIconComponent(feature.iconName);
                              return (
                                <div
                                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.iconWrap}`}
                                >
                                  <FeatureIcon className={`h-6 w-6 ${theme.iconColor}`} />
                                </div>
                              );
                            })()}
                            <h3 className="mt-6 text-[30px] font-semibold leading-8 tracking-[-0.03em] text-[#242f47] dark:text-white">
                              {feature.title}
                            </h3>
                            <p className="mt-4 flex-grow text-[15px] leading-7 text-[#5d6b98] dark:text-slate-300">
                              {feature.shortDescription}
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f1e35] transition-colors group-hover:text-[#1972f5] dark:text-slate-100 dark:group-hover:text-blue-300">
                              View details
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <div className={CONTENT_WIDTH}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
