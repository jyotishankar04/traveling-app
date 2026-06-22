import type { ReactNode } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AdminStatCardProps {
  label: string
  value: string
  change?: string
  changePositive?: boolean
  icon?: ReactNode
}

export function AdminStatCard({ label, value, change, changePositive, icon }: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon && (
          <div className="flex size-9 items-center justify-center rounded-xl bg-neutral-50 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          {changePositive ? (
            <TrendingUp className="size-3.5 text-emerald-600" />
          ) : (
            <TrendingDown className="size-3.5 text-red-500" />
          )}
          <span className={`text-xs font-medium ${changePositive ? "text-emerald-600" : "text-red-500"}`}>
            {change}
          </span>
        </div>
      )}
    </div>
  )
}
