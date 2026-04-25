import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, MinusCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";
import { getCompetitor, getAllCompetitorSlugs } from "@/lib/compare-data";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import { siteConfig } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCompetitorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${siteConfig.url}/compare/${c.slug}`,
      type: "website",
    },
    twitter: {
      title: c.metaTitle,
      description: c.metaDescription,
    },
  };
}

const hintIcon = {
  verly: CheckCircle2,
  them: XCircle,
  tie: MinusCircle,
} as const;

const hintColor = {
  verly: "text-[#2b7a3d]",
  them: "text-[#cc5a3e]",
  tie: "text-[#8a8167]",
} as const;

export default async function CompareCompetitorPage({ params }: Params) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `Verly vs ${c.name}`, path: `/compare/${c.slug}` },
  ]);

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_18%,#faf7f0_55%,#ffffff_100%)] text-[#111827]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <div className="relative mx-auto w-[95%] max-w-[1100px] px-0 pb-20 pt-32 md:pt-40">
        {/* Hero */}
        <header className="mb-14 text-center md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbe5f7] bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5872a8] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Honest comparison
          </div>
          <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[40px] leading-[1.04] tracking-[-0.04em] text-[#0f172a] md:text-[64px]">
            Verly vs{" "}
            <span className="bg-[linear-gradient(180deg,#4f7dff_0%,#315EEA_100%)] bg-clip-text text-transparent">
              {c.name}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[17px] leading-[1.7] text-[#5d6b8b] md:mx-0 md:text-[19px]">
            {c.oneLiner}
          </p>
        </header>

        {/* TL;DR */}
        <section className="mb-14 rounded-[26px] border border-[#e4e9f4] bg-white/90 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] backdrop-blur-sm md:p-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#9f917a]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#60708d]">
              TL;DR
            </span>
          </div>
          <p className="mt-4 max-w-[780px] font-[Georgia,Times,'Times_New_Roman',serif] text-[19px] leading-[1.55] tracking-[-0.01em] text-[#0f172a] md:text-[22px]">
            {c.tlDr}
          </p>
        </section>

        {/* Comparison table */}
        <section aria-labelledby="feature-matrix" className="mb-16">
          <h2
            id="feature-matrix"
            className="mb-6 font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#0f172a] md:text-[36px]"
          >
            Feature by feature.
          </h2>

          <div className="overflow-hidden rounded-[22px] border border-[#e4e9f4] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-[#e4e9f4] bg-[#f8fafc] px-4 py-4 md:gap-6 md:px-6">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#60708d]">
                Feature
              </span>
              <span className="font-sans text-[12px] font-bold text-[#141923]">
                Verly
              </span>
              <span className="font-sans text-[12px] font-bold text-[#60708d]">
                {c.name}
              </span>
            </div>

            {/* Rows */}
            {c.rows.map((row, i) => {
              const Icon = hintIcon[row.hint ?? "tie"];
              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.4fr_1fr_1fr] items-start gap-4 px-4 py-4 md:gap-6 md:px-6 ${
                    i !== c.rows.length - 1 ? "border-b border-[#eef1f7]" : ""
                  }`}
                >
                  <span className="flex items-start gap-2 font-sans text-[14px] font-medium text-[#334155] md:text-[15px]">
                    <Icon
                      aria-hidden
                      className={`mt-0.5 h-4 w-4 shrink-0 ${hintColor[row.hint ?? "tie"]}`}
                    />
                    {row.label}
                  </span>
                  <span className="font-sans text-[14px] leading-[1.55] text-[#0f172a] md:text-[15px]">
                    {row.verly}
                  </span>
                  <span className="font-sans text-[14px] leading-[1.55] text-[#5d6b8b] md:text-[15px]">
                    {row.them}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Where they win / where we win */}
        <section className="mb-16 grid gap-5 md:grid-cols-2 md:gap-6">
          <article className="rounded-[26px] border border-[#e4ddd4] bg-[linear-gradient(180deg,#fbf8f1_0%,#f6f1e6_100%)] p-7 md:p-8">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c7c5c]">
              Where {c.name} wins
            </div>
            <h3 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[22px] leading-[1.2] tracking-[-0.02em] text-[#1c1a14] md:text-[25px]">
              The credible case for staying.
            </h3>
            <ul className="mt-5 space-y-3">
              {c.theyWin.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 font-sans text-[15px] leading-[1.65] text-[#3d3a33]"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#cc5a3e]" />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[26px] border border-[#dde6f4] bg-[linear-gradient(180deg,#f7fbff_0%,#eef5ff_100%)] p-7 md:p-8">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#315EEA]">
              Where Verly wins
            </div>
            <h3 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[22px] leading-[1.2] tracking-[-0.02em] text-[#0f172a] md:text-[25px]">
              What you gain by switching.
            </h3>
            <ul className="mt-5 space-y-3">
              {c.verlyWins.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 font-sans text-[15px] leading-[1.65] text-[#1e293b]"
                >
                  <CheckCircle2
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#2b7a3d]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Recommendation */}
        <section className="mb-14 rounded-[26px] border border-[#e4e9f4] bg-white/92 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:p-10">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#60708d]">
            Which should you choose?
          </div>
          <h2 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[26px] leading-[1.2] tracking-[-0.025em] text-[#0f172a] md:text-[32px]">
            A plain-English recommendation.
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-8">
            <div>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c7c5c]">
                Stay with {c.name} if…
              </div>
              <p className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] leading-[1.6] text-[#3d3a33] md:text-[18px]">
                {c.recommendation.theirs}
              </p>
            </div>
            <div>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#315EEA]">
                Switch to Verly if…
              </div>
              <p className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] leading-[1.6] text-[#0f172a] md:text-[18px]">
                {c.recommendation.ours}
              </p>
            </div>
          </div>
        </section>

        {/* Migration teaser + final CTA */}
        <section className="rounded-[26px] border border-white/10 bg-[#0b0f1c] p-8 text-white md:p-12">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#9bf4c8]">
            Moving from {c.name}?
          </div>
          <h2 className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[26px] leading-[1.15] tracking-[-0.03em] text-white md:text-[34px]">
            {c.migrationTeaser}
          </h2>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-white/65 md:text-[17px]">
            We&rsquo;ll help you import macros, tags, knowledge sources, and
            conversation history. Most teams run both platforms side-by-side for
            a week, then switch — no big-bang cutover required.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[14px] font-semibold text-[#0f172a] transition-all hover:-translate-y-0.5 hover:bg-white/90"
            >
              Start free — agent live in 10 min
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
            >
              Book a 20-min demo
            </a>
          </div>
        </section>
      </div>

      <Footer hideCta />
      <StickyMobileCta />
    </main>
  );
}
