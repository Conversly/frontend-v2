'use client';

import { motion } from "framer-motion";
import {
  AudioWaveform,
  Bot,
  BrainCircuit,
  Eye,
  Headphones,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Unplug,
  Workflow,
  Zap,
} from "lucide-react";

/* ─────────────────────────── Reveal wrapper ─────────────────────────── */

interface AboutSectionRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function AboutSectionReveal({
  children,
  delay = 0,
}: AboutSectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── Metric cards ─────────────────────────── */

const metricIconMap = {
  channels: Unplug,
  handoff: Headphones,
  setup: Zap,
  teams: ShieldCheck,
} as const;

const metricCardTheme = {
  channels: {
    accent: "from-[#eff6ff] via-[#f8fbff] to-white",
    border: "border-[#d9e7ff]",
    iconWrap: "bg-[#e7f0ff] text-[#2864dc]",
    chip: "Omnichannel live",
    chipTone: "bg-[#eff5ff] text-[#3d68d0]",
    footLabel: "Coverage",
  },
  handoff: {
    accent: "from-[#f4f1ff] via-[#faf8ff] to-white",
    border: "border-[#e4dbff]",
    iconWrap: "bg-[#efe8ff] text-[#6f4ed6]",
    chip: "Escalation built in",
    chipTone: "bg-[#f2edff] text-[#7255d9]",
    footLabel: "Handoff",
  },
  setup: {
    accent: "from-[#eefbf6] via-[#f8fdfb] to-white",
    border: "border-[#d6efe3]",
    iconWrap: "bg-[#e4f7ee] text-[#1f8b61]",
    chip: "Go live quickly",
    chipTone: "bg-[#ecfaf3] text-[#277f5d]",
    footLabel: "Launch speed",
  },
  teams: {
    accent: "from-[#fff5eb] via-[#fffaf4] to-white",
    border: "border-[#f0dfca]",
    iconWrap: "bg-[#fff0dd] text-[#c46a28]",
    chip: "Operator-first",
    chipTone: "bg-[#fff4e8] text-[#b6682c]",
    footLabel: "Audience",
  },
} as const;

export function AboutMetricCard({
  value,
  label,
  icon,
  delay = 0,
}: {
  value: string;
  label: string;
  icon: keyof typeof metricIconMap;
  delay?: number;
}) {
  const Icon = metricIconMap[icon];
  const theme = metricCardTheme[icon];

  return (
    <AboutSectionReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border bg-gradient-to-br px-6 py-6 text-left shadow-[0_16px_44px_rgba(59,43,22,0.05)] transition-all duration-300 hover:shadow-[0_28px_60px_rgba(59,43,22,0.10)] ${theme.accent} ${theme.border}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_34%)]" />
        <div className="pointer-events-none absolute -bottom-14 right-0 h-28 w-28 rounded-full bg-white/70 blur-3xl transition-transform duration-500 group-hover:scale-125" />

        <div className="relative flex items-start justify-between gap-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${theme.chipTone}`}
          >
            {theme.chip}
          </span>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-transform duration-300 group-hover:scale-105 ${theme.iconWrap}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="relative mt-10">
          <div className="font-[Georgia,serif] text-[2.4rem] leading-none tracking-[-0.05em] text-[#221f1b]">
            {value}
          </div>
          <p className="mt-3 max-w-[18rem] text-[0.97rem] leading-6 text-[#5f5a52]">{label}</p>
        </div>

        <div className="relative mt-8 flex items-center justify-between border-t border-black/5 pt-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#857d72]">
            {theme.footLabel}
          </span>
          <span className="text-[0.8rem] font-medium text-[#2f2a25]">Built into the core</span>
        </div>
      </motion.div>
    </AboutSectionReveal>
  );
}

/* ─────────────────────────── Hero Panel ─────────────────────────── */

export function AboutHeroPanel() {
  const channels = [
    {
      title: "Website",
      subtitle: "Instant answers and lead capture",
      icon: MessageSquare,
      tone: "bg-sky-500/10 text-sky-600",
    },
    {
      title: "Voice",
      subtitle: "Natural inbound call handling",
      icon: PhoneCall,
      tone: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "WhatsApp",
      subtitle: "Automation where customers already talk",
      icon: Bot,
      tone: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <AboutSectionReveal delay={0.15}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#e4ddd4] bg-white p-6 shadow-[0_24px_64px_rgba(59,43,22,0.06)] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(62,128,241,0.06),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.04),transparent_36%)]" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between rounded-[1.6rem] border border-[#e4ddd4] bg-[#faf8f6] px-6 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9189]">
                Unified support control
              </p>
              <h3 className="mt-0.5 text-[1.15rem] font-semibold text-[#1e1c19]">
                Verly Operator View
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/50 px-4 py-1.5 text-[11px] font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 + index * 0.08 }}
                className="rounded-[1.4rem] border border-[#e4ddd4] bg-[#faf8f6] p-5"
              >
                <div
                  className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${channel.tone}`}
                >
                  <channel.icon className="h-5 w-5" />
                </div>
                <h4 className="text-[1rem] font-semibold text-[#1e1c19]">
                  {channel.title}
                </h4>
                <p className="mt-1.5 text-[0.85rem] leading-5 text-[#6d665d]">
                  {channel.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Knowledge + outcomes row */}
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.4rem] border border-[#e4e8f3] bg-[#f8f9fd] p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eff3fe] text-[#4b6fe2]">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium text-[#31384f]">
                    Knowledge & behavior
                  </p>
                  <p className="text-[0.72rem] text-[#8b93ab]">
                    One operating model across channels
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  "Shared knowledge sources",
                  "Prompt and behavior controls",
                  "Human handoff when confidence drops",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#e8ebf4] bg-white px-3.5 py-2.5 text-[0.82rem] text-[#505a75]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#1e2538] bg-[#0f1424] p-4 text-white">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <AudioWaveform className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium">Operator outcomes</p>
                  <p className="text-[0.72rem] text-white/50">
                    Measurable support improvement
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { v: "Faster", d: "First responses and resolution." },
                  { v: "Clearer", d: "Shared prompts, topics, analytics." },
                  { v: "Safer", d: "More control than a chatbot widget." },
                ].map((o) => (
                  <div key={o.v}>
                    <div className="text-[1.35rem] font-semibold">{o.v}</div>
                    <p className="mt-0.5 text-[0.78rem] text-white/50">{o.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutSectionReveal>
  );
}

/* ──────────────── Fragmented Stack Visual (Problem section) ──────────────── */

const stackItems = [
  { label: "Chat widget", color: "from-[#4f9fc2] to-[#3b85ae]", icon: MessageSquare },
  { label: "WhatsApp tool", color: "from-[#42b97a] to-[#2e9d63]", icon: Bot },
  { label: "Phone system", color: "from-[#8b5cf6] to-[#7c3aed]", icon: PhoneCall },
  { label: "Human queue", color: "from-[#f59e0b] to-[#d97706]", icon: Headphones },
  { label: "Reporting", color: "from-[#ef4444] to-[#dc2626]", icon: AudioWaveform },
];

export function FragmentedStackVisual() {
  return (
    <AboutSectionReveal delay={0.1}>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/5 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.20)] backdrop-blur-sm md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

        <div className="relative">
          <div className="mb-5 text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              The fragmented stack
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {stackItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.07 }}
                className={`flex items-center gap-3 rounded-2xl bg-gradient-to-r ${item.color} px-4 py-3.5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-[0.92rem] font-semibold tracking-[-0.01em]">
                  {item.label}
                </span>
                <span className="ml-auto text-[0.72rem] font-medium text-white/60">
                  Disconnected
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center">
            <Unplug className="h-4 w-4 text-red-400/70" />
            <span className="text-[0.82rem] font-medium text-white/50">
              Five tools. No shared context. No unified view.
            </span>
          </div>
        </div>
      </div>
    </AboutSectionReveal>
  );
}

/* ──────────────── Unified System Visual (Why Verly Exists) ──────────────── */

export function UnifiedSystemVisual() {
  return (
    <AboutSectionReveal delay={0.1}>
      <div className="relative overflow-hidden rounded-[2rem] border border-[#d9e7dd] bg-[#f4fbf5] p-6 shadow-[0_14px_40px_rgba(60,130,80,0.06)] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5),transparent_55%)]" />

        <div className="relative">
          <div className="mb-6 text-center">
            <span className="inline-flex rounded-full border border-[#c8dece] bg-white/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4c8a3e]">
              The Verly approach
            </span>
          </div>

          {/* Center hub */}
          <div className="mx-auto mb-5 flex max-w-[320px] flex-col items-center rounded-2xl border border-[#c8dece] bg-white p-5 shadow-[0_12px_28px_rgba(60,130,80,0.08)]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f4e8] text-[#4c8a3e] shadow-sm">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="text-[1.05rem] font-semibold text-[#1e2538]">
                One knowledge core
              </div>
              <p className="mt-1 text-[0.78rem] text-[#6d768d]">
                Shared context, routing, and escalation logic
              </p>
            </div>
          </div>

          {/* Channels radiating out */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Web Chat", icon: MessageSquare, color: "text-sky-600 bg-sky-50 border-sky-100" },
              { label: "Voice", icon: PhoneCall, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
              { label: "WhatsApp", icon: Bot, color: "text-orange-600 bg-orange-50 border-orange-100" },
            ].map((ch) => (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 shadow-sm ${ch.color}`}
              >
                <ch.icon className="h-5 w-5" />
                <span className="text-[0.82rem] font-semibold">{ch.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center">
            <Sparkles className="h-4 w-4 text-[#4c8a3e]" />
            <span className="text-[0.82rem] font-medium text-[#4c8a3e]">
              One brain. Three channels. Full context everywhere.
            </span>
          </div>
        </div>
      </div>
    </AboutSectionReveal>
  );
}

/* ─────────────────────────── Pillars ─────────────────────────── */

const pillarIcons = {
  "brain-circuit": BrainCircuit,
  "shield-check": ShieldCheck,
  "workflow": Workflow,
  "eye": Eye,
} as const;

interface PillarItem {
  icon: keyof typeof pillarIcons;
  title: string;
  description: string;
}

const pillarAccents = [
  { icon: "text-[#346ae8]", number: "text-[#346ae8]/15", line: "bg-[#346ae8]" },
  { icon: "text-[#198a69]", number: "text-[#198a69]/15", line: "bg-[#198a69]" },
  { icon: "text-[#7b55df]", number: "text-[#7b55df]/15", line: "bg-[#7b55df]" },
  { icon: "text-[#c57722]", number: "text-[#c57722]/15", line: "bg-[#c57722]" },
] as const;

export function AboutPillars({ items }: { items: PillarItem[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[#e4ddd4] bg-[#e4ddd4] md:grid-cols-4">
      {items.map((item, index) => {
        const Icon = pillarIcons[item.icon];
        const accent = pillarAccents[index % pillarAccents.length];

        return (
          <AboutSectionReveal key={item.title} delay={index * 0.06}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
              transition={{ duration: 0.25 }}
              className="group relative flex h-full flex-col bg-[#faf8f6] px-6 py-6"
            >
              {/* Large watermark number */}
              <span
                className={`pointer-events-none absolute right-3 top-2 select-none font-[Georgia,serif] text-[5rem] font-bold leading-none tracking-[-0.06em] ${accent.number}`}
              >
                0{index + 1}
              </span>

              {/* Accent line */}
              <div className={`h-1 w-8 rounded-full ${accent.line} mb-5`} />

              {/* Icon */}
              <div className={`mb-4 ${accent.icon}`}>
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#1e1c19]">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.88rem] leading-6 text-[#6d665d]">
                {item.description}
              </p>
            </motion.div>
          </AboutSectionReveal>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── Founder Note ─────────────────────────── */

export function FounderNote() {
  return (
    <AboutSectionReveal delay={0.1}>
      <div className="mx-auto max-w-[760px] rounded-[2.5rem] border border-[#e4ddd4] bg-white px-10 py-12 shadow-[0_16px_48px_rgba(59,43,22,0.05)] md:px-14">
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e1c19] text-white shadow-lg">
            <span className="font-[Georgia,serif] text-[1.4rem] font-bold">R</span>
          </div>
          <div>
            <div className="text-[1.1rem] font-semibold text-[#1e1c19]">
              Raghvendra Dhakar
            </div>
            <p className="text-[0.88rem] text-[#8a8279]">
              Founder, Verly
            </p>
          </div>
        </div>

        <blockquote className="space-y-6 font-[Georgia,serif] text-[1.1rem] leading-[1.75] text-[#3d3832] sm:text-[1.25rem]">
          <p>
            Every founder I&rsquo;ve talked to has had the same month: 50 new
            customers, one support inbox on fire, and a choice between hiring
            three agents they can&rsquo;t afford or letting CSAT fall off a
            cliff.
          </p>
          <p>
            Existing tools aren&rsquo;t built for that moment. They&rsquo;re
            built for the company you&rsquo;ll be in three years, not the one
            you are today. They charge per seat. They take weeks to configure.
            They lock your customer data inside their bot and never give it
            back.
          </p>
          <p>
            Verly is the opposite. Live in a day. One line of JavaScript for
            web chat. One number for voice. One WhatsApp integration. Every
            conversation is yours — exportable, auditable, owned by you. The
            AI answers what it can, and hands the rest to your team with the
            full context attached.
          </p>
          <p>
            If that&rsquo;s what you&rsquo;ve been looking for, we&rsquo;d
            love to show you what we&rsquo;ve built.
          </p>
        </blockquote>

        <div className="mt-8 flex items-center gap-2 text-[0.85rem] text-[#9a9189]">
          <Sparkles className="h-4 w-4 text-[#c57f1e]" />
          <span>Hit reply to any email — I read them all.</span>
        </div>
      </div>
    </AboutSectionReveal>
  );
}

/* ─────────────────────────── Feature Card (kept for reuse) ─────────────────────────── */

const featureIcons = {
  "message-square": MessageSquare,
  "phone-call": PhoneCall,
  "bot": Bot,
} as const;

interface AboutFeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof featureIcons;
  delay?: number;
}

export function AboutFeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: AboutFeatureCardProps) {
  const Icon = featureIcons[icon];

  return (
    <AboutSectionReveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group flex h-full flex-col rounded-[2rem] border border-[#e4e7ef] bg-[#ececf1] px-7 py-10 text-center shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-[#d6ddf2] hover:bg-[#eef1f8] hover:shadow-[0_14px_32px_rgba(8,15,34,0.05)]"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f8f8fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_6px_18px_rgba(9,18,35,0.05)] transition-all duration-300 group-hover:scale-[1.03]">
          <Icon className="h-9 w-9 text-[#4b6fe2] transition-colors duration-300" />
        </div>
        <h3 className="font-title-bold mt-7 text-[2rem] tracking-[-0.05em] text-[#071224] transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-4 flex-1 text-[1rem] leading-8 text-[#64708a] transition-colors duration-300">
          {description}
        </p>
      </motion.div>
    </AboutSectionReveal>
  );
}
