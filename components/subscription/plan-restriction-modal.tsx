"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Rocket, Crown, Zap, Building2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanRestrictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
  code?: string;
  planName?: string;
}

const TIER_ICONS: Record<string, React.ReactNode> = {
  FREE: <Sparkles className="w-5 h-5" />,
  PERSONAL: <Zap className="w-5 h-5" />,
  PRO: <Crown className="w-5 h-5" />,
  ENTERPRISE: <Building2 className="w-5 h-5" />,
};

export function PlanRestrictionModal({ 
  open, 
  onOpenChange, 
  message = "You've reached your plan limit. Please upgrade to continue.",
  code,
  planName 
}: PlanRestrictionModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    onOpenChange(false);
    router.push("/plans");
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">Plan Limit Reached</DialogTitle>
              <DialogDescription className="mt-1">
                {planName ? `Your ${planName} plan has reached its limit.` : "Your current plan has reached its limit."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">
              What's happening?
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              {message}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Upgrade to unlock:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                More chatbots and resources
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Advanced features and integrations
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Priority support
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Maybe Later
          </Button>
          <Button onClick={handleUpgrade} className="bg-primary hover:bg-primary/90">
            <Rocket className="mr-2 h-4 w-4" />
            View Plans & Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

