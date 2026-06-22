import { useState } from "react"
import { Link, useParams } from "react-router"
import { Star, ChevronLeft, Send, EyeOff, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ReviewStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ownerReviews } from "@/data/owner/owner-reviews"

const ratingLabels = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "staff", label: "Staff" },
  { key: "comfort", label: "Comfort" },
  { key: "location", label: "Location" },
  { key: "value", label: "Value" },
]

export default function ReviewDetailPage() {
  const { reviewId } = useParams()
  const review = ownerReviews.find((r) => r.id === reviewId)
  if (!review) return <NotFoundState />
  const [reply, setReply] = useState(review.reply || "")

  return (
    <div>
      <OwnerPageHeader title="Review Details" subtitle="View and respond to guest reviews">
        <ReviewStatusBadge status={review.status} />
        <Link to="/owner/reviews"><Button variant="outline" className="rounded-full"><ChevronLeft className="size-4" />Back to Reviews</Button></Link>
      </OwnerPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-foreground">
                  {review.guestName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{review.guestName}</p>
                  <p className="text-xs text-muted-foreground">{review.guestCountry} · {review.date}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />{review.rating}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">{review.title}</h3>
            <p className="mt-2 text-sm text-foreground leading-relaxed">{review.comment}</p>

            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hotel & Booking</p>
              <p className="mt-1 text-sm text-foreground">{review.hotelName} · {review.roomType}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingLabels.map((rl) => {
                const val = review[rl.key as keyof typeof review] as number
                return (
                  <div key={rl.key} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-muted-foreground">{rl.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full bg-neutral-900" style={{ width: `${(val / 5) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{val}/5</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">
              {review.reply ? "Your Response" : "Write a Response"}
            </h3>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a public response to this review..."
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
            <Button className="mt-3 rounded-full"><Send className="size-4" />{review.reply ? "Update Response" : "Post Response"}</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h4 className="text-sm font-semibold text-foreground">Moderation Actions</h4>
            <div className="mt-4 space-y-2">
              {review.status !== "published" && <Button className="w-full rounded-xl text-xs" size="sm">Publish</Button>}
              <Button variant="outline" className="w-full rounded-xl text-xs" size="sm"><EyeOff className="size-3.5" />Hide</Button>
              <Button variant="outline" className="w-full rounded-xl text-xs text-red-600 hover:text-red-600" size="sm"><Flag className="size-3.5" />Report</Button>
            </div>
          </div>

          {review.reply && (
            <div className="rounded-2xl border border-border bg-neutral-50 p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Your Reply</p>
              <p className="mt-2 text-sm text-foreground">{review.reply}</p>
              <p className="mt-1 text-xs text-muted-foreground">{review.replyDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
