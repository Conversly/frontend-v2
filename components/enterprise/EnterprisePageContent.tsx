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
    iconColor: "text-cyan-500",
    accentBg: "bg-gradient-to-br from-cyan-100/60 to-cyan-50/30",
    accentRing: "ring-cyan-200/50",
    dotColor: "bg-cyan-300",
    dotAccent: "bg-cyan-400/30",
  },
  {
    title: "Encryption and controlled access",
    description:
      "Data is protected in transit and at rest, while teams can enforce clearer access boundaries for operational and compliance needs.",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    accentBg: "bg-gradient-to-br from-emerald-100/60 to-emerald-50/30",
    accentRing: "ring-emerald-200/50",
    dotColor: "bg-emerald-300",
    dotAccent: "bg-emerald-400/30",
  },
  {
    title: "Secure integrations",
    description:
      "Verly can sit inside verified, permissioned workflows so users only access the records, actions, and systems they are allowed to touch.",
    icon: Network,
    iconColor: "text-orange-500",
    accentBg: "bg-gradient-to-br from-orange-100/60 to-amber-50/30",
    accentRing: "ring-orange-200/50",
    dotColor: "bg-orange-300",
    dotAccent: "bg-orange-400/30",
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
    <main className="min-h-screen bg-white text-[#221f1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#efeade_50%,#f8fbff_100%)] px-5 pb-18 pt-28 md:px-8 md:pb-22 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(49,94,234,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.06),transparent_36%)]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-[22rem] w-[22rem] -translate-x-1/2 transform-gpu rounded-full bg-blue-200/15 blur-[80px]" />

        <div className="relative mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-start">
          <div className="max-w-[660px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d2c5] bg-white/90 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#315EEA]" />
              Enterprise
            </div>
            <h1 className="mt-6 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
              Built to pass your security review on the first try.
            </h1>
            <p className="mt-5 max-w-[580px] text-[16px] leading-8 text-[#6d665d] md:text-[18px]">
              SOC 2 Type II, SSO/SAML, regional data residency, audit logs, custom DPAs, and a named contact for every incident. If you have a procurement checklist, we&rsquo;ve probably already seen it.
            </p>

            <div className="mt-8 grid gap-3">
              {heroSignals.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[18px] border border-[#e7edf8] bg-white/95 px-4 py-3 shadow-[0_6px_20px_rgba(44,56,92,0.04)]"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#315EEA]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[14px] leading-6 text-[#4a4540]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(49,94,234,0.3)] transition-all hover:bg-[#264fd4] hover:-translate-y-0.5"
              >
                Talk to sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex h-13 items-center justify-center rounded-full border border-[#e4ddd4] bg-white px-7 text-[14px] font-semibold text-[#1e1c19] transition-all hover:bg-[#fafaf9] hover:-translate-y-0.5"
              >
                Explore all solutions
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {trustLogos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-full border border-[#e0dbd3] bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#8a8275]"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:sticky lg:top-32">
            {/* Card shell */}
            <div className="relative overflow-hidden rounded-[24px] border border-[#ddd7ca] bg-white shadow-[0_24px_64px_rgba(59,43,22,0.10)]">
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-[#315EEA] via-[#7c5cdb] to-[#e8a848]" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-1 pt-5">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-medium tracking-wide text-[#8a8275]">
                    Enterprise inquiry
                  </span>
                </div>
                <span className="hidden text-[10px] text-[#b0a898] sm:block">
                  Response in 1 business day
                </span>
              </div>

              {/* Divider */}
              <div className="mx-6 my-3 h-px bg-white/[0.05]" />

              {/* Form */}
              <div className="px-6 pb-6">
                <EnterpriseInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Light sections wrapper with about-page background system ── */}
      <div className="relative z-10 bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.14),transparent_20%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_18%),radial-gradient(circle_at_70%_34%,rgba(139,92,246,0.10),transparent_16%),linear-gradient(180deg,#fdfbf6_0%,#f7f9ff_24%,#f8fcf7_50%,#fff8ef_74%,#f7f8ff_100%)]">
        {/* Blur blobs */}
        <div className="pointer-events-none absolute left-[-8rem] top-20 h-[22rem] w-[22rem] transform-gpu rounded-full bg-blue-300/15 blur-[80px]" />
        <div className="pointer-events-none absolute right-[-6rem] top-[28rem] h-[20rem] w-[20rem] transform-gpu rounded-full bg-emerald-300/15 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-[18rem] left-[18%] h-[18rem] w-[18rem] transform-gpu rounded-full bg-violet-300/15 blur-[80px]" />
        <div className="pointer-events-none absolute left-[55%] top-[50%] h-[16rem] w-[16rem] transform-gpu rounded-full bg-amber-200/12 blur-[70px]" />
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(120,145,201,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

        {/* ── Key Metrics — neutral tone ── */}
        <section className="relative px-5 py-12 md:px-8 md:py-14">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.10),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(120,145,201,0.08),transparent_36%),linear-gradient(180deg,#fafbfd_0%,#f7f8fb_50%,#fafbfd_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto grid max-w-[1360px] gap-4 md:grid-cols-4">
            {[
              { value: "1", label: "shared support layer across web, voice, and WhatsApp" },
              { value: "24/7", label: "coverage without forcing round-the-clock staffing growth" },
              { value: "Role-based", label: "controls for enterprise teams with sensitive workflows" },
              { value: "Custom", label: "integration and handoff design for real operating stacks" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-[26px] border border-[#d9e4f6] bg-white/90 px-5 py-5 shadow-[0_14px_32px_rgba(43,58,94,0.06)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] tracking-[-0.04em] text-[#111f49] md:text-[38px]">
                  {metric.value}
                </div>
                <div className="mt-2 text-[13px] leading-6 text-[#5c6578]">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Capabilities — sky tone ── */}
        <section className="relative px-5 py-16 md:px-8 md:py-22">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_25%_18%,rgba(62,128,241,0.12),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(139,92,246,0.08),transparent_32%),linear-gradient(180deg,#f8faff_0%,#f2f6ff_50%,#f8faff_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px]">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                What&apos;s included
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3.125rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                The enterprise layer around{" "}
                <span className="text-[#6e6558]">Verly</span>
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
                  className={`rounded-[30px] border border-[#dce5f3] bg-gradient-to-br ${feature.accent} p-5 shadow-[0_18px_38px_rgba(43,58,94,0.08)] transition-all duration-300 hover:-translate-y-1`}
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
                  className="rounded-[26px] border border-[#e4ddd2] bg-white/92 p-6 shadow-[0_12px_28px_rgba(59,43,22,0.05)] transition-all duration-300 hover:-translate-y-1"
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

        {/* ── Rollout — warm tone ── */}
        <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffefb_0%,#faf5ec_50%,#fffefb_100%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(210,185,140,0.32),transparent)]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                <Globe2 className="h-3 w-3 text-[#9d6b1b]" />
                How rollout works
              </div>
              <h2 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                From discovery to governed{" "}
                <span className="text-[#6e6558]">production launch</span>
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                Verly works best when the workflow, integrations, escalation design,
                and security posture are shaped together — not a drop-in bot exercise.
              </p>
            </div>

            <div className="grid gap-3">
              {rolloutSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="group rounded-[22px] border border-[#eadfc8] bg-white px-6 py-5 shadow-[0_4px_16px_rgba(89,64,28,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(89,64,28,0.08)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e1c19] text-[13px] font-bold text-white">
                      0{index + 1}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[18px] font-semibold text-[#221f1b]">{step.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-7 text-[#6d665d]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Security ── */}
        <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-white" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.24),transparent)]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d2c5] bg-[#fafaf9] px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Security
              </div>
              <h2 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                Enterprise-grade security{" "}
                <span className="text-[#6e6558]">& privacy</span>
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
                We take security and compliance seriously. Your data stays yours. Data encryption.
                Secure integrations. SOC 2 Type II certified and GDPR compliant.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e4ddd4] bg-white">
                    <span className="text-[11px] font-bold tracking-wide text-[#5f5a53]">SOC 2</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#b0a898]">Type II</span>
                </div>
                <div className="h-8 w-px bg-[#e4ddd4]" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e4ddd4] bg-white">
                    <ShieldCheck className="h-5 w-5 text-[#5f5a53]" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#b0a898]">GDPR</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {securityCards.map((card) => (
                <div
                  key={card.title}
                  className="group overflow-hidden rounded-[22px] border border-[#e8e4de] bg-[#fafaf9] px-6 py-5 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_24px_rgba(43,58,94,0.06)]"
                >
                  <div className="flex items-center gap-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#221f1b]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-7 text-[#6d665d]">{card.description}</p>
                    </div>
                    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                      <div className={`absolute inset-0 rounded-[18px] ${card.accentBg} ring-1 ${card.accentRing} transition-transform duration-300 group-hover:scale-105`} />
                      <div className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${card.dotAccent}`} />
                      <div className={`absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full ${card.dotColor} opacity-40`} />
                      <card.icon className={`relative h-6 w-6 ${card.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust bar */}
          <div className="relative mx-auto mt-12 max-w-[1200px]">
            <div className="flex items-center justify-between rounded-2xl border border-[#e4ddd4] bg-[#fafaf9] px-6 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#315EEA]" />
                <span className="text-[14px] font-medium text-[#5f5a53]">
                  Verly is committed to safeguarding your data.
                </span>
              </div>
              <Link
                href="/privacy"
                className="flex items-center gap-1 text-[13px] font-medium text-[#8a8275] transition-colors hover:text-[#221f1b]"
              >
                Learn more
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Enterprise Fit — mint tone ── */}
        <section className="relative px-5 py-16 md:px-8 md:py-22">
          <div className="pointer-events-none absolute inset-x-3 inset-y-2 rounded-[2.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.10),transparent_36%),radial-gradient(circle_at_70%_72%,rgba(62,128,241,0.08),transparent_32%),linear-gradient(180deg,#f8fcf9_0%,#f2faf5_50%,#f8fcf9_100%)] md:inset-x-6" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(120,180,150,0.28),transparent)]" />
          <div className="relative mx-auto max-w-[1360px]">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="inline-flex items-center rounded-full border border-[#d9d2c5] bg-white px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7468] shadow-sm">
                Enterprise fit
              </div>
              <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.04em] text-[#221f1b]">
                Who this page is{" "}
                <span className="text-[#6e6558]">for</span>
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
                  className="rounded-[28px] border border-[#d6eadb] bg-white p-6 shadow-[0_12px_28px_rgba(36,86,59,0.06)] transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-[20px] font-semibold text-[#221f1b]">{fit.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#6d665d]">{fit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Final CTA — dark with depth ── */}
      <section className="relative overflow-hidden bg-[#0f1b3d] px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.14),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(49,94,234,0.12),transparent_36%),radial-gradient(circle_at_50%_50%,rgba(62,128,241,0.06),transparent_50%)]" />
        <div className="pointer-events-none absolute left-[-6rem] top-[20%] h-[18rem] w-[18rem] transform-gpu rounded-full bg-violet-500/10 blur-[70px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[-4rem] h-[16rem] w-[16rem] transform-gpu rounded-full bg-blue-500/10 blur-[70px]" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[clamp(2rem,4vw,3.125rem)] leading-[1.04] tracking-[-0.04em] text-white">
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
