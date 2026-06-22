import { useState } from "react"
import { useParams, Link } from "react-router"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { HotelStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { EmptyState } from "@/components/custom/owner/EmptyState"
import { ownerRooms } from "@/data/owner/owner-rooms"
import { ownerHotels } from "@/data/owner/owner-hotels"

export default function RoomsListPage() {
  const { hotelId } = useParams()
  const [tab, setTab] = useState("All")
  const hotel = ownerHotels.find((h) => h.id === hotelId) ?? ownerHotels[0]
  const rooms = ownerRooms.filter((r) => r.hotelId === hotelId)

  const filtered = tab === "All" ? rooms : tab === "Active" ? rooms.filter((r) => r.status === "active") : rooms.filter((r) => r.status === "inactive")

  if (rooms.length === 0) {
    return (
      <div>
        <OwnerPageHeader title={`Rooms: ${hotel.name}`} subtitle="Manage all room types.">
          <Link to={`/owner/hotels/${hotel.id}/rooms/new`}><Button className="rounded-full"><Plus className="size-4" />Add Room Type</Button></Link>
        </OwnerPageHeader>
        <EmptyState title="No rooms yet" description="Add room types for this property." action={<Link to={`/owner/hotels/${hotel.id}/rooms/new`}><Button className="rounded-full">Add Room Type</Button></Link>} />
      </div>
    )
  }

  return (
    <div>
      <OwnerPageHeader title={`Rooms: ${hotel.name}`} subtitle="Manage all room types for your property.">
        <Link to={`/owner/hotels/${hotel.id}/rooms/new`}><Button className="rounded-full"><Plus className="size-4" />Add Room Type</Button></Link>
      </OwnerPageHeader>

      <div className="mb-4 flex gap-1 border-b border-border">
        {["All", "Active", "Inactive"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              tab === t ? "border-neutral-900 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <OwnerDataTable headers={["Room Type", "Capacity", "Bed Type", "Price/Night", "Available", "Status", ""]}>
          {filtered.map((r) => (
            <tr key={r.id} className="transition hover:bg-muted/30">
              <td className="px-4 py-3">
                <Link to={`/owner/hotels/${hotel.id}/rooms/${r.id}`} className="flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-xl">
                    <img src={r.images[0]} alt={r.name} className="size-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.capacity} guests</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.bedType}</td>
              <td className="px-4 py-3 text-sm font-semibold text-foreground">${r.basePrice}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.availableUnits}/{r.totalUnits}</td>
              <td className="px-4 py-3"><HotelStatusBadge status={r.status} /></td>
              <td className="px-4 py-3">
                <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
                  <MoreHorizontal className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </OwnerDataTable>
      </div>
    </div>
  )
}
