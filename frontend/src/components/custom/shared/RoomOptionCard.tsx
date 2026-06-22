import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, BedDouble, Maximize, Eye } from "lucide-react"
import type { RoomType } from "@/data/rooms"

interface RoomOptionCardProps {
  room: RoomType
}

export function RoomOptionCard({ room }: RoomOptionCardProps) {
  const symbol = room.currency === "EUR" ? "€" : room.currency === "GBP" ? "£" : "$"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-56 md:shrink-0">
          <img
            src={room.images[0]}
            alt={room.name}
            className="aspect-[4/3] size-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{room.shortDescription}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-2xl font-bold text-foreground">
                {symbol}{room.pricePerNight}
              </div>
              <div className="text-xs text-muted-foreground">per night</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="size-3.5" />
              Up to {room.maxGuests} guests
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <BedDouble className="size-3.5" />
              {room.bedType}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Maximize className="size-3.5" />
              {room.size}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="size-3.5" />
              {room.view}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                className="rounded-full bg-muted/70 px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {room.cancellationPolicy?.includes("Free cancellation") && (
              <span className="flex items-center gap-1 font-medium text-green-700">
                <CheckCircle2 className="size-3.5" />
                Free cancellation
              </span>
            )}
            {room.boardBasis && (
              <span className="text-muted-foreground">· {room.boardBasis}</span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="text-xs text-muted-foreground">
              {room.remainingRooms} room{room.remainingRooms > 1 ? "s" : ""} left
            </div>
            <Button className="h-9 rounded-full px-5 text-xs font-semibold">
              Book now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
