'use client';
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { redirect } from "next/navigation";

const pricingPlans = [
  {
    name: "Starter",
    priceMonthly: "Free",
    description: "Experience the power of VerlyAI risk-free",
    features: [
      "14-day free trial",
      "500 message credits",
      "Basic voice & chat agents",
      "Community support",
      "Standard response time",
    ],
    gradient: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    stats: "14",
    statsLabel: "Days Trial",
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    popular: true,
    priceMonthly: "$30",
    description: "Scale your operations with pay-as-you-go",
    features: [
      "Pay-as-you-go credits",
      "Advanced voice & chat agents",
      "WhatsApp integration",
      "Priority email support",
      "Function calling & tools",
      "Analytics dashboard",
    ],
    gradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
    stats: "Flex",
    statsLabel: "Pay-as-you-go",
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    description: "For organizations requiring maximum scale",
    features: [
      "Unlimited volume discounts",
      "Custom LLM fine-tuning",
      "Dedicated success manager",
      "On-premise deployment",
      "SLA guarantees",
      "SSO & advanced security",
    ],
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
    stats: "∞",
    statsLabel: "Unlimited Scale",
    cta: "Contact Sales",
  },
]

export default function PricingSection() {
  return (
    <section className="pt-6 lg:pt-6 pb-24 lg:pb-32 relative overflow-hidden px-4" id="pricing">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-transparent opacity-50" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
              Pricing Plans
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start free and <span className="text-foreground font-medium">scale as you grow</span>.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 font-medium">
              No hidden fees or surprises.
            </span>
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`
                  relative h-full flex flex-col bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2rem] p-8 transition-all duration-300
                  ${plan.popular ? "ring-2 ring-primary/50 shadow-lg shadow-primary/10" : "hover:border-primary/30 hover:shadow-lg"}
                `}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-purple-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/25"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6 space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-foreground">
                      {plan.priceMonthly}
                    </span>
                    {plan.priceMonthly !== "Custom" && (
                      <span className="text-muted-foreground font-medium">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-8 p-4 rounded-2xl bg-muted/30 border border-white/5 backdrop-blur-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                      {plan.stats}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {plan.statsLabel}
                    </span>
                  </div>
                </div>

                {/* Features - Flex Grow to push button down */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 p-1 rounded-full bg-primary/10 flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button - Always at bottom */}
                <Link
                  href={plan.name === "Enterprise" ? "mailto:team@verlyai.xyz" : "/login"}
                  className={`
                    w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm tracking-wide
                    transition-all duration-300 relative overflow-hidden group/button
                    ${plan.popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
                      : "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm hover:scale-[1.02] dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {plan.cta}
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Improved Trust Signals */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { text: "24/7 Priority Support", color: "bg-emerald-500" },
            { text: "99.9% Uptime SLA", color: "bg-blue-500" },
            { text: "Automatic Updates", color: "bg-purple-500" },
            { text: "GDPR Compliant", color: "bg-orange-500" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card/40 border border-white/5 backdrop-blur-md shadow-sm">
              <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} />
              <span className="text-sm font-medium text-muted-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

