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
  Headphones,
  LineChart,
  Mic,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  RadioTower,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Users,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openCalendlyPopup } from "@/lib/calendly";

const brandLogos = ["Unity AI", "New York Life", "Intuit", "Delphi", "Housecall Pro", "Cherry"];

const workflowCards = [
  {
    index: "001",
    title: "Choose the workflow",
    description:
      "Start with inbound support, website voice, outbound qualification, or callback automation.",
    visual: WorkflowBarsVisual,
  },
  {
    index: "002",
    title: "Connect knowledge and actions",
    description:
      "Ground every call in your FAQs, support content, tools, and customer context so the workflow can resolve work.",
    visual: WorkflowGridVisual,
  },
  {
    index: "003",
    title: "Deploy and measure",
    description:
      "Launch on the website or phone, then review analytics, handoffs, and campaign outcomes from the same platform.",
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
      <BrandStrip />
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
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,145,255,0.14),transparent_28%),linear-gradient(180deg,#060914_0%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(124,134,182,0.35)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col items-center px-5 pb-8 pt-34 text-center sm:px-8 lg:px-10 lg:pt-42">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#92f2bd]"
        >
          <AudioLines className="h-3.5 w-3.5" />
          Verly Voice Platform
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
          className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,6.8rem)] font-light leading-[0.92] tracking-[-0.06em] text-[#faf4ea]"
        >
          Voice AI agents
          <span className="block">for modern support teams</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.14, ease: "easeOut" }}
          className="mt-7 max-w-3xl text-lg leading-8 text-[#bac4dd] sm:text-xl"
        >
          Build Verly voice workflows for inbound support, website voice widget
          experiences, outbound qualification, and callback automation on one
          customer-support operating layer.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-13 rounded-full bg-[#8af0be] px-8 text-[15px] font-semibold text-[#08111f] hover:bg-[#9bf4c8]"
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
            className="h-13 rounded-full border-white/12 bg-black/10 px-8 text-[15px] font-semibold text-[#faf4ea] hover:bg-white/[0.05]"
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
  const shouldReduceMotion = useReducedMotion();
  const heights = [
    18, 36, 54, 84, 60, 34, 50, 72, 108, 74, 48, 32, 58, 98, 126, 84, 52, 30, 44,
    70, 102, 80, 48, 34, 64, 106, 78, 56, 38, 68, 112, 76, 54, 34,
  ];
  const accentCycle = ["#f7f3e9", "#8ddcff", "#8af0be", "#f3de62", "#c28cff", "#f28a49"];

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-4 pb-6 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center">
        <div className="relative z-10 mb-10 rounded-[999px] border border-white/14 bg-[#f1ecde] px-7 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-8">
            <span className="text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium tracking-[0.22em] text-[#111827]">
              TALK TO VERLY
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/12 bg-white/70 text-[#111827]">
              <Mic className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex h-[240px] w-full items-end justify-center gap-2 overflow-hidden">
          {heights.map((height, index) => (
            <motion.div
              key={`${height}-${index}`}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { height: [Math.max(16, height - 10), height, Math.max(16, height - 4)] }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.05,
                ease: "easeInOut",
              }}
              className="flex w-4 flex-col justify-end gap-3"
            >
              {Array.from({ length: Math.max(2, Math.floor(height / 24)) }).map((_, unitIndex) => (
                <span
                  key={unitIndex}
                  className="block h-3 rounded-full"
                  style={{
                    backgroundColor:
                      index % 5 === 0 || index % 7 === 0
                        ? accentCycle[(index + unitIndex) % accentCycle.length]
                        : "#f7f3e9",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandStrip() {
  return (
    <section className="border-b border-white/8">
      <div className="mx-auto grid w-full max-w-[1380px] grid-cols-2 gap-px border-x border-white/8 bg-white/8 sm:grid-cols-3 lg:grid-cols-6">
        {brandLogos.map((logo) => (
          <div
            key={logo}
            className="flex h-20 items-center justify-center bg-[#050816] px-4 text-center text-[1.35rem] font-semibold tracking-[-0.03em] text-[#f3efe5]"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1380px] px-5 py-22 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="How it works"
        title="Try in minutes. Deploy on voice surfaces in days."
        description="Keep the setup path simple: define the workflow, connect support context, and launch the same Verly logic wherever conversations begin."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-[30px] border border-white/8 bg-white/8 lg:grid-cols-3">
        {workflowCards.map((card, index) => {
          const Visual = card.visual;

          return (
            <motion.article
              key={card.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="bg-[#070b18] p-8 sm:p-10"
            >
              <div className="inline-flex rounded-full border border-white/12 px-3 py-1 text-[11px] tracking-[0.22em] text-[#d7deef]">
                {card.index}
              </div>
              <div className="mt-10 flex min-h-[250px] items-center justify-center rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
                <Visual />
              </div>
              <h3 className="mt-10 text-3xl font-light tracking-[-0.04em] text-[#faf4ea]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[#b5bfd8]">
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
    <section className="relative overflow-hidden px-5 pb-0 pt-10 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1380px]">
        <div
          className="rounded-t-[38px] px-6 py-16 text-center sm:px-10 sm:py-20"
          style={{
            background:
              "linear-gradient(to bottom, #050816 0%, #102247 34%, #2d72b8 68%, #cbe5ff 92%, #ffffff 100%)",
          }}
        >
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
  const bars = [34, 50, 84, 62, 40, 76, 108, 72, 46, 88];

  return (
    <div className="flex items-end gap-2">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          animate={
            shouldReduceMotion
              ? undefined
              : { height: [Math.max(16, height - 12), height, Math.max(16, height - 5)] }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "mirror",
            delay: index * 0.08,
          }}
          className="block w-3 rounded-full"
          style={{
            height,
            backgroundColor:
              index % 4 === 0 ? "#8ddcff" : index % 3 === 0 ? "#8af0be" : "#f7f3e9",
          }}
        />
      ))}
    </div>
  );
}

function WorkflowGridVisual() {
  const shouldReduceMotion = useReducedMotion();
  const colors = ["#f7f3e9", "#8ddcff", "#8af0be", "#f3de62", "#c28cff"];

  return (
    <div className="grid grid-cols-6 gap-3">
      {Array.from({ length: 36 }).map((_, index) => (
        <motion.span
          key={index}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.55, 1, 0.72], scale: [1, 1.08, 1] }
          }
          transition={{
            duration: 1.7,
            repeat: Infinity,
            repeatType: "mirror",
            delay: index * 0.03,
          }}
          className="block h-5 w-3 rounded-full"
          style={{
            backgroundColor:
              index % 4 === 0 || index % 7 === 0 ? colors[index % colors.length] : "#f7f3e9",
          }}
        />
      ))}
    </div>
  );
}

function WorkflowBurstVisual() {
  const shouldReduceMotion = useReducedMotion();
  const colors = ["#f7f3e9", "#8ddcff", "#8af0be", "#f3de62", "#c28cff", "#f28a49"];

  return (
    <div className="relative h-[210px] w-[210px]">
      {Array.from({ length: 22 }).map((_, index) => (
        <motion.span
          key={index}
          animate={
            shouldReduceMotion
              ? undefined
              : { scaleY: [0.88, 1.16, 1], opacity: [0.75, 1, 0.82] }
          }
          transition={{
            duration: 1.9,
            repeat: Infinity,
            repeatType: "mirror",
            delay: index * 0.05,
          }}
          className="absolute left-1/2 top-1/2 block h-6 w-2 -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: colors[index % colors.length],
            transform: `translate(-50%, -50%) rotate(${index * 16}deg) translateY(-78px)`,
          }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 bg-[#0a0f1d]" />
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
      className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(137,214,255,0.28),transparent_38%),linear-gradient(180deg,#bfe8ff_0%,#a7ddff_46%,#8accff_100%)] p-6 sm:p-8"
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:10px_10px]" />
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [-4, 5, -4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mx-auto max-w-[420px]"
      >
        <SupportFlowNode icon={PhoneCall} title="Receive support call" badge="INBOUND LINE" />
        <VerticalConnector />
        <SupportFlowNode icon={ShieldCheck} title="Resolve with knowledge" badge="DOCS + ACCOUNT CONTEXT" highlight />
        <VerticalConnector />
        <SupportFlowNode icon={SquareTerminal} title="Use tool or fetch status" badge="LIVE ACTIONS" />
        <VerticalConnector />
        <SupportFlowNode icon={Users} title="Escalate with summary" badge="HUMAN HANDOFF" />
      </motion.div>
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
  const palette =
    accent === "blue"
      ? ["#f7f3e9", "#8ddcff", "#8ddcff"]
      : accent === "mint"
        ? ["#f7f3e9", "#8af0be", "#8ddcff"]
        : accent === "gold"
          ? ["#f7f3e9", "#f3de62", "#f28a49"]
          : ["#f7f3e9", "#c28cff", "#8ddcff"];

  return (
    <div className="flex items-end gap-2">
      {[28, 38, 54, 46, 68, 52, 34, 60].map((height, index) => (
        <div
          key={`${accent}-${height}-${index}`}
          className="flex w-3 flex-col justify-end gap-2"
        >
          {Array.from({ length: Math.max(2, Math.floor(height / 20)) }).map((_, unitIndex) => (
            <span
              key={unitIndex}
              className="block h-3 rounded-full"
              style={{ backgroundColor: palette[(index + unitIndex) % palette.length] }}
            />
          ))}
        </div>
      ))}
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
      className={cn(
        "rounded-[24px] border bg-[#081427]/92 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.25)]",
        highlight ? "border-[#8ddcff]/35" : "border-white/10",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl border",
            highlight
              ? "border-[#8ddcff]/30 bg-[#8ddcff]/12 text-[#3f6e92]"
              : "border-white/10 bg-white/[0.04] text-[#8af0be]",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-medium text-[#f8f4eb]">{title}</div>
          <div className="mt-1 inline-flex rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] tracking-[0.12em] text-[#c6d7f8]">
            {badge}
          </div>
        </div>
      </div>
    </div>
  );
}

function VerticalConnector() {
  return <div className="ml-10 h-10 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02))]" />;
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
