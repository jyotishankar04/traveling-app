import { Link, useParams } from "react-router"
import { MapPin, Star, ChevronLeft, Phone, FileText, XCircle, CheckCircle2, Wifi, Waves, Dumbbell, Sparkles, Car, Snowflake, Utensils, Wine, Coffee, Bell, Shirt, Bus, Tv, Refrigerator, Eye, Sun, PawPrint, Smile, Umbrella } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { bookings } from "@/data/bookings"
import { hotels } from "@/data/hotels"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

const statusVariant: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  confirmed: "default", upcoming: "default", completed: "secondary", cancelled: "destructive",
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi, pool: Waves, spa: Sparkles, gym: Dumbbell, parking: Car,
  ac: Snowflake, restaurant: Utensils, bar: Wine, breakfast: Coffee,
  "room-service": Bell, laundry: Shirt, "airport-shuttle": Bus,
  tv: Tv, "mini-bar": Refrigerator, "ocean-view": Eye, balcony: Sun,
  "pet-friendly": PawPrint, "kids-club": Smile, "beach-access": Umbrella,
}

export default function BookingDetailPage() {
  const { bookingId } = useParams()
  const booking = bookings.find((b) => b.id === bookingId)
  if (!booking) return <NotFoundState />
  const hotel = hotels.find((h) => h.id === booking.hotelId)
  const symbol = booking.currency === "EUR" ? "€" : booking.currency === "GBP" ? "£" : "$"

  return (
    <div className="space-y-6">
      <Link to="/profile/bookings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" />
        Back to bookings
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">Booking details</h1>
        <Badge variant={statusVariant[booking.status]} className="capitalize">{booking.status}</Badge>
        <span className="text-sm text-muted-foreground">{booking.bookingId}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex gap-5 rounded-2xl border border-border bg-white p-5">
            <img src={booking.hotelImage} alt={booking.hotelName} className="size-24 shrink-0 rounded-xl object-cover sm:size-32" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-foreground">{booking.hotelName}</h2>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {booking.location}
              </div>
              {hotel && (
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                    <Star className="size-3 fill-current" />
                    {hotel.rating}
                  </span>
                  <span className="text-muted-foreground">{hotel.reviewCount} reviews</span>
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hotel?.amenities.slice(0, 4).map((a) => {
                  const Icon = amenityIcons[a]
                  return (
                    <span key={a} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {Icon && <Icon className="size-3" />}
                      {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  )
                })}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{booking.roomType} · ${booking.totalPaid}/night</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="font-semibold text-foreground">Itinerary</h3>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Check-in</p>
                <p className="text-sm font-medium text-foreground">{booking.checkIn}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Check-out</p>
                <p className="text-sm font-medium text-foreground">{booking.checkOut}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nights</p>
                <p className="text-sm font-medium text-foreground">{booking.nights} nights</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="font-semibold text-foreground">Guest information</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">Alex Thompson</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">alex.thompson@example.com</span></div>
              <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">+1 (555) 123-4567</span></div>
              <div><span className="text-muted-foreground">Guests:</span> <span className="font-medium text-foreground">{booking.guests} guest{booking.guests > 1 ? "s" : ""}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="font-semibold text-foreground">Payment details</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="font-medium text-foreground">{booking.paymentMethod}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Transaction ID</span><span className="font-medium text-foreground">{booking.transactionId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid on</span><span className="font-medium text-foreground">{booking.paidOn}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={statusVariant[booking.status]} className="capitalize text-xs">{booking.paymentStatus}</Badge></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="font-semibold text-foreground">Booking summary</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>{symbol}{booking.totalPaid} x {booking.nights} nights</span><span>{symbol}{booking.totalPaid}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Taxes & fees</span><span>{symbol}125</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold text-foreground"><span>Total paid</span><span>{symbol}{booking.totalPaid}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-2"><CheckCircle2 className="size-5 text-green-600" /><span className="text-sm font-medium text-foreground">Free cancellation</span></div>
            <p className="mt-1 text-xs text-muted-foreground">Cancel up to 48 hours before check-in for a full refund.</p>
          </div>

          <Button variant="outline" className="w-full rounded-xl"><Phone className="size-4" />Contact Support</Button>
          <Button variant="outline" className="w-full rounded-xl"><FileText className="size-4" />Download Invoice</Button>
          {booking.status === "upcoming" && (
            <Button variant="outline" className="w-full rounded-xl text-red-600 hover:text-red-600"><XCircle className="size-4" />Cancel Booking</Button>
          )}
        </div>
      </div>
    </div>
  )
}
