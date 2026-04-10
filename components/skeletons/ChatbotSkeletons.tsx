import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

/**
 * Individual chatbot card skeleton
 * Matches the layout of ChatbotPreviewCard with:
 * - Large visual hero area with centered logo
 * - Assistant name
 * - Compact detail rows
 * - Action buttons
 */
export function ChatbotCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--panel-radius-lg)] border border-border bg-card">
      <div className="flex h-52 items-center justify-center border-b border-border/60 px-6 py-8">
        <Skeleton className="h-40 w-40 rounded-[40px]" />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="space-y-4">
          <Skeleton className="h-6 w-2/3" />

          <div className="space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-10" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full page skeleton for the chatbot list page
 * Includes:
 * - Page header with title + create button
 * - Grid of chatbot card skeletons (responsive: 1/2/3 columns)
 */
export function ChatbotListSkeleton() {
  return (
    <div className="w-full justify-center p-6">
      <div className="container max-w-7xl px-0 md:px-0 lg:px-0">
        {/* Page Header */}
        <div className="page-header">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Chatbot Grid - Responsive columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ChatbotCardSkeleton />
          <ChatbotCardSkeleton />
          <ChatbotCardSkeleton />
          <ChatbotCardSkeleton />
          <ChatbotCardSkeleton />
          <ChatbotCardSkeleton />
        </div>
      </div>
    </div>
  );
}
