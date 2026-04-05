"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import {
  ArrowRight,
  AudioLines,
  BrainCircuit,
  Calendar,
  ChevronRight,
  Clock3,
  Globe2,
  LineChart,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  RadioTower,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openCalendlyPopup } from "@/lib/calendly";
import { PublicVoiceDemo } from "@/components/voice-marketing/public-voice-demo";

const workflowCards = [
  {
    index: "001",
    title: "Design the workflow",
    description:
      "Craft natural, branching conversational paths for inbound support, lead qualification, or callback automation.",
    visual: WorkflowBarsVisual,
  },
  {
    index: "002",
    title: "Ground in knowledge",
    description:
      "Connect your specific FAQs, live account status, and custom tools so every action is contextual and accurate.",
    visual: WorkflowGridVisual,
  },
  {
    index: "003",
    title: "Deploy anywhere",
    description:
      "Publish your agent to the website or phone line instantly. Measure outcomes, handoffs, and resolve rates live.",
    visual: WorkflowBurstVisual,
  },
] as const;

const useCases = [
  {
    icon: Globe2,
    title: "Website voice widget",
    description:
      "Let visitors speak with your support workflow directly from the website and route them to the next action.",
    accent: "blue",
  },
  {
    icon: PhoneIncoming,
    title: "Inbound support line",
    description:
      "Resolve repeat support questions, verify context, and escalate edge cases with a clear summary.",
    accent: "mint",
  },
  {
    icon: PhoneForwarded,
    title: "Outbound qualification",
    description:
      "Run voice follow-up flows for callbacks, lead qualification, and reactivation without rebuilding orchestration.",
    accent: "gold",
  },
  {
    icon: Clock3,
    title: "Callback automation",
    description:
      "Recover missed conversations, confirm next steps, and keep follow-up moving even when humans are offline.",
    accent: "lavender",
  },
] as const;

const platformItems = [
  "Knowledge grounding",
  "Custom actions",
  "Phone numbers",
  "Voice campaigns",
  "Conversation analytics",
  "Human handoff",
];

export function VoiceMarketingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#f6f1e6]">
      <HeroSection />
      <WorkflowSection />
      <SupportShowcaseSection />
      <OutboundShowcaseSection />
      <UseCasesSection />
      <PlatformSection />
      <FinalCtaSection />
    </div>
  );
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Base dark background */}
      <div className="pointer-events-none absolute inset-0 bg-[#040710]" />

      {/* Nester-style: Fine grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Nester-style: Giant bottom-horizon radial glow — the hero centerpiece */}
      <div className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[700px] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(138,240,190,0.22)_0%,rgba(104,145,255,0.28)_18%,rgba(80,110,240,0.14)_38%,rgba(5,8,22,0.0)_66%)] blur-[72px]" />

      {/* Secondary outer glow ring for depth */}
      <div className="pointer-events-none absolute -bottom-[20%] left-1/2 h-[500px] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(141,220,255,0.10)_0%,rgba(104,145,255,0.06)_40%,transparent_70%)] blur-[48px]" />

      {/* Soft top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(104,145,255,0.06),transparent)]" />

      {/* Left floating orb */}
      <div className="pointer-events-none absolute left-[-8%] top-[30%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(138,240,190,0.08)_0%,transparent_70%)] blur-[80px]" />
      {/* Right floating orb */}
      <div className="pointer-events-none absolute right-[-6%] top-[20%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(104,145,255,0.10)_0%,transparent_70%)] blur-[60px]" />

      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col items-center px-5 pb-14 pt-34 text-center sm:px-8 lg:px-10 lg:pt-42">
        {/* Animated pill badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-flex items-center gap-2 rounded-full border border-[#8af0be]/25 bg-[#8af0be]/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#92f2bd] backdrop-blur-sm"
        >
          {/* Animated glow behind pill */}
          <motion.span
            animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-[#8af0be]/10 blur-[8px]"
          />
          <AudioLines className="h-3.5 w-3.5" />
          Verly Voice Platform
        </motion.div>

        <div className="mt-10 flex max-w-[980px] flex-col items-center">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
            className="max-w-[960px] text-[clamp(3.4rem,7.5vw,6.6rem)] font-light leading-[0.92] tracking-[-0.07em]"
          >
            <span className="block text-[#8a99bb]">AI voice support</span>
            <span className="mt-1 block bg-gradient-to-b from-[#ffffff] to-[#b8ccee] bg-clip-text text-transparent [text-shadow:none]">
              for the helpdesk era
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.14, ease: "easeOut" }}
            className="mt-7 max-w-[690px] text-[1.02rem] leading-8 text-[#c4ceea] sm:text-[1.14rem]"
          >
            Verly gives support teams one voice system for website voice widget
            experiences, inbound calls, escalation and handoff, plus outbound
            qualification and callback automation when needed.
          </motion.p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.18, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {["Inbound support", "Website voice widget", "Human handoff"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.10] bg-white/[0.035] px-4 py-2 text-sm text-[#c8d6f0] backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="relative h-13 min-w-[178px] overflow-hidden rounded-full bg-[#8af0be] px-8 text-[15px] font-semibold text-[#08111f] shadow-[0_0_32px_rgba(138,240,190,0.35)] transition-all hover:bg-[#9bf4c8] hover:shadow-[0_0_44px_rgba(138,240,190,0.5)]"
          >
            <Link href="/login">
              Start building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => void openCalendlyPopup()}
            className="h-13 min-w-[178px] rounded-full border-white/[0.12] bg-white/[0.04] px-8 text-[15px] font-semibold text-[#faf4ea] backdrop-blur-sm hover:bg-white/[0.08]"
          >
            Book a demo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.26, ease: "easeOut" }}
          className="mt-14 w-full"
        >
          <HeroWaveStage />
        </motion.div>
      </div>
    </section>
  );
}

function HeroWaveStage() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,16,36,0.9),rgba(4,7,16,0.98))] px-4 pb-0 pt-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_100px_rgba(0,0,0,0.38)] sm:px-8">
      {/* Fine inner grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Dramatic bottom horizon glow */}
      <div className="pointer-events-none absolute -bottom-[10%] left-1/2 h-[380px] w-[110%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(138,240,190,0.18)_0%,rgba(104,145,255,0.22)_20%,rgba(60,80,200,0.08)_44%,transparent_68%)] blur-[56px]" />

      {/* Subtle top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(104,145,255,0.04),transparent)]" />

      {/* Live voice demo */}
      <PublicVoiceDemo />
    </div>
  );
}

function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-22 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="How it works"
        title="Build in minutes. Command voice surfaces in days."
        description="Keep your path frictionless: map your ideal workflow, connect your specialized knowledge, and launch the exact same intelligent Verly logic wherever conversations begin."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {workflowCards.map((card, index) => {
          const Visual = card.visual;

          return (
            <motion.article
              key={card.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group flex flex-col rounded-[32px] border border-white/5 bg-[#0a0f1d] p-8 shadow-[0_12px_44px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0c1222] sm:p-10"
            >
              <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#aebbd6]">
                STEP {card.index}
              </div>
              <div className="mt-10 flex min-h-[260px] items-center justify-center rounded-[24px] border border-white/[0.03] bg-[#050812] shadow-inner transition-colors duration-300 group-hover:bg-[#070b16]">
                <Visual />
              </div>
              <h3 className="mt-10 text-2xl font-medium tracking-tight text-[#f4f7fc]">
                {card.title}
              </h3>
              <p className="mt-4 text-[1.05rem] leading-[1.65] text-[#8e9fbf]">
                {card.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function SupportShowcaseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-4 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col justify-between rounded-[32px] border border-white/8 bg-[#070b18] p-8"
        >
          <div>
            <div className="text-sm font-medium text-[#8ddcff]">Inbound support</div>
            <h2 className="mt-4 text-4xl font-light leading-[1.02] tracking-[-0.05em] text-[#faf4ea] sm:text-5xl">
              Resolve more calls before your team ever has to pick them up.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#b8c2db]">
              Verly answers common questions, uses knowledge and actions mid-call,
              and escalates complex cases with the right summary already prepared.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Ground answers in support docs and customer context",
                "Trigger tools for live account or order status checks",
                "Escalate low-confidence cases with full call history",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#8af0be]" />
                  <p className="text-sm leading-7 text-[#d6deee]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-[#f3ede0] px-6 text-[#0b1220] hover:bg-white"
              >
                <Link href="/login">
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => void openCalendlyPopup()}
                className="h-12 rounded-full border-white/12 bg-transparent px-6 text-[#faf4ea] hover:bg-white/[0.05]"
              >
                Book a demo
              </Button>
            </div>
          </div>

          <div className="mt-10 rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-medium text-[#92f2bd]">Support outcome</div>
            <p className="mt-3 text-base leading-7 text-[#d7deee]">
              Voice should not just sound natural. It should resolve issues,
              fetch information, and know when to hand the call to a human.
            </p>
          </div>
        </motion.div>

        <InboundSupportVisual />
      </div>
    </section>
  );
}

function OutboundShowcaseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-22 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-8"
        >
          <div className="text-sm font-medium text-[#f3de62]">Outbound follow-up</div>
          <h2 className="mt-4 max-w-2xl text-3xl font-light leading-[1.04] tracking-[-0.05em] text-[#faf4ea] sm:text-4xl">
            Reuse the same voice system for qualification, callbacks, and campaign follow-up.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#b5bfd8]">
            Once support is covered, the same Verly voice layer can qualify leads,
            revive conversations, and move callers into the next action without
            creating a second orchestration stack.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MiniStatCard
              icon={PhoneForwarded}
              title="Lead qualification"
              text="Capture intent and route warm prospects."
              accent="mint"
            />
            <MiniStatCard
              icon={RadioTower}
              title="Campaign sequences"
              text="Run voice outreach from one workflow layer."
              accent="blue"
            />
            <MiniStatCard
              icon={Clock3}
              title="Callback recovery"
              text="Bring missed opportunities back into motion."
              accent="gold"
            />
          </div>
        </motion.div>

        <OutboundSupportVisual />
      </div>
    </section>
  );
}

function UseCasesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-2 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Use cases"
        title="One voice surface, many support motions."
        description="The page should feel like a product platform, not a single demo. These are the practical ways teams can deploy Verly voice."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {useCases.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-[30px] border border-white/8 bg-[#070b18] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 flex min-h-[180px] items-center justify-center rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
                <UseCaseVisual accent={item.accent} />
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border",
                  item.accent === "blue" && "border-[#8ddcff]/20 bg-[#8ddcff]/10 text-[#8ddcff]",
                  item.accent === "mint" && "border-[#8af0be]/20 bg-[#8af0be]/10 text-[#8af0be]",
                  item.accent === "gold" && "border-[#f3de62]/20 bg-[#f3de62]/10 text-[#f3de62]",
                  item.accent === "lavender" && "border-[#c28cff]/20 bg-[#c28cff]/10 text-[#c28cff]",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-2xl font-light tracking-[-0.04em] text-[#faf4ea]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[#b7c1da]">
                {item.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function PlatformSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-22 sm:px-8 lg:px-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-8 sm:p-10"
      >
        <div className="max-w-4xl">
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#92f2bd]">
            Built on one Verly platform
          </div>
          <h2 className="mt-4 text-[clamp(2.4rem,4.8vw,4.4rem)] font-light leading-[1] tracking-[-0.05em] text-[#faf4ea]">
            Voice should inherit the same knowledge, actions, analytics, and escalation model as the rest of your support system.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#b8c2db]">
            That is what makes Verly voice useful in practice. It stays connected
            to the support operating layer instead of becoming a separate channel
            with separate logic.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {platformItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#d4ddec]"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #050816 0%, #102247 34%, #2d72b8 68%, #cbe5ff 92%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-10">
        <div className="px-6 pb-14 pt-24 text-center md:pb-16 md:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#c5f6d9] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Let&apos;s talk
          </div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            If Verly voice belongs in your support stack, let&apos;s talk.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#deecfb]">
            Walk through inbound support, website voice workflows, escalation,
            and follow-up automation with us.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => void openCalendlyPopup()}
              className="h-12 rounded-full bg-[#111111] px-6 text-base text-white hover:bg-[#222222]"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a meet
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/16 bg-white/8 px-6 text-base text-white hover:bg-white/14"
            >
              <Link href="/login">
                Start building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="text-sm font-medium text-[#8ddcff]">{eyebrow}</div>
      <h2 className="mt-4 text-[clamp(2.8rem,5.6vw,4.8rem)] font-light leading-[0.98] tracking-[-0.06em] text-[#faf4ea]">
        {title}
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#b7c1da]">
        {description}
      </p>
    </div>
  );
}

function WorkflowBarsVisual() {
  const shouldReduceMotion = useReducedMotion();
  const bars = [32, 48, 86, 64, 38, 76, 110, 72, 44, 90, 56, 32];

  return (
    <div className="flex items-end gap-[10px]">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          animate={
            shouldReduceMotion
              ? undefined
              : { height: [Math.max(16, height - 16), height, Math.max(16, height - 8)] }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "mirror",
            delay: index * 0.08,
            ease: "easeInOut",
          }}
          className="block w-4 rounded-full"
          style={{
            height,
            background:
              index % 4 === 0 
                ? "linear-gradient(180deg, #8ddcff, #38bdf8)" 
                : index % 3 === 0 
                ? "linear-gradient(180deg, #8af0be, #34d399)" 
                : "linear-gradient(180deg, #e2e8f0, #94a3b8)",
            boxShadow: 
              index % 4 === 0 
                ? "0 0 16px rgba(141,220,255,0.4)" 
                : index % 3 === 0 
                ? "0 0 16px rgba(138,240,190,0.4)" 
                : "0 0 12px rgba(255,255,255,0.05)",
          }}
        />
      ))}
    </div>
  );
}

function WorkflowGridVisual() {
  const shouldReduceMotion = useReducedMotion();
  const colors = [
    { bg: "#38bdf8", shadow: "rgba(56,189,248,0.5)" },
    { bg: "#34d399", shadow: "rgba(52,211,153,0.5)" },
    { bg: "#facc15", shadow: "rgba(250,204,21,0.4)" },
    { bg: "#c084fc", shadow: "rgba(192,132,252,0.4)" },
    { bg: "#ffffff", shadow: "rgba(255,255,255,0.2)" },
  ];

  return (
    <div className="grid grid-cols-7 gap-3 sm:gap-4">
      {Array.from({ length: 35 }).map((_, index) => {
        const isHighlight = index % 5 === 0 || index % 8 === 0;
        const color = isHighlight ? colors[index % 4] : colors[4];
        
        return (
          <motion.span
            key={index}
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.3, 1, 0.4], scale: [1, 1.25, 1] }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.05,
              ease: "easeInOut",
            }}
            className="block h-4 w-4 rounded-full"
            style={{
              backgroundColor: color.bg,
              boxShadow: isHighlight ? `0 0 16px ${color.shadow}` : "none",
              opacity: isHighlight ? 1 : 0.4,
            }}
          />
        );
      })}
    </div>
  );
}

function WorkflowBurstVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-[240px] w-[240px] items-center justify-center">
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [0.8, 1.6], opacity: [0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-[#8ddcff]/60"
      />
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [0.8, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8, ease: "easeOut" }}
        className="absolute inset-4 rounded-full border border-[#8af0be]/60"
      />
      <div className="absolute h-[110px] w-[110px] rounded-full bg-[radial-gradient(circle,rgba(104,145,255,0.2)_0%,rgba(5,8,22,0.8)_80%)] backdrop-blur-sm" />
      <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_32px_rgba(141,220,255,0.4)] backdrop-blur-md">
        <div className="h-8 w-8 rounded-full bg-[#8ddcff] shadow-[0_0_20px_rgba(141,220,255,0.9)]" />
      </div>

      {Array.from({ length: 12 }).map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
          className="absolute h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          style={{
            transform: `rotate(${index * 30}deg) translateY(-85px)`,
            backgroundColor: index % 3 === 0 ? "#8af0be" : index % 2 === 0 ? "#8ddcff" : "#ffffff"
          }}
        />
      ))}
    </div>
  );
}

function InboundSupportVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[32px] border border-white/8 bg-[#0a0d1c] p-6 lg:ml-4"
    >
      {/* Background Glows */}
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8ddcff]/5 blur-[120px]"></div>
      <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8af0be]/5 blur-[100px]"></div>
      
      <div className="relative z-10 w-full space-y-12 py-8">
        {/* Node 1 */}
        <div className="flex justify-center">
          <div className="w-64 rounded-xl border border-[#444758]/20 bg-[#14192a] p-5 shadow-2xl">
            <div className="mb-2 flex items-center space-x-3">
              <PhoneCall className="h-[18px] w-[18px] text-[#8ddcff]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a7aabe]">Incoming</span>
            </div>
            <h4 className="font-medium text-[#e2e4f9]">Receive support call</h4>
          </div>
        </div>
        
        {/* Connector Line 1 */}
        <div className="-my-6 flex flex-col items-center">
          <div className="h-16 w-px bg-gradient-to-b from-[#8ddcff] to-[#8af0be]"></div>
        </div>
        
        {/* Central Node 2 */}
        <div className="flex justify-center">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#8af0be]/50 to-[#8ddcff]/50 opacity-25 blur transition duration-1000 group-hover:opacity-40"></div>
            <div className="relative w-80 rounded-2xl border border-[#8af0be]/20 bg-[#1a1f32] p-8 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <BrainCircuit className="h-7 w-7 text-[#8af0be]" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#8af0be]"></div>
                  <div className="h-2 w-2 rounded-full bg-[#8ddcff]/50"></div>
                </div>
              </div>
              <h4 className="mb-4 text-xl font-light text-[#e2e4f9]">Resolve with knowledge</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rounded-full border border-[#444758]/10 bg-[#1f253a] px-3 py-1.5 text-xs text-[#a7aabe]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>GROUNDED IN DOCS</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full border border-[#444758]/10 bg-[#1f253a] px-3 py-1.5 text-xs text-[#a7aabe]">
                  <Users className="h-4 w-4" />
                  <span>ACCOUNT CONTEXT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connector Line 2 with fork */}
        <div className="-my-6 flex justify-center">
          <div className="relative h-20 w-48">
            <svg className="h-full w-full" fill="none" viewBox="0 0 192 80" xmlns="http://www.w3.org/2000/svg">
              <path d="M96 0V40C96 51.0457 87.0457 60 76 60H32" stroke="url(#paint0_linear)" strokeOpacity="0.3" strokeWidth="1.5"></path>
              <path d="M96 0V40C96 51.0457 104.954 60 116 60H160" stroke="url(#paint1_linear)" strokeOpacity="0.3" strokeWidth="1.5"></path>
              <circle cx="96" cy="0" fill="#8af0be" r="3"></circle>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="96" x2="32" y1="0" y2="60">
                  <stop stopColor="#8af0be"></stop>
                  <stop offset="1" stopColor="#8ddcff"></stop>
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="96" x2="160" y1="0" y2="60">
                  <stop stopColor="#8af0be"></stop>
                  <stop offset="1" stopColor="#f3de62"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Final Row of Nodes */}
        <div className="mx-auto flex w-full max-w-[340px] items-start justify-between px-1">
          <div className="w-[150px] rounded-xl border border-[#444758]/20 bg-[#14192a]/80 p-3.5">
            <div className="mb-2 flex items-center space-x-2">
              <SquareTerminal className="h-3.5 w-3.5 text-[#8ddcff]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#a7aabe]">Automation</span>
            </div>
            <h5 className="text-[13px] font-medium leading-[1.3] text-[#e2e4f9]">Use tool or fetch status</h5>
          </div>
          <div className="w-[150px] rounded-xl border border-[#f3de62]/20 bg-[#14192a]/80 p-3.5">
            <div className="mb-2 flex items-center space-x-2">
              <PhoneForwarded className="h-3.5 w-3.5 text-[#f3de62]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#a7aabe]">Live Handoff</span>
            </div>
            <h5 className="text-[13px] font-medium leading-[1.3] text-[#e2e4f9]">Escalate with summary</h5>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OutboundSupportVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(138,240,190,0.12),transparent_34%),linear-gradient(180deg,#071120_0%,#0c1930_100%)] p-6"
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px]" />
      <motion.div
        animate={shouldReduceMotion ? undefined : { rotate: [0, 0.8, -0.8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 rounded-[28px] border border-white/10 bg-[#081427]/92 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
      >
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#8ddcff]">
              Campaign flow
            </div>
            <div className="mt-2 text-2xl font-medium text-[#faf4ea]">
              Lead reactivation
            </div>
          </div>
          <div className="rounded-full border border-[#8af0be]/30 bg-[#8af0be]/10 px-3 py-1 text-xs text-[#8af0be]">
            Running
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <CampaignRow icon={RadioTower} title="Dial sequence" meta="214 contacts" accent="#8ddcff" />
          <CampaignRow icon={BrainCircuit} title="Qualification path" meta="Intent capture" accent="#8af0be" />
          <CampaignRow icon={LineChart} title="Qualified outcome" meta="42 warm leads" accent="#f3de62" />
        </div>

        <div className="mt-6 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-sm text-[#d4dced]">
            <span>Qualified conversations</span>
            <span className="text-[#8af0be]">+18.4%</span>
          </div>
          <div className="mt-4 flex h-24 items-end gap-2">
            {[24, 36, 32, 48, 44, 62, 58, 78].map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { height: [height - 8, height, height - 3] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.08,
                }}
                className="block flex-1 rounded-t-full"
                style={{
                  height,
                  background:
                    index >= 5
                      ? "linear-gradient(180deg,#8af0be,#67d7ff)"
                      : "linear-gradient(180deg,#dce6ff,#95d6ff)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MiniStatCard({
  icon: Icon,
  title,
  text,
  accent,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
  accent: "mint" | "blue" | "gold";
}) {
  const styles =
    accent === "mint"
      ? "border-[#8af0be]/20 bg-[#8af0be]/10 text-[#8af0be]"
      : accent === "blue"
        ? "border-[#8ddcff]/20 bg-[#8ddcff]/10 text-[#8ddcff]"
        : "border-[#f3de62]/20 bg-[#f3de62]/10 text-[#f3de62]";

  return (
    <div className="rounded-[22px] border border-white/8 bg-[#081427]/86 p-4">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl border", styles)}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="mt-4 text-base font-medium text-[#faf4ea]">{title}</div>
      <p className="mt-2 text-sm leading-6 text-[#b5bfd8]">{text}</p>
    </div>
  );
}

function UseCaseVisual({ accent }: { accent: "blue" | "mint" | "gold" | "lavender" }) {
  if (accent === "blue") return <WaveVisual />;
  if (accent === "mint") return <CallFlowVisual />;
  if (accent === "gold") return <FunnelVisual />;
  return <ClockVisual />;
}

/** Blue — animated sine waveform (website voice widget) */
function WaveVisual() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex w-full items-center justify-center">
      <motion.svg
        width="160"
        height="64"
        viewBox="0 0 160 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8ddcff" stopOpacity="0.3" />
            <stop offset="0.5" stopColor="#8ddcff" />
            <stop offset="1" stopColor="#8ddcff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Background muted wave */}
        <path
          d="M0 32 C20 10, 40 54, 60 32 C80 10, 100 54, 120 32 C140 10, 155 54, 160 32"
          stroke="#8ddcff"
          strokeOpacity="0.15"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Animated main wave */}
        <motion.path
          d="M0 32 C20 10, 40 54, 60 32 C80 10, 100 54, 120 32 C140 10, 155 54, 160 32"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          fill="none"
          animate={shouldReduceMotion ? undefined : { pathLength: [0, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        {/* Cursor dot */}
        <motion.circle
          r="4"
          fill="#8ddcff"
          style={{ filter: "drop-shadow(0 0 6px #8ddcff)" }}
          animate={shouldReduceMotion ? undefined : {
            cx: [0, 20, 40, 60, 80, 100, 120, 140, 160],
            cy: [32, 10, 54, 32, 10, 54, 32, 10, 32],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
}

/** Mint — branching call-flow nodes (inbound support) */
function CallFlowVisual() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex w-full items-center justify-center">
      <svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flowL" x1="75" y1="16" x2="30" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8af0be" />
            <stop offset="1" stopColor="#8ddcff" />
          </linearGradient>
          <linearGradient id="flowR" x1="75" y1="16" x2="120" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8af0be" />
            <stop offset="1" stopColor="#f3de62" />
          </linearGradient>
        </defs>
        {/* Top node */}
        <rect x="55" y="4" width="40" height="24" rx="12" fill="#8af0be" fillOpacity="0.12" stroke="#8af0be" strokeWidth="1.2" />
        <text x="75" y="21" textAnchor="middle" fill="#8af0be" fontSize="9" fontWeight="600" letterSpacing="0.5">CALL IN</text>

        {/* Lines branching down */}
        <line x1="75" y1="28" x2="30" y2="56" stroke="url(#flowL)" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="75" y1="28" x2="120" y2="56" stroke="url(#flowR)" strokeWidth="1.2" strokeDasharray="3 2" />
        <motion.circle cx="75" cy="28" r="3" fill="#8af0be"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        {/* Left: Resolved */}
        <rect x="6" y="56" width="48" height="20" rx="10" fill="#8af0be" fillOpacity="0.1" stroke="#8af0be" strokeOpacity="0.4" strokeWidth="1" />
        <motion.circle cx="18" cy="66" r="3" fill="#8af0be"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <text x="32" y="70" textAnchor="middle" fill="#8af0be" fontSize="8" fontWeight="500">Resolved</text>

        {/* Right: Escalated */}
        <rect x="96" y="56" width="48" height="20" rx="10" fill="#f3de62" fillOpacity="0.08" stroke="#f3de62" strokeOpacity="0.4" strokeWidth="1" />
        <motion.circle cx="108" cy="66" r="3" fill="#f3de62"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        />
        <text x="122" y="70" textAnchor="middle" fill="#f3de62" fontSize="8" fontWeight="500">Escalated</text>
      </svg>
    </div>
  );
}

/** Gold — animated qualification funnel (outbound) */
function FunnelVisual() {
  const shouldReduceMotion = useReducedMotion();
  const stages = [
    { label: "Dialed", width: 130, color: "#f3de62", opacity: 0.9 },
    { label: "Answered", width: 90, color: "#f3de62", opacity: 0.7 },
    { label: "Qualified", width: 54, color: "#f28a49", opacity: 1 },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      {stages.map((stage, i) => (
        <motion.div
          key={stage.label}
          className="flex items-center gap-2"
          initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
        >
          <div
            className="h-5 rounded-full"
            style={{
              width: stage.width,
              background: `linear-gradient(90deg, ${stage.color}${Math.round(stage.opacity * 255).toString(16).padStart(2, "0")}, ${stage.color}60)`,
              boxShadow: `0 0 10px ${stage.color}30`,
            }}
          />
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: stage.color, opacity: 0.8 }}>
            {stage.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Lavender — animated clock face (callback automation) */
function ClockVisual() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex w-full items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c28cff" />
            <stop offset="1" stopColor="#8ddcff" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="40" cy="40" r="36" stroke="#c28cff" strokeOpacity="0.15" strokeWidth="1.5" />
        {/* Progress arc */}
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#arcGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="226"
          animate={shouldReduceMotion ? undefined : { strokeDashoffset: [226, 56, 226] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "40px 40px" }}
        />
        {/* Inner circle */}
        <circle cx="40" cy="40" r="26" fill="#c28cff" fillOpacity="0.06" stroke="#c28cff" strokeOpacity="0.2" strokeWidth="1" />
        {/* Hour hand */}
        <motion.line
          x1="40" y1="40" x2="40" y2="22"
          stroke="#c28cff"
          strokeWidth="2"
          strokeLinecap="round"
          animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Minute hand */}
        <motion.line
          x1="40" y1="40" x2="52" y2="40"
          stroke="#8ddcff"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Center dot */}
        <circle cx="40" cy="40" r="3" fill="#c28cff" style={{ filter: "drop-shadow(0 0 6px #c28cff)" }} />
        {/* Notification ping */}
        <motion.circle
          cx="62" cy="18" r="5"
          fill="#c28cff"
          animate={shouldReduceMotion ? undefined : { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="62" y="22" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">!</text>
      </svg>
    </div>
  );
}

function SupportFlowNode({
  icon: Icon,
  title,
  badge,
  highlight = false,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="relative z-10 w-full rounded-[20px] border border-white/[0.04] bg-[#1a2130] px-5 py-5 shadow-[0_12px_44px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/5",
            highlight
              ? "bg-[#8ddcff]/10 text-[#8ddcff]"
              : "bg-white/[0.03] text-[#8af0be]",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="text-[15px] font-medium text-[#fcfdfd] sm:text-[16px]">{title}</div>
          <div className="inline-flex w-fit rounded-full bg-[#283243] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a7b5d1] leading-none">
            {badge}
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignRow({
  icon: Icon,
  title,
  meta,
  accent,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  meta: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-[#faf4ea]">{title}</div>
          <div className="text-xs text-[#90a1c2]">{meta}</div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-white/40" />
    </div>
  );
}
