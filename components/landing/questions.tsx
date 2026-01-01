'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';


const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'You get 14 days of full access to all Pro features. No credit card required. After the trial, you can choose to upgrade or continue with our free plan.'
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer: 'Yes! We support integrations with Slack, Zendesk, Salesforce, Stripe, and many more through our API and pre-built connectors.'
  },
  {
    question: 'How accurate is the AI?',
    answer: 'Our AI is trained on your specific data and continuously learns from interactions. Most customers see 85-95% accuracy rates, with smart escalation handling edge cases.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption, comply with GDPR and SOC 2, and never share your data with third parties. Your data is yours.'
  },
  {
    question: 'Can I customize the chat widget?',
    answer: 'Yes! You can fully customize colors, branding, position, and behavior to match your website. Pro plans include whitelabel options to remove our branding.'
  },
  {
    question: 'What happens if the AI cannot answer?',
    answer: 'You can configure smart escalation rules. The AI will seamlessly hand off to human agents when it detects questions outside its knowledge or confidence threshold.'
  }
];

export default function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="faq">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Got{' '}
            <span className="text-primary">
              Questions?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-foreground text-lg pr-8">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="text-primary" size={24} />
                  ) : (
                    <Plus className="text-muted-foreground" size={24} />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 animate-in slide-in-from-top-2 fade-in duration-200">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

