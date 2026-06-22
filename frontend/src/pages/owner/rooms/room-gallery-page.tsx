import { useParams } from "react-router"
import { Upload, GripVertical, Trash2, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerRooms } from "@/data/owner/owner-rooms"

export default function RoomGalleryPage() {
  const { roomTypeId } = useParams()
  const room = ownerRooms.find((r) => r.id === roomTypeId)
  if (!room) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title={`${room.name} Gallery`} subtitle="Manage room images">
        <Button className="rounded-full"><Upload className="size-4" />Upload Photos</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {room.images.map((img, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-white">
            <img src={img} alt={`${room.name} image ${i + 1}`} className="h-40 w-full object-cover" />
            {i === 0 && <Badge className="absolute left-2 top-2 bg-white/80 text-xs text-foreground backdrop-blur-sm"><Star className="size-3 fill-yellow-400 text-yellow-400" /> Main</Badge>}
            <div className="absolute bottom-2 right-2 hidden gap-1 group-hover:flex">
              <button className="flex size-7 items-center justify-center rounded-lg bg-white/80 text-muted-foreground backdrop-blur-sm"><GripVertical className="size-3.5" /></button>
              <button className="flex size-7 items-center justify-center rounded-lg bg-white/80 text-muted-foreground backdrop-blur-sm hover:text-red-500"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        ))}
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-neutral-50 p-8 text-center transition hover:border-neutral-300">
          <Plus className="size-8 text-muted-foreground" />
          <p className="mt-2 text-xs font-medium text-muted-foreground">Add More</p>
        </div>
      </div>
    </div>
  )
}
