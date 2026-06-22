import type { ReactNode } from "react"

interface OwnerChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export function OwnerChartCard({ title, subtitle, children, action, className }: OwnerChartCardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-white ${className || ""}`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
