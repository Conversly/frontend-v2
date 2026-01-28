"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, DollarSign, Globe, Zap, Users, Shield, Briefcase, Calendar, TrendingUp, BarChart3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    category: "Cost Efficiency",
    icon: DollarSign,
    human: {
      title: "Costly Scaling",
      value: "$15/hr",
      sub: "per agent ($10k/mo for 4 agents)",
      metric: 95, // High cost
      visual: "bg-red-50 text-red-600 border-red-100",
      barColor: "bg-red-400"
    },
    ai: {
      title: "Massive Savings",
      value: "$0.05",
      sub: "per conversation (~$400/mo typical)",
      metric: 5, // Low cost
      visual: "bg-emerald-50 text-emerald-600 border-emerald-100",
      barColor: "bg-emerald-500",
      impact: "99% Cheaper"
    },
  },
  {
    category: "Availability",
    icon: Clock,
    human: {
      title: "Limited Hours",
      value: "40 hrs/wk",
      sub: "Closed nights, weekends & holidays",
      metric: 24, // Low availability (relative scale)
      visual: "bg-orange-50 text-orange-600 border-orange-100",
      barColor: "bg-orange-400"
    },
    ai: {
      title: "Always On",
      value: "168 hrs/wk",
      sub: "Instant support, anytime, anywhere",
      metric: 100, // Full availability
      visual: "bg-blue-50 text-blue-600 border-blue-100",
      barColor: "bg-blue-500",
      impact: "4x Coverage"
    },
  },
  {
    category: "Response Time",
    icon: Zap,
    human: {
      title: "Wait Times",
      value: "15 mins",
      sub: "Customers wait in queue",
      metric: 80, // High wait time (bad)
      visual: "bg-yellow-50 text-yellow-600 border-yellow-100",
      barColor: "bg-yellow-400"
    },
    ai: {
      title: "Instant Reply",
      value: "0.2 secs",
      sub: "Zero wait time, immediate resolution",
      metric: 2, // Low wait time (good)
      visual: "bg-purple-50 text-purple-600 border-purple-100",
      barColor: "bg-purple-500",
      impact: "4500x Faster"
    },
  },
  {
    category: "Capacity",
    icon: Users,
    human: {
      title: "Bottlenecks",
      value: "1 at a time",
      sub: "Overwhelmed by spikes",
      metric: 5, // Low capacity
      visual: "bg-gray-50 text-gray-600 border-gray-100",
      barColor: "bg-gray-400"
    },
    ai: {
      title: "Unlimited",
      value: "Infinite",
      sub: "Handles thousands simultaneously",
      metric: 100, // High capacity
      visual: "bg-indigo-50 text-indigo-600 border-indigo-100",
      barColor: "bg-indigo-500",
      impact: "Infinite Scale"
    },
  },
  {
    category: "Global Reach",
    icon: Globe,
    human: {
      title: "Language Barrier",
      value: "1 Lang",
      sub: "Need translators for others",
      metric: 10, // Low reach
      visual: "bg-stone-50 text-stone-600 border-stone-100",
      barColor: "bg-stone-400"
    },
    ai: {
      title: "Universal",
      value: "95+ Langs",
      sub: "Native-level fluency instantly",
      metric: 100, // High reach
      visual: "bg-cyan-50 text-cyan-600 border-cyan-100",
      barColor: "bg-cyan-500",
      impact: "Global Ready"
    },
  },
];

export default function ComparisonSection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % comparisonData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="pt-20 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-30" />
      </div>

      <div className="container relative mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            Why Choose Verly.ai?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl md:whitespace-nowrap font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            AI Support vs. Manual Customer Support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            See the difference. Visualize the impact using real-world metrics.
          </motion.p>
        </div>

        {/* Interactive Comparison */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Navigation Tabs */}
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {comparisonData.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.category}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsPaused(true);
                    }}
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 min-w-[220px] lg:min-w-0 border-2 relative overflow-hidden",
                      isActive
                        ? "bg-white dark:bg-slate-900 border-primary shadow-lg scale-105 z-10"
                        : "bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-900/50 text-muted-foreground hover:text-foreground grayscale hover:grayscale-0"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                      isActive ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-800"
                    )}>
                      <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                    </div>
                    <span className="font-semibold text-base">{item.category}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary hidden lg:block"
                      />
                    )}
                    {/* Progress Fill for auto-rotation */}
                    {isActive && !isPaused && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-primary/20"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Display Area */}
            <div className="relative min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="grid md:grid-cols-2 gap-6 h-full"
                >
                  {/* Human Side */}
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2 opacity-50" />
                    <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 h-full flex flex-col shadow-sm transition-shadow hover:shadow-md">

                      {/* Badge */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Traditional</span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                          {comparisonData[activeIndex].human.title}
                        </h3>
                        <div className="text-sm text-slate-500 font-medium">
                          {comparisonData[activeIndex].human.sub}
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                        {/* Visual Metric Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5 uppercase">
                            <span>Efficiency Metric</span>
                            <span>{comparisonData[activeIndex].human.metric < 50 ? "Low Efficiency" : "High Cost/Load"}</span>
                          </div>
                          <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${comparisonData[activeIndex].human.metric}%` }}
                              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                              className={cn("h-full rounded-full transition-colors", comparisonData[activeIndex].human.barColor)}
                            />
                          </div>
                        </div>

                        <div className="py-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {comparisonData[activeIndex].human.value}
                          </span>
                          <X className="w-6 h-6 text-slate-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Side */}
                  <div className="relative group h-full">
                    {/* Animated Pulsing Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl transform -rotate-1 transition-transform group-hover:-rotate-2 opacity-50" />

                    <div className="relative bg-white dark:bg-black border-[3px] border-primary/10 rounded-3xl p-8 h-full flex flex-col shadow-2xl z-10 overflow-hidden ring-1 ring-primary/5">
                      {/* Top Gradient Line */}
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

                      {/* Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Zap className="w-5 h-5 fill-primary" />
                          </div>
                          <span className="text-sm font-bold text-primary uppercase tracking-widest">VerlyAI Agent</span>
                        </div>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="bg-gradient-to-r from-primary to-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-primary/20"
                        >
                          {comparisonData[activeIndex].ai.impact}
                        </motion.div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                          {comparisonData[activeIndex].ai.title}

                        </h3>
                        <div className="text-sm text-foreground/70 font-medium">
                          {comparisonData[activeIndex].ai.sub}
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                        {/* Visual Metric Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-primary/70 mb-1.5 uppercase">
                            <span>Efficiency Metric</span>
                            <span>Optimal Performance</span>
                          </div>
                          <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden relative">
                            {/* Grid lines for tech feel */}
                            <div className="absolute inset-0 w-full h-full opacity-10" style={{ backgroundImage: "linear-gradient(to right, transparent 50%, #000 50%)", backgroundSize: "4px 100%" }}></div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${comparisonData[activeIndex].ai.metric}%` }}
                              transition={{ delay: 0.4, duration: 1.2, ease: "circOut" }}
                              className={cn("h-full rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]", comparisonData[activeIndex].ai.barColor)}
                            />
                          </div>
                        </div>

                        <div className="py-4 border-t border-dashed border-primary/20 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent -mx-8 px-8">
                          <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 tracking-tight drop-shadow-sm">
                            {comparisonData[activeIndex].ai.value}
                          </span>
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 p-1 rounded-full">
                            <Check className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
