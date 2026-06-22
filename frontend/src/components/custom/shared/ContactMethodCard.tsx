import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ContactMethodCardProps {
  icon: ReactNode
  title: string
  description: string
  cta: string
  onClick?: () => void
}

export function ContactMethodCard({ icon, title, description, cta }: ContactMethodCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-md">
      <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Button variant="ghost" className="mt-4 rounded-full px-0 text-sm font-medium text-foreground">
        {cta}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
