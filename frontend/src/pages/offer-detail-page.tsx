import { Link, useParams } from "react-router"
import { ArrowLeft, MapPin, Clock, Building2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { publicOffers } from "@/data/public-offers"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function OfferDetailPage() {
  const { offerId } = useParams()
  const offer = publicOffers.find((o) => o.id === offerId)
  if (!offer) return <NotFoundState />
  const related = publicOffers.filter((o) => o.id !== offer.id).slice(0, 3)

  const isLimited = offer.type === "flash" || offer.type === "seasonal"

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-4">
        <Link
          to="/offers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to offers
        </Link>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pb-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={offer.gallery[0] || offer.image}
            alt={offer.title}
            className="h-[420px] w-full object-cover lg:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="border-0 bg-white/20 text-white backdrop-blur-sm"
              >
                {offer.badge}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 text-white/90"
              >
                {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
              </Badge>
            </div>
            <p className="mt-4 text-5xl font-extrabold text-white lg:text-6xl">
              {offer.discount}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 lg:w-2/3">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
              {offer.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{offer.tagline}</p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {offer.longDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <FileText className="size-5" />
                Terms & Conditions
              </h2>
              <ul className="mt-4 space-y-3">
                {offer.terms.map((term, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Building2 className="size-5" />
                Participating Hotels
              </h2>
              <div className="mt-4 space-y-2">
                {offer.hotelNames.map((hotel) => (
                  <div
                    key={hotel}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground"
                  >
                    <div className="size-2 rounded-full bg-neutral-900" />
                    {hotel}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Discount</p>
              <p className="text-4xl font-extrabold text-foreground">{offer.discount}</p>

              <hr className="my-4 border-border" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0" />
                  <span>
                    {formatDate(offer.startDate)} — {formatDate(offer.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  <span>{offer.destination}</span>
                </div>
              </div>

              <hr className="my-4 border-border" />

              <Button className="w-full rounded-full py-6 text-base font-semibold">
                Book Now
              </Button>

              {isLimited && (
                <p className="mt-3 text-center text-xs font-medium text-amber-600">
                  Limited time offer
                </p>
              )}

              <p className="mt-2 text-center text-xs text-muted-foreground">
                {offer.terms.length} term{offer.terms.length !== 1 ? "s" : ""} & conditions apply
              </p>
            </div>
          </div>
        </div>
      </section>

      {offer.gallery.length > 1 && (
        <section className="pb-12">
          <div className="mx-auto max-w-[1200px] px-4">
            <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
              {offer.gallery.slice(1).map((img, i) => (
                <div key={i} className="overflow-hidden rounded-2xl">
                  <img
                    src={img}
                    alt={`${offer.title} gallery ${i + 1}`}
                    className="h-48 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-border bg-white py-12">
          <div className="mx-auto max-w-[1200px] px-4">
            <h2 className="text-xl font-semibold text-foreground">More Offers</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/offers/${r.id}`}
                  className="group rounded-2xl border border-border bg-white transition hover:shadow-lg"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-extrabold text-foreground">{r.discount}</p>
                    <h3 className="mt-1 font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.destination}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
