import { Link, useParams } from "react-router"
import { MapPin, Star, ExternalLink, Edit3, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerStatCard } from "@/components/custom/owner/OwnerStatCard"
import { OwnerChartCard } from "@/components/custom/owner/OwnerChartCard"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { HotelStatusBadge, BookingStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ownerHotels } from "@/data/owner/owner-hotels"
import { ownerBookings } from "@/data/owner/owner-bookings"
import { ownerReviews } from "@/data/owner/owner-reviews"
import { dailyMetrics } from "@/data/owner/owner-analytics"

export default function HotelDetailPage() {
  const { hotelId } = useParams()
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />
  const hotelBookings = ownerBookings.filter((b) => b.hotelId === hotel.id).slice(0, 5)
  const hotelReviews = ownerReviews.filter((r) => r.hotelId === hotel.id).slice(0, 3)
  const maxRev = Math.max(...dailyMetrics.map((d) => d.revenue))

  return (
    <div>
      <OwnerPageHeader title={hotel.name} subtitle={`${hotel.city}, ${hotel.country}`}>
        <HotelStatusBadge status={hotel.status} />
        <Link to={`/hotels/${hotel.slug}`}><Button variant="outline" className="rounded-full"><ExternalLink className="size-4" />Preview</Button></Link>
        <Link to={`/owner/hotels/${hotel.id}/edit`}><Button variant="outline" className="rounded-full"><Edit3 className="size-4" />Edit</Button></Link>
        <Button variant="outline" className="rounded-full"><MoreHorizontal className="size-4" /></Button>
      </OwnerPageHeader>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <OwnerStatCard label="Revenue MTD" value={`$${(hotel.revenueMTD / 1000).toFixed(0)}k`} change="+12%" changePositive />
            <OwnerStatCard label="Bookings" value="38" change="+8%" changePositive />
            <OwnerStatCard label="Occupancy" value={`${hotel.occupancy}%`} change="+5%" changePositive />
            <OwnerStatCard label="Avg Daily Rate" value={`$${Math.round(hotel.revenueMTD / 38 / 30)}`} change="+3%" changePositive />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <OwnerChartCard title="Revenue Overview" subtitle="Daily revenue">
              <div className="flex items-end gap-1.5" style={{ height: 120 }}>
                {dailyMetrics.slice(0, 10).map((d) => (
                  <div key={d.date} className="flex flex-1 flex-col items-center justify-end">
                    <div className="w-full rounded-t bg-neutral-900 transition hover:bg-neutral-700" style={{ height: `${(d.revenue / maxRev) * 100}px` }} />
                  </div>
                ))}
              </div>
            </OwnerChartCard>

            <OwnerChartCard title="Quick Stats" subtitle="Key metrics">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total Rooms</span><span className="font-medium text-foreground">{hotel.totalRooms}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Property Type</span><span className="font-medium text-foreground">{hotel.propertyType}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Star Rating</span><span className="font-medium text-foreground">{hotel.stars} Stars</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium text-foreground">{hotel.checkInTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium text-foreground">{hotel.checkOutTime}</span></div>
              </div>
            </OwnerChartCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <img src={hotel.images[0]} alt={hotel.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />{hotel.address}
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-yellow-400 text-yellow-400" />{hotel.rating}</span>
                <span className="text-muted-foreground">{hotel.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-4">
            <h4 className="text-sm font-semibold text-foreground">Hotel Information</h4>
            <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <p><span className="text-foreground">Phone:</span> {hotel.phone}</p>
              <p><span className="text-foreground">Email:</span> {hotel.email}</p>
              <p><span className="text-foreground">Website:</span> {hotel.website}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OwnerChartCard title="Recent Bookings" subtitle="Latest reservations">
          <OwnerDataTable headers={["Guest", "Room", "Check-in", "Amount", "Status"]}>
            {hotelBookings.map((b) => (
              <tr key={b.id} className="transition hover:bg-muted/30">
                <td className="px-4 py-3 text-sm text-foreground">{b.guestName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">${b.amount.toLocaleString()}</td>
                <td className="px-4 py-3"><BookingStatusBadge status={b.bookingStatus} /></td>
              </tr>
            ))}
          </OwnerDataTable>
          <Link to={`/owner/bookings?hotel=${hotel.id}`} className="mt-3 block text-center text-xs font-medium text-foreground underline-offset-2 hover:underline">
            View all bookings
          </Link>
        </OwnerChartCard>

        <OwnerChartCard title="Recent Reviews" subtitle="Guest feedback">
          <div className="space-y-4">
            {hotelReviews.map((r) => (
              <div key={r.id} className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-foreground">
                  {r.guestName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{r.guestName}</span>
                    <span className="inline-flex items-center gap-0.5 text-xs text-yellow-500">
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to={`/owner/reviews?hotel=${hotel.id}`} className="mt-3 block text-center text-xs font-medium text-foreground underline-offset-2 hover:underline">
            View all reviews
          </Link>
        </OwnerChartCard>
      </div>
    </div>
  )
}
