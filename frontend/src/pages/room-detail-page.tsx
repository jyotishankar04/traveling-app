import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { format } from "date-fns"
import { Users, BedDouble, Maximize, Eye, Wifi, Snowflake, Tv, Refrigerator, Bell, Sun, CheckCircle2, CalendarIcon, Heart, ChevronLeft, ChevronRight, Waves, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ReviewCard } from "@/components/custom/shared/ReviewCard"
import { hotels } from "@/data/hotels"
import { rooms } from "@/data/rooms"
import { reviews } from "@/data/reviews"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi, ac: Snowflake, tv: Tv, "mini-bar": Refrigerator,
  "room-service": Bell, balcony: Sun, "ocean-view": Eye, pool: Waves,
}

function getAmenityIcon(name: string) {
  const Icon = amenityIcons[name]
  return Icon ? <Icon className="size-4" /> : null
}

export default function RoomDetailPage() {
  const { hotelId, roomTypeId } = useParams()
  const hotel = hotels.find((h) => h.slug === hotelId)
  if (!hotel) return <NotFoundState />
  const room = rooms.find((r) => r.slug === roomTypeId && r.hotelId === hotel.id)
  if (!room) return <NotFoundState />
  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id)
  const navigate = useNavigate()
  const [imgIndex, setImgIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("Overview")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guestCount, setGuestCount] = useState(2)

  const symbol = room.currency === "EUR" ? "€" : room.currency === "GBP" ? "£" : "$"

  const next = () => setImgIndex((i) => (i + 1) % room.images.length)
  const prev = () => setImgIndex((i) => (i - 1 + room.images.length) % room.images.length)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/hotels" className="hover:text-foreground">Hotels</Link>
          <span>/</span>
          <Link to={`/hotels/${hotel.slug}`} className="hover:text-foreground">{hotel.name}</Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pb-6">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={room.images[imgIndex]}
            alt={room.name}
            className="aspect-[21/9] w-full object-cover"
          />
          {room.images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white">
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {room.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={cn("size-2 rounded-full transition", i === imgIndex ? "bg-white" : "bg-white/50")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-14">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{room.name}</h1>
                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">Popular</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><BedDouble className="size-4" />{room.bedType}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Maximize className="size-4" />{room.size}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Eye className="size-4" />{room.view}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-3xl font-bold text-foreground">{symbol}{room.pricePerNight}</div>
                <div className="text-sm text-muted-foreground">per night</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {room.amenities.map((a) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground">
                  {getAmenityIcon(a)}
                  {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ))}
            </div>

            <hr className="my-6 border-border" />

            <div>
              <div className="flex gap-1 border-b border-border">
                {["Overview", "Amenities", "Policies", `Reviews (${hotelReviews.length})`].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.replace(/ \(.*\)/, ""))}
                    className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                      activeTab === tab.replace(/ \(.*\)/, "")
                        ? "border-neutral-900 text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Overview" && (
                <div className="pt-6">
                  <p className="leading-relaxed text-muted-foreground">{room.description}</p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Premium bedding with 1000-thread count Egyptian cotton sheets",
                      "Smart room controls with tablet interface",
                      "Complimentary welcome champagne and fresh fruit",
                      "Access to executive lounge with complimentary refreshments",
                      "Turndown service with artisanal chocolates",
                    ].map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                        <span className="text-sm text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Amenities" && (
                <div className="pt-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {room.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getAmenityIcon(a)}
                        <span>{a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Policies" && (
                <div className="pt-6">
                  <div className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="text-sm font-semibold text-foreground">Cancellation policy</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{room.cancellationPolicy}</p>
                    <hr className="my-4 border-border" />
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-in</span>
                        <span className="font-medium text-foreground">3:00 PM - 12:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-out</span>
                        <span className="font-medium text-foreground">11:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Board basis</span>
                        <span className="font-medium text-foreground">{room.boardBasis}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Reviews" && (
                <div className="pt-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {hotelReviews.slice(0, 4).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-96 lg:shrink-0">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{symbol}{room.pricePerNight}</span>
                  <span className="text-sm text-muted-foreground">/per night</span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Check-in — Check-out</label>
                    <Popover>
                      <PopoverTrigger className="mt-1 flex h-12 w-full items-center gap-3 rounded-xl bg-muted/70 px-4 text-sm text-muted-foreground data-[popover-open]:border data-[popover-open]:border-foreground">
                        <CalendarIcon className="size-4 shrink-0" />
                        <span className={cn(!dateRange?.from && "text-muted-foreground")}>
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>{format(dateRange.from, "MMM d")} — {format(dateRange.to, "MMM d")}</>
                            ) : (
                              format(dateRange.from, "MMM d")
                            )
                          ) : (
                            "Select dates"
                          )}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Guests</label>
                    <div className="mt-1 flex h-12 items-center justify-between rounded-xl bg-muted/70 px-4">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="size-4" />
                        {guestCount} guest{guestCount > 1 ? "s" : ""}
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setGuestCount((v) => Math.max(1, v - 1))} className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold text-foreground">{guestCount}</span>
                        <button onClick={() => setGuestCount((v) => v + 1)} className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground">
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <input type="radio" name="rate" defaultChecked className="accent-neutral-900" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Standard Rate</p>
                      <p className="text-xs text-muted-foreground">{symbol}{room.pricePerNight} per night · {room.boardBasis}</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <input type="radio" name="rate" className="accent-neutral-900" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Non-Refundable</p>
                      <p className="text-xs text-muted-foreground">{symbol}{room.pricePerNight - 50} per night · Save 10%</p>
                    </div>
                  </label>
                </div>

                <Button className="mt-4 h-12 w-full rounded-xl text-sm font-semibold" onClick={() => navigate("/booking/checkout")}>
                  Book now
                </Button>

                <div className="mt-3">
                  <Button variant="outline" className="h-12 w-full rounded-xl">
                    <Heart className="size-4" />
                    Save for later
                  </Button>
                </div>

                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="size-4 text-green-600" />
                    Free cancellation
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="size-4 text-green-600" />
                    No prepayment needed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
