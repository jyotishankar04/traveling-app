import { Link } from "react-router"

import type { LucideIcon } from "lucide-react"
import {
  UserPlus,
  Search,
  Star,
  CalendarCheck,
  Edit,
  MessageSquare,
  CreditCard,
  DollarSign,
  RefreshCw,
  Settings,
  KeyRound,
  XCircle,
  Building2,
  Hotel,
  Shield,
  LogOut,
  Mail,
  Phone,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const iconMap: Record<string, LucideIcon> = {
  UserPlus,
  Search,
  Star,
  CalendarCheck,
  Edit,
  MessageSquare,
  CreditCard,
  DollarSign,
  RefreshCw,
  Settings,
  KeyRound,
  XCircle,
  Building2,
  Hotel,
  Shield,
  LogOut,
  Mail,
  Phone,
}

interface HelpCardProps {
  icon: string
  title: string
  description: string
  slug: string
}

export function HelpCard({ icon, title, description, slug }: HelpCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <Link to={`/help/${slug}`}>
      <Card className="rounded-2xl border border-border bg-white p-5 transition hover:shadow-md">
        <CardContent className="flex items-start gap-4 p-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
            {IconComponent && <IconComponent className="size-5 text-neutral-700" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
