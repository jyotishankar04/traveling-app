import { Skeleton } from "@/components/ui/skeleton"

// Re-export the shared table and stats skeletons; ReviewCardSkeleton is
// owner-specific and stays here.
export { TableSkeleton, StatsSkeleton } from "@/components/custom/shared/StateViews"

export function ReviewCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div>
                <Skeleton className="mb-1 h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-3/4" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      ))}
    </div>
  )
}