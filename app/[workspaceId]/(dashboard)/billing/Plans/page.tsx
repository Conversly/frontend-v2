
"use client";

import React, { useEffect, useState } from "react";
import { PricingRedesign } from "@/components/billingsdk/pricing-redesign";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/contexts/workspace-context";
import { Plan, plans as planConfig } from "@/lib/billingsdk-config";
import { useSubscription } from "@/contexts/subscription-context";

import { useCheckout, usePlans, useEnrollFree } from "@/hooks/use-dodo";

export default function PlansPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const { toast } = useToast();
    const { workspaceId } = React.use(params);
    const { accountId } = useWorkspace();
    const { mutateAsync: createCheckout } = useCheckout();
    const { data: fetchedPlans, isLoading: initialLoading } = usePlans();
    const { mutateAsync: enrollFree } = useEnrollFree();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    // Use the global subscription context instead of fetching locally
    const { subscription, isLoading: subscriptionLoading, refreshSubscription } = useSubscription();

    const loading = initialLoading || checkoutLoading || subscriptionLoading;

    useEffect(() => {
        if (!fetchedPlans) return;

        const processPlans = () => {
            // Group plans by name to combine monthly/yearly versions
            const groupedPlans = new Map<string, any[]>();

            fetchedPlans.forEach((p: any) => {
                const normalizedName = p.name.toLowerCase();
                const existing = groupedPlans.get(normalizedName) || [];
                groupedPlans.set(normalizedName, [...existing, p]);
            });

            const processedPlans: Plan[] = [];

            // Helper to find config by fuzzy name matching
            const findConfig = (backendName: string) => {
                return planConfig.find(c => c.title.toLowerCase() === backendName.toLowerCase());
            };

            groupedPlans.forEach((variants, name) => {
                const config = findConfig(name);

                // Find monthly and yearly variants based on their prices
                // We assume the Dodo product has a price with 'month' or 'year' interval

                let monthlyVariant = variants.find(v =>
                    v.prices.some((p: any) => p.interval === 'month')
                );

                let yearlyVariant = variants.find(v =>
                    v.prices.some((p: any) => p.interval === 'year')
                );

                // Fallback: if single product has multiple prices (less likely with Dodo structure but possible)
                if (!monthlyVariant) monthlyVariant = variants.find(v => v.monthlyPriceCents !== undefined);

                // Find specific price objects
                const getPriceObj = (variant: any, interval: 'month' | 'year') => {
                    if (!variant) return undefined;
                    return variant.prices.find((p: any) => p.interval === interval);
                };

                const monthlyPriceObj = getPriceObj(monthlyVariant, 'month');
                const yearlyPriceObj = getPriceObj(yearlyVariant, 'year');

                // Helper to get price string
                const getPriceString = (priceObj: any, variant: any, interval: 'month' | 'year') => {
                    if (priceObj) return String(priceObj.amount / 100);
                    // Fallback to monthlyPriceCents if available and appropriate
                    if (interval === 'month' && variant?.monthlyPriceCents !== undefined) {
                        return String(variant.monthlyPriceCents / 100);
                    }
                    return undefined;
                };

                const monthlyPrice = getPriceString(monthlyPriceObj, monthlyVariant, 'month') || config?.monthlyPrice || "0";
                const yearlyPrice = getPriceString(yearlyPriceObj, yearlyVariant, 'year') || config?.yearlyPrice || "0";

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
                    yearlyPrice
                };

                // Use the dodoProductId from the price object if available, otherwise fallback to Plan ID (likely wrong for checkout but handled by error)
                // If using fallback config, we might not have ID, handled by generic free plan check or error.
                const monthlyProductId = monthlyPriceObj ? monthlyPriceObj.dodoProductId : monthlyVariant?.id;
                const yearlyProductId = yearlyPriceObj ? yearlyPriceObj.dodoProductId : yearlyVariant?.id;

                const plan: Plan = {
                    ...basePlan,
                    id: basePlan.id,
                    title: basePlan.title,
                    monthlyPrice,
                    yearlyPrice,
                    monthlyProductId, // Fix: Use correct price ID
                    yearlyProductId,  // Fix: Use correct price ID
                    features: basePlan.features,
                    highlight: basePlan.highlight || basePlan.title.toLowerCase().includes('pro'),
                };

                processedPlans.push(plan);
            });

            // Sort plans to match config order
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
                    console.log("Dodo Event:", event);
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

            // Determine correct Dodo Product ID based on interval
            const targetProductId = interval === 'year'
                ? selectedPlan.yearlyProductId
                : selectedPlan.monthlyProductId;

            if (!targetProductId) {
                // Fallback for Free plan or if mapping missing
                if (selectedPlan.monthlyPrice === "0") {
                    await enrollFree({ planId: selectedPlan.id, accountId }); // Use generic ID for free?
                    toast({
                        title: "Success",
                        description: "Activated free plan!"
                    });
                    await refreshSubscription();
                    return;
                }
                throw new Error(`Product ID not found for ${interval}ly plan`);
            }

            // Check if plan is free (double check price)
            const price = interval === 'year' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
            const isFree = price === "0";

            if (isFree) {
                await enrollFree({ planId: targetProductId, accountId });
                toast({
                    title: "Success",
                    description: "Activated free plan!"
                });
                // Refresh billing info via context
                await refreshSubscription();
                return;
            }

            const { url } = await createCheckout({
                planId: targetProductId, // Send specific product ID
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
            console.error("Checkout/Enrollment failed", error);

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
            <div className="container py-20 px-4 mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <Skeleton className="h-10 w-64 mx-auto" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (plans.length === 0) {
        // Fallback to showing config plans if API fails or returns empty? 
        // Or just show empty state.
        // Let's show empty state for now as per original code.
        return (
            <div className="container py-20 px-4 mx-auto text-center">
                <h3 className="text-xl font-semibold mb-2">No plans available</h3>
                <p className="text-muted-foreground">We could not load any plans at this time. Please check back later.</p>
            </div>
        );
    }

    return (
        <PricingRedesign
            plans={plans}
            currentPlanId={subscription?.planId}
            onPlanSelect={handlePlanSelect}
        />
    );
}