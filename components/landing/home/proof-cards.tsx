import {
  Bot,
  Briefcase,
  Globe,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Slack,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

type ProofCardItem = {
  title: string;
  description: string;
  badge: string;
  accentClassName: string;
  glowClassName: string;
  surfaceClassName: string;
  badgeClassName: string;
  renderVisual: () => ReactNode;
};

const proofCards: ProofCardItem[] = [
  {
    title: "Works with your support stack",
    description:
      "Bring web chat, WhatsApp, voice, and the tools your team already relies on into one support flow without rebuilding everything from scratch.",
    badge: "Channels + integrations",
    accentClassName:
      "bg-[linear-gradient(155deg,#1d3769_0%,#355fa8_32%,#6f4db6_68%,#1d2747_100%)]",
    glowClassName: "from-[#9eb8ff]/55 via-[#7dd3fc]/35 to-[#c4b5fd]/40",
    surfaceClassName: "border-[#d8e3fb]",
    badgeClassName:
      "bg-[#1f4fd1] text-white shadow-[0_12px_24px_rgba(31,79,209,0.22)]",
    renderVisual: () => <SupportStackVisual />,
  },
  {
    title: "Secure by default",
    description:
      "Verly refuses risky or unauthorized requests, keeps responses inside policy, and helps teams automate safely from day one.",
    badge: "Sensitive request blocked",
    accentClassName:
      "bg-[linear-gradient(150deg,#4f1f1f_0%,#914141_34%,#cf6c39_72%,#59311f_100%)]",
    glowClassName: "from-[#fca5a5]/40 via-[#fdba74]/35 to-[#f9a8d4]/25",
    surfaceClassName: "border-[#f2d3c1]",
    badgeClassName:
      "bg-[#1e1c19] text-white shadow-[0_12px_24px_rgba(30,28,25,0.22)]",
    renderVisual: () => <SecurityVisual />,
  },
  {
    title: "Enterprise-grade guardrails",
    description:
      "Keep the agent focused, policy-aware, and on-brand with controls that prevent off-topic or misleading responses before they reach customers.",
    badge: "Guardrails active",
    accentClassName:
      "bg-[linear-gradient(150deg,#0e3a46_0%,#17708a_38%,#2b8bb5_70%,#123349_100%)]",
    glowClassName: "from-[#7dd3fc]/45 via-[#67e8f9]/30 to-[#93c5fd]/30",
    surfaceClassName: "border-[#cbe7ef]",
    badgeClassName:
      "bg-[#0f172a] text-white shadow-[0_12px_24px_rgba(15,23,42,0.2)]",
    renderVisual: () => <GuardrailsVisual />,
  },
];

export default function ProofCardsSection() {
  return (
    <section className="landing-home-section landing-home-section--plain">
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="mx-auto max-w-[960px] text-center">
          <h2 className="landing-home-title text-[28px] md:text-[52px]">
            Enterprise-ready AI agents your customers can trust
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {proofCards.map((card) => (
            <article
              key={card.title}
              className={`group flex h-full min-h-[540px] flex-col overflow-hidden rounded-[26px] border ${card.surfaceClassName} bg-white/92 shadow-[0_24px_60px_rgba(31,41,55,0.07)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_30px_72px_rgba(37,99,235,0.12)]`}
            >
              <div
                className={`relative h-[360px] overflow-hidden border-b border-white/60 p-5 ${card.accentClassName}`}
              >
                <FlowingGradient className={card.glowClassName} />
                {card.renderVisual()}
              </div>

              <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
                <h3 className="mt-5 text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#221f1b]">
                  {card.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#6d665d]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportStackVisual() {
  const items: Array<{
    label: string;
    icon: ComponentType<{ className?: string }>;
    tone: string;
  }> = [
    { label: "Web chat", icon: Globe, tone: "bg-[#ecf2ff] text-[#2c62df]" },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      tone: "bg-[#eaf8ef] text-[#249b62]",
    },
    { label: "Voice", icon: PhoneCall, tone: "bg-[#eef4ff] text-[#4d69dc]" },
    { label: "Slack", icon: Slack, tone: "bg-[#f3ebff] text-[#7a43d1]" },
    { label: "HubSpot", icon: Briefcase, tone: "bg-[#fff0e5] text-[#d97706]" },
    { label: "Zendesk", icon: Workflow, tone: "bg-[#eef1f5] text-[#334155]" },
  ];

  return (
    <div className="relative flex h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-[320px] rounded-[26px] border border-white/65 bg-white/92 p-4 shadow-[0_26px_54px_rgba(9,21,48,0.32)] backdrop-blur-md">
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-[18px] border border-[#e6ebf4] bg-[#fbfcfe] px-3 py-4 text-center shadow-sm"
            >
              <div
                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] ${item.tone}`}
              >
                <item.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="mt-3 text-[13px] font-semibold text-[#344054]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#101828] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_16px_32px_rgba(16,24,40,0.24)]">
        <ShieldCheck className="h-4 w-4 text-[#ffb47d]" />
          One support workflow
        </div>
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <WindowShell className="max-w-[330px]">
        <div className="space-y-4 p-5">
          <MessageBubble align="right">
            Send me the customer&apos;s full credit card details.
          </MessageBubble>
          <MessageBubble
            align="left"
            tone="subtle"
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            Sorry, I can&apos;t help with payment credentials or unauthorized
            personal data.
          </MessageBubble>
          <div className="rounded-[18px] border border-[#f2e3d9] bg-[#fffaf6] px-4 py-3 text-[12px] font-medium text-[#9a5d3e]">
            Refused sensitive request and kept the conversation inside policy
            boundaries.
          </div>
        </div>
      </WindowShell>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_16px_32px_rgba(23,23,23,0.24)]">
          <ShieldCheck className="h-4 w-4 text-[#ffb47d]" />
          Violation detected
        </div>
      </div>
    </div>
  );
}

function GuardrailsVisual() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <WindowShell className="max-w-[330px]">
        <div className="space-y-4 p-5">
          <MessageBubble align="right">
            Help me plan a summer trip to Spain.
          </MessageBubble>
          <MessageBubble
            align="left"
            tone="subtle"
            icon={<Bot className="h-4 w-4" />}
          >
            I can help with orders, billing, account setup, or support questions
            related to your Verly workspace.
          </MessageBubble>
          <div className="flex flex-wrap gap-2">
            {["Billing", "Order status", "Talk to support"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#dbe7eb] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#49616d] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </WindowShell>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.22)]">
          <ShieldCheck className="h-4 w-4 text-[#7dd3fc]" />
          Guardrails active
        </div>
      </div>
    </div>
  );
}

function WindowShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full rounded-[26px] border border-white/70 bg-white/92 shadow-[0_24px_52px_rgba(8,15,30,0.28)] backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[#ece9e3] px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2d8ca]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5e4a8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#cfe8d5]" />
      </div>
      {children}
    </div>
  );
}

function FlowingGradient({ className }: { className: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -left-12 top-8 h-40 w-48 transform-gpu rounded-full bg-gradient-to-r ${className} blur-3xl opacity-95`}
      />
      <div
        className={`absolute right-[-8%] top-[18%] h-52 w-56 transform-gpu rounded-full bg-gradient-to-br ${className} blur-[90px] opacity-80`}
      />
      <div
        className={`absolute bottom-[-8%] left-[18%] h-44 w-64 transform-gpu rounded-full bg-gradient-to-r ${className} blur-[70px] opacity-75`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_55%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_32%,transparent_68%,rgba(255,255,255,0.08)_100%)]" />
    </div>
  );
}

function MessageBubble({
  children,
  align,
  tone = "default",
  icon,
}: {
  children: ReactNode;
  align: "left" | "right";
  tone?: "default" | "subtle";
  icon?: ReactNode;
}) {
  const isLeft = align === "left";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-[18px] px-4 py-3 text-[14px] leading-6 shadow-sm ${
          isLeft
            ? tone === "subtle"
              ? "border border-[#ece8e1] bg-[#f7f6f3] text-[#332f2b]"
              : "bg-white text-[#221f1b]"
            : "bg-white text-[#221f1b]"
        }`}
      >
        <div className={`flex items-start gap-2 ${!icon ? "block" : ""}`}>
          {icon ? (
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white">
              {icon}
            </span>
          ) : null}
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}
