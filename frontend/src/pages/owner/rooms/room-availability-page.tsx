import { useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerRooms } from "@/data/owner/owner-rooms"

export default function RoomAvailabilityPage() {
  const { roomTypeId } = useParams()
  const room = ownerRooms.find((r) => r.id === roomTypeId)
  if (!room) return <NotFoundState />
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getStatus = (day: number): "available" | "limited" | "sold-out" | "closed" => {
    if (day % 7 === 0) return "closed"
    if (day > 25) return "sold-out"
    if (day > 20) return "limited"
    return "available"
  }

  return (
    <div>
      <OwnerPageHeader title={`${room.name} Availability`} subtitle="Manage room availability">
        <Button className="rounded-full">Update Availability</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-white">
            <div className="border-b border-border px-5 py-4">
              <h3 className="font-semibold text-foreground">June 2026</h3>
            </div>
            <div className="grid grid-cols-7">
              {days.map((d) => (
                <div key={d} className="border-b border-r border-border px-3 py-2 text-xs font-semibold text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1
                const status = getStatus(day)
                const colors: Record<string, string> = {
                  available: "bg-emerald-100 text-emerald-700",
                  limited: "bg-amber-100 text-amber-700",
                  "sold-out": "bg-red-100 text-red-700",
                  closed: "bg-neutral-100 text-muted-foreground",
                }
                return (
                  <div key={i} className={`min-h-16 border-b border-r border-border p-2 transition hover:bg-muted/30 ${status === "closed" ? "bg-neutral-50" : ""}`}>
                    <span className={`inline-flex size-7 items-center justify-center rounded-lg text-xs font-medium ${colors[status]}`}>
                      {day}
                    </span>
                    <p className="mt-1 text-[9px] text-muted-foreground capitalize">{status.replace("-", " ")}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Update Date</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Date range</label>
                <input type="date" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Status</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>Available</option><option>Limited</option><option>Sold Out</option><option>Closed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Rooms available</label>
                <input type="number" defaultValue={room.availableUnits} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" className="accent-neutral-900" />
                Apply to all room inventory
              </label>
              <Button className="w-full rounded-xl">Update Availability</Button>
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-xl">Bulk Update</Button>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-emerald-100" /> Available</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-amber-100" /> Limited</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-red-100" /> Sold Out</span>
            <span className="flex items-center gap-1"><span className="size-2.5 rounded bg-neutral-100" /> Closed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
