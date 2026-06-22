import { ShieldCheck, RotateCcw, HeadphonesIcon, Users } from "lucide-react"

const items = [
  { icon: ShieldCheck, label: "Best Price Guarantee" },
  { icon: RotateCcw, label: "Free Cancellation" },
  { icon: HeadphonesIcon, label: "24/7 Customer Support" },
  { icon: Users, label: "Trusted by Millions" },
]

export function TrustStrip() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <item.icon className="size-3.5" />
          {item.label}
        </div>
      ))}
    </div>
  )
}
