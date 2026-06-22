import { Link } from "react-router"
import { DollarSign, TrendingUp, Plus, Eye, BedDouble, CalendarDays, Timer, Star, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerStatCard } from "@/components/custom/owner/OwnerStatCard"
import { OwnerChartCard } from "@/components/custom/owner/OwnerChartCard"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { BarChart } from "@/components/custom/owner/BarChart"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { dailyMetrics, channels, revenueByHotel } from "@/data/owner/owner-analytics"
import { ownerBookings } from "@/data/owner/owner-bookings"
import { ownerNotifications } from "@/data/owner/owner-notifications"
import { ownerHotels } from "@/data/owner/owner-hotels"

const maxRevenue = Math.max(...dailyMetrics.map((d) => d.revenue))

const revenueData = dailyMetrics.map((metric) => ({
  key: metric.date,
  value: metric.revenue,
  label: metric.date.replace("Jun ", ""),
}))

const alertIconMap: Record<string, typeof Timer> = {
  availability: Timer,
  payment: DollarSign,
  review: Star,
}

const alertColorMap: Record<string, string> = {
  availability: "bg-amber-100 text-amber-600",
  payment: "bg-emerald-100 text-emerald-600",
  review: "bg-blue-100 text-blue-600",
}

export default function OwnerDashboardPage() {
  const recentBookings = ownerBookings.slice(0, 5)
  const activeAlerts = ownerNotifications.filter((notification) => notification.unread).slice(0, 3)

  return (
    <div>
      <OwnerPageHeader
        title="Welcome back, John!"
        subtitle="Here's what's happening with your properties today."
      >
        <select className="h-9 rounded-xl border border-input bg-white px-3 text-sm outline-none">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>This month</option>
          <option>This year</option>
        </select>
      </OwnerPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <OwnerStatCard label="Total Bookings" value="148" change="+8.3%" changePositive icon={<BookOpen className="size-4" />} />
        <OwnerStatCard label="Total Revenue" value="$751,500" change="+12.5%" changePositive icon={<DollarSign className="size-4" />} />
        <OwnerStatCard label="Occupancy Rate" value="78%" change="+4.2%" changePositive icon={<TrendingUp className="size-4" />} />
        <OwnerStatCard label="Avg Daily Rate" value="$456" change="+3.8%" changePositive icon={<DollarSign className="size-4" />} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <OwnerChartCard
          title="Revenue Overview"
          subtitle="Daily revenue for June 2026"
          action={<select className="h-8 rounded-lg border border-input bg-background px-2 text-xs outline-none"><option>Daily</option><option>Weekly</option></select>}
        >
          <BarChart
            data={revenueData}
            maxValue={maxRevenue}
            height={160}
            formatTooltip={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
        </OwnerChartCard>

        <OwnerChartCard title="Bookings by Channel" subtitle="Distribution across platforms">
          <div className="flex flex-col gap-3">
            {channels.map((channel) => (
              <div key={channel.name} className="flex items-center gap-3">
                <span className="min-w-20 text-sm text-foreground">{channel.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div className={`h-full rounded-full ${channel.color}`} style={{ width: `${channel.percentage}%` }} />
                </div>
                <span className="min-w-[3rem] text-right text-xs text-muted-foreground">{channel.bookings}</span>
              </div>
            ))}
          </div>
        </OwnerChartCard>

        <OwnerChartCard title="Alerts" subtitle="Items requiring attention">
          <div className="space-y-3">
            {activeAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts. Everything looks good!</p>
            ) : (
              activeAlerts.map((alert) => {
                const IconComponent = alertIconMap[alert.type] || Star
                const colorClass = alertColorMap[alert.type] || "bg-blue-100 text-blue-600"
                return (
                  <AlertCard key={alert.id} icon={<IconComponent className="size-4" />} colorClass={colorClass} title={alert.title} message={alert.message} />
                )
              })
            )}
            <Link to="/owner/notifications" className="block text-center text-xs font-medium text-foreground underline-offset-2 hover:underline">
              View all notifications
            </Link>
          </div>
        </OwnerChartCard>
      </div>

      <OwnerChartCard title="Top Performing Hotels" subtitle="Revenue MTD">
        <OwnerDataTable headers={["Hotel", "Revenue", "Bookings", "Occupancy", "Avg Rate", "RevPAR"]}>
          {revenueByHotel.map((hotelMetric) => {
            const hotel = ownerHotels.find((h) => h.name === hotelMetric.hotel)
            return (
              <tr key={hotelMetric.hotel} className="transition hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link to={`/owner/hotels/${hotel?.id || ""}`} className="flex items-center gap-3">
                    <div className="size-8 shrink-0 overflow-hidden rounded-lg">
                      <img src={hotel?.image || ""} alt={hotelMetric.hotel} className="size-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{hotelMetric.hotel}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${hotelMetric.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{hotelMetric.bookings}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{hotelMetric.occupancy}%</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">${hotelMetric.avgRate}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">${hotelMetric.revPAR}</td>
              </tr>
            )
          })}
        </OwnerDataTable>
      </OwnerChartCard>

      <OwnerChartCard title="Recent Bookings" subtitle="Latest reservations">
        <OwnerDataTable headers={["Booking", "Guest", "Hotel", "Check-in", "Amount", "Payment", "Status"]}>
          {recentBookings.map((booking) => (
            <tr key={booking.id} className="transition hover:bg-muted/30">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{booking.bookingId}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{booking.guestName}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{booking.hotelName}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{booking.checkIn}</td>
              <td className="px-4 py-3 text-sm font-medium text-foreground">${booking.amount.toLocaleString()}</td>
              <td className="px-4 py-3"><PaymentStatusBadge status={booking.paymentStatus} /></td>
              <td className="px-4 py-3"><BookingStatusBadge status={booking.bookingStatus} /></td>
            </tr>
          ))}
        </OwnerDataTable>
      </OwnerChartCard>

      <QuickActions />
    </div>
  )
}

function AlertCard({ icon, colorClass, title, message }: { icon: React.ReactNode; colorClass: string; title: string; message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link to="/owner/hotels/new"><Button variant="outline" className="w-full rounded-xl border-dashed"><Plus className="size-4" />Add Hotel</Button></Link>
        <Link to="/owner/hotels/oh-1/rooms"><Button variant="outline" className="w-full rounded-xl border-dashed"><BedDouble className="size-4" />Manage Rooms</Button></Link>
        <Link to="/owner/bookings"><Button variant="outline" className="w-full rounded-xl border-dashed"><Eye className="size-4" />View Bookings</Button></Link>
        <Button variant="outline" className="w-full rounded-xl border-dashed"><CalendarDays className="size-4" />Update Availability</Button>
      </div>
    </div>
  )
}
