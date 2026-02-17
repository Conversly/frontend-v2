"use client";

import { useState } from "react";
import { Check, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plan } from "@/lib/billingsdk-config";

export interface PricingRedesignProps {
    plans: Plan[];
    currentPlanId?: string | null;
    onPlanSelect: (planId: string, interval: "month" | "year") => void;
}

const gradientFrom = ["from-chart-1/70", "from-chart-2/70", "from-chart-3/70", "from-chart-4/70"];

const getDiscountPercent = (plan: Plan) => {
    const monthly = Number(plan.monthlyPrice) || 0;
    const yearly = Number(plan.yearlyPrice) || 0;

    if (monthly === 0) return 0;

    return Math.min(
        100,
        Math.max(
            0,
            Math.round((1 - yearly / (monthly * 12)) * 100),
        ),
    );
};

export function PricingRedesign({ plans, currentPlanId, onPlanSelect }: PricingRedesignProps) {
    const [isYearly, setIsYearly] = useState(false);

    // Separate Free plan from others
    const freePlan = plans.find(p => p.title.toLowerCase() === 'free' || p.monthlyPrice === '0');
    const premiumPlans = plans.filter(p => p !== freePlan);

    const isCurrentPlan = (plan: Plan) => {
        if (!currentPlanId) return false;
        // Basic ID match
        if (plan.id === currentPlanId) return true;
        // Handle "Free" plan match if currentPlanId is not explicitly 'free' but status implies it (backend logic dependence)
        // For now, assume ID equality.
        // If currentPlanId is undefined/null, user is likely on free plan implicitly if no subscription data, 
        // but let's rely on explicit ID passed from parent.
        return false;
    };

    const renderPrice = (plan: Plan) => (
        <div className="flex items-baseline">
            <span className="text-muted-foreground text-base">{plan.currency || "$"}</span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isYearly ? "yearly-price" : "monthly-price"}
                    className="text-foreground ml-1 text-5xl font-bold"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isYearly ? "per-year" : "per-month"}
                    className="text-muted-foreground ml-2 text-sm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    / {isYearly ? "year" : "month"}
                </motion.span>
            </AnimatePresence>
        </div>
    );

    const renderFeatures = (plan: Plan) => (
        <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                    <div className="bg-primary-foreground mt-0.5 mr-3 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                        {feature.icon === "check" ? (
                            <Check className={`h-2.5 w-2.5 ${feature.iconColor || "text-foreground"}`} />
                        ) : feature.icon === "start" ? (
                            <Star className={`h-2.5 w-2.5 ${feature.iconColor || "text-foreground"}`} />
                        ) : (
                            <Check className={`h-2.5 w-2.5 ${feature.iconColor || "text-foreground"}`} />
                        )}
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">
                        {feature.name}
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header & Toggle */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Choose the plan that's right for you
                        </p>
                    </div>

                    <div className="bg-primary-foreground/70 relative inline-flex items-center rounded-full p-1.5 dark:!shadow-[inset_0_1.5px_0_color-mix(in_oklch,_var(--primary)_15%,_transparent)]">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`text-foreground relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${!isYearly
                                ? "text-foreground border-muted-foreground/10 border"
                                : "text-muted-foreground"
                                }`}
                            aria-pressed={!isYearly}
                        >
                            {!isYearly && (
                                <motion.div
                                    layoutId="toggle-indicator"
                                    className="bg-primary-foreground absolute inset-0 rounded-full shadow-sm"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">Monthly</span>
                        </button>

                        <button
                            onClick={() => setIsYearly(true)}
                            className={`text-foreground relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${isYearly
                                ? "text-foreground border-muted-foreground/10 border"
                                : "text-muted-foreground"
                                }`}
                            aria-pressed={isYearly}
                        >
                            {isYearly && (
                                <motion.div
                                    layoutId="toggle-indicator"
                                    className="bg-primary-foreground absolute inset-0 rounded-full shadow-sm"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">Yearly</span>
                        </button>
                    </div>
                </div>

                {/* Free Plan - Full Width */}
                {freePlan && (
                    <div className="mb-10 w-full rounded-3xl border border-primary-foreground bg-gradient-to-r from-primary-foreground/5 via-primary-foreground/10 to-primary-foreground/5 p-8 shadow-lg">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-foreground text-2xl font-bold">{freePlan.title}</h3>
                                    {isCurrentPlan(freePlan) && (
                                        <div className="bg-green-500/10 text-green-600 ring-green-500/20 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ring-1">
                                            Current Plan
                                        </div>
                                    )}
                                </div>
                                <p className="text-muted-foreground mb-6">{freePlan.description}</p>
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Includes</h4>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {freePlan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <div className="bg-primary-foreground mr-3 flex h-5 w-5 items-center justify-center rounded-full">
                                                    <Check className="h-3 w-3 text-foreground" />
                                                </div>
                                                <span className="text-sm text-foreground">{feature.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center lg:items-end min-w-[250px] space-y-6">
                                <div className="text-center lg:text-right">
                                    <span className="text-4xl font-bold text-foreground">Free</span>
                                    <p className="text-sm text-muted-foreground mt-1">Forever</p>
                                </div>
                                <Button
                                    className="w-full lg:w-auto min-w-[200px] h-12 rounded-xl"
                                    variant={isCurrentPlan(freePlan) ? "outline" : "default"}
                                    disabled={isCurrentPlan(freePlan)}
                                    onClick={() => onPlanSelect(freePlan.id, isYearly ? "year" : "month")}
                                >
                                    {isCurrentPlan(freePlan) ? "Current Plan" : (freePlan.buttonText || "Get Started")}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Premium Plans - Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                    {premiumPlans.map((plan, index) => {
                        const monthlyPriceNum = Number(plan.monthlyPrice) || 0;
                        const yearlyPriceNum = Number(plan.yearlyPrice) || 0;
                        const isCurrent = isCurrentPlan(plan);

                        return (
                            <div
                                key={plan.id}
                                className={`flex flex-col relative rounded-3xl border p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${isCurrent
                                        ? "border-green-500/50 ring-2 ring-green-500/20 bg-green-500/5"
                                        : "border-primary-foreground bg-gradient-to-b via-primary-foreground/10 to-primary-foreground from-[0%] via-[40%] to-[100%] " + (gradientFrom[index] || "")
                                    }`}
                            >
                                {plan.highlight && !isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                                        <div className="bg-primary-foreground text-foreground ring-muted-foreground/50 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ring-1">
                                            {plan.badge || "Most popular"}
                                        </div>
                                    </div>
                                )}
                                {isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                                        <div className="bg-green-600 text-white shadow-lg shadow-green-900/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide whitespace-nowrap">
                                            Current Plan
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-foreground text-xl font-bold">
                                            {plan.title}
                                        </h3>
                                        {isYearly &&
                                            monthlyPriceNum > 0 &&
                                            yearlyPriceNum < monthlyPriceNum * 12 && (
                                                <span className="bg-primary-foreground text-foreground shadow-muted-foreground/40 inline-block rounded-full px-2 py-1 text-xs whitespace-nowrap shadow-sm">
                                                    Save {getDiscountPercent(plan)}%
                                                </span>
                                            )}
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    {renderPrice(plan)}
                                </div>

                                <div className="mb-8 flex-1">
                                    {renderFeatures(plan)}
                                </div>

                                <Button
                                    className={`h-12 w-full rounded-xl font-medium transition-all duration-200 mt-auto`}
                                    variant={isCurrent ? "outline" : "default"}
                                    disabled={isCurrent}
                                    onClick={() => onPlanSelect(plan.id, isYearly ? "year" : "month")}
                                >
                                    {isCurrent ? "Current Plan" : (plan.buttonText || "Get started")}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
