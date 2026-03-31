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
      <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <ModuleCard>
          <div className="flex items-start justify-between gap-4">
            <SectionTitle
              eyebrow="AI inbox assistant"
              title="Suggested next actions"
              description="Verly reviews the conversation, policy context, and customer status before proposing the next move."
            />
            <StatusChip tone="blue">Live</StatusChip>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              ["Refund request", "Matched to returns policy article"],
              ["Billing issue", "Needs finance escalation with summary"],
              ["VIP customer", "Priority response and manager notification"],
            ].map(([title, detail]) => (
              <DetailRow key={title} title={title} detail={detail} />
            ))}
          </div>
        </ModuleCard>

        <div className="grid gap-4">
          <SmallPanel
            title="Knowledge sources"
            value="24 synced"
            lines={["Docs", "Past tickets", "Macros", "Policies"]}
          />
          <SmallPanel
            title="Escalation output"
            value="1-click handoff"
            lines={["Summary", "Detected intent", "Suggested reply", "Priority"]}
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
      <div className="grid gap-4 md:grid-cols-[0.98fr_1.02fr]">
        <ModuleCard>
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-semibold text-[#30384e]">Verly widget</div>
            <StatusChip tone="blue">Web chat</StatusChip>
          </div>

          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#e8ebf4] bg-[#fafbfe]">
            <div className="border-b border-[#eceef6] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8b93ab]">
              Live conversation
            </div>
            <div className="space-y-3 p-4">
              <Bubble side="left" text="Hi, I need help updating my shipping address." />
              <Bubble
                side="right"
                text="I can help with that. Is this for an existing order or a new purchase?"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {["Track an order", "Billing help", "Talk to sales", "Need an agent"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[14px] border border-[#e7e9f3] bg-white px-3 py-2.5 text-[13px] font-medium text-[#68728d]"
                    >
                      {item}
                    </div>
                  ),
                )}
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
      <div className="rounded-[24px] bg-[#eef0f7] p-4 md:p-5">
        <div className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f19074]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f0c95a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#7bc97f]" />
            </div>
            <span className="text-[14px] font-medium text-[#666d86]">verly.app/modules/inbox</span>
          </div>
          <span className="rounded-full bg-[#eef1ff] px-3 py-1 text-[12px] font-semibold text-[#7691ff]">
            Preview
          </span>
        </div>

        <div className="mt-4 rounded-[22px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-semibold text-[#353d53]">Unified Queue</h3>
              <p className="mt-1 text-[14px] text-[#8790ab]">All conversations, one workflow</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#7280ad]">
              24 open
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              { name: "Email", color: "bg-[#4e7ff5]" },
              { name: "WhatsApp", color: "bg-[#42b97a]" },
              { name: "Instagram", color: "bg-[#dc4a95]" },
              { name: "Messenger", color: "bg-[#615ff4]" },
            ].map((channel) => (
              <div
                key={channel.name}
                className="rounded-[18px] border border-[#eceef6] bg-[#f8f9fc] px-4 py-5 text-center"
              >
                <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${channel.color}`} />
                <div className="mt-3 text-[13px] font-semibold text-[#69728c]">{channel.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2.5">
            {[
              { name: "Refund follow-up", priority: "High" },
              { name: "Billing question", priority: "Medium" },
              { name: "VIP handoff", priority: "Urgent" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-[16px] border border-[#eceef6] bg-[#f8f9fc] px-4 py-3 text-[14px]"
              >
                <span className="font-medium text-[#6c7490]">{item.name}</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-[#9da4bc]">
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
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
      <div className="grid gap-4 md:grid-cols-[1.02fr_0.98fr]">
        <ModuleCard>
          <SectionTitle
            title="Knowledge collections"
            description="Grouped collections help Verly retrieve the right source before answering."
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Returns policy",
              "Shipping timelines",
              "Escalation playbook",
              "Voice call scripts",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[16px] border border-[#e8ebf3] bg-[#f8f9fc] px-4 py-4 text-[14px] font-medium text-[#68718b]"
              >
                {item}
              </div>
            ))}
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
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <SmallPanel
          title="Customer profile"
          value="Riya Sharma"
          lines={[
            "Plan: Growth",
            "Region: APAC",
            "Open cases: 2",
            "CSM: Assigned",
          ]}
        />

        <ModuleCard>
          <div className="flex items-center justify-between">
            <div className="text-[17px] font-semibold text-[#31384f]">Recent timeline</div>
            <StatusChip tone="neutral">Synced</StatusChip>
          </div>
          <div className="mt-4 space-y-3">
            {[
              "Voice call summary added by AI",
              "WhatsApp billing issue resolved",
              "Follow-up task created for onboarding",
              "Priority tag added after escalation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[16px] bg-[#f7f8fc] px-4 py-3 text-[14px] font-medium text-[#69728c]"
              >
                {item}
              </div>
            ))}
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
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <ModuleCard>
          <SectionTitle
            title="Performance snapshot"
            description="Real-time monitoring across AI and human support interactions."
          />
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["CSAT", "94%"],
              ["Reply time", "4.8m"],
              ["Resolution", "81%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-[#f7f8fc] px-3 py-4 text-center">
                <div className="text-[18px] font-semibold text-[#34405a]">{value}</div>
                <div className="mt-1 text-[12px] font-medium text-[#8790ab]">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f5f7fd_0%,#edf1ff_100%)] p-4">
            <div className="mb-3 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8c93ab]">
              <span>Conversation monitors</span>
              <span>Last 7 days</span>
            </div>
            <div className="flex h-24 items-end gap-3">
              {[42, 66, 54, 84, 62, 90].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-full bg-[#7691ff]" style={{ height }} />
              ))}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,11,20,0.98),rgba(4,6,13,0.98))] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.3)] md:p-6"
          >
            <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[30px] border border-[#d8d9e6] bg-[#dbdde9] shadow-[0_20px_60px_rgba(14,19,43,0.18)]">
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

              <div className="p-4 md:p-5">
                <div className="rounded-[24px] bg-[#edeff6] p-3 md:p-4">
                  {activeModule.render()}
                </div>

                <div className="mt-4 grid gap-px bg-[#7086ff] md:grid-cols-3">
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
}: {
  title: string;
  value: string;
  lines: string[];
}) {
  return (
    <div className="rounded-[24px] bg-[#e5e7f0] p-4">
      <div className="rounded-[22px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[17px] font-semibold text-[#31384f]">{title}</div>
          <StatusChip tone="neutral">{value}</StatusChip>
        </div>
        <div className="mt-4 space-y-3">
          {lines.map((line) => (
            <div
              key={line}
              className="rounded-[16px] bg-[#f7f8fc] px-4 py-3 text-[14px] font-medium text-[#69728c]"
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
    <div className="rounded-[24px] bg-[#e5e7f0] p-4">
      <div className="rounded-[22px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
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
