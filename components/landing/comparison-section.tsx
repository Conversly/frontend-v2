"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const comparisonData = [
  {
    category: "Cost",
    human: "$15/hr per agent",
    humanSub: "= $10,000/month for 4 agents",
    ai: "$0.05 per conversation",
    aiSub: "= $400/month typical",
    highlight: true,
  },
  {
    category: "Availability",
    human: "9am-5pm weekdays",
    humanSub: "Nights & weekends closed",
    ai: "24/7/365",
    aiSub: "Never takes a break",
  },
  {
    category: "Response Time",
    human: "5-30 minutes",
    humanSub: "Varies by queue length",
    ai: "< 2 seconds",
    aiSub: "Instant every time",
    highlight: true,
  },
  {
    category: "Capacity",
    human: "1 conversation at a time",
    humanSub: "Must hire to scale",
    ai: "Unlimited simultaneously",
    aiSub: "Handle any volume",
  },
  {
    category: "Consistency",
    human: "Varies by agent",
    humanSub: "Depends on mood, training",
    ai: "Perfect every time",
    aiSub: "Same quality guaranteed",
  },
  {
    category: "Languages",
    human: "1-2 languages",
    humanSub: "Hire translators for more",
    ai: "95+ languages",
    aiSub: "Instant translation",
    highlight: true,
  },
  {
    category: "Onboarding",
    human: "2-4 weeks",
    humanSub: "Training & ramp-up time",
    ai: "2 minutes",
    aiSub: "Instant deployment",
  },
  {
    category: "Sick Days",
    human: "Yes",
    humanSub: "PTO, sick leave, vacations",
    ai: "Never",
    aiSub: "100% uptime guaranteed",
  },
];

export default function ComparisonSection() {
  const router = useRouter();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-transparent opacity-50" />
      </div>

      <div className="relative w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            The Smart Choice
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            AI Support vs. Hiring More Agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Don't replace humans. <span className="text-foreground font-medium">Empower them</span> to focus on complex issues while AI handles the routine.
          </motion.p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-lg">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 border-b">
              <div className="text-sm font-medium text-muted-foreground">
                Feature
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">Human Team</div>
                <div className="text-xs text-muted-foreground mt-1">Traditional approach</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">VerlyAI Team</div>
                <div className="text-xs text-primary/70 mt-1">AI-powered support</div>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-3 gap-4 p-6 border-b last:border-b-0 
                           ${row.highlight ? "bg-primary/5" : "hover:bg-muted/20"} 
                           transition-colors`}
              >
                {/* Category */}
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-foreground">{row.category}</div>
                    {row.highlight && (
                      <div className="text-xs text-primary mt-1">Key differentiator</div>
                    )}
                  </div>
                </div>

                {/* Human */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <X className="w-4 h-4 text-muted-foreground/50" />
                    <span className="font-medium text-foreground">{row.human}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{row.humanSub}</div>
                </div>

                {/* AI */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">{row.ai}</span>
                  </div>
                  <div className="text-xs text-primary/70">{row.aiSub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cost Savings Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border border-primary/20"
          >
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">💰</span>
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    Save $9,600/month
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average savings for 10-person support team
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                That's <span className="text-foreground font-semibold">$115,200 per year</span> you can reinvest in product development, marketing, or growing your team where it actually matters.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="text-lg px-8 py-6"
            >
              <span className="mr-2">🎁</span>
              Start Free Trial — 500 Messages Free
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • 2-minute setup
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
