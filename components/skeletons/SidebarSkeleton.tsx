import { Skeleton } from '@/components/ui/skeleton';

/**
 * Navigation item skeleton for sidebar
 * Shows icon + label with optional chevron
 */
function NavItemSkeleton({ hasChildren = false }: { hasChildren?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-28" />
      </div>
      {hasChildren && <Skeleton className="h-4 w-4 rounded" />}
    </div>
  );
}

/**
 * Sidebar skeleton for dashboard navigation
 * Includes workspace header, main nav items, and chatbot section
 */
export function SidebarSkeleton() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar">
      {/* Workspace Header */}
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-5 flex-1" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto p-2">
        {/* Primary Nav Items */}
        <div className="mb-4 space-y-0.5">
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-sidebar-border" />

        {/* Chatbots Section */}
        <div className="mb-2 px-3">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-0.5">
          <NavItemSkeleton hasChildren />
          <NavItemSkeleton hasChildren />
          <NavItemSkeleton hasChildren />
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-sidebar-border" />

        {/* Secondary Nav Items */}
        <div className="space-y-0.5">
          <NavItemSkeleton />
          <NavItemSkeleton />
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
