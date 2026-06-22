import { Outlet } from "react-router"
import Navbar from "@/components/custom/landing/navbar"
import { PublicFooter } from "@/components/custom/shared/PublicFooter"
import { AccountSidebar } from "@/components/custom/user/AccountSidebar"

export function UserAccountLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <div className="flex gap-8">
            <AccountSidebar />
            <main className="min-w-0 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
