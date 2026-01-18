'use client';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { motion } from "framer-motion";
import { Bot, Cpu, Globe, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import LeadGeneration from "./lead-generation";
import CustomerSupport from "./customer-support";

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

export default function AboutPage() {
  return (
    <main className="bg-background relative min-h-screen font-sans selection:bg-primary/20">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className={CONTENT_WIDTH}>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
              >
                Unified AI Platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Support That Scales <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-primary animate-gradient">
                  Without the Headcount
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              >
                Deploy AI agents across voice, chat & WhatsApp that handle 10X more conversations than human teams — at a fraction of the cost. Your customers get instant answers. Your team focuses on what matters.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story/Mission Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">

          <div className={CONTENT_WIDTH}>
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="inline-flex items-center rounded-lg bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                  <Zap className="mr-2 h-4 w-4" />
                  Why we exist
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Why Companies Choose <span className="text-primary">VerlyAI</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <span className="font-semibold text-foreground">Traditional chatbots frustrate customers.</span> They force people through rigid menus and fail the moment someone asks a real question.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">VerlyAI is different.</span> Our AI agents understand natural language, learn from your knowledge base, and handle complex conversations — just like your best support agent would.
                  </p>
                  <p className="font-medium text-foreground">
                    The result? <span className="text-primary">80% cost reduction</span>, instant responses 24/7, and happier customers who get real answers — not scripted responses.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/solutions">
                    <Button size="lg" className="group text-base px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300">
                      Explore our solutions
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 relative">
                {/* Visual Cards */}
                {[
                  { icon: Cpu, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", title: "LLM Native", delay: 0.2 },
                  { icon: Globe, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", title: "Multi-Channel", delay: 0.3, className: "mt-12" },
                  { icon: Bot, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30", title: "Agentic AI", delay: 0.4 },
                  { icon: Zap, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", title: "Real-time", delay: 0.5, className: "mt-12" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    className={`col-span-1 bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 ${item.className || ''}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrated Features */}
        <LeadGeneration />
        <CustomerSupport />

        {/* Team/Mission Values */}
        <section className="py-20 lg:py-32">
          <div className={CONTENT_WIDTH}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade. Developer-Friendly.</h2>
              <p className="text-xl text-muted-foreground">
                Build production-ready AI agents in minutes with APIs your team will love. Bank-level security. 99.9% uptime. Zero compromises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "2-Minute Setup",
                  desc: "No complex integrations. Copy one line of code and your AI agent is live. Works with your existing tools.",
                  icon: <Zap className="w-6 h-6" />
                },
                {
                  title: "Bank-Level Security",
                  desc: "SOC 2 certified, GDPR compliant, data encryption at rest and in transit. Your customer data is fortress-protected.",
                  icon: <Globe className="w-6 h-6" />
                },
                {
                  title: "Scale Infinitely",
                  desc: "Handle 10 conversations or 10,000 simultaneously. 99.9% uptime SLA. Black Friday traffic? No problem.",
                  icon: <Cpu className="w-6 h-6" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-border p-8 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div >
    </main >
  );
}
