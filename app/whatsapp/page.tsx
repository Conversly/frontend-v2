import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  MessageSquare,
  PhoneCall,
  Send,
  ShoppingBag,
  Ticket,
  Users,
  Zap,
} from "lucide-react";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";
import { siteConfig } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "WhatsApp AI Agent for Customer Support — Verly",
  description:
    "Deploy a WhatsApp AI agent that answers customer questions, books appointments, and handles orders — with the same agent that runs your voice and web chat. Live in 10 minutes.",
  alternates: { canonical: "/whatsapp" },
  openGraph: {
    title: "WhatsApp AI Agent for Customer Support — Verly",
    description:
      "One AI agent for WhatsApp, voice, and web chat. Order updates, appointment booking, support — answered where your customers already message.",
    url: `${siteConfig.url}/whatsapp`,
    type: "website",
  },
  twitter: {
    title: "WhatsApp AI Agent for Customer Support — Verly",
    description:
      "Deploy a WhatsApp AI agent that answers, books, and resolves — with the same brain as your voice and web chat agent.",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "WhatsApp AI", path: "/whatsapp" },
]);

const steps = [
  {
    index: "01",
    title: "Connect your WhatsApp Business number",
    description:
      "Plug in an existing WhatsApp Business account or get one provisioned. Templates, opt-ins, and number routing handled.",
  },
  {
    index: "02",
    title: "Ground the agent in your business",
    description:
      "Sync your help center, product catalog, FAQs, and order data. The agent answers from your real content — not a generic LLM.",
  },
  {
    index: "03",
    title: "Go live across every channel",
    description:
      "The same agent handles WhatsApp, voice calls, and web chat — with shared memory and one place to tune prompts before they ship.",
  },
];

const useCases = [
  {
    icon: ShoppingBag,
    title: "Order updates and tracking",
    description:
      "Customers ask “where’s my order?” on WhatsApp. The agent pulls live shipping data and answers — no human needed for the routine 80%.",
  },
  {
    icon: Ticket,
    title: "Appointment booking",
    description:
      "Salons, clinics, and services teams get booking requests on WhatsApp. The agent checks availability, books, and confirms.",
  },
  {
    icon: Users,
    title: "Lead qualification",
    description:
      "Inbound leads message you on WhatsApp. The agent qualifies, captures requirements, and hands warm leads to your sales team.",
  },
  {
    icon: Zap,
    title: "Broadcast + 1:1 follow-up",
    description:
      "Send announcements at scale, then let the agent handle the replies that come back. No pile-up. No missed conversations.",
  },
];

const platformItems = [
  "WhatsApp Business API",
  "Template messages",
  "Broadcast campaigns",
  "Order + CRM sync",
  "Human handoff",
  "Conversation analytics",
];

export default function WhatsAppPage() {
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
        <div className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[700px] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,217,158,0.22)_0%,rgba(76,175,128,0.18)_22%,rgba(34,89,72,0.10)_44%,rgba(5,8,22,0.0)_70%)] blur-[72px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(94,217,158,0.06),transparent)]" />

        <div className="relative mx-auto flex w-full max-w-[1380px] flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 lg:px-10 lg:pt-44">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-[#5ed99e]/25 bg-[#5ed99e]/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#92f2bd] backdrop-blur-sm">
            <MessageSquare className="h-3.5 w-3.5" />
            Verly WhatsApp
          </div>

          <h1 className="mt-10 max-w-[960px] text-[clamp(3rem,7vw,6rem)] font-light leading-[0.94] tracking-[-0.06em]">
            <span className="block text-[#8a99bb]">Answer your customers</span>
            <span className="mt-1 block bg-gradient-to-b from-[#ffffff] to-[#bce3d1] bg-clip-text text-transparent">
              where they already message you.
            </span>
          </h1>

          <p className="mt-7 max-w-[720px] text-[1.02rem] leading-8 text-[#c4ceea] sm:text-[1.14rem]">
            Verly answers WhatsApp in your customer&rsquo;s language, pulls
            account and order context, and books, qualifies, or escalates in
            the same conversation. The same agent also handles voice and web
            chat — so context follows the customer, even when the channel
            changes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Order updates", "Appointment booking", "Lead qualification"].map((item) => (
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
              className="inline-flex h-12 min-w-[178px] items-center justify-center gap-2 rounded-full bg-[#5ed99e] px-8 text-[15px] font-semibold text-[#08111f] shadow-[0_0_32px_rgba(94,217,158,0.35)] transition-all hover:bg-[#7ce4b1] hover:shadow-[0_0_44px_rgba(94,217,158,0.5)]"
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
            Live in 10 minutes. No credit card. Cancel in one click.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[640px] text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#92f2bd]">
              §01 · How it works
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.04em] text-white">
              From WhatsApp Business number to live agent — before lunch.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.index}
                className="relative rounded-[26px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm"
              >
                <div className="text-[12px] font-semibold tracking-[0.2em] text-[#5ed99e]">
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#92f2bd]">
              §02 · What teams do with it
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.04em] text-white">
              Four ways teams already use Verly on WhatsApp.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {useCases.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[26px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5ed99e]/10 text-[#5ed99e]">
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

      {/* Platform features */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#92f2bd]">
                §03 · Platform
              </div>
              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.12] tracking-[-0.04em] text-white">
                Everything you need to run WhatsApp support — without stitching three tools.
              </h2>
              <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-[#9aa8c8]">
                Templates, broadcasts, CRM sync, human handoff, and analytics
                live in the same workspace as your voice and web chat agent.
                One inbox. One audit trail. One place to ship changes.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {platformItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] text-[#dce4f5] backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5ed99e]" />
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#92f2bd]">
              §04 · One agent · Three channels
            </div>
            <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.12] tracking-[-0.04em] text-white">
              The same agent handles voice and web chat too.
            </h2>
            <p className="mt-6 text-[16px] leading-8 text-[#9aa8c8]">
              When a customer messages on WhatsApp, then calls, then opens
              your website chat — it&rsquo;s the same conversation. Same
              memory. Same brand voice. No re-explaining.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[960px] gap-4 sm:grid-cols-3">
            <Link
              href="/voice"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4 text-[#92f2bd]" />
                Voice AI
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/web-chat"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Send className="h-4 w-4 text-[#92f2bd]" />
                Web chat
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/integrations"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 py-4 text-[15px] text-white transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-[#92f2bd]" />
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
            Your customers already message you.
            <span className="mt-2 block bg-gradient-to-b from-[#ffffff] to-[#bce3d1] bg-clip-text text-transparent">
              Now your agent answers.
            </span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 min-w-[178px] items-center justify-center gap-2 rounded-full bg-[#5ed99e] px-8 text-[15px] font-semibold text-[#08111f] shadow-[0_0_32px_rgba(94,217,158,0.35)] transition-all hover:bg-[#7ce4b1]"
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
