import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Plus, Download, Search, MoreHorizontal, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { HotelStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { TableSkeleton } from "@/components/custom/owner/DataSkeletons"
import { EmptyState } from "@/components/custom/owner/EmptyState"
import { ownerHotels } from "@/data/owner/owner-hotels"

const ITEMS_PER_PAGE = 8

export default function HotelsListPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filtered = ownerHotels.filter((h) => {
    if (statusFilter !== "all" && h.status !== statusFilter) return false
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.city.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter])

  if (ownerHotels.length === 0) {
    return (
      <div>
        <OwnerPageHeader title="Hotels" subtitle="Manage all your properties.">
          <Link to="/owner/hotels/new"><Button className="rounded-full"><Plus className="size-4" />Add Hotel</Button></Link>
        </OwnerPageHeader>
        <EmptyState title="No hotels yet" description="Add your first property to start receiving bookings." action={<Link to="/owner/hotels/new"><Button className="rounded-full">Add Hotel</Button></Link>} />
      </div>
    )
  }

  return (
    <div>
      <OwnerPageHeader title="Hotels" subtitle="Manage all your properties.">
        <Link to="/owner/hotels/new"><Button className="rounded-full"><Plus className="size-4" />Add Hotel</Button></Link>
        <Button variant="outline" className="rounded-full"><Download className="size-4" />Export</Button>
      </OwnerPageHeader>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search hotels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? <TableSkeleton rows={5} columns={8} /> : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <OwnerDataTable headers={["Hotel", "Location", "Rooms", "Status", "Occupancy", "Revenue MTD", "Rating", ""]}>
            {paginated.map((h) => (
              <tr key={h.id} className="transition hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link to={`/owner/hotels/${h.id}`} className="flex items-center gap-3">
                    <div className="size-10 shrink-0 overflow-hidden rounded-xl">
                      <img src={h.image} alt={h.name} className="size-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{h.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {h.city}, {h.country}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{h.totalRooms}</td>
                <td className="px-4 py-3"><HotelStatusBadge status={h.status} /></td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{h.occupancy}%</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${h.revenueMTD.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-sm">
                    <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                    {h.rating}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </OwnerDataTable>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filtered.length} of {ownerHotels.length} hotels</span>
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)) }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentPage(page) }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)) }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
