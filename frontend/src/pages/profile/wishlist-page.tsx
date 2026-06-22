import { Link } from "react-router"
import { Heart, MapPin, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { wishlist } from "@/data/wishlist"
import { hotels } from "@/data/hotels"

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">Wishlist</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Saved Stays</h1>
        <span className="text-sm text-muted-foreground">{wishlist.length} hotels saved</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-14 text-center">
          <Heart className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">Save hotels you love and come back to them later.</p>
          <Link to="/hotels"><Button className="mt-4 rounded-full">Explore hotels</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((item) => {
            const hotel = hotels.find((h) => h.id === item.hotelId)
            if (!hotel) return null
            return (
              <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:shadow-md">
                <div className="relative">
                  <img src={hotel.images[0]} alt={hotel.name} className="h-48 w-full object-cover" />
                  <button className="absolute right-3 top-3 rounded-full bg-white/80 p-1.5 text-muted-foreground backdrop-blur-sm transition hover:bg-white hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                  <Badge className="absolute left-3 bottom-3 bg-white/80 text-xs text-foreground backdrop-blur-sm">
                    ${hotel.pricePerNight}/night
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {hotel.location}
                  </div>
                  <h3 className="mt-1 font-semibold text-foreground">{hotel.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                      <Star className="size-3 fill-current" />
                      {hotel.rating}
                    </span>
                    <span className="text-muted-foreground">{hotel.reviewCount} reviews</span>
                  </div>
                  <Link to={`/hotels/${item.hotelId}`}>
                    <Button className="mt-3 w-full rounded-full text-xs" size="sm">View hotel</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
