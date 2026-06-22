import { useParams, Link } from "react-router"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerHotels } from "@/data/owner/owner-hotels"

const amenityOptions = [
  "Wi-Fi", "Air Conditioning", "TV", "Mini Bar", "Work Desk", "Room Service",
  "Balcony", "Kitchenette", "Bathtub", "Safe", "Hair Dryer", "Iron",
]

export default function NewRoomPage() {
  const { hotelId } = useParams()
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title="Add New Room Type" subtitle={`Create a room type for ${hotel.name}`}>
        <Link to={`/owner/hotels/${hotel.id}/rooms`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save &amp; Continue</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Room type name</label>
              <input placeholder="e.g. Deluxe Room" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Description</label>
              <textarea placeholder="Describe the room type..." rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Capacity</label>
                <input type="number" placeholder="e.g. 2" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Room size</label>
                <input placeholder="e.g. 35 m²" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Max adults</label>
                <input type="number" placeholder="2" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Max children</label>
                <input type="number" placeholder="1" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Bed type</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>King</option><option>Queen</option><option>Double</option><option>Twin</option><option>Emperor</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">View type</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>City view</option><option>Ocean view</option><option>Mountain view</option><option>Garden view</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Pricing</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Base price per night</label>
              <input type="number" placeholder="520" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Currency</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>USD</option><option>EUR</option><option>GBP</option><option>CHF</option><option>JPY</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Weekend price</label>
                <input type="number" placeholder="580" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Extra guest price</label>
                <input type="number" placeholder="75" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map((a) => (
              <label key={a} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 transition has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50">
                <input type="checkbox" className="accent-neutral-900" />
                <span className="text-xs text-foreground">{a}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Room Image</h3>
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-neutral-50 p-8 text-center transition hover:border-neutral-300">
            <Upload className="size-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-foreground">Upload room image</p>
            <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
            <Button variant="outline" className="mt-4 rounded-full text-xs" size="sm">Upload</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
