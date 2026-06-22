import { Heart, MapPin, Star } from "lucide-react"
import { Link } from "react-router"
import type { Hotel } from "@/data/hotels"

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/hotels/${hotel.slug}`}>
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition hover:bg-white">
          <Heart className="size-4" />
        </button>
        {hotel.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            Best Seller
          </span>
        )}
      </div>
      <div className="p-4">
        <Link to={`/hotels/${hotel.slug}`}>
          <h3 className="font-semibold text-foreground transition hover:text-muted-foreground">
            {hotel.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {hotel.location}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
            <Star className="size-3 fill-current" />
            {hotel.rating}
          </span>
          <span className="text-sm text-muted-foreground">{hotel.reviewCount} reviews</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="text-lg font-bold text-foreground">
              ${hotel.pricePerNight}
            </span>
            <span className="text-sm text-muted-foreground"> per night</span>
          </div>
          <Link
            to={`/hotels/${hotel.slug}`}
            className="text-sm font-medium text-foreground underline-offset-2 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  )
}
