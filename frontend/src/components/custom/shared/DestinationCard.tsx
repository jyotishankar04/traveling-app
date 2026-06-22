import { Heart, MapPin, Star } from "lucide-react"
import { Link } from "react-router"
import type { Destination } from "@/data/destinations"

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/destinations/${destination.slug}`}>
          <img
            src={destination.image}
            alt={destination.name}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition hover:bg-white">
          <Heart className="size-4" />
        </button>
      </div>
      <div className="p-4">
        <Link to={`/destinations/${destination.slug}`}>
          <h3 className="font-semibold text-foreground transition hover:text-muted-foreground">
            {destination.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {destination.country}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
            <Star className="size-3 fill-current" />
            {destination.rating}
          </span>
          <span className="text-sm text-muted-foreground">
            {destination.propertyCount.toLocaleString()} properties
          </span>
        </div>
      </div>
    </div>
  )
}
