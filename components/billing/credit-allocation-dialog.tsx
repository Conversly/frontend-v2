"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { allocateChatbotCredit } from "@/lib/api/billing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";

interface CreditAllocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chatbotId: string;
    chatbotName: string;
    currentBalance: number;
    accountBalance: number;
}

export function CreditAllocationDialog({
    open,
    onOpenChange,
    chatbotId,
    chatbotName,
    currentBalance,
    accountBalance,
}: CreditAllocationDialogProps) {
    const [amount, setAmount] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (amountVal: number) => allocateChatbotCredit(chatbotId, amountVal),
        onSuccess: () => {
            // Invalidate billing dashboard and specific chatbot analytics
            queryClient.invalidateQueries({ queryKey: ["BILLING_DASHBOARD"] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOT, chatbotId] });
            toast.success(`Successfully allocated ₹${amount} to ${chatbotName}`);
            onOpenChange(false);
            setAmount("");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to allocate credits");
        },
    });

    const handleAllocate = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        if (val > accountBalance) {
            toast.error("Insufficient account balance");
            return;
        }
        mutation.mutate(val);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Allocate Credits</DialogTitle>
                    <DialogDescription>
                        Transfer credits from your main account to <strong>{chatbotName}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAllocate} className="space-y-6 py-2">
                    <div className="bg-secondary/30 p-4 rounded-lg flex justify-between items-center text-sm">
                        <div>
                            <span className="text-muted-foreground block">Main Account Balance</span>
                            <span className="font-semibold text-lg">₹{accountBalance.toLocaleString()}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <div className="text-right">
                            <span className="text-muted-foreground block">{chatbotName} Balance</span>
                            <span className="font-semibold text-lg">₹{currentBalance.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Allocate (₹)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            max={accountBalance}
                            disabled={mutation.isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Maximum allocatable: ₹{accountBalance.toLocaleString()}
                        </p>
                    </div>

                    <DialogFooter className="sm:justify-end">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending || !amount || parseFloat(amount) <= 0}>
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Allocating...
                                </>
                            ) : (
                                "Allocate Credits"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
