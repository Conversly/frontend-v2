"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Testimonial proof strip — asymmetric editorial layout.
 *
 * IMPORTANT: Do not ship fake quotes.
 * Replace `role` + `company` with real permissioned customer attributions,
 * or keep anonymised with a role + company-stage pattern. Update stats with
 * verified numbers.
 *
 * Layout:
 *   - One hero quote (~60% width) takes the spotlight
 *   - Two supporting quotes stack on the right (~40% width)
 *   - Industry accent colour encodes vertical: SaaS (blue), E-com (amber), Health (emerald)
 *   - Stats ribbon connects directly below, labelled as "from the teams above"
 */

type Accent = "blue" | "amber" | "emerald";

type Testimonial = {
  quote: string;
  role: string;
  company: string;
  industry: string;
  accent: Accent;
};

const hero: Testimonial = {
  quote:
    "We went from a 6-hour first response to under 4 minutes in our first week. The handoff to agents is clean — they see the full conversation, intent, and a suggested reply. It's the first AI product my team actually asked to keep.",
  role: "Head of Support",
  company: "Series-B SaaS · 40-person team",
  industry: "SaaS",
  accent: "blue",
};

const supporting: Testimonial[] = [
  {
    quote:
      "The thing I didn't believe until I saw it: Verly hands off only when it needs to. Our CSAT went up while deflection went to 78%.",
    role: "Customer Ops Lead",
    company: "E-commerce · 1.2M monthly orders",
    industry: "E-commerce",
    accent: "amber",
  },
  {
    quote:
      "Voice was the surprise. We installed it on a Monday and were answering inbound calls by Friday — in five languages.",
    role: "Founder",
    company: "Health-tech · Seed stage",
    industry: "Health-tech",
    accent: "emerald",
  },
];

const stats = [
  { value: "78%", label: "average ticket deflection" },
  { value: "< 4 min", label: "median first reply" },
  { value: "95+", label: "languages supported" },
  { value: "1 day", label: "typical time to live" },
];

const accentStyles: Record<
  Accent,
  {
    dot: string;
    rail: string;
    label: string;
    glow: string;
    border: string;
  }
> = {
  blue: {
    dot: "bg-[#7f95ff]",
    rail: "bg-[linear-gradient(180deg,#7f95ff,rgba(127,149,255,0))]",
    label: "text-[#9bb0ff]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(127,149,255,0.22),transparent_55%)]",
    border: "border-[#7f95ff]/25",
  },
  amber: {
    dot: "bg-[#f0c674]",
    rail: "bg-[linear-gradient(180deg,#f0c674,rgba(240,198,116,0))]",
    label: "text-[#f0c674]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(240,198,116,0.2),transparent_55%)]",
    border: "border-[#f0c674]/25",
  },
  emerald: {
    dot: "bg-[#8af0be]",
    rail: "bg-[linear-gradient(180deg,#8af0be,rgba(138,240,190,0))]",
    label: "text-[#8af0be]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(138,240,190,0.2),transparent_55%)]",
    border: "border-[#8af0be]/25",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function TestimonialStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonial-strip-title"
      className="relative overflow-hidden bg-[#070a15] py-20 text-white md:py-28"
    >
      {/* Ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(83,104,255,0.22),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(138,240,190,0.12),transparent_28%),radial-gradient(circle_at_60%_10%,rgba(240,198,116,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />
      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="relative mx-auto w-[95%] max-w-[1240px] md:w-[88%]">
        {/* Section header */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-[760px]"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-white/30" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              §05 · Real teams · Real outcomes
            </span>
          </div>
          <h2
            id="testimonial-strip-title"
            className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.04] tracking-[-0.035em] text-white md:text-[52px]"
          >
            Support leaders shipping{" "}
            <span className="italic text-white/55">10x</span> with the same
            headcount.
          </h2>
        </motion.div>

        {/* Asymmetric card grid */}
        <motion.div
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 md:mt-16 md:gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
        >
          {/* HERO quote */}
          <motion.figure
            variants={prefersReducedMotion ? undefined : fadeUp}
            className={`group relative flex flex-col overflow-hidden rounded-[28px] border ${accentStyles[hero.accent].border} bg-[#0c1222] p-8 md:p-12`}
          >
            {/* Accent glow */}
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 ${accentStyles[hero.accent].glow}`}
            />

            {/* Industry tag + oversized serif quote mark */}
            <div className="relative flex items-start justify-between gap-6">
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${accentStyles[hero.accent].dot}`}
                />
                <span
                  className={`font-sans text-[11px] font-bold uppercase tracking-[0.22em] ${accentStyles[hero.accent].label}`}
                >
                  {hero.industry}
                </span>
              </div>
              <span
                aria-hidden
                className="font-[Georgia,Times,'Times_New_Roman',serif] text-[110px] leading-[0.6] text-white/12 md:text-[150px]"
              >
                &ldquo;
              </span>
            </div>

            {/* Quote body */}
            <blockquote className="relative mt-2 flex-1 font-[Georgia,Times,'Times_New_Roman',serif] text-[22px] leading-[1.35] tracking-[-0.015em] text-white/92 md:text-[30px]">
              {hero.quote}
            </blockquote>

            {/* Attribution rail — vertical colored hairline + name */}
            <figcaption className="relative mt-10 flex items-stretch gap-4 border-t border-white/8 pt-6">
              <span
                aria-hidden
                className={`w-[3px] shrink-0 rounded-full ${accentStyles[hero.accent].rail}`}
              />
              <div className="flex flex-col">
                <span className="font-sans text-[15px] font-semibold text-white">
                  {hero.role}
                </span>
                <span className="mt-0.5 font-sans text-[13px] text-white/55">
                  {hero.company}
                </span>
              </div>
            </figcaption>
          </motion.figure>

          {/* SUPPORTING quotes */}
          <div className="flex flex-col gap-5 md:gap-6">
            {supporting.map((t) => (
              <motion.figure
                key={t.company}
                variants={prefersReducedMotion ? undefined : fadeUp}
                className={`group relative flex flex-1 flex-col overflow-hidden rounded-[26px] border ${accentStyles[t.accent].border} bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.05] md:p-8`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 ${accentStyles[t.accent].glow} opacity-60`}
                />

                <div className="relative flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${accentStyles[t.accent].dot}`}
                  />
                  <span
                    className={`font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${accentStyles[t.accent].label}`}
                  >
                    {t.industry}
                  </span>
                </div>

                <blockquote className="relative mt-4 flex-1 font-[Georgia,Times,'Times_New_Roman',serif] text-[16.5px] leading-[1.55] tracking-[-0.01em] text-white/85 md:text-[18px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="relative mt-6 flex items-stretch gap-3.5 border-t border-white/8 pt-4">
                  <span
                    aria-hidden
                    className={`w-[2px] shrink-0 rounded-full ${accentStyles[t.accent].rail}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-[13.5px] font-semibold text-white">
                      {t.role}
                    </span>
                    <span className="mt-0.5 font-sans text-[12px] text-white/55">
                      {t.company}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>

        {/* Connector ribbon + stats */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-14 md:mt-20"
        >
          {/* Connector label */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12)_15%,rgba(255,255,255,0.12)_85%,transparent)]" />
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              From the teams above
            </span>
            <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12)_15%,rgba(255,255,255,0.12)_85%,transparent)]" />
          </div>

          {/* Stats row */}
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative bg-[#070a15]/88 px-6 py-8 text-center md:px-8 md:py-10"
              >
                {/* Subtle top accent stripe */}
                <span
                  aria-hidden
                  className={`absolute inset-x-10 top-0 h-px ${i === 0 ? "bg-[#7f95ff]/60" : i === 1 ? "bg-[#f0c674]/50" : i === 2 ? "bg-[#8af0be]/50" : "bg-white/20"}`}
                />
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] font-semibold tracking-[-0.03em] text-white md:text-[40px]">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-sans text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/55">
                    {stat.label}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
