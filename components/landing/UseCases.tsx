"use client";

import { motion } from "framer-motion";
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
    link: "/solutions?filter=support",
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
    link: "/solutions?industry=retail",
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
    link: "/solutions?industry=healthcare",
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
    link: "/solutions?filter=commerce",
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
    link: "/solutions",
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
    link: "/solutions",
  },
];

export default function UseCases() {
  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_50%,#f7f4ee_100%)] py-20 md:py-28"
      id="use-cases"
    >
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,145,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-[760px] text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
            Industries
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
            Built for every team.
            <span className="block text-[#6e6558]">Trusted across industries.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            See how teams across industries use Verly to automate support, reduce cost, and
            scale without scaling headcount.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <motion.a
              key={uc.title}
              href={uc.link}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#e4ddd4] bg-white p-7 shadow-[0_14px_36px_rgba(59,43,22,0.05)] transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(59,43,22,0.10)]"
            >
              {/* Accent corner glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.15] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.28]"
                style={{ background: uc.accent }}
              />

              <div>
                {/* Icon */}
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
                  style={{ backgroundColor: uc.accentBg, color: uc.accent }}
                >
                  <uc.icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] text-[#1e1c19]">
                  {uc.title}
                  <span className="block text-[0.85rem] font-medium text-[#8a8279]">
                    {uc.subtitle}
                  </span>
                </h3>

                {/* Description */}
                <p className="mt-3 text-[0.88rem] leading-[1.7] text-[#6d665d]">
                  {uc.description}
                </p>
              </div>

              {/* Footer row */}
              <div className="mt-6 flex items-end justify-between">
                {/* Stat */}
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-[1.6rem] font-bold leading-none tracking-tight"
                    style={{ color: uc.accent }}
                  >
                    {uc.stat}
                  </span>
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#9a9189]">
                    {uc.statLabel}
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4ddd4] bg-[#faf8f6] text-[#9a9189] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#1e1c19] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[0.92rem] text-[#8a8279]">
            Don&apos;t see your industry?{" "}
            <a
              href="/solutions"
              className="font-semibold text-[#315EEA] underline decoration-[#315EEA]/30 underline-offset-4 transition-colors hover:text-[#1d47c4]"
            >
              Explore all solutions
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
