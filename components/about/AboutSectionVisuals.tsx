'use client';

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck2,
  Clock3,
  MessageSquareMore,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";

const flowSteps = [
  {
    label: "Low CSAT review",
    icon: MessageSquareMore,
    tone: "from-[#f27266] to-[#e55a53]",
  },
  {
    label: "If CSAT < 4",
    icon: BadgeCheck,
    tone: "from-[#f39a72] to-[#ec7f62]",
  },
  {
    label: "Wait 24 hours",
    icon: Clock3,
    tone: "from-[#4f9fc2] to-[#3b85ae]",
  },
  {
    label: "Request review",
    icon: Sparkles,
    tone: "from-[#5c8cf1] to-[#4674df]",
  },
] as const;

const sideSteps = [
  { icon: UserRoundPlus, label: "Created an account" },
  { icon: CalendarCheck2, label: "Booked a demo" },
  { icon: BadgeCheck, label: "Left a rating" },
  { icon: Sparkles, label: "Became a customer" },
] as const;

export function AboutWorkflowVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[2rem] border border-[#f0d8d4] bg-[radial-gradient(circle_at_top,#fff7f6,transparent_55%),linear-gradient(180deg,#fdeeee_0%,#f9ecec_100%)] p-7 shadow-[0_18px_50px_rgba(171,115,115,0.10)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_60%)]" />
      <div className="relative rounded-[1.7rem] border border-white/80 bg-[#eff4fb] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-start">
          <div className="rounded-[1.2rem] border border-[#d7deee] bg-white p-3 shadow-sm">
            <div className="mb-3 text-[0.95rem] font-semibold leading-5 text-[#23314f]">
              Drag and drop
              <br />
              block template
            </div>
            <div className="space-y-2.5">
              {sideSteps.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[0.95rem] border border-[#e6ebf5] bg-[#f8fbff] p-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5a84de] shadow-sm">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="text-[0.76rem] font-medium leading-4 text-[#55627d]">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative px-2 md:px-4">
            <div className="absolute left-[28px] top-0 hidden h-full w-px bg-[#8ab0f3] md:block" />
            <div className="space-y-5">
              {flowSteps.map((step, index) => (
                <div key={step.label} className="relative">
                  {index !== flowSteps.length - 1 && (
                    <div className="absolute left-[20px] top-[56px] hidden h-8 w-px border-l-2 border-dashed border-[#8ab0f3] md:block" />
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + index * 0.08 }}
                    whileHover={{ x: 4 }}
                    className={`relative ml-0 flex items-center gap-3 rounded-full bg-gradient-to-r ${step.tone} px-4 py-3 text-white shadow-[0_10px_24px_rgba(67,86,122,0.18)] md:ml-10`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/92 text-[#4669b9] shadow-sm">
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="text-[0.98rem] font-semibold tracking-[-0.02em]">
                      {step.label}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
