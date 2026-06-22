import { Link } from "react-router"
import { Bell, CheckCircle2, X } from "lucide-react"
import { notifications } from "@/data/notifications"

const typeIcons: Record<string, any> = {
  booking: CheckCircle2,
  offer: Bell,
  reminder: Bell,
  payment: CheckCircle2,
}

const typeColors: Record<string, string> = {
  booking: "text-blue-600 bg-blue-100",
  offer: "text-orange-600 bg-orange-100",
  reminder: "text-purple-600 bg-purple-100",
  payment: "text-green-600 bg-green-100",
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">Notifications</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        {unreadCount > 0 && <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">{unreadCount} unread</span>}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-14 text-center">
          <Bell className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">All caught up!</h3>
          <p className="mt-1 text-sm text-muted-foreground">No new notifications at the moment.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = typeIcons[n.type] || Bell
            const color = typeColors[n.type] || "text-muted-foreground bg-muted"
            return (
              <div key={n.id} className={`flex items-start gap-3 rounded-2xl border p-4 transition hover:shadow-sm ${!n.unread ? "border-border bg-white" : "border-neutral-900 bg-neutral-50"}`}>
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{n.timestamp}</p>
                </div>
                <div className="flex gap-2">
                  {n.unread && <span className="mt-2 size-2 rounded-full bg-neutral-900" />}
                  <button className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
