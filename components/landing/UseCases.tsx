"use client";

import { motion } from "framer-motion";
import {
  Business,
  ShoppingCart,
  Favorite,
  Home,
  School,
  Flight,
  ArrowForward
} from "@mui/icons-material";

const useCases = [
  {
    icon: Business,
    title: "B2B SaaS Customer Support",
    description: "AI agents handle technical onboarding, feature explanations, and troubleshooting for software companies. Reduce support ticket volume by 80% while providing instant answers to complex product questions.",
    stats: "80% ticket reduction",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    link: "/solutions?filter=support"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Order Management",
    description: "Automate order tracking, returns, and product recommendations across web chat and WhatsApp. Handle peak season traffic without hiring temporary staff while maintaining personalized customer experiences.",
    stats: "24/7 availability",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    link: "/solutions?industry=retail"
  },
  {
    icon: Favorite,
    title: "Healthcare Appointment Scheduling",
    description: "Voice AI agents handle appointment bookings, reminders, and follow-ups. Reduce no-shows by 40% with automated reminders while freeing staff to focus on patient care instead of administrative tasks.",
    stats: "40% fewer no-shows",
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    link: "/solutions?industry=healthcare"
  },
  {
    icon: Home,
    title: "Real Estate Lead Qualification",
    description: "Qualify prospects instantly via WhatsApp and voice calls. AI agents collect requirements, schedule property viewings, and nurture leads until they're ready to speak with an agent.",
    stats: "3x faster response",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    link: "/solutions?filter=commerce"
  },
  {
    icon: School,
    title: "Education & Course Support",
    description: "Answer student questions about courses, assignments, and admissions 24/7. Scale educational support without increasing staff while providing personalized learning assistance.",
    stats: "95% satisfaction rate",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    link: "/solutions"
  },
  {
    icon: Flight,
    title: "Travel & Hospitality Booking",
    description: "Handle booking inquiries, itinerary changes, and travel recommendations across multiple channels. Provide instant support in 95+ languages for global travelers.",
    stats: "Support in 95+ languages",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    link: "/solutions"
  }
];

export default function UseCases() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" id="use-cases">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            AI Customer Support for Every Industry
          </h2>
          <p className="text-lg text-muted-foreground">
            See how businesses across industries use VerlyAI to automate customer support, 
            reduce costs, and scale operations. Deploy AI agents tailored to your specific use case.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.a
              key={useCase.title}
              href={useCase.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative block p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${useCase.color}`}>
                <useCase.icon sx={{ fontSize: 24 }} />
              </div>

              {/* Title as H3 for SEO */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {useCase.description}
              </p>

              {/* Stats Badge */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${useCase.color}`}>
                  {useCase.stats}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowForward sx={{ fontSize: 16 }} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Looking for a custom solution? We support any industry and use case.
          </p>
          <a
            href="/solutions"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Explore all solutions <ArrowForward sx={{ fontSize: 16 }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
