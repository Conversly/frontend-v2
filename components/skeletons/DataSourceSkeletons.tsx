import { Skeleton } from '@/components/ui/skeleton';

/**
 * Category item skeleton for the sources sidebar
 * Shows icon + label + count
 */
function CategoryItemSkeleton() {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-5 w-6 rounded-full" />
    </div>
  );
}

/**
 * Data source category sidebar skeleton
 * Shows filter categories + pending sources section
 */
export function SourcesCategorySkeleton() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Add Knowledge Button */}
      <div className="p-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Categories List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-0.5">
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
        </div>
      </div>

      {/* Pending Sources Section */}
      <div className="border-t border-border p-4">
        <Skeleton className="mb-3 h-5 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Individual data source card skeleton
 * Matches DataSourceCard layout:
 * - Icon + name + citation
 * - Dropdown menu
 * - Footer with date + status badges
 */
export function DataSourceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
      {/* Header: Icon + Name + Dropdown */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="min-w-0 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Footer: Date + Status badges */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Full data sources page skeleton
 * Shows sidebar + main content with header and grid
 */
export function DataSourceSkeleton() {
  return (
    <div className="flex h-[calc(100vh-48px)] overflow-hidden bg-background">
      {/* Sidebar */}
      <SourcesCategorySkeleton />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DataSourceCardSkeleton />
            <DataSourceCardSkeleton />
            <DataSourceCardSkeleton />
            <DataSourceCardSkeleton />
            <DataSourceCardSkeleton />
            <DataSourceCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
