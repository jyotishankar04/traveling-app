import { useState, useMemo } from "react"
import { Link, useParams } from "react-router"
import {
  ArrowLeft,
  Star,
  MapPin,
  Globe,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  CalendarDays,
  DollarSign,
  MessageSquare,
  Percent,
  Image,
  FileText,
  List,
  ClipboardCheck,
  ShieldCheck,
  Bed,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import {
  AdminStatCard,
} from "@/components/custom/admin/AdminStatCard"
import {
  AdminChartCard,
} from "@/components/custom/admin/AdminChartCard"
import {
  AdminApprovalBadge,
  AdminListingBadge,
  AdminOwnerVerificationBadge,
} from "@/components/custom/admin/AdminStatusBadges"
import {
  adminHotels,
} from "@/data/admin/admin-hotels"
import {
  adminOwners,
} from "@/data/admin/admin-owners"
import {
  adminBookings,
} from "@/data/admin/admin-bookings"
import {
  adminReviews,
} from "@/data/admin/admin-reviews"
import {
  adminActivity,
} from "@/data/admin/admin-activity"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const activityIcons: Record<string, typeof CalendarDays> = {
  account_created: User,
  booking_made: CalendarDays,
  review_posted: MessageSquare,
  payment_completed: DollarSign,
  hotel_approved: CheckCircle2,
  hotel_rejected: XCircle,
  user_suspended: XCircle,
  user_verified: ShieldCheck,
}

export default function AdminHotelDetailPage() {
  const { hotelId } = useParams()
  const [adminNote, setAdminNote] = useState("")

  const hotel = useMemo(
    () => adminHotels.find((h) => h.id === hotelId),
    [hotelId]
  )
  if (!hotel) return <NotFoundState />

  const owner = useMemo(
    () => adminOwners.find((o) => o.id === hotel.ownerId),
    [hotel.ownerId]
  )

  const hotelBookings = useMemo(
    () => adminBookings.filter((b) => b.hotelId === hotel.id),
    [hotel.id]
  )

  const hotelReviews = useMemo(
    () => adminReviews.filter((r) => r.hotelId === hotel.id),
    [hotel.id]
  )

  const hotelActivity = useMemo(
    () => adminActivity.filter((a) => a.hotelId === hotel.id),
    [hotel.id]
  )

  const totalBookings = hotelBookings.length
  const totalRevenue = hotelBookings.reduce((s, b) => s + b.amount, 0)
  const totalReviews = hotelReviews.length
  const occupancyRate = hotel.rooms > 0
    ? Math.min(100, Math.round((totalBookings / (hotel.rooms * 30)) * 100))
    : 0

  const checklistItems = [
    { label: "Has valid images", done: hotel.hasImages, icon: Image },
    { label: "Has description", done: hotel.hasDescription, icon: FileText },
    { label: "Has amenities", done: hotel.hasAmenities, icon: List },
    { label: "Has policies", done: hotel.hasPolicies, icon: ClipboardCheck },
    { label: "Has rooms", done: hotel.hasRooms, icon: Bed },
    { label: "Has pricing", done: hotel.hasPricing, icon: DollarSign },
  ]

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
        <AdminPageHeader title={hotel.name}>
          <div className="flex items-center gap-2">
            <AdminApprovalBadge status={hotel.approvalStatus} />
            <AdminListingBadge status={hotel.listingStatus} />
          </div>
        </AdminPageHeader>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {hotel.image ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="aspect-[21/9] w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[21/9] items-center justify-center rounded-2xl border border-border bg-muted">
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto mb-2 size-10" />
                <p className="text-sm">No images uploaded</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {owner ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarFallback className="text-base">{getInitials(owner.ownerName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{owner.ownerName}</p>
                        <p className="text-xs text-muted-foreground">{owner.businessName}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="size-3.5" />
                        {owner.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="size-3.5" />
                        {owner.phone}
                      </div>
                    </div>
                    <div>
                      <AdminOwnerVerificationBadge status={owner.verificationStatus} />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Owner information not available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hotel Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Property Type</span>
                  <span className="font-medium text-foreground">{hotel.propertyType}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Star Rating</span>
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    {hotel.starRating}
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="flex items-center gap-1 text-right font-medium text-foreground">
                    <MapPin className="size-3.5" />
                    {hotel.city}, {hotel.country}
                  </span>
                </div>
                <Separator />
                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="max-w-[200px] text-right text-foreground">{hotel.location}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Contact Email</span>
                  <span className="text-foreground">{hotel.contactEmail}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">{hotel.phone}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Website</span>
                  {hotel.website ? (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
                    >
                      <Globe className="size-3.5" />
                      Visit
                    </a>
                  ) : (
                    <span className="text-muted-foreground">&mdash;</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="size-4" />
                Listing Quality Checklist
              </CardTitle>
              <CardDescription>
                {checklistItems.filter((i) => i.done).length} of {checklistItems.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {checklistItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    {item.done ? (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    ) : (
                      <XCircle className="size-5 text-red-400" />
                    )}
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4 text-muted-foreground" />
                      <span className={`text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                Admin Approval Panel
              </CardTitle>
              <CardDescription>
                Current status: <AdminApprovalBadge status={hotel.approvalStatus} />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hotel.approvalStatus === "pending" && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
                    <CheckCircle2 className="size-4" />
                    Approve
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30">
                    <XCircle className="size-4" />
                    Reject
                  </Button>
                  <Button variant="outline">
                    Request Changes
                  </Button>
                </div>
              )}
              {hotel.approvalStatus === "approved" && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <XCircle className="size-4" />
                    Revoke Approval
                  </Button>
                </div>
              )}
              {hotel.approvalStatus === "rejected" && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
                    <CheckCircle2 className="size-4" />
                    Reconsider & Approve
                  </Button>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Admin Notes
                </label>
                <Textarea
                  placeholder="Add internal notes about this listing..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <AdminChartCard title="Rooms Preview" subtitle="Room types available at this property">
            <div className="rounded-lg border border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
              {hotel.rooms > 0
                ? `${hotel.rooms} room${hotel.rooms !== 1 ? "s" : ""} configured for this property`
                : "No room data available"}
            </div>
          </AdminChartCard>

          <AdminChartCard title="Reviews" subtitle={`${hotelReviews.length} review${hotelReviews.length !== 1 ? "s" : ""} for this property`}>
            {hotelReviews.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No reviews yet for this property.
              </div>
            ) : (
              <div className="space-y-4">
                {hotelReviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="rounded-lg border border-border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarImage src={review.guestAvatar} />
                          <AvatarFallback className="text-xs">{getInitials(review.guestName)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{review.guestName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-3 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant={review.status === "published" ? "success" : review.status === "flagged" ? "destructive" : "secondary"}>
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </AdminChartCard>

          <AdminChartCard title="Admin Activity" subtitle="Recent activity related to this property">
            {hotelActivity.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No activity recorded for this property.
              </div>
            ) : (
              <div className="space-y-0">
                {hotelActivity.map((activity, idx) => {
                  const IconComponent = activityIcons[activity.type] ?? CalendarDays
                  return (
                    <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                      {idx < hotelActivity.length - 1 && (
                        <div className="absolute left-[19px] top-9 bottom-0 w-px bg-border" />
                      )}
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-white">
                        <IconComponent className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-sm text-foreground">{activity.description}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {formatDateTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </AdminChartCard>
        </div>

        <div className="space-y-4">
          <AdminStatCard
            label="Total Bookings"
            value={totalBookings.toString()}
            icon={<CalendarDays className="size-4" />}
          />
          <AdminStatCard
            label="Revenue"
            value={formatCurrency(totalRevenue)}
            icon={<DollarSign className="size-4" />}
          />
          <AdminStatCard
            label="Reviews"
            value={totalReviews.toString()}
            icon={<MessageSquare className="size-4" />}
          />
          <AdminStatCard
            label="Occupancy Rate"
            value={`${occupancyRate}%`}
            icon={<Percent className="size-4" />}
          />
        </div>
      </div>
    </div>
  )
}
