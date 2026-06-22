import type { ReactNode } from "react"

interface AmenityIconProps {
  name: string
  icon?: ReactNode
  className?: string
}

export function AmenityChip({ name, icon, className = "" }: AmenityIconProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground ${className}`}>
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {name}
    </span>
  )
}
