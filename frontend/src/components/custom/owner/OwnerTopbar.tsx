import { Link } from "react-router"
import { Search, Bell, Globe, ChevronDown, Menu } from "lucide-react"
import { ownerUser } from "@/data/owner/owner"
import { ownerHotels } from "@/data/owner/owner-hotels"
import { ownerNotifications } from "@/data/owner/owner-notifications"

interface OwnerTopbarProps {
  onMenuToggle: () => void
}

export function OwnerTopbar({ onMenuToggle }: OwnerTopbarProps) {
  const unreadCount = ownerNotifications.filter((n) => n.unread).length

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden">
          <Menu className="size-5 text-muted-foreground" />
        </button>

        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search bookings, guests, hotels..."
            className="h-9 w-64 rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select className="hidden h-9 rounded-xl border border-input bg-background px-3 text-sm outline-none md:block">
          {ownerHotels.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        <button className="relative flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted">
          <Globe className="size-4" />
        </button>

        <Link to="/owner/notifications" className="relative flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2 rounded-xl border border-border p-1.5 pr-3">
          <img
            src={ownerUser.avatar}
            alt={ownerUser.name}
            className="size-7 rounded-lg object-cover"
          />
          <div className="hidden text-right text-xs leading-tight sm:block">
            <p className="font-medium text-foreground">{ownerUser.name}</p>
            <p className="text-[10px] text-muted-foreground">{ownerUser.role}</p>
          </div>
          <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
        </div>
      </div>
    </header>
  )
}
