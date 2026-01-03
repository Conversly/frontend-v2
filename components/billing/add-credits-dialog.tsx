"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { addCreditsToAccount } from "@/lib/api/billing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";

interface AddCreditsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentBalance: number;
}

export function AddCreditsDialog({
    open,
    onOpenChange,
    currentBalance,
}: AddCreditsDialogProps) {
    const [amount, setAmount] = useState<string>("");
    const [referenceType, setReferenceType] = useState<string>("");
    const [referenceId, setReferenceId] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: {
            amount: number;
            referenceType?: string;
            referenceId?: string;
            metadata?: Record<string, unknown>;
        }) => addCreditsToAccount(payload),
        onSuccess: (data) => {
            // Invalidate billing queries
            queryClient.invalidateQueries({ queryKey: ["BILLING_DASHBOARD"] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BILLING_OVERVIEW] });
            toast.success(`Successfully added ₹${amount} credits. New balance: ₹${data.newBalance.toLocaleString()}`);
            onOpenChange(false);
            // Reset form
            setAmount("");
            setReferenceType("");
            setReferenceId("");
            setNotes("");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to add credits");
        },
    });

    const handleAddCredits = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        const payload: {
            amount: number;
            referenceType?: string;
            referenceId?: string;
            metadata?: Record<string, unknown>;
        } = {
            amount: val,
        };

        if (referenceType) {
            payload.referenceType = referenceType;
        }
        if (referenceId) {
            payload.referenceId = referenceId;
        }
        if (notes) {
            payload.metadata = { notes };
        }

        mutation.mutate(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" />
                        Add Credits to Workspace
                    </DialogTitle>
                    <DialogDescription>
                        Add credits directly to your workspace account. This will increase your available balance.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddCredits} className="space-y-6 py-2">
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Current Balance</div>
                        <div className="text-2xl font-bold">₹{currentBalance.toLocaleString()}</div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Add (₹) *</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="e.g. 1000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            step="0.01"
                            required
                            disabled={mutation.isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter the amount of credits to add to your workspace
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="referenceType">Reference Type (Optional)</Label>
                        <Input
                            id="referenceType"
                            type="text"
                            placeholder="e.g. manual_topup, payment, refund"
                            value={referenceType}
                            onChange={(e) => setReferenceType(e.target.value)}
                            disabled={mutation.isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="referenceId">Reference ID (Optional)</Label>
                        <Input
                            id="referenceId"
                            type="text"
                            placeholder="e.g. payment_12345"
                            value={referenceId}
                            onChange={(e) => setReferenceId(e.target.value)}
                            disabled={mutation.isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any notes about this credit addition..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            disabled={mutation.isPending}
                        />
                    </div>

                    <DialogFooter className="sm:justify-end">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending || !amount || parseFloat(amount) <= 0}>
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                "Add Credits"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

