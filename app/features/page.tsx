import type { Metadata } from "next";
import Link from "next/link";
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
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Features — AI Support Agent Capabilities",
  description: FEATURES_PAGE_CONTENT.intro,
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features — AI Support Agent Capabilities",
    description: FEATURES_PAGE_CONTENT.intro,
    url: `${siteConfig.url}/features`,
    type: "website",
  },
  twitter: {
    title: "Features — AI Support Agent Capabilities",
    description: FEATURES_PAGE_CONTENT.intro,
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

const THEME_COLORS: Record<
  ThemeKey,
  {
    iconWrap: string;
    iconColor: string;
    accentText: string;
    accentBg: string;
    border: string;
    hoverBorder: string;
    sectionBg: string;
  }
> = {
  purple: {
    iconWrap: "bg-violet-100",
    iconColor: "text-violet-600",
    accentText: "text-violet-700",
    accentBg: "bg-violet-50",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    sectionBg: "bg-[linear-gradient(180deg,#f8f5ff_0%,#ffffff_100%)]",
  },
  blue: {
    iconWrap: "bg-blue-100",
    iconColor: "text-blue-600",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    sectionBg: "bg-[linear-gradient(180deg,#f0f6ff_0%,#ffffff_100%)]",
  },
  teal: {
    iconWrap: "bg-cyan-100",
    iconColor: "text-cyan-700",
    accentText: "text-cyan-700",
    accentBg: "bg-cyan-50",
    border: "border-cyan-200",
    hoverBorder: "hover:border-cyan-300",
    sectionBg: "bg-[linear-gradient(180deg,#effcff_0%,#ffffff_100%)]",
  },
  orange: {
    iconWrap: "bg-orange-100",
    iconColor: "text-orange-600",
    accentText: "text-orange-700",
    accentBg: "bg-orange-50",
    border: "border-orange-200",
    hoverBorder: "hover:border-orange-300",
    sectionBg: "bg-[linear-gradient(180deg,#fff8f0_0%,#ffffff_100%)]",
  },
  green: {
    iconWrap: "bg-emerald-100",
    iconColor: "text-emerald-700",
    accentText: "text-emerald-700",
    accentBg: "bg-emerald-50",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    sectionBg: "bg-[linear-gradient(180deg,#f0fdf4_0%,#ffffff_100%)]",
  },
  violet: {
    iconWrap: "bg-fuchsia-100",
    iconColor: "text-fuchsia-700",
    accentText: "text-fuchsia-700",
    accentBg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    hoverBorder: "hover:border-fuchsia-300",
    sectionBg: "bg-[linear-gradient(180deg,#fdf4ff_0%,#ffffff_100%)]",
  },
  indigo: {
    iconWrap: "bg-indigo-100",
    iconColor: "text-indigo-700",
    accentText: "text-indigo-700",
    accentBg: "bg-indigo-50",
    border: "border-indigo-200",
    hoverBorder: "hover:border-indigo-300",
    sectionBg: "bg-[linear-gradient(180deg,#eef0ff_0%,#ffffff_100%)]",
  },
  sky: {
    iconWrap: "bg-sky-100",
    iconColor: "text-sky-700",
    accentText: "text-sky-700",
    accentBg: "bg-sky-50",
    border: "border-sky-200",
    hoverBorder: "hover:border-sky-300",
    sectionBg: "bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_100%)]",
  },
  slate: {
    iconWrap: "bg-slate-100",
    iconColor: "text-slate-700",
    accentText: "text-slate-700",
    accentBg: "bg-slate-50",
    border: "border-slate-200",
    hoverBorder: "hover:border-slate-300",
    sectionBg: "bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]",
  },
  rose: {
    iconWrap: "bg-rose-100",
    iconColor: "text-rose-700",
    accentText: "text-rose-700",
    accentBg: "bg-rose-50",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    sectionBg: "bg-[linear-gradient(180deg,#fff1f2_0%,#ffffff_100%)]",
  },
  amber: {
    iconWrap: "bg-amber-100",
    iconColor: "text-amber-700",
    accentText: "text-amber-700",
    accentBg: "bg-amber-50",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    sectionBg: "bg-[linear-gradient(180deg,#fffbeb_0%,#ffffff_100%)]",
  },
  cyan: {
    iconWrap: "bg-cyan-100",
    iconColor: "text-cyan-700",
    accentText: "text-cyan-700",
    accentBg: "bg-cyan-50",
    border: "border-cyan-200",
    hoverBorder: "hover:border-cyan-300",
    sectionBg: "bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_100%)]",
  },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1360px] mx-auto";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
]);

export default function FeaturesPage() {
  const totalFeatures = FEATURE_CATEGORIES.reduce(
    (count, category) => count + category.features.length,
    0
  );

  return (
    <main className="relative min-h-screen bg-[#fcfcfd] text-[#0f1e35] selection:bg-blue-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10">
        <Navbar />

        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden pb-16 pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(149,92,244,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(25,114,245,0.10),transparent_36%)]" />
          <div className={CONTENT_WIDTH}>
            <div className="relative text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#dcdfea] bg-white px-4 py-2 text-sm font-medium text-[#404968] shadow-sm">
                <Sparkles className="h-4 w-4 text-[#955cf4]" />
                Product capabilities
              </div>
              <h1 className="mx-auto mt-6 max-w-[720px] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0f1e35] sm:text-5xl lg:text-[62px]">
                Every capability of your AI support agent. One platform.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5d6b98] sm:text-lg">
                {FEATURES_PAGE_CONTENT.intro}
              </p>

              <div className="mx-auto max-w-[640px]">
                <FeaturesSearch categories={FEATURE_CATEGORIES} />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#5d6b98]">
                <span className="rounded-full border border-[#e4e7ef] bg-white px-4 py-1.5 font-medium shadow-sm">{FEATURE_CATEGORIES.length} categories</span>
                <span className="rounded-full border border-[#e4e7ef] bg-white px-4 py-1.5 font-medium shadow-sm">{totalFeatures} features</span>
              </div>
            </div>

            {/* Category quick-nav grid */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {FEATURE_CATEGORIES.map((category) => {
                const Icon = HERO_ICONS[category.theme];
                const theme = THEME_COLORS[category.theme];
                return (
                  <a
                    key={category.slug}
                    href={`#${category.slug}`}
                    className={`group flex flex-col items-center gap-3 rounded-2xl border bg-white px-4 py-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.border} ${theme.hoverBorder}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.iconWrap}`}>
                      <Icon className={`h-5 w-5 ${theme.iconColor}`} />
                    </div>
                    <span className="text-[13px] font-medium leading-tight text-[#242f47]">
                      {category.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Categories ─── */}
        <section className="pb-24">
          <div className={`${CONTENT_WIDTH} flex flex-col gap-20`}>
            {FEATURE_CATEGORIES.map((category) => {
              const theme = THEME_COLORS[category.theme];
              const Icon = HERO_ICONS[category.theme];

              return (
                <section
                  key={category.slug}
                  id={category.slug}
                  className="scroll-mt-28"
                >
                  {/* Category header */}
                  <div className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${theme.sectionBg}`}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.iconWrap}`}>
                          <Icon className={`h-6 w-6 ${theme.iconColor}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#0f1e35] md:text-2xl">
                            {category.name}
                          </h2>
                          <p className="mt-1 max-w-xl text-sm leading-6 text-[#5d6b98]">
                            {category.summary}
                          </p>
                        </div>
                      </div>
                      <span className={`inline-flex w-fit shrink-0 items-center rounded-full px-4 py-1.5 text-xs font-semibold ${theme.accentBg} ${theme.accentText}`}>
                        {category.features.length} features
                      </span>
                    </div>
                  </div>

                  {/* Feature grid */}
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.features.map((feature) => {
                      const FeatureIcon = getFeatureIconComponent(feature.iconName);
                      return (
                        <Link
                          key={feature.slug}
                          href={`/features/${feature.slug}`}
                          className="group block"
                        >
                          <article className={`flex h-full flex-col rounded-xl border border-[#eaecf5] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(42,59,81,0.08)] ${theme.hoverBorder}`}>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.iconWrap}`}>
                              <FeatureIcon className={`h-5 w-5 ${theme.iconColor}`} />
                            </div>
                            <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#242f47]">
                              {feature.title}
                            </h3>
                            <p className="mt-2 flex-grow text-[13px] leading-5 text-[#5d6b98]">
                              {feature.shortDescription}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f1e35] transition-colors group-hover:text-[#1972f5]">
                              View details
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </article>
                        </Link>
                      );
                    })}
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
