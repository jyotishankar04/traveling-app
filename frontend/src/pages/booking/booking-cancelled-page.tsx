import { Link } from "react-router"
import { Ban, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingCancelledPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-orange-100">
          <Ban className="size-10 text-orange-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Booking cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          Your booking has been successfully cancelled. A full refund will be processed within 5-7 business days.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white p-5 text-left text-sm">
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Refund amount</span><span className="font-semibold text-foreground">$1,025</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Processing time</span><span className="font-medium text-foreground">5-7 business days</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Refund method</span><span className="font-medium text-foreground">Original payment method</span></div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/">
            <Button className="w-full rounded-full">
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
          </Link>
          <Link to="/hotels">
            <Button variant="outline" className="w-full rounded-full">
              Browse other hotels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
