import { useState } from "react"
import { Link } from "react-router"
import {
  Users,
  Building2,
  Hotel,
  CalendarCheck2,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Search,
  MessageSquareWarning,
  CreditCard,
  Scale,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { AdminChartCard } from "@/components/custom/admin/AdminChartCard"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/admin/AdminStatusBadges"
import { adminSummary, monthlyRevenue, monthlyBookings, monthlyUsers } from "@/data/admin/admin-analytics"
import { adminHotels } from "@/data/admin/admin-hotels"
import { adminBookings } from "@/data/admin/admin-bookings"
import { adminUsers } from "@/data/admin/admin-users"
import { adminReviews } from "@/data/admin/admin-reviews"
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

function BarChart({
  data,
  dataKey,
  color,
  maxValue,
  formatLabel,
}: {
  data: { month: string }[]
  dataKey: string
  color: string
  maxValue: number
  formatLabel?: (v: number) => string
}) {
  return (
    <div className="flex items-end justify-between gap-1.5" style={{ height: 140 }}>
      {data.map((d) => {
        const value = Number((d as Record<string, unknown>)[dataKey])
        const height = (value / maxValue) * 100
        return (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-medium text-muted-foreground">
              {formatLabel ? formatLabel(value) : value}
            </span>
            <div
              className="w-full rounded-sm transition-all hover:opacity-80"
              style={{ height: `${height}%`, backgroundColor: color, minHeight: 4 }}
            />
            <span className="text-[10px] text-muted-foreground">{d.month}</span>
          </div>
        )
      })}
    </div>
  )
}

const pendingHotels = adminHotels.filter((h) => h.approvalStatus === "pending")

const recentBookings = adminBookings.slice(0, 5)

const recentUsers = [...adminUsers].sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()).slice(0, 5)

const flaggedReviews = adminReviews.filter((r) => r.status === "flagged" || r.status === "pending").slice(0, 3)

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState("year")

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue))
  const maxBookings = Math.max(...monthlyBookings.map((m) => m.bookings))
  const maxUsers = Math.max(...monthlyUsers.map((m) => m.users))

  return (
    <div>
      <AdminPageHeader title="Admin Dashboard" subtitle="Monitor platform performance, manage approvals, and track key metrics across Horizoné.">
        <Select value={dateRange} onValueChange={(v) => setDateRange(v ?? "year")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <AdminStatCard
          label="Total Users"
          value={adminSummary.totalUsers.toLocaleString()}
          change={`+${adminSummary.userGrowth}%`}
          changePositive
          icon={<Users className="size-5" />}
        />
        <AdminStatCard
          label="Hotel Owners"
          value={adminSummary.totalOwners.toLocaleString()}
          icon={<Building2 className="size-5" />}
        />
        <AdminStatCard
          label="Total Hotels"
          value={adminSummary.totalHotels.toLocaleString()}
          icon={<Hotel className="size-5" />}
        />
        <AdminStatCard
          label="Platform Bookings"
          value={adminSummary.totalBookings.toLocaleString()}
          change={`+${adminSummary.bookingGrowth}%`}
          changePositive
          icon={<CalendarCheck2 className="size-5" />}
        />
        <AdminStatCard
          label="Revenue"
          value={formatCurrency(adminSummary.totalRevenue)}
          change={`+${adminSummary.revenueGrowth}%`}
          changePositive
          icon={<DollarSign className="size-5" />}
        />
        <AdminStatCard
          label="Pending Approvals"
          value={adminSummary.pendingApprovals.toString()}
          icon={<Clock className="size-5" />}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AdminChartCard title="Platform Revenue" subtitle="Monthly revenue trend">
          <BarChart data={monthlyRevenue} dataKey="revenue" color="#2563eb" maxValue={maxRevenue} formatLabel={(v) => formatCurrency(v)} />
        </AdminChartCard>
        <AdminChartCard title="Booking Trend" subtitle="Monthly booking volume">
          <BarChart data={monthlyBookings} dataKey="bookings" color="#059669" maxValue={maxBookings} />
        </AdminChartCard>
        <AdminChartCard title="User Growth" subtitle="Monthly user count">
          <BarChart data={monthlyUsers} dataKey="users" color="#d97706" maxValue={maxUsers} formatLabel={(v) => v.toLocaleString()} />
        </AdminChartCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border border-border bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Pending Hotel Approvals</h3>
            <Button variant="ghost" size="sm" className="text-xs" render={<Link to="/admin/hotels/pending" />}>
              View All <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </div>
          {pendingHotels.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No pending hotel approvals.</p>
          ) : (
            <div className="space-y-4">
              {pendingHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between rounded-xl border border-border bg-neutral-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-white text-xs font-bold text-muted-foreground">
                      {hotel.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{hotel.name}</p>
                      <p className="text-xs text-muted-foreground">{hotel.ownerName} — {hotel.city}, {hotel.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{hotel.completenessScore}% complete</span>
                    <Button size="icon" variant="ghost" className="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <CheckCircle2 className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                      <XCircle className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900">Pending Approvals</p>
                  <p className="text-xs text-amber-700">{adminSummary.pendingApprovals} hotels need review</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-amber-200 text-amber-800">{adminSummary.pendingApprovals}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <MessageSquareWarning className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-900">Flagged Reviews</p>
                  <p className="text-xs text-red-700">{adminSummary.flaggedReviews} reviews flagged</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-red-200 text-red-800">{adminSummary.flaggedReviews}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <CreditCard className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-900">Failed Payouts</p>
                  <p className="text-xs text-orange-700">{adminSummary.failedPayouts} payouts pending</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange-200 text-orange-800">{adminSummary.failedPayouts}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Scale className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Booking Disputes</p>
                  <p className="text-xs text-blue-700">{adminSummary.bookingDisputes} disputes open</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">{adminSummary.bookingDisputes}</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Bookings</h3>
            <Button variant="ghost" size="sm" className="text-xs" render={<Link to="/admin/bookings" />}>
              View All <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </div>
          <AdminDataTable headers={["Booking", "Guest", "Hotel", "Amount", "Status", "Payment"]}>
            {recentBookings.map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">{b.bookingId}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${b.customerName.toLowerCase().replace(/\s+/g, "-")}`} />
                      <AvatarFallback>{b.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{b.customerName}</span>
                  </div>
                </td>
                <td className="max-w-[160px] truncate px-4 py-3 text-sm text-muted-foreground">{b.hotelName}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {formatCurrency(b.amount)}
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
        </Card>

        <Card className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Registrations</h3>
            <Button variant="ghost" size="sm" className="text-xs" render={<Link to="/admin/users" />}>
              View All <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </div>
          <AdminDataTable headers={["User", "Email", "Country", "Tier", "Joined"]}>
            {recentUsers.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src={u.avatar} alt={u.name} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{u.country}</td>
                <td className="px-4 py-3">
                  <Badge variant={u.membershipTier === "platinum" ? "default" : u.membershipTier === "gold" ? "success" : "secondary"} className="capitalize">
                    {u.membershipTier}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{u.joinDate}</td>
              </tr>
            ))}
          </AdminDataTable>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start text-sm" render={<Link to="/admin/hotels/pending" />}>
                <Clock className="mr-2 size-4 text-amber-600" />
                Review Pending Hotels
              </Button>
              <Button variant="outline" className="justify-start text-sm" render={<Link to="/admin/offers/new" />}>
                <DollarSign className="mr-2 size-4 text-emerald-600" />
                Create Offer
              </Button>
              <Button variant="outline" className="justify-start text-sm" render={<Link to="/admin/users" />}>
                <Users className="mr-2 size-4 text-blue-600" />
                Manage Users
              </Button>
              <Button variant="outline" className="justify-start text-sm">
                <Search className="mr-2 size-4 text-purple-600" />
                View Reports
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="rounded-2xl border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Review Moderation Queue</h3>
              <Button variant="ghost" size="sm" className="text-xs" render={<Link to="/admin/reviews" />}>
                View All <ArrowUpRight className="ml-1 size-3.5" />
              </Button>
            </div>
            {flaggedReviews.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No reviews needing moderation.</p>
            ) : (
              <div className="space-y-3">
                {flaggedReviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarImage src={r.guestAvatar} alt={r.guestName} />
                          <AvatarFallback>{r.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{r.guestName}</span>
                        <span className="text-xs text-muted-foreground">on {r.hotelName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.flagReason && (
                          <Badge variant="destructive" className="text-[10px]">{r.flagReason}</Badge>
                        )}
                        <Badge variant={r.status === "flagged" ? "destructive" : "secondary"} className="capitalize text-[10px]">
                          {r.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
