"use client";

import React, { useEffect, useState } from "react";
import { PricingRedesign } from "@/components/billingsdk/pricing-redesign";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/contexts/workspace-context";
import { Plan, plans as planConfig } from "@/lib/billingsdk-config";
import { useSubscription } from "@/contexts/subscription-context";
import { useCheckout, usePlans, useEnrollFree } from "@/hooks/use-dodo";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";

export interface UpgradeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Short headline shown in the dialog header */
    title: string;
    /** Subtext shown below the title */
    description: string;
}

/**
 * Generic upgrade dialog that shows the full PricingRedesign component.
 * Filters out the Free plan and the user's current plan — only shows
 * plans the user can actually upgrade to.
 */
export function UpgradeDialog({
    open,
    onOpenChange,
    title,
    description,
}: UpgradeDialogProps) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const { toast } = useToast();
    const { workspaceId, accountId } = useWorkspace();
    const { mutateAsync: createCheckout } = useCheckout();
    const { data: fetchedPlans, isLoading: initialLoading } = usePlans();
    const { mutateAsync: enrollFree } = useEnrollFree();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const { subscription, isLoading: subscriptionLoading, refreshSubscription } =
        useSubscription();

    const loading = initialLoading || checkoutLoading || subscriptionLoading;

    // ── Process fetched plans (identical to billing/Plans/page.tsx) ───────────
    useEffect(() => {
        if (!fetchedPlans) return;

        const groupedPlans = new Map<string, any[]>();
        fetchedPlans.forEach((p: any) => {
            const norm = p.name.toLowerCase();
            groupedPlans.set(norm, [...(groupedPlans.get(norm) || []), p]);
        });

        const processedPlans: Plan[] = [];
        const findConfig = (name: string) =>
            planConfig.find((c) => c.title.toLowerCase() === name.toLowerCase());

        groupedPlans.forEach((variants, name) => {
            const config = findConfig(name);

            let monthlyVariant = variants.find((v) =>
                v.prices.some((p: any) => p.interval === "month")
            );
            let yearlyVariant = variants.find((v) =>
                v.prices.some((p: any) => p.interval === "year")
            );
            if (!monthlyVariant)
                monthlyVariant = variants.find((v) => v.monthlyPriceCents !== undefined);

            const getPriceObj = (variant: any, interval: "month" | "year") =>
                variant?.prices.find((p: any) => p.interval === interval);

            const monthlyPriceObj = getPriceObj(monthlyVariant, "month");
            const yearlyPriceObj = getPriceObj(yearlyVariant, "year");

            const getPriceStr = (priceObj: any, variant: any, interval: "month" | "year") => {
                if (priceObj?.amountCents != null) return String(priceObj.amountCents / 100);
                if (interval === "month" && variant?.monthlyPriceCents != null)
                    return String(variant.monthlyPriceCents / 100);
                if (interval === "year" && variant?.yearlyPriceCents != null)
                    return String(variant.yearlyPriceCents / 100);
                return undefined;
            };

            const monthlyPrice =
                getPriceStr(monthlyPriceObj, monthlyVariant, "month") || config?.monthlyPrice || "0";
            const yearlyPrice =
                getPriceStr(yearlyPriceObj, yearlyVariant, "year") || config?.yearlyPrice || "0";
            const trialPeriodDays =
                monthlyVariant?.trialPeriodDays || yearlyVariant?.trialPeriodDays || 0;

            const basePlan = config || {
                id: monthlyVariant?.id || yearlyVariant?.id || "unknown",
                title: monthlyVariant?.name || yearlyVariant?.name || name,
                description: monthlyVariant?.description || "Unlock powerful features",
                buttonText: "Get Started",
                features: [
                    { name: `${monthlyVariant?.creditsPerCycle || 0} Credits per cycle`, icon: "check" },
                ],
                highlight: false,
                monthlyPrice,
                yearlyPrice,
                trialPeriodDays,
            };

            processedPlans.push({
                ...basePlan,
                monthlyPrice,
                yearlyPrice,
                monthlyProductId: monthlyPriceObj ? monthlyPriceObj.dodoProductId : monthlyVariant?.id,
                yearlyProductId: yearlyPriceObj ? yearlyPriceObj.dodoProductId : yearlyVariant?.id,
                trialPeriodDays,
                highlight:
                    basePlan.highlight || basePlan.title.toLowerCase().includes("standard"),
                buttonText: trialPeriodDays > 0 ? "Start free trial" : basePlan.buttonText || "Upgrade",
            });
        });

        setPlans(
            processedPlans.sort((a, b) => {
                const ia = planConfig.findIndex((c) => c.title.toLowerCase() === a.title.toLowerCase());
                const ib = planConfig.findIndex((c) => c.title.toLowerCase() === b.title.toLowerCase());
                return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
            })
        );
    }, [fetchedPlans]);

    // ── Initialise Dodo overlay ───────────────────────────────────────────────
    useEffect(() => {
        if (!open) return;
        import("dodopayments-checkout").then(({ DodoPayments }) => {
            DodoPayments.Initialize({
                mode: "test",
                displayType: "overlay",
                onEvent: (event) => {
                    if (event.event_type === "checkout.closed")
                        toast({ title: "Checkout Closed", description: "You closed the checkout window." });
                    if (event.event_type === "checkout.error")
                        toast({
                            title: "Checkout Error",
                            description: (event.data as any)?.message || "An error occurred.",
                            variant: "destructive",
                        });
                },
            });
        });
    }, [open, toast]);

    // ── Plan selection handler ─────────────────────────────────────────────────
    const handlePlanSelect = async (planId: string, interval: "month" | "year") => {
        try {
            setCheckoutLoading(true);
            const selected = plans.find((p) => p.id === planId);
            if (!selected) throw new Error("Plan not found");

            const targetProductId =
                interval === "year" ? selected.yearlyProductId : selected.monthlyProductId;
            const price = interval === "year" ? selected.yearlyPrice : selected.monthlyPrice;

            if (!targetProductId || price === "0") {
                await enrollFree({ planId: targetProductId || selected.id, accountId });
                toast({ title: "Success", description: "Activated free plan!" });
                await refreshSubscription();
                onOpenChange(false);
                return;
            }

            const { url } = await createCheckout({ planId: targetProductId, interval, accountId, workspaceId });
            if (!url) throw new Error("No checkout URL returned");

            const { DodoPayments } = await import("dodopayments-checkout");

            // Close the dialog so Radix's pointer-events shield doesn't block the Dodo overlay
            onOpenChange(false);

            DodoPayments.Checkout.open({ checkoutUrl: url });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Could not initiate plan selection. Please try again.",
                variant: "destructive",
            });
        } finally {
            setCheckoutLoading(false);
        }
    };

    // ── Filter: hide Free plan + current plan ─────────────────────────────────
    const upgradablePlans = plans.filter((p) => {
        // Skip $0/free plans
        const isFree = p.monthlyPrice === "0" && p.yearlyPrice === "0";
        // Skip the plan the user is already subscribed to
        const isCurrent =
            p.monthlyProductId === subscription?.planId ||
            p.yearlyProductId === subscription?.planId ||
            p.id === subscription?.planId;
        return !isFree && !isCurrent;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-5xl max-h-[92vh] overflow-y-auto">
                <DialogHeader className="pb-2">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0">
                            <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">{title}</DialogTitle>
                            <DialogDescription className="text-sm">{description}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {loading && !subscription?.planId ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                        <Skeleton className="h-[480px] w-full rounded-2xl" />
                        <Skeleton className="h-[480px] w-full rounded-2xl" />
                        <Skeleton className="h-[480px] w-full rounded-2xl" />
                    </div>
                ) : upgradablePlans.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-muted-foreground">Could not load plans. Please try again later.</p>
                    </div>
                ) : (
                    <PricingRedesign
                        plans={upgradablePlans}
                        currentPlanId={undefined}
                        onPlanSelect={handlePlanSelect}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
