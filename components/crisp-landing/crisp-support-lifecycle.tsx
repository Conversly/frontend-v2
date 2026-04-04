"use client";

import { motion } from "framer-motion";
import { PhoneCall, Sparkles, User, Bot } from "lucide-react";
import BackedBy from "./backed-by";

export default function CrispSupportLifecycle() {
  return (
    <section id="support-lifecycle" className="relative overflow-hidden bg-white pt-16 pb-0 text-[#19253b] md:pt-20 md:pb-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_56%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,123,247,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,145,201,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] xl:gap-16">
          <motion.div
            className="max-w-[620px] lg:pr-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#315EEA] shadow-[0_10px_30px_rgba(49,94,234,0.08)] backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Lifecycle Solution
            </div>
            <h2 className="max-w-[13ch] font-[Georgia,Times,'Times_New_Roman',serif] text-[44px] font-semibold leading-[0.92] tracking-[-0.06em] text-[#101828] sm:text-[52px] md:text-[62px] lg:max-w-none lg:text-[68px]">
              A complete customer support lifecycle solution
            </h2>
            <p className="mt-7 max-w-[560px] text-[18px] leading-[1.65] text-[#667085] sm:text-[20px]">
              Verly captures every conversation, learns your business context, provides instant
              support on WhatsApp and Voice, and escalates to humans when it matters most.
            </p>
          </motion.div>

          <ProductMockup />
        </div>
      </div>

      <BackedBy />
    </section>
  );
}

function AvatarIcon({ className }: { className?: string }) {
  return (
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${className}`}>
      <User className="h-4 w-4" />
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0050d4] text-white">
      <Bot className="h-4 w-4" />
    </div>
  );
}

function ProductMockup() {
  return (
    <motion.div
      className="relative flex min-h-[520px] items-center justify-center lg:min-h-[560px]"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-[#0050d4]/5 via-transparent to-[#6a37d4]/5" />

      <div className="relative w-full max-w-[560px]">
        <div className="overflow-hidden rounded-2xl border border-[#abadae]/15 bg-white shadow-2xl transition-transform duration-500 lg:-rotate-2 lg:hover:rotate-0">
          <div className="flex items-center justify-between bg-[#0050d4] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Verly Assistant
              </span>
            </div>
            <span className="text-sm text-white">...</span>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <motion.div
              className="flex max-w-[85%] items-end gap-2"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AvatarIcon className="bg-[#dadddf] text-[#595c5d]" />
              <div className="rounded-lg rounded-bl-sm bg-[#dadddf] px-4 py-3.5 text-[13px] leading-relaxed text-[#2c2f30] sm:text-sm">
                Hi, I&apos;m looking for an update on my order #48291. It hasn&apos;t arrived yet.
              </div>
            </motion.div>

            <motion.div
              className="ml-auto flex max-w-[85%] flex-row-reverse items-end gap-2"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <BotAvatar />
              <div className="rounded-lg rounded-br-sm bg-[#0050d4] px-4 py-3.5 text-[13px] leading-relaxed text-white sm:text-sm">
                Checking that for you... I see it&apos;s currently at the sorting facility in
                Denver. Estimated delivery is tomorrow by 5 PM.
              </div>
            </motion.div>

            <motion.div
              className="flex max-w-[85%] items-end gap-2"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <AvatarIcon className="bg-[#dadddf] text-[#595c5d]" />
              <div className="rounded-lg rounded-bl-sm bg-[#dadddf] px-4 py-3.5 text-[13px] leading-relaxed text-[#2c2f30] sm:text-sm">
                Can I change the delivery address to my office instead?
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-3 border-t border-[#abadae]/10 bg-[#eff1f2] px-4 py-4">
            <div className="flex h-10 flex-1 items-center rounded-full border border-[#abadae]/20 bg-white px-4 text-xs italic text-[#595c5d]">
              Verly is responding...
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0050d4] text-white"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 20 20">
                <path d="m4.3 3.7 11 6.3c.93.53.93 1.87 0 2.4l-11 6.3c-.9.52-2.02-.22-1.85-1.24l1.18-6.76a1.4 1.4 0 000-.48L2.45 4.95C2.28 3.92 3.4 3.18 4.3 3.7Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Handoff card — positioned responsively */}
        <motion.div
          className="absolute -top-6 right-0 w-56 rotate-3 rounded-xl border border-[#abadae]/20 bg-white/85 p-4 shadow-xl backdrop-blur-[20px] transition-transform duration-300 hover:rotate-0 sm:-right-8 sm:-top-12 sm:w-64"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fb5151]/20 text-[#b31b25]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.26 3.1c.77-1.36 2.71-1.36 3.48 0l6.3 11.14c.76 1.35-.2 3.01-1.74 3.01H3.7c-1.54 0-2.5-1.66-1.74-3.01L8.26 3.1Zm1.74 4.15a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0V8a.75.75 0 00-.75-.75Zm0 7a1 1 0 100-2 1 1 0 000 2Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-[#2c2f30]">Human Handoff</h5>
              <p className="mt-1 text-[11px] text-[#595c5d]">
                Complex request detected. User asking for address override.
              </p>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-[#2c2f30] py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700"
              >
                Assign to Me
              </button>
            </div>
          </div>
        </motion.div>

        {/* Channel badges — responsive positioning */}
        <motion.div
          className="absolute -bottom-10 left-2 flex flex-wrap gap-3 sm:-bottom-14 sm:left-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-[#0b9f62]/15 bg-[#006947] px-3.5 py-2.5 text-[11px] font-bold text-white shadow-[0_18px_34px_rgba(0,105,71,0.26)] sm:px-4.5 sm:text-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/20">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17 9.5A7.5 7.5 0 1 0 4.07 14.6L3 18l3.57-.94A7.5 7.5 0 0 0 17 9.5Zm-4.2 1.86c-.18.5-1.05.95-1.45 1.01-.37.06-.84.08-1.35-.08-.31-.1-.7-.23-1.2-.45-2.1-.9-3.47-3.02-3.58-3.17-.1-.15-.86-1.15-.86-2.2 0-1.04.55-1.56.74-1.77.2-.2.43-.26.57-.26h.4c.13 0 .3-.05.47.37.18.43.61 1.48.67 1.59.05.1.08.23.02.38-.06.15-.1.24-.2.37-.1.12-.2.28-.29.38-.1.11-.2.23-.08.46.12.22.53.88 1.13 1.42.78.7 1.43.92 1.64 1.03.2.1.32.09.44-.05.12-.15.5-.58.63-.78.13-.2.27-.16.45-.1.18.06 1.17.55 1.37.65.2.1.33.15.38.23.05.08.05.47-.13.97Z" />
              </svg>
            </span>
            <span className="tracking-[0.01em]">WhatsApp</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-[#8c5bff]/15 bg-[#6a37d4] px-3.5 py-2.5 text-[11px] font-bold text-white shadow-[0_18px_34px_rgba(106,55,212,0.24)] sm:px-4.5 sm:text-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/16 ring-1 ring-white/20">
              <PhoneCall className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="tracking-[0.01em]">Voice Active</span>
          </div>
        </motion.div>

        {/* Decorative connector line */}
        <svg
          className="absolute -z-10 left-full top-1/2 hidden h-32 w-32 -translate-x-1/2 text-[#abadae]/20 lg:block"
          viewBox="0 0 100 100"
        >
          <path
            d="M0,50 Q50,0 100,50 T200,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </motion.div>
  );
}
