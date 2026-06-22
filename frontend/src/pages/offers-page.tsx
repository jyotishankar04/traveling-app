import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { publicOffers } from "@/data/public-offers"

const offerTypes = ["All", "Seasonal", "Flash", "Welcome", "Loyalty"] as const

export default function OffersPage() {
  const [activeType, setActiveType] = useState("All")

  const featured = publicOffers.filter((o) => o.featured)
  const filtered =
    activeType === "All"
      ? publicOffers
      : publicOffers.filter((o) => o.type === activeType.toLowerCase())

  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
        <img
          src={publicOffers[0].image}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
            Offers & Discounts
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Exclusive deals and limited-time offers on luxury stays worldwide.
          </p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-[1200px] px-4">
            <h2 className="text-2xl font-bold text-foreground">Featured Offers</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featured.map((offer) => (
                <Link
                  key={offer.id}
                  to={`/offers/${offer.id}`}
                  className="group relative overflow-hidden rounded-2xl min-h-[340px]"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-6">
                    <Badge
                      variant="secondary"
                      className="mb-3 w-fit border-0 bg-white/20 text-white backdrop-blur-sm"
                    >
                      {offer.badge}
                    </Badge>
                    <p className="text-4xl font-extrabold text-white">{offer.discount}</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{offer.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/70">{offer.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white">
                      View Deal
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">All Offers</h2>
            <div className="flex flex-wrap items-center gap-2">
              {offerTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    activeType === type
                      ? "bg-neutral-900 text-white"
                      : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((offer) => (
              <Link
                key={offer.id}
                to={`/offers/${offer.id}`}
                className="group rounded-2xl border border-border bg-white transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 border-0 bg-white/90 text-foreground backdrop-blur-sm"
                  >
                    {offer.badge}
                  </Badge>
                </div>
                <div className="p-4">
                  <p className="text-2xl font-extrabold text-foreground">{offer.discount}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{offer.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {offer.destination}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {offer.startDate} — {offer.endDate}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {offer.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Terms & conditions apply to all offers. Offers subject to availability.
          </p>
        </div>
      </section>
    </div>
  )
}
