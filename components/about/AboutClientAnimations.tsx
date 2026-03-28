'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AudioWaveform,
  Bot,
  BrainCircuit,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const journeyIcons = {
  "sparkles": Sparkles,
  "bot": Bot,
  "message-square": MessageSquare,
  "audio-waveform": AudioWaveform,
} as const;

const pillarIcons = {
  "brain-circuit": BrainCircuit,
  "shield-check": ShieldCheck,
  "workflow": Workflow,
} as const;

const featureIcons = {
  "message-square": MessageSquare,
  "phone-call": PhoneCall,
  "bot": Bot,
} as const;

interface AboutSectionRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function AboutSectionReveal({
  children,
  delay = 0,
}: AboutSectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

export function AboutMetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <AboutSectionReveal>
      <div className="rounded-[1.5rem] border border-border/60 bg-background/75 p-5 shadow-sm backdrop-blur">
        <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p>
      </div>
    </AboutSectionReveal>
  );
}

export function AboutHeroPanel() {
  const channels = [
    {
      title: "Website",
      subtitle: "Instant answers and lead capture",
      icon: MessageSquare,
      tone: "bg-sky-500/10 text-sky-600",
    },
    {
      title: "Voice",
      subtitle: "Natural inbound call handling",
      icon: PhoneCall,
      tone: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "WhatsApp",
      subtitle: "Automation where customers already talk",
      icon: Bot,
      tone: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <AboutSectionReveal delay={0.1}>
      <div className="relative rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.45)] backdrop-blur md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_34%)]" />

        <div className="relative space-y-5">
          <div className="flex items-center justify-between rounded-[1.5rem] border border-border/60 bg-background/80 px-5 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Unified support control room</p>
              <h3 className="text-lg font-semibold">VerlyAI Operator View</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
                className="rounded-[1.4rem] border border-border/60 bg-background/80 p-5"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${channel.tone}`}
                >
                  <channel.icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-foreground">{channel.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-border/60 bg-background/85 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Knowledge and behavior</p>
                  <p className="text-xs text-muted-foreground">One operating model across channels</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Shared knowledge sources",
                  "Prompt and behavior controls",
                  "Human handoff when confidence drops",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/60 bg-slate-950 p-5 text-slate-50">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                  <AudioWaveform className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Operator outcomes</p>
                  <p className="text-xs text-slate-300">Built for measurable support improvement</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-semibold">Faster</div>
                  <p className="mt-1 text-sm text-slate-300">First responses and resolution paths.</p>
                </div>
                <div>
                  <div className="text-3xl font-semibold">Clearer</div>
                  <p className="mt-1 text-sm text-slate-300">Shared prompts, topics, and analytics.</p>
                </div>
                <div>
                  <div className="text-3xl font-semibold">Safer</div>
                  <p className="mt-1 text-sm text-slate-300">More control than a generic chatbot widget.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutSectionReveal>
  );
}

interface PillarItem {
  icon: keyof typeof pillarIcons;
  title: string;
  description: string;
}

export function AboutPillars({ items }: { items: PillarItem[] }) {
  return (
    <div className="grid gap-5">
      {items.map((item, index) => {
        const Icon = pillarIcons[item.icon];

        return (
          <AboutSectionReveal key={item.title} delay={index * 0.08}>
            <div className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          </AboutSectionReveal>
        );
      })}
    </div>
  );
}

interface JourneyItem {
  step: string;
  title: string;
  description: string;
  icon: keyof typeof journeyIcons;
}

export function AboutJourneyCard({
  item,
  index,
}: {
  item: JourneyItem;
  index: number;
}) {
  const Icon = journeyIcons[item.icon];

  return (
    <AboutSectionReveal delay={index * 0.08}>
      <div className="group h-full rounded-[1.75rem] border border-border/60 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{item.step}</span>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
      </div>
    </AboutSectionReveal>
  );
}

interface AboutFeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof featureIcons;
  delay?: number;
}

export function AboutFeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: AboutFeatureCardProps) {
  const Icon = featureIcons[icon];

  return (
    <AboutSectionReveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group flex h-full flex-col rounded-[2rem] border border-[#e4e7ef] bg-[#ececf1] px-7 py-10 text-center shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-[#d6ddf2] hover:bg-[#eef1f8] hover:shadow-[0_14px_32px_rgba(8,15,34,0.05)]"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f8f8fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_6px_18px_rgba(9,18,35,0.05)] transition-all duration-300 group-hover:scale-[1.03]">
          <Icon className="h-9 w-9 text-[#4b6fe2] transition-colors duration-300" />
        </div>
        <h3 className="font-title-bold mt-7 text-[2rem] tracking-[-0.05em] text-[#071224] transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-4 flex-1 text-[1rem] leading-8 text-[#64708a] transition-colors duration-300">
          {description}
        </p>
      </motion.div>
    </AboutSectionReveal>
  );
}

export function AboutImageCard({
  src,
  alt,
  width,
  height,
  delay = 0,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number;
}) {
  return (
    <AboutSectionReveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_16px_48px_rgba(8,15,34,0.08)] transition-shadow duration-300 hover:shadow-[0_22px_56px_rgba(8,15,34,0.12)]"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </motion.div>
    </AboutSectionReveal>
  );
}
