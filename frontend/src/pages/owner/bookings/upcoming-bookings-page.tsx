import { useState, useEffect } from "react"
import { Link } from "react-router"
import { CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { BookingStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { TableSkeleton, StatsSkeleton } from "@/components/custom/owner/DataSkeletons"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function UpcomingBookingsPage() {
  const [loading, setLoading] = useState(true)
  const upcoming = ownerBookings.filter((b) => b.bookingStatus === "upcoming" || b.bookingStatus === "confirmed")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const today = upcoming.filter((b) => b.checkIn === "2026-06-15")

  return (
    <div>
      <OwnerPageHeader title="Upcoming Bookings" subtitle="Future reservations">
        <Link to="/owner/calendar"><Button variant="outline" className="rounded-full"><CalendarDays className="size-4" />View Calendar</Button></Link>
      </OwnerPageHeader>

      {today.length > 0 && (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-800">Check-in Today</h3>
          {today.map((b) => (
            <div key={b.id} className="mt-2 flex items-center justify-between text-sm text-blue-700">
              <span>{b.guestName} · {b.hotelName} · {b.roomType}</span>
              <Link to={`/owner/bookings/${b.id}`} className="font-medium underline-offset-2 hover:underline">View <ArrowRight className="ml-1 inline size-3" /></Link>
            </div>
          ))}
        </div>
      )}

      {loading ? <StatsSkeleton count={3} /> : (
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{upcoming.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              ${upcoming.reduce((s, b) => s + b.amount, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Check-ins This Week</p>
          </div>
        </div>
      )}

      {loading ? <TableSkeleton rows={4} columns={8} /> : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <OwnerDataTable headers={["Guest", "Hotel", "Room", "Check-in", "Check-out", "Amount", "Status", ""]}>
            {upcoming.map((b) => (
              <tr key={b.id} className="transition hover:bg-muted/30">
                <td className="px-4 py-3 text-sm text-foreground">{b.guestName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                <td className="px-4 py-3"><BookingStatusBadge status={b.bookingStatus} /></td>
                <td className="px-4 py-3"><Link to={`/owner/bookings/${b.id}`} className="text-sm font-medium text-foreground underline-offset-2 hover:underline">View</Link></td>
              </tr>
            ))}
          </OwnerDataTable>
        </div>
      )}
    </div>
  )
}
