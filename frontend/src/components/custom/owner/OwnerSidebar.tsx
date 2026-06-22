import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, BarChart3, CalendarDays, Building2, BookOpen, MessageSquare,
  Wallet, Bell, Home, DoorOpen, Users2, Settings, HelpCircle, LogOut,
} from "lucide-react"
import { ownerHotels } from "@/data/owner/owner-hotels"

const sidebarSections = [
  {
    label: "Main",
    items: [
      { to: "/owner/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/owner/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/owner/calendar", icon: CalendarDays, label: "Calendar" },
      { to: "/owner/hotels", icon: Building2, label: "Hotels" },
      { to: "/owner/bookings", icon: BookOpen, label: "Bookings" },
      { to: "/owner/reviews", icon: MessageSquare, label: "Reviews" },
      { to: "/owner/payouts", icon: Wallet, label: "Payouts" },
      { to: "/owner/notifications", icon: Bell, label: "Notifications" },
    ],
  },
  {
    label: "Manage",
    items: [
      { to: "/owner/hotels", icon: Home, label: "Property" },
      { to: "/owner/hotels", icon: DoorOpen, label: "Rooms" },
      { to: "/owner/settings", icon: Users2, label: "Staff" },
      { to: "/owner/settings", icon: Settings, label: "Settings" },
    ],
  },
]

export function OwnerSidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation()

  return (
    <aside className="flex h-full w-64 flex-col bg-neutral-950 text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
          <Building2 className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Horizoné</p>
          <p className="text-[10px] text-white/50">Owner Portal</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {sidebarSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">{section.label}</p>
            {section.items.map((item) => {
              const active = location.pathname.startsWith(item.to)
              return (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  onClick={onClose}
                  className={cn(
                    "mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}

        <p className="px-5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Properties</p>
        {ownerHotels.filter(h => h.status === "active").slice(0, 4).map((hotel) => (
          <Link
            key={hotel.id}
            to={`/owner/hotels/${hotel.id}`}
            onClick={onClose}
            className={cn(
              "mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              location.pathname.includes(hotel.id)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="size-6 shrink-0 overflow-hidden rounded-md">
              <img src={hotel.image} alt={hotel.name} className="size-full object-cover" />
            </div>
            <span className="truncate">{hotel.name}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-white/10 p-3 space-y-1">
        <Link to="/help" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white">
          <HelpCircle className="size-4" />
          Help Center
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white">
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
