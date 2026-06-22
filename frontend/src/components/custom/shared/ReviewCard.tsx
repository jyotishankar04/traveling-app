import { Star } from "lucide-react"
import type { Review } from "@/data/reviews"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700">
            {review.userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{review.userName}</p>
            <p className="text-xs text-muted-foreground">
              {review.stayDuration} · {review.travelType}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
          <Star className="size-3 fill-current" />
          {review.rating}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: review.rating }, (_, i) => (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="mt-2 text-sm font-semibold text-foreground">{review.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          "{review.comment}"
        </p>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Stayed {review.stayDuration} · {review.roomType}
      </p>
    </div>
  )
}
