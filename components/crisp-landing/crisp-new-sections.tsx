"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Headphones,
  MessageCircle,
  MessageSquare,
  Mic,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  VoiceAgentVisual,
  WhatsAppVisual,
  WebsiteWidgetVisual,
} from "@/components/landing/cards/FeatureVisuals";

/* ═══════════════════════════════════════════════════════════════════════
   WHY SWITCH — Problem section
   ═══════════════════════════════════════════════════════════════════════ */

const beforeStack = [
  { label: "Separate chat widget", pain: "No shared context" },
  { label: "Standalone WhatsApp tool", pain: "Duplicate knowledge base" },
  { label: "Legacy phone system", pain: "No AI, no routing" },
  { label: "Manual escalation queue", pain: "Context lost every handoff" },
  { label: "Isolated reporting tool", pain: "No cross-channel insight" },
];

export function WhySwitchSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_50%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,145,201,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#315EEA] shadow-[0_10px_30px_rgba(49,94,234,0.06)] backdrop-blur-sm">
            <Zap className="h-4 w-4" />
            Why Switch
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.02] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
            Replace the stack,
            <span className="block text-[#6e6558]">not just one tool.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            Most teams use five disconnected tools to handle support. Verly replaces all of
            them with one platform — shared knowledge, shared routing, shared analytics.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-[#e8ddd5] bg-[linear-gradient(180deg,#fdf8f4_0%,#f9f3ef_100%)] p-7 md:p-9"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-sm">
                <span className="text-[1.2rem] font-bold">✕</span>
              </div>
              <div>
                <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#9a7e64]">
                  Before Verly
                </div>
                <div className="text-[1.1rem] font-semibold text-[#2c2f30]">
                  Fragmented support stack
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {beforeStack.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-2xl border border-[#e8ddd5] bg-white/90 px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <span className="text-[0.92rem] font-medium text-[#3d4a62]">
                    {item.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-[0.72rem] font-semibold text-red-500">
                    {item.pain}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Summary stat */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/60 px-5 py-3.5">
              <span className="text-[1.6rem] font-bold leading-none text-red-500">5+</span>
              <span className="text-[0.82rem] font-medium leading-snug text-red-700/70">
                tools to manage,<br />no single source of truth
              </span>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-[#c8dece] bg-[linear-gradient(180deg,#f4fbf5_0%,#eef8ef_100%)] p-7 md:p-9"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#4c8a3e]">
                  With Verly
                </div>
                <div className="text-[1.1rem] font-semibold text-[#2c2f30]">
                  One unified platform
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Web chat, voice, WhatsApp", tag: "3 channels, one inbox" },
                { label: "Shared AI knowledge layer", tag: "One source of truth" },
                { label: "Smart routing & escalation", tag: "Context-aware handoff" },
                { label: "Built-in human handoff", tag: "Full conversation context" },
                { label: "Unified analytics", tag: "Cross-channel insights" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-2xl border border-[#c8dece] bg-white/90 px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <span className="text-[0.92rem] font-medium text-[#3d4a62]">
                    {item.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[0.72rem] font-semibold text-emerald-600">
                    {item.tag}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Summary stat */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-3.5">
              <span className="text-[1.6rem] font-bold leading-none text-emerald-600">1</span>
              <span className="text-[0.82rem] font-medium leading-snug text-emerald-700/70">
                platform for everything,<br />deployed in minutes
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   OMNICHANNEL PROOF — adapted from previous landing cards
   ═══════════════════════════════════════════════════════════════════════ */

const channels = [
  {
    icon: MessageSquare,
    title: "Website Chat",
    description:
      "Create your AI chatbot for your website — engage visitors 24/7, answer questions instantly, and convert browsers into customers automatically.",
    iconClassName: "text-purple-600",
    badgeClassName: "bg-purple-500/10 border-purple-500/20",
    visual: <WebsiteWidgetVisual />,
    href: "/features",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp AI",
    description:
      "Meet customers on their favorite app — automate conversations, confirm bookings, and close deals on WhatsApp at scale.",
    iconClassName: "text-emerald-600",
    badgeClassName: "bg-emerald-500/10 border-emerald-500/20",
    visual: <WhatsAppVisual />,
    href: "/features",
  },
  {
    icon: Mic,
    title: "Voice AI",
    description:
      "Answer every call instantly with natural AI voices — qualify leads, book appointments, and provide support without hiring more staff.",
    iconClassName: "text-blue-600",
    badgeClassName: "bg-blue-500/10 border-blue-500/20",
    visual: <VoiceAgentVisual />,
    href: "https://verlyai.xyz/features",
  },
];

export function OmnichannelSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pb-10 pt-20 text-slate-900 md:pb-12 md:pt-24 lg:pb-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,145,201,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute right-[6%] top-[8%] h-[320px] w-[320px] rounded-full bg-blue-300/10 blur-[90px]" />
        <div className="absolute bottom-[0%] left-[4%] h-[360px] w-[360px] rounded-full bg-indigo-300/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#315EEA] shadow-[0_10px_30px_rgba(49,94,234,0.06)] backdrop-blur-sm">
            <Headphones className="h-4 w-4" />
            Omnichannel Support
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.02] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
            Three channels.
            <span className="block text-[#6e6558]">One support brain.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            Customers pick the channel they prefer. Verly handles them equally — same knowledge,
            same routing, same analytics.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:shadow-[0_26px_60px_rgba(37,99,235,0.12)]"
            >
              <div className="relative h-60 shrink-0 overflow-hidden border-b border-slate-200/70 bg-slate-50">
                {ch.visual}
                {/* Live indicator */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 py-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${ch.badgeClassName} ${ch.iconClassName}`}
                  >
                    <ch.icon className="h-[18px] w-[18px]" />
                  </div>
                  <h3 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[1.15rem] tracking-[-0.02em] text-[#221f1b]">
                    {ch.title}
                  </h3>
                </div>

                <p className="mt-4 flex-1 text-[0.92rem] leading-7 text-[#6d665d]">
                  {ch.description}
                </p>

                {/* CTA link */}
                <Link
                  href={ch.href}
                  className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-[#315EEA] transition-colors hover:text-[#1d47c4]"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HUMAN HANDOFF
   ═══════════════════════════════════════════════════════════════════════ */

export function HandoffSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_50%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,123,247,0.08),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[580px]"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#315EEA] shadow-[0_10px_30px_rgba(49,94,234,0.06)] backdrop-blur-sm">
              <Headphones className="h-4 w-4" />
              Human Handoff
            </div>

            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.02] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
              When AI hits a wall,
              <span className="block text-[#6e6558]">humans step in.</span>
            </h2>

            <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              Escalation is not an afterthought. Verly detects frustration, complexity, and low
              confidence in real time — then hands the conversation to a human agent with the full
              context, summary, and recommended next step.
            </p>

            <div className="mt-9 space-y-5">
              {[
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: "Sentiment-triggered escalation",
                  description:
                    "AI detects when a customer is frustrated or explicitly asks to speak with a person.",
                },
                {
                  icon: <ArrowRight className="h-5 w-5" />,
                  title: "Full conversation context transfer",
                  description:
                    "The human agent sees everything — full history, detected intent, and suggested action.",
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "Zero-wait handoffs",
                  description:
                    "Routing happens instantly. No queue, no repeat, no context loss.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.95rem] font-semibold text-[#2c2f30]">
                      {item.title}
                    </div>
                    <p className="mt-1 text-[0.85rem] leading-6 text-[#6d665d]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — mini chat simulation */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[420px]"
          >
            <div className="overflow-hidden rounded-[28px] border border-[#e4e8f3] bg-white shadow-[0_28px_60px_rgba(8,15,34,0.10)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e4e8f3] bg-[#f8f9fd] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#315EEA] text-white shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[0.9rem] font-semibold text-[#1e2538]">Verly Assistant</div>
                    <div className="flex items-center gap-1.5 text-[0.7rem] text-[#8b93ab]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-[#e4e8f3] bg-white px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-[#8b93ab]">
                  Live
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3.5 bg-[#fafbfe] p-5">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#e8ebf4] px-4 py-3 text-[0.85rem] text-[#3d4a62]">
                    I&apos;m having trouble with my recent order. It hasn&apos;t arrived yet.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#315EEA] px-4 py-3 text-[0.85rem] text-white shadow-sm">
                    Let me check that… I see a delay with the courier. I can share tracking details.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#e8ebf4] px-4 py-3 text-[0.85rem] text-[#3d4a62]">
                    Can I speak to a real person?
                  </div>
                </div>

                {/* Escalation indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-amber-700 shadow-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    Escalating to human agent…
                  </div>
                </motion.div>

                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm border-2 border-emerald-200 bg-white px-4 py-3 text-[0.85rem] text-[#3d4a62] shadow-sm">
                    <div className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-semibold text-emerald-600">
                      <UserCheck className="h-3 w-3" /> Sarah · Human Agent
                    </div>
                    Hi! I see the issue with the courier. I&apos;ve expedited it for you now.
                  </div>
                </div>
              </div>

              {/* Input mock */}
              <div className="border-t border-[#e4e8f3] bg-white px-4 py-3.5">
                <div className="flex h-10 items-center justify-between rounded-full border border-[#e4e8f3] bg-[#f8f9fd] px-4">
                  <span className="text-[0.82rem] text-[#8b93ab]">Message…</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#315EEA] text-white shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar below chat */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { val: "<1s", label: "handoff time" },
                { val: "100%", label: "context kept" },
                { val: "0", label: "repeats needed" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#e4e8f3] bg-white px-3 py-3 text-center shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                >
                  <div className="text-[1rem] font-bold text-[#315EEA]">{s.val}</div>
                  <div className="text-[0.6rem] font-medium uppercase tracking-wider text-[#8b93ab]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
