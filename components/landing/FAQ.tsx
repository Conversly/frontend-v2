import { ChevronDown } from "lucide-react";

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
  return (
    <>
      {showStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <section
        className="landing-home-section landing-home-section--plain pb-16 pt-20 md:pb-20 md:pt-28"
        id="faq"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_50%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,94,234,0.04),transparent_62%)]" />

        <div className="relative mx-auto max-w-[860px] px-5 md:px-8">
          <div className="mb-12 text-center">
            <div className="landing-home-eyebrow mb-4">
              FAQ
            </div>
            <h2 className="landing-home-title text-[34px] md:text-[48px]">
              Common questions,
              <span className="landing-home-title-muted block">straight answers.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              return (
                <details
                  key={index}
                  open={index === 0}
                  className="group overflow-hidden rounded-2xl border border-[#dbe5f4] bg-white transition-colors duration-300 hover:border-[#c6d5ee] [&[open]]:border-[#c4d4f7] [&[open]]:bg-[#f8faff] [&[open]]:shadow-[0_8px_24px_rgba(49,94,234,0.06)] [&[open]_.faq-chevron]:rotate-180 [&[open]_.faq-chevron]:bg-[#315EEA] [&[open]_.faq-chevron]:text-white [&[open]_.faq-question]:text-[#0b1536]"
                >
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-left transition-colors [&::-webkit-details-marker]:hidden"
                  >
                    <span
                      className="faq-question pr-4 text-[1rem] font-semibold leading-snug tracking-[-0.01em] text-[#22324f] transition-colors md:text-[1.08rem]"
                    >
                      {faq.question}
                    </span>
                    <span
                      className="faq-chevron flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f4f1ed] text-[#8a8279] transition-all duration-300"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>

                  <div className="px-6 pb-6 text-[0.92rem] leading-[1.8] text-[#5d6b85]">
                    {faq.answer}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
