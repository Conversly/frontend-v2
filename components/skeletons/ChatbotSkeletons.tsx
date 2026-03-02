import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

/**
 * Individual chatbot card skeleton
 * Matches the layout of ChatbotPreviewCard with:
 * - Gradient header area (100px height)
 * - Avatar icon that straddles header/body (-mt-7)
 * - Name + creation time
 * - Metrics row (Conversations, Version, Deployed)
 * - Action buttons (Manage + dropdown)
 */
export function ChatbotCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      {/* Gradient Header Area */}
      <Skeleton className="h-[100px] w-full rounded-none" />

      {/* Card Body */}
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
        {/* Avatar Icon (straddles header/body) */}
        <Skeleton className="-mt-7 mb-3 h-14 w-14 rounded-lg ring-[3px] ring-card" />

        {/* Title + Subtitle */}
        <div className="mb-4 space-y-1.5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Metrics Row */}
        <div className="mb-5 flex items-start gap-5 border-t border-border pt-3">
          {/* Conversations */}
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-3.5 rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          {/* Version */}
          <div className="space-y-1">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
          {/* Deployed (optional - smaller) */}
          <div className="ml-auto space-y-1 text-right">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
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
