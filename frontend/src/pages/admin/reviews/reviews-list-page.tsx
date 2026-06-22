import { useState, useEffect, useMemo } from "react"
import { Search, Star, MessageSquare, Image, CheckCircle, Ban, ShieldCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { ReviewStatusBadge, AdminFlagBadge } from "@/components/custom/admin/AdminStatusBadges"
import { StatsSkeleton } from "@/components/custom/admin/LoadingSkeleton"
import { EmptyState } from "@/components/custom/admin/EmptyState"
import { adminReviews, type AdminReview } from "@/data/admin/admin-reviews"

const ITEMS_PER_PAGE = 6

const FLAG_REASONS = ["suspicious", "inappropriate", "spam", "competitor"]

export default function AdminReviewsPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [flagReasonFilter, setFlagReasonFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => {
    const total = adminReviews.length
    const published = adminReviews.filter(r => r.status === "published").length
    const pending = adminReviews.filter(r => r.status === "pending").length
    const flagged = adminReviews.filter(r => r.status === "flagged").length
    const avg = total > 0 ? adminReviews.reduce((s, r) => s + r.rating, 0) / total : 0
    return { total, published, pending, flagged, avg }
  }, [])

  const flagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const reason of FLAG_REASONS) {
      counts[reason] = adminReviews.filter(r => r.flagReason === reason).length
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    return adminReviews.filter((r) => {
      if (activeTab !== "all" && r.status !== activeTab) return false

      if (search) {
        const q = search.toLowerCase()
        const matchSearch =
          r.guestName.toLowerCase().includes(q) ||
          r.hotelName.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q)
        if (!matchSearch) return false
      }

      if (ratingFilter !== "all") {
        const ratingNum = Number(ratingFilter)
        if (r.rating !== ratingNum) return false
      }

      if (flagReasonFilter !== "all" && r.flagReason !== flagReasonFilter) return false

      if (dateFilter !== "all") {
        const d = new Date(r.date)
        const now = new Date()
        const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
        if (dateFilter === "last7" && diff > 7) return false
        if (dateFilter === "last30" && diff > 30) return false
        if (dateFilter === "last90" && diff > 90) return false
      }

      return true
    })
  }, [search, ratingFilter, flagReasonFilter, dateFilter, activeTab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [search, ratingFilter, flagReasonFilter, dateFilter, activeTab])

  return (
    <div>
      <AdminPageHeader title="Review Moderation" subtitle="Review, moderate, and manage guest feedback across all properties." />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AdminStatCard label="Average Rating" value={stats.avg.toFixed(1)} />
          <AdminStatCard label="Total Reviews" value={stats.total.toLocaleString()} />
          <AdminStatCard label="Published" value={stats.published.toLocaleString()} />
          <AdminStatCard label="Flagged / Pending" value={`${stats.flagged} / ${stats.pending}`} />
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by guest, hotel, or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={ratingFilter}
          onValueChange={(v) => setRatingFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={flagReasonFilter}
          onValueChange={(v) => setFlagReasonFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Flag Reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reasons</SelectItem>
            <SelectItem value="suspicious">Suspicious</SelectItem>
            <SelectItem value="inappropriate">Inappropriate</SelectItem>
            <SelectItem value="spam">Spam</SelectItem>
            <SelectItem value="competitor">Competitor</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={dateFilter}
          onValueChange={(v) => setDateFilter(v ?? "all")}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="last7">Last 7 Days</SelectItem>
            <SelectItem value="last30">Last 30 Days</SelectItem>
            <SelectItem value="last90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="line">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="published">Published ({stats.published})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({stats.flagged})</TabsTrigger>
          <TabsTrigger value="hidden">Hidden ({adminReviews.filter(r => r.status === "hidden").length})</TabsTrigger>
        </TabsList>

        {["all", "published", "pending", "flagged", "hidden"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-border bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-muted" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-muted" />
                        <div className="h-3 w-48 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-3/4 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tabValue === "flagged" && paginated.length > 0 ? (
              <div className="space-y-4">
                <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {FLAG_REASONS.map((reason) => {
                    const reasonLabels: Record<string, string> = {
                      suspicious: "Suspicious",
                      inappropriate: "Inappropriate",
                      spam: "Spam",
                      competitor: "Competitor",
                    }
                    return (
                      <div key={reason} className="rounded-2xl border border-border bg-white p-4">
                        <p className="text-xs text-muted-foreground">{reasonLabels[reason]}</p>
                        <p className="mt-1 text-xl font-bold text-foreground">{flagCounts[reason]}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-4">
                  {paginated.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState title="No reviews found" description="No reviews match the current filters or tab selection." />
            ) : (
              <div className="space-y-4">
                {paginated.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {!loading && filtered.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {paginated.length} of {filtered.length} reviews
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
      )}
    </div>
  )
}

function ReviewCard({ review: r }: { review: AdminReview }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 transition hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar>
            <AvatarImage src={r.guestAvatar} alt={r.guestName} />
            <AvatarFallback>{r.guestName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{r.guestName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {r.hotelName} &middot; {r.ownerName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
              />
            ))}
          </span>
          <ReviewStatusBadge status={r.status} />
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{r.comment}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span>{r.date}</span>
        {r.photosCount > 0 && (
          <span className="flex items-center gap-1">
            <Image className="size-3" />
            {r.photosCount} photos
          </span>
        )}

        {r.flagReason && (
          <AdminFlagBadge reason={r.flagReason} />
        )}

        {r.reply ? (
          <span className="flex items-center gap-1 text-emerald-600">
            <MessageSquare className="size-3" />
            Replied
          </span>
        ) : (
          <span className="flex items-center gap-1 text-amber-600">
            <MessageSquare className="size-3" />
            No reply
          </span>
        )}
      </div>

      {r.reply && (
        <div className="mt-3 rounded-lg bg-muted/30 p-3">
          <p className="text-xs font-medium text-foreground">Owner reply:</p>
          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{r.reply}</p>
        </div>
      )}

      <Separator className="my-3" />

      <div className="flex flex-wrap items-center gap-2">
        {r.status !== "published" && (
          <Button size="sm" variant="outline" className="rounded-full gap-1.5">
            <CheckCircle className="size-3.5" />
            Publish
          </Button>
        )}
        {r.status !== "hidden" && (
          <Button size="sm" variant="outline" className="rounded-full gap-1.5">
            <Ban className="size-3.5" />
            Hide
          </Button>
        )}
        {r.status === "flagged" && (
          <Button size="sm" variant="outline" className="rounded-full gap-1.5">
            <ShieldCheck className="size-3.5" />
            Mark Safe
          </Button>
        )}
        <Button size="sm" variant="outline" className="rounded-full gap-1.5 text-red-500 hover:text-red-600">
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </div>
    </div>
  )
}
