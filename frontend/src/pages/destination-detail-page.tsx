import { useState } from "react"
import { Link, useParams } from "react-router"
import { MapPin, Star, Heart, Share2, Clock, Globe, Languages, Sun, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/custom/shared/SectionHeader"
import { HotelCard } from "@/components/custom/shared/HotelCard"
import { MapPreview } from "@/components/custom/shared/MapPreview"
import { destinations } from "@/data/destinations"
import { hotels } from "@/data/hotels"
import { offers } from "@/data/offers"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

const tabs = ["Overview", "Hotels", "Offers", "Itinerary Ideas", "Travel Tips", "Reviews"]

export default function DestinationDetailPage() {
  const { slug } = useParams()
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return <NotFoundState />
  const destHotels = hotels.filter((h) => h.city.toLowerCase() === dest.name.toLowerCase() || h.country === dest.country)
  const destOffers = offers.slice(0, 2)
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-foreground">Destinations</Link>
          <span>/</span>
          <span className="text-foreground">{dest.name}</span>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pb-8">
        <div className="relative overflow-hidden rounded-[2rem] min-h-[400px] lg:min-h-[450px]">
          <img src={dest.image} alt={dest.name} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-white lg:text-5xl">{dest.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><MapPin className="size-4" />{dest.country}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {dest.rating}
              </span>
              <span>·</span>
              <span>{dest.propertyCount.toLocaleString()} properties</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30">
                <Heart className="size-4" />
              </button>
              <button className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30">
                <Share2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative">
          <div className="hidden rounded-2xl border border-border bg-white p-5 shadow-lg lg:absolute lg:right-0 lg:top-0 lg:block lg:w-72">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${destHotels[0]?.pricePerNight ?? 200}</span>
              <span className="text-sm text-muted-foreground">/avg per night</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">From top-rated properties</p>
            <Button className="mt-4 h-10 w-full rounded-xl text-sm font-semibold">
              Check availability
            </Button>
            <Button variant="outline" className="mt-2 h-10 w-full rounded-xl text-sm">
              Contact us
            </Button>
          </div>

          <div className="lg:pr-80">
            <p className="text-base leading-relaxed text-muted-foreground">{dest.description}</p>

            <div className="mt-5 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground">
                <Sun className="size-3.5" />
                Best: {dest.bestTimeToVisit}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground">
                <Globe className="size-3.5" />
                {dest.currency}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground">
                <Languages className="size-3.5" />
                {dest.language}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground">
                <Clock className="size-3.5" />
                {dest.timeZone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pt-10">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-neutral-900 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {activeTab === "Overview" && (
        <section className="py-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="lg:pr-80">
              <h2 className="text-xl font-semibold text-foreground">Why visit {dest.name}</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Star, title: "Rich Culture", desc: "Immerse yourself in centuries of history, art, and traditions that make this destination unique." },
                  { icon: MapPin, title: "Iconic Landmarks", desc: "Explore world-famous attractions and hidden gems that define the character of this destination." },
                  { icon: Sun, title: "Perfect Climate", desc: `Enjoy ideal weather conditions with the best travel period being ${dest.bestTimeToVisit.toLowerCase()}.` },
                  { icon: CheckCircle2, title: "Premium Stays", desc: `Choose from ${dest.propertyCount.toLocaleString()} handpicked properties ranging from luxury hotels to private villas.` },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-white p-5">
                    <item.icon className="size-6 text-foreground" />
                    <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <hr className="my-8 border-border" />

              <SectionHeader title="Top hotels in this destination" viewAllLink={`/hotels?destination=${dest.slug}`} />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {destHotels.slice(0, 2).map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Hotels" && (
        <section className="py-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "Offers" && (
        <section className="py-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="lg:pr-80">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {destOffers.map((offer) => (
                  <div key={offer.id} className="relative overflow-hidden rounded-2xl min-h-[220px]">
                    <img src={offer.image} alt={offer.title} className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-5">
                      <span className="mb-1 inline-block w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm uppercase">
                        {offer.badge}
                      </span>
                      <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                      <p className="text-2xl font-extrabold text-white">{offer.discount}</p>
                      <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-neutral-900">
                        {offer.cta}
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Travel Tips" && (
        <section className="py-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="lg:pr-80">
              <div className="space-y-3">
                {[
                  { q: "What is the best time to visit?", a: `The best time to visit ${dest.name} is during ${dest.bestTimeToVisit}.` },
                  { q: "What currency is used?", a: `The local currency is the ${dest.currency}. Credit cards are widely accepted in hotels and restaurants.` },
                  { q: "What language do they speak?", a: `The official language is ${dest.language}. English is commonly spoken in tourist areas.` },
                  { q: "Do I need a visa?", a: "Visa requirements vary by nationality. Please check with your local embassy for the most up-to-date information." },
                ].map((faq) => (
                  <details key={faq.q} className="group rounded-2xl border border-border bg-white">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-foreground">
                      {faq.q}
                      <ArrowRight className="size-4 text-muted-foreground transition group-open:rotate-90" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="lg:pr-80">
            <h2 className="text-xl font-semibold text-foreground">Location</h2>
            <MapPreview lat={dest.coordinates.lat} lng={dest.coordinates.lng} location={`${dest.name}, ${dest.country}`} className="mt-4" />
          </div>
        </div>
      </section>
    </div>
  )
}
