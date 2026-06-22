import { useParams, Link } from "react-router"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerRooms } from "@/data/owner/owner-rooms"

export default function RoomPricingPage() {
  const { hotelId, roomTypeId } = useParams()
  const room = ownerRooms.find((r) => r.id === roomTypeId)
  if (!room) return <NotFoundState />

  return (
    <div>
      <OwnerPageHeader title={`${room.name} Pricing`} subtitle="Manage room pricing">
        <Link to={`/owner/hotels/${hotelId}/rooms/${room.id}`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save Pricing</Button>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Base Pricing</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Base price per night</label>
                  <input defaultValue={room.basePrice} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Currency</label>
                  <select defaultValue={room.currency} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                    <option>USD</option><option>EUR</option><option>GBP</option><option>CHF</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Weekend price per night</label>
                  <input defaultValue={room.weekendPrice} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Extra guest price</label>
                  <input defaultValue={room.extraGuestPrice} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Taxes & Fees</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Service tax (%)</label>
                  <input defaultValue={8} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">City tax ($)</label>
                  <input defaultValue={5} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Cleaning fee ($)</label>
                  <input defaultValue={25} type="number" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Policies</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Minimum stay (nights)</label>
                <input type="number" defaultValue={1} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Cancellation policy</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                  <option>Flexible</option><option>Moderate</option><option>Strict</option><option>Non-refundable</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Price Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Base price</span><span className="font-semibold text-foreground">${room.basePrice}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Weekend</span><span className="font-semibold text-foreground">${room.weekendPrice}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Extra guest</span><span className="font-semibold text-foreground">${room.extraGuestPrice}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between"><span className="text-muted-foreground">Avg weekly</span><span className="font-semibold text-foreground">${Math.round((room.basePrice * 5 + room.weekendPrice * 2) / 7)}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 font-semibold text-foreground">Seasonal Pricing</h3>
            <p className="text-sm text-muted-foreground">Set different prices for peak seasons, holidays, and events.</p>
            <Button variant="outline" className="mt-3 w-full rounded-xl">Manage Seasons</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
