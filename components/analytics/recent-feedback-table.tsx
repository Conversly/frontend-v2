import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import type { FeedbackItem } from "@/types/analytics";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {feedbacksData && feedbacksData.length > 0 ? (
                feedbacksData.map((feedback, index) => (
                  <TableRow key={index}>
                    <TableCell className="max-w-xs truncate text-sm" title={feedback.content}>
                      {feedback.content}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          feedback.feedback === 'like'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {feedback.feedback === 'like' ? '👍 Like' : '👎 Dislike'}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm" title={feedback.feedbackComment ?? 'No comment'}>
                      {feedback.feedbackComment ?? 'No comment'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatFeedbackDate(feedback.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-6 text-center text-sm text-muted-foreground">
                    No feedback data available
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
