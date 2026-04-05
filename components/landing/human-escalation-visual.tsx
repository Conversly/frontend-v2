"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Mail,
  Sparkles,
  Ticket,
  Workflow,
} from "lucide-react";

export type IntegrationLogo = {
  name: string;
  src: string;
  available: boolean;
  badgeClassName: string;
};

type HumanEscalationVisualProps = {
  integrations: IntegrationLogo[];
};

const conversation = [
  {
    role: "customer",
    text: "I still haven't received the order update. Can someone take this over?",
  },
  {
    role: "assistant",
    text: "I'm escalating this now and passing the full conversation, order details, and customer sentiment to your team.",
  },
  {
    role: "agent",
    text: "I'm on it. I already have the full context and a suggested reply from Verly Copilot.",
  },
] as const;

export default function HumanEscalationVisual({
  integrations,
}: HumanEscalationVisualProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 70, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 70, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["42%", "58%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["38%", "54%"]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative flex justify-center">
      <motion.div
        className="relative w-full max-w-[490px]"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-12 top-8 h-[220px] w-[220px] rounded-full bg-[#bfd2ff]/65 blur-[80px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 right-0 h-[260px] w-[260px] rounded-full bg-[#cff4ff]/70 blur-[90px]"
          animate={{ scale: [1.04, 1, 1.04], opacity: [0.65, 0.85, 0.65] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-[36px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.96)_100%)] shadow-[0_40px_100px_rgba(15,23,42,0.14)]"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.92), rgba(255,255,255,0) 34%)",
              ["--glow-x" as string]: glowX,
              ["--glow-y" as string]: glowY,
            }}
          />

          <div className="border-b border-[#ebeff7] bg-white/90 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#315eea] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <Workflow className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-[16px] font-semibold text-[#24324a]">
                    Human escalation
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7891]">
                    <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                    Live workflow
                  </div>
                </div>
              </div>

              <div className="rounded-full border border-[#dbe4f4] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#315eea]">
                Escalation ready
              </div>
            </div>
          </div>

          <div className="relative bg-[linear-gradient(180deg,#fbfdff_0%,#f5f8fd_100%)] p-5">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(123,145,191,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,145,191,0.06)_1px,transparent_1px)] bg-[size:26px_26px]" />

            <div className="relative z-10 flex flex-wrap gap-2">
              {integrations.map((integration) => (
                <IntegrationChip
                  key={integration.name}
                  integration={integration}
                />
              ))}
            </div>

            <div className="relative z-10 mt-5 space-y-3">
              {conversation.map((message) => (
                <div
                  key={message.text}
                  className={`max-w-[88%] rounded-[22px] px-4 py-3 text-[14px] leading-6 shadow-sm ${
                    message.role === "customer"
                      ? "ml-auto bg-[linear-gradient(135deg,#4067ff_0%,#315eea_100%)] text-white"
                      : message.role === "assistant"
                        ? "border border-[#dbe5ff] bg-white text-[#45536f]"
                        : "border border-[#d7f0de] bg-[#f5fff7] text-[#31543f]"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-4 grid gap-3">
              <div className="rounded-[24px] border border-[#dde6f3] bg-white/96 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#315eea]">
                      <Ticket className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#24324a]">
                        Ticket created automatically
                      </div>
                      <div className="text-[12px] text-[#74819a]">
                        Routed to Zendesk with priority and issue summary
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#eef8f0] px-2.5 py-1 text-[11px] font-semibold text-[#2f8a4f]">
                    Open
                  </span>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] border border-[#dde6f3] bg-white/96 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7a879f]">
                    <Sparkles className="h-4 w-4 text-[#315eea]" />
                    Context transfer
                  </div>

                  <div className="mt-3 grid gap-2 text-[13px] text-[#485670]">
                    <ContextRow label="Customer" value="Priya, repeat buyer" />
                    <ContextRow label="Issue" value="Courier delay on order #8291" />
                    <ContextRow label="Intent" value="Urgent human handoff requested" />
                    <ContextRow label="Sentiment" value="High frustration detected" />
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#dde6f3] bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7a879f]">
                    <Mail className="h-4 w-4 text-[#315eea]" />
                    Team notified
                  </div>

                  <div className="mt-3 rounded-[18px] border border-[#e4ebf6] bg-white px-3.5 py-3 text-[13px] text-[#55627c]">
                    Email sent to ops@brand.com and Slack updated in
                    <span className="font-semibold text-[#24324a]">
                      {" "}
                      #premium-support
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-[#dbe5ff] bg-[linear-gradient(180deg,#eef4ff_0%,#ffffff_100%)] p-4 shadow-[0_18px_40px_rgba(49,94,234,0.08)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#315eea]">
                      <Bot className="h-4 w-4" />
                      Verly Copilot
                    </div>
                    <div className="mt-2 text-[15px] font-semibold text-[#21314d]">
                      Suggested reply for Sarah
                    </div>
                  </div>

                  <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#315eea] shadow-sm">
                    Draft ready
                  </div>
                </div>

                <div className="mt-3 rounded-[18px] border border-white/80 bg-white/92 px-4 py-3 text-[14px] leading-6 text-[#4b5872] shadow-sm">
                  Hi Priya, I’ve reviewed the courier delay and created an
                  urgent ticket for your order. I’m staying on this until the
                  shipment is confirmed.
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d5e2ff] bg-white px-3 py-2 text-[12px] font-semibold text-[#315eea]">
                  Apply suggestion
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-4 top-[13%] hidden rounded-[22px] border border-white/70 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-sm lg:block"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a97af]">
            Resolution confidence
          </div>
          <div className="mt-1 text-[28px] font-black leading-none text-[#24324a]">
            96%
          </div>
        </motion.div>

        <motion.div
          className="absolute -left-6 bottom-[11%] hidden min-w-[220px] rounded-[22px] border border-white/70 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-sm lg:block"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a97af]">
            Handoff outcome
          </div>
          <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-[#24324a]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            Agent joined with full context
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function IntegrationChip({
  integration,
}: {
  integration: IntegrationLogo;
}) {
  if (integration.available) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe4f4] bg-white/95 px-3 py-1.5 shadow-sm">
        <div className="relative h-4 w-4 overflow-hidden">
          <Image
            src={integration.src}
            alt={`${integration.name} logo`}
            fill
            sizes="16px"
            className="object-contain"
          />
        </div>
        <span className="text-[12px] font-semibold text-[#4a5771]">
          {integration.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm ${integration.badgeClassName}`}
    >
      {integration.name}
    </div>
  );
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#f8fbff] px-3 py-2.5">
      <span className="font-medium text-[#7a879f]">{label}</span>
      <span className="text-right font-semibold text-[#2f3c55]">{value}</span>
    </div>
  );
}
