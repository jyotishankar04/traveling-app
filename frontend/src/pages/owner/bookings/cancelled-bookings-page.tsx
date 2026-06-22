import { useState, useEffect } from "react"
import { Link } from "react-router"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { TableSkeleton, StatsSkeleton } from "@/components/custom/owner/DataSkeletons"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function CancelledBookingsPage() {
  const [loading, setLoading] = useState(true)
  const cancelled = ownerBookings.filter((b) => b.bookingStatus === "cancelled")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const totalRefunded = cancelled.reduce((s, b) => s + b.amount, 0)

  const reasons = cancelled.reduce((acc: Record<string, number>, b) => {
    const r = b.cancellationReason || "Other"
    acc[r] = (acc[r] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <OwnerPageHeader title="Cancelled Bookings" subtitle="Cancelled and refunded bookings" />

      {loading ? <StatsSkeleton count={2} /> : (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-2xl font-bold text-foreground">{cancelled.length}</p>
            <p className="text-xs text-muted-foreground">Total cancelled</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-2xl font-bold text-foreground">${totalRefunded.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Amount refunded</p>
          </div>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Cancellation Reasons</h4>
          <div className="space-y-2">
            {Object.entries(reasons).map(([reason, count]) => (
              <div key={reason} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{reason}</span>
                <span className="font-medium text-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Refund Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total refunded</span><span className="font-medium text-foreground">${totalRefunded.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fully refunded</span><span className="font-medium text-foreground">{cancelled.filter(b => b.refundStatus === "fully_refunded").length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Partially refunded</span><span className="font-medium text-foreground">{cancelled.filter(b => b.refundStatus !== "fully_refunded").length}</span></div>
          </div>
        </div>
      </div>

      {loading ? <TableSkeleton rows={4} columns={9} /> : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <OwnerDataTable headers={["Guest", "Hotel", "Room", "Check-in", "Amount", "Cancelled On", "Refund", "Reason", ""]}>
            {cancelled.map((b) => (
              <tr key={b.id} className="transition hover:bg-muted/30">
                <td className="px-4 py-3 text-sm text-foreground">{b.guestName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.cancelledOn || "—"}</td>
                <td className="px-4 py-3"><PaymentStatusBadge status={b.refundStatus === "fully_refunded" ? "refunded" : "pending"} /></td>
                <td className="px-4 py-3 text-sm text-muted-foreground max-w-[120px] truncate">{b.cancellationReason || "—"}</td>
                <td className="px-4 py-3"><Link to={`/owner/bookings/${b.id}`} className="text-sm font-medium text-foreground underline-offset-2 hover:underline">View</Link></td>
              </tr>
            ))}
          </OwnerDataTable>
        </div>
      )}
    </div>
  )
}
