'use client';
import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "How do I integrate my chatbot on my website?",
    answer:
      "Simply copy the embed code from your dashboard and paste it into your website's HTML. The chatbot will appear automatically!",
    category: "Integration",
    gradient: "from-pink-500/10 via-purple-500/10 to-blue-500/10",
  },
  {
    question: "What types of documents can I use for training?",
    answer:
      "We support PDFs, Word documents, text files, and more. You can also train your chatbot directly on your website content.",
    category: "Training",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
  },
  {
    question: "How accurate are the responses?",
    answer:
      "Our AI is trained on your specific content, ensuring highly accurate and relevant responses. You can also customize the behavior and tone.",
    category: "Performance",
    gradient: "from-purple-500/10 via-pink-500/10 to-blue-500/10",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We use enterprise-grade encryption and never share your data. Your content is used exclusively for training your chatbot.",
    category: "Security",
    gradient: "from-pink-500/10 via-blue-500/10 to-purple-500/10",
  },
  {
    question: "Can I customize the chatbot's appearance?",
    answer: "You can customize colors, fonts, and the overall design to match your brand identity.",
  },
]

export default function QuestionsSection() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  return (
    <section className="bg-background py-24 relative overflow-hidden" id="faq">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(background,transparent_70%)]" />
      </div>

      <div className="container mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Got
            <span className="text-primary mx-3">
              Questions
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about our platform.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/60 backdrop-blur-sm border border-border rounded-xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 rounded-xl" />
              <motion.div className="relative bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary">
                      {faq.category}
                    </span>
                    <span className="text-foreground font-medium">{faq.question}</span>
                  </div>
                  {activeAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

