"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is VerlyAI and how does it work?",
    answer: "VerlyAI is an AI customer support platform that lets you deploy intelligent agents across Website chat, Voice calls, and WhatsApp. Our AI agents understand your business, answer customer questions 24/7, and seamlessly hand off to human agents when needed. Setup takes minutes—just connect your knowledge base and choose your channels."
  },
  {
    question: "How is VerlyAI different from other chatbot platforms?",
    answer: "Unlike traditional chatbots that rely on rigid decision trees, VerlyAI uses advanced AI models that understand context and nuance. We offer true omnichannel support (web, voice, WhatsApp), smart AI model switching to reduce costs by up to 90%, and seamless human handoff. Plus, our agents learn continuously from your interactions."
  },
  {
    question: "Can the AI agents handle complex customer inquiries?",
    answer: "Yes! Our AI agents are designed to handle complex, multi-turn conversations. They can access your knowledge base, perform actions like booking appointments or checking order status, and maintain context throughout the conversation. For questions beyond their capability, they seamlessly escalate to human agents with full conversation history."
  },
  {
    question: "How quickly can I deploy VerlyAI for my business?",
    answer: "Most businesses are up and running within 15 minutes. Simply upload your knowledge base (documents, FAQs, website content), configure your agent's personality and responses, and deploy to your preferred channels. No coding required. We also offer custom integrations for enterprise clients."
  },
  {
    question: "What channels does VerlyAI support?",
    answer: "VerlyAI supports three primary channels: Website Chat (embeddable widget), Voice AI (human-like phone agents), and WhatsApp Business API. All channels share the same AI brain, ensuring consistent responses. You can start with one channel and expand to others at any time."
  },
  {
    question: "Is my customer data secure with VerlyAI?",
    answer: "Absolutely. We take security seriously with SOC 2 Type II compliance, GDPR compliance, end-to-end encryption, and strict data privacy policies. Your data is never used to train models without permission, and we offer enterprise-grade security features including SSO, audit logs, and custom data retention policies."
  },
  {
    question: "How much does VerlyAI cost?",
    answer: "We offer flexible pricing starting from free for small businesses. Our Hobby plan is $29.99/month, Standard is $79.99/month, and Pro is $249.99/month. All plans include unlimited conversations—you pay based on features and team size, not usage. Enterprise plans with custom pricing are available for large organizations."
  },
  {
    question: "Can I try VerlyAI before committing?",
    answer: "Yes! We offer a free plan with 50 messages per month so you can test the platform. No credit card required. You can upgrade anytime when you're ready to scale. We also offer a 14-day free trial of our paid plans with full features."
  }
];

// JSON-LD structured data for SEO
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

interface FAQProps {
  showStructuredData?: boolean;
}

export default function FAQ({ showStructuredData = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Structured Data for SEO */}
      {showStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <section className="py-16 lg:py-24 relative overflow-hidden" id="faq">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        </div>

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about VerlyAI and how our AI customer 
              support agents can help your business scale.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border rounded-xl bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
          >
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
            </p>
            <a
              href="mailto:team@verlyai.xyz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
