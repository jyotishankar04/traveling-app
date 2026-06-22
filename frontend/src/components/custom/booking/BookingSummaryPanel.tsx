import { MapPin, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { Hotel } from "@/data/hotels"

interface BookingSummaryPanelProps {
  hotel: Hotel
}

export function BookingSummaryPanel({ hotel }: BookingSummaryPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex gap-4">
        <img src={hotel.images[0]} alt={hotel.name} className="size-20 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground">{hotel.name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {hotel.city}, {hotel.country}
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
              <Star className="size-3 fill-current" />
              {hotel.rating}
            </span>
            <span className="text-muted-foreground">{hotel.reviewCount} reviews</span>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground"><span>Check-in</span><span className="text-foreground">Oct 15, 2026</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Check-out</span><span className="text-foreground">Oct 18, 2026</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Guests</span><span className="text-foreground">2 adults</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Room</span><span className="text-foreground">Deluxe King Suite</span></div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>${hotel.pricePerNight} x 3 nights</span>
          <span>${hotel.pricePerNight * 3}</span>
        </div>
        <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span>$49</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>$76</span></div>
        <Separator />
        <div className="flex justify-between font-semibold text-foreground">
          <span>Total</span>
          <span>${hotel.pricePerNight * 3 + 125}</span>
        </div>
      </div>
    </div>
  )
}
