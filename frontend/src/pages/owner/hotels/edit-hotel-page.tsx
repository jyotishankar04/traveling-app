import { useState } from "react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerHotels } from "@/data/owner/owner-hotels"

const tabs = ["Basic Information", "Contact & Location", "Description", "Settings"]

export default function EditHotelPage() {
  const { hotelId } = useParams()
  const [tab, setTab] = useState(tabs[0])
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title={`Edit Hotel: ${hotel.name}`} subtitle="Update hotel information">
        <Link to={`/owner/hotels/${hotel.id}`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save Changes</Button>
      </OwnerPageHeader>

      <div className="flex gap-6">
        <div className="hidden w-56 shrink-0 lg:block">
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                  tab === t ? "bg-neutral-900 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-w-0 flex-1">
          {tab === "Basic Information" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-foreground">Hotel name</label>
                    <input defaultValue={hotel.name} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Property type</label>
                    <select defaultValue={hotel.propertyType} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                      <option>Luxury Hotel</option><option>Boutique Hotel</option><option>Resort</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Star rating</label>
                    <select defaultValue={hotel.stars} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                      <option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Total rooms</label>
                    <input defaultValue={hotel.totalRooms} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Status</label>
                    <select defaultValue={hotel.status} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                      <option value="active">Active</option><option value="inactive">Inactive</option><option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "Contact & Location" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-foreground">Address</label>
                    <input defaultValue={hotel.address} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">City</label>
                    <input defaultValue={hotel.city} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Country</label>
                    <input defaultValue={hotel.country} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Phone</label>
                    <input defaultValue={hotel.phone} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Email</label>
                    <input defaultValue={hotel.email} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-foreground">Website</label>
                    <input defaultValue={hotel.website} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "Description" && (
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Short description</label>
                  <textarea defaultValue={hotel.shortDescription} rows={2} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Long description</label>
                  <textarea defaultValue={hotel.longDescription} rows={6} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50" />
                </div>
              </div>
            </div>
          )}

          {tab === "Settings" && (
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Check-in time</label>
                  <input defaultValue={hotel.checkInTime} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Check-out time</label>
                  <input defaultValue={hotel.checkOutTime} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
