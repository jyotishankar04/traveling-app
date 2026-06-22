import { useState, useMemo, useEffect } from "react"
import { MapPin, CalendarIcon, UserRound, SlidersHorizontal, ChevronDown, LayoutGrid, List, ArrowRight, ShieldCheck, RotateCcw, HeadphonesIcon, Lock, X } from "lucide-react"
import { Link } from "react-router"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { HotelListCard } from "@/components/custom/shared/HotelListCard"
import { HotelCard } from "@/components/custom/shared/HotelCard"
import { FilterSidebar } from "@/components/custom/shared/FilterSidebar"
import type { FilterValues } from "@/components/custom/shared/FilterSidebar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { hotels } from "@/data/hotels"

const SORT_OPTIONS = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Reviews"]
const ITEMS_PER_PAGE = 6

const trustItems = [
  { icon: ShieldCheck, title: "Best Price Guarantee", desc: "We match any lower price" },
  { icon: RotateCcw, title: "Free Cancellation", desc: "Change your plans for free" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "We're here to help anytime" },
  { icon: Lock, title: "Secure Booking", desc: "Your data is always protected" },
]

const DEFAULT_FILTERS: FilterValues = {
  priceMin: "",
  priceMax: "",
  starRating: [],
  guestRating: [],
  propertyTypes: [],
  amenities: [],
}

export default function HotelsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState("Popular")
  const [destination, setDestination] = useState("")
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filteredHotels = useMemo(() => {
    let result = [...hotels]

    if (destination.trim()) {
      const q = destination.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q)
      )
    }

    if (filters.priceMin) {
      result = result.filter((h) => h.pricePerNight >= Number(filters.priceMin))
    }
    if (filters.priceMax) {
      result = result.filter((h) => h.pricePerNight <= Number(filters.priceMax))
    }

    if (filters.starRating.length > 0) {
      const minStars = Math.min(...filters.starRating)
      result = result.filter((h) => h.stars >= minStars)
    }

    if (filters.guestRating.length > 0) {
      const minRating = Math.min(...filters.guestRating)
      result = result.filter((h) => h.rating >= minRating)
    }

    if (filters.propertyTypes.length > 0) {
      result = result.filter((h) =>
        filters.propertyTypes.some((pt) => {
          const type = pt.toLowerCase()
          const hotelType = h.propertyType.toLowerCase()
          return hotelType.includes(type) || type.includes(hotelType)
        })
      )
    }

    if (filters.amenities.length > 0) {
      result = result.filter((h) =>
        filters.amenities.every((selected) => {
          const key = selected.toLowerCase().replace(/^free\s+/, "").replace(/\s+/g, "-")
          return h.amenities.some((a) => a.toLowerCase() === key || a.toLowerCase().includes(key))
        })
      )
    }

    return result
  }, [destination, filters])

  const sortedHotels = useMemo(() => {
    const sorted = [...filteredHotels]
    switch (sortBy) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.pricePerNight - b.pricePerNight)
        break
      case "Price: High to Low":
        sorted.sort((a, b) => b.pricePerNight - a.pricePerNight)
        break
      case "Rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "Reviews":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }
    return sorted
  }, [filteredHotels, sortBy])

  const totalPages = Math.ceil(sortedHotels.length / ITEMS_PER_PAGE)
  const paginatedHotels = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedHotels.slice(start, start + ITEMS_PER_PAGE)
  }, [sortedHotels, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredHotels.length, sortBy])

  function getPageNumbers() {
    const pages: (number | "...")[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Hotels</span>
        </div>
      </div>

      <section className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-3 min-w-0">
              <InputGroup className="h-10 max-w-[200px] rounded-xl border-border bg-muted/50 shadow-none">
                <InputGroupAddon>
                  <MapPin className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-sm placeholder:text-muted-foreground"
                />
              </InputGroup>

              <Popover>
                <PopoverTrigger className="flex h-10 items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 text-sm text-muted-foreground data-[popover-open]:border-foreground">
                  <CalendarIcon className="size-4 shrink-0" />
                  <span className={cn(!dateRange && "text-muted-foreground")}>
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>{format(dateRange.from, "MMM d")} — {format(dateRange.to, "MMM d")}</>
                      ) : (
                        format(dateRange.from, "MMM d")
                      )
                    ) : (
                      "Check-in — Check-out"
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 text-sm text-muted-foreground">
                <UserRound className="size-4" />
                2 guests
              </button>

              <Button className="h-10 rounded-xl px-5 text-sm font-semibold">
                Search
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-xl border border-border bg-muted/50 p-1 sm:flex">
                <button
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-white text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-white text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 appearance-none rounded-xl border border-border bg-muted/50 pl-4 pr-8 text-sm text-foreground outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              <Button variant="outline" className="h-10 rounded-xl px-3 lg:hidden" onClick={() => setMobileFilterOpen(true)}>
                <SlidersHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto flex h-full w-80 flex-col bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold text-foreground">Filters</span>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setMobileFilterOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <FilterSidebar
                onApply={(values) => {
                  setFilters(values)
                  setMobileFilterOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex gap-8">
            <FilterSidebar
              className="hidden w-64 shrink-0 lg:block"
              onApply={setFilters}
            />

            <div className="flex-1 space-y-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{sortedHotels.length}</span> properties found
              </p>

              {viewMode === "grid" ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                paginatedHotels.map((hotel) => (
                  <HotelListCard key={hotel.id} hotel={hotel} />
                ))
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page, i) => (
                        <PaginationItem key={i}>
                          {page === "..." ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault()
                                setCurrentPage(page as number)
                              }}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                            setCurrentPage(Math.min(totalPages, currentPage + 1))
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <item.icon className="size-6 text-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
