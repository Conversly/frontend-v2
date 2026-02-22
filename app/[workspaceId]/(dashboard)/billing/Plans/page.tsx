"use client";

import React, { useEffect, useState } from "react";
import { PricingRedesign } from "@/components/billingsdk/pricing-redesign";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/contexts/workspace-context";
import { Plan, plans as planConfig } from "@/lib/billingsdk-config";
import { useSubscription } from "@/contexts/subscription-context";
import { useCheckout, usePlans, useEnrollFree } from "@/services/dodo";

export default function PlansPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const { toast } = useToast();
    const { workspaceId } = React.use(params);
    const { accountId } = useWorkspace();
    const { mutateAsync: createCheckout } = useCheckout();
    const { data: fetchedPlans, isLoading: initialLoading } = usePlans();
    const { mutateAsync: enrollFree } = useEnrollFree();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const { subscription, isLoading: subscriptionLoading, refreshSubscription } = useSubscription();

    const loading = initialLoading || checkoutLoading || subscriptionLoading;

    useEffect(() => {
        if (!fetchedPlans) return;

        const processPlans = () => {
            const groupedPlans = new Map<string, any[]>();

            fetchedPlans.forEach((p: any) => {
                const normalizedName = p.name.toLowerCase();
                const existing = groupedPlans.get(normalizedName) || [];
                groupedPlans.set(normalizedName, [...existing, p]);
            });

            const processedPlans: Plan[] = [];

            const findConfig = (backendName: string) => {
                return planConfig.find(c => c.title.toLowerCase() === backendName.toLowerCase());
            };

            groupedPlans.forEach((variants, name) => {
                const config = findConfig(name);

                let monthlyVariant = variants.find(v =>
                    v.prices.some((p: any) => p.interval === 'month')
                );

                let yearlyVariant = variants.find(v =>
                    v.prices.some((p: any) => p.interval === 'year')
                );

                if (!monthlyVariant) monthlyVariant = variants.find(v => v.monthlyPriceCents !== undefined);

                const getPriceObj = (variant: any, interval: 'month' | 'year') => {
                    if (!variant) return undefined;
                    return variant.prices.find((p: any) => p.interval === interval);
                };

                const monthlyPriceObj = getPriceObj(monthlyVariant, 'month');
                const yearlyPriceObj = getPriceObj(yearlyVariant, 'year');

                const getPriceString = (priceObj: any, variant: any, interval: 'month' | 'year') => {
                    if (priceObj && priceObj.amountCents !== undefined && priceObj.amountCents !== null) {
                        return String(priceObj.amountCents / 100);
                    }
                    if (interval === 'month' && variant?.monthlyPriceCents !== undefined) {
                        return String(variant.monthlyPriceCents / 100);
                    }
                    if (interval === 'year' && variant?.yearlyPriceCents !== undefined && variant?.yearlyPriceCents !== null) {
                        return String(variant.yearlyPriceCents / 100);
                    }
                    return undefined;
                };

                const monthlyPrice = getPriceString(monthlyPriceObj, monthlyVariant, 'month') || config?.monthlyPrice || "0";
                const yearlyPrice = getPriceString(yearlyPriceObj, yearlyVariant, 'year') || config?.yearlyPrice || "0";

                const trialPeriodDays = monthlyVariant?.trialPeriodDays || yearlyVariant?.trialPeriodDays || 0;

                const basePlan = config || {
                    id: monthlyVariant?.id || yearlyVariant?.id || 'unknown',
                    title: monthlyVariant?.name || yearlyVariant?.name || name,
                    description: monthlyVariant?.description || "Unlock powerful features",
                    buttonText: "Get Started",
                    features: [
                        { name: `${monthlyVariant?.creditsPerCycle || 0} Credits per cycle`, icon: "check" }
                    ],
                    highlight: false,
                    monthlyPrice,
                    yearlyPrice,
                    trialPeriodDays
                };

                const monthlyProductId = monthlyPriceObj ? monthlyPriceObj.dodoProductId : monthlyVariant?.id;
                const yearlyProductId = yearlyPriceObj ? yearlyPriceObj.dodoProductId : yearlyVariant?.id;

                const plan: Plan = {
                    ...basePlan,
                    id: basePlan.id,
                    title: basePlan.title,
                    monthlyPrice,
                    yearlyPrice,
                    monthlyProductId,
                    yearlyProductId,
                    trialPeriodDays,
                    features: basePlan.features,
                    highlight: basePlan.highlight || basePlan.title.toLowerCase().includes('standard'),
                    buttonText: trialPeriodDays > 0 ? "Start free trial" : (basePlan.buttonText || "Upgrade"),
                };

                processedPlans.push(plan);
            });

            const sortedPlans = processedPlans.sort((a: Plan, b: Plan) => {
                const indexA = planConfig.findIndex(c => c.title.toLowerCase() === a.title.toLowerCase());
                const indexB = planConfig.findIndex(c => c.title.toLowerCase() === b.title.toLowerCase());
                return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
            });

            setPlans(sortedPlans);
        };

        processPlans();
    }, [fetchedPlans]);

    useEffect(() => {
        import("dodopayments-checkout").then(({ DodoPayments }) => {
            DodoPayments.Initialize({
                mode: "test",
                displayType: "overlay",
                onEvent: (event) => {
                    if (event.event_type === "checkout.closed") {
                        toast({
                            title: "Checkout Closed",
                            description: "You closed the checkout window."
                        });
                    }
                    if (event.event_type === "checkout.error") {
                        toast({
                            title: "Checkout Error",
                            description: (event.data as any)?.message || "An error occurred.",
                            variant: "destructive"
                        });
                    }
                },
            });
        });
    }, [toast]);

    const handlePlanSelect = async (planId: string, interval: "month" | "year") => {
        try {
            setCheckoutLoading(true);

            const selectedPlan = plans.find(p => p.id === planId);
            if (!selectedPlan) throw new Error("Plan not found");

            const targetProductId = interval === 'year'
                ? selectedPlan.yearlyProductId
                : selectedPlan.monthlyProductId;

            if (!targetProductId) {
                if (selectedPlan.monthlyPrice === "0") {
                    await enrollFree({ planId: selectedPlan.id, accountId });
                    toast({
                        title: "Success",
                        description: "Activated free plan!"
                    });
                    await refreshSubscription();
                    return;
                }
                throw new Error(`Product ID not found for ${interval}ly plan`);
            }

            const price = interval === 'year' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
            const isFree = price === "0";

            if (isFree) {
                await enrollFree({ planId: targetProductId, accountId });
                toast({
                    title: "Success",
                    description: "Activated free plan!"
                });
                await refreshSubscription();
                return;
            }

            const { url } = await createCheckout({
                planId: targetProductId,
                interval,
                accountId,
                workspaceId
            });

            if (!url) {
                throw new Error("No checkout URL returned");
            }

            const { DodoPayments } = await import("dodopayments-checkout");
            DodoPayments.Checkout.open({
                checkoutUrl: url,
            });

        } catch (error: any) {
            if (error.message && error.message.includes("Cannot enroll in free plan while having an active paid subscription")) {
                toast({
                    title: "Action Required",
                    description: "Please cancel your current paid subscription before switching to the Free plan.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Error",
                    description: error.message || "Could not initiate plan selection. Please try again.",
                    variant: "destructive"
                });
            }
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading && !subscription?.planId) {
        return (
            <div className="container py-20 px-4 mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <Skeleton className="h-12 w-80 mx-auto rounded-full" />
                    <Skeleton className="h-6 w-96 mx-auto rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto space-y-12">
                    <Skeleton className="h-40 w-full rounded-[2rem]" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Skeleton className="h-[600px] w-full rounded-[2rem]" />
                        <Skeleton className="h-[600px] w-full rounded-[2rem]" />
                    </div>
                </div>
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-muted/30 p-8 rounded-3xl border border-border">
                    <h3 className="text-2xl font-bold mb-3">No plans available</h3>
                    <p className="text-muted-foreground max-w-md">
                        We could not load any plans at this time. Please check back later or contact support if the issue persists.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <PricingRedesign
                plans={plans}
                currentPlanId={subscription?.planId}
                currentPlanName={subscription?.planName}
                onPlanSelect={handlePlanSelect}
            />
        </div>
    );
}