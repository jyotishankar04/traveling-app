import { useState } from "react"
import { X } from "lucide-react"
import { Outlet } from "react-router"
import { OwnerSidebar } from "./OwnerSidebar"
import { OwnerTopbar } from "./OwnerTopbar"

export function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <OwnerSidebar />
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <OwnerSidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <button className="absolute right-4 top-4 text-white" onClick={() => setSidebarOpen(false)}>
            <X className="size-6" />
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <OwnerTopbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
