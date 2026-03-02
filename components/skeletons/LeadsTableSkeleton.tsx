import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

/**
 * Skeleton row for the leads table
 * Matches columns: Contact Info, Communication, Source, Created At, Actions
 */
function LeadRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
    </TableRow>
  );
}

/**
 * Skeleton for the leads table header section with filters
 */
export function LeadsHeaderSkeleton() {
  return (
    <div className="border-b bg-background px-6 py-4 space-y-4">
      <div>
        <Skeleton className="h-7 w-24 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {/* Search */}
        <div className="w-full md:w-64 space-y-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

        {/* Source Filter */}
        <div className="w-full md:w-40 space-y-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        {/* Topic Filter */}
        <div className="w-full md:w-40 space-y-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-9 w-36" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Full skeleton for the leads table
 * Includes header and multiple skeleton rows
 */
export function LeadsTableSkeleton() {
  return (
    <div className="flex h-full flex-col bg-background">
      <LeadsHeaderSkeleton />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Info</TableHead>
                <TableHead>Communication</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, i) => (
                <LeadRowSkeleton key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

/**
 * Full page skeleton for the leads page
 * Used in loading.tsx
 */
export function LeadsPageSkeleton() {
  return <LeadsTableSkeleton />;
}
