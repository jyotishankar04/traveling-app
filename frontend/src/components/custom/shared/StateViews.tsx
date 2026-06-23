import { type LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Shared loading and empty-state building blocks used by both the owner and
 * admin dashboards. The per-area files in `components/custom/owner` and
 * `components/custom/admin` re-export from here so there is one
 * implementation.
 */

export function TableSkeleton({
  rows = 5,
  columns = 5,
}: {
  rows?: number
  columns?: number
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex gap-6">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i === 0 ? "w-32" : "flex-1"}`} />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border px-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-6 py-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className={`h-4 ${colIndex === 0 ? "w-36" : colIndex === columns - 1 ? "w-20" : "flex-1"}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-white p-4 shadow-xs">
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
    </div>
  )
}

interface SharedEmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function SharedEmptyState({ icon: Icon, title, description, action }: SharedEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-14 text-center">
      <Icon className="size-10 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}