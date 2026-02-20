"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, BarChart3, ThumbsUp, Clock } from "lucide-react";
import { useSubscription } from "@/contexts/subscription-context";

interface SummaryCardsProps {
  summaryData?: {
    totalMessagesThisMonth?: number;
    avgMessagesPerConversation?: number;
    likeRatePercent?: number;
    avgConversationSessionSec?: number;
  };
  isLoading: boolean;
}

export function SummaryCards({ summaryData, isLoading }: SummaryCardsProps) {
  const { usage, credits, isLoading: isSubscriptionLoading } = useSubscription();

  const messagesUsed = usage?.messagesSent || 0;
  const creditsBalance = credits?.balance || 0;
  // If plan limit isn't explicitly provided, we can assume total available is used + balance
  const totalLimit = messagesUsed + creditsBalance;
  const usagePercentage = totalLimit > 0 ? Math.min(Math.round((messagesUsed / totalLimit) * 100), 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Messages Used</p>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isSubscriptionLoading ? (
            <Skeleton className="h-8 w-20 mt-1" />
          ) : (
            <>
              <div className="text-2xl font-bold">{messagesUsed.toLocaleString()}</div>
              {totalLimit > 0 && (
                <div className="text-sm font-medium text-muted-foreground">
                  / {totalLimit.toLocaleString()}
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Avg. Messages / Conv.</p>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <div className="text-2xl font-bold">{summaryData?.avgMessagesPerConversation?.toFixed(1) || '0.0'}</div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Per active conversation</p>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Like Rate</p>
          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <div className="text-2xl font-bold">{summaryData?.likeRatePercent?.toFixed(1) || '0.0'}%</div>
          )}
        </div>
        <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${summaryData?.likeRatePercent || 0}%` }} />
        </div>
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Avg. Session Duration</p>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <div className="text-2xl font-bold">
              {((summaryData?.avgConversationSessionSec ?? 0) / 60).toFixed(1)} min
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Average per conversation</p>
      </Card>
    </div>
  );
}

