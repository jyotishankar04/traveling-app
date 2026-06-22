import { useState } from "react"
import { useParams, Link } from "react-router"
import { Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { amenityCategories, selectedAmenities as defaultSelected } from "@/data/owner/owner-amenities"
import { ownerHotels } from "@/data/owner/owner-hotels"

export default function AmenitiesPage() {
  const { hotelId } = useParams()
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />
  const [category, setCategory] = useState(amenityCategories[0].id)
  const [selected, setSelected] = useState<string[]>(defaultSelected)
  const [search, setSearch] = useState("")

  const cat = amenityCategories.find((c) => c.id === category)
  const filtered = cat?.amenities.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase())
  ) || []

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <OwnerPageHeader
        title="Amenities"
        subtitle={`Select and manage amenities for ${hotel.name}`}
      >
        <Link to={`/owner/hotels/${hotel.id}`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save Amenities</Button>
      </OwnerPageHeader>

      <div className="flex gap-6">
        <div className="hidden w-48 shrink-0 lg:block">
          <nav className="space-y-1">
            {amenityCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                  category === c.id ? "bg-neutral-900 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search amenities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-input bg-white pl-9 pr-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="space-y-1">
              {filtered.map((a) => (
                <label key={a.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-muted/50">
                  <div
                    onClick={() => toggle(a.id)}
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${
                      selected.includes(a.id) ? "border-neutral-900 bg-neutral-900 text-white" : "border-border"
                    }`}
                  >
                    {selected.includes(a.id) && <Check className="size-3" />}
                  </div>
                  <span className="text-sm text-foreground">{a.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-white p-5">
            <h4 className="text-sm font-semibold text-foreground">
              Selected Amenities ({selected.length})
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {selected.map((id) => {
                const all = amenityCategories.flatMap((c) => c.amenities)
                const a = all.find((x) => x.id === id)
                return a ? (
                  <span key={id} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-foreground">
                    {a.label}
                    <button onClick={() => toggle(id)} className="ml-0.5 text-muted-foreground hover:text-foreground">&times;</button>
                  </span>
                ) : null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
