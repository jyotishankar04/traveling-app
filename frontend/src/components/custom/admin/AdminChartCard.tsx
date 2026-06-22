import type { ReactNode } from "react"

interface AdminChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
}

export function AdminChartCard({ title, subtitle, children, action }: AdminChartCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white">
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
