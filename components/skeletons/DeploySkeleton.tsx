import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export function DeploySkeleton() {
  return (
    <div className="dashboard-page px-4 py-4 md:px-6 md:py-6">
      {/* Header */}
      <div className="page-header">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-80 mt-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Environment Comparison Card */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-64 mt-1" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-5" />
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Status Banner */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Actions Column */}
        <div className="space-y-4">
          {/* Release Status Card */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-8" />
              </div>
            </CardContent>
          </Card>

          {/* Push Card */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-44" />
            </CardHeader>
            <CardContent className="pb-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>

          {/* Reset Card */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-4 w-44" />
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
