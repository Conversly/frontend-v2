'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Brain, ExternalLink, SearchCheck, Sparkles } from 'lucide-react';

const sharedPrompt = `I'm evaluating Verly as a customer support platform. Answer my questions about its features, AI agent capabilities, omnichannel support (web chat, WhatsApp, voice), knowledge base training, integrations, pricing plans, security and compliance, and how it compares to alternatives like Zendesk, Intercom, and Freshdesk.`;

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

export default function FAQAskAIBanner() {
  return (
    <section className="faq-ask-ai-banner">
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

        <div className="relative px-8 py-10 md:px-12 md:py-12">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
              <Brain className="h-4 w-4" />
              Can&apos;t find your answer?
            </div>

            <h2 className="max-w-xl font-title-bold text-4xl leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
              Ask your favorite AI assistant about Verly.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Let ChatGPT, Claude, or Perplexity answer your questions about
              Verly&apos;s features, pricing, integrations, and how it compares to
              other platforms.
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
        </div>
      </motion.div>
    </section>
  );
}
