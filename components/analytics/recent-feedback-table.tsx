import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import type { FeedbackItem } from "@/types/analytics";

interface RecentFeedbackTableProps {
  feedbacksData?: FeedbackItem[];
  isLoading: boolean;
  formatFeedbackDate: (date: Date | string) => string;
}

export function RecentFeedbackTable({
  feedbacksData,
  isLoading,
  formatFeedbackDate,
}: RecentFeedbackTableProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center mb-3">
        <MessageSquare className="h-4 w-4 mr-2" />
        <h3 className="text-base font-semibold">Recent Feedback</h3>
      </div>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-xs font-medium">Content</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Feedback</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Comment</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacksData && feedbacksData.length > 0 ? (
                feedbacksData.map((feedback, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-3 max-w-xs truncate text-sm" title={feedback.content}>
                      {feedback.content}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          feedback.feedback === 'like'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {feedback.feedback === 'like' ? '👍 Like' : '👎 Dislike'}
                      </span>
                    </td>
                    <td className="py-2 px-3 max-w-xs truncate text-sm" title={feedback.feedbackComment ?? 'No comment'}>
                      {feedback.feedbackComment ?? 'No comment'}
                    </td>
                    <td className="py-2 px-3 text-xs text-muted-foreground">
                      {formatFeedbackDate(feedback.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-muted-foreground">
                    No feedback data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

