import { useState } from "react"
import { Link } from "react-router"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/custom/auth/AuthLayout"
import { OTPInputGroup } from "@/components/custom/auth/OTPInputGroup"
import { TrustStrip } from "@/components/custom/auth/TrustStrip"

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [countdown] = useState(30)

  return (
    <AuthLayout imageKey="verify" headline="One last step to get started.">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground">Verify your email</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enter the 6-digit code sent to your email.</p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
        <span className="text-muted-foreground">alex.thompson@example.com</span>
        <button className="text-xs font-medium text-foreground underline-offset-2 hover:underline">Edit</button>
      </div>

      <div className="mt-6">
        <OTPInputGroup length={6} value={otp} onChange={setOtp} />
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        <button
          disabled={countdown > 0}
          className="font-medium text-foreground underline-offset-2 hover:underline disabled:pointer-events-none disabled:text-muted-foreground"
        >
          Resend {countdown > 0 && `(${countdown}s)`}
        </button>
      </div>

      <Button className="mt-6 h-12 w-full rounded-xl text-sm font-semibold" disabled={otp.length < 6}>
        Verify
        <ChevronRight className="size-4" />
      </Button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="font-medium text-foreground underline-offset-2 hover:underline">
          Back to sign in
        </Link>
      </p>

      <TrustStrip />
    </AuthLayout>
  )
}
