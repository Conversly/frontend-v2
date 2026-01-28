"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Settings2, Database, BarChart3, MessageSquare, Wrench } from "lucide-react";

// Mapping tabs to remote Vercel Blob images

const TABS = [
    {
        id: "playground",
        label: "Playground",
        icon: <Code2 className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Playground.webp",
    },
    {
        id: "sources",
        label: "Sources",
        icon: <Database className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Sources.webp",
    },
    {
        id: "customization",
        label: "Customization",
        icon: <Wrench className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Customize.webp",
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart3 className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/analytics.webp",
    },
    {
        id: "chatlogs",
        label: "Chat Logs",
        icon: <MessageSquare className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/chatlogs.webp",
    },
    {
        id: "setup",
        label: "Setup",
        icon: <Settings2 className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Setup.webp",
    },
];

export default function ExploreSection() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [isPaused, setIsPaused] = useState(false);

    const activeIndex = TABS.findIndex((t) => t.id === activeTab);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % TABS.length;
            setActiveTab(TABS[nextIndex].id);
        }, 2000);

        return () => clearInterval(interval);
    }, [isPaused, activeIndex]);

    const activeContent = TABS.find((t) => t.id === activeTab) || TABS[0];

    return (
        <section className="w-full py-12 md:py-15 bg-black relative overflow-hidden">
            {/* Full width gradient/noise effects */}
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />

            <div className="mx-auto w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] px-6 relative z-10">
                <div className="relative">
                    <div className="flex w-full flex-col items-start gap-4">
                        <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-zinc-700 text-white bg-black/20 backdrop-blur-md">
                            <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-[#FB923C] via-[#F472B6] to-[#E879F9]"></div>
                            Explore
                        </div>
                        <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                            <h2 className="pt-6 pb-4 font-medium text-4xl text-white tracking-tight md:pt-0 md:pb-0 lg:text-5xl">
                                Glimpse of Verly.ai
                                <br />
                            </h2>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="my-12 hidden w-full md:block">
                            <div
                                className="relative z-10 items-center justify-start group inline-flex space-x-1 rounded-full py-2 bg-transparent w-full overflow-x-auto overflow-y-hidden px-4 pb-0.5 border-b border-white/10 no-scrollbar"
                                data-indicator="underline"
                            >
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsPaused(true);
                                        }}
                                        className={cn(
                                            "rounded-full px-5 py-2 font-medium text-sm transition-colors duration-300 flex-none pt-0 relative group",
                                            activeTab === tab.id
                                                ? "text-white"
                                                : "text-zinc-400 hover:text-zinc-200"
                                        )}
                                    >
                                        <span className="relative z-30 flex items-center justify-center gap-2 py-2">
                                            {tab.icon}
                                            {tab.label}
                                        </span>
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-white rounded-full"
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Content Area */}
                            <div className="relative flex aspect-video w-full items-center justify-center rounded-2xl p-1 bg-gradient-to-br from-[#FB923C] via-[#F472B6] to-[#E879F9]">
                                <div className="absolute inset-[1px] bg-gradient-to-br from-white via-blue-50 via-30% via-blue-200 via-50% via-blue-400 via-70% to-black rounded-2xl overflow-hidden">
                                    {/* Inner Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FB923C]/20 via-[#F472B6]/20 to-[#E879F9]/20 opacity-30" />

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeContent.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
                                        >
                                            <Image
                                                src={activeContent.image}
                                                alt={`${activeContent.label} preview`}
                                                width={1400}
                                                height={900}
                                                className="z-20 h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
                                                priority
                                                unoptimized // Optional: if remote images shouldn't be optimized by Next.js or if domain issues persist
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="w-full md:hidden flex flex-col gap-6">
                            {TABS.map((tab) => (
                                <div key={tab.id} className="relative rounded-3xl border border-zinc-800 bg-black text-zinc-200 overflow-hidden">
                                    <div className="p-4 border-b border-zinc-800 bg-white/5 font-medium flex items-center gap-2">
                                        {tab.icon}
                                        {tab.label}
                                    </div>
                                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-white via-blue-50 via-blue-200 via-blue-400 to-black">
                                        <Image
                                            src={tab.image}
                                            alt={tab.label}
                                            width={600}
                                            height={400}
                                            className="w-full h-auto rounded-lg shadow-lg object-contain"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#FB923C] via-[#F472B6] to-[#E879F9] opacity-10 pointer-events-none mix-blend-overlay" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
