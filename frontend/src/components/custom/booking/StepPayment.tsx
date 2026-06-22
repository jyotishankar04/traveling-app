import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Wallet } from "lucide-react"

const PAYMENT_OPTIONS = [
  { name: "Visa •••• 4242", isDefault: true },
  { name: "Mastercard •••• 8888", isDefault: false },
  { name: "PayPal", isDefault: false },
]

export function StepPayment() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Payment</h1>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Select payment method</h3>
        <div className="mt-3 space-y-3">
          {PAYMENT_OPTIONS.map((option, index) => (
            <label key={option.name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50">
              <input type="radio" name="payment" defaultChecked={index === 0} className="accent-neutral-900" />
              <Wallet className="size-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{option.name}</span>
              {option.isDefault && <Badge variant="secondary" className="ml-auto text-[10px]">Default</Badge>}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Billing address</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-foreground">Street</label>
            <input defaultValue="123 Main Street" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">City</label>
            <input defaultValue="New York" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">ZIP</label>
            <input defaultValue="10001" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-border bg-green-50 p-4">
        <ShieldCheck className="size-5 text-green-600" />
        <span className="text-sm text-green-700">Your payment is secured with 256-bit SSL encryption.</span>
      </div>
    </div>
  )
}
