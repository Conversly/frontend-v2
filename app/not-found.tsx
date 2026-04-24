import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you’re looking for has moved or doesn’t exist. Head home, check the pricing, or read the Verly FAQ — we’ll get you where you’re going.",
  alternates: { canonical: "/404" },
  openGraph: {
    title: "Page not found — Verly",
    description:
      "The page you’re looking for has moved or doesn’t exist. Here’s where to go next on Verly.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-white text-[#19253b]">
      <Navbar />

      <section className="relative mx-auto flex w-full max-w-[960px] flex-col items-center px-6 pb-24 pt-28 text-center md:pt-36">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe5f7] bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5872a8] shadow-sm">
          404 · Page not found
        </div>

        <h1 className="mt-6 font-[Georgia,Times,'Times_New_Roman',serif] text-[44px] leading-[1.05] tracking-[-0.04em] text-[#0f172a] md:text-[64px]">
          This page ghosted us.
        </h1>

        <p className="mt-5 max-w-[560px] text-[17px] leading-8 text-[#5d6b8b] md:text-[19px]">
          The link you followed is broken, or the page has moved. Either way — here&rsquo;s where to go next.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#141923] px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1d2432]"
          >
            Go home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#d6d9e2] bg-white px-7 text-[14px] font-semibold text-[#0f172a] transition-all hover:-translate-y-0.5 hover:bg-[#f8fafc]"
          >
            See pricing
          </Link>
          <Link
            href="/faq"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#d6d9e2] bg-white px-7 text-[14px] font-semibold text-[#0f172a] transition-all hover:-translate-y-0.5 hover:bg-[#f8fafc]"
          >
            Read the FAQ
          </Link>
        </div>

        <p className="mt-10 max-w-[520px] text-[13px] text-[#8490ad]">
          If you landed here from a link on verlyai.xyz,{" "}
          <a href="mailto:team@verlyai.xyz" className="underline underline-offset-4 hover:text-[#0f172a]">
            tell us
          </a>{" "}
          and we&rsquo;ll fix it.
        </p>
      </section>

      <Footer hideCta />
    </main>
  );
}
