import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

/**
 * Skeleton for a settings form section/card
 */
function SettingsCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-6">
      {/* Card Header */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <Separator />
      
      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-48" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for settings page header
 */
function SettingsHeaderSkeleton({ showTabs = true }: { showTabs?: boolean }) {
  return (
    <div className="space-y-4">
      <div className="page-header">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      
      {showTabs && (
        <div className="flex gap-2 bg-muted/50 h-10 p-1 rounded-md w-fit">
          <Skeleton className="h-8 w-20 rounded-sm" />
          <Skeleton className="h-8 w-24 rounded-sm" />
          <Skeleton className="h-8 w-20 rounded-sm" />
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton for the customize page
 */
export function CustomizeSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <SettingsHeaderSkeleton />
      
      <Separator />
      
      {/* Sidebar layout: Settings nav + Content */}
      <div className="flex gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="w-64 shrink-0 space-y-1">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 max-w-3xl space-y-6">
          <SettingsCardSkeleton />
          <SettingsCardSkeleton />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for the behavior page
 */
export function BehaviorSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <SettingsHeaderSkeleton />
      
      <Separator />
      
      {/* Behavior-specific cards */}
      <div className="max-w-4xl space-y-6">
        {/* Behavior Settings Card */}
        <SettingsCardSkeleton />
        
        {/* Advanced Options Card */}
        <div className="rounded-lg border bg-card p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-72" />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Generic settings page skeleton
 * Used for both customize and behavior pages
 */
export function SettingsPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <SettingsHeaderSkeleton />
      
      <Separator />
      
      <div className="max-w-4xl space-y-6">
        <SettingsCardSkeleton />
        <SettingsCardSkeleton />
        <SettingsCardSkeleton />
      </div>
    </div>
  );
}
