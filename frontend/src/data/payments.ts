export interface Payment {
  id: string
  date: string
  description: string
  bookingId: string
  amount: number
  currency: string
  status: "paid" | "refunded" | "failed"
  method: string
}

export const payments: Payment[] = [
  { id: "p-1", date: "2026-07-01", description: "Maldives Overwater Resort", bookingId: "HZB-2026-005", amount: 6000, currency: "USD", status: "paid", method: "Apple Pay" },
  { id: "p-2", date: "2026-06-12", description: "Aurelia Resort Bali", bookingId: "HZB-2026-002", amount: 5250, currency: "USD", status: "paid", method: "PayPal" },
  { id: "p-3", date: "2026-06-10", description: "Lumière Hotel Paris", bookingId: "HZB-2026-001", amount: 7500, currency: "EUR", status: "paid", method: "Visa ending in 4242" },
  { id: "p-4", date: "2026-02-20", description: "Santorini Azure Villas (Cancelled)", bookingId: "HZB-2026-006", amount: 3120, currency: "EUR", status: "refunded", method: "PayPal" },
  { id: "p-5", date: "2026-01-05", description: "Seaside Escape Goa", bookingId: "HZB-2026-004", amount: 1450, currency: "USD", status: "paid", method: "Visa ending in 4242" },
  { id: "p-6", date: "2025-12-15", description: "The Alpine Lodge", bookingId: "HZB-2026-003", amount: 4900, currency: "CHF", status: "paid", method: "Mastercard ending in 1234" },
]
