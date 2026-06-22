import { Heart, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import type { Hotel } from "@/data/hotels"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HotelListCardProps {
  hotel: Hotel
}

export function HotelListCard({ hotel }: HotelListCardProps) {
  const [imgIndex, setImgIndex] = useState(0)

  const next = () => setImgIndex((i) => (i + 1) % hotel.images.length)
  const prev = () => setImgIndex((i) => (i - 1 + hotel.images.length) % hotel.images.length)

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg md:flex-row">
      <div className="relative aspect-[4/3] md:w-80 md:shrink-0 md:aspect-auto">
        <img
          src={hotel.images[imgIndex]}
          alt={hotel.name}
          className="size-full object-cover"
        />
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
        <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition hover:bg-white">
          <Heart className="size-4" />
        </button>
        {hotel.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            Best Seller
          </span>
        )}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {hotel.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={cn(
                "size-1.5 rounded-full transition",
                i === imgIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/hotels/${hotel.slug}`}>
              <h3 className="text-lg font-semibold text-foreground transition hover:text-muted-foreground">
                {hotel.name}
              </h3>
            </Link>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {hotel.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              ${hotel.pricePerNight}
            </div>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
            <Star className="size-3 fill-current" />
            {hotel.rating}
          </span>
          <span className="text-sm text-muted-foreground">{hotel.reviewCount} reviews</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{hotel.stars} Star {hotel.propertyType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {hotel.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] text-muted-foreground">
              +{hotel.amenities.length - 4}
            </span>
          )}
        </div>

        {hotel.freeCancellation && (
          <p className="mt-2 text-xs font-medium text-green-700">✓ Free cancellation</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Includes taxes & fees</p>
          </div>
          <Link to={`/hotels/${hotel.slug}`}>
            <Button className="h-9 rounded-full px-5 text-xs font-semibold">
              View details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
