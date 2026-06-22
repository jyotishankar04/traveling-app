import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { ownerUser } from "@/data/owner/owner"

export default function OwnerProfilePage() {
  return (
    <div>
      <OwnerPageHeader title="Profile" subtitle="Your personal information" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Profile Information</h3>
          <div className="flex items-center gap-4">
            <img src={ownerUser.avatar} alt={ownerUser.name} className="size-16 rounded-2xl object-cover" />
            <div>
              <p className="font-semibold text-foreground">{ownerUser.name}</p>
              <p className="text-sm text-muted-foreground">{ownerUser.email}</p>
              <p className="text-sm text-muted-foreground">{ownerUser.phone}</p>
              <p className="text-sm text-muted-foreground">{ownerUser.role}</p>
              <p className="text-sm text-muted-foreground">{ownerUser.language}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Business Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Business name</span><span className="font-medium text-foreground">{ownerUser.businessName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Business type</span><span className="font-medium text-foreground">{ownerUser.businessType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Registration</span><span className="font-medium text-foreground">{ownerUser.registrationNumber}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium text-foreground">{ownerUser.country}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-medium text-foreground max-w-[200px] text-right">{ownerUser.address}</span></div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Verification Status</h3>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100">
              <div className="size-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Verified Account</p>
              <p className="text-xs text-muted-foreground">Your identity and business have been verified</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-4 font-semibold text-foreground">Account Security</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Password</span>
              <button className="font-medium text-foreground underline-offset-2 hover:underline">Change</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Two-factor authentication</span>
              <button className="font-medium text-foreground underline-offset-2 hover:underline">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active sessions</span>
              <span className="font-medium text-foreground">2 devices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
