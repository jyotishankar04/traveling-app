import { ChevronRight } from "lucide-react"
import { Link } from "react-router"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  viewAllLink?: string
  viewAllText?: string
}

export function SectionHeader({ title, subtitle, viewAllLink, viewAllText = "View all" }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground transition hover:text-muted-foreground sm:flex"
        >
          {viewAllText}
          <ChevronRight className="size-4" />
        </Link>
      )}
    </div>
  )
}
