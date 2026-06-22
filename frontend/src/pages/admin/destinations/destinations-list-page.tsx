import { useState, useMemo } from "react"
import {
  Search,
  MapPin,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { AdminDestinationBadge } from "@/components/custom/admin/AdminStatusBadges"
import { EmptyState } from "@/components/custom/admin/EmptyState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import { adminDestinations } from "@/data/admin/admin-destinations"

const ITEMS_PER_PAGE = 6

export default function AdminDestinationsPage() {
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState<string>("")
  const [countryFilter, setCountryFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [featuredFilter, setFeaturedFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const regions = useMemo(() => [...new Set(adminDestinations.map((d) => d.region))], [])
  const countries = useMemo(() => [...new Set(adminDestinations.map((d) => d.country))], [])

  const filtered = useMemo(() => {
    return adminDestinations.filter((d) => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.country.toLowerCase().includes(search.toLowerCase())) return false
      if (regionFilter && d.region !== regionFilter) return false
      if (countryFilter && d.country !== countryFilter) return false
      if (statusFilter && d.pageStatus !== statusFilter) return false
      if (featuredFilter === "yes" && !d.featured) return false
      if (featuredFilter === "no" && d.featured) return false
      return true
    })
  }, [search, regionFilter, countryFilter, statusFilter, featuredFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const pageDestinations = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div>
      <AdminPageHeader title="Destinations" subtitle="Manage destination pages and content">
        <Button disabled>
          <Plus className="size-4" />
          Add Destination
        </Button>
      </AdminPageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            className="pl-8"
          />
        </div>
        <Select onValueChange={(v) => { setRegionFilter(v as string); setCurrentPage(1) }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Regions</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(v) => { setCountryFilter(v as string); setCurrentPage(1) }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(v) => { setStatusFilter(v as string); setCurrentPage(1) }}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(v) => { setFeaturedFilter(v as string); setCurrentPage(1) }}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="yes">Featured</SelectItem>
            <SelectItem value="no">Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AdminDataTable
        headers={["Destination", "Country", "Region", "Hotels", "Offers", "Featured", "Status", "Last Updated", "Actions"]}
      >
        {pageDestinations.map((dest) => (
          <tr key={dest.id} className="transition-colors hover:bg-muted/30">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={dest.image} alt={dest.name} />
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{dest.name}</p>
                  <p className="text-xs text-muted-foreground">{dest.id}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{dest.country}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{dest.region}</td>
            <td className="px-4 py-3 text-sm font-medium">{dest.hotelsCount}</td>
            <td className="px-4 py-3 text-sm font-medium">{dest.offersCount}</td>
            <td className="px-4 py-3">
              {dest.featured ? (
                <CheckCircle2 className="size-4 text-emerald-600" />
              ) : (
                <XCircle className="size-4 text-muted-foreground" />
              )}
            </td>
            <td className="px-4 py-3">
              <AdminDestinationBadge status={dest.pageStatus} />
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{dest.lastUpdated}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setExpandedId(expandedId === dest.id ? null : dest.id)}
                >
                  {expandedId === dest.id ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem>
                      <Eye className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="size-4" />
                      Toggle Featured
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <EyeOff className="size-4" />
                      Hide
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </td>
          </tr>
        ))}
      </AdminDataTable>

      {expandedId && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Destination Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const dest = adminDestinations.find((d) => d.id === expandedId)
              if (!dest) return null
              return (
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Why Visit
                    </p>
                    <p className="text-sm text-foreground">{dest.whyVisit}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Travel Tips
                    </p>
                    <p className="text-sm text-foreground">{dest.travelTips}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Popular Hotels
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dest.popularHotels.length > 0 ? (
                        dest.popularHotels.map((h) => (
                          <Badge key={h} variant="outline">{h}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No hotels listed</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {pageDestinations.length} of {filtered.length} destinations
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

      {filtered.length === 0 && (
        <div className="mt-4">
          <EmptyState
            icon={MapPin}
            title="No destinations found"
            description="Try adjusting your search or filters."
          />
        </div>
      )}
    </div>
  )
}
