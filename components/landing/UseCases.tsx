import {
  Building2,
  ShoppingCart,
  HeartPulse,
  Home,
  GraduationCap,
  Plane,
  ArrowUpRight,
} from "lucide-react";

const useCases = [
  {
    icon: Building2,
    title: "B2B SaaS",
    subtitle: "Customer Support",
    description:
      "AI agents handle technical onboarding, feature explanations, and troubleshooting. Reduce ticket volume by 80% with instant, context-aware answers.",
    stat: "80%",
    statLabel: "ticket reduction",
    accent: "#3f63d8",
    accentBg: "#dde7ff",
    link: "/solutions/saas-platforms",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    subtitle: "Order Management",
    description:
      "Automate order tracking, returns, and recommendations across web chat and WhatsApp. Handle peak traffic without seasonal hiring.",
    stat: "24/7",
    statLabel: "availability",
    accent: "#2e9d63",
    accentBg: "#d8f5e3",
    link: "/solutions/e-commerce-retail",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    subtitle: "Appointment Scheduling",
    description:
      "Voice AI agents handle bookings, reminders, and follow-ups. Free staff to focus on patient care instead of admin tasks.",
    stat: "40%",
    statLabel: "fewer no-shows",
    accent: "#d44a5c",
    accentBg: "#ffe0e6",
    link: "/solutions/healthcare",
  },
  {
    icon: Home,
    title: "Real Estate",
    subtitle: "Lead Qualification",
    description:
      "Qualify prospects instantly via WhatsApp and voice. AI collects requirements, schedules viewings, and nurtures leads.",
    stat: "3×",
    statLabel: "faster response",
    accent: "#c57f1e",
    accentBg: "#fff3d6",
    link: "/solutions/real-estate",
  },
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Course Support",
    description:
      "Answer student questions about courses, assignments, and admissions 24/7. Personalized learning assistance at scale.",
    stat: "95%",
    statLabel: "satisfaction",
    accent: "#7c3aed",
    accentBg: "#ede4ff",
    link: "/solutions/education",
  },
  {
    icon: Plane,
    title: "Travel",
    subtitle: "Hospitality Booking",
    description:
      "Handle booking inquiries, itinerary changes, and travel recommendations. Instant support in 95+ languages.",
    stat: "95+",
    statLabel: "languages",
    accent: "#0e7490",
    accentBg: "#d5f5ff",
    link: "/solutions/travel-tourism",
  },
];

export default function UseCases() {
  return (
    <section
      className="landing-home-section landing-home-section--plain"
      id="use-cases"
    >
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-[860px] text-center">
          <div className="landing-home-eyebrow mb-5">
            Industries
          </div>
          <h2 className="landing-home-title text-balance text-[30px] leading-[1.1] tracking-[-0.03em] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Real teams. Real outcomes.{" "}
            <span className="landing-home-title-muted">10x more support, same headcount.</span>
          </h2>
          <p className="landing-home-copy mx-auto mt-6 max-w-[600px] text-balance text-[15px] md:text-[17px]">
            Here&rsquo;s what Verly does for teams in 6 industries — with the numbers to back it up.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <a
              key={uc.title}
              href={uc.link}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-[#d7e2f4] bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.15] blur-3xl"
                style={{ background: uc.accent }}
              />

              <div>
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
                  style={{ backgroundColor: uc.accentBg, color: uc.accent }}
                >
                  <uc.icon className="h-6 w-6" />
                </div>

                <h3 className="font-title-bold text-[1.3rem] leading-snug tracking-[-0.03em] text-[#0b1536]">
                  {uc.title}
                  <span className="block text-[0.85rem] font-medium text-[#7b89a4]">
                    {uc.subtitle}
                  </span>
                </h3>

                <p className="mt-3 text-[0.88rem] leading-[1.7] text-[#5d6b85]">
                  {uc.description}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-[1.6rem] font-bold leading-none tracking-tight"
                    style={{ color: uc.accent }}
                  >
                    {uc.stat}
                  </span>
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#8a97af]">
                    {uc.statLabel}
                  </span>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e2f4] bg-[#f7faff] text-[#7b89a4]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[0.92rem] text-[#7b89a4]">
            Don&apos;t see your industry?{" "}
            <a
              href="/solutions"
              className="font-semibold text-[#315EEA] underline decoration-[#315EEA]/30 underline-offset-4"
            >
              Explore all solutions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
