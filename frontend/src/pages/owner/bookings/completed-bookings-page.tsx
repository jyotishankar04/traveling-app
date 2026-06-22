import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { TableSkeleton, StatsSkeleton } from "@/components/custom/owner/DataSkeletons"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function CompletedBookingsPage() {
  const [loading, setLoading] = useState(true)
  const completed = ownerBookings.filter((b) => b.bookingStatus === "completed")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const totalRevenue = completed.reduce((s, b) => s + b.amount, 0)

  return (
    <div>
      <OwnerPageHeader title="Completed Bookings" subtitle="Past completed reservations" />

      {loading ? <StatsSkeleton count={2} /> : (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Revenue from completed stays</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-2xl font-bold text-foreground">{completed.filter((b) => b.reviewRating).length}/{completed.length}</p>
            <p className="text-xs text-muted-foreground">Reviews received</p>
          </div>
        </div>
      )}

      {loading ? <TableSkeleton rows={4} columns={8} /> : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <OwnerDataTable headers={["Guest", "Hotel", "Room", "Check-out", "Amount", "Rating", "Payment", "Status"]}>
            {completed.map((b) => (
              <tr key={b.id} className="transition hover:bg-muted/30">
                <td className="px-4 py-3 text-sm text-foreground">{b.guestName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {b.reviewRating ? (
                    <span className="inline-flex items-center gap-1 text-sm"><Star className="size-3.5 fill-yellow-400 text-yellow-400" />{b.reviewRating}</span>
                  ) : <span className="text-xs text-muted-foreground">No review</span>}
                </td>
                <td className="px-4 py-3"><PaymentStatusBadge status={b.paymentStatus} /></td>
                <td className="px-4 py-3"><BookingStatusBadge status={b.bookingStatus} /></td>
              </tr>
            ))}
          </OwnerDataTable>
        </div>
      )}
    </div>
  )
}
