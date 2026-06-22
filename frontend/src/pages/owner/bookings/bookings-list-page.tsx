import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { TableSkeleton } from "@/components/custom/owner/DataSkeletons"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function BookingsListPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  function filterByTab(tab: string) {
    return ownerBookings.filter((b) => {
      if (tab === "upcoming") return b.bookingStatus === "upcoming" || b.bookingStatus === "confirmed"
      if (tab !== "all") return b.bookingStatus === tab
      return true
    }).filter((b) => {
      if (!search) return true
      const q = search.toLowerCase()
      return b.bookingId.toLowerCase().includes(q) || b.guestName.toLowerCase().includes(q) || b.hotelName.toLowerCase().includes(q)
    })
  }

  function countByTab(tab: string) {
    if (tab === "upcoming") return ownerBookings.filter(b => b.bookingStatus === "upcoming" || b.bookingStatus === "confirmed").length
    if (tab !== "all") return ownerBookings.filter(b => b.bookingStatus === tab).length
    return ownerBookings.length
  }

  return (
    <div>
      <OwnerPageHeader title="Bookings" subtitle="Manage all bookings and reservations.">
        <Button variant="outline" className="rounded-full"><Download className="size-4" />Export</Button>
      </OwnerPageHeader>

      <div className="mb-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by booking ID, guest, or hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList variant="line">
          <TabsTrigger value="all">All ({countByTab("all")})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({countByTab("upcoming")})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({countByTab("completed")})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({countByTab("cancelled")})</TabsTrigger>
        </TabsList>

        {["all", "upcoming", "completed", "cancelled"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            <BookingsTable data={filterByTab(tabValue)} loading={loading} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function BookingsTable({ data, loading }: { data: typeof ownerBookings; loading: boolean }) {
  if (loading) return <TableSkeleton rows={6} columns={10} />

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <OwnerDataTable headers={["Booking ID", "Guest", "Hotel", "Room", "Check-in", "Check-out", "Amount", "Payment", "Status", ""]}>
        {data.map((b) => (
          <tr key={b.id} className="transition hover:bg-muted/30">
            <td className="px-4 py-3 text-sm font-medium text-foreground">{b.bookingId}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{b.guestName}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
            <td className="px-4 py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
            <td className="px-4 py-3"><PaymentStatusBadge status={b.paymentStatus} /></td>
            <td className="px-4 py-3"><BookingStatusBadge status={b.bookingStatus} /></td>
            <td className="px-4 py-3">
              <Link to={`/owner/bookings/${b.id}`} className="text-sm font-medium text-foreground underline-offset-2 hover:underline">View</Link>
            </td>
          </tr>
        ))}
      </OwnerDataTable>
    </div>
  )
}
