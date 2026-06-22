import { Link, useParams } from "react-router"
import { MapPin, Star, Heart, Share2, Wifi, Waves, Dumbbell, Utensils, Sparkles, CheckCircle2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "@/components/custom/shared/ReviewCard"
import { MapPreview } from "@/components/custom/shared/MapPreview"
import { StatsCard } from "@/components/custom/shared/StatsCard"
import { hotels } from "@/data/hotels"
import { getRoomsByHotelId } from "@/data/rooms"
import { reviews } from "@/data/reviews"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi, pool: Waves, spa: Sparkles, gym: Dumbbell,
  restaurant: Utensils, bar: Utensils,
}

function getAmenityIcon(name: string) {
  const Icon = amenityIcons[name]
  return Icon ? <Icon className="size-5" /> : null
}

export default function HotelProfilePage() {
  const { hotelId } = useParams()
  const hotel = hotels.find((h) => h.slug === hotelId)
  if (!hotel) return <NotFoundState />
  const hotelRooms = getRoomsByHotelId(hotel.id)
  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[400px] overflow-hidden">
        <img src={hotel.images[0]} alt={hotel.name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-[1200px]">
            <h1 className="text-4xl font-bold text-white lg:text-5xl">{hotel.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {hotel.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {hotel.rating}
              </span>
              <span>·</span>
              <span>{hotel.reviewCount} reviews</span>
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
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="rounded-2xl bg-white p-5 shadow-xl w-64">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${hotel.pricePerNight}</span>
              <span className="text-sm text-muted-foreground">/per night</span>
            </div>
            <Button className="mt-3 h-10 w-full rounded-xl text-sm font-semibold">
              Check availability
            </Button>
            <Button variant="outline" className="mt-2 h-10 w-full rounded-xl text-sm">
              <Phone className="size-4" />
              Contact hotel
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-3 gap-4 -mt-8 relative z-10">
          <StatsCard value={hotelRooms.length.toString()} label="Rooms & Suites" />
          <StatsCard value={hotel.rating.toString()} label="Guest Rating" />
          <StatsCard value={hotel.reviewCount.toString()} label="Verified Reviews" />
        </div>
      </div>

      <section className="py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-xl font-semibold text-foreground">Top amenities</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {hotel.amenities.map((a) => (
              <div key={a} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-5 text-center">
                {getAmenityIcon(a)}
                <span className="text-xs font-medium text-foreground">
                  {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Rooms & Suites</h2>
            <Link to={`/hotels/${hotel.slug}`} className="text-sm font-medium text-foreground underline-offset-2 hover:underline">
              View all rooms
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotelRooms.slice(0, 3).map((room) => (
              <Link key={room.id} to={`/hotels/${hotel.slug}/rooms/${room.slug}`}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={room.images[0]} alt={room.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{room.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{room.shortDescription}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Up to {room.maxGuests} guests</span>
                      <span>·</span>
                      <span>{room.bedType}</span>
                      <span>·</span>
                      <span>{room.size}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <div>
                        <span className="text-lg font-bold text-foreground">${room.pricePerNight}</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                      <span className="text-sm font-medium text-foreground underline-offset-2 group-hover:underline">
                        Book now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">Guest reviews</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2 py-1 text-sm font-semibold text-white">
                <Star className="size-4 fill-current" />
                {hotel.rating}
              </span>
              <span className="text-sm text-muted-foreground">{hotel.reviewCount} reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hotelReviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-xl font-semibold text-foreground">Location</h2>
          <p className="mt-2 text-sm text-muted-foreground">{hotel.location}</p>
          <MapPreview lat={hotel.coordinates.lat} lng={hotel.coordinates.lng} location={hotel.location} className="mt-4" />
        </div>
      </section>

      <section className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-xl font-semibold text-foreground">House rules</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Check-in", value: "3:00 PM - 12:00 AM" },
              { label: "Check-out", value: "11:00 AM" },
              { label: "Cancellation", value: "Free up to 48 hours" },
              { label: "Children", value: "Welcome" },
              { label: "Pets", value: "Not allowed" },
              { label: "Parties", value: "Not allowed" },
            ].map((rule) => (
              <div key={rule.label} className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
                <span className="text-sm text-muted-foreground">{rule.label}</span>
                <span className="text-sm font-medium text-foreground">{rule.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-xl font-semibold text-foreground">Why guests love us</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Sparkles, title: "Exceptional Service", desc: "Our staff is trained to anticipate your every need with warm hospitality." },
              { icon: MapPin, title: "Prime Location", desc: "Situated in the most desirable neighborhoods with easy access to attractions." },
              { icon: CheckCircle2, title: "Premium Quality", desc: "Every detail from bedding to amenities is curated for your comfort." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                <item.icon className="size-8 text-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">Contact {hotel.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Have questions? Reach out to us directly.</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="size-4" />
                  +1 (555) 123-4567
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="size-4" />
                  info@{hotel.slug}.com
                </span>
              </div>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button className="h-10 rounded-full px-5 text-sm font-semibold">
                <Phone className="size-4" />
                Call hotel
              </Button>
              <Button variant="outline" className="h-10 rounded-full px-5 text-sm">
                <Mail className="size-4" />
                Send email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
