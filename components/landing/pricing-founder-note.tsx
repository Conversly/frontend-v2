"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight, CalendarClock } from "lucide-react";
import { pricingFaqs } from "@/lib/pricing-faqs";

/* ─────────────────────────── Data ─────────────────────────── */

const principleHighlights = [
  {
    title: "Pay for resolution.",
    detail: "Not agent seats, not logins, not licences.",
  },
  {
    title: "Invite the whole team free.",
    detail: "Every admin, agent, and viewer. Always.",
  },
  {
    title: "Cancel in one click.",
    detail: "No retention call. Data deleted in 30 days.",
  },
];

/* ──────────────────────── Motion presets ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────────────────── Section ─────────────────────────── */

export default function PricingFounderNote() {
  return (
    <section
      id="pricing-founder-note"
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="pricing-founder-note-title"
    >
      {/* Ambient background — warm cream with a soft directional glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fbf8f1_0%,#f6f1e6_50%,#faf7f0_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-[26rem] w-[26rem] rounded-full bg-[#e4eaf8] opacity-70 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-[-4rem] h-[22rem] w-[22rem] rounded-full bg-[#f2e7d0] opacity-80 blur-[120px]" />

      {/* Paper grain — cheap SVG turbulence noise, blended low */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      <div className="relative mx-auto w-[95%] max-w-[1200px] md:w-[88%]">
        <FounderLetter />
        <div className="mt-20 md:mt-28">
          <PricingFaq />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Letter ─────────────────────────── */

function FounderLetter() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : stagger}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14"
    >
      {/* Letter */}
      <motion.article
        variants={prefersReducedMotion ? undefined : fadeUp}
        className="relative"
      >
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-[#9f917a]" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a6d55]">
            From the founder
          </span>
        </div>

        {/* Headline */}
        <h2
          id="pricing-founder-note-title"
          className="max-w-[18ch] font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.05] tracking-[-0.035em] text-[#201c15] md:text-[48px]"
        >
          Why we price Verly the way we do.
        </h2>

        {/* Letter body */}
        <div className="mt-8 max-w-[58ch] space-y-6 font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] leading-[1.8] text-[#3d3a33] md:text-[19px] md:leading-[1.85]">
          <p>
            Most support tools charge per agent seat. Which means the moment
            you grow the team that&rsquo;s actually helping your customers,
            your software bill grows with them. It punishes the one thing you
            should be celebrating. We think that&rsquo;s backwards.
          </p>

          <p>
            Verly charges for what it resolves — every conversation the AI
            actually handles end-to-end. Your whole team joins free, as many
            seats as you need. Messages reset monthly, and if you ever hit the
            cap we pause overage instead of surprising you with an invoice.
          </p>

          <p>
            If Verly isn&rsquo;t paying for itself by month two, cancel. One
            click, no retention call, and we delete your data within thirty
            days. That&rsquo;s the whole deal.
          </p>
        </div>

        {/* Signature block */}
        <div className="mt-12">
          <SignatureMark />
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-[#1c1a14]">
              Raghvendra Dhakar
            </span>
            <span className="font-sans text-[13px] text-[#7a7062]">
              Founder, Verly
            </span>
          </div>
          <a
            href="mailto:team@verlyai.xyz"
            className="mt-3 inline-flex items-center gap-2 font-sans text-[13px] text-[#5b6f9a] underline decoration-[#bcc6de] decoration-1 underline-offset-[5px] transition-colors hover:text-[#2b3a5c] hover:decoration-[#5b6f9a]"
          >
            Hit reply to any email — I read them all.
          </a>
        </div>
      </motion.article>

      {/* Sidebar: a pulled-out note card pinned to the letter */}
      <motion.aside
        variants={prefersReducedMotion ? undefined : fadeUp}
        className="relative flex"
      >
        <div className="relative flex w-full flex-col">
          {/* Tape strip */}
          <div
            aria-hidden
            className="absolute -top-3 left-10 h-6 w-24 rotate-[-4deg] rounded-[2px] bg-[#e8dcc2]/80 shadow-[0_2px_6px_rgba(92,72,36,0.14)]"
          />
          <div
            aria-hidden
            className="absolute -top-2 left-12 h-[2px] w-20 rotate-[-4deg] bg-[#d6c7a7]"
          />

          <div className="relative flex-1 rounded-[22px] border border-[#e9dfc9] bg-[#fffdf8] p-7 shadow-[0_18px_46px_-14px_rgba(76,58,24,0.18),0_4px_14px_-6px_rgba(76,58,24,0.12)] md:p-9">
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#8c7c5c]">
              The principles
            </div>
            <h3 className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[24px] leading-[1.15] tracking-[-0.02em] text-[#1c1a14] md:text-[27px]">
              Pricing written by a founder, not a finance team.
            </h3>

            <ul className="mt-6 space-y-5">
              {principleHighlights.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-[6px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d9cba7] bg-[#f7eed5] font-sans text-[10px] font-bold text-[#7a6432]">
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] font-semibold leading-[1.3] text-[#1c1a14]">
                      {item.title}
                    </div>
                    <p className="mt-1 font-sans text-[13.5px] leading-6 text-[#6a624f]">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA pair */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#14171f] px-6 text-[14px] font-semibold text-[#fbf8f1] shadow-[0_10px_24px_-8px_rgba(20,23,31,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#1f2430] hover:shadow-[0_14px_32px_-10px_rgba(20,23,31,0.55)]"
              >
                Start free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d9cba7] bg-transparent px-6 text-[14px] font-semibold text-[#3d3a33] transition-all hover:-translate-y-0.5 hover:border-[#bfae87] hover:bg-[#fffdf8]"
              >
                <CalendarClock className="h-4 w-4" />
                Book a 20-min demo
              </a>
            </div>

            <p className="mt-5 font-sans text-[12px] leading-5 text-[#8a8167]">
              Free forever plan. No credit card. Cancel in one click.
            </p>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* ───────────────────── Signature (SVG, drawn on) ───────────────────── */

function SignatureMark() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative inline-block">
      <motion.svg
        viewBox="0 0 280 74"
        width="220"
        height="58"
        fill="none"
        aria-label="Raghvendra Dhakar’s signature"
        role="img"
        className="text-[#1c1a14]"
      >
        <motion.path
          d="M6 50 C 14 20, 22 22, 28 46 C 34 30, 42 24, 48 42 C 54 30, 60 36, 54 52 M 62 44 C 70 24, 80 28, 82 48 C 96 28, 108 28, 108 50 M 116 32 C 122 28, 130 26, 136 32 C 140 38, 138 46, 130 48 C 124 50, 120 46, 122 40 C 128 28, 138 30, 148 52 M 158 24 C 156 40, 156 48, 158 54 M 154 36 C 166 28, 178 30, 180 42 C 178 52, 170 54, 164 48 M 190 44 C 196 30, 206 30, 208 46 C 210 52, 206 58, 200 52 M 222 26 C 218 40, 220 50, 226 54 M 216 40 C 226 32, 238 32, 244 44 C 248 54, 242 58, 234 52 M 254 40 C 262 28, 270 30, 268 48"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.35 }}
          whileInView={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.svg>
      {/* Soft under-stroke to hint at ink bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-1 h-[2px] w-[70%] rounded-full bg-[#1c1a14]/10 blur-[2px]"
      />
    </div>
  );
}

/* ─────────────────────────── FAQ ─────────────────────────── */

function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20">
      {/* Header column */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-[#9f917a]" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a6d55]">
            §02 · Pricing FAQ
          </span>
        </div>
        <h3 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.08] tracking-[-0.032em] text-[#201c15] md:text-[40px]">
          The questions you&rsquo;re about to ask.
        </h3>
        <p className="mt-5 max-w-[38ch] font-sans text-[15.5px] leading-[1.75] text-[#5b5346] md:text-[16px]">
          Six things teams always want to know before they hand us their
          support queue. If something isn&rsquo;t here, email us — we answer
          everything, usually inside an hour.
        </p>
      </motion.div>

      {/* FAQ list */}
      <ol className="divide-y divide-[#e4dac2]/90 border-y border-[#e4dac2]/90">
        {pricingFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const numberLabel = String(index + 1).padStart(2, "0");

          return (
            <li key={faq.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`pricing-faq-answer-${index}`}
                className="group flex w-full items-start gap-5 py-6 text-left transition-colors hover:bg-[#f7f1e1]/40 md:gap-8 md:py-7"
              >
                <span
                  aria-hidden
                  className="mt-[4px] shrink-0 font-[Georgia,Times,'Times_New_Roman',serif] text-[14px] tracking-[0.08em] text-[#a5957a]"
                >
                  {numberLabel}
                </span>
                <span className="flex-1 font-[Georgia,Times,'Times_New_Roman',serif] text-[18px] leading-[1.35] tracking-[-0.015em] text-[#201c15] transition-colors group-hover:text-[#0f0e0a] md:text-[21px]">
                  {faq.q}
                </span>
                <span
                  aria-hidden
                  className={`mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "border-[#14171f] bg-[#14171f] text-[#fbf8f1]"
                      : "border-[#d9cba7] bg-[#fffdf8] text-[#3d3a33] group-hover:border-[#bfae87] group-hover:shadow-[0_4px_12px_-6px_rgba(76,58,24,0.25)]"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <motion.div
                id={`pricing-faq-answer-${index}`}
                initial={false}
                animate={
                  isOpen
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-[auto_1fr] gap-5 pb-7 md:gap-8">
                  <span aria-hidden className="w-[14px] md:w-[20px]" />
                  <p className="max-w-[62ch] font-sans text-[15px] leading-[1.75] text-[#4a4538] md:text-[16px]">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
