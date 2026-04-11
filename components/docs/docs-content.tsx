"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  Headphones,
  Mic,
  MessageSquare,
  Plug,
  Rocket,
  Search,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

const DOCS_BASE = "https://docs.verlyai.xyz";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const docSections = [
  {
    title: "Getting Started",
    description: "Set up your account, create your first agent, and learn the basics.",
    icon: Rocket,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    items: [
      { label: "Welcome to Verly", href: "/getting-started/welcome-to-verlyai" },
      { label: "Build Your First AI Agent", href: "/getting-started/build-your-first-ai-agent" },
      { label: "Roles and Permissions", href: "/getting-started/roles-and-permissions" },
      { label: "Best Practices", href: "/getting-started/best-practices" },
    ],
  },
  {
    title: "AI Chatbot Management",
    description: "Configure, test, and deploy your AI agents with full control.",
    icon: Bot,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    items: [
      { label: "Playground", href: "/ai-chatbot-management/playground" },
      { label: "Customization", href: "/ai-chatbot-management/customization" },
      { label: "Behaviour", href: "/ai-chatbot-management/behaviour" },
      { label: "Deployment", href: "/ai-chatbot-management/deployment" },
    ],
  },
  {
    title: "Knowledge & Training",
    description: "Train your AI with data sources, actions, and custom tools.",
    icon: BrainCircuit,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    items: [
      { label: "Data Sources", href: "/knowledge-and-training/data-sources" },
      { label: "Actions & Tools", href: "/knowledge-and-training/actions-and-tools" },
    ],
  },
  {
    title: "Analytics",
    description: "Track performance, monitor conversations, and capture leads.",
    icon: BarChart3,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    items: [
      { label: "Statistics", href: "/analytics/statistics" },
      { label: "Topics", href: "/analytics/topics" },
      { label: "Chat Logs", href: "/analytics/chat-logs" },
      { label: "Leads", href: "/analytics/leads" },
    ],
  },
  {
    title: "Human Escalations",
    description: "Set up seamless AI-to-human handoff and manage live support.",
    icon: Headphones,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    items: [
      { label: "Escalation Analytics", href: "/human-escalations/escalation-analytics" },
      { label: "Live Inbox", href: "/human-escalations/live-inbox" },
    ],
  },
  {
    title: "Channels",
    description: "Connect your AI to WhatsApp, web, and other platforms.",
    icon: MessageSquare,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    items: [
      { label: "WhatsApp", href: "/channels/whatsapp" },
      { label: "Website Integration", href: "/channels/integration" },
    ],
  },
  {
    title: "Voice Agents",
    description: "Build and deploy AI-powered voice agents for phone support.",
    icon: Mic,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    items: [
      { label: "Voice Overview", href: "/voice-agents/overview" },
    ],
  },
];

const quickLinks = [
  {
    icon: Sparkles,
    title: "Build Your First Agent",
    description: "Get an AI chatbot live on your website in under 5 minutes.",
    href: `${DOCS_BASE}/getting-started/build-your-first-ai-agent`,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    label: "5 min read",
  },
  {
    icon: LayoutDashboard,
    title: "Playground",
    description: "Test and refine your AI agent before deploying it.",
    href: `${DOCS_BASE}/ai-chatbot-management/playground`,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Guide",
  },
  {
    icon: Plug,
    title: "Website Integration",
    description: "Add the chatbot widget to your website with one code snippet.",
    href: `${DOCS_BASE}/channels/integration`,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    label: "Setup",
  },
  {
    icon: Headphones,
    title: "Human Escalations",
    description: "Set up seamless AI-to-human handoff for your team.",
    href: `${DOCS_BASE}/human-escalations/live-inbox`,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    label: "Guide",
  },
];

const WRAP = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

const sectionLabelClass =
  "inline-flex items-center gap-2 rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm";

export default function DocsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const allItems = useMemo(
    () =>
      docSections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          section: section.title,
          icon: section.icon,
          iconColor: section.iconColor,
        }))
      ),
    []
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    );
  }, [searchQuery, allItems]);

  return (
    <>
      {/* ─────── Hero ─────── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,118,255,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(240,198,116,0.10),transparent_30%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />

        <motion.div
          className={WRAP}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <motion.div variants={fadeUp}>
              <span className={sectionLabelClass}>
                <BookOpen className="h-3.5 w-3.5" />
                Documentation
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-7 max-w-[720px] font-[Georgia,serif] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.08] tracking-[-0.04em] text-[#221f1b]"
            >
              Everything you need to build with{" "}
              <span className="text-[#6e6558]">Verly</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.7] text-[#6d665d] md:text-[17px]"
            >
              Guides, references, and tutorials to set up AI agents, connect
              channels, and manage support — all in one place.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} className="mx-auto mt-9 max-w-[520px]">
              <div className="group relative">
                <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8] transition-colors group-focus-within:text-[#315EEA]" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-[#d6d9e2] bg-white/78 py-3.5 pl-11 pr-4 text-[15px] text-[#221f1b] shadow-[0_16px_30px_rgba(58,47,25,0.06)] backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-[#94a3b8] focus:border-[#315EEA]/30 focus:bg-white focus:shadow-[0_16px_30px_rgba(58,47,25,0.08),0_0_0_3px_rgba(49,94,234,0.08)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-[12px] font-medium text-[#94a3b8] transition-colors hover:text-[#221f1b]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {filteredItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-xl border border-[#e3e7f0] bg-white p-2 shadow-[0_20px_60px_rgba(27,36,64,0.10)]"
                >
                  {filteredItems.slice(0, 6).map((item) => (
                    <a
                      key={item.href}
                      href={`${DOCS_BASE}${item.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#f6f8ff]"
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${item.iconColor}`} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-medium text-[#221f1b]">
                          {item.label}
                        </div>
                        <div className="text-[12px] text-[#7f8db0]">
                          {item.section}
                        </div>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#c8cfdd]" />
                    </a>
                  ))}
                </motion.div>
              )}

              {searchQuery.trim() && filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-xl border border-[#e3e7f0] bg-white px-4 py-6 text-center shadow-[0_20px_60px_rgba(27,36,64,0.10)]"
                >
                  <p className="text-[14px] text-[#7f8db0]">
                    No results found. Try a different search term or{" "}
                    <a
                      href={DOCS_BASE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#315EEA] hover:underline"
                    >
                      browse all docs
                    </a>
                    .
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─────── Quick start cards ─────── */}
      <section className="pb-16 md:pb-20">
        <div className={WRAP}>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {quickLinks.map((link) => (
              <motion.a
                key={link.title}
                variants={scaleIn}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-[#e3e7f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(244,247,255,0.92)_100%)] p-5 shadow-[0_4px_20px_rgba(27,36,64,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8cfdd] hover:shadow-[0_20px_46px_rgba(27,36,64,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.iconBg}`}>
                    <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                  </div>
                  <span className="rounded-full border border-[#dae4ff] bg-[#eef3ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#4764b2]">
                    {link.label}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#221f1b]">
                  {link.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-[1.6] text-[#6d665d]">
                  {link.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#315EEA] transition-all group-hover:gap-2.5">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Browse by topic ─────── */}
      <section className="relative py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.05),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.70)_0%,rgba(246,249,255,0.96)_100%)] md:inset-x-6" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />

        <div className={`${WRAP} relative z-10`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="mb-6">
              <span className={sectionLabelClass}>Topics</span>
            </div>
            <h2 className="font-[Georgia,serif] text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-[#221f1b]">
              Browse by topic
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-[#6d665d]">
              Dive deep into each area of the platform.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {docSections.map((section) => (
              <motion.div
                key={section.title}
                variants={scaleIn}
                className="group rounded-2xl border border-[#e3e7f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(244,247,255,0.92)_100%)] p-6 shadow-[0_4px_20px_rgba(27,36,64,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8cfdd] hover:shadow-[0_20px_46px_rgba(27,36,64,0.08)]"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}>
                    <section.icon className={`h-5 w-5 ${section.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold text-[#221f1b]">
                      {section.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-[1.5] text-[#7f8db0]">
                      {section.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={`${DOCS_BASE}${item.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] text-[#44506d] transition-all duration-150 hover:bg-white/80 hover:text-[#221f1b]"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c8cfdd] transition-colors group-hover/link:bg-[#315EEA]" />
                          {item.label}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#c8cfdd] opacity-0 transition-all duration-150 group-hover/link:opacity-100 group-hover/link:text-[#315EEA]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── CTA banner (dark navy — same as about page) ─────── */}
      <section className="pb-20 md:pb-24">
        <div className={WRAP}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0f172a] px-8 py-12 text-center md:px-16 md:py-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,128,241,0.14),transparent_40%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative">
              <h2 className="mx-auto max-w-[480px] font-[Georgia,serif] text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] tracking-[-0.03em] text-white">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mx-auto mt-3 max-w-[400px] text-[15px] leading-[1.6] text-white/55">
                Explore the full documentation or reach out to our team for help.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={DOCS_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#0f172a] shadow-[0_18px_40px_rgba(20,25,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_22px_46px_rgba(20,25,35,0.24)]"
                >
                  Open full docs
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:support@verlyai.xyz"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
                >
                  Contact support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
