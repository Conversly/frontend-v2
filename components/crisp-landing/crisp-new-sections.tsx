"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Globe,
  Headphones,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";

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
   OMNICHANNEL PROOF — with richer card interiors
   ═══════════════════════════════════════════════════════════════════════ */

function WebChatMockup() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#c4d4f7]/60 bg-[#f4f7ff]">
      {/* Browser bar */}
      <div className="flex items-center gap-2 border-b border-[#c4d4f7]/40 bg-white/80 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff6058]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27ca40]" />
        </div>
        <div className="ml-2 flex items-center gap-1.5 rounded-md bg-[#eef2fa] px-3 py-1 text-[0.65rem] text-[#6e7da2]">
          <Globe className="h-3 w-3" /> yoursite.com
        </div>
      </div>
      {/* Chat messages */}
      <div className="space-y-2 p-4">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-[0.72rem] text-[#3d4a62] shadow-sm">
            Hi! How can I return my order?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-xl rounded-br-sm bg-[#315EEA] px-3 py-2 text-[0.72rem] text-white">
            I can help! Let me pull up your order details.
          </div>
        </div>
        <div className="flex items-center gap-1 text-[0.6rem] text-[#8b93ab]">
          <Bot className="h-3 w-3" /> AI · Instant reply
        </div>
      </div>
    </div>
  );
}

function WhatsAppMockup() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#bde8cd]/60 bg-[#e7f8ed]">
      {/* WA header */}
      <div className="flex items-center gap-2 border-b border-[#bde8cd]/40 bg-[#128C7E] px-4 py-2.5 text-white">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <Send className="h-3 w-3" />
        </div>
        <span className="text-[0.72rem] font-semibold">Verly Support</span>
        <span className="ml-auto text-[0.6rem] opacity-70">Online</span>
      </div>
      {/* Messages */}
      <div className="space-y-2 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Crect%20fill%3D%22%23e2f0e6%22%20width%3D%2232%22%20height%3D%2232%22/%3E%3C/svg%3E')] p-4">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-[0.72rem] text-[#3d4a62] shadow-sm">
            When does my subscription renew? 📅
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[0.72rem] text-[#2c3e28]">
            Your plan renews on March 15. Want to update it?
          </div>
        </div>
        <div className="flex items-center gap-1 text-[0.6rem] text-[#6d9a63]">
          <UserCheck className="h-3 w-3" /> Same AI brain, same knowledge
        </div>
      </div>
    </div>
  );
}

function VoiceMockup() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#d6c8f7]/60 bg-[#f5f0ff]">
      {/* Call header */}
      <div className="flex items-center justify-between border-b border-[#d6c8f7]/40 bg-[#7c3aed] px-4 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          <span className="text-[0.72rem] font-semibold">Voice AI Active</span>
        </div>
        <span className="flex items-center gap-1 text-[0.6rem] opacity-80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-300" /> 2:34
        </span>
      </div>
      {/* Transcript */}
      <div className="space-y-2.5 p-4">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ede4ff] text-[#7c3aed]">
            <span className="text-[0.5rem] font-bold">C</span>
          </div>
          <p className="text-[0.72rem] leading-snug text-[#3d4a62]">
            &quot;I need to reschedule my appointment for next week.&quot;
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white">
            <Bot className="h-3 w-3" />
          </div>
          <p className="text-[0.72rem] leading-snug text-[#3d4a62]">
            &quot;Of course! I see an opening on Tuesday at 2 PM. Shall I book that?&quot;
          </p>
        </div>
        <div className="flex items-center gap-1 text-[0.6rem] text-[#8a7cb8]">
          <Sparkles className="h-3 w-3" /> Natural voice · Context-aware
        </div>
      </div>
    </div>
  );
}

const channels = [
  {
    icon: MessageSquare,
    title: "Web Chat",
    description:
      "Embed a smart widget on your website. AI answers instantly, captures intent, and routes to humans when needed.",
    iconColor: "#3f63d8",
    iconBg: "#dde7ff",
    borderColor: "border-[#c4d4f7]",
    Mockup: WebChatMockup,
  },
  {
    icon: Bot,
    title: "WhatsApp",
    description:
      "Run support where customers already talk. Same AI brain, same routing, same escalation — on WhatsApp Business.",
    iconColor: "#2e9d63",
    iconBg: "#d8f5e3",
    borderColor: "border-[#bde8cd]",
    Mockup: WhatsAppMockup,
  },
  {
    icon: PhoneCall,
    title: "Voice",
    description:
      "Handle inbound calls with a natural voice AI agent. Route complex calls to humans with full context.",
    iconColor: "#7c3aed",
    iconBg: "#ede4ff",
    borderColor: "border-[#d6c8f7]",
    Mockup: VoiceMockup,
  },
];

export function OmnichannelSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_50%,#f7f4ee_100%)] py-20 text-[#1d1d1b] md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,145,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
            Omnichannel Support
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.02] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
            Three channels.
            <span className="block text-[#6e6558]">One support brain.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
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
              className={`group rounded-[28px] border ${ch.borderColor} bg-white p-7 shadow-[0_14px_36px_rgba(59,43,22,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(59,43,22,0.10)]`}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
                style={{ backgroundColor: ch.iconBg, color: ch.iconColor }}
              >
                <ch.icon className="h-6 w-6" />
              </div>
              <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-[#1e1c19]">
                {ch.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-[1.65] text-[#6d665d]">
                {ch.description}
              </p>
              <ch.Mockup />
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
                    Hi! I see the issue with the courier. I&apos;ve expedited it for you now. 😊
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
