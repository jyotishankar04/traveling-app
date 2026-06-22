import type { Hotel } from "@/data/hotels"

interface StepConfirmationProps {
  hotel: Hotel
}

export function StepConfirmation({ hotel }: StepConfirmationProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Almost done!</h1>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Booking summary</h3>
        <div className="mt-3 space-y-2 text-sm">
          <SummaryRow label="Hotel" value={hotel.name} />
          <SummaryRow label="Check-in" value="Oct 15, 2026" />
          <SummaryRow label="Check-out" value="Oct 18, 2026" />
          <SummaryRow label="Guests" value="2 adults" />
          <SummaryRow label="Room" value="Deluxe King Suite" />
          <SummaryRow label="Payment" value="Visa •••• 4242" />
          <SummaryRow label="Billing" value="123 Main Street, New York, 10001" />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-white p-4">
        <input type="checkbox" defaultChecked className="mt-0.5 accent-neutral-900" />
        <span className="text-sm text-muted-foreground">
          By confirming, I agree to the <span className="text-foreground underline">Terms & Conditions</span> and <span className="text-foreground underline">Cancellation Policy</span>.
        </span>
      </label>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
