import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

/**
 * Skeleton for the inbox page loading state
 * Matches the two-column layout with inbox sidebar and chat area
 */
export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left: Inbox Sidebar */}
      <div className="w-80 border-r bg-background flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>

          {/* Search */}
          <Skeleton className="h-8 w-full" />

          {/* Tabs */}
          <div className="flex gap-1 bg-muted/50 h-7 p-0.5 rounded-md">
            <Skeleton className="h-6 flex-1 rounded-sm" />
            <Skeleton className="h-6 flex-1 rounded-sm" />
            <Skeleton className="h-6 flex-1 rounded-sm" />
          </div>

          {/* Status row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>

        {/* Inbox List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background p-4 overflow-hidden">
        <div className="bg-card flex-1 flex flex-col rounded-xl border shadow-sm overflow-hidden ring-1 ring-black/5">
          {/* Header */}
          <div className="border-b bg-card px-6 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden flex min-w-0 bg-card">
            <ScrollArea className="h-full flex-1">
              <div className="p-6 space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <Skeleton
                      className={`h-16 rounded-2xl ${
                        i % 2 === 0 ? 'w-96 rounded-tl-sm' : 'w-80 rounded-tr-sm'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="border-t bg-card px-6 py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-7 w-16" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Skeleton className="h-20 w-full rounded-md" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
