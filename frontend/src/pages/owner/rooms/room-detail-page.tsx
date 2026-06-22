import { Link, useParams } from "react-router"
import { Edit3, BedDouble, Star, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerStatCard } from "@/components/custom/owner/OwnerStatCard"
import { OwnerChartCard } from "@/components/custom/owner/OwnerChartCard"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { HotelStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ownerRooms } from "@/data/owner/owner-rooms"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function RoomDetailPage() {
  const { hotelId, roomTypeId } = useParams()
  const room = ownerRooms.find((r) => r.id === roomTypeId)
  if (!room) return <NotFoundState />
  const roomBookings = ownerBookings.filter((b) => b.roomTypeId === room.id).slice(0, 5)

  return (
    <div>
      <OwnerPageHeader title={room.name} subtitle="Room type details">
        <HotelStatusBadge status={room.status} />
        <Link to={`/owner/hotels/${hotelId}/rooms/${room.id}/edit`}><Button variant="outline" className="rounded-full"><Edit3 className="size-4" />Edit Room</Button></Link>
      </OwnerPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <OwnerStatCard label="Total Rooms" value={`${room.totalUnits}`} icon={<BedDouble className="size-4" />} />
        <OwnerStatCard label="Booked This Month" value={`${room.bookedThisMonth}`} icon={<Star className="size-4" />} />
        <OwnerStatCard label="Occupancy" value={`${room.occupancy}%`} change="+5%" changePositive icon={<TrendingUp className="size-4" />} />
        <OwnerStatCard label="Revenue This Month" value={`$${(room.revenueThisMonth / 1000).toFixed(1)}k`} icon={<DollarSign className="size-4" />} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Room Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Capacity:</span> <span className="font-medium text-foreground">{room.capacity} guests</span></div>
              <div><span className="text-muted-foreground">Size:</span> <span className="font-medium text-foreground">{room.size}</span></div>
              <div><span className="text-muted-foreground">Bed type:</span> <span className="font-medium text-foreground">{room.bedType}</span></div>
              <div><span className="text-muted-foreground">View:</span> <span className="font-medium text-foreground">{room.view}</span></div>
              <div><span className="text-muted-foreground">Status:</span> <span className="font-medium text-foreground capitalize">{room.status}</span></div>
              <div><span className="text-muted-foreground">Available:</span> <span className="font-medium text-foreground">{room.availableUnits}/{room.totalUnits}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Description</h3>
            <p className="text-sm text-muted-foreground">{room.description}</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((a) => (
                <span key={a} className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-foreground">
                  {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <img src={room.images[0]} alt={room.name} className="h-44 w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Pricing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Base price</span><span className="font-semibold text-foreground">${room.basePrice}/night</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Weekend price</span><span className="font-semibold text-foreground">${room.weekendPrice}/night</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Extra guest</span><span className="font-semibold text-foreground">${room.extraGuestPrice}/night</span></div>
            </div>
          </div>
        </div>
      </div>

      <OwnerChartCard title="Recent Bookings" subtitle="Bookings for this room type">
        <OwnerDataTable headers={["Booking ID", "Guest", "Check-in", "Check-out", "Amount", "Status"]}>
          {roomBookings.map((b) => (
            <tr key={b.id} className="transition hover:bg-muted/30">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{b.bookingId}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{b.guestName}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
              <td className="px-4 py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
              <td className="px-4 py-3"><HotelStatusBadge status={b.bookingStatus} /></td>
            </tr>
          ))}
        </OwnerDataTable>
      </OwnerChartCard>
    </div>
  )
}
