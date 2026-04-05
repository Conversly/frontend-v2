import Link from "next/link";
import {
  ArrowRight,
  Cylinder,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const securityCards = [
  {
    title: "Your data stays yours",
    description:
      "Your customer data stays isolated to your workspace and is never used to train shared models.",
    icon: Cylinder,
    accentClassName:
      "from-[#67d9ec]/25 via-[#d9fbff]/80 to-[#eff8ff] text-[#315eea]",
    iconClassName: "text-[#52cfe0]",
  },
  {
    title: "Data encryption",
    description:
      "All data is encrypted at rest and in transit using modern, industry-standard encryption controls.",
    icon: LockKeyhole,
    accentClassName:
      "from-[#96d9a2]/22 via-[#f2fff5]/82 to-[#f6fbf6] text-[#2b7a47]",
    iconClassName: "text-[#62b76c]",
  },
  {
    title: "Secure integrations",
    description:
      "Verified variables and controlled access patterns ensure users only reach data they are allowed to see.",
    icon: ShieldCheck,
    accentClassName:
      "from-[#f4c39f]/24 via-[#fff5ec]/84 to-[#fffaf5] text-[#b86133]",
    iconClassName: "text-[#e08a57]",
  },
] as const;


export default function SecurityPrivacySection() {
  return (
    <section className="landing-home-section landing-home-section--soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,94,234,0.10),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(103,217,236,0.16),transparent_20%),radial-gradient(circle_at_18%_88%,rgba(244,195,159,0.10),transparent_24%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,31,27,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,31,27,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="landing-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="landing-home-eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#f6b5c7]" />
                Security &amp; Privacy
              </div>

              <h2 className="landing-home-title mt-6 text-[38px] md:text-[56px]">
                Enterprise-grade
                <span className="block">security &amp; privacy</span>
              </h2>

              <p className="landing-home-copy mt-6 max-w-[560px] text-[16px] md:text-[17px]">
                Verly gives teams the speed of AI without giving up control. Your
                data is used only for your AI agent, never shared across
                customers, and never used to train shared models. From secure
                ingest to production workflows, we design every layer so support
                teams can automate confidently in regulated, high-trust
                environments.
              </p>

              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[16px]">
                That means stronger governance for every conversation: policy-aware
                execution, configurable retention, auditable decisions, and secure
                controls around who can access what. You get faster deployment,
                safer automation, and a platform enterprise buyers can trust.
              </p>
            </div>

            <div className="mt-10 border-t border-[#dfe4ef] pt-5">
              <div className="flex flex-col gap-4 text-[#5f584f] md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-[15px] font-medium">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ddf0] bg-white text-[#315eea] shadow-[0_8px_20px_rgba(49,94,234,0.08)]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span>Verly is built to safeguard customer data at every step.</span>
                </div>

                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#315eea] transition-colors hover:text-[#224bc9]"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {securityCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-[28px] border border-[#e1e8f6] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,250,255,0.98)_100%)] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(37,99,235,0.08)] md:p-7"
                >
                  <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_180px]">
                    <div className="relative z-10 max-w-[420px]">
                      <h3 className="text-[27px] font-semibold tracking-[-0.03em] text-[#221f1b]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-[#6d665d] md:text-[16px]">
                        {card.description}
                      </p>
                    </div>

                    <div className="relative hidden h-full min-h-[120px] md:block">
                      <div
                        className={`absolute inset-y-[-40px] right-[-48px] w-[220px] rounded-[40px] bg-gradient-to-br ${card.accentClassName}`}
                      />
                      <div className="absolute inset-y-0 right-0 flex w-[170px] items-center justify-center">
                        <div className="relative flex h-[124px] w-[124px] items-center justify-center rounded-[36px] border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-sm">
                          <div className="absolute inset-4 rounded-[28px] border border-white/70" />
                          <Icon className={`relative z-10 h-16 w-16 stroke-[1.65] ${card.iconClassName}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
