"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROTATION_INTERVAL = 6000;

const showcaseTabs = [
  {
    id: "helpdesk",
    title: "Unified Helpdesk",
    eyebrow: "Shared inbox & ticket ops",
    shortDesc: "Every channel, one workspace.",
    description:
      "Route emails, chats, and social messages into a single queue. Assign, prioritize, and resolve without switching tabs — your team stays focused and customers get faster answers.",
    image: "/helpdesk-showcase-reference.png",
    highlights: [
      "Omnichannel inbox",
      "Smart assignments",
      "Internal notes & mentions",
      "SLA tracking",
    ],
  },
  {
    id: "ai-agent",
    title: "Built-in AI Agent",
    eyebrow: "Automation that actually ships",
    shortDesc: "AI that works alongside your team.",
    description:
      "Deploy AI agents that draft replies, triage tickets, and handle repetitive questions — all inside your existing workflow. No separate tool, no extra setup.",
    image: "/create_chatbot.png",
    highlights: [
      "Auto-draft replies",
      "Intelligent triage",
      "Instant deployment",
      "Seamless handoff",
    ],
  },
  {
    id: "insights",
    title: "Live Insights",
    eyebrow: "Analytics that surface what matters",
    shortDesc: "Spot trends before they become problems.",
    description:
      "Track resolution times, identify friction points, and monitor team performance with real-time dashboards. Stop guessing — let data drive your support strategy.",
    image: "/reporting.png",
    highlights: [
      "Real-time dashboards",
      "CSAT & NPS tracking",
      "Conversation analytics",
      "Custom reports",
    ],
  },
  {
    id: "self-improving",
    title: "Knowledge Engine",
    eyebrow: "Gets smarter with every conversation",
    shortDesc: "Your best answers, always improving.",
    description:
      "Feed it your docs, product updates, and resolved tickets. The system learns from every interaction so responses get more accurate and on-brand over time.",
    image: "/data_sources.png",
    highlights: [
      "Auto-sync knowledge base",
      "Doc ingestion",
      "Continuous learning",
      "Brand-safe replies",
    ],
  },
] as const;

export default function CrispFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / ROTATION_INTERVAL, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveIndex((current) => (current + 1) % showcaseTabs.length);
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setActiveIndex(index);
  };

  const activeTab = showcaseTabs[activeIndex];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#efeade_100%)] py-16 text-[#1d1d1b] md:py-24"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-[780px] text-center">
          <div className="mb-5 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
            Support Platform
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[56px]">
            Everything your team needs,
            <span className="block text-[#8a7d6b]">ready on day one.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            Four connected layers — helpdesk, AI, analytics, and knowledge — working together so
            nothing falls through the cracks.
          </p>
        </div>

        {/* Showcase card */}
        <div className="overflow-hidden rounded-[28px] border border-[#ddd7ca] bg-white shadow-[0_30px_80px_rgba(59,43,22,0.10)]">
          {/* Tabs */}
          <div className="grid border-b border-[#e8e2d7] md:grid-cols-4">
            {showcaseTabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={`group relative px-5 py-5 text-left transition-colors md:px-6 ${
                    isActive
                      ? "bg-white text-[#1f1d1a]"
                      : "bg-[#fcfbf8] text-[#a19a90] hover:bg-white/80 hover:text-[#575047]"
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Progress bar */}
                  <span
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-[#2563eb] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: isActive ? `scaleX(${progress})` : "scaleX(0)",
                    }}
                  />
                  {/* Divider */}
                  <span
                    className={`absolute inset-y-0 left-0 w-px bg-[#ece6db] ${
                      index === 0 ? "hidden" : "block"
                    }`}
                  />
                  <span className="block text-[15px] font-semibold tracking-[-0.01em] md:text-[16px]">
                    {tab.title}
                  </span>
                  <span
                    className={`mt-1 block text-[13px] leading-snug transition-colors ${
                      isActive ? "text-[#7a7468]" : "text-[#b8b2a8] group-hover:text-[#9a9488]"
                    }`}
                  >
                    {tab.shortDesc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Showcase area */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#e8e0d0] via-[#ddd5c3] to-[#d0c7b3] px-4 py-5 md:px-8 md:py-8">
            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #000 0.5px, transparent 0.5px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 20, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.985 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="mx-auto max-w-[1100px]"
                >
                  <div className="overflow-hidden rounded-[20px] border border-white/60 bg-white/80 shadow-[0_24px_60px_rgba(48,33,11,0.14)] backdrop-blur-sm">
                    {/* Mini header */}
                    <div className="flex items-center justify-between border-b border-[#ece6dc]/80 bg-white/90 px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e2d7]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e2d7]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e2d7]" />
                        </div>
                        <span className="text-[12px] font-medium tracking-wide text-[#a09788]">
                          {activeTab.eyebrow}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full border border-[#ddd7ca] bg-white px-3 py-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-semibold text-[#5f584f]">
                          Live preview
                        </span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="p-3 md:p-4">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-[#ebe5da] bg-[#f7f3ec]">
                        <Image
                          src={activeTab.image}
                          alt={activeTab.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 1100px"
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

          {/* Bottom detail strip */}
          <div className="grid gap-5 border-t border-[#ece6db] bg-[#fbfaf7] px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-7 md:py-6">
            <div>
              <p className="max-w-[700px] text-[15px] leading-7 text-[#655e55] md:text-[16px]">
                {activeTab.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {activeTab.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#ddd6ca] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#474038]"
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
