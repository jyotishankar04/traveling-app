import { useState } from "react"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerNotifications } from "@/data/owner/owner-notifications"

const tabs = ["All", "Unread", "Bookings", "Payments", "System"]

const typeIcons: Record<string, string> = {
  booking: "bg-blue-100 text-blue-600",
  payment: "bg-emerald-100 text-emerald-600",
  review: "bg-amber-100 text-amber-600",
  availability: "bg-purple-100 text-purple-600",
  payout: "bg-emerald-100 text-emerald-600",
  system: "bg-neutral-100 text-neutral-600",
}

export default function OwnerNotificationsPage() {
  const [tab, setTab] = useState("All")

  const filtered = tab === "All" ? ownerNotifications
    : tab === "Unread" ? ownerNotifications.filter((n) => n.unread)
    : ownerNotifications.filter((n) => n.type === tab.toLowerCase())

  return (
    <div>
      <OwnerPageHeader title="Notifications" subtitle="Stay updated with important alerts.">
        <button className="text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
          Mark all as read
        </button>
      </OwnerPageHeader>

      <div className="mb-4 flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              tab === t ? "border-neutral-900 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 transition hover:shadow-sm ${
              n.unread ? "border-neutral-900 bg-neutral-50" : "border-border bg-white"
            }`}
          >
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${typeIcons[n.type] || "bg-neutral-100 text-neutral-600"}`}>
              <div className="size-2 rounded-full bg-current" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.message}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{n.timestamp}</p>
            </div>
            <div className="flex gap-2">
              {n.unread && <span className="mt-2 size-2 rounded-full bg-neutral-900" />}
              {n.actionable && n.actionLabel && (
                <button className="text-xs font-medium text-foreground underline-offset-2 hover:underline">
                  {n.actionLabel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
