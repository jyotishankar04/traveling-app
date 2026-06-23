import { useState, useMemo } from "react"
import { Link } from "react-router"
import {
  Search,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  AdminPageHeader,
} from "@/components/custom/admin/AdminPageHeader"
import {
  AdminStatCard,
} from "@/components/custom/admin/AdminStatCard"
import {
  AdminDataTable,
} from "@/components/custom/admin/AdminDataTable"
import {
  AdminApprovalBadge,
  AdminListingBadge,
} from "@/components/custom/admin/AdminStatusBadges"
import {
  EmptyState,
} from "@/components/custom/admin/EmptyState"
import {
  TableSkeleton,
} from "@/components/custom/admin/LoadingSkeleton"
import {
  adminHotels,
} from "@/data/admin/admin-hotels"

const ITEMS_PER_PAGE = 8

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function AdminHotelsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [approvalFilter, setApprovalFilter] = useState("all")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [starFilter, setStarFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading] = useState(false)

  const propertyTypes = useMemo(() => {
    const set = new Set(adminHotels.map((h) => h.propertyType))
    return Array.from(set).sort()
  }, [])

  const starRatings = useMemo(() => {
    const set = new Set(adminHotels.map((h) => h.starRating))
    return Array.from(set).sort((a, b) => b - a)
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminHotels]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.ownerName.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((h) => h.listingStatus === statusFilter)
    }

    if (approvalFilter !== "all") {
      result = result.filter((h) => h.approvalStatus === approvalFilter)
    }

    if (propertyFilter !== "all") {
      result = result.filter((h) => h.propertyType === propertyFilter)
    }

    if (starFilter !== "all") {
      result = result.filter((h) => h.starRating === Number.parseInt(starFilter))
    }

    return result
  }, [search, statusFilter, approvalFilter, propertyFilter, starFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalHotels = adminHotels.length
  const activeHotels = adminHotels.filter((h) => h.listingStatus === "active").length
  const pendingApproval = adminHotels.filter((h) => h.approvalStatus === "pending").length
  const rejectedHotels = adminHotels.filter((h) => h.approvalStatus === "rejected").length

  return (
    <div>
      <AdminPageHeader title="Hotels" subtitle="Manage all hotel listings across the platform">
        <Button nativeButton={false} render={<Link to="/admin/hotels/pending" />} variant="outline">
          <Clock className="size-4" />
          View Pending
          {pendingApproval > 0 && (
            <Badge variant="secondary" className="ml-1">
              {pendingApproval}
            </Badge>
          )}
        </Button>
        <Button variant="outline">
          <Download className="size-4" />
          Export
        </Button>
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard
          label="Total Hotels"
          value={totalHotels.toString()}
          icon={<Building2 className="size-4" />}
        />
        <AdminStatCard
          label="Active"
          value={activeHotels.toString()}
          change={`${((activeHotels / totalHotels) * 100).toFixed(0)}% of total`}
          changePositive
          icon={<CheckCircle className="size-4" />}
        />
        <AdminStatCard
          label="Pending Approval"
          value={pendingApproval.toString()}
          icon={<Clock className="size-4" />}
        />
        <AdminStatCard
          label="Rejected"
          value={rejectedHotels.toString()}
          change="Requires review"
          changePositive={false}
          icon={<XCircle className="size-4" />}
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search hotels..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={approvalFilter}
          onValueChange={(v) => {
            setApprovalFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Approval Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Approval</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={propertyFilter}
          onValueChange={(v) => {
            setPropertyFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {propertyTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={starFilter}
          onValueChange={(v) => {
            setStarFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Star Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stars</SelectItem>
            {starRatings.map((s) => (
              <SelectItem key={s} value={s.toString()}>
                {s} Star{s !== 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <TableSkeleton rows={6} columns={9} />
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No hotels found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <>
          <AdminDataTable
            headers={[
              "Hotel",
              "Owner",
              "Location",
              "Type",
              "Rooms",
              "Rating",
              "Bookings",
              "Revenue",
              "Approval",
              "Listing",
              "",
            ]}
          >
            {paginated.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {hotel.image ? (
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <Building2 className="size-5" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{hotel.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{hotel.ownerName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {hotel.city}, {hotel.country}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{hotel.propertyType}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{hotel.rooms}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                  {hotel.rating > 0 ? (
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {hotel.rating}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">&mdash;</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{hotel.totalBookings}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                  {formatCurrency(hotel.revenue)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <AdminApprovalBadge status={hotel.approvalStatus} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <AdminListingBadge status={hotel.listingStatus} />
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        render={<Link to={`/admin/hotels/${hotel.id}`} />}
                      >
                        <Eye className="size-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => {}}>
                        <Edit className="size-4" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </AdminDataTable>

          <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing {paginated.length} of {filtered.length} hotel{filtered.length !== 1 ? "s" : ""}
            </p>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(i + 1)
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </div>
  )
}
