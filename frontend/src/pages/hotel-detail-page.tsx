import { Link, useParams } from "react-router"
import { MapPin, Star, Heart, Share2, CheckCircle2, Wifi, Waves, Dumbbell, Utensils, Wine, Sparkles, Car, Snowflake, Coffee, Bell, Shirt, Bus, Presentation, Tv, Refrigerator, Eye, Sun, PawPrint, Smile, Umbrella } from "lucide-react"
import { GalleryGrid } from "@/components/custom/shared/GalleryGrid"
import { MapPreview } from "@/components/custom/shared/MapPreview"
import { RoomOptionCard } from "@/components/custom/shared/RoomOptionCard"
import { ReviewCard } from "@/components/custom/shared/ReviewCard"
import { BookingSidebar } from "@/components/custom/shared/BookingSidebar"
import { hotels } from "@/data/hotels"
import { getRoomsByHotelId } from "@/data/rooms"
import { reviews } from "@/data/reviews"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi, pool: Waves, spa: Sparkles, gym: Dumbbell, parking: Car,
  ac: Snowflake, restaurant: Utensils, bar: Wine, breakfast: Coffee,
  "room-service": Bell, laundry: Shirt, "airport-shuttle": Bus,
  conference: Presentation, tv: Tv, "mini-bar": Refrigerator,
  "ocean-view": Eye, balcony: Sun, "pet-friendly": PawPrint,
  "kids-club": Smile, "beach-access": Umbrella,
}

function getAmenityIcon(name: string) {
  const Icon = amenityIcons[name]
  return Icon ? <Icon className="size-4" /> : null
}

export default function HotelDetailPage() {
  const { hotelId } = useParams()
  const hotel = hotels.find((h) => h.slug === hotelId)
  if (!hotel) return <NotFoundState />
  const hotelRooms = getRoomsByHotelId(hotel.id)
  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/hotels" className="hover:text-foreground">Hotels</Link>
          <span>/</span>
          <span className="text-foreground">{hotel.name}</span>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pb-6">
        <GalleryGrid images={hotel.images} alt={hotel.name} />
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{hotel.name}</h1>
                  {hotel.bestSeller && (
                    <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white whitespace-nowrap">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
              </div>
              <div className="flex items-center gap-2">
                <button className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground">
                  <Heart className="size-4" />
                </button>
                <button className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground">
                  <Share2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground">
                  {getAmenityIcon(a)}
                  {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ))}
            </div>

            <hr className="my-6 border-border" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">About this property</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{hotel.description}</p>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 font-medium text-green-700">
                <CheckCircle2 className="size-4" />
                Free cancellation
              </span>
              <span className="flex items-center gap-1.5 font-medium text-green-700">
                <CheckCircle2 className="size-4" />
                No prepayment needed
              </span>
            </div>

            <hr className="my-6 border-border" />

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Available rooms</h2>
                <Link to={`/hotels/${hotel.slug}/rooms`} className="text-sm font-medium text-foreground underline-offset-2 hover:underline">
                  View all rooms
                </Link>
              </div>
              <div className="mt-4 space-y-4">
                {hotelRooms.slice(0, 2).map((room) => (
                  <Link key={room.id} to={`/hotels/${hotel.slug}/rooms/${room.slug}`} className="block">
                    <RoomOptionCard room={room} />
                  </Link>
                ))}
              </div>
            </div>

            <hr className="my-6 border-border" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Guest reviews</h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2 py-1 text-sm font-semibold text-white">
                  <Star className="size-4 fill-current" />
                  {hotel.rating}
                </span>
                <span className="text-sm text-muted-foreground">{hotel.reviewCount} reviews</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {hotelReviews.slice(0, 4).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>

            <hr className="my-6 border-border" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Hotel policies</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium text-foreground">3:00 PM - 12:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium text-foreground">11:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Cancellation</span>
                  <span className="font-medium text-foreground">Free up to 48 hours</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Children</span>
                  <span className="font-medium text-foreground">Welcome. Extra bed available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pets</span>
                  <span className="font-medium text-foreground">Not allowed</span>
                </div>
              </div>
            </div>

            <hr className="my-6 border-border" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Popular amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {hotel.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getAmenityIcon(a)}
                    {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-6 border-border" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Location</h2>
              <p className="mt-2 text-sm text-muted-foreground">{hotel.location}</p>
              <MapPreview lat={hotel.coordinates.lat} lng={hotel.coordinates.lng} location={hotel.location} className="mt-4" />
            </div>
          </div>

          <div className="w-full lg:w-96 lg:shrink-0">
            <BookingSidebar pricePerNight={hotel.pricePerNight} currency={hotel.currency} />
          </div>
        </div>
      </section>
    </div>
  )
}
