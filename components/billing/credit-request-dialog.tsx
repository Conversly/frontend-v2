"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { createCreditRequest } from "@/lib/api/billing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";

interface CreditRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chatbotId: string;
    chatbotName: string;
}

export function CreditRequestDialog({
    open,
    onOpenChange,
    chatbotId,
    chatbotName,
}: CreditRequestDialogProps) {
    const [amount, setAmount] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: {
            chatbotId: string;
            amount: number;
            reason?: string;
        }) => createCreditRequest(payload),
        onSuccess: () => {
            // Invalidate credit requests list
            queryClient.invalidateQueries({ queryKey: ["CREDIT_REQUESTS"] });
            toast.success(`Credit request for ₹${amount} submitted successfully. Waiting for owner approval.`);
            onOpenChange(false);
            // Reset form
            setAmount("");
            setReason("");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create credit request");
        },
    });

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        mutation.mutate({
            chatbotId,
            amount: val,
            reason: reason.trim() || undefined,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Request Credits
                    </DialogTitle>
                    <DialogDescription>
                        Request credits for <strong>{chatbotName}</strong>. The workspace owner will review and approve your request.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleRequest} className="space-y-6 py-2">
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Chatbot</div>
                        <div className="text-lg font-semibold">{chatbotName}</div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount Requested (₹) *</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            step="0.01"
                            required
                            disabled={mutation.isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter the amount of credits you need
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason (Optional)</Label>
                        <Textarea
                            id="reason"
                            placeholder="Explain why you need these credits..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={4}
                            disabled={mutation.isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Providing a reason helps the owner make a decision
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
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

