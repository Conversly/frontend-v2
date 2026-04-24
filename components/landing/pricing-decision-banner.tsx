'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Brain, ExternalLink, SearchCheck, Sparkles } from 'lucide-react';

const sharedPrompt = `Compare Verly's pricing, ROI, and customer support automation value against alternatives like Zendesk, Intercom, and Freshdesk. Explain who Verly is a good fit for, what makes the pricing compelling, and which questions a buyer should ask before switching.`;

const aiAssistants = [
  {
    label: 'Ask ChatGPT',
    href: `https://chatgpt.com/?q=${encodeURIComponent(sharedPrompt)}`,
    icon: Bot,
    className: 'bg-[#111827] text-white hover:bg-[#0b1220] shadow-[0_16px_30px_rgba(17,24,39,0.3)]',
  },
  {
    label: 'Ask Claude',
    href: `https://claude.ai/new?q=${encodeURIComponent(sharedPrompt)}`,
    icon: Sparkles,
    className: 'bg-[#f59e67] text-white hover:bg-[#ea8751] shadow-[0_16px_30px_rgba(245,158,103,0.35)]',
  },
  {
    label: 'Ask Perplexity',
    href: `https://www.perplexity.ai/search?q=${encodeURIComponent(sharedPrompt)}`,
    icon: SearchCheck,
    className: 'bg-[#5a90a2] text-white hover:bg-[#4b7d8f] shadow-[0_16px_30px_rgba(90,144,162,0.32)]',
  },
] as const;

export default function PricingDecisionBanner() {
  return (
    <section className="relative px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-[#8db6ff]/25 bg-[linear-gradient(135deg,#2f6fe8_0%,#4a82ee_42%,#8aaef6_100%)] shadow-[0_30px_80px_rgba(37,99,235,0.22)]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="absolute -left-16 bottom-[-4.5rem] h-52 w-52 rounded-full bg-white/12 blur-2xl" />
          <div className="absolute right-8 top-8 h-40 w-40 rounded-full bg-[#dbeafe]/18 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
        </div>

        <div className="relative grid items-center gap-10 px-8 py-10 md:px-12 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
              <Brain className="h-4 w-4" />
              Still comparing pricing options?
            </div>

            <h2 className="max-w-xl font-title-bold text-4xl leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
              Ask your favorite AI assistant whether Verly is the right fit.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Let ChatGPT, Claude, or Perplexity break down Verly pricing, ROI,
              and switching considerations before you make the call.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {aiAssistants.map((assistant) => {
                const Icon = assistant.icon;

                return (
                  <Link
                    key={assistant.label}
                    href={assistant.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 ${assistant.className}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{assistant.label}</span>
                    <ExternalLink className="h-4 w-4 opacity-80" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute bottom-3 right-6 hidden h-20 w-20 rounded-full bg-[#84cc16]/55 blur-[50px] lg:block" />
            <div className="absolute bottom-0 left-10 hidden h-14 w-32 rounded-[999px] bg-[#1e3a8a]/25 blur-2xl lg:block" />

            <div className="relative w-full max-w-[32rem]">
              <div className="absolute inset-x-6 top-4 h-8 rounded-full bg-white/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/12 p-3 backdrop-blur-sm shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
                <div className="rounded-[1.4rem] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(238,246,255,0.92)_100%)] p-3">
                  <div className="mb-3 flex items-center justify-between rounded-[1rem] border border-[#d8e6ff] bg-white/90 px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                        Verly reporting
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0f172a]">
                        Track ROI, ticket trends, and support automation impact.
                      </p>
                    </div>
                    <div className="hidden rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#2563eb] sm:block">
                      Live insights
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.1rem] border border-[#dbeafe] bg-[#eff6ff]">
                    <Image
                      src="/reporting.png"
                      alt="Verly reporting dashboard preview"
                      width={878}
                      height={560}
                      className="h-auto w-full object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
