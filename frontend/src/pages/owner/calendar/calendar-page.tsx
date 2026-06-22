import { useState } from "react"
import { ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { calendarEvents } from "@/data/owner/owner-calendar"
import { ownerHotels } from "@/data/owner/owner-hotels"

const typeColors: Record<string, string> = {
  "check-in": "bg-emerald-500",
  "check-out": "bg-blue-500",
  confirmed: "bg-amber-500",
  cancelled: "bg-red-400",
  maintenance: "bg-purple-400",
}

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const daysInMonth = 30
  const today = 15

  return (
    <div>
      <OwnerPageHeader title="Calendar" subtitle="Booking and availability calendar">
        <div className="flex gap-1 rounded-xl border border-border bg-white p-1">
          {(["month", "week", "day"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition capitalize ${
                view === v ? "bg-neutral-900 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <select className="h-9 rounded-xl border border-input bg-white px-3 text-sm outline-none">
          {ownerHotels.map((h) => <option key={h.id}>{h.name}</option>)}
          <option>All Properties</option>
        </select>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-white">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <button className="flex size-8 items-center justify-center rounded-lg border border-border hover:bg-muted">
                <ChevronLeft className="size-4 text-muted-foreground" />
              </button>
              <h2 className="font-semibold text-foreground">June 2026</h2>
              <button className="flex size-8 items-center justify-center rounded-lg border border-border hover:bg-muted">
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-border">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="border-r border-border px-3 py-2 text-xs font-semibold text-muted-foreground last:border-r-0">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 4 + 1
                const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth
                const dayEvents = isCurrentMonth ? calendarEvents.filter((e) => {
                  const d = parseInt(e.date.split("-")[2])
                  return d === dayNum
                }) : []

                return (
                  <div
                    key={i}
                    className={`min-h-24 border-b border-r border-border p-2 transition ${
                      isCurrentMonth ? "hover:bg-muted/30" : "bg-neutral-50"
                    } ${dayNum === today ? "bg-neutral-50" : ""}`}
                  >
                    {isCurrentMonth && (
                      <>
                        <span className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                          dayNum === today ? "bg-neutral-900 text-white" : "text-foreground"
                        }`}>
                          {dayNum}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.map((e) => (
                            <div
                              key={e.id}
                              className={`${typeColors[e.type]} truncate rounded px-1.5 py-0.5 text-[10px] text-white`}
                            >
                              {e.type === "check-in" && "→ "}{e.type === "check-out" && "← "}{e.guestName || e.roomType}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="font-semibold text-foreground">June 15, 2026</h3>
            <p className="text-xs text-muted-foreground">Today</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">CHECK-INS (2)</p>
                <p className="mt-1 text-sm text-foreground">Sophie Laurent · Deluxe Room</p>
                <p className="text-sm text-foreground">James Mitchell · King Suite</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">OCCUPIED ROOMS</p>
                <p className="mt-1 text-sm text-foreground">38 / 48 rooms</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">AVAILABLE ROOMS</p>
                <p className="mt-1 text-sm text-foreground">10 rooms</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">REVENUE TODAY</p>
                <p className="mt-1 text-lg font-bold text-foreground">$18,400</p>
              </div>
            </div>
          </div>

          <Button className="w-full rounded-xl">Update Availability</Button>
          <Button variant="outline" className="w-full rounded-xl"><Lock className="size-4" />Block Dates</Button>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-emerald-500" />Check-in</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-blue-500" />Check-out</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-amber-500" />Confirmed</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-red-400" />Cancelled</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-purple-400" />Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  )
}
