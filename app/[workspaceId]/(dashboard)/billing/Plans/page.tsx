
"use client";

import React, { useEffect, useState } from "react";
import { PricingRedesign } from "@/components/billingsdk/pricing-redesign";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/contexts/workspace-context";
import { Plan, plans as planConfig } from "@/lib/billingsdk-config";
import { getWorkspaceBilling, BillingInfo } from "@/lib/api/workspaces";

import { useCheckout, usePlans, useEnrollFree } from "@/hooks/use-dodo";

export default function PlansPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
    const { toast } = useToast();
    const { workspaceId } = React.use(params);
    const { accountId } = useWorkspace();
    const { mutateAsync: createCheckout } = useCheckout();
    const { data: fetchedPlans, isLoading: initialLoading } = usePlans();
    const { mutateAsync: enrollFree } = useEnrollFree();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const loading = initialLoading || checkoutLoading;

    useEffect(() => {
        if (workspaceId) {
            getWorkspaceBilling(workspaceId).then(setBillingInfo).catch(console.error);
        }
    }, [workspaceId]);

    useEffect(() => {
        if (!fetchedPlans) return;

        const processPlans = () => {
            // Map backend plan data to Plan interface, merging with local config
            const mappedPlans = fetchedPlans.map((p: any) => {
                // Try to find matching config by ID or Name
                const config = planConfig.find(
                    (c) => c.id === p.id || c.title.toLowerCase() === p.name.toLowerCase()
                );

                // If prices array is empty or undefined, handle gracefully
                const prices = p.prices || [];
                const yearly = prices.find((pr: any) => pr.interval === 'year');

                // Fix: Use monthlyPriceCents from the plan object if valid, otherwise fallback to config
                const priceFromBackend = p.monthlyPriceCents !== undefined ? p.monthlyPriceCents / 100 : undefined;

                const monthlyPrice = priceFromBackend !== undefined
                    ? String(priceFromBackend)
                    : (config?.monthlyPrice || "0");

                const yearlyPrice = yearly ? String(yearly.amount / 100) : (config?.yearlyPrice || "0");

                // Base plan object from config or default
                const basePlan = config || {
                    id: p.id,
                    title: p.name,
                    description: p.description || "Unlock powerful features",
                    buttonText: "Get Started",
                    features: [
                        { name: `${p.creditsPerCycle} Credits per cycle`, icon: "check" }
                    ],
                    highlight: false
                };

                return {
                    ...basePlan,
                    id: p.id, // Ensure we use backend ID for checkout
                    title: p.name, // Use backend name
                    monthlyPrice,
                    yearlyPrice,
                    // Ensure features are preserved from config
                    features: basePlan.features,
                    highlight: basePlan.highlight || p.name.toLowerCase().includes('growth'),
                } as Plan;
            });

            // Sort plans to match config order if possible
            const sortedPlans = mappedPlans.sort((a: Plan, b: Plan) => {
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

            // Check if plan is free
            const selectedPlan = plans.find(p => p.id === planId);
            const isFree = selectedPlan?.monthlyPrice === "0";

            if (isFree) {
                await enrollFree({ planId, accountId });
                toast({
                    title: "Success",
                    description: "Activated free plan!"
                });
                // Refresh billing info
                if (workspaceId) {
                    getWorkspaceBilling(workspaceId).then(setBillingInfo).catch(console.error);
                }
                return;
            }

            const { url } = await createCheckout({
                planId,
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

            // Handle specific error for downgrading to free plan while active on paid
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

    if (loading && !billingInfo) {
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
            currentPlanId={billingInfo?.subscription?.planId}
            onPlanSelect={handlePlanSelect}
        />
    );

}
