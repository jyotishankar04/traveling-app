import type { ReactNode } from "react"

interface OwnerPageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function OwnerPageHeader({ title, subtitle, children }: OwnerPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  )
}
