"use client";

import { useState } from "react";
import { Check, Star, ArrowRight, Sparkles, Zap } from "lucide-react";
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

export function PricingRedesign({ plans, currentPlanId, onPlanSelect }: PricingRedesignProps) {
    const [isYearly, setIsYearly] = useState(false);

    const freePlan = plans.find((p) => p.title.toLowerCase() === "free" || p.monthlyPrice === "0");
    const premiumPlans = plans.filter((p) => p !== freePlan);

    const isCurrentPlan = (plan: Plan) => {
        if (!currentPlanId) return false;
        return plan.id === currentPlanId;
    };

    const maxDiscount = Math.max(...premiumPlans.map(getDiscountPercent));

    const renderPrice = (plan: Plan) => (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
                <span className="text-muted-foreground text-2xl font-medium">{plan.currency || "$"}</span>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isYearly ? "yearly-price" : "monthly-price"}
                        className="text-foreground text-6xl font-extrabold tracking-tight"
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
                        className="text-muted-foreground ml-1 text-lg font-medium"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        / {isYearly ? "yr" : "mo"}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Contextual Price Subtext */}
            <div className="h-5 mt-1">
                {isYearly && Number(plan.monthlyPrice) > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground"
                    >
                        Billed ${plan.yearlyPrice} annually
                    </motion.p>
                )}
            </div>
        </div>
    );

    const renderFeatures = (plan: Plan, isCurrent: boolean) => (
        <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                        {feature.icon === "star" ? (
                            <Star className="h-3 w-3 fill-current" />
                        ) : (
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                        )}
                    </div>
                    <span className="text-muted-foreground text-sm font-medium leading-relaxed">
                        {feature.name}
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header & Toggle */}
                <div className="mb-16 flex flex-col items-center justify-center text-center">
                    <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
                        Pricing that scales with you
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg mb-8">
                        Start for free, then upgrade when you need more power. No hidden fees.
                    </p>

                    <div className="relative flex flex-col items-center">
                        {/* Global Discount Attention Seeker */}
                        {maxDiscount > 0 && (
                            <div className="absolute -right-10 -top-10 md:-right-24 md:-top-8 rotate-12 z-20">
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-lg shadow-orange-500/30 rounded-full px-3 py-1.5 text-sm font-bold flex items-center gap-1"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Save up to {maxDiscount}%
                                </motion.div>
                            </div>
                        )}

                        <div className="bg-muted/50 p-1.5 rounded-full border border-border flex items-center shadow-inner relative z-10">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`relative w-32 rounded-full py-2.5 text-sm font-semibold transition-colors z-10 ${!isYearly ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {!isYearly && (
                                    <motion.div
                                        layoutId="billing-toggle"
                                        className="absolute inset-0 bg-background rounded-full shadow-md border border-border/50"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-20">Monthly</span>
                            </button>

                            <button
                                onClick={() => setIsYearly(true)}
                                className={`relative w-32 rounded-full py-2.5 text-sm font-semibold transition-colors z-10 ${isYearly ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {isYearly && (
                                    <motion.div
                                        layoutId="billing-toggle"
                                        className="absolute inset-0 bg-background rounded-full shadow-md border border-border/50"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-20">Yearly</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Free Plan - Full Width Banner */}
                {freePlan && (
                    <div className={`mb-12 w-full rounded-[2rem] border p-8 md:p-10 transition-all duration-300 ${isCurrentPlan(freePlan)
                        ? "border-primary/50 bg-primary/5 shadow-[0_0_40px_rgba(var(--primary),0.1)]"
                        : "border-border bg-card shadow-sm hover:shadow-md"
                        }`}>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                <div className="flex flex-col lg:flex-row items-center gap-4">
                                    <h3 className="text-3xl font-bold">{freePlan.title}</h3>
                                    {isCurrentPlan(freePlan) && (
                                        <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1 text-sm font-bold flex items-center gap-1.5">
                                            <Check className="w-4 h-4" /> Active Plan
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-lg max-w-xl">{freePlan.description}</p>
                            </div>

                            <div className="flex flex-col items-center lg:items-end w-full lg:w-auto space-y-4">
                                <div className="text-center lg:text-right">
                                    <span className="text-5xl font-extrabold text-foreground">$0</span>
                                </div>
                                <Button
                                    size="lg"
                                    className={`w-full lg:w-64 rounded-xl h-14 text-base font-semibold group ${isCurrentPlan(freePlan)
                                        ? "bg-muted text-muted-foreground cursor-default hover:bg-muted"
                                        : ""
                                        }`}
                                    variant={isCurrentPlan(freePlan) ? "secondary" : "outline"}
                                    disabled={isCurrentPlan(freePlan)}
                                    onClick={() => onPlanSelect(freePlan.id, isYearly ? "year" : "month")}
                                >
                                    {isCurrentPlan(freePlan) ? "Currently Active" : (freePlan.buttonText || "Get Started Free")}
                                    {!isCurrentPlan(freePlan) && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Premium Plans - Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl mx-auto w-full">
                    {premiumPlans.map((plan) => {
                        const isCurrent = isCurrentPlan(plan);
                        const discount = getDiscountPercent(plan);
                        const hasTrial = plan.trialPeriodDays && plan.trialPeriodDays > 0;

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col rounded-[2rem] p-8 transition-all duration-300 ${isCurrent
                                    ? "border-2 border-primary bg-card shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)] scale-[1.02]"
                                    : plan.highlight
                                        ? "border-2 border-primary/60 bg-gradient-to-b from-card to-primary/5 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                                        : "border border-border bg-card shadow-lg hover:-translate-y-1 hover:shadow-xl"
                                    }`}
                            >
                                {/* Badges */}
                                <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2">
                                    {isCurrent ? (
                                        <div className="bg-primary text-primary-foreground shadow-lg shadow-primary/30 rounded-full px-4 py-1.5 text-sm font-bold flex items-center gap-1.5">
                                            <Check className="w-4 h-4 stroke-[3]" /> Your Current Plan
                                        </div>
                                    ) : plan.highlight ? (
                                        <div className="bg-foreground text-background shadow-lg rounded-full px-4 py-1.5 text-sm font-bold flex items-center gap-1.5">
                                            <Zap className="w-4 h-4 fill-current" /> Most Popular
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mb-8 mt-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                                        {isYearly && discount > 0 && !isCurrent && (
                                            <span className="bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 rounded-full px-2.5 py-0.5 text-xs font-bold animate-pulse">
                                                Save {discount}%
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[40px]">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    {renderPrice(plan)}
                                </div>

                                <div className="mb-8 flex-1">
                                    <div className="h-px w-full bg-border mb-8" />
                                    {renderFeatures(plan, isCurrent)}
                                </div>

                                <div className="mt-auto space-y-3">
                                    {/* Free Trial Focus area */}
                                    {hasTrial && !isCurrent && (
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-primary">
                                                Includes a {plan.trialPeriodDays}-day free trial
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        size="lg"
                                        className={`w-full h-14 rounded-xl text-base font-bold transition-all duration-300 group ${isCurrent
                                            ? "bg-muted text-muted-foreground hover:bg-muted"
                                            : plan.highlight
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
                                                : "bg-foreground text-background hover:scale-[1.02]"
                                            }`}
                                        variant={isCurrent ? "secondary" : "default"}
                                        disabled={isCurrent}
                                        onClick={() => onPlanSelect(plan.id, isYearly ? "year" : "month")}
                                    >
                                        {isCurrent ? (
                                            "Current Plan"
                                        ) : hasTrial ? (
                                            <span className="flex items-center">
                                                Start free trial <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                {plan.buttonText || "Upgrade Now"} <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>

                                    {!isCurrent && (
                                        <p className="text-xs text-center text-muted-foreground">
                                            Secure payment via Dodo Payments
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}