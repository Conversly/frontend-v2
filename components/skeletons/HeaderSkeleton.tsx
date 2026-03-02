import { Skeleton } from '@/components/ui/skeleton';

/**
 * Breadcrumb item skeleton
 * Shows text with optional separator after it
 */
function BreadcrumbSkeleton({ isLast = false }: { isLast?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-20" />
      {!isLast && <Skeleton className="h-4 w-4" />}
    </div>
  );
}

/**
 * Dashboard header skeleton
 * Matches layout of DashboardHeader component:
 * - Sidebar trigger button (left)
 * - Breadcrumbs (center-left)
 * - Workspace/Branch switcher (right)
 */
export function HeaderSkeleton() {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b bg-sidebar px-4">
      {/* Left side: Trigger + Breadcrumbs */}
      <div className="flex items-center gap-2">
        {/* Sidebar trigger placeholder */}
        <Skeleton className="h-8 w-8" />

        {/* Vertical separator */}
        <div className="mx-2 h-4 w-px bg-sidebar-border" />

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2">
          <BreadcrumbSkeleton />
          <BreadcrumbSkeleton />
          <BreadcrumbSkeleton isLast />
        </div>
      </div>

      {/* Right side: Switcher */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-56 rounded-md" />
      </div>
    </div>
  );
}
