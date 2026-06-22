import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

const hotelVariants: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  active: "success",
  inactive: "destructive",
  draft: "secondary",
}

const bookingVariants: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  confirmed: "default",
  upcoming: "secondary",
  completed: "success",
  cancelled: "destructive",
}

const paymentVariants: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  paid: "success",
  pending: "secondary",
  refunded: "default",
  failed: "destructive",
  processing: "secondary",
}

const reviewVariants: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  published: "success",
  pending: "secondary",
  hidden: "destructive",
}

export function HotelStatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={hotelVariants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function BookingStatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={bookingVariants[status] || "secondary"} className="capitalize">{status.replace("-", " ")}</Badge>
}

export function PaymentStatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={paymentVariants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function ReviewStatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={reviewVariants[status] || "secondary"} className="capitalize">{status}</Badge>
}
