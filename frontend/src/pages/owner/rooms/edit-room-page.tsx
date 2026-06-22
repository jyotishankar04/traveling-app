import { useParams, Link } from "react-router"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerRooms } from "@/data/owner/owner-rooms"

const amenityList = ["wifi", "ac", "tv", "mini-bar", "work-desk", "room-service", "balcony", "kitchen", "bathtub", "safe", "hair-dryer", "iron"]

export default function EditRoomPage() {
  const { hotelId, roomTypeId } = useParams()
  const room = ownerRooms.find((r) => r.id === roomTypeId)
  if (!room) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title={`Edit: ${room.name}`} subtitle="Update room type information">
        <Link to={`/owner/hotels/${hotelId}/rooms/${room.id}`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save Changes</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Room type name</label>
              <input defaultValue={room.name} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Description</label>
              <textarea defaultValue={room.description} rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Capacity</label>
                <input defaultValue={room.capacity} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Room size</label>
                <input defaultValue={room.size} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Max adults</label>
                <input defaultValue={room.maxAdults} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Max children</label>
                <input defaultValue={room.maxChildren} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Bed type</label>
                <select defaultValue={room.bedType} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>King</option><option>Queen</option><option>Double</option><option>Twin</option><option>Emperor</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">View</label>
                <select defaultValue={room.view} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>City view</option><option>Ocean view</option><option>Mountain view</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Status</label>
              <select defaultValue={room.status} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenityList.map((a) => {
              const isSelected = room.amenities.includes(a)
              return (
                <label key={a} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 transition has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50">
                  <div className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                    isSelected ? "border-neutral-900 bg-neutral-900 text-white" : "border-border"
                  }`}>
                    {isSelected && <Check className="size-3" />}
                  </div>
                  <span className="text-xs text-foreground capitalize">{a.replace(/-/g, " ")}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
