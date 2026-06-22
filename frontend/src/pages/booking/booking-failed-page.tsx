import { Link } from "react-router"
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="size-10 text-red-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Payment failed</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't process your payment. Please check your payment details and try again.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-red-50 p-4 text-left text-sm text-red-700">
          <p className="font-medium">Possible reasons:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-red-600">
            <li>Insufficient funds</li>
            <li>Card expired or invalid</li>
            <li>Payment gateway timeout</li>
            <li>Transaction declined by bank</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/booking/checkout">
            <Button className="w-full rounded-full">
              <RefreshCcw className="size-4" />
              Try again
            </Button>
          </Link>
          <Link to="/profile/payments">
            <Button variant="outline" className="w-full rounded-full">
              Update payment method
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full rounded-full text-muted-foreground">
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
