import { Link } from "react-router"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="size-10 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Booking confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your stay at <span className="font-medium text-foreground">The Grand Palace Hotel</span> has been confirmed.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white p-5 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Booking ID</span><span className="font-medium text-foreground">HZBK-2026-1002</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium text-foreground">Oct 15, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium text-foreground">Oct 18, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total paid</span><span className="font-semibold text-foreground">$1,025</span></div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/profile/bookings">
            <Button className="w-full rounded-full">
              View my bookings
              <ChevronRight className="size-4" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full rounded-full">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
