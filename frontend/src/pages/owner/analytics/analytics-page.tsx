import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerStatCard } from "@/components/custom/owner/OwnerStatCard"
import { OwnerChartCard } from "@/components/custom/owner/OwnerChartCard"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { BarChart, ChartLegend } from "@/components/custom/owner/BarChart"
import {
  dailyMetrics, occupancyTrend, bookingWindows, marketComparison,
  revenueByHotel, roomTypePerformance, analyticsSummary,
} from "@/data/owner/owner-analytics"

const maxRevenue = Math.max(...dailyMetrics.map((d) => d.revenue))
const maxOccupancyTarget = Math.max(...occupancyTrend.map((o) => Math.max(o.occupancy, o.target)))
const maxBookingWindow = Math.max(...bookingWindows.map((w) => w.bookings))
const maxRevPAR = Math.max(...marketComparison.map((m) => Math.max(m.ourRevPAR, m.revPAR)))

const revenueData = dailyMetrics.map((metric) => ({
  key: metric.date,
  value: metric.revenue,
  label: metric.date.replace("Jun ", ""),
}))

const bookingData = dailyMetrics.map((metric) => ({
  key: metric.date,
  value: metric.bookings,
  label: metric.date.replace("Jun ", ""),
}))

export default function AnalyticsPage() {
  return (
    <div>
      <OwnerPageHeader title="Analytics Overview" subtitle="Revenue, occupancy, and booking performance">
        <select className="h-9 rounded-xl border border-input bg-white px-3 text-sm outline-none">
          <option>This Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
        <Button variant="outline" className="rounded-full"><Download className="size-4" />Export</Button>
      </OwnerPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <OwnerStatCard label="Total Revenue" value={`$${(analyticsSummary.totalRevenue / 1000).toFixed(0)}k`} change={`+${analyticsSummary.revenueGrowth}%`} changePositive />
        <OwnerStatCard label="Total Bookings" value={`${analyticsSummary.totalBookings}`} change={`+${analyticsSummary.bookingGrowth}%`} changePositive />
        <OwnerStatCard label="Occupancy" value={`${analyticsSummary.avgOccupancy}%`} change={`+${analyticsSummary.occupancyChange}%`} changePositive />
        <OwnerStatCard label="Avg Daily Rate" value={`$${analyticsSummary.avgDailyRate}`} change={`+${analyticsSummary.adrChange}%`} changePositive />
        <OwnerStatCard label="RevPAR" value={`$${analyticsSummary.revPAR}`} change={`+${analyticsSummary.revPARChange}%`} changePositive />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OwnerChartCard title="Revenue & Bookings" subtitle="Combo view for June 2026">
          <BarChart
            data={revenueData}
            maxValue={maxRevenue}
            height={160}
            color="bg-neutral-900/30"
            formatTooltip={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <BarChart
            data={bookingData}
            maxValue={18}
            height={40}
            color="bg-neutral-900"
            formatTooltip={(value) => `${value} bookings`}
          />
          <ChartLegend
            items={[
              { label: "Revenue", color: "bg-neutral-900/30" },
              { label: "Bookings", color: "bg-neutral-900" },
            ]}
          />
        </OwnerChartCard>

        <OwnerChartCard title="Occupancy Trend" subtitle="Monthly occupancy vs target">
          <OccupancyChart />
        </OwnerChartCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OwnerChartCard title="Booking Window" subtitle="Days between booking and check-in">
          <BarChart
            data={bookingWindows.map((window) => ({
              key: String(window.daysOut),
              value: window.bookings,
              label: `${window.daysOut}d`,
            }))}
            maxValue={maxBookingWindow}
            height={140}
            formatTooltip={(value) => `${value} bookings`}
          />
        </OwnerChartCard>

        <OwnerChartCard title="Market Comparison" subtitle="RevPAR vs competitors">
          <MarketComparisonChart />
        </OwnerChartCard>
      </div>

      <OwnerChartCard title="Revenue by Hotel" subtitle="Performance breakdown">
        <OwnerDataTable headers={["Hotel", "Revenue", "Bookings", "Occupancy", "Avg Rate", "RevPAR"]}>
          {revenueByHotel.map((hotelMetric) => (
            <tr key={hotelMetric.hotel} className="transition hover:bg-muted/30">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{hotelMetric.hotel}</td>
              <td className="px-4 py-3 text-sm font-semibold text-foreground">${hotelMetric.revenue.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{hotelMetric.bookings}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{hotelMetric.occupancy}%</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">${hotelMetric.avgRate}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">${hotelMetric.revPAR}</td>
            </tr>
          ))}
        </OwnerDataTable>
      </OwnerChartCard>

      <OwnerChartCard title="Room Type Performance" subtitle="By revenue and occupancy">
        <OwnerDataTable headers={["Room Type", "Hotel", "Revenue", "Bookings", "Occupancy", "Avg Rate"]}>
          {roomTypePerformance.map((roomMetric) => (
            <tr key={roomMetric.roomType + roomMetric.hotel} className="transition hover:bg-muted/30">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{roomMetric.roomType}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{roomMetric.hotel}</td>
              <td className="px-4 py-3 text-sm font-semibold text-foreground">${roomMetric.revenue.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{roomMetric.bookings}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{roomMetric.occupancy}%</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">${roomMetric.avgRate}</td>
            </tr>
          ))}
        </OwnerDataTable>
      </OwnerChartCard>
    </div>
  )
}

function OccupancyChart() {
  return (
    <>
      <div className="flex items-end gap-3" style={{ height: 160 }}>
        {occupancyTrend.map((metric) => (
          <div key={metric.month} className="group relative flex flex-1 flex-col items-center justify-end">
            <div className="absolute -top-6 hidden text-[10px] text-muted-foreground group-hover:block">{metric.occupancy}%</div>
            <div
              className="w-full rounded-t bg-emerald-500 transition hover:bg-emerald-600"
              style={{ height: `${(metric.occupancy / maxOccupancyTarget) * 140}px` }}
            />
            <div
              className="mt-0.5 w-full rounded-t border-2 border-dashed border-amber-400"
              style={{ height: `${(metric.target / maxOccupancyTarget) * 140}px` }}
            />
            <span className="mt-1 text-[9px] text-muted-foreground">{metric.month}</span>
          </div>
        ))}
      </div>
      <ChartLegend
        items={[
          { label: "Occupancy", color: "bg-emerald-500" },
          { label: "Target", color: "border-amber-400", shape: "dashed" },
        ]}
      />
    </>
  )
}

function MarketComparisonChart() {
  return (
    <>
      <div className="flex flex-col gap-3">
        {marketComparison.map((competitor) => (
          <div key={competitor.hotel} className="flex items-center gap-3">
            <span className="w-36 truncate text-sm text-foreground">{competitor.hotel}</span>
            <div className="flex-1">
              <div className="flex h-5 items-center gap-1">
                <div
                  className="h-full rounded bg-neutral-900 transition hover:bg-neutral-700"
                  style={{ width: `${(competitor.ourRevPAR / maxRevPAR) * 100}%` }}
                />
                <div
                  className="h-full rounded bg-neutral-300 transition hover:bg-neutral-400"
                  style={{ width: `${(competitor.revPAR / maxRevPAR) * 100}%` }}
                />
              </div>
            </div>
            <span className="min-w-[4rem] text-right text-xs text-muted-foreground">${competitor.ourRevPAR}</span>
          </div>
        ))}
      </div>
      <ChartLegend
        items={[
          { label: "Our RevPAR", color: "bg-neutral-900" },
          { label: "Market Avg", color: "bg-neutral-300" },
        ]}
      />
    </>
  )
}
