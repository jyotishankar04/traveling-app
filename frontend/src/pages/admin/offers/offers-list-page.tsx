import { useState, useMemo } from "react"
import { Link } from "react-router"
import {
  Search,
  Plus,
  Percent,
  DollarSign,
  BadgePercent,
  Clock,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  Tag,
} from "lucide-react"

import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { AdminOfferBadge } from "@/components/custom/admin/AdminStatusBadges"
import { EmptyState } from "@/components/custom/admin/EmptyState"
import { TableSkeleton } from "@/components/custom/admin/LoadingSkeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { adminOffers, type AdminOffer } from "@/data/admin/admin-offers"

const ITEMS_PER_PAGE = 8

export default function AdminOffersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [destinationFilter, setDestinationFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading] = useState(false)

  const filtered = useMemo(() => {
    return adminOffers.filter((o) => {
      if (search && !o.title.toLowerCase().includes(search.toLowerCase())) return false
      if (statusFilter && o.status !== statusFilter) return false
      if (typeFilter && o.offerType !== typeFilter) return false
      if (destinationFilter && o.destination !== destinationFilter) return false
      return true
    })
  }, [search, statusFilter, typeFilter, destinationFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const pageOffers = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const stats = useMemo(() => {
    const activeScheduled = adminOffers.filter((o) => o.status === "active" || o.status === "scheduled")
    const totalRedemptions = activeScheduled.reduce((s, o) => s + o.usageCount, 0)
    const revenueGenerated = activeScheduled.reduce((s, o) => s + o.usageCount * (o.discountType === "fixed" ? o.discount : Math.min(o.discount * 0.01 * o.minBookingAmount, o.maxDiscount)), 0)
    const activeCampaigns = adminOffers.filter((o) => o.status === "active").length
    const now = new Date()
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    const expiringSoon = adminOffers.filter((o) => {
      if (o.status !== "scheduled" && o.status !== "active") return false
      const end = new Date(o.endDate).getTime()
      return end - now.getTime() <= sevenDays && end > now.getTime()
    }).length
    return { totalRedemptions, revenueGenerated, activeCampaigns, expiringSoon }
  }, [])

  const destinations = useMemo(() => {
    return [...new Set(adminOffers.map((o) => o.destination))]
  }, [])

  function formatDiscount(offer: AdminOffer) {
    if (offer.discountType === "percentage") return `${offer.discount}%`
    return `$${offer.discount}`
  }

  function formatUsage(offer: AdminOffer) {
    if (offer.usageLimit === 0) return `${offer.usageCount}/Unlimited`
    return `${offer.usageCount}/${offer.usageLimit}`
  }

  function handleStatusChange(v: string | null) {
    setStatusFilter(v ?? "")
  }

  function handleTypeChange(v: string | null) {
    setTypeFilter(v ?? "")
  }

  function handleDestinationChange(v: string | null) {
    setDestinationFilter(v ?? "")
  }

  if (loading) {
    return (
      <div>
        <AdminPageHeader title="Offers" subtitle="Manage promotional offers and campaigns" />
        <TableSkeleton rows={6} columns={9} />
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader title="Offers" subtitle="Manage promotional offers and campaigns">
        <Link to="/admin/offers/new">
          <Button>
            <Plus className="size-4" />
            Create Offer
          </Button>
        </Link>
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard
          label="Total Redemptions"
          value={stats.totalRedemptions.toLocaleString()}
          change="+12.3%"
          changePositive
          icon={<Tag className="size-4" />}
        />
        <AdminStatCard
          label="Revenue Generated"
          value={`$${stats.revenueGenerated.toLocaleString()}`}
          change="+8.7%"
          changePositive
          icon={<DollarSign className="size-4" />}
        />
        <AdminStatCard
          label="Active Campaigns"
          value={String(stats.activeCampaigns)}
          change="+2 this month"
          changePositive
          icon={<BadgePercent className="size-4" />}
        />
        <AdminStatCard
          label="Expiring Soon"
          value={String(stats.expiringSoon)}
          change="Needs attention"
          changePositive={false}
          icon={<Clock className="size-4" />}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search offers..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            className="pl-8"
          />
        </div>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleTypeChange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="seasonal">Seasonal</SelectItem>
            <SelectItem value="flash">Flash</SelectItem>
            <SelectItem value="welcome">Welcome</SelectItem>
            <SelectItem value="loyalty">Loyalty</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleDestinationChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Destinations</SelectItem>
            {destinations.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {pageOffers.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No offers found"
          description="Try adjusting your search or filters, or create a new offer."
          action={
            <Link to="/admin/offers/new">
              <Button>
                <Plus className="size-4" />
                Create Offer
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <AdminDataTable
            headers={["Offer", "Discount", "Type", "Destination", "Start Date", "End Date", "Usage", "Status", "Actions"]}
          >
            {pageOffers.map((offer) => (
              <tr key={offer.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-lg">
                      <AvatarImage src={offer.image} alt={offer.title} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{offer.title}</p>
                      <p className="text-xs text-muted-foreground">{offer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {offer.discountType === "percentage" ? (
                      <Percent className="size-3.5 text-muted-foreground" />
                    ) : (
                      <DollarSign className="size-3.5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-semibold">{formatDiscount(offer)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="capitalize">{offer.offerType}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{offer.destination}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{offer.startDate}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{offer.endDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: offer.usageLimit > 0
                            ? `${Math.min(100, (offer.usageCount / offer.usageLimit) * 100)}%`
                            : `${Math.min(100, (offer.usageCount / 5000) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{formatUsage(offer)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <AdminOfferBadge status={offer.status} />
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>
                        <Link to={`/admin/offers/${offer.id}/edit`}>
                          <Eye className="size-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <EyeOff className="size-4" />
                        Disable
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Copy className="size-4" />
                        Duplicate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </AdminDataTable>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {pageOffers.length} of {filtered.length} offers
            </p>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
