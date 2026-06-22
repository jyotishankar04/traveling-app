import { useParams, Link } from "react-router"
import { ArrowLeft, Calendar, Mail, Ban, Key, Activity, Phone, MapPin, Globe, DollarSign, Star, Heart, MessageSquareText, Clock, CheckCircle2, XCircle, CreditCard, RefreshCw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { AdminUserStatusBadge, BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/admin/AdminStatusBadges"
import { adminUsers } from "@/data/admin/admin-users"
import { adminBookings } from "@/data/admin/admin-bookings"
import { adminReviews } from "@/data/admin/admin-reviews"
import { adminActivity } from "@/data/admin/admin-activity"
import type { AdminUser } from "@/data/admin/admin-users"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

const activityTypeConfig: Record<string, { icon: typeof Activity; color: string; bg: string }> = {
  account_created: { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-100" },
  booking_made: { icon: Calendar, color: "text-blue-700", bg: "bg-blue-100" },
  review_posted: { icon: MessageSquareText, color: "text-purple-700", bg: "bg-purple-100" },
  payment_completed: { icon: CreditCard, color: "text-green-700", bg: "bg-green-100" },
  hotel_approved: { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-100" },
  hotel_rejected: { icon: XCircle, color: "text-red-700", bg: "bg-red-100" },
  user_suspended: { icon: Ban, color: "text-red-700", bg: "bg-red-100" },
  user_verified: { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-100" },
}

const savedHotels = [
  "Santorini Blue Dome Suites",
  "Bali Ubud Rainforest Retreat",
  "Maldives Ocean Paradise Resort",
  "Tokyo Imperial Tower Hotel",
  "Le Château Lumière",
]

const paymentHistory = [
  { id: "PAY-001", date: "2026-05-10", amount: 3450, currency: "EUR", method: "Visa **** 4242", status: "completed" },
  { id: "PAY-002", date: "2026-04-22", amount: 2100, currency: "USD", method: "Mastercard **** 8901", status: "completed" },
  { id: "PAY-003", date: "2026-04-05", amount: 4500, currency: "EUR", method: "Visa **** 4242", status: "refunded" },
  { id: "PAY-004", date: "2026-03-01", amount: 2400, currency: "AED", method: "Amex **** 3456", status: "completed" },
  { id: "PAY-005", date: "2026-02-14", amount: 1200, currency: "USD", method: "Visa **** 4242", status: "pending" },
]

export default function AdminUserDetailPage() {
  const { userId } = useParams()
  const user: AdminUser | undefined = adminUsers.find((u) => u.id === userId)
  if (!user) return <NotFoundState />

  const userBookings = adminBookings.filter((b) => b.customerId === user.id)
  const userReviews = adminReviews.filter((r) => r.guestId === user.id)
  const userActivity = adminActivity.filter((a) => a.userId === user.id)

  const upcomingBookings = userBookings.filter((b) => b.bookingStatus === "upcoming").length
  const totalSpent = user.totalSpent
  const reviewsCount = userReviews.length

  const initials = user.name.split(" ").map((n) => n.charAt(0)).join("")

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="size-8 shrink-0" render={<Link to="/admin/users" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <AdminPageHeader title="User Details" subtitle={`View and manage user profile for ${user.name}`} />
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <AdminUserStatusBadge status={user.status} />
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1 flex items-center gap-3">
                <Badge variant={user.membershipTier === "platinum" ? "default" : user.membershipTier === "gold" ? "success" : "secondary"} className="capitalize">
                  {user.membershipTier}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" />
                  Joined {user.joinDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Ban className="mr-2 size-4" />
              {user.status === "suspended" ? "Unsuspend" : "Suspend"} User
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 size-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <Key className="mr-2 size-4" />
              Reset Password
            </Button>
            <Button variant="outline" size="sm">
              <Activity className="mr-2 size-4" />
              View Activity
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <AdminStatCard label="Total Bookings" value={user.totalBookings.toString()} icon={<Calendar className="size-5" />} />
        <AdminStatCard label="Upcoming" value={upcomingBookings.toString()} icon={<Clock className="size-5" />} />
        <AdminStatCard label="Total Spent" value={formatCurrency(totalSpent)} icon={<DollarSign className="size-5" />} />
        <AdminStatCard label="Saved Hotels" value={savedHotels.length.toString()} icon={<Heart className="size-5" />} />
        <AdminStatCard label="Reviews Written" value={reviewsCount.toString()} icon={<Star className="size-5" />} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <Mail className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <Phone className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="text-sm font-medium text-foreground">{user.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <Calendar className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date of Birth</p>
                <p className="text-sm font-medium text-foreground">1988-04-15</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <Globe className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Language</p>
                <p className="text-sm font-medium text-foreground">English</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-muted-foreground">
                <DollarSign className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Preferred Currency</p>
                <p className="text-sm font-medium text-foreground">USD</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Booking History</h3>
            {userBookings.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No bookings found for this user.</p>
            ) : (
              <AdminDataTable headers={["Booking ID", "Hotel", "Room", "Check In", "Check Out", "Amount", "Booking", "Payment"]}>
                {userBookings.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-muted/20">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">{b.bookingId}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{b.roomType}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{b.checkIn}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{b.checkOut}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                      {b.currency === "JPY" ? "¥" : b.currency === "GBP" ? "£" : b.currency === "EUR" ? "€" : b.currency === "AED" ? "AED " : b.currency === "RUB" ? "₽" : b.currency === "AUD" ? "A$" : "$"}
                      {b.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <BookingStatusBadge status={b.bookingStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={b.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </AdminDataTable>
            )}
          </Card>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Payment History</h3>
          <div className="space-y-3">
            {paymentHistory.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {p.currency === "EUR" ? "€" : "$"}{p.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.date} — {p.method}</p>
                </div>
                <Badge
                  variant={p.status === "completed" ? "success" : p.status === "refunded" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {p.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Wishlist Preview</h3>
          {savedHotels.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No saved hotels.</p>
          ) : (
            <div className="space-y-3">
              {savedHotels.map((hotel, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                    <Heart className="size-4" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{hotel}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Reviews Written</h3>
          {userReviews.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No reviews written yet.</p>
          ) : (
            <div className="space-y-3">
              {userReviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-border p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{r.hotelName}</p>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-foreground">{r.rating}</span>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{r.comment}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{r.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Activity Timeline</h3>
            {userActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No recent activity.</p>
            ) : (
              <div className="relative space-y-0">
                {userActivity.map((a, idx) => {
                  const config = activityTypeConfig[a.type] || { icon: Activity, color: "text-neutral-700", bg: "bg-neutral-100" }
                  const Icon = config.icon
                  const isLast = idx === userActivity.length - 1
                  const time = new Date(a.timestamp)
                  const timeStr = time.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                  return (
                    <div key={a.id} className="relative flex gap-4 pb-6">
                      {!isLast && <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />}
                      <div className={`relative z-10 flex size-[30px] shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                        <Icon className={`size-3.5 ${config.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{a.userName}</p>
                        <p className="text-xs text-muted-foreground">{a.description}</p>
                        {a.hotelName && (
                          <p className="text-xs text-muted-foreground">
                            Hotel: {a.hotelName}
                          </p>
                        )}
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{timeStr}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Admin Notes</h3>
          <Textarea
            placeholder="Add internal notes about this user..."
            className="min-h-[160px] resize-none"
          />
          <div className="mt-3 flex items-center gap-2">
            <Button size="sm" className="flex-1">
              <FileText className="mr-2 size-4" />
              Save Notes
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <RefreshCw className="mr-2 size-4" />
              Clear
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Previous Notes</p>
            <div className="rounded-lg border border-border bg-neutral-50 p-3">
              <p className="text-xs text-muted-foreground">
                Reported an issue with payment on booking HZ-38499. Resolved by processing manual refund.
              </p>
              <p className="mt-1 text-[10px] font-medium text-muted-foreground">Admin — 2026-06-02</p>
            </div>
            <div className="rounded-lg border border-border bg-neutral-50 p-3">
              <p className="text-xs text-muted-foreground">
                Contacted user regarding suspected account compromise. User confirmed activity was legitimate.
              </p>
              <p className="mt-1 text-[10px] font-medium text-muted-foreground">Admin — 2026-05-18</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
