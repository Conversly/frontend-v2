import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Mail,
  Sparkles,
  Ticket,
  Upload,
  Zap,
} from "lucide-react";

import HumanEscalationVisual, {
  type IntegrationLogo,
} from "@/components/landing/human-escalation-visual";
import { Button } from "@/components/ui/button";

const integrationLogos: IntegrationLogo[] = [
  {
    name: "HubSpot",
    src: "/integrations/hubspot.svg",
    available: hasPublicAsset("integrations/hubspot.svg"),
    badgeClassName: "border-[#ffd9bf] bg-[#fff3ea] text-[#bf612d]",
  },
  {
    name: "Slack",
    src: "/integrations/slack.svg",
    available: hasPublicAsset("integrations/slack.svg"),
    badgeClassName: "border-[#e5d5ff] bg-[#f7f1ff] text-[#6f42c1]",
  },
  {
    name: "Zendesk",
    src: "/integrations/zendesk.svg",
    available: hasPublicAsset("integrations/zendesk.svg"),
    badgeClassName: "border-[#d9dfeb] bg-[#f4f7fb] text-[#334155]",
  },
  {
    name: "Verly",
    src: "/verly_logo.png",
    available: hasPublicAsset("verly_logo.png"),
    badgeClassName: "border-[#d7e4ff] bg-[#eef4ff] text-[#315eea]",
  },
];

const valuePoints = [
  {
    title: "Escalate into your preferred stack",
    description:
      "Route handoffs into HubSpot, Slack, Zendesk, or Verly so your team works where they already manage support.",
    icon: Sparkles,
  },
  {
    title: "Create tickets and notify your team instantly",
    description:
      "The moment escalation happens, Verly opens the support ticket and sends the right email notifications without extra ops work.",
    icon: Ticket,
  },
  {
    title: "Transfer the full conversation context",
    description:
      "Agents see the full transcript, summary, customer intent, and issue details immediately, so nobody has to re-read or re-ask.",
    icon: Upload,
  },
  {
    title: "Help humans reply faster with Verly Copilot",
    description:
      "Once a teammate joins, Verly Copilot drafts stronger replies so agents can resolve complex conversations with more confidence.",
    icon: Bot,
  },
] as const;

export default function HumanEscalationSection() {
  return (
    <section className="landing-home-section landing-home-section--soft overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,94,234,0.12),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(103,217,236,0.16),transparent_20%),radial-gradient(circle_at_18%_88%,rgba(157,182,255,0.12),transparent_26%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(49,94,234,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,94,234,0.08) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
          }}
        />
        <div className="absolute -right-24 top-10 h-[340px] w-[340px] rounded-full bg-[#c8d8ff]/55 blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-[340px] w-[340px] rounded-full bg-[#d8f2ff]/60 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <div className="landing-home-eyebrow w-fit">
              <Zap className="h-4 w-4" />
              Smart Escalation Handling
            </div>

            <div className="space-y-5">
              <h2 className="landing-home-title max-w-[11ch] text-[36px] md:text-[54px]">
                When AI needs backup,
                <span className="landing-home-title-muted block">
                  your team steps in ready.
                </span>
              </h2>

              <p className="landing-home-copy max-w-[620px] text-[16px] leading-[1.75] md:text-[18px]">
                Verly escalates complex conversations into the tools your team
                already uses, creates the right support workflow automatically,
                and carries the full context forward so every handoff feels
                instant instead of interrupted.
              </p>
            </div>

            <ul className="space-y-4">
              {valuePoints.map((point) => {
                const Icon = point.icon;

                return (
                  <li
                    key={point.title}
                    className="rounded-[24px] border border-[#e1e8f6] bg-white/88 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dbe5ff] bg-[#eef4ff] text-[#315eea] shadow-[0_10px_24px_rgba(49,94,234,0.12)]">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#1f2a44]">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-7 text-[#5f6c84]">
                          {point.description}
                        </p>

                        {point.title === "Escalate into your preferred stack" ? (
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {integrationLogos.map((logo) => (
                              <IntegrationBadge key={logo.name} logo={logo} />
                            ))}
                          </div>
                        ) : null}

                        {point.title === "Create tickets and notify your team instantly" ? (
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#dfe7f5] bg-[#f8fbff] px-3.5 py-2 text-[13px] font-medium text-[#4a5a76]">
                            <Mail className="h-4 w-4 text-[#315eea]" />
                            Email alerts go out as soon as the handoff is created.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-4 border-t border-[#d9e2f2] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[420px] text-[14px] leading-6 text-[#6b7891]">
                Keep AI-first resolution for the easy questions and bring humans
                in only when nuance, urgency, or judgment matters.
              </p>

              <Link href="/login">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[#315EEA] px-7 text-[15px] text-white shadow-[0_12px_30px_rgba(49,94,234,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2850d0] hover:shadow-[0_16px_36px_rgba(49,94,234,0.24)]"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <HumanEscalationVisual integrations={integrationLogos} />
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationBadge({ logo }: { logo: IntegrationLogo }) {
  if (logo.available) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe4f4] bg-white px-3.5 py-2 shadow-sm">
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          width={18}
          height={18}
          className="h-4 w-auto object-contain"
        />
        <span className="text-[13px] font-semibold text-[#44516b]">
          {logo.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3.5 py-2 text-[13px] font-semibold ${logo.badgeClassName}`}
    >
      {logo.name}
    </div>
  );
}

function hasPublicAsset(relativePath: string) {
  return [
    join(process.cwd(), "public", relativePath),
    join(process.cwd(), "client_v2", "public", relativePath),
  ].some((candidate) => existsSync(candidate));
}
