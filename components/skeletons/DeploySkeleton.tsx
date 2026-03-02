import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

/**
 * Skeleton for the deploy live page
 * Matches the layout with status cards and deployment visualization
 */
export function DeploySkeleton() {
  return (
    <div className="p-6 h-full w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column - Deploy Visual */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-border/60 shadow-md h-[calc(100vh-180px)] min-h-[600px]">
            <CardContent className="p-0 h-full">
              {/* DeployVisual placeholder */}
              <div className="h-full flex flex-col">
                {/* Top section - Dev environment */}
                <div className="flex-1 bg-muted/20 p-8 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                  </div>
                </div>

                {/* Middle section - Connection */}
                <div className="h-16 bg-muted/10 flex items-center justify-center">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-1 w-32" />
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-1 w-32" />
                  </div>
                </div>

                {/* Bottom section - Live environment */}
                <div className="flex-1 bg-muted/20 p-8 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-40 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Column */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="bg-muted/30 border-border shadow-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </div>
              </div>
              <div className="pt-2 border-t border-border space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Push Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="pb-4 space-y-3">
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>

          {/* Rollback Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="pb-4">
              <Skeleton className="h-16 w-full rounded-lg" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
