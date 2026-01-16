import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "@/lib/api/subscription";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: SubscriptionPlan | null;
    billingPeriod: "monthly" | "annual";
}

export function UpgradeModal({ open, onOpenChange, plan, billingPeriod }: UpgradeModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        if (!plan) return;

        setIsLoading(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success(`Successfully upgraded to ${plan.planName} (${billingPeriod})`);
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to upgrade plan");
        } finally {
            setIsLoading(false);
        }
    };

    if (!plan) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm Upgrade</DialogTitle>
                    <DialogDescription>
                        You are upgrading to the <span className="font-semibold text-foreground">{plan.planName}</span> plan.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="font-medium">{plan.planName}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-muted-foreground">Billing Period</span>
                        <span className="font-medium capitalize">{billingPeriod}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">
                            ${billingPeriod === "monthly" ? plan.priceMonthly : plan.priceAnnually}
                            <span className="text-sm font-normal text-muted-foreground">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                        </span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpgrade} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Confirm Upgrade"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
