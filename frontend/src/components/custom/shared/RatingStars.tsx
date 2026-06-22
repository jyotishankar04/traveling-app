import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  showValue?: boolean
  size?: "sm" | "md" | "lg"
}

export function RatingBadge({ rating, showValue = true, size = "sm" }: RatingStarsProps) {
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
  const iconSize = size === "sm" ? "size-3" : "size-4"

  return (
    <span className={`inline-flex items-center gap-1 rounded-md bg-neutral-900 font-semibold text-white ${sizeClasses}`}>
      <Star className={`${iconSize} fill-current`} />
      {showValue && rating}
    </span>
  )
}

export function StarRating({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
        />
      ))}
    </span>
  )
}
