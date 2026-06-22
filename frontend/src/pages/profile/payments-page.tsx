import { useState } from "react"
import { Link } from "react-router"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { payments } from "@/data/payments"

export default function PaymentsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">Payment Methods</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Payment Methods</h1>
        <Button className="rounded-full" onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-1 size-4" />
          Add method
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">Add a payment method</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-foreground">Card number</label>
              <input placeholder="4242 4242 4242 4242" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Expiry</label>
              <input placeholder="MM/YY" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">CVC</label>
              <input placeholder="123" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Cardholder name</label>
              <input placeholder="Alex Thompson" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Billing ZIP</label>
              <input placeholder="10001" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" className="rounded-full" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button className="rounded-full" onClick={() => setShowForm(false)}>Save card</Button>
          </div>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-14 text-center">
          <CreditCard className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No payment methods</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add a card to start booking stays.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl border border-border">
                  <CreditCard className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{p.method}</span>
                    {p.status === "paid" && <Badge variant="secondary" className="text-[10px]">Default</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.date} · ${p.amount.toLocaleString()}</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-red-500"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
