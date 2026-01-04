'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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
    <section className="py-24 lg:py-32 relative overflow-hidden" id="faq">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-50" />
      </div>

      <div className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Got{' '}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary"
            >
              Questions?
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-muted-foreground"
          >
            Find answers to common questions about our platform.
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors group"
              >
                <span className="font-semibold text-foreground text-lg pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  className="flex-shrink-0"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <Minus className="text-primary" size={24} />
                  ) : (
                    <Plus className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}

