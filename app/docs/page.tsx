import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  Headphones,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Mic,
  Phone,
  Plug,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Documentation | VerlyAI",
  description:
    "Explore VerlyAI documentation — setup guides, AI chatbot management, knowledge training, analytics, human escalations, channels, and voice agents.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentation | VerlyAI",
    description:
      "Explore VerlyAI documentation — setup guides, AI chatbot management, knowledge training, analytics, channels, and more.",
    url: "https://verlyai.xyz/docs",
  },
};

const DOCS_BASE = "https://docs.verlyai.xyz";

const docSections = [
  {
    title: "Getting Started",
    icon: Rocket,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: [
      { label: "Welcome to Verly", href: "/getting-started/welcome-to-verlyai" },
      { label: "Build Your First AI Agent", href: "/getting-started/build-your-first-ai-agent" },
      { label: "Roles and Permissions", href: "/getting-started/roles-and-permissions" },
      { label: "Best Practices", href: "/getting-started/best-practices" },
    ],
  },
  {
    title: "AI Chatbot Management",
    icon: Bot,
    color: "text-violet-600",
    bg: "bg-violet-50",
    items: [
      { label: "Playground", href: "/ai-chatbot-management/playground" },
      { label: "Customization", href: "/ai-chatbot-management/customization" },
      { label: "Behaviour", href: "/ai-chatbot-management/behaviour" },
      { label: "Deployment", href: "/ai-chatbot-management/deployment" },
    ],
  },
  {
    title: "Knowledge & Training",
    icon: BrainCircuit,
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      { label: "Data Sources", href: "/knowledge-and-training/data-sources" },
      { label: "Actions & Tools", href: "/knowledge-and-training/actions-and-tools" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    color: "text-orange-600",
    bg: "bg-orange-50",
    items: [
      { label: "Statistics", href: "/analytics/statistics" },
      { label: "Topics", href: "/analytics/topics" },
      { label: "Chat Logs", href: "/analytics/chat-logs" },
      { label: "Leads", href: "/analytics/leads" },
    ],
  },
  {
    title: "Human Escalations",
    icon: Headphones,
    color: "text-rose-600",
    bg: "bg-rose-50",
    items: [
      { label: "Escalation Analytics", href: "/human-escalations/escalation-analytics" },
      { label: "Live Inbox", href: "/human-escalations/live-inbox" },
    ],
  },
  {
    title: "Channels",
    icon: MessageSquare,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    items: [
      { label: "WhatsApp", href: "/channels/whatsapp" },
      { label: "Integration", href: "/channels/integration" },
    ],
  },
  {
    title: "Voice Agents",
    icon: Mic,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
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
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: LayoutDashboard,
    title: "Playground",
    description: "Test and refine your AI agent before deploying it.",
    href: `${DOCS_BASE}/ai-chatbot-management/playground`,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Plug,
    title: "Integrations",
    description: "Connect Verly to WhatsApp, your website, and more.",
    href: `${DOCS_BASE}/channels/integration`,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Headphones,
    title: "Human Escalations",
    description: "Set up seamless AI-to-human handoff for your team.",
    href: `${DOCS_BASE}/human-escalations/live-inbox`,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const WRAP = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

export default function DocsPage() {
  return (
    <main className="relative min-h-screen bg-[#fcfcfd] text-[#0f1e35] selection:bg-blue-100">
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pb-14 pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,94,234,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.06),transparent_28%)]" />
          <div className={WRAP}>
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#dcdfea] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#315EEA] shadow-sm">
                <BookOpen className="h-4 w-4" />
                Documentation
              </div>
              <h1 className="mx-auto mt-6 max-w-[700px] font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-[#221f1b]">
                Learn how to build with Verly
              </h1>
              <p className="mx-auto mt-4 max-w-[580px] text-[16px] leading-7 text-[#6d665d] md:text-[17px]">
                Guides, references, and tutorials to help you set up AI agents, connect channels, and manage support operations.
              </p>
              <div className="mt-8">
                <a
                  href={DOCS_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#315EEA] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(49,94,234,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2850d0]"
                >
                  Open full documentation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick start cards */}
        <section className="pb-16">
          <div className={WRAP}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-[#eaecf5] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c6d7ff] hover:shadow-md"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.bg}`}>
                    <link.icon className={`h-5 w-5 ${link.color}`} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-[#242f47]">
                    {link.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-5 text-[#5d6b98]">
                    {link.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#315EEA] transition-colors group-hover:text-[#1d47c4]">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* All doc sections */}
        <section className="pb-24">
          <div className={WRAP}>
            <h2 className="mb-8 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-[#221f1b]">
              Browse by topic
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {docSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-[#eaecf5] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${section.bg}`}>
                      <section.icon className={`h-4 w-4 ${section.color}`} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#242f47]">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-1">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={`${DOCS_BASE}${item.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-lg px-3 py-2 text-[14px] text-[#5d6b98] transition-colors hover:bg-[#f8f9fd] hover:text-[#242f47]"
                        >
                          {item.label}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={WRAP}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
