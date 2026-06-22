import { Outlet } from "react-router"
import Navbar from "@/components/custom/landing/navbar"
import { PublicFooter } from "@/components/custom/shared/PublicFooter"

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <PublicFooter />
    </div>
  )
}
