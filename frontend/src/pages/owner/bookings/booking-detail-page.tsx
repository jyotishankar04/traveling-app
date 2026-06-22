import { Link, useParams } from "react-router"
import { ChevronLeft, MessageSquare, Edit3, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ownerBookings } from "@/data/owner/owner-bookings"

export default function BookingDetailPage() {
  const { bookingId } = useParams()
  const booking = ownerBookings.find((b) => b.id === bookingId)
  if (!booking) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title={booking.bookingId} subtitle="Booking details">
        <BookingStatusBadge status={booking.bookingStatus} />
        <Link to="/owner/bookings"><Button variant="outline" className="rounded-full"><ChevronLeft className="size-4" />Back</Button></Link>
        <Button variant="outline" className="rounded-full"><MessageSquare className="size-4" />Message Guest</Button>
        <Button variant="outline" className="rounded-full"><Edit3 className="size-4" />Modify</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Guest Information</h3>
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-lg font-bold text-foreground">
                {booking.guestName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{booking.guestName}</p>
                <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                <p className="text-sm text-muted-foreground">{booking.guestPhone}</p>
                <p className="text-sm text-muted-foreground">{booking.guestCountry}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Hotel:</span> <span className="font-medium text-foreground">{booking.hotelName}</span></div>
              <div><span className="text-muted-foreground">Room type:</span> <span className="font-medium text-foreground">{booking.roomType}</span></div>
              <div><span className="text-muted-foreground">Check-in:</span> <span className="font-medium text-foreground">{booking.checkIn}</span></div>
              <div><span className="text-muted-foreground">Check-out:</span> <span className="font-medium text-foreground">{booking.checkOut}</span></div>
              <div><span className="text-muted-foreground">Guests:</span> <span className="font-medium text-foreground">{booking.guests}</span></div>
              <div><span className="text-muted-foreground">Rooms:</span> <span className="font-medium text-foreground">{booking.rooms}</span></div>
              <div><span className="text-muted-foreground">Nights:</span> <span className="font-medium text-foreground">{booking.nights}</span></div>
              <div><span className="text-muted-foreground">Source:</span> <span className="font-medium text-foreground">{booking.source}</span></div>
              <div><span className="text-muted-foreground">Total amount:</span> <span className="font-semibold text-foreground">${booking.amount.toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Payment:</span> <PaymentStatusBadge status={booking.paymentStatus} /></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Price Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>${booking.amount / booking.nights} × {booking.nights} nights</span><span>${booking.amount}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span>$49</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>$76</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold text-foreground"><span>Total</span><span>${booking.amount}</span></div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="mb-3 font-semibold text-foreground">Special Requests</h3>
              <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Internal Notes</h3>
            <textarea
              defaultValue={booking.internalNotes}
              placeholder="Add internal notes..."
              rows={3}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
            <Button className="mt-3 rounded-full text-xs" size="sm">Save Notes</Button>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <div className="size-2 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Booking created</p>
                  <p className="text-xs text-muted-foreground">{booking.createdAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                  booking.paymentStatus === "paid" ? "bg-emerald-100" : "bg-amber-100"
                }`}>
                  <div className={`size-2 rounded-full ${
                    booking.paymentStatus === "paid" ? "bg-emerald-500" : "bg-amber-500"
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Payment {booking.paymentStatus === "paid" ? "received" : "pending"}</p>
                  <p className="text-xs text-muted-foreground">{booking.paymentStatus === "paid" ? booking.createdAt : "Awaiting payment"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <div className="size-2 rounded-full bg-neutral-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Check-in upcoming</p>
                  <p className="text-xs text-muted-foreground">{booking.checkIn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <img src={booking.hotelImage} alt={booking.hotelName} className="h-36 w-full object-cover" />
            <div className="p-4">
              <h4 className="font-semibold text-foreground">{booking.hotelName}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{booking.roomType}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Actions</h4>
            <div className="mt-3 space-y-2">
              <Button variant="outline" className="w-full rounded-xl text-xs" size="sm"><MessageSquare className="size-3.5" />Message Guest</Button>
              <Button variant="outline" className="w-full rounded-xl text-xs" size="sm"><Edit3 className="size-3.5" />Modify Booking</Button>
              <Button variant="outline" className="w-full rounded-xl text-xs text-red-600 hover:text-red-600" size="sm"><XCircle className="size-3.5" />Cancel Booking</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
