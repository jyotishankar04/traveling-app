import { useState, useMemo } from "react"
import { CalendarIcon, UserRound, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SectionHeader } from "@/components/custom/shared/SectionHeader"
import { DestinationCard } from "@/components/custom/shared/DestinationCard"
import { destinations } from "@/data/destinations"
import { offers } from "@/data/offers"

const regions = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"]
const regionMap: Record<string, string[]> = {
  Europe: ["France", "Greece", "Switzerland", "United Kingdom", "Italy"],
  Asia: ["Indonesia", "India", "Japan", "Maldives"],
  Americas: ["United States"],
}

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("All")
  const [search, setSearch] = useState("")
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [priceRanges, setPriceRanges] = useState<string[]>([])

  const filtered = useMemo(() => {
    let result = activeRegion === "All" ? [...destinations] : destinations.filter((d) =>
      regionMap[activeRegion]?.includes(d.country)
    )

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((d) =>
        d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
      )
    }

    return result
  }, [activeRegion, search])

  return (
    <div className="min-h-screen bg-background">
      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            All Destinations
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Discover extraordinary places to stay around the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <InputGroup className="h-12 max-w-xs rounded-xl border-border bg-muted/50 shadow-none">
              <InputGroupAddon>
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search destinations..."
                className="text-sm placeholder:text-muted-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <button className="flex h-12 items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 text-sm text-muted-foreground">
              <CalendarIcon className="size-4" />
              Check-in — Check-out
            </button>
            <button className="flex h-12 items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 text-sm text-muted-foreground">
              <UserRound className="size-4" />
              2 guests
            </button>
            <Button className="h-12 rounded-xl px-6 text-sm font-semibold">
              Search
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex gap-8">
            <aside className="hidden w-56 shrink-0 lg:block">
              <h3 className="text-sm font-semibold text-foreground">Region</h3>
              <div className="mt-3 space-y-1">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      activeRegion === region
                        ? "bg-neutral-900 font-medium text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <hr className="my-5 border-border" />

              <h3 className="text-sm font-semibold text-foreground">Property type</h3>
              <div className="mt-3 space-y-2">
                {["Hotels", "Villas", "Apartments", "Resorts", "Cottages"].map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <Checkbox
                      id={`dest-prop-${type.toLowerCase()}`}
                      checked={propertyTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) setPropertyTypes([...propertyTypes, type])
                        else setPropertyTypes(propertyTypes.filter((t) => t !== type))
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>

              <hr className="my-5 border-border" />

              <h3 className="text-sm font-semibold text-foreground">Price range</h3>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Budget", value: "$0 - $100" },
                  { label: "Mid-range", value: "$100 - $300" },
                  { label: "Luxury", value: "$300 - $500" },
                  { label: "Ultra-luxury", value: "$500+" },
                ].map((item) => (
                  <label key={item.label} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <Checkbox
                      id={`dest-price-${item.label.toLowerCase()}`}
                      checked={priceRanges.includes(item.label)}
                      onCheckedChange={(checked) => {
                        if (checked) setPriceRanges([...priceRanges, item.label])
                        else setPriceRanges(priceRanges.filter((p) => p !== item.label))
                      }}
                    />
                    {item.value}
                  </label>
                ))}
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> destinations found
                </p>
                <div className="flex items-center gap-2">
                  {regions.slice(0, 5).map((region) => (
                    <button
                      key={region}
                      onClick={() => setActiveRegion(region)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        activeRegion === region
                          ? "bg-neutral-900 text-white"
                          : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionHeader title="Seasonal offers" subtitle="Limited-time deals on top destinations." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <div key={offer.id} className="relative overflow-hidden rounded-2xl min-h-[220px]">
                <img src={offer.image} alt={offer.title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-5">
                  <span className="mb-1 inline-block w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm uppercase">
                    {offer.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                  <p className="text-2xl font-extrabold text-white">{offer.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionHeader title="Travel inspiration" subtitle="Discover guides, tips, and stories from our travelers." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "10 Best Beach Destinations for 2026",
                image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
                date: "Jun 15, 2026",
                readTime: "5 min read",
              },
              {
                title: "Luxury Travel on a Budget: Insider Tips",
                image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
                date: "Jun 10, 2026",
                readTime: "8 min read",
              },
              {
                title: "The Ultimate Guide to Villa Rentals",
                image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
                date: "Jun 5, 2026",
                readTime: "6 min read",
              },
            ].map((post, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.image} alt={post.title} className="size-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{post.date} · {post.readTime}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
