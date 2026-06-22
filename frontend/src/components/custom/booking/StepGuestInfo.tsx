export function StepGuestInfo() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Guest information</h1>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Contact details</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-foreground">Email</label>
            <input defaultValue="alex.thompson@example.com" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">Phone</label>
            <input defaultValue="+1 (555) 123-4567" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">Special requests</label>
            <input placeholder="Early check-in, high floor, etc." className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Guest details</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-foreground">Full name</label>
            <input defaultValue="Alex Thompson" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">ID / Passport number</label>
            <input placeholder="AB1234567" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
