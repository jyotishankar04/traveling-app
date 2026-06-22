import { MapPin } from "lucide-react"

interface MapPreviewProps {
  lat: number
  lng: number
  location: string
  className?: string
}

export function MapPreview({ lat, lng, location, className = "" }: MapPreviewProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-200 ${className}`}>
      <div className="flex aspect-[16/9] items-center justify-center bg-neutral-100">
        <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
          <MapPin className="size-8" />
          <div>
            <p className="text-sm font-medium text-foreground">{location}</p>
            <p className="text-xs">{lat.toFixed(4)}, {lng.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
