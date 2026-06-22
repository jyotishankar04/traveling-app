import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { User, Edit3, CalendarDays, Heart, MessageSquare, CreditCard, Settings, Bell, LogOut, HeadphonesIcon } from "lucide-react"

const links = [
  { to: "/profile", icon: User, label: "Profile", end: true },
  { to: "/profile/edit", icon: Edit3, label: "Edit Profile" },
  { to: "/profile/bookings", icon: CalendarDays, label: "Bookings" },
  { to: "/profile/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/profile/reviews", icon: MessageSquare, label: "Reviews" },
  { to: "/profile/payments", icon: CreditCard, label: "Payments" },
  { to: "/profile/settings", icon: Settings, label: "Settings" },
  { to: "/profile/notifications", icon: Bell, label: "Notifications" },
]

export function AccountSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <link.icon className="size-4" />
            {link.label}
          </NavLink>
        ))}
        <hr className="my-3 border-border" />
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <LogOut className="size-4" />
          Log Out
        </button>
      </nav>

      <div className="mt-8 rounded-2xl border border-border bg-neutral-900 p-4 text-center">
        <HeadphonesIcon className="mx-auto size-6 text-white/70" />
        <p className="mt-2 text-sm font-medium text-white">Need help?</p>
        <p className="mt-1 text-xs text-white/60">Contact Support</p>
        <button className="mt-3 rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/30">
          Get in touch
        </button>
      </div>
    </aside>
  )
}
