import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { OwnerStatCard } from "@/components/custom/owner/OwnerStatCard"
import { OwnerDataTable } from "@/components/custom/owner/OwnerDataTable"
import { PaymentStatusBadge } from "@/components/custom/owner/OwnerStatusBadges"
import { ownerPayouts, payoutSummary } from "@/data/owner/owner-payouts"

export default function PayoutsPage() {
  return (
    <div>
      <OwnerPageHeader title="Payouts" subtitle="Track your earnings and payouts.">
        <Button variant="outline" className="rounded-full"><Download className="size-4" />Export</Button>
      </OwnerPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <OwnerStatCard label="Earnings This Month" value={`$${(payoutSummary.totalEarningsThisMonth / 1000).toFixed(0)}k`} change="+12.5%" changePositive />
        <OwnerStatCard label="Total Payouts" value={`$${(payoutSummary.totalPayouts / 1000).toFixed(0)}k`} />
        <OwnerStatCard label="Pending Payout" value={`$${(payoutSummary.pendingPayout / 1000).toFixed(0)}k`} />
        <OwnerStatCard label="Next Payout Date" value={payoutSummary.nextPayoutDate} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <OwnerDataTable headers={["Payout ID", "Date", "Period", "Amount", "Bookings", "Status", "Method"]}>
              {ownerPayouts.map((p) => (
                <tr key={p.id} className="transition hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{p.payoutId}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.periodStart} - {p.periodEnd}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">${p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.bookingCount}</td>
                  <td className="px-4 py-3"><PaymentStatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.method}</td>
                </tr>
              ))}
            </OwnerDataTable>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Payout Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Next payout date</span><span className="font-medium text-foreground">{payoutSummary.nextPayoutDate}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Estimated amount</span><span className="font-semibold text-foreground">${payoutSummary.estimatedNextAmount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payout method</span><span className="font-medium text-foreground">{payoutSummary.payoutMethod}</span></div>
            <hr className="border-border" />
            <Button className="w-full rounded-xl text-xs" size="sm">View Details</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
