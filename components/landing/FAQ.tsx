"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What is Verly and how does it work?",
    answer:
      "Verly is an AI customer support platform that lets you deploy intelligent agents across web chat, voice, and WhatsApp — from a single dashboard. Our AI understands your business, answers customer questions 24/7, and seamlessly hands off to human agents when needed. Setup takes minutes: connect your knowledge base, choose your channels, and go live.",
  },
  {
    question: "How is Verly different from other chatbot platforms?",
    answer:
      "Unlike traditional chatbots that rely on rigid decision trees, Verly uses advanced AI models that understand context and nuance. We offer true omnichannel support (web, voice, WhatsApp), smart model switching to reduce costs by up to 90%, and seamless human handoff with full conversation context. Plus, agents learn continuously from your interactions.",
  },
  {
    question: "Can the AI agents handle complex inquiries?",
    answer:
      "Yes. Our agents handle multi-turn conversations, access your knowledge base, perform actions like booking appointments or checking orders, and maintain context throughout. For questions beyond their capability, they escalate to human agents — with the full conversation history, detected intent, and a recommended next step.",
  },
  {
    question: "How quickly can I deploy Verly for my business?",
    answer:
      "Most businesses go live within 15 minutes. Upload your knowledge base (documents, FAQs, website content), configure your agent's personality, and deploy to your preferred channels. No coding required. Enterprise clients can request custom integrations and onboarding.",
  },
  {
    question: "What channels does Verly support?",
    answer:
      "Verly supports three primary channels: Website Chat (embeddable widget), Voice AI (natural-sounding phone agents), and WhatsApp Business API. All channels share the same AI brain, knowledge base, and routing — ensuring consistent responses no matter where the customer reaches out.",
  },
  {
    question: "Is my customer data secure?",
    answer:
      "Absolutely. We maintain SOC 2 Type II compliance, GDPR compliance, end-to-end encryption, and strict data privacy policies. Your data is never used to train models without explicit permission. Enterprise plans include SSO, audit logs, and custom data retention.",
  },
  {
    question: "How much does Verly cost?",
    answer:
      "We offer flexible pricing starting from free. Hobby is $29.99/month, Standard is $79.99/month, and Pro is $249.99/month. Every plan includes unlimited conversations — you pay based on features and team size, not usage. Enterprise plans with custom pricing are also available.",
  },
  {
    question: "Can I try Verly before committing?",
    answer:
      "Yes — our free plan includes 50 messages per month so you can test the entire platform. No credit card required. When you're ready to scale, upgrade anytime. We also offer a 14-day free trial of any paid plan with full features and no restrictions.",
  },
];

// JSON-LD structured data for SEO
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

interface FAQProps {
  showStructuredData?: boolean;
}

export default function FAQ({ showStructuredData = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {showStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <section
        className="relative overflow-hidden bg-white py-20 md:py-28"
        id="faq"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_50%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,94,234,0.04),transparent_62%)]" />

        <div className="relative mx-auto max-w-[860px] px-5 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex rounded-full border border-[#d9d2c5] bg-[#faf8f6] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
              FAQ
            </div>
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              Common questions,
              <span className="block text-[#6e6558]">straight answers.</span>
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-[#c4d4f7] bg-[#f8faff] shadow-[0_8px_24px_rgba(49,94,234,0.06)]"
                      : "border-[#e8e3dc] bg-white hover:border-[#d1ccc3]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`pr-4 text-[1rem] font-semibold leading-snug tracking-[-0.01em] transition-colors md:text-[1.08rem] ${
                        isOpen ? "text-[#1e1c19]" : "text-[#3d3a35]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#315EEA] text-white"
                          : "bg-[#f4f1ed] text-[#8a8279]"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-[0.92rem] leading-[1.8] text-[#6d665d]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-[0.92rem] text-[#8a8279]">
              Still have questions?
            </p>
            <a
              href="mailto:team@verlyai.xyz"
              className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd4] bg-white px-6 py-3 text-[0.9rem] font-semibold text-[#1e1c19] shadow-[0_4px_16px_rgba(59,43,22,0.06)] transition-all duration-300 hover:border-[#315EEA]/30 hover:bg-[#f8faff] hover:shadow-[0_8px_24px_rgba(49,94,234,0.1)]"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
