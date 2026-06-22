import { useState } from "react"
import { useParams } from "react-router"
import { Upload, GripVertical, Trash2, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerHotels } from "@/data/owner/owner-hotels"

export default function HotelGalleryPage() {
  const { hotelId } = useParams()
  const [tab, setTab] = useState<"photos" | "videos">("photos")
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title="Hotel Gallery" subtitle={`Manage images for ${hotel.name}`}>
        <div className="flex gap-1 rounded-xl border border-border bg-white p-1">
          {(["photos", "videos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                tab === t ? "bg-neutral-900 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Button className="rounded-full"><Upload className="size-4" />Upload Photos</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {hotel.images.map((img, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-white">
            <img src={img} alt={`${hotel.name} image ${i + 1}`} className="h-40 w-full object-cover" />
            {i === 0 && <Badge className="absolute left-2 top-2 bg-white/80 text-xs text-foreground backdrop-blur-sm"><Star className="size-3 fill-yellow-400 text-yellow-400" /> Main</Badge>}
            <div className="absolute bottom-2 right-2 hidden gap-1 group-hover:flex">
              <button className="flex size-7 items-center justify-center rounded-lg bg-white/80 text-muted-foreground backdrop-blur-sm hover:bg-white"><GripVertical className="size-3.5" /></button>
              <button className="flex size-7 items-center justify-center rounded-lg bg-white/80 text-muted-foreground backdrop-blur-sm hover:bg-white hover:text-red-500"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        ))}

        <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-neutral-50 p-8 text-center transition hover:border-neutral-300">
          <Plus className="size-8 text-muted-foreground" />
          <p className="mt-2 text-xs font-medium text-muted-foreground">Add More</p>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        Drag images to reorder. The first image is the main display image.
      </div>
    </div>
  )
}
