"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, Check, X } from "lucide-react";
import { SubscriptionPlan } from "@/lib/api/subscription";
import { purchasePlan, CardDetails } from "@/lib/api/subscription";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/query-key";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan | null;
  billingPeriod: 'monthly' | 'annual';
}

export function UpgradeModal({ open, onOpenChange, plan, billingPeriod }: UpgradeModalProps) {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  if (!plan) return null;

  const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnually;
  const currency = plan.currency || 'USD';

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'month' | 'year') => {
    let value = e.target.value.replace(/\D/g, '');
    if (type === 'month') {
      value = value.slice(0, 2);
      if (value && parseInt(value) > 12) value = '12';
    } else {
      value = value.slice(0, 4);
    }
    setCardDetails({
      ...cardDetails,
      [`expiry${type.charAt(0).toUpperCase() + type.slice(1)}` as 'expiryMonth' | 'expiryYear']: value,
    });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails({ ...cardDetails, cvv: value });
  };

  const isFormValid = () => {
    return (
      cardDetails.cardNumber.replace(/\s/g, '').length >= 13 &&
      cardDetails.expiryMonth.length === 2 &&
      cardDetails.expiryYear.length === 4 &&
      cardDetails.cvv.length >= 3 &&
      cardDetails.cardholderName.trim().length > 0
    );
  };

  const handlePurchase = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in all card details correctly');
      return;
    }

    setIsProcessing(true);
    try {
      await purchasePlan(plan.planId, billingPeriod, cardDetails);
      toast.success('Plan purchased successfully! Your subscription is now active.');
      
      // Invalidate subscription queries to refresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SUBSCRIPTION_PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ENTITLEMENTS] });
      
      onOpenChange(false);
      
      // Reset form
      setCardDetails({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade to {plan.planName}</DialogTitle>
          <DialogDescription>
            Complete your purchase to unlock all features of the {plan.planName} plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Plan Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{plan.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing Period</span>
                <span className="font-medium capitalize">{billingPeriod}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>{currency} {price}</span>
              </div>
            </CardContent>
          </Card>

          {/* Card Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Enter your card information to complete the purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cardholder Name */}
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                  disabled={isProcessing}
                />
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  disabled={isProcessing}
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Input
                    id="expiryMonth"
                    placeholder="MM"
                    value={cardDetails.expiryMonth}
                    onChange={(e) => handleExpiryChange(e, 'month')}
                    maxLength={2}
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Year</Label>
                  <Input
                    id="expiryYear"
                    placeholder="YYYY"
                    value={cardDetails.expiryYear}
                    onChange={(e) => handleExpiryChange(e, 'year')}
                    maxLength={4}
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={handleCvvChange}
                    maxLength={4}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                <p className="font-medium mb-1">🔒 Secure Payment</p>
                <p>Your payment information is encrypted and secure. This is a simulated payment for testing purposes.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={!isFormValid() || isProcessing}
            className="min-w-[120px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Purchase {currency} {price}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

