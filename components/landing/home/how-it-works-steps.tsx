"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Link2, Sparkles, Rocket } from "lucide-react";
import Link from "next/link";

type Step = {
  n: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Link2;
  accent: string;
  iconColor: string;
};

const steps: Step[] = [
  {
    n: "01",
    eyebrow: "Connect",
    title: "Paste your site URL or drop your docs.",
    description:
      "Verly crawls your knowledge base, docs, and FAQs in minutes. Notion, Confluence, PDF, or a live URL — take your pick.",
    icon: Link2,
    accent: "from-[#e4eaf8] to-[#f7f1e1]",
    iconColor: "text-[#315EEA]",
  },
  {
    n: "02",
    eyebrow: "Train",
    title: "Verly learns your business and your tone.",
    description:
      "No prompt engineering required. The agent indexes your content, maps to common intents, and flags anything unclear before you go live.",
    icon: Sparkles,
    accent: "from-[#f2e7d0] to-[#eef3ff]",
    iconColor: "text-[#c57f1e]",
  },
  {
    n: "03",
    eyebrow: "Deploy",
    title: "Drop the widget, connect a number, or link WhatsApp.",
    description:
      "One line of JavaScript for web chat. A phone number takes 10 minutes. WhatsApp Business takes an hour. Your agent is live before lunch.",
    icon: Rocket,
    accent: "from-[#dfecf7] to-[#faf4ea]",
    iconColor: "text-[#2b7a3d]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Ambient gradient + grain */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_40%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-32 h-[24rem] w-[24rem] rounded-full bg-[#dfecff] opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-[22rem] w-[22rem] rounded-full bg-[#f2e7d0] opacity-50 blur-[120px]" />

      <div className="relative mx-auto w-[95%] max-w-[1200px] md:w-[88%]">
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-[720px]"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#9f917a]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#60708d]">
              How it works · 3 steps · ~10 minutes
            </span>
          </div>
          <h2
            id="how-it-works-title"
            className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.05] tracking-[-0.035em] text-[#0f172a] md:text-[48px]"
          >
            From website URL to live support agent — before lunch.
          </h2>
          <p className="mt-5 max-w-[560px] font-sans text-[16px] leading-[1.7] text-[#5b6b89] md:text-[18px]">
            Most support tools take a quarter to roll out. Verly takes a coffee break. Here&rsquo;s the whole thing, start to finish.
          </p>
        </motion.div>

        <motion.ol
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {/* Connector line — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[92px] hidden h-px bg-[linear-gradient(90deg,transparent,#cfd7e6_20%,#cfd7e6_80%,transparent)] lg:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.n}
                variants={prefersReducedMotion ? undefined : fadeUp}
                className="relative"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e4e9f4] bg-white/92 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-transform hover:-translate-y-1 md:p-8">
                  {/* Accent gradient top strip */}
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${step.accent}`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-[Georgia,Times,'Times_New_Roman',serif] text-[40px] leading-none tracking-[-0.04em] text-[#cfd7e6]">
                      {step.n}
                    </span>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] ring-1 ring-[#e4e9f4] ${step.iconColor}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-6 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#60708d]">
                    {step.eyebrow}
                  </div>
                  <h3 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[22px] leading-[1.18] tracking-[-0.02em] text-[#0f172a] md:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-sans text-[15px] leading-[1.7] text-[#5b6b89]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href="/login"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#141923] px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1d2432] hover:shadow-[0_18px_40px_rgba(20,25,35,0.24)]"
          >
            Start free — agent live in 10 min
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-[#315EEA] hover:text-[#1d45c8]"
          >
            Read the setup guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
