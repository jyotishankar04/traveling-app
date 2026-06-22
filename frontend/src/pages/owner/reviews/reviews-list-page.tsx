import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Star, MessageSquare } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ReviewStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ReviewCardSkeleton, StatsSkeleton } from "@/components/custom/owner/DataSkeletons"
import { ownerReviews } from "@/data/owner/owner-reviews"

export default function ReviewsListPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const avgRating = ownerReviews.reduce((s, r) => s + r.rating, 0) / ownerReviews.length

  return (
    <div>
      <OwnerPageHeader title="Reviews" subtitle="Manage guest reviews and responses." />

      {loading ? <StatsSkeleton count={4} /> : (
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
            <div className="mt-1 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3 ${i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{ownerReviews.length}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{ownerReviews.filter((r) => r.status === "published").length}</p>
            <p className="text-xs text-muted-foreground">Published</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{ownerReviews.filter((r) => r.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      )}

      <Tabs defaultValue="all">
        <TabsList variant="line">
          <TabsTrigger value="all">All ({ownerReviews.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({ownerReviews.filter(r => r.status === "published").length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({ownerReviews.filter(r => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="hidden">Hidden ({ownerReviews.filter(r => r.status === "hidden").length})</TabsTrigger>
        </TabsList>

        {["all", "published", "pending", "hidden"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            <ReviewCards
              data={tabValue === "all" ? ownerReviews : ownerReviews.filter(r => r.status === tabValue)}
              loading={loading}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ReviewCards({ data, loading }: { data: typeof ownerReviews; loading: boolean }) {
  if (loading) return <ReviewCardSkeleton count={4} />

  return (
    <div className="space-y-4">
      {data.map((r) => (
        <Link key={r.id} to={`/owner/reviews/${r.id}`} className="block">
          <div className="rounded-2xl border border-border bg-white p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-foreground">
                  {r.guestName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{r.guestName}</p>
                  <p className="text-xs text-muted-foreground">{r.hotelName} · {r.roomType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                  ))}
                </span>
                <ReviewStatusBadge status={r.status} />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{r.comment}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{r.date}</span>
              {r.reply ? (
                <span className="flex items-center gap-1 text-emerald-600"><MessageSquare className="size-3" />Replied</span>
              ) : (
                <span className="text-amber-600">Awaiting reply</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
