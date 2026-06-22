import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface PriceCardProps {
  price: number
  currency: string
  label?: string
  ctaText?: string
  onCtaClick?: () => void
  children?: React.ReactNode
}

export function PriceCard({
  price,
  currency,
  label = "per night",
  ctaText = "Check availability",
  children,
}: PriceCardProps) {
  return (
    <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-lg">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground">
          {currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$"}
          {price}
        </span>
        <span className="text-sm text-muted-foreground">/{label}</span>
      </div>

      {children}

      <Button className="mt-4 h-12 w-full rounded-xl text-sm font-semibold">
        {ctaText}
      </Button>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-green-600" />
          Free cancellation
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-green-600" />
          No prepayment needed
        </div>
      </div>
    </div>
  )
}
