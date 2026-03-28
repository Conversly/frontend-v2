"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const features = [
  {
    id: "helpdesk",
    label: "AI Helpdesk",
    eyebrow: "Modern ticketing",
    desc: "Deploy AI to resolve support tickets, suggest replies, and keep teams moving faster.",
    accent: "from-[#67A4FF] via-[#4F7BF7] to-[#2B54D6]",
    tint: "from-[#66A4FF] to-[#315EEA]",
    stats: [
      { value: "43%", label: "faster triage" },
      { value: "128", label: "tickets/day" },
      { value: "<1m", label: "first draft" },
    ],
  },
  {
    id: "widget",
    label: "Chat Widget",
    eyebrow: "Website conversations",
    desc: "Launch a branded support experience on your website with instant AI responses.",
    accent: "from-[#FFBF7F] via-[#F8964A] to-[#E96A18]",
    tint: "from-[#FDBA74] to-[#F97316]",
    stats: [
      { value: "24/7", label: "always on" },
      { value: "91%", label: "self served" },
      { value: "<30s", label: "reply time" },
    ],
  },
  {
    id: "inbox",
    label: "Shared Inbox",
    eyebrow: "Omnichannel queue",
    desc: "Manage every incoming conversation from one place with priorities and ownership.",
    accent: "from-[#8AA2FF] via-[#637CFF] to-[#315EEA]",
    tint: "from-[#7C90FF] to-[#3B5CF0]",
    stats: [
      { value: "50%", label: "faster resolution" },
      { value: "387 hrs", label: "saved/month" },
      { value: "<2hrs", label: "to onboard" },
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    eyebrow: "Self-serve help",
    desc: "Give customers a searchable help center so they can solve common questions instantly.",
    accent: "from-[#68D7B1] via-[#3ECF8E] to-[#129A63]",
    tint: "from-[#4ADE80] to-[#059669]",
    stats: [
      { value: "1.8k", label: "articles indexed" },
      { value: "72%", label: "deflection rate" },
      { value: "24 hrs", label: "to publish" },
    ],
  },
  {
    id: "crm",
    label: "Support CRM",
    eyebrow: "Customer context",
    desc: "Keep plans, health, ownership, and conversation history attached to every profile.",
    accent: "from-[#FF98AF] via-[#FB7185] to-[#E11D48]",
    tint: "from-[#FB7185] to-[#E11D48]",
    stats: [
      { value: "360°", label: "customer view" },
      { value: "$4.2k", label: "mrr tracked" },
      { value: "47", label: "active tickets" },
    ],
  },
  {
    id: "analytics",
    label: "Support Analytics",
    eyebrow: "Performance dashboard",
    desc: "Track SLA, CSAT, and team metrics with real-time views of support performance.",
    accent: "from-[#FF9AD4] via-[#F472B6] to-[#DB2777]",
    tint: "from-[#F472B6] to-[#DB2777]",
    stats: [
      { value: "+18%", label: "sla trend" },
      { value: "4.8/5", label: "csat score" },
      { value: "1.2m", label: "avg reply" },
    ],
  },
];

export default function CrispFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const activeFeature = useMemo(() => features[activeIndex], [activeIndex]);

  return (
    <section id="features" className="relative overflow-hidden bg-[#efefef] py-10 text-white md:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6f6f6_0%,#ededed_100%)]" />

      <div className="relative mx-auto max-w-[1680px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[#020202] px-6 py-7 shadow-[0_28px_80px_rgba(0,0,0,0.18)] md:px-10 md:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(109,75,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(77,116,255,0.12),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

          <div className="relative mb-6 grid gap-4 md:mb-7 md:grid-cols-[minmax(0,1fr)_380px] md:items-end">
            <div>
              <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#a3a9bc]">
                Platform Modules
              </div>
              <h2 className="max-w-[720px] font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] font-normal leading-[1] tracking-[-0.03em] text-white md:text-[48px]">
                Here&apos;s why teams love
                <span className="block text-[#d9dcf1]">one AI platform.</span>
              </h2>
            </div>
            <p className="max-w-[380px] text-sm font-medium leading-7 text-[#8f96aa] md:ml-auto md:text-[15px]">
              One module is shown at a time in a sliding format, with a larger product preview
              for each part of the support stack.
            </p>
          </div>

          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.02] p-2.5 md:p-3.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -70 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mx-auto max-w-[1100px]"
            >
              <FeatureCard
                key={activeFeature.id}
                label={activeFeature.label}
                eyebrow={activeFeature.eyebrow}
                desc={activeFeature.desc}
                accent={activeFeature.accent}
                tint={activeFeature.tint}
                stats={activeFeature.stats}
                type={activeFeature.id}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + features.length) % features.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#c3c8d6] transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Previous slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % features.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#c3c8d6] transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Next slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-none border-b px-1 pb-2 pt-1 text-[15px] font-medium transition-colors ${
                    index === activeIndex
                      ? "border-white text-white"
                      : "border-transparent text-[#7f879b] hover:text-[#cfd4e3]"
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {features.map((feature, index) => (
                <button
                  key={`${feature.id}-dot`}
                  type="button"
                  aria-label={`Show ${feature.label}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  label,
  eyebrow,
  desc,
  accent,
  tint,
  stats,
  type,
}: {
  label: string;
  eyebrow: string;
  desc: string;
  accent: string;
  tint: string;
  stats: Array<{ value: string; label: string }>;
  type: string;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#cfd2eb] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1">
      <div className="grid grid-rows-[auto_1fr_auto]">
      <div className="border-b border-black/8 bg-[#d8dbf0] px-5 pb-3.5 pt-3.5">
        <div className="mb-3 flex items-start gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${tint} text-white shadow-lg shadow-black/15`}>
            <FeatureIcon type={type} />
          </div>
          <div className="flex-1">
            <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b6f82]">
              {eyebrow}
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-semibold leading-none text-[#181b24]">{label}</h3>
              <span className="text-xl text-[#8a8fa7]">→</span>
            </div>
            <p className="mt-1.5 max-w-[640px] text-sm leading-5 text-[#464b5c]">{desc}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#d8dbf0] p-3.5 md:p-4">
        <div className="mb-2.5 flex items-center justify-between rounded-[18px] border border-black/8 bg-white/40 px-4 py-2 text-sm text-[#444a5c]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-medium">verly.app/modules/{type}</span>
          </div>
          <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-[11px] font-semibold text-[#315EEA]">
            Preview
          </span>
        </div>

        {type === "helpdesk" && <HelpdeskCard />}
        {type === "widget" && <ChatWidgetCard />}
        {type === "inbox" && <SharedInboxCard />}
        {type === "knowledge" && <KnowledgeBaseCard />}
        {type === "crm" && <SupportCRMCard />}
        {type === "analytics" && <AnalyticsCard />}
      </div>
      <div className={`grid grid-cols-3 gap-px bg-black/8 bg-gradient-to-r ${accent}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="bg-transparent px-4 py-3 text-center text-white md:px-6">
            <div className="text-[24px] font-semibold leading-none md:text-[30px]">{stat.value}</div>
            <div className="mt-1 text-[11px] font-medium tracking-[0.01em] text-white/85 md:text-[12px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      </div>
    </article>
  );
}

function FeatureIcon({ type }: { type: string }) {
  if (type === "helpdesk") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0Z" />
      </svg>
    );
  }

  if (type === "widget") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M8 10h8M8 14h4m-6.5 5.25 2.1-2.1c.3-.3.7-.46 1.12-.46h8.03A2.25 2.25 0 0019 14.44V6.75A2.25 2.25 0 0016.75 4.5h-9.5A2.25 2.25 0 005 6.75v10.91a1.59 1.59 0 00.5 1.59Z" />
      </svg>
    );
  }

  if (type === "inbox") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3.75 7.5h16.5M6.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V6.75A2.25 2.25 0 016.75 4.5Zm-2.25 8.25h4.125a1.5 1.5 0 011.342.83l.316.63c.254.508.772.83 1.34.83h.756c.568 0 1.086-.322 1.34-.83l.316-.63a1.5 1.5 0 011.342-.83H19.5" />
      </svg>
    );
  }

  if (type === "knowledge") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 6.25v11.5m0-11.5c-1.77-1.44-4.15-2.25-6.75-2.25v13c2.6 0 4.98.8 6.75 2.25m0-13c1.77-1.44 4.15-2.25 6.75-2.25v13c-2.6 0-4.98.8-6.75 2.25" />
      </svg>
    );
  }

  if (type === "crm") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 19.13c.84.24 1.73.37 2.63.37 1.47 0 2.86-.34 4.1-.96a4.12 4.12 0 00-7.53-2.49M15 19.13A12.3 12.3 0 018.62 21c-2.33 0-4.51-.64-6.37-1.76l-.01-.11a6.38 6.38 0 0111.97-3.07M12 6.38a3.38 3.38 0 11-6.75 0 3.38 3.38 0 016.75 0Zm8.25 2.24a2.63 2.63 0 11-5.25 0 2.63 2.63 0 015.25 0Z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.5 19.5V11.25m7.5 8.25V4.5m7.5 15V8.25" />
    </svg>
  );
}

function HelpdeskCard() {
  return (
    <div className="space-y-3 rounded-[24px] bg-[#d8dbf0] p-3">
      <div className="rounded-[20px] border border-black/8 bg-white/35 p-3.5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#315EEA]">Ticket summary</div>
            <div className="mt-1 text-[17px] font-semibold text-[#1f2b46]">Need help with billing</div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
            AI Ready
          </div>
        </div>
        <div className="mb-3 rounded-[18px] bg-white/55 p-3 text-[13px] leading-6 text-[#52586a]">
          Hi, my business is currently facing financial challenges. I was wondering if
          you could offer a short-term discount so we can continue using your subscription.
        </div>
        <div className="rounded-[18px] border border-black/8 bg-white/45 p-3 text-[13px] font-medium text-[#3f4556]">
          Suggested action: offer discount policy details, route to billing owner, and
          attach renewal context.
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-[20px] border border-black/8 bg-white/35 p-2.5">
        <div className="flex-1 rounded-[16px] bg-white/55 px-4 py-3 text-[13px] text-[#6b7792]">
          What’s the approved discount range?
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#315EEA_0%,#5E7BFF_100%)] text-white shadow-md">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChatWidgetCard() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/8 bg-white/35">
      <div className="bg-[#1b2030] px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">Verly Assistant</div>
            <div className="mt-1 text-xs text-blue-100">Replies in under 30 seconds</div>
          </div>
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
      </div>
      <div className="space-y-2.5 bg-[#d8dbf0] p-3.5">
        <div className="max-w-[82%] rounded-[18px] rounded-tl-sm bg-white/80 px-4 py-2.5 text-[13px] leading-5 text-[#42506b]">
          Hi! Want pricing, demo booking, order updates, or onboarding help?
        </div>
        <div className="ml-auto max-w-[76%] rounded-[18px] rounded-tr-sm bg-[linear-gradient(135deg,#315EEA_0%,#5E7BFF_100%)] px-4 py-2.5 text-[13px] text-white">
          Show me pricing for 5 agents.
        </div>
        <div className="rounded-[18px] bg-white/82 px-4 py-2.5 text-[13px] leading-5 text-[#5a6782]">
          The Pro plan is best for your team size and includes chat, inbox, AI helpdesk,
          and analytics.
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white/78 px-4 py-2.5 text-[13px] text-[#7a89aa]">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
          AI is typing...
        </div>
      </div>
    </div>
  );
}

function SharedInboxCard() {
  const channels = [
    { name: "Email", color: "bg-blue-500" },
    { name: "WhatsApp", color: "bg-emerald-500" },
    { name: "Instagram", color: "bg-pink-500" },
    { name: "Messenger", color: "bg-indigo-500" },
  ];

  return (
    <div className="rounded-[22px] border border-black/8 bg-white/35 p-3.5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-[#1f2b46]">Unified Queue</div>
          <div className="mt-1 text-xs text-[#75819d]">All conversations, one workflow</div>
        </div>
        <div className="rounded-full bg-white/55 px-3 py-1 text-[11px] font-bold text-[#315EEA]">24 open</div>
      </div>
      <div className="mb-3 grid grid-cols-4 gap-2">
        {channels.map((channel) => (
          <div key={channel.name} className="rounded-2xl bg-white/45 p-2 text-center">
            <div className={`mx-auto mb-2 h-8 w-8 rounded-xl ${channel.color} shadow-sm`} />
            <div className="text-[11px] font-semibold text-[#5c6c8b]">{channel.name}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          ["Refund follow-up", "High"],
          ["Billing question", "Medium"],
          ["VIP handoff", "Urgent"],
        ].map(([item, priority]) => (
          <div key={item} className="flex items-center justify-between rounded-2xl bg-white/45 px-3 py-2.5">
            <span className="text-[13px] font-medium text-[#42506b]">{item}</span>
            <span className="text-[12px] font-bold text-[#96a5c3]">{priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnowledgeBaseCard() {
  return (
    <div className="rounded-[22px] border border-black/8 bg-white/35 p-3.5">
      <div className="mb-3 rounded-[18px] border border-black/8 bg-white/45 px-4 py-2.5 text-[13px] font-medium text-[#7c89a3]">
        Search articles, answers, and guides...
      </div>
      <div className="space-y-2">
        {[
          "Getting started with AI Helpdesk",
          "Connect WhatsApp in 3 steps",
          "Customize your widget theme",
          "Train AI with your docs",
        ].map((article, idx) => (
          <div key={article} className="flex items-center gap-3 rounded-[18px] bg-white/45 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[12px] font-bold text-emerald-600 shadow-sm">
              {idx + 1}
            </div>
            <div className="text-[13px] font-semibold text-[#42506b]">{article}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportCRMCard() {
  return (
    <div className="rounded-[22px] border border-black/8 bg-white/35 p-3.5">
      <div className="mb-3 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-rose-400 to-rose-600 text-xl font-bold text-white shadow-lg">
          BJ
        </div>
        <div>
          <div className="text-lg font-bold text-[#1f2b46]">Beth Johnson</div>
          <div className="mt-1 text-sm text-[#75819d]">Enterprise account</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Plan", "Premium"],
          ["MRR", "$4,200"],
          ["Health", "Strong"],
          ["Tickets", "47"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[18px] bg-white/45 px-4 py-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-400">{label}</div>
            <div className="mt-2 text-[15px] font-semibold text-[#42506b]">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const bars = [42, 58, 36, 74, 53, 84, 64];

  return (
    <div className="rounded-[22px] border border-black/8 bg-white/35 p-3.5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-[#1f2b46]">Weekly Support Metrics</div>
          <div className="mt-1 text-xs text-[#75819d]">Live performance snapshot</div>
        </div>
        <div className="rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold text-pink-600">+18%</div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3">
        {[
          ["Avg Reply", "1.2m"],
          ["CSAT", "4.8/5"],
          ["Resolved", "847"],
          ["SLA Risk", "3"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[18px] bg-white/45 px-4 py-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#97a4c2]">{label}</div>
            <div className="mt-2 text-[16px] font-semibold text-[#1f2b46]">{value}</div>
          </div>
        ))}
      </div>
      <div className="flex h-20 items-end gap-2 rounded-[18px] bg-white/45 px-3 pb-3 pt-3">
        {bars.map((bar, index) => (
          <div
            key={`${bar}-${index}`}
            className="flex-1 rounded-t-[8px] bg-gradient-to-t from-pink-600 to-pink-400"
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>
    </div>
  );
}
