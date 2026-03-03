'use client';

import { motion } from "framer-motion";
import { Cpu, Globe, Bot, Zap } from "lucide-react";

interface AboutClientAnimationsProps {
    children: React.ReactNode;
}

export function AnimatedHero() {
    return (
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
    );
}

export function AnimatedFeatureCards() {
    const features = [
        { icon: Cpu, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", title: "LLM Native", delay: 0.2 },
        { icon: Globe, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", title: "Multi-Channel", delay: 0.3, className: "mt-12" },
        { icon: Bot, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30", title: "Agentic AI", delay: 0.4 },
        { icon: Zap, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", title: "Real-time", delay: 0.5, className: "mt-12" }
    ];

    return (
        <div className="grid grid-cols-2 gap-6 relative">
            {features.map((item, index) => (
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
    );
}

export function AnimatedMissionSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
        >
            {children}
        </motion.div>
    );
}

interface ValueCardData {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

export function AnimatedValueCards({ item, index }: { item: ValueCardData; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
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
    );
}
