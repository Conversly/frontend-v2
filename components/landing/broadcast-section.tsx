"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const tabs = [
  {
    id: 1,
    title: "8+ Powerful Messaging Categories",
    description:
      "Send Promotions, Offers, Coupon codes, Carousels and More- Risk-Free!",
    image: "/broadcast-1.webp",
  },
  {
    id: 2,
    title: "Add CTAs. Drive 3x Conversions",
    description:
      "Turn conversations into conversions with eye-catching CTA and Quick Reply buttons",
    image: "/broadcast-2.webp",
  },
  {
    id: 3,
    title: "Schedule your WhatsApp messages",
    description:
      "Streamline your work, Schedule Broadcasts 2 months ahead of time",
    image: "/broadcast-3.webp",
  },
];

export default function BroadcastSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-12 lg:py-20">
      <div className="w-full">
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Tabs */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Header - only shows on first tab visually but always present */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2"
              >
                Broadcast Promotional Messages on WhatsApp{" "}
                <span className="text-primary">(Officially)</span>
              </motion.h2>
              <p className="text-muted-foreground mb-8">
                Enjoy a Limitless Broadcasting experience on WhatsApp
              </p>

              {/* Expanding Tabs */}
              <div className="flex flex-col gap-1">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`text-left w-full transition-all duration-300 rounded-xl ${
                      activeTab === index
                        ? "bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-4">
                      {/* Tab Header */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                            activeTab === index
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {tab.id}
                        </span>
                        <h3
                          className={`font-semibold transition-colors ${
                            activeTab === index
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {tab.title}
                        </h3>
                      </div>

                      {/* Expanding Description */}
                      <AnimatePresence>
                        {activeTab === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground mt-3 ml-12">
                              {tab.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Divider line */}
                    {index < tabs.length - 1 && (
                      <div
                        className={`h-px mx-4 transition-colors ${
                          activeTab === index ? "bg-primary/20" : "bg-border"
                        }`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="group gap-2"
                >
                  Start for FREE
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Right Side - Image */}
            <div className="relative min-h-[300px] lg:min-h-[500px] bg-muted/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
