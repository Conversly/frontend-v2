"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Settings2, Database, BarChart3, MessageSquare, Wrench } from "lucide-react";

const TABS = [
    {
        id: "playground",
        label: "Playground",
        description: "Test and experiment with your AI agent",
        icon: <Code2 className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Playground.webp",
    },
    {
        id: "sources",
        label: "Sources",
        description: "Connect your knowledge base",
        icon: <Database className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Sources.webp",
    },
    {
        id: "customization",
        label: "Customization",
        description: "Personalize your agent's behavior",
        icon: <Wrench className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/Customize.webp",
    },
    {
        id: "analytics",
        label: "Analytics",
        description: "Monitor performance metrics",
        icon: <BarChart3 className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/analytics.webp",
    },
    {
        id: "chatlogs",
        label: "Chat Logs",
        description: "Review conversation history",
        icon: <MessageSquare className="h-4 w-4" />,
        image: "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/chatlogs.webp",
    },
    {
        id: "setup",
        label: "Setup",
        description: "Configure your integration",
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
        }, 3500);

        return () => clearInterval(interval);
    }, [isPaused, activeIndex]);

    const activeContent = TABS.find((t) => t.id === activeTab) || TABS[0];

    return (
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16 space-y-4"
                >
                    <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 font-medium text-sm border border-zinc-700/50 text-white bg-zinc-900/50 backdrop-blur-sm mb-4">
                        <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-primary via-blue-500 to-indigo-500 animate-pulse"></div>
                        Platform Features
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
                    >
                        Glimpse of Verly.ai
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        Experience our powerful platform with an{" "}
                        <span className="text-white font-medium">intuitive interface</span> designed for{" "}
                        <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            seamless AI integration
                        </span>
                        .
                    </motion.p>
                </motion.div>

                {/* Desktop Tabs */}
                <div className="hidden md:block">
                    {/* Tab Navigation */}
                    <div className="relative mb-8">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            {TABS.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsPaused(true);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 group",
                                        activeTab === tab.id
                                            ? "text-white shadow-lg"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                                    )}
                                >
                                    {/* Active Background Gradient */}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabBackground"
                                            className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-indigo-500 rounded-xl"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Content */}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span className={cn(
                                            "transition-transform duration-300",
                                            activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
                                        )}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                    </span>

                                    {/* Hover Effect Border */}
                                    {activeTab !== tab.id && (
                                        <div className="absolute inset-0 rounded-xl border border-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Content Display Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative mt-8"
                    >
                        {/* Proper Card Container */}
                        <div className="relative rounded-[24px] p-2 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                            <div className="relative bg-[#09090b] rounded-xl overflow-hidden shadow-inner">
                                {/* Card Header (Mac OS style dots) */}
                                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/10 to-transparent flex items-center px-4 z-20 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                                    </div>
                                </div>

                                {/* Content Container Background */}
                                <div className="relative w-full pt-10 min-h-[400px] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#0a0a0c] to-[#050505]">

                                    {/* Subtle grid pattern */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                                    {/* Image with Animation */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeContent.id}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="relative w-full h-full p-4 sm:p-8 flex items-center justify-center z-10"
                                        >
                                            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-black">
                                                <Image
                                                    src={activeContent.image}
                                                    alt={`${activeContent.label} preview`}
                                                    width={1400}
                                                    height={900}
                                                    className="w-full h-auto object-cover"
                                                    priority
                                                    unoptimized
                                                />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-blue-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl -z-10 opacity-60 pointer-events-none" />
                    </motion.div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-6">
                    {TABS.map((tab, index) => (
                        <motion.div
                            key={tab.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Proper Card Container */}
                            <div className="relative rounded-2xl p-1 bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10">
                                <div className="relative rounded-xl bg-[#09090b] overflow-hidden border border-white/5">
                                    {/* Header */}
                                    <div className="p-4 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex gap-3 items-center">
                                        <div className="p-2 rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
                                            {tab.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{tab.label}</h3>
                                            <p className="text-xs text-zinc-400 mt-0.5">{tab.description}</p>
                                        </div>
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#0a0a0c] to-[#050505] p-3">

                                        {/* Subtle grid pattern */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                                        <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-white/10 ring-1 ring-black z-10">
                                            <Image
                                                src={tab.image}
                                                alt={tab.label}
                                                width={600}
                                                height={400}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect on Hover */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl -z-10 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
