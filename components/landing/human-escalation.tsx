import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";
import {
  Bot,
  Mail,
  Sparkles,
  Ticket,
  Upload,
} from "lucide-react";

import HumanEscalationVisual from "@/components/landing/human-escalation-visual";

type IntegrationLogo = {
  name: string;
  src: string;
  available: boolean;
  badgeClassName: string;
};

const integrationLogos: IntegrationLogo[] = [
  {
    name: "HubSpot",
    src: "/integrations/hubspot.png",
    available: hasPublicAsset("integrations/hubspot.png"),
    badgeClassName: "border-[#ffd9bf] bg-[#fff3ea] text-[#bf612d]",
  },
  {
    name: "Slack",
    src: "/integrations/slack.png",
    available: hasPublicAsset("integrations/slack.png"),
    badgeClassName: "border-[#e5d5ff] bg-[#f7f1ff] text-[#6f42c1]",
  },
  {
    name: "Zendesk",
    src: "/integrations/zendesk.png",
    available: hasPublicAsset("integrations/zendesk.png"),
    badgeClassName: "border-[#d9dfeb] bg-[#f4f7fb] text-[#334155]",
  }
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
      <div className="relative mx-auto max-w-[1360px] px-4 md:px-6">
        <div className="space-y-10">
          <div className="space-y-5">

            <h2 className="text-[28px] leading-[1.08] tracking-[-0.04em] md:text-[34px] lg:text-[42px] lg:whitespace-nowrap">
              When AI needs backup, your team steps in ready.
            </h2>

            <p className="landing-home-copy max-w-[780px] text-[16px] leading-[1.75] md:text-[18px]">
              Verly escalates complex conversations into the tools your team
              already uses, creates the right support workflow automatically,
              and carries the full context forward so every handoff feels
              instant instead of interrupted.
            </p>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div className="order-2 rounded-[28px] border border-[#e1e8f6] bg-white/88 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm lg:order-1 lg:p-7">
              <ul className="space-y-6">
                {valuePoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <li key={point.title}>
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

                      {point.title !== valuePoints[valuePoints.length - 1].title ? (
                        <div className="mt-6 border-b border-[#e7edf7]" />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <HumanEscalationVisual />
            </div>
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
          className="h-8 w-auto object-contain"
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
