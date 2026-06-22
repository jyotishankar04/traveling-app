import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router"
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  XCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/admin/AdminStatusBadges"
import { TableSkeleton, StatsSkeleton } from "@/components/custom/admin/LoadingSkeleton"
import { EmptyState } from "@/components/custom/admin/EmptyState"
import { adminBookings } from "@/data/admin/admin-bookings"

const ITEMS_PER_PAGE = 10

export default function AdminBookingsPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => ({
    total: adminBookings.length,
    confirmed: adminBookings.filter(b => b.bookingStatus === "upcoming" || b.bookingStatus === "completed").length,
    cancelled: adminBookings.filter(b => b.bookingStatus === "cancelled").length,
    failedPayments: adminBookings.filter(b => b.paymentStatus === "failed").length,
  }), [])

  const filtered = useMemo(() => {
    return adminBookings.filter((b) => {
      if (search) {
        const q = search.toLowerCase()
        const matchSearch =
          b.bookingId.toLowerCase().includes(q) ||
          b.customerName.toLowerCase().includes(q) ||
          b.hotelName.toLowerCase().includes(q) ||
          b.ownerName.toLowerCase().includes(q)
        if (!matchSearch) return false
      }
      if (bookingStatusFilter !== "all" && b.bookingStatus !== bookingStatusFilter) return false
      if (paymentStatusFilter !== "all" && b.paymentStatus !== paymentStatusFilter) return false
      if (dateRangeFilter !== "all") {
        const created = new Date(b.createdDate)
        const now = new Date()
        if (dateRangeFilter === "last7") {
          const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
          if (diff > 7) return false
        } else if (dateRangeFilter === "last30") {
          const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
          if (diff > 30) return false
        } else if (dateRangeFilter === "last90") {
          const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
          if (diff > 90) return false
        }
      }
      return true
    })
  }, [search, bookingStatusFilter, paymentStatusFilter, dateRangeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [search, bookingStatusFilter, paymentStatusFilter, dateRangeFilter])

  return (
    <div>
      <AdminPageHeader title="Platform Bookings" subtitle="Track and manage all bookings across the platform.">
        <Button variant="outline" className="rounded-full">
          <Download className="size-4" />
          Export
        </Button>
      </AdminPageHeader>

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AdminStatCard label="Total Bookings" value={stats.total.toLocaleString()} />
          <AdminStatCard label="Confirmed" value={stats.confirmed.toLocaleString()} />
          <AdminStatCard label="Cancelled" value={stats.cancelled.toLocaleString()} />
          <AdminStatCard label="Failed Payments" value={stats.failedPayments.toLocaleString()} />
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by booking ID, customer, hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={bookingStatusFilter}
          onValueChange={(v) => setBookingStatusFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Booking Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={paymentStatusFilter}
          onValueChange={(v) => setPaymentStatusFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={dateRangeFilter}
          onValueChange={(v) => setDateRangeFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="last7">Last 7 Days</SelectItem>
            <SelectItem value="last30">Last 30 Days</SelectItem>
            <SelectItem value="last90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <TableSkeleton rows={8} columns={11} />
      ) : paginated.length === 0 ? (
        <EmptyState
          title="No bookings found"
          description="Try adjusting your search or filters to see results."
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <AdminDataTable
              headers={["Booking ID", "Customer", "Hotel", "Owner", "Room", "Check-in", "Check-out", "Amount", "Payment", "Status", "Created", ""]}
            >
              {paginated.map((b) => (
                <tr key={b.id} className="transition hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link to="#" className="text-sm font-medium text-foreground underline-offset-2 hover:underline">
                      {b.bookingId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.customerName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.ownerName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">
                    {b.currency === "USD" && "$"}
                    {b.currency === "EUR" && "\u20AC"}
                    {b.currency === "GBP" && "\u00A3"}
                    {b.currency === "JPY" && "\u00A5"}
                    {b.currency === "AED" && "AED "}
                    {b.currency === "AUD" && "A$"}
                    {b.currency === "RUB" && "\u20BD"}
                    {b.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3"><PaymentStatusBadge status={b.paymentStatus} /></td>
                  <td className="px-4 py-3"><BookingStatusBadge status={b.bookingStatus} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.createdDate}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="size-4" />
                          Cancel Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="size-4" />
                          Contact Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </AdminDataTable>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Showing {paginated.length} of {filtered.length} bookings
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)) }}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNum}
                        onClick={(e) => { e.preventDefault(); setPage(pageNum) }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, page + 1)) }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  )
}
