import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">Settings</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Password</h3>
        <p className="mt-1 text-sm text-muted-foreground">Manage your password and security preferences.</p>
        <Button variant="outline" className="mt-3 rounded-full">Change password</Button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Two-factor authentication</h3>
        <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
        <Button variant="outline" className="mt-3 rounded-full">Enable 2FA</Button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Delete account</h3>
        <p className="mt-1 text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
        <Button variant="outline" className="mt-3 rounded-full text-red-600 hover:bg-red-50 hover:text-red-600">Delete account</Button>
      </div>

      <div className="flex justify-end">
        <Button className="rounded-full px-6">Save settings</Button>
      </div>
    </div>
  )
}
