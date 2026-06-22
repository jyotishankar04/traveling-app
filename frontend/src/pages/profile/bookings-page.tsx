import { useState } from "react"
import { Link } from "react-router"
import { MapPin, CalendarDays, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { bookings } from "@/data/bookings"

const tabs = ["All Bookings", "Upcoming", "Completed", "Cancelled"]

const statusVariant: Record<string, "default" | "success" | "destructive" | "secondary"> = {
  confirmed: "default",
  upcoming: "default",
  completed: "secondary",
  cancelled: "destructive",
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All Bookings")

  const filtered = activeTab === "All Bookings" ? bookings : bookings.filter((b) => {
    if (activeTab === "Upcoming") return b.status === "upcoming" || b.status === "confirmed"
    return b.status === activeTab.toLowerCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">My Bookings</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>

      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              activeTab === tab ? "border-neutral-900 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-14 text-center">
          <CalendarDays className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No bookings found</h3>
          <p className="mt-1 text-sm text-muted-foreground">You don't have any {activeTab.toLowerCase()} bookings yet.</p>
          <Link to="/hotels"><Button className="mt-4 rounded-full">Browse hotels</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <Link key={b.id} to={`/profile/bookings/${b.id}`} className="block">
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:shadow-md sm:flex-row">
                <img src={b.hotelImage} alt={b.hotelName} className="h-44 w-full object-cover sm:h-auto sm:w-48" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{b.hotelName}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {b.location}
                      </div>
                    </div>
                    <Badge variant={statusVariant[b.status]}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />{b.checkIn} - {b.checkOut}</span>
                    <span>{b.nights} nights · {b.rooms} room · {b.guests} guests</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div>
                      <span className="text-lg font-bold text-foreground">${b.totalPaid.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground"> · {b.bookingId}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-foreground underline-offset-2 hover:underline">
                      View details
                      <ChevronRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
