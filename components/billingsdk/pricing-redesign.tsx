"use client";

import { useRef, useState } from "react";
import { CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { Plan, plans as planConfig } from "@/lib/billingsdk-config";

export interface PricingRedesignProps {
    plans: Plan[];
    currentPlanId?: string | null;
    currentPlanName?: string | null;
    onPlanSelect: (planId: string, interval: "month" | "year") => void;
    isDialog?: boolean;
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

const PricingSwitch = ({
    onSwitch,
    className,
    maxDiscount,
    isDialog,
}: {
    onSwitch: (isYearly: boolean) => void;
    className?: string;
    maxDiscount: number;
    isDialog?: boolean;
}) => {
    const [selected, setSelected] = useState(false);

    const handleSwitch = (isYearly: boolean) => {
        setSelected(isYearly);
        onSwitch(isYearly);
    };

    return (
        <div className={cn("flex justify-center", className)}>
            <div className="relative z-10 mx-auto flex w-fit rounded-xl bg-muted/30 border border-border p-1">
                <button
                    onClick={() => handleSwitch(false)}
                    className={cn(
                        "relative z-10 w-fit cursor-pointer rounded-xl font-medium transition-colors",
                        isDialog ? "h-10 px-4 py-1.5 text-xs sm:text-sm" : "h-12 sm:px-6 px-3 sm:py-2 py-1 sm:text-base text-sm",
                        !selected
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {!selected && (
                        <motion.span
                            layoutId={"switch"}
                            className={cn(
                                "absolute top-0 left-0 w-full rounded-xl border-4 shadow-sm shadow-primary/30 border-primary bg-gradient-to-t from-primary/80 via-primary to-primary",
                                isDialog ? "h-10" : "h-12"
                            )}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative z-20">Monthly Billing</span>
                </button>

                <button
                    onClick={() => handleSwitch(true)}
                    className={cn(
                        "relative z-10 w-fit cursor-pointer flex-shrink-0 rounded-xl font-medium transition-colors",
                        isDialog ? "h-10 px-4 py-1.5 text-xs sm:text-sm" : "h-12 sm:px-6 px-3 sm:py-2 py-1 sm:text-base text-sm",
                        selected
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {selected && (
                        <motion.span
                            layoutId={"switch"}
                            className={cn(
                                "absolute top-0 left-0 w-full rounded-xl border-4 shadow-sm shadow-primary/30 border-primary bg-gradient-to-t from-primary/80 via-primary to-primary",
                                isDialog ? "h-10" : "h-12"
                            )}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative z-20 flex items-center gap-2">
                        Yearly Billing
                        <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wide transition-colors ${selected ? 'bg-white/20 text-white' : 'bg-primary text-primary-foreground'}`}>
                            20% discount
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export function PricingRedesign({ plans, currentPlanId, currentPlanName, onPlanSelect, isDialog }: PricingRedesignProps) {
    const [isYearly, setIsYearly] = useState(false);
    const pricingRef = useRef<HTMLDivElement>(null);

    const isCurrentPlan = (plan: Plan) => {
        const activeId = currentPlanId || "free";
        // Match by product IDs
        if (plan.id === activeId || plan.monthlyProductId === activeId || plan.yearlyProductId === activeId) {
            return true;
        }
        // Match by plan name/title (subscription.planName vs plan.title)
        if (currentPlanName && plan.title.toLowerCase() === currentPlanName.toLowerCase()) {
            return true;
        }
        return false;
    };

    const isLowerTierPlan = (plan: Plan) => {
        const activeName = currentPlanName || "Free";
        const currentIndex = planConfig.findIndex(c => c.title.toLowerCase() === activeName.toLowerCase());
        const planIndex = planConfig.findIndex(c => c.title.toLowerCase() === plan.title.toLowerCase());
        if (currentIndex === -1 || planIndex === -1) return false;
        return planIndex < currentIndex;
    };

    const maxDiscount = Math.max(...plans.map(getDiscountPercent), 0);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.4,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };

    return (
        <div
            className={cn(
                "px-2 mx-auto relative font-sans",
                isDialog ? "py-2 max-w-[1350px]" : "py-8 min-h-screen max-w-[1400px]"
            )}
            ref={pricingRef}
        >
            <article className={cn("text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center", isDialog ? "mb-6" : "mb-12")}>
                <h2 className={cn(
                    "capitalize flex font-medium text-foreground mb-4 justify-center",
                    isDialog ? "md:text-3xl text-2xl" : "md:text-5xl text-4xl"
                )}>
                    Simple Pricing That Grows With You
                </h2>

                <div
                    className={cn("w-full flex justify-center", isDialog ? "mt-2" : "mt-6")}
                >
                    <PricingSwitch
                        onSwitch={setIsYearly}
                        className="w-full sm:w-fit"
                        maxDiscount={maxDiscount}
                        isDialog={isDialog}
                    />
                </div>
            </article>

            <div className={cn(
                "grid grid-cols-1 gap-6 py-4 items-stretch",
                isDialog
                    ? plans.length >= 4 ? "lg:grid-cols-4 md:grid-cols-2" : plans.length === 3 ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2"
                    : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
            )}>
                {plans.map((plan, index) => {
                    const isCurrent = isCurrentPlan(plan);
                    const isLower = isLowerTierPlan(plan);
                    const isDisabled = isCurrent || isLower;
                    const activeDiscount = getDiscountPercent(plan);
                    const hasTrial = plan.trialPeriodDays && plan.trialPeriodDays > 0;

                    return (
                        <div
                            key={plan.id}
                            className="flex flex-col h-full"
                        >
                            <Card
                                className={`relative flex flex-col h-full transition-all duration-300 ${plan.highlight
                                    ? "ring-2 ring-primary shadow-xl shadow-primary/5 bg-primary/5"
                                    : isCurrent
                                        ? "bg-card border-border shadow-md"
                                        : "bg-card border-border hover:shadow-lg hover:-translate-y-1"
                                    }`}
                            >
                                <CardHeader className="text-left pb-2 px-6 pt-6">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-2xl flex-1 font-semibold text-foreground mb-1 leading-tight">
                                            {plan.title}
                                        </h3>
                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                            {isCurrent && (
                                                <div className="mt-0">
                                                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                                        Current Plan
                                                    </span>
                                                </div>
                                            )}
                                            {plan.highlight && (
                                                <div className="mt-0">
                                                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                                        {plan.badge || "Popular"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4 min-h-[32px]">
                                        {plan.description}
                                    </p>

                                    <div className="min-h-[64px] mb-4">
                                        <div className="flex items-baseline text-left">
                                            <span className="text-4xl font-semibold text-foreground tracking-tight mr-1">
                                                {plan.currency || "$"}
                                            </span>
                                            <NumberFlow
                                                value={isYearly ? Number(plan.yearlyPrice) : Number(plan.monthlyPrice)}
                                                className="text-5xl font-semibold text-foreground tracking-tight"
                                            />
                                            <span className="text-muted-foreground ml-1 text-sm font-medium">
                                                /{isYearly ? "year" : "month"}
                                            </span>
                                        </div>

                                        <div className="h-5 mt-1 flex items-center mb-6">
                                            {isYearly && Number(plan.monthlyPrice) > 0 && activeDiscount > 0 ? (
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    Billed ${plan.yearlyPrice} annually
                                                </p>
                                            ) : hasTrial ? (
                                                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                                    {plan.trialPeriodDays} days free trial
                                                </p>
                                            ) : null}
                                        </div>

                                        <button
                                            disabled={isDisabled}
                                            onClick={() => onPlanSelect(plan.id, isYearly ? "year" : "month")}
                                            className={`w-full py-3 px-4 text-xs sm:text-[13px] font-bold rounded-xl transition-all ${isDisabled
                                                ? "bg-muted text-muted-foreground cursor-default"
                                                : plan.highlight
                                                    ? "bg-gradient-to-t from-primary to-primary/80 shadow-lg shadow-primary/20 border border-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
                                                    : "bg-gradient-to-t from-foreground to-foreground/80 shadow-lg shadow-foreground/10 border border-foreground text-background hover:opacity-90 active:scale-[0.98]"
                                                }`}
                                        >
                                            {isCurrent ? "Current Plan" : plan.buttonText || "Get Started"}
                                        </button>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4 px-6 flex flex-col flex-1">
                                    <div className="space-y-4">
                                        <h2 className="text-[13px] font-semibold text-foreground tracking-wide">
                                            Featured
                                        </h2>
                                        {plan.benefits && plan.benefits.length > 0 && (
                                            <h4 className="font-medium text-[10px] sm:text-xs text-foreground mb-2">
                                                {plan.benefits[0]}
                                            </h4>
                                        )}

                                        <ul className="space-y-3 font-medium">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start">
                                                    <span className={`h-4 w-4 rounded-full flex place-content-center items-center mr-3 shrink-0`}>
                                                        <CheckCheck className={`h-3 w-3 ${plan.highlight ? 'text-blue-500' : 'text-blue-500'}`} />
                                                    </span>
                                                    <span className="text-[10px] sm:text-xs text-muted-foreground leading-snug">{feature.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}