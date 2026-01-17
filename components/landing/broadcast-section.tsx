"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, MousePointerClick, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessagingCategoriesVisual, CTAVisual, SchedulingVisual } from "./cards/BroadcastVisuals";

const tabs = [
  {
    id: 1,
    icon: <Zap size={18} />,
    title: "8+ Powerful Messaging Categories",
    description:
      "Send Promotions, Offers, Coupon codes, Carousels and More- Risk-Free!",
    visual: <MessagingCategoriesVisual />,
  },
  {
    id: 2,
    icon: <MousePointerClick size={18} />,
    title: "Add CTAs. Drive 3x Conversions",
    description:
      "Turn conversations into conversions with eye-catching CTA and Quick Reply buttons",
    visual: <CTAVisual />,
  },
  {
    id: 3,
    icon: <CalendarClock size={18} />,
    title: "Schedule your WhatsApp messages",
    description:
      "Streamline your work, Schedule Broadcasts 2 months ahead of time",
    visual: <SchedulingVisual />,
  },
];

export default function BroadcastSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  // Auto-cycle tabs
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setAutoCycle(false); // Stop auto-cycling on user interaction
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side - Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary w-fit"
              >
                Start Broadcasting
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]"
              >
                Broadcast Promotional Messages on WhatsApp{" "}
                <span className="text-[#075e54]">(Officially)</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 max-w-lg"
              >
                Enjoy a Limitless Broadcasting experience on WhatsApp. Reach thousands of customers instantly with official API support.
              </motion.p>
            </div>

            {/* Tabs */}
            <div className="flex flex-col gap-3">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`group relative text-left w-full rounded-2xl transition-all duration-300 overflow-hidden border ${activeTab === index
                    ? "bg-white border-primary/20 shadow-lg shadow-primary/5"
                    : "bg-transparent border-transparent hover:bg-slate-50"
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {/* Progress bar for active tab */}
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTabProgress"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#075e54]"
                    />
                  )}

                  <div className="p-5 pl-7">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`p-2 rounded-lg transition-colors ${activeTab === index ? "bg-[#e7fce3] text-[#075e54]" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}>
                        {tab.icon}
                      </div>
                      <h3 className={`font-semibold text-lg ${activeTab === index ? "text-slate-900" : "text-slate-600"}`}>
                        {tab.title}
                      </h3>
                    </div>

                    <AnimatePresence>
                      {activeTab === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-slate-500 pl-[52px] text-sm leading-relaxed pb-2">
                            {tab.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="h-12 px-8 rounded-full bg-[#075e54] hover:bg-[#064e46] text-white shadow-lg shadow-emerald-500/20 group text-base font-semibold"
              >
                Start for FREE
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative h-[500px] lg:h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-[2rem] blur-3xl -z-10" />

            <div className="relative h-full w-full rounded-[2rem] border border-slate-200 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Browser/Device chrome simulation */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-white/80 border-b border-slate-100 flex items-center px-4 gap-2 z-20 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="mx-auto bg-slate-100/50 h-5 w-40 rounded-full text-2xs text-center flex items-center justify-center text-slate-400">
                  VerlyAI
                </div>
              </div>

              {/* Content Area */}
              <div className="h-full pt-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    className="w-full h-full"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {tabs[activeTab].visual}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
