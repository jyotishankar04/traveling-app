export interface OwnerPayout {
  id: string
  payoutId: string
  date: string
  periodStart: string
  periodEnd: string
  amount: number
  currency: string
  status: "paid" | "pending" | "processing" | "failed"
  method: string
  bookingCount: number
  fees: number
  netAmount: number
}

export const ownerPayouts: OwnerPayout[] = [
  { id: "pay-1", payoutId: "PO-2026-006", date: "Jun 15, 2026", periodStart: "Jun 1", periodEnd: "Jun 14", amount: 45200, currency: "USD", status: "paid", method: "Bank Transfer", bookingCount: 38, fees: 1356, netAmount: 43844 },
  { id: "pay-2", payoutId: "PO-2026-005", date: "Jun 1, 2026", periodStart: "May 16", periodEnd: "May 31", amount: 38900, currency: "USD", status: "paid", method: "Bank Transfer", bookingCount: 32, fees: 1167, netAmount: 37733 },
  { id: "pay-3", payoutId: "PO-2026-004", date: "May 15, 2026", periodStart: "May 1", periodEnd: "May 15", amount: 41200, currency: "USD", status: "paid", method: "PayPal", bookingCount: 35, fees: 1236, netAmount: 39964 },
  { id: "pay-4", payoutId: "PO-2026-003", date: "May 1, 2026", periodStart: "Apr 16", periodEnd: "Apr 30", amount: 35600, currency: "USD", status: "paid", method: "Bank Transfer", bookingCount: 29, fees: 1068, netAmount: 34532 },
  { id: "pay-5", payoutId: "PO-2026-002", date: "Apr 15, 2026", periodStart: "Apr 1", periodEnd: "Apr 15", amount: 29800, currency: "USD", status: "paid", method: "Stripe", bookingCount: 24, fees: 894, netAmount: 28906 },
  { id: "pay-6", payoutId: "PO-2026-001", date: "Apr 1, 2026", periodStart: "Mar 16", periodEnd: "Mar 31", amount: 26100, currency: "USD", status: "paid", method: "PayPal", bookingCount: 21, fees: 783, netAmount: 25317 },
]

export const payoutSummary = {
  totalEarningsThisMonth: 751500,
  totalPayouts: 216900,
  pendingPayout: 45200,
  nextPayoutDate: "Jul 1, 2026",
  estimatedNextAmount: 48500,
  payoutMethod: "Bank Transfer (•••• 8842)",
}
