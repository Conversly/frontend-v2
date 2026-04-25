import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import { siteConfig } from "@/lib/metadata";
import { changelog, type ChangelogTag } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog — What's new in Verly",
  description:
    "Week-by-week product updates from the Verly team — new features, improvements, fixes, and security notes. A running log of what we've shipped.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "Changelog — What's new in Verly",
    description:
      "Week-by-week product updates from the Verly team. New features, improvements, fixes, and security notes.",
    url: `${siteConfig.url}/changelog`,
    type: "website",
  },
  twitter: {
    title: "Changelog — What's new in Verly",
    description:
      "Week-by-week product updates from the Verly team. See what we shipped this week.",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Changelog", path: "/changelog" },
]);

const tagStyles: Record<ChangelogTag, { label: string; className: string }> = {
  feature: {
    label: "Feature",
    className: "bg-[#eef3ff] text-[#315EEA] border-[#cfd9f3]",
  },
  improvement: {
    label: "Improvement",
    className: "bg-[#e4f5ec] text-[#2b7a3d] border-[#c5e3d0]",
  },
  fix: {
    label: "Fix",
    className: "bg-[#fff1e6] text-[#a75c24] border-[#efd6b5]",
  },
  security: {
    label: "Security",
    className: "bg-[#f0ecff] text-[#5b41b9] border-[#d9cdf0]",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
  const [latest, ...rest] = changelog;

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_36%,#ffffff_100%)] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <div className="relative mx-auto w-[95%] max-w-[960px] pb-24 pt-32 md:pt-40">
        {/* Hero */}
        <header className="mb-14 max-w-[680px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbe5f7] bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5872a8] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Last update · {formatDate(latest.date)}
          </div>
          <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[40px] leading-[1.05] tracking-[-0.04em] text-[#0f172a] md:text-[56px]">
            What&rsquo;s new in Verly.
          </h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-[#5d6b8b] md:text-[18px]">
            A running log of what we shipped, what we fixed, and what we
            learned. We ship every week.
          </p>
        </header>

        {/* Latest — highlighted */}
        <article className="mb-12 rounded-[26px] border border-[#e4e9f4] bg-white/95 p-8 shadow-[0_14px_36px_rgba(15,23,42,0.06)] md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#60708d]">
            <span className="font-sans font-bold uppercase tracking-[0.2em]">
              {latest.version ?? "Latest"}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={latest.date}>{formatDate(latest.date)}</time>
          </div>
          <h2 className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[28px] leading-[1.15] tracking-[-0.025em] text-[#0f172a] md:text-[34px]">
            {latest.title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#3d495f] md:text-[17px]">
            {latest.summary}
          </p>
          <ul className="mt-7 space-y-3">
            {latest.bullets.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-[22px] shrink-0 items-center rounded-full border px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] ${tagStyles[b.tag].className}`}
                >
                  {tagStyles[b.tag].label}
                </span>
                <span className="font-sans text-[15px] leading-[1.65] text-[#0f172a]">
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* Earlier entries */}
        <section aria-label="Earlier updates" className="relative">
          <div
            aria-hidden
            className="absolute bottom-6 left-[15px] top-6 hidden w-px bg-[linear-gradient(180deg,#e4e9f4,transparent)] md:block"
          />

          <ul className="space-y-10 md:space-y-12">
            {rest.map((entry) => (
              <li key={entry.date} className="relative md:pl-12">
                <span
                  aria-hidden
                  className="absolute left-[9px] top-2 hidden h-3 w-3 rounded-full border-2 border-white bg-[#cfd7e6] shadow-[0_0_0_3px_#e4e9f4] md:block"
                />
                <article>
                  <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#60708d]">
                    <span className="font-sans font-bold uppercase tracking-[0.2em]">
                      {entry.version ?? "Release"}
                    </span>
                    <span aria-hidden>·</span>
                    <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  </div>
                  <h3 className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[22px] leading-[1.2] tracking-[-0.02em] text-[#0f172a] md:text-[25px]">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#5d6b8b] md:text-[16px]">
                    {entry.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {entry.bullets.map((b) => (
                      <li key={b.text} className="flex items-start gap-3">
                        <span
                          className={`mt-[3px] inline-flex h-[20px] shrink-0 items-center rounded-full border px-2 text-[10px] font-bold uppercase tracking-[0.12em] ${tagStyles[b.tag].className}`}
                        >
                          {tagStyles[b.tag].label}
                        </span>
                        <span className="font-sans text-[14.5px] leading-[1.65] text-[#334155]">
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Final nudge */}
        <aside className="mt-16 rounded-[26px] border border-[#e4e9f4] bg-[#0b0f1c] p-8 text-white md:p-10">
          <div className="max-w-[620px]">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#9bf4c8]">
              Ship with us
            </div>
            <h2 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[24px] leading-[1.2] tracking-[-0.025em] text-white md:text-[28px]">
              New features every week — yours to try before they hit the docs.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </aside>
      </div>

      <Footer hideCta />
      <StickyMobileCta />
    </main>
  );
}
