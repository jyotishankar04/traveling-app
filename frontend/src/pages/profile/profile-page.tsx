import { Link } from "react-router"
import { CalendarDays, Heart, CreditCard, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { currentUser } from "@/data/users"
import { bookings } from "@/data/bookings"


export default function ProfilePage() {
  const u = currentUser
  const recent = bookings.filter((b) => b.status === "upcoming" || b.status === "confirmed").slice(0, 3)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Welcome back, {u.name.split(" ")[0]}!</h1>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-white p-5">
          <Avatar size="lg"><AvatarImage src={u.avatar} alt={u.name} /><AvatarFallback>AT</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">{u.name}</p>
            <p className="text-sm text-muted-foreground">{u.email}</p>
            <p className="text-xs text-muted-foreground">{u.phone}</p>
            <p className="text-xs text-muted-foreground">Member since {u.memberSince}</p>
          </div>
          <Link to="/profile/edit">
            <Button variant="outline" className="rounded-full text-xs" size="sm">Edit profile</Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 sm:w-56">
          <div className="flex items-center justify-between">
            <Badge>{u.membershipTier}</Badge>
            <span className="text-lg font-bold text-foreground">{u.rewardPoints.toLocaleString()}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Reward points</p>
          <Progress value={75} className="mt-2" />
          <p className="mt-1 text-[11px] text-muted-foreground">2,750 pts to next tier</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: CalendarDays, label: "Trips Completed", value: u.tripsCompleted },
          { icon: CalendarDays, label: "Upcoming Trips", value: u.upcomingTrips },
          { icon: Heart, label: "Saved Stays", value: u.savedStays },
          { icon: CreditCard, label: "Reward Points", value: u.rewardPoints.toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-white p-4 text-center">
            <stat.icon className="mx-auto size-5 text-muted-foreground" />
            <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: CalendarDays, label: "View My Bookings", to: "/profile/bookings" },
          { icon: Heart, label: "Manage Saved Stays", to: "/profile/wishlist" },
          { icon: CreditCard, label: "Payment Methods", to: "/profile/payments" },
          { icon: Settings, label: "Account Settings", to: "/profile/settings" },
        ].map((action) => (
          <Link key={action.label} to={action.to} className="rounded-2xl border border-border bg-white p-4 text-center transition hover:shadow-md">
            <action.icon className="mx-auto size-6 text-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">{action.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Recent bookings</h2>
          <Link to="/profile/bookings" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="divide-y divide-border">
          {recent.map((b) => (
            <Link key={b.id} to={`/profile/bookings/${b.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-muted/30">
              <img src={b.hotelImage} alt={b.hotelName} className="size-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{b.hotelName}</p>
                <p className="text-xs text-muted-foreground">{b.checkIn} - {b.checkOut} · {b.nights} nights</p>
              </div>
              <span className="text-sm font-semibold text-foreground">${b.totalPaid.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 p-6">
        <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-bold text-white">Refer a friend & earn $50</p>
            <p className="text-sm text-white/60">Share Horizoné with your friends and earn travel credits.</p>
          </div>
          <Button className="shrink-0 rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 hover:bg-white/90">Share now</Button>
        </div>
      </div>
    </div>
  )
}
