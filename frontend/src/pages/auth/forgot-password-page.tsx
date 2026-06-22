import { useState } from "react"
import { Link } from "react-router"
import { ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { AuthLayout } from "@/components/custom/auth/AuthLayout"
import { TrustStrip } from "@/components/custom/auth/TrustStrip"

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <AuthLayout imageKey="forgot" headline="Check your inbox.">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
            <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
        </Link>

        <div className="mt-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="size-7 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a password reset link to <strong className="text-foreground">alex.thompson@example.com</strong>
          </p>
        </div>

        <Button className="mt-6 h-12 w-full rounded-xl text-sm font-semibold" onClick={() => setSubmitted(false)}>
          Send again
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

  return (
    <AuthLayout imageKey="forgot" headline="Don't worry, we've got you covered.">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground">Reset your password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input type="email" placeholder="alex@example.com" />
          </FieldContent>
        </Field>
        <Button className="h-12 w-full rounded-xl text-sm font-semibold" onClick={() => setSubmitted(true)}>
          Send reset link
          <ChevronRight className="size-4" />
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="font-medium text-foreground underline-offset-2 hover:underline">
          Back to sign in
        </Link>
      </p>

      <TrustStrip />
    </AuthLayout>
  )
}
