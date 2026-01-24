"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  stats: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
  industry: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "We cut support costs by $12,400/month and customer satisfaction went UP. VerlyAI handled 18,000 conversations last month — our team now focuses on complex issues only. ROI paid for itself in 8 days.",
    author: "Michael Rodriguez",
    role: "COO",
    company: "CloudPeak",
    avatar: "/avatars/michael.jpg", // Replace with actual avatar
    stats: [
      { icon: <DollarSign className="w-4 h-4" />, value: "$12.4K", label: "Monthly Savings" },
      { icon: <Users className="w-4 h-4" />, value: "18K", label: "Conversations" },
      { icon: <Clock className="w-4 h-4" />, value: "8 days", label: "ROI Payback" },
    ],
    industry: "SaaS • 120 employees",
  },
  {
    quote: "Before VerlyAI, we missed 30% of calls during peak hours. Now we answer every single one instantly — that's 200+ extra leads per month we would've lost. Our close rate increased by 18% because prospects get instant answers.",
    author: "Jessica Park",
    role: "Founder",
    company: "LuxeHome Realty",
    avatar: "/avatars/jessica.jpg",
    stats: [
      { icon: <TrendingUp className="w-4 h-4" />, value: "200+", label: "Extra Leads" },
      { icon: <TrendingUp className="w-4 h-4" />, value: "18%", label: "Higher Close Rate" },
      { icon: <Users className="w-4 h-4" />, value: "100%", label: "Call Answer Rate" },
    ],
    industry: "Real Estate • 25 agents",
  },
  {
    quote: "Our Shopify store gets 50K visitors/month. VerlyAI's chat widget increased conversions by 23% in the first week. We're capturing leads at 2am that would have been lost. Best ROI we've ever seen from a tool — $15K extra revenue monthly.",
    author: "David Kim",
    role: "CMO",
    company: "Brew & Bold",
    avatar: "/avatars/david.jpg",
    stats: [
      { icon: <TrendingUp className="w-4 h-4" />, value: "23%", label: "Conversion Lift" },
      { icon: <DollarSign className="w-4 h-4" />, value: "$15K", label: "Extra Revenue" },
      { icon: <Clock className="w-4 h-4" />, value: "24/7", label: "Lead Capture" },
    ],
    industry: "E-commerce • Shopify",
  },
];

export default function EnhancedTestimonials() {
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
          className="text-center mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Real Results from Real Businesses
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Don't Take Our Word for It
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            See how businesses across industries transformed their support and{" "}
            <span className="text-foreground font-medium">saved thousands</span> with VerlyAI
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              {/* Card */}
              <div className="relative h-full flex flex-col bg-card/50 backdrop-blur-sm border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                {/* Quote */}
                <div className="flex-grow mb-6">
                  <div className="text-4xl text-primary/20 mb-2">"</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
                  {testimonial.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="flex items-center justify-center mb-1 text-primary">
                        {stat.icon}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {testimonial.industry}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 items-center"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">1,200+</div>
            <div className="text-sm text-muted-foreground">Businesses Trust Us</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground">Daily Conversations</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">94%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">4.9/5 Average Rating</div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by companies using:</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            {/* Add actual customer logos here */}
            <div className="px-4 py-2 border rounded-lg bg-card/30">Shopify</div>
            <div className="px-4 py-2 border rounded-lg bg-card/30">Salesforce</div>
            <div className="px-4 py-2 border rounded-lg bg-card/30">HubSpot</div>
            <div className="px-4 py-2 border rounded-lg bg-card/30">Stripe</div>
            <div className="px-4 py-2 border rounded-lg bg-card/30">Zendesk</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
