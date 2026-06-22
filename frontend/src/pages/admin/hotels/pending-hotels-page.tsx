"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router"
import {
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  AdminPageHeader,
} from "@/components/custom/admin/AdminPageHeader"
import {
  AdminFlagBadge,
} from "@/components/custom/admin/AdminStatusBadges"
import {
  EmptyState,
} from "@/components/custom/admin/EmptyState"
import {
  StatsSkeleton,
  TableSkeleton,
} from "@/components/custom/admin/LoadingSkeleton"
import {
  adminHotels,
} from "@/data/admin/admin-hotels"
import {
  adminOwners,
} from "@/data/admin/admin-owners"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function AdminPendingHotelsPage() {
  const [search, setSearch] = useState("")
  const [countryFilter, setCountryFilter] = useState("all")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [loading] = useState(false)

  const pendingHotels = useMemo(
    () => adminHotels.filter((h) => h.approvalStatus === "pending"),
    []
  )

  const countries = useMemo(() => {
    const set = new Set(pendingHotels.map((h) => h.country))
    return Array.from(set).sort()
  }, [pendingHotels])

  const propertyTypes = useMemo(() => {
    const set = new Set(pendingHotels.map((h) => h.propertyType))
    return Array.from(set).sort()
  }, [pendingHotels])

  const filtered = useMemo(() => {
    let result = [...pendingHotels]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.ownerName.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
      )
    }

    if (countryFilter !== "all") {
      result = result.filter((h) => h.country === countryFilter)
    }

    if (propertyFilter !== "all") {
      result = result.filter((h) => h.propertyType === propertyFilter)
    }

    return result
  }, [search, countryFilter, propertyFilter, pendingHotels])

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const completenessColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  if (loading) {
    return (
      <div>
        <AdminPageHeader title="Pending Hotels" subtitle="Review and approve new hotel listings" />
        <StatsSkeleton count={1} />
        <TableSkeleton rows={4} columns={5} />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link to="/admin/hotels" />}
          className="mb-2 -ml-1 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Hotels
        </Button>
        <AdminPageHeader title="Pending Hotels" subtitle="Review and approve new hotel listings">
          <Badge variant="secondary" className="text-sm">
            {pendingHotels.length} pending
          </Badge>
        </AdminPageHeader>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search pending hotels..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={countryFilter}
          onValueChange={(v) => setCountryFilter(v ?? "all")}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={propertyFilter}
          onValueChange={(v) => setPropertyFilter(v ?? "all")}
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
      </div>

      {selectedIds.size > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {selectedIds.size} hotel{selectedIds.size !== 1 ? "s" : ""} selected
          </span>
          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
            <CheckCircle className="size-3.5" />
            Approve Selected
          </Button>
          <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30">
            <XCircle className="size-3.5" />
            Reject Selected
          </Button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={RefreshCw}
          title="No pending hotels"
          description="All hotel listings have been reviewed. Check back later for new submissions."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((hotel) => {
            const owner = adminOwners.find((o) => o.id === hotel.ownerId)
            return (
              <Card key={hotel.id} className="group/card overflow-hidden">
                <div className="relative">
                  {hotel.image ? (
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-muted">
                      <div className="text-center text-muted-foreground">
                        <div className="mx-auto mb-1 size-8 rounded-lg border border-dashed border-border" />
                        <p className="text-xs">No image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute left-2 top-2">
                    <Checkbox
                      checked={selectedIds.has(hotel.id)}
                      onCheckedChange={() => toggleSelect(hotel.id)}
                      aria-label={`Select ${hotel.name}`}
                    />
                  </div>
                  <div className="absolute right-2 top-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm dark:bg-black/50">
                      {hotel.submittedDate ? formatDate(hotel.submittedDate) : "N/A"}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{hotel.name}</CardTitle>
                      <CardDescription className="mt-0.5">
                        {hotel.city}, {hotel.country}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      nativeButton={false}
                      render={<Link to={`/admin/hotels/${hotel.id}`} />}
                      className="shrink-0 opacity-0 transition-opacity group-hover/card:opacity-100"
                    >
                      <ExternalLink className="size-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px]">
                        {owner ? getInitials(owner.ownerName) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {hotel.ownerName}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">{hotel.propertyType}</Badge>
                    <Badge variant="outline">{hotel.starRating} Star</Badge>
                    <Badge variant={hotel.rooms > 0 ? "outline" : "destructive"}>
                      {hotel.rooms > 0 ? `${hotel.rooms} rooms` : "No rooms"}
                    </Badge>
                  </div>

                  {hotel.riskFlags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.riskFlags.map((flag) => (
                        <AdminFlagBadge key={flag} reason={flag} />
                      ))}
                    </div>
                  )}

                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Completeness</span>
                      <span className="font-medium text-foreground">{hotel.completenessScore}%</span>
                    </div>
                    <Progress value={hotel.completenessScore}>
                      <ProgressTrack>
                        <ProgressIndicator className={completenessColor(hotel.completenessScore)} />
                      </ProgressTrack>
                    </Progress>
                  </div>

                  <Separator />

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="default" className="flex-1">
                      <CheckCircle className="size-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <XCircle className="size-3.5" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <RefreshCw className="size-3.5" />
                      Changes
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full"
                    nativeButton={false}
                    render={<Link to={`/admin/hotels/${hotel.id}`} />}
                  >
                    <ExternalLink className="size-3.5" />
                    Review Details
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
