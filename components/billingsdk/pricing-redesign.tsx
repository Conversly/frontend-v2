"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plan } from "@/lib/billingsdk-config";

export interface PricingRedesignProps {
    plans: Plan[];
    currentPlanId?: string | null;
    onPlanSelect: (planId: string, interval: "month" | "year") => void;
}

const getDiscountPercent = (plan: Plan) => {
    const monthly = Number(plan.monthlyPrice) || 0;
    const yearly = Number(plan.yearlyPrice) || 0;

    if (monthly === 0) return 0;

    return Math.min(
        100,
        Math.max(0, Math.round((1 - yearly / (monthly * 12)) * 100))
    );
};

const ChatbotIcon = ({ tier, className }: { tier: number, className?: string }) => {
    // Tier 1: Free / Hobby (Simple Automation)
    // Tier 2: Standard (Capable Support AI)
    // Tier 3: Pro / Enterprise (Intelligent AI Agent)
    const effectiveTier = tier <= 2 ? 1 : tier === 3 ? 2 : 3;

    return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {effectiveTier === 1 && (
                <g>
                    {/* Hobby Bot - Simple flat design, pastel blue/gray */}
                    <rect x="35" y="45" width="50" height="45" rx="12" fill="#E2E8F0" className="dark:fill-slate-800" />
                    <rect x="40" y="50" width="40" height="35" rx="8" fill="#F8FAFC" className="dark:fill-slate-700" />
                    {/* Eyes */}
                    <circle cx="50" cy="65" r="4" fill="#64748B" className="dark:fill-slate-300" />
                    <circle cx="70" cy="65" r="4" fill="#64748B" className="dark:fill-slate-300" />
                    {/* Mouth */}
                    <rect x="55" y="75" width="10" height="2" rx="1" fill="#64748B" className="dark:fill-slate-300" />
                    {/* Antenna */}
                    <rect x="58" y="30" width="4" height="15" fill="#CBD5E1" className="dark:fill-slate-600" />
                    <circle cx="60" cy="28" r="4" fill="#94A3B8" className="dark:fill-slate-500" />
                    {/* Ear / Mic */}
                    <rect x="25" y="55" width="10" height="15" rx="3" fill="#CBD5E1" className="dark:fill-slate-600" />
                    <rect x="85" y="55" width="10" height="15" rx="3" fill="#CBD5E1" className="dark:fill-slate-600" />
                    <path d="M 95 62 L 105 70" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" className="dark:stroke-slate-600" />
                    <circle cx="106" cy="71" r="3" fill="#94A3B8" className="dark:fill-slate-500" />
                </g>
            )}
            {effectiveTier === 2 && (
                <g>
                    {/* Standard Bot - Teal/Blue, sharper, headset, solid colors */}
                    <defs>
                        <filter id="shadow-t2" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.15" />
                        </filter>
                    </defs>
                    <g filter="url(#shadow-t2)">
                        {/* Head */}
                        <path d="M 40 35 L 80 35 L 90 50 L 90 85 L 80 95 L 40 95 L 30 85 L 30 50 Z" fill="#0EA5E9" />
                        <path d="M 42 40 L 78 40 L 85 52 L 85 82 L 78 90 L 42 90 L 35 82 L 35 52 Z" fill="#38BDF8" className="dark:fill-[#0284C7]" />
                        {/* Eyes */}
                        <path d="M 45 65 Q 50 60 55 65" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M 65 65 Q 70 60 75 65" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                        {/* Smile */}
                        <path d="M 52 75 Q 60 82 68 75" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                        {/* Panel Line */}
                        <path d="M 35 52 L 85 52" stroke="#0284C7" strokeWidth="2" opacity="0.5" className="dark:stroke-sky-300" />
                        {/* Status Light */}
                        <circle cx="60" cy="46" r="3" fill="#34D399" />
                        {/* Headset Band */}
                        <path d="M 25 60 C 25 25, 95 25, 95 60" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" fill="none" className="dark:stroke-slate-100" />
                        {/* Headset Earpiece */}
                        <rect x="20" y="50" width="12" height="24" rx="6" fill="#1E293B" className="dark:fill-slate-100" />
                        <rect x="88" y="50" width="12" height="24" rx="6" fill="#1E293B" className="dark:fill-slate-100" />
                        {/* Boom Mic */}
                        <path d="M 94 70 L 100 85 L 85 92" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="dark:stroke-slate-100" />
                        <circle cx="83" cy="93" r="4" fill="#F43F5E" />
                    </g>
                </g>
            )}
            {effectiveTier >= 3 && (
                <g>
                    {/* Pro/Enterprise Bot - Gradients, Glow, Halo, intelligent */}
                    <defs>
                        <radialGradient id="halo-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0" />
                            <stop offset="90%" stopColor="#8B5CF6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="vis-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#A855F7" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                        <linearGradient id="face-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>
                        <filter id="eye-glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Holographic Halo */}
                    <circle cx="60" cy="55" r="50" fill="url(#halo-glow)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                    <circle cx="60" cy="55" r="45" stroke="#A855F7" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '60px 55px' }} />
                    <circle cx="60" cy="55" r="35" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.4" className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: '60px 55px' }} />

                    {/* Core Head Structure */}
                    <path d="M 40 25 L 80 25 L 95 55 L 75 95 L 45 95 L 25 55 Z" fill="url(#vis-grad)" />
                    <path d="M 43 28 L 77 28 L 90 55 L 72 91 L 48 91 L 30 55 Z" fill="url(#face-grad)" />

                    {/* Glowing Eyes */}
                    <g filter="url(#eye-glow)">
                        <rect x="42" y="50" width="12" height="4" rx="2" fill="#22D3EE" />
                        <rect x="66" y="50" width="12" height="4" rx="2" fill="#22D3EE" />
                        <rect x="58" y="70" width="4" height="4" rx="2" fill="#3B82F6" />
                    </g>

                    {/* Panel details */}
                    <path d="M 43 28 L 60 50 L 77 28" stroke="#3B82F6" strokeWidth="2" opacity="0.4" fill="none" />
                    <path d="M 30 55 L 48 91" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
                    <path d="M 90 55 L 72 91" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
                </g>
            )}
        </svg>
    );
};

export function PricingRedesign({ plans, currentPlanId, onPlanSelect }: PricingRedesignProps) {
    const [isYearly, setIsYearly] = useState(false);

    const isCurrentPlan = (plan: Plan) => {
        if (!currentPlanId) return false;
        return plan.id === currentPlanId;
    };

    const maxDiscount = Math.max(...plans.map(getDiscountPercent), 0);

    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen font-sans">
            <div className="mx-auto max-w-7xl">
                {/* Header & Toggle */}
                <div className="mb-16 flex flex-col items-center justify-center text-center">
                    <h2 className="text-zinc-900 dark:text-zinc-50 text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Pricing Plans
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg mb-10 font-medium">
                        Start free and upgrade anytime as your team and projects grow
                    </p>

                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-full shadow-sm relative">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors z-10 ${!isYearly ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <span className="relative z-20">Monthly</span>
                            {!isYearly && (
                                <motion.div
                                    layoutId="pricing-toggle"
                                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>

                        <button
                            onClick={() => setIsYearly(true)}
                            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors z-10 flex items-center gap-2 ${isYearly ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <span className="relative z-20">Annual</span>
                            {maxDiscount > 0 && (
                                <span className="relative z-20 text-xs font-extrabold text-blue-600 dark:text-blue-400 -ml-1">
                                    Save {maxDiscount}% Off
                                </span>
                            )}
                            {isYearly && (
                                <motion.div
                                    layoutId="pricing-toggle"
                                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid gap-8 lg:grid-cols-3 max-w-[1100px] mx-auto items-stretch">
                    {plans.map((plan, index) => {
                        const isCurrent = isCurrentPlan(plan);
                        const discount = getDiscountPercent(plan);
                        const hasTrial = plan.trialPeriodDays && plan.trialPeriodDays > 0;
                        const tier = Math.min(index + 1, 4);

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] p-8 lg:p-10 transition-all duration-300 overflow-hidden ${isCurrent
                                    ? "ring-2 ring-black dark:ring-white shadow-xl shadow-black/5"
                                    : "border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-zinc-200/50 hover:shadow-xl hover:-translate-y-1"
                                    }`}
                            >
                                {/* Background SVG Character - Upgraded to full color */}
                                <div className="absolute top-0 right-0 p-4 pointer-events-none w-40 h-40 transform translate-x-6 -translate-y-4 opacity-90 drop-shadow-md">
                                    <ChatbotIcon tier={tier} className="w-full h-full" />
                                </div>

                                {/* Top Section */}
                                <div className="relative z-10 mb-8 min-h-[80px]">
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">{plan.title}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[85%] leading-relaxed font-medium">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Price Section */}
                                <div className="relative z-10 mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.span
                                                key={isYearly ? "yearly-price" : "monthly-price"}
                                                className="text-[3.5rem] font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter leading-none"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {plan.currency || "$"}{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className="text-zinc-500 dark:text-zinc-400 text-lg font-bold ml-1">
                                            /{isYearly ? "year" : "month"}
                                        </span>
                                    </div>
                                    <div className="h-5 mt-3">
                                        {isYearly && Number(plan.monthlyPrice) > 0 && discount > 0 ? (
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                                Billed ${plan.yearlyPrice} annually
                                            </p>
                                        ) : hasTrial ? (
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                                {plan.trialPeriodDays} days free trial
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="relative z-10 mb-8">
                                    <Button
                                        size="lg"
                                        className={`w-full h-14 rounded-xl font-bold text-base transition-all ${isCurrent
                                            ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-default hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            : "bg-black text-white hover:bg-zinc-800 hover:scale-[1.02] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                                            }`}
                                        disabled={isCurrent}
                                        onClick={() => onPlanSelect(plan.id, isYearly ? "year" : "month")}
                                    >
                                        {isCurrent ? "Current Plan" : (plan.buttonText || "Get Started")}
                                    </Button>
                                </div>

                                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 mb-8" />

                                {/* Features List */}
                                <div className="relative z-10 flex-1">
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-5 tracking-wide">
                                        Featured
                                    </h4>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 flex-shrink-0 text-blue-500">
                                                    <Check className="h-4 w-4 stroke-[3]" />
                                                </div>
                                                <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}