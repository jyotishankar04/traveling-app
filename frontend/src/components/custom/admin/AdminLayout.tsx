import { useState } from "react"
import { Outlet } from "react-router"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { AdminSidebar, AdminSidebarContent } from "./AdminSidebar"
import { AdminTopbar } from "./AdminTopbar"

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar />
        <SheetContent side="left" className="w-64! p-0! bg-neutral-950!">
          <AdminSidebarContent onClose={() => setSidebarOpen(false)} />
        </SheetContent>
        <div className="flex min-h-screen flex-1 flex-col min-w-0 lg:ml-64">
          <AdminTopbar />
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </Sheet>
  )
}
