import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  BookOpen,
  MessageSquare,
  Tag,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"

const sidebarSections = [
  {
    label: "Overview",
    items: [{ to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    label: "Management",
    items: [
      { to: "/admin/users", icon: Users, label: "Users" },
      { to: "/admin/owners", icon: UserCheck, label: "Owners" },
      { to: "/admin/hotels", icon: Building2, label: "Hotels" },
      { to: "/admin/bookings", icon: BookOpen, label: "Bookings" },
      { to: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/offers", icon: Tag, label: "Offers" },
      { to: "/admin/destinations", icon: MapPin, label: "Destinations" },
    ],
  },
  {
    label: "System",
    items: [{ to: "/admin/settings", icon: Settings, label: "Settings" }],
  },
]

const bottomItems = [
  { to: "/help", icon: HelpCircle, label: "Help Center" },
]

function AdminSidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/"
    }
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
          <Building2 className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">HORIZONÉ</p>
          <p className="text-[10px] text-white/50">Admin</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {sidebarSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              {section.label}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive(item.to)
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              isActive(item.to)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </>
  )
}

export function AdminSidebar() {
  return (
    <>
      <SheetTrigger
        className="fixed top-4 left-4 z-50 lg:hidden"
        render={<Button variant="outline" size="icon" />}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-neutral-950 text-white lg:flex">
        <AdminSidebarContent />
      </aside>
    </>
  )
}

export { AdminSidebarContent }
