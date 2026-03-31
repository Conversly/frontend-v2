"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const showcaseTabs = [
  {
    id: "helpdesk",
    title: "Fully-featured helpdesk",
    eyebrow: "Shared inbox and ticket ops",
    description:
      "Unify inboxes, assign work faster, and let your team resolve every conversation from one polished workspace.",
    image: "/helpdesk-showcase-reference.png",
    highlights: ["Shared inbox", "Assignments", "Mentions", "Copilot replies"],
  },
  {
    id: "ai-agent",
    title: "Natively integrated AI Agent",
    eyebrow: "Automation built into the workflow",
    description:
      "Deploy AI agents directly inside your support stack so they can draft replies, assist agents, and handle repetitive flows.",
    image: "/create_chatbot.png",
    highlights: ["AI workflows", "Prompt control", "Fast deployment", "Human handoff"],
  },
  {
    id: "insights",
    title: "AI-powered Insights",
    eyebrow: "See what matters in real time",
    description:
      "Surface patterns across conversations, spot friction early, and keep teams aligned with a live analytics layer.",
    image: "/reporting.png",
    highlights: ["Trend tracking", "Team metrics", "Conversation analysis", "Reporting"],
  },
  {
    id: "self-improving",
    title: "Self-improving system",
    eyebrow: "Train from your best knowledge",
    description:
      "Feed the system with docs, product context, and past conversations so every answer gets sharper over time.",
    image: "/data_sources.png",
    highlights: ["Knowledge sync", "Doc ingestion", "Continuous learning", "Better answers"],
  },
] as const;

export default function CrispFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcaseTabs.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeTab = showcaseTabs[activeIndex];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_100%)] py-14 text-[#1d1d1b] md:py-20"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 md:px-6">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mb-4 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
            Support Platform
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] leading-[1.02] tracking-[-0.04em] text-[#221f1b] md:text-[52px]">
            A support workspace that feels
            <span className="block text-[#6e6558]">complete from day one.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            Four connected layers for modern support teams, presented in one compact showcase.
          </p>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-[#ddd7ca] bg-white shadow-[0_30px_80px_rgba(59,43,22,0.12)]">
          <div className="grid border-b border-[#e8e2d7] md:grid-cols-4">
            {showcaseTabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-5 py-5 text-left transition-colors md:px-7 ${
                    isActive
                      ? "bg-white text-[#1f1d1a]"
                      : "bg-[#fcfbf8] text-[#a19a90] hover:bg-white hover:text-[#575047]"
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-[3px] transition-opacity ${
                      isActive ? "bg-[#2563eb] opacity-100" : "bg-transparent opacity-0"
                    }`}
                  />
                  <span
                    className={`absolute inset-y-0 left-0 w-px bg-[#ece6db] ${
                      index === 0 ? "hidden" : "block"
                    }`}
                  />
                  <span className="block text-[16px] font-medium tracking-[-0.02em] md:text-[18px]">
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden bg-[#d6bb8c] px-4 py-4 md:px-6 md:py-6">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(46,29,11,0.28) 0%, rgba(215,185,129,0.18) 18%, rgba(239,218,177,0.05) 50%, rgba(67,44,20,0.24) 82%, rgba(216,189,140,0.18) 100%), url('/wallpaper.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 22, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mx-auto max-w-[1180px]"
                >
                  <div className="overflow-hidden rounded-[28px] border border-white/55 bg-white/70 shadow-[0_28px_65px_rgba(48,33,11,0.18)] backdrop-blur-[2px]">
                    <div className="flex items-center justify-between border-b border-[#ece6dc] bg-white/85 px-5 py-3.5">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8d8375]">
                          {activeTab.eyebrow}
                        </div>
                        <div className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-[#1e1c19]">
                          {activeTab.title}
                        </div>
                      </div>
                      <div className="rounded-full border border-[#ddd7ca] bg-white px-3 py-1 text-[11px] font-semibold text-[#5f584f]">
                        Live preview
                      </div>
                    </div>

                    <div className="p-3 md:p-5">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] border border-[#ebe5da] bg-[#f7f3ec]">
                        <Image
                          src={activeTab.image}
                          alt={activeTab.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 1180px"
                          className="object-contain object-center"
                          priority={activeIndex === 0}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-6 border-t border-[#ece6db] bg-[#fbfaf7] px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-7">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8d8579]">
                {activeTab.eyebrow}
              </div>
              <p className="mt-2 max-w-[760px] text-[15px] leading-7 text-[#655e55] md:text-[16px]">
                {activeTab.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {activeTab.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#ddd6ca] bg-white px-3.5 py-2 text-[13px] font-medium text-[#474038]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
