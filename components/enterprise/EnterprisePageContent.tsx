import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Headphones,
  LockKeyhole,
  Network,
  ShieldCheck,
  SquareChartGantt,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import EnterpriseInquiryForm from "@/components/enterprise/EnterpriseInquiryForm";
import { siteConfig } from "@/lib/metadata";

const heroSignals = [
  "Custom integrations across CRM, helpdesk, telephony, and internal tooling",
  "Shared AI, voice, and WhatsApp workflows with human handoff built in",
  "Security review, rollout planning, and deployment paths shaped around your operating model",
];

const trustLogos = [
  "Global support teams",
  "Multi-brand operators",
  "Regulated environments",
  "Revenue-critical workflows",
  "Ops-heavy enterprises",
];

const featuredCapabilities = [
  {
    title: "Dedicated rollout support",
    description:
      "Work directly with Verly on discovery, workflow design, handoff logic, and launch sequencing so the deployment matches how your teams actually operate.",
    icon: Headphones,
    accent: "from-[#eff6ff] via-[#e0ecff] to-[#fff9ef]",
    panel: (
      <div className="rounded-[26px] border border-[#dbe5f3] bg-white/88 p-4 shadow-[0_14px_32px_rgba(47,68,112,0.08)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#eaf1ff] px-3 py-1 text-[11px] font-semibold text-[#315EEA]">
            Rollout plan
          </span>
          <span className="text-[11px] font-medium text-[#6d7f9e]">Week 1-3</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {["Discovery workshop", "Knowledge setup", "Routing + escalation QA"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl bg-[#f7fbff] px-3 py-2 text-[13px] text-[#31456f]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Custom integrations and actions",
    description:
      "Connect Verly to the systems that matter in production, including ticketing, order data, patient workflows, CRM records, identity checks, and internal APIs.",
    icon: Network,
    accent: "from-[#fff7e8] via-[#fcefd3] to-[#eef5ff]",
    panel: (
      <div className="grid gap-3 md:grid-cols-2">
        {["CRM sync", "Helpdesk", "Telephony", "Internal APIs"].map((item) => (
          <div
            key={item}
            className="rounded-[22px] border border-[#eadfc8] bg-white/88 px-4 py-4 text-[13px] font-semibold text-[#624d2f] shadow-[0_10px_24px_rgba(89,64,28,0.07)]"
          >
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Governed enterprise operations",
    description:
      "Run AI automation with clear boundaries, approval paths, auditability, and escalation rules so sensitive conversations do not drift into unsafe territory.",
    icon: ShieldCheck,
    accent: "from-[#edf9f2] via-[#dff5ea] to-[#eef5ff]",
    panel: (
      <div className="rounded-[26px] border border-[#dbeadd] bg-white/90 p-4 shadow-[0_14px_32px_rgba(36,86,59,0.08)]">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["100%", "traceable handoff"],
            ["Role-based", "access control"],
            ["Policy-led", "response rules"],
            ["Channel-wide", "governance"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[20px] bg-[#f5fbf7] px-3 py-4">
              <div className="text-[15px] font-semibold text-[#214d34]">{value}</div>
              <div className="mt-1 text-[12px] leading-5 text-[#64806e]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const supportCapabilities = [
  {
    title: "Dedicated account partner",
    description:
      "One point of contact for escalations, rollout changes, and operational tuning as volume grows.",
    icon: Building2,
  },
  {
    title: "Higher scale limits",
    description:
      "Handle more conversations, more sources, and more channels without fragmenting support logic.",
    icon: SquareChartGantt,
  },
  {
    title: "Flexible deployment shape",
    description:
      "Support dedicated-instance and enterprise infrastructure requirements when standard SaaS paths are not enough.",
    icon: Workflow,
  },
];

const rolloutSteps = [
  {
    title: "Map the workflow",
    description:
      "We identify where Verly should answer, what systems it needs, and where human teams should take over.",
  },
  {
    title: "Connect the operating stack",
    description:
      "Knowledge, CRM, helpdesk, telephony, and internal APIs are wired into one governed support layer.",
  },
  {
    title: "Launch with controls",
    description:
      "Responses, escalation rules, channel behavior, and analytics are tuned before broader production rollout.",
  },
];

const securityCards = [
  {
    title: "Your data stays yours",
    description:
      "Customer conversations, business context, and enterprise knowledge remain scoped to your Verly workflows and are not repurposed for model training.",
    icon: LockKeyhole,
    tone: "bg-[#f5f9ff] border-[#dbe7fb] text-[#2d4d8f]",
  },
  {
    title: "Encryption and controlled access",
    description:
      "Data is protected in transit and at rest, while teams can enforce clearer access boundaries for operational and compliance needs.",
    icon: ShieldCheck,
    tone: "bg-[#f6fbf7] border-[#d6eadb] text-[#23603d]",
  },
  {
    title: "Secure integrations",
    description:
      "Verly can sit inside verified, permissioned workflows so users only access the records, actions, and systems they are allowed to touch.",
    icon: Network,
    tone: "bg-[#fff8ee] border-[#f0dfc3] text-[#8a5d25]",
  },
];

const enterpriseFits = [
  {
    title: "Complex support organizations",
    description:
      "Teams running multiple geographies, brands, languages, or business units that need one orchestration layer instead of disconnected bots.",
  },
  {
    title: "Security-sensitive operators",
    description:
      "Healthcare, finance, enterprise SaaS, and operations teams that need strong guardrails before putting AI into production.",
  },
  {
    title: "Custom workflow environments",
    description:
      "Businesses that need Verly to trigger actions, read internal context, and fit non-standard handoff or routing logic.",
  },
];

export default function EnterprisePageContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Enterprise", item: `${siteConfig.url}/solutions/enterprise` },
    ],
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ecf3ff_0%,#f7f9ff_16%,#f9f3e9_54%,#ffffff_100%)] text-[#221f1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <section className="relative overflow-hidden bg-[#0c1530] px-5 pb-18 pt-28 text-white md:px-8 md:pb-22 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,164,255,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,217,140,0.14),transparent_28%),linear-gradient(180deg,rgba(9,17,39,0.92),rgba(12,21,48,1))]" />
        <div className="absolute left-[-10%] top-[22%] h-72 w-72 rounded-full bg-[#315EEA]/18 blur-3xl" />
        <div className="absolute right-[-6%] top-[12%] h-80 w-80 rounded-full bg-[#f3b458]/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.95fr_0.92fr] lg:items-start">
          <div className="max-w-[660px]">
            <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9d7ff]">
              Enterprise for Verly
            </div>
            <h1 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[42px] leading-[0.96] tracking-[-0.05em] text-white md:text-[68px]">
              AI customer support for teams that need more control than a basic chatbot gives.
            </h1>
            <p className="mt-5 max-w-[620px] text-[16px] leading-8 text-white/72 md:text-[18px]">
              Verly helps enterprise teams run web chat, voice, and WhatsApp support with custom
              integrations, governed workflows, and rollout support designed around real operations,
              not a generic self-serve widget.
            </p>

            <div className="mt-8 grid gap-3">
              {heroSignals.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/12 text-[#98b2ff]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[14px] leading-6 text-white/78">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_16px_34px_rgba(49,94,234,0.34)] transition-all hover:bg-[#264fd4]"
              >
                Book a custom demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/12 bg-white/8 px-7 text-[14px] font-semibold text-white transition-all hover:bg-white/12"
              >
                Explore all solutions
              </Link>
            </div>

            <div className="mt-9 rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c9d7ff]">
                Built for modern support operations
              </div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {trustLogos.map((logo) => (
                  <div
                    key={logo}
                    className="rounded-full border border-white/10 bg-white/7 px-4 py-2 text-[12px] font-medium text-white/72"
                  >
                    {logo}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[22px] border border-white/10 bg-[#121f43] px-5 py-4">
                <p className="text-[14px] leading-7 text-white/78">
                  "Enterprise buyers need more than automation. They need confidence in how AI
                  answers, how it escalates, what it can access, and how it fits their workflow.
                  That is the layer Verly is built to support."
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[34px] bg-[linear-gradient(135deg,rgba(49,94,234,0.34),rgba(255,205,122,0.14))] blur-2xl" />
            <div className="relative rounded-[34px] border border-white/10 bg-white/6 p-2 shadow-[0_30px_80px_rgba(3,9,24,0.36)] backdrop-blur-sm">
              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-3">
                <div className="mb-3 flex items-center justify-between rounded-[24px] border border-white/10 bg-[#101b3d] px-4 py-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a7bfff]">
                      Enterprise planning
                    </div>
                    <div className="mt-1 text-[14px] font-medium text-white/80">
                      Tell us about your workflow and requirements
                    </div>
                  </div>
                  <div className="hidden rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] font-medium text-white/66 sm:block">
                    Response in 1 business day
                  </div>
                </div>
                <EnterpriseInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-[1360px] gap-4 md:grid-cols-4">
          {[
            { value: "1", label: "shared support layer across web, voice, and WhatsApp" },
            { value: "24/7", label: "coverage without forcing round-the-clock staffing growth" },
            { value: "Role-based", label: "controls for enterprise teams with sensitive workflows" },
            { value: "Custom", label: "integration and handoff design for real operating stacks" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-[26px] border border-[#d9e4f6] bg-white/90 px-5 py-5 shadow-[0_14px_32px_rgba(43,58,94,0.06)]"
            >
              <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] tracking-[-0.04em] text-[#111f49] md:text-[38px]">
                {metric.value}
              </div>
              <div className="mt-2 text-[13px] leading-6 text-[#5c6578]">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-22">
        <div className="mx-auto max-w-[1360px]">
          <div className="mx-auto max-w-[760px] text-center">
            <div className="inline-flex rounded-full border border-[#dde6f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#5f6f8c]">
              What&apos;s included
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[50px]">
              The enterprise layer around Verly
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              Enterprise is how Verly becomes production-ready for larger teams: deeper workflow
              integration, stronger controls, and rollout support that aligns with how your support
              and operations functions already run.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredCapabilities.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-[30px] border border-[#dce5f3] bg-gradient-to-br ${feature.accent} p-5 shadow-[0_18px_38px_rgba(43,58,94,0.08)]`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/82 text-[#315EEA] shadow-[0_10px_24px_rgba(49,94,234,0.12)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em] text-[#221f1b]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[#5f5a53]">{feature.description}</p>
                <div className="mt-5">{feature.panel}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {supportCapabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-[#e4ddd2] bg-white/92 p-6 shadow-[0_12px_28px_rgba(59,43,22,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7efe3] text-[#9b6d2f]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-[18px] font-semibold text-[#221f1b]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fffefb_0%,#f7f2e8_100%)] px-5 py-16 md:px-8 md:py-22">
        <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-[#eadfc8] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#8a6b43]">
              How rollout works
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              From discovery to governed production launch
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              Verly works best in enterprise when the workflow, integrations, escalation design,
              and security posture are shaped together. This is not a drop-in bot exercise. It is a
              production support system rollout.
            </p>
            <div className="mt-6 rounded-[26px] border border-[#eadfc8] bg-white/80 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff4de] text-[#9d6b1b]">
                  <Globe2 className="h-5 w-5" />
                </div>
                <p className="text-[14px] leading-7 text-[#5f5a53]">
                  One enterprise setup can unify support behavior across channels, languages, and
                  customer journeys while still respecting team-specific rules and compliance needs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {rolloutSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[28px] border border-[#eadfc8] bg-white p-6 shadow-[0_14px_32px_rgba(89,64,28,0.06)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff4de] text-[16px] font-semibold text-[#8a5d25]">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#221f1b]">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-[#6d665d]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f5f9ff_0%,#ffffff_100%)] px-5 py-16 md:px-8 md:py-22">
        <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-[#dce6ff] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#315EEA]">
              Security
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              Enterprise-grade security and privacy posture, made explicit for technical buyers
            </h2>
            <p className="mt-4 max-w-[570px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              Larger teams do not evaluate AI support on UX alone. They need to understand what the
              system can access, how data is handled, where controls sit, and what deployment paths
              exist before rollout.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Stronger operational boundaries for sensitive support workflows",
                "Clearer security review conversations for procurement and technical stakeholders",
                "Deployment flexibility when default SaaS boundaries are not enough",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[18px] border border-[#dde6f4] bg-white px-4 py-3"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#315EEA]" />
                  <span className="text-[14px] leading-6 text-[#465266]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {securityCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-[30px] border p-6 shadow-[0_16px_34px_rgba(43,58,94,0.06)] ${card.tone}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/72">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#221f1b]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-7 text-[#516073]">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-22">
        <div className="mx-auto max-w-[1360px]">
          <div className="mx-auto max-w-[760px] text-center">
            <div className="inline-flex rounded-full border border-[#dde6f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#5f6f8c]">
              Enterprise fit
            </div>
            <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.06] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              Who this page is for
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
              If your team needs strong workflow control, real integrations, and AI support that can
              survive procurement and security review, this is the Verly path built for that motion.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {enterpriseFits.map((fit) => (
              <div
                key={fit.title}
                className="rounded-[28px] border border-[#dde6f4] bg-white p-6 shadow-[0_12px_28px_rgba(43,58,94,0.06)]"
              >
                <h3 className="text-[20px] font-semibold text-[#221f1b]">{fit.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[#6d665d]">{fit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1b3d] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.04] tracking-[-0.04em] text-white md:text-[50px]">
            Bring Verly into your enterprise workflow with a clearer rollout path
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-7 text-white/66 md:text-[17px]">
            Talk to us about security review, channel rollout, custom integrations, escalation
            design, and how Verly fits the operation your team already runs today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-8 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(49,94,234,0.34)] transition-all hover:bg-[#264fd4]"
            >
              Book a custom demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="mailto:team@verlyai.xyz"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-[14px] font-semibold text-white transition-all hover:bg-white/10"
            >
              Email our team
            </Link>
          </div>
        </div>
      </section>

      <Footer hideCta />
    </main>
  );
}
