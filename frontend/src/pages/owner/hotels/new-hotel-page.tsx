import { Link } from "react-router"
import { Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { amenityCategories, selectedAmenities } from "@/data/owner/owner-amenities"

export default function NewHotelPage() {
  return (
    <div>
      <OwnerPageHeader title="Add New Hotel" subtitle="Create a new property to start receiving bookings.">
        <Link to="/owner/hotels"><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button variant="outline" className="rounded-full">Save as Draft</Button>
        <Button className="rounded-full">Save &amp; Continue</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Hotel name</label>
              <input placeholder="e.g. Lumière Hotel Paris" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Property type</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>Luxury Hotel</option>
                  <option>Boutique Hotel</option>
                  <option>Resort</option>
                  <option>Villa</option>
                  <option>Bed & Breakfast</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Star rating</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>5 Stars</option>
                  <option>4 Stars</option>
                  <option>3 Stars</option>
                  <option>2 Stars</option>
                  <option>1 Star</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Country</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>France</option>
                  <option>United States</option>
                  <option>Switzerland</option>
                  <option>India</option>
                  <option>Japan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">City</label>
                <input placeholder="e.g. Paris" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Full address</label>
              <input placeholder="Street, postal code, country" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Phone</label>
              <input placeholder="+33 1 53 67 15 00" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Email</label>
              <input placeholder="reservations@hotel.com" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Website</label>
              <input placeholder="https://hotel.com" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Description</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Short description</label>
              <input placeholder="Brief one-line description" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Long description</label>
              <textarea placeholder="Detailed description of your property..." rows={5} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Primary Image</h3>
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-neutral-50 p-8 text-center transition hover:border-neutral-300">
            <Upload className="size-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-foreground">Drag and drop an image here</p>
            <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
            <Button variant="outline" className="mt-4 rounded-full text-xs" size="sm">Upload Image</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-2">
          <h3 className="mb-4 font-semibold text-foreground">Amenities</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {amenityCategories.map((cat) => (
              <div key={cat.id}>
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{cat.name}</p>
                <div className="space-y-2">
                  {cat.amenities.map((a) => {
                    const isSelected = selectedAmenities.includes(a.id)
                    return (
                      <label key={a.id} className="flex cursor-pointer items-center gap-2">
                        <div className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                          isSelected ? "border-neutral-900 bg-neutral-900 text-white" : "border-border"
                        }`}>
                          {isSelected && <Check className="size-3" />}
                        </div>
                        <span className="text-xs text-foreground">{a.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
