import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, BarChart3, ThumbsUp, Users } from "lucide-react";

interface SummaryCardsProps {
  summaryData?: {
    totalMessagesThisMonth?: number;
    avgMessagesPerConversation?: number;
    likeRatePercent?: number;
    activeConversationsToday?: number;
  };
  isLoading: boolean;
}

export function SummaryCards({ summaryData, isLoading }: SummaryCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Messages This Month</p>
            {isLoading ? (
              <Skeleton className="h-6 w-12 mt-1.5" />
            ) : (
              <div className="text-xl font-bold mt-1">{summaryData?.totalMessagesThisMonth?.toLocaleString() || 0}</div>
            )}
          </div>
          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Avg. Messages per Conversation</p>
            {isLoading ? (
              <Skeleton className="h-6 w-12 mt-1.5" />
            ) : (
              <div className="text-xl font-bold mt-1">{summaryData?.avgMessagesPerConversation?.toFixed(1) || '0.0'}</div>
            )}
          </div>
          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Like Rate (%)</p>
            {isLoading ? (
              <Skeleton className="h-6 w-12 mt-1.5" />
            ) : (
              <div className="text-xl font-bold mt-1">{summaryData?.likeRatePercent?.toFixed(1) || '0.0'}%</div>
            )}
          </div>
          <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Conversations Today</p>
            {isLoading ? (
              <Skeleton className="h-6 w-12 mt-1.5" />
            ) : (
              <div className="text-xl font-bold mt-1">{summaryData?.activeConversationsToday || 0}</div>
            )}
          </div>
          <Users className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </div>
      </Card>
    </div>
  );
}

