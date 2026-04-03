"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenText,
  Bot,
  ChartColumnBig,
  Inbox,
  MessageSquareText,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const modules = [
  {
    id: "ai-helpdesk",
    title: "AI Helpdesk",
    eyebrow: "Automation core",
    description: "Give superpowers to your teams and customers.",
    summary:
      "Automate repetitive support, draft smarter replies, and keep human handoff available when nuance matters.",
    icon: Bot,
    iconClass: "bg-[#e6ddff] text-[#6a45db]",
    previewLabel: "AI Helpdesk",
    previewTitle: "Autonomous support flows",
    previewDescription:
      "AI handles repetitive requests, classifies issues, and escalates with context when needed.",
    metrics: [
      { value: "72%", label: "auto-resolved" },
      { value: "4.8m", label: "avg first reply" },
      { value: "100%", label: "handoff context" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[1.15fr_0.85fr]">
        <ModuleCard>
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-4">
              <SectionTitle
                eyebrow="AI inbox assistant"
                title="Suggested next actions"
                description="Verly reviews the conversation, policy context, and customer status before proposing the next move."
              />
              <StatusChip tone="blue">Live</StatusChip>
            </div>

            <div className="mt-auto pt-5 grid gap-3">
              {[
                ["Refund request", "Matched to returns policy article"],
                ["Billing issue", "Needs finance escalation with summary"],
                ["VIP customer", "Priority response and manager notification"],
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
              "AI conversational summary",
              "Detected user intent",
              "Suggested macro reply",
              "Assessed priority level",
            ]}
            fullHeight
          />
        </div>
      </div>
    ),
  },
  {
    id: "chat-widget",
    title: "Chat widget",
    eyebrow: "Website support",
    description: "Support from your website and mobile apps.",
    summary:
      "Launch a modern web chat experience that captures intent fast and routes conversations into the same Verly workflow.",
    icon: MessageSquareText,
    iconClass: "bg-[#dde7ff] text-[#3f63d8]",
    previewLabel: "Web conversations",
    previewTitle: "Website widget with instant intake",
    previewDescription:
      "Capture questions, surface quick actions, and start support with structured context from the first click.",
    metrics: [
      { value: "3 clicks", label: "to start" },
      { value: "24/7", label: "coverage" },
      { value: "1 flow", label: "with inbox sync" },
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
                    text="I can help with that. Is this for an existing order or a new purchase?"
                  />
                  <div className="grid gap-2 sm:grid-cols-2 pt-2">
                    {["Track an order", "Billing help", "Talk to sales", "Need an agent"].map(
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
    description: "Centralize your inbound communications.",
    summary:
      "Manage every incoming conversation from one place with priorities, ownership, and a live queue across channels.",
    icon: Inbox,
    iconClass: "bg-[#e4e9ff] text-[#5671ff]",
    previewLabel: "Shared Inbox",
    previewTitle: "Unified queue for every channel",
    previewDescription:
      "Route voice, WhatsApp, email, and social conversations into one operating layer for your team.",
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
                <span className="text-[13px] font-medium text-[#666d86]">verly.app/modules/inbox</span>
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

          <div className="mt-auto pt-4 grid gap-3 grid-cols-2 md:grid-cols-4">
            {[
              { name: "Email", color: "bg-[#4e7ff5]", count: "12" },
              { name: "WhatsApp", color: "bg-[#42b97a]", count: "5" },
              { name: "Instagram", color: "bg-[#dc4a95]", count: "4" },
              { name: "Messenger", color: "bg-[#615ff4]", count: "3" },
            ].map((channel) => (
              <div
                key={channel.name}
                className="rounded-[18px] border border-[#eceef6] bg-gradient-to-b from-[#f8f9fc] to-[#f4f6fb] px-3 py-4 text-center shadow-sm relative overflow-hidden"
              >
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl ${channel.color} text-white shadow-md`}>
                  <Inbox size={18} />
                </div>
                <div className="mt-3 text-[13px] font-semibold text-[#69728c]">{channel.name}</div>
                <div className="absolute top-2 right-2 text-[10px] font-bold text-[#8d96b3] bg-white rounded-full px-1.5 min-w-[20px] shadow-sm">
                  {channel.count}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2.5">
            {[
              { name: "Refund follow-up", priority: "High", icon: "🔴" },
              { name: "Billing question", priority: "Medium", icon: "🟡" },
              { name: "VIP handoff", priority: "Urgent", icon: "🟣" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-[16px] border border-[#eceef6] bg-[#f8f9fc] px-4 py-3 text-[14px] transition-colors hover:bg-[#f1f3f9] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[12px]">{item.icon}</span>
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
    description: "Make your customers more autonomous.",
    summary:
      "Organize product knowledge, FAQs, and resolution playbooks so AI and agents respond with better context.",
    icon: BookOpenText,
    iconClass: "bg-[#dff2d7] text-[#4c8a3e]",
    previewLabel: "Knowledge Base",
    previewTitle: "Docs that train the system",
    previewDescription:
      "Sync articles, SOPs, and policy docs into a central source of truth for self-serve and agent assist.",
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
                { title: "Returns policy", count: "12 docs", icon: "📑" },
                { title: "Shipping timelines", count: "4 docs", icon: "📦" },
                { title: "Escalation playbook", count: "8 docs", icon: "🚨" },
                { title: "Voice call scripts", count: "15 docs", icon: "🎙️" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[16px] border border-[#e8ebf3] bg-gradient-to-b from-[#f8f9fc] to-white px-4 py-4 text-[14px] font-medium text-[#68718b] shadow-sm flex flex-col gap-1"
                >
                  <span className="text-[18px]">{item.icon}</span>
                  <span className="mt-1 text-[#3f475c] font-semibold">{item.title}</span>
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
            "Intent mapping",
            "Source-linked answers",
          ]}
          fullHeight
        />
      </div>
    ),
  },
  {
    id: "support-crm",
    title: "Support CRM",
    eyebrow: "Customer context",
    description: "Organize your customer data in a CRM.",
    summary:
      "Keep conversation history, account notes, plan details, and support signals visible in one customer record.",
    icon: Users,
    iconClass: "bg-[#f6e4d0] text-[#bb6b2f]",
    previewLabel: "Support CRM",
    previewTitle: "One customer record across channels",
    previewDescription:
      "Give agents and AI instant context on plans, issues, and previous conversations before every reply.",
    metrics: [
      { value: "360°", label: "customer context" },
      { value: "0", label: "lost handoffs" },
      { value: "1 view", label: "per account" },
    ],
    render: () => (
      <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-[0.9fr_1.1fr]">
        <SmallPanel
          title="Customer profile"
          value="Riya Sharma"
          lines={[
            "Plan: Growth (+2 seats)",
            "Region: APAC (GMT+8)",
            "Open cases: 2 (1 urgent)",
            "CSM: Assigned (Sarah)",
          ]}
          fullHeight
        />

        <ModuleCard>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0f2f7]">
              <div className="text-[17px] font-semibold text-[#31384f]">Recent timeline</div>
              <StatusChip tone="neutral">Synced via API</StatusChip>
            </div>
            <div className="mt-auto pt-4 space-y-3 relative before:absolute before:left-3 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#e4e7f1]">
              {[
                { action: "Voice call summary added by AI", time: "10m ago", glow: "border-[#6e83ff]" },
                { action: "WhatsApp billing issue resolved", time: "2h ago", glow: "border-[#eaecf4]" },
                { action: "Follow-up task created for onboarding", time: "1d ago", glow: "border-[#eaecf4]" },
                { action: "Priority tag added after escalation", time: "3d ago", glow: "border-[#eaecf4]" },
              ].map((item) => (
                <div
                  key={item.action}
                  className={`relative ml-4 rounded-[16px] border bg-gradient-to-r from-white to-[#f9fafc] px-4 py-3 text-[14px] font-medium text-[#5c647c] shadow-sm ${item.glow}`}
                >
                  <span className={`absolute -left-[22px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white border-2 ${item.glow === "border-[#6e83ff]" ? "border-[#6e83ff]" : "border-[#ced2df]"}`} />
                  <div className="flex justify-between items-center gap-2">
                    <span className="leading-5">{item.action}</span>
                    <span className="text-[11px] text-[#939bb0] shrink-0 font-bold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModuleCard>
      </div>
    ),
  },
  {
    id: "support-analytics",
    title: "Support Analytics",
    eyebrow: "Performance layer",
    description: "Monitor and track your teams' performances.",
    summary:
      "Track response quality, missed intents, channel volume, and automation opportunities from one analytics layer.",
    icon: ChartColumnBig,
    iconClass: "bg-[#f8dfe4] text-[#d54d68]",
    previewLabel: "Support Analytics",
    previewTitle: "See what needs attention next",
    previewDescription:
      "Surface trends, gaps, and performance changes across AI and human support workflows in real time.",
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
                <span>Conversation monitors</span>
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

export default function CrispPlatformModules() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % modules.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeModule = modules[activeIndex];
  const ActiveIcon = activeModule.icon;

  return (
    <section className="relative overflow-hidden bg-[#04060d] py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.16),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,760px)_minmax(0,320px)] lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
              Platform Modules
            </span>
            <h2 className="mt-5 max-w-[720px] font-[Georgia,Times,'Times_New_Roman',serif] text-[42px] leading-[0.98] tracking-[-0.04em] text-white md:text-[64px]">
              Here&apos;s why teams love
              <span className="block">one AI platform.</span>
            </h2>
          </div>

          <p className="max-w-[320px] text-[15px] leading-8 text-white/52 lg:justify-self-end">
            Explore one Verly module at a time and see how each layer fits into the support
            workflow.
          </p>
        </div>

        <div className="relative isolate">
          <div className="grid grid-cols-1 grid-rows-1">
            <AnimatePresence>
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="col-start-1 row-start-1 h-full flex flex-col w-full overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,11,20,0.98),rgba(4,6,13,0.98))] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.3)] md:p-6"
              >
                <div className="mx-auto w-full max-w-[1080px] flex-1 overflow-hidden flex flex-col rounded-[30px] border border-[#d8d9e6] bg-[#dbdde9] shadow-[0_20px_60px_rgba(14,19,43,0.18)]">
              <div className="border-b border-[#c9ccdb] bg-[#dcdeea] px-6 py-6 md:px-8">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${activeModule.iconClass} shadow-[0_12px_24px_rgba(110,131,255,0.18)]`}
                  >
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8b8ea4]">
                      {activeModule.previewLabel}
                    </div>
                    <div className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-[#2b3245]">
                      {activeModule.previewTitle}
                    </div>
                    <p className="mt-2 max-w-[680px] text-[15px] leading-7 text-[#6f768d]">
                      {activeModule.previewDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 flex flex-1 flex-col">
                <div className="rounded-[24px] bg-[#edeff6] p-3 md:p-4 flex-1">
                  {activeModule.render()}
                </div>

                <div className="mt-4 grid gap-px bg-[#7086ff] md:grid-cols-3 shrink-0">
                  {activeModule.metrics.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[linear-gradient(180deg,#7f95ff_0%,#637cff_100%)] px-6 py-5 text-center text-white"
                    >
                      <div className="text-[18px] font-semibold md:text-[22px]">{stat.value}</div>
                      <div className="mt-1 text-[12px] font-medium tracking-[0.04em] text-white/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03]">
          <div className="grid gap-5 px-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-6">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/48">
                {activeModule.eyebrow}
              </div>
              <p className="mt-2 max-w-[760px] text-[15px] leading-7 text-white/56 md:text-[16px]">
                {activeModule.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {modules.map((module, index) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    index === activeIndex
                      ? "border-[#7f95ff] bg-[#7f95ff]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
                  }`}
                >
                  {module.title}
                </button>
              ))}
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
    <div className={`rounded-[24px] bg-[#e5e7f0] p-4 ${fullHeight ? "h-full flex flex-col" : ""}`}>
      <div className={`rounded-[22px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${fullHeight ? "h-full flex flex-col" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="text-[17px] font-semibold text-[#31384f]">{title}</div>
          <StatusChip tone="neutral">{value}</StatusChip>
        </div>
        <div className={`mt-auto pt-4 space-y-3 ${fullHeight ? "flex-1 flex flex-col justify-end" : ""}`}>
          {lines.map((line) => (
            <div
              key={line}
              className="rounded-[16px] bg-[#f7f8fc] px-4 py-3 text-[14px] font-medium text-[#69728c] shadow-sm border border-[#f0f2f7]"
            >
              {line}
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
          isRight ? "bg-[#6e83ff] text-white" : "bg-[#f7f8fc] text-[#68718b]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ModuleCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[24px] bg-[#e5e7f0] p-4 h-full flex flex-col">
      <div className="rounded-[22px] bg-white p-4 lg:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_24px_rgba(40,45,65,0.04)] h-full flex flex-col">
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
        <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8d93aa]">
          {eyebrow}
        </div>
      ) : null}
      <div className={`${eyebrow ? "mt-1" : ""} text-[17px] font-semibold text-[#31384f]`}>
        {title}
      </div>
      {description ? (
        <p className="mt-1.5 text-[14px] leading-6 text-[#7a829b]">{description}</p>
      ) : null}
    </div>
  );
}

function DetailRow({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[16px] border border-[#eaecf4] bg-[#f8f9fc] px-4 py-3">
      <div className="text-[14px] font-semibold text-[#49536e]">{title}</div>
      <div className="mt-1 text-[13px] leading-6 text-[#7d859e]">{detail}</div>
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
  const className =
    tone === "blue"
      ? "bg-[#e8ebff] text-[#6e83ff]"
      : "bg-[#f4f5f9] text-[#7a829b]";

  return (
    <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${className}`}>
      {children}
    </span>
  );
}
