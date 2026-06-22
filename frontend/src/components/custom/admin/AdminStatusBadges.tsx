import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export function AdminUserStatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "destructive" | "secondary"> = {
    active: "success",
    suspended: "destructive",
    unverified: "secondary",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminOwnerVerificationBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "secondary" | "destructive"> = {
    verified: "success",
    pending: "secondary",
    rejected: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminOwnerAccountBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "destructive"> = {
    active: "success",
    suspended: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminApprovalBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "secondary" | "destructive"> = {
    approved: "success",
    pending: "secondary",
    rejected: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminListingBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "destructive"> = {
    active: "success",
    inactive: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminOfferBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "secondary" | "destructive" | "default"> = {
    active: "success",
    scheduled: "secondary",
    expired: "destructive",
    draft: "default",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function AdminDestinationBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "default" | "destructive"> = {
    published: "success",
    draft: "default",
    hidden: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

interface FlagBadgeProps {
  reason: string
}

const severityVariants: Record<string, "destructive" | "default" | "secondary"> = {
  critical: "destructive",
  high: "destructive",
  medium: "default",
  low: "secondary",
}

export function AdminFlagBadge({ reason }: FlagBadgeProps) {
  const severity = (reason.match(/\[(critical|high|medium|low)\]/i)?.[1] || "").toLowerCase()
  const variant = severityVariants[severity] || "default"
  return <Badge variant={variant} className="capitalize">{reason.replace(/\[.*?\]\s*/g, "")}</Badge>
}

export function BookingStatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "secondary" | "destructive" | "default"> = {
    upcoming: "default",
    completed: "success",
    cancelled: "destructive",
    failed: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function PaymentStatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "default" | "success" | "secondary" | "destructive"> = {
    paid: "success",
    pending: "secondary",
    refunded: "default",
    failed: "destructive",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}

export function ReviewStatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "secondary" | "destructive" | "default"> = {
    published: "success",
    pending: "secondary",
    flagged: "destructive",
    hidden: "default",
  }
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>
}
