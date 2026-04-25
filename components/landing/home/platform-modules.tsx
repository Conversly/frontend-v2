"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenText,
  Bot,
  ChartColumnBig,
  Inbox,
  MessageSquareText,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const ROTATION_INTERVAL = 6000;

const modules = [
  {
    id: "ai-helpdesk",
    title: "AI Helpdesk",
    eyebrow: "Automation core",
    description: "Resolve 7 in 10 tickets before anyone on your team opens them.",
    summary:
      "The AI triages, drafts a contextual reply, checks policy, and pings a human only when judgment is needed. Every escalation arrives with a summary, detected intent, and suggested reply — so agents spend minutes, not hours, per ticket.",
    icon: Bot,
    iconClass: "bg-[#e6ddff] text-[#6a45db]",
    previewLabel: "AI Helpdesk",
    previewTitle: "Support that runs while you sleep",
    previewDescription:
      "AI classifies, drafts, and resolves — your team steps in only when it matters.",
    metrics: [
      { value: "72%", label: "auto-resolved" },
      { value: "4.8m", label: "avg first reply" },
      { value: "100%", label: "context preserved" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[1.15fr_0.85fr]">
        <ModuleCard>
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-4">
              <SectionTitle
                eyebrow="AI inbox assistant"
                title="Suggested next actions"
                description="Reviews conversation, policy context, and customer status before proposing the next move."
              />
              <StatusChip tone="blue">Live</StatusChip>
            </div>

            <div className="mt-auto pt-5 grid gap-3">
              {[
                ["Refund request", "Matched to returns policy — auto-approved under $50"],
                ["Billing dispute", "Escalated to finance with AI-generated summary"],
                ["VIP account", "Priority queue + manager notified in Slack"],
              ].map(([title, detail]) => (
                <DetailRow key={title} title={title} detail={detail} />
              ))}
            </div>
          </div>
        </ModuleCard>

        <div className="flex h-full flex-col">
          <SmallPanel
            title="Escalation output"
            value="1-click handoff"
            lines={[
              "Full conversation summary",
              "Detected customer intent",
              "Suggested macro reply",
              "Priority level assessed",
            ]}
            fullHeight
          />
        </div>
      </div>
    ),
  },
  {
    id: "chat-widget",
    title: "Chat Widget",
    eyebrow: "Website & mobile",
    description: "Turn your pricing page into your best support channel.",
    summary:
      "A lightweight widget that captures the visitor's question, identifies their account, and routes the conversation straight into the shared inbox. One line of JavaScript — no SDK, no tag manager gymnastics.",
    icon: MessageSquareText,
    iconClass: "bg-[#dde7ff] text-[#3f63d8]",
    previewLabel: "Live Chat",
    previewTitle: "Instant support from any page",
    previewDescription:
      "Capture questions, surface quick actions, and start support with structured context from the first message.",
    metrics: [
      { value: "3 clicks", label: "to start" },
      { value: "24/7", label: "always on" },
      { value: "1 flow", label: "inbox sync" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[0.98fr_1.02fr]">
        <ModuleCard>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between shadow-sm pb-3 border-b border-[#e9ebf0]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#6a45db] text-white">
                  <Bot size={14} />
                </span>
                <span className="text-[15px] font-semibold text-[#30384e]">Verly widget</span>
              </div>
              <StatusChip tone="blue">Web chat</StatusChip>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end pt-4">
              <div className="overflow-hidden rounded-[20px] border border-[#e8ebf4] bg-[#fafbfe] shadow-sm">
                <div className="border-b border-[#eceef6] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b93ab] bg-white">
                  Live conversation
                </div>
                <div className="space-y-3 p-4">
                  <Bubble side="left" text="Hi, I need help updating my shipping address." />
                  <Bubble
                    side="right"
                    text="Sure! Is this for an existing order or a new purchase?"
                  />
                  <div className="grid gap-2 sm:grid-cols-2 pt-2">
                    {["Track order", "Billing help", "Talk to sales", "Live agent"].map(
                      (item) => (
                        <div
                          key={item}
                          className="cursor-pointer rounded-[14px] border border-[#d6d9e8] bg-white px-3 py-2.5 text-[13px] font-medium text-[#505a75] shadow-sm transition-all hover:border-[#b8bed4] hover:shadow-md text-center"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModuleCard>

        <SmallPanel
          title="Captured context"
          value="Ready for routing"
          lines={[
            "Source: pricing page",
            "Intent: address change",
            "Plan: enterprise trial",
            "Priority: medium",
          ]}
          fullHeight
        />
      </div>
    ),
  },
  {
    id: "shared-inbox",
    title: "Shared Inbox",
    eyebrow: "Omnichannel queue",
    description: "One queue for voice, WhatsApp, email, and chat.",
    summary:
      "Every channel lands in the same inbox. Assignments, priorities, and SLAs work the way your team already does — no retraining, no context-switching.",
    icon: Inbox,
    iconClass: "bg-[#e4e9ff] text-[#5671ff]",
    previewLabel: "Shared Inbox",
    previewTitle: "One queue for every channel",
    previewDescription:
      "Route voice, WhatsApp, email, and social conversations into a single workspace your team already knows.",
    metrics: [
      { value: "50%", label: "faster resolution" },
      { value: "387 hrs", label: "saved/month" },
      { value: "<2hrs", label: "to onboard" },
    ],
    render: () => (
      <div className="h-full">
        <ModuleCard>
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between rounded-[16px] bg-[#f8f9fc] border border-[#eaedf4] px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f19074]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f0c95a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7bc97f]" />
                </div>
                <span className="text-[13px] font-medium text-[#666d86]">verly.app/inbox</span>
              </div>
              <span className="rounded-full bg-[#eef1ff] px-2.5 py-1 text-[11px] font-bold text-[#7691ff]">
                Live View
              </span>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#353d53]">Unified Queue</h3>
                  <p className="mt-1 text-[14px] text-[#8790ab]">All conversations, one workflow</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-bold text-blue-600 border border-blue-100">
                  24 open
                </span>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
                {[
                  { name: "Email", color: "bg-[linear-gradient(135deg,#5e8cff,#3f6df0)]", count: "12" },
                  { name: "WhatsApp", color: "bg-[linear-gradient(135deg,#5fd391,#2fa563)]", count: "5" },
                  { name: "Instagram", color: "bg-[linear-gradient(135deg,#f56aa9,#c43c80)]", count: "4" },
                  { name: "Messenger", color: "bg-[linear-gradient(135deg,#7c79ff,#4f4cdc)]", count: "3" },
                ].map((channel) => (
                  <div
                    key={channel.name}
                    className="group relative overflow-hidden rounded-[18px] border border-[#e8ebf3] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fd_100%)] px-3 py-4 text-center shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_18px_-12px_rgba(40,45,65,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#d3d9ec]"
                  >
                    <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl ${channel.color} text-white shadow-[0_8px_18px_-6px_rgba(40,45,65,0.3)]`}>
                      <Inbox size={18} />
                    </div>
                    <div className="mt-3 text-[13px] font-semibold text-[#535b75]">{channel.name}</div>
                    <div className="absolute right-2 top-2 min-w-[22px] rounded-full border border-[#eceff7] bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#5468ff] shadow-sm">
                      {channel.count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  { name: "Refund follow-up", priority: "High", dot: "bg-red-400" },
                  { name: "Billing question", priority: "Medium", dot: "bg-amber-400" },
                  { name: "VIP handoff", priority: "Urgent", dot: "bg-purple-400" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-[16px] border border-[#eceef6] bg-[#f8f9fc] px-4 py-3 text-[14px] transition-colors hover:bg-[#f1f3f9] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                      <span className="font-medium text-[#495168]">{item.name}</span>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-[#8b92aa] shadow-sm border border-[#e8eaef]">
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModuleCard>
      </div>
    ),
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    eyebrow: "Training layer",
    description: "Your docs become the answer engine.",
    summary:
      "Import articles, SOPs, and policies from Notion, Confluence, or a live URL. Verly keeps them in sync, cites them in replies, and flags gaps when a question can't be answered.",
    icon: BookOpenText,
    iconClass: "bg-[#dff2d7] text-[#4c8a3e]",
    previewLabel: "Knowledge Base",
    previewTitle: "Docs that power every answer",
    previewDescription:
      "Sync articles, SOPs, and policies into one place — AI and agents pull from the same source.",
    metrics: [
      { value: "128", label: "articles synced" },
      { value: "92%", label: "answer coverage" },
      { value: "1 source", label: "of truth" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[1.02fr_0.98fr]">
        <ModuleCard>
          <div className="flex h-full flex-col">
            <SectionTitle
              title="Knowledge collections"
              description="Grouped collections help Verly retrieve the right source before answering."
            />
            <div className="mt-auto pt-6 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Returns policy", count: "12 docs", icon: "📑", tint: "from-[#eaf0ff] to-white" },
                { title: "Shipping timelines", count: "4 docs", icon: "📦", tint: "from-[#fff3e6] to-white" },
                { title: "Escalation playbook", count: "8 docs", icon: "🚨", tint: "from-[#ffe9e9] to-white" },
                { title: "Voice call scripts", count: "15 docs", icon: "🎙️", tint: "from-[#e8fbef] to-white" },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`group relative flex flex-col gap-1 overflow-hidden rounded-[16px] border border-[#e8ebf3] bg-gradient-to-b ${item.tint} px-4 py-4 text-[14px] font-medium text-[#68718b] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_18px_-12px_rgba(40,45,65,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#d3d9ec]`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[18px] shadow-sm">{item.icon}</span>
                  <span className="mt-2 font-semibold text-[#3f475c]">{item.title}</span>
                  <span className="text-[12px] text-[#9098b0]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </ModuleCard>

        <SmallPanel
          title="AI answer quality"
          value="Trained from live docs"
          lines={[
            "Auto-sync enabled",
            "Versioned updates",
            "Intent mapping active",
            "Source-linked answers",
          ]}
          fullHeight
        />
      </div>
    ),
  },
  {
    id: "support-analytics",
    title: "Analytics",
    eyebrow: "Performance layer",
    description: "See what your customers are really asking.",
    summary:
      "Track CSAT, deflection, first-reply time, and the intents your AI can't handle yet. Every dashboard comes with a recommended action — not just a chart.",
    icon: ChartColumnBig,
    iconClass: "bg-[#f8dfe4] text-[#d54d68]",
    previewLabel: "Support Analytics",
    previewTitle: "From data to action, instantly",
    previewDescription:
      "Surface trends, gaps, and performance changes across AI and human workflows in real time.",
    metrics: [
      { value: "18%", label: "fewer handoffs" },
      { value: "94%", label: "CSAT trend" },
      { value: "6", label: "insights this week" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[1fr_1fr]">
        <ModuleCard>
          <div className="flex flex-col h-full">
            <SectionTitle
              title="Performance snapshot"
              description="Real-time monitoring across AI and human support interactions."
            />
            <div className="mt-auto pt-5 grid grid-cols-3 gap-3">
              {[
                ["CSAT", "94%"],
                ["Reply time", "4.8m"],
                ["Resolution", "81%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[16px] border border-[#eaedf5] bg-gradient-to-b from-white to-[#f7f8fc] px-2 md:px-3 py-4 text-center shadow-sm">
                  <div className="text-[16px] md:text-[18px] font-bold text-[#34405a]">{value}</div>
                  <div className="mt-1 text-[11px] md:text-[12px] font-medium text-[#8790ab] uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f5f7fd_0%,#edf1ff_100%)] p-4 border border-[#e8eaef]">
              <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-[#8c93ab]">
                <span>Conversation volume</span>
                <span className="text-[#6a45db]">Last 7 days</span>
              </div>
              <div className="flex h-[76px] items-end gap-3 px-1">
                {[42, 66, 54, 84, 62, 90].map((height, index) => (
                  <div key={index} className="group relative flex-1 flex items-end h-full">
                    <div className="w-full rounded-t-[6px] bg-gradient-to-t from-[#6a45db]/80 to-[#9278ef] transition-all hover:bg-[#5b3dc4]" style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModuleCard>

        <SmallPanel
          title="Recommended actions"
          value="6 opportunities"
          lines={[
            "Improve billing macro coverage",
            "Add FAQ for order tracking",
            "Re-train shipping intent set",
            "Review missed WhatsApp handoffs",
          ]}
          fullHeight
        />
      </div>
    ),
  },
] as const;

export default function PlatformModules() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / ROTATION_INTERVAL, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveIndex((current) => (current + 1) % modules.length);
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [activeIndex]);

  const handleModuleClick = (index: number) => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setActiveIndex(index);
  };

  const activeModule = modules[activeIndex];
  const ActiveIcon = activeModule.icon;

  return (
    <section className="relative overflow-hidden bg-[#04060d] py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.16),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,780px)_minmax(0,380px)] lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7f95ff]" />
              The Platform
            </span>
            <h2 className="mt-5 max-w-[760px] text-balance text-[34px] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[40px] md:text-[48px] lg:text-[52px]">
              Five products. One workflow.{" "}
              <span className="text-white/45">Zero integrations to babysit.</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-[420px] text-[15px] leading-7 text-white/55 md:text-[16px]">
              Helpdesk, chat, inbox, knowledge, and analytics — built on the same core.
              Switch tabs, not tools.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/40">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400/80" />
                Unified data
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#7f95ff]" />
                Shared context
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-amber-300/80" />
                Live in 10 min
              </span>
            </div>
          </div>
        </div>

        {/* Module selector pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {modules.map((module, index) => {
            const isActive = index === activeIndex;
            const ModIcon = module.icon;

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => handleModuleClick(index)}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? "border-[#7f95ff]/40 bg-[#7f95ff]/10 text-white"
                    : "border-white/8 bg-white/[0.03] text-white/50 hover:border-white/15 hover:text-white/75"
                }`}
              >
                {/* Progress fill behind active pill */}
                {isActive && (
                  <span
                    className="absolute inset-0 bg-[#7f95ff]/[0.08] origin-left"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                )}
                <ModIcon className="relative h-3.5 w-3.5" />
                <span className="relative">{module.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main showcase */}
        <div className="relative isolate">
          <div className="grid grid-cols-1 grid-rows-1">
            <AnimatePresence>
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="col-start-1 row-start-1 h-full flex flex-col w-full overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,11,20,0.98),rgba(4,6,13,0.98))] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.3)] md:p-6"
              >
                <div className="mx-auto w-full max-w-[1080px] flex-1 overflow-hidden flex flex-col rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fc_100%)] shadow-[0_24px_70px_rgba(14,19,43,0.22),0_2px_0_rgba(255,255,255,0.6)_inset]">
                  {/* Module header */}
                  <div className="relative border-b border-[#e6e9f3] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] px-6 py-6 md:px-8 md:py-7">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7f95ff]/30 to-transparent" />
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${activeModule.iconClass} shadow-[0_14px_30px_rgba(110,131,255,0.22),0_0_0_1px_rgba(255,255,255,0.6)_inset]`}
                      >
                        <ActiveIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e7693]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7f95ff]" />
                          {activeModule.previewLabel}
                        </div>
                        <h3 className="mt-2.5 text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1a2138] md:text-[30px]">
                          {activeModule.previewTitle}
                        </h3>
                        <p className="mt-2 max-w-[680px] text-[14.5px] leading-[1.65] text-[#6f768d] md:text-[15px]">
                          {activeModule.previewDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Module content */}
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <div className="flex-1 rounded-[24px] border border-white/80 bg-[#eef0f7] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-4">
                      {activeModule.render()}
                    </div>

                    {/* Metrics bar */}
                    <div className="mt-4 shrink-0 overflow-hidden rounded-[18px] border border-[#5468ff]/30 bg-[linear-gradient(135deg,#5e76ff_0%,#7f95ff_55%,#6275ff_100%)] shadow-[0_18px_40px_rgba(80,103,255,0.28)]">
                      <div className="grid divide-x divide-white/15 md:grid-cols-3">
                        {activeModule.metrics.map((stat) => (
                          <div
                            key={stat.label}
                            className="relative px-6 py-5 text-center text-white"
                          >
                            <div className="text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">
                              {stat.value}
                            </div>
                            <div className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/75">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom description strip */}
        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03]">
          <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-7 md:py-6">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/48">
                {activeModule.eyebrow}
              </div>
              <p className="mt-2 max-w-[760px] text-[15px] leading-7 text-white/56 md:text-[16px]">
                {activeModule.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-white/40">
              <span className="tabular-nums">{activeIndex + 1}</span>
              <span className="text-white/20">/</span>
              <span className="tabular-nums">{modules.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallPanel({
  title,
  value,
  lines,
  fullHeight,
}: {
  title: string;
  value: string;
  lines: string[];
  fullHeight?: boolean;
}) {
  return (
    <div className={`rounded-[24px] border border-[#e1e5f0] bg-[linear-gradient(180deg,#eef0f8_0%,#e6e9f4_100%)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${fullHeight ? "h-full flex flex-col" : ""}`}>
      <div className={`rounded-[20px] border border-white bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfe_100%)] p-4 shadow-[0_18px_36px_-18px_rgba(40,45,65,0.18)] ${fullHeight ? "h-full flex flex-col" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="text-[16.5px] font-semibold tracking-[-0.01em] text-[#222a40]">{title}</div>
          <StatusChip tone="neutral">{value}</StatusChip>
        </div>

        <div className="mt-4 overflow-hidden rounded-[14px] border border-[#eceff7] bg-[linear-gradient(135deg,#f3f6ff_0%,#ffffff_50%,#f3f6ff_100%)] px-4 py-3">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c84a0]">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5468ff] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5468ff]" />
              </span>
              Live
            </span>
            <span className="text-[#5468ff]">{lines.length} signals</span>
          </div>
          <div className="mt-2 text-[12.5px] leading-[1.55] text-[#7a829b]">
            Captured automatically and synced to the workspace.
          </div>
        </div>

        <div className={`mt-3 flex flex-col gap-2.5 ${fullHeight ? "flex-1" : ""}`}>
          {lines.map((line, index) => (
            <div
              key={line}
              className={`group flex items-center gap-3 rounded-[14px] border border-[#eceff7] bg-white px-4 text-[13.5px] font-medium text-[#5d6580] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-4px_rgba(40,45,65,0.05)] ${fullHeight ? "flex-1 py-2.5" : "py-3"}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef1ff,#dde3ff)] text-[10px] font-bold text-[#5468ff] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{line}</span>
              <span className="text-[#c8cee0] opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, text }: { side: "left" | "right"; text: string }) {
  const isRight = side === "right";

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-[18px] px-4 py-3 text-[14px] leading-6 ${
          isRight
            ? "rounded-br-[6px] bg-[linear-gradient(180deg,#7f95ff_0%,#5e76ff_100%)] text-white shadow-[0_8px_20px_-6px_rgba(94,118,255,0.45)]"
            : "rounded-bl-[6px] border border-[#eceff7] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fd_100%)] text-[#586079] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ModuleCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-[#e1e5f0] bg-[linear-gradient(180deg,#eef0f8_0%,#e6e9f4_100%)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <div className="flex h-full flex-col rounded-[20px] border border-white bg-white p-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_36px_-18px_rgba(40,45,65,0.18)] lg:p-5">
        {children}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c84a0]">
          <span className="h-1 w-1 rounded-full bg-[#7f95ff]" />
          {eyebrow}
        </div>
      ) : null}
      <div className={`${eyebrow ? "mt-2" : ""} text-[17px] font-semibold tracking-[-0.01em] text-[#222a40]`}>
        {title}
      </div>
      {description ? (
        <p className="mt-1.5 text-[13.5px] leading-[1.65] text-[#7a829b]">{description}</p>
      ) : null}
    </div>
  );
}

function DetailRow({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-[#e8ebf3] bg-[linear-gradient(180deg,#fbfcfe_0%,#f5f7fc_100%)] px-4 py-3 transition-colors hover:border-[#d3d9ec]">
      <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-[#7f95ff] to-[#5e76ff] opacity-70" />
      <div className="pl-2 text-[14px] font-semibold text-[#3a4360]">{title}</div>
      <div className="mt-1 pl-2 text-[13px] leading-[1.55] text-[#7d859e]">{detail}</div>
    </div>
  );
}

function StatusChip({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "blue" | "neutral";
}) {
  const tones = {
    blue: {
      bg: "bg-[#eaeeff] text-[#5468ff] border-[#d8def9]",
      dot: "bg-[#5468ff]",
    },
    neutral: {
      bg: "bg-[#f4f5f9] text-[#7a829b] border-[#e6e8f0]",
      dot: "bg-[#9ca3b8]",
    },
  } as const;
  const t = tones[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${t.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {children}
    </span>
  );
}
