import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"

const tabs = ["General", "Notifications", "Payments", "Security"]

export default function OwnerSettingsPage() {
  const [tab, setTab] = useState("General")

  return (
    <div>
      <OwnerPageHeader title="Settings" subtitle="Manage your account settings">
        <Button className="rounded-full">Save Changes</Button>
      </OwnerPageHeader>

      <div className="mb-6 flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              tab === t ? "border-neutral-900 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-foreground">Property name</label>
              <input defaultValue="Anderson Hospitality Group" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Time zone</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>Eastern Time (ET)</option><option>Pacific Time (PT)</option><option>Central European Time (CET)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Currency</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Check-in time</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>3:00 PM</option><option>2:00 PM</option><option>4:00 PM</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Check-out time</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>11:00 AM</option><option>10:00 AM</option><option>12:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {tab === "Notifications" && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="space-y-4">
            {[
              { label: "New booking notifications", desc: "Get notified when a new booking is received" },
              { label: "Payment notifications", desc: "Receive alerts for payments and payouts" },
              { label: "Review notifications", desc: "Get notified when a new review is posted" },
              { label: "Occupancy alerts", desc: "Alerts when occupancy reaches thresholds" },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-neutral-900" />
              </label>
            ))}
          </div>
        </div>
      )}

      {tab === "Payments" && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Payout method</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>Bank Transfer (•••• 8842)</option><option>PayPal</option><option>Stripe</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Tax information</label>
              <input defaultValue="TAX-ID: 88-1234567" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Invoice preferences</label>
              <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none">
                <option>Monthly invoice</option><option>Per-booking invoice</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {tab === "Security" && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-foreground">Password</p><p className="text-xs text-muted-foreground">Last changed 3 months ago</p></div>
              <Button variant="outline" className="rounded-full text-xs" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-foreground">Two-factor authentication</p><p className="text-xs text-muted-foreground">Not enabled</p></div>
              <Button variant="outline" className="rounded-full text-xs" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-foreground">Active sessions</p><p className="text-xs text-muted-foreground">2 active sessions</p></div>
              <Button variant="outline" className="rounded-full text-xs text-red-600" size="sm">Log out all</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
