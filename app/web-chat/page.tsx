import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe2,
  MessageSquareMore,
  PhoneCall,
  Send,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";
import { siteConfig } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "AI Chatbot for Your Website — Verly Web Chat",
  description:
    "Drop an AI support agent on your website in 10 minutes. Trained on your docs, answers in your tone, hands off to humans when it matters. Same agent runs WhatsApp and voice.",
  alternates: { canonical: "/web-chat" },
  openGraph: {
    title: "AI Chatbot for Your Website — Verly Web Chat",
    description:
      "An AI support agent on your website that answers from your docs, books actions, and hands off to humans. One agent across web, WhatsApp, and voice.",
    url: `${siteConfig.url}/web-chat`,
    type: "website",
  },
  twitter: {
    title: "AI Chatbot for Your Website — Verly Web Chat",
    description:
      "Drop an AI support agent on your website in 10 minutes. Same agent runs WhatsApp and voice.",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Web Chat", path: "/web-chat" },
]);

const steps = [
  {
    index: "01",
    title: "Sync your docs and help center",
    description:
      "Point Verly at your help center URL, Notion, GitBook, or Confluence. The agent reads, indexes, and stays in sync as you publish.",
  },
  {
    index: "02",
    title: "Tune the agent in dev",
    description:
      "Edit prompts, tone, and rules on a dev branch. Preview real conversations. Promote to live when it’s clean — roll back in one click if not.",
  },
  {
    index: "03",
    title: "Drop the widget on your site",
    description:
      "Paste one script tag or use the React SDK. Customize colors, position, and triggers. The agent is live before your next standup.",
  },
];

const useCases = [
  {
    icon: Sparkles,
    title: "Product and pricing questions",
    description:
      "Visitors ask “does it support X?” or “how does pricing work?” The agent answers from your real docs — no hallucinated specs.",
  },
  {
    icon: Users,
    title: "Onboarding inside the product",
    description:
      "Point logged-in users at the agent for setup help. Account context, current plan, and recent activity all available — no re-explaining.",
  },
  {
    icon: Zap,
    title: "Pre-purchase chat",
    description:
      "Convert browsing visitors. The agent answers objections, recommends the right plan, and books a demo when sales-assist is needed.",
  },
  {
    icon: MessageSquareMore,
    title: "Self-serve support",
    description:
      "Customers ask billing, feature, and how-to questions. The agent answers, takes the action, and only escalates when it actually needs a human.",
  },
];

const platformItems = [
  "Drop-in script tag",
  "React SDK + custom UI",
  "Live docs sync",
  "Brand and tone controls",
  "Human handoff to your inbox",
  "Conversation analytics",
];

export default function WebChatPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050816] text-[#f6f1e6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-[#040710]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[700px] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(127,149,255,0.22)_0%,rgba(104,124,240,0.18)_22%,rgba(56,68,160,0.10)_44%,rgba(5,8,22,0.0)_70%)] blur-[72px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(127,149,255,0.06),transparent)]" />

        <div className="relative mx-auto flex w-full max-w-[1380px] flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 lg:px-10 lg:pt-44">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-[#7f95ff]/25 bg-[#7f95ff]/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#a9b8ff] backdrop-blur-sm">
            <MessageSquareMore className="h-3.5 w-3.5" />
            Verly Web Chat
          </div>

          <h1 className="mt-10 max-w-[960px] text-[clamp(3rem,7vw,6rem)] font-light leading-[0.94] tracking-[-0.06em]">
            <span className="block text-[#8a99bb]">An AI support agent on</span>
            <span className="mt-1 block bg-gradient-to-b from-[#ffffff] to-[#c2cdfa] bg-clip-text text-transparent">
              your website. Live in 10 minutes.
            </span>
          </h1>

          <p className="mt-7 max-w-[720px] text-[1.02rem] leading-8 text-[#c4ceea] sm:text-[1.14rem]">
            Trained on your docs, answers in your tone, takes actions on your
            APIs, and hands off to a human when the conversation needs one.
            The same agent also handles WhatsApp and voice — so context
            follows the customer, even when the channel changes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Product questions", "Onboarding help", "Self-serve support"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.10] bg-white/[0.035] px-4 py-2 text-sm text-[#c8d6f0] backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 min-w-[178px] items-center justify-center gap-2 rounded-full bg-[#7f95ff] px-8 text-[15px] font-semibold text-[#08111f] shadow-[0_0_32px_rgba(127,149,255,0.35)] transition-all hover:bg-[#9aabff] hover:shadow-[0_0_44px_rgba(127,149,255,0.5)]"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[178px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-8 text-[15px] font-semibold text-[#faf4ea] backdrop-blur-sm transition-all hover:bg-white/[0.08]"
            >
              Book a 20-min demo
            </Link>
          </div>

          <p className="mt-6 text-[13px] text-[#8a99bb]">
            One script tag. No credit card. Cancel in one click.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[640px] text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a9b8ff]">
              §01 · How it works
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.04em] text-white">
              From docs URL to live chat — before lunch.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.index}
                className="relative rounded-[26px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm"
              >
                <div className="text-[12px] font-semibold tracking-[0.2em] text-[#7f95ff]">
                  {step.index}
                </div>
                <h3 className="mt-4 text-[1.3rem] font-medium tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#9aa8c8]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a9b8ff]">
              §02 · What teams do with it
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.04em] text-white">
              Four ways teams already use Verly on their site.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {useCases.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[26px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7f95ff]/10 text-[#7f95ff]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[1.25rem] font-medium tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#9aa8c8]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a9b8ff]">
                §03 · Platform
              </div>
              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.12] tracking-[-0.04em] text-white">
                Built for teams who want to ship support like software.
              </h2>
              <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-[#9aa8c8]">
                Branch your prompts in dev, preview before you ship, roll
                back in one click. The same agent handles WhatsApp and voice
                — one inbox, one audit trail, one place to make changes.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-[#c8d6f0]">
                <Code2 className="h-4 w-4 text-[#7f95ff]" />
                Drop-in script tag · React SDK · Headless API
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {platformItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] text-[#dce4f5] backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7f95ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sister channels */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a9b8ff]">
              §04 · One agent · Three channels
            </div>
            <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.12] tracking-[-0.04em] text-white">
              The same agent handles WhatsApp and voice too.
            </h2>
            <p className="mt-6 text-[16px] leading-8 text-[#9aa8c8]">
              When a customer asks a question on chat, then messages
              WhatsApp, then calls — it&rsquo;s the same agent, the same
              memory, the same brand voice. No re-explaining.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[960px] gap-4 sm:grid-cols-3">
            <Link
              href="/voice"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4 text-[#a9b8ff]" />
                Voice AI
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/whatsapp"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Send className="h-4 w-4 text-[#a9b8ff]" />
                WhatsApp
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/integrations"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-[#a9b8ff]" />
                Integrations
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10 text-center">
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.05em] text-white">
            Stop sending visitors to a contact form.
            <span className="mt-2 block bg-gradient-to-b from-[#ffffff] to-[#c2cdfa] bg-clip-text text-transparent">
              Answer them now.
            </span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 min-w-[178px] items-center justify-center gap-2 rounded-full bg-[#7f95ff] px-8 text-[15px] font-semibold text-[#08111f] shadow-[0_0_32px_rgba(127,149,255,0.35)] transition-all hover:bg-[#9aabff]"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[178px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-8 text-[15px] font-semibold text-[#faf4ea] backdrop-blur-sm transition-all hover:bg-white/[0.08]"
            >
              Book a 20-min demo
            </Link>
          </div>
        </div>
      </section>

      <Footer hideCta />
      <StickyMobileCta />
    </main>
  );
}
