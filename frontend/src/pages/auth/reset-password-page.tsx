import { useState } from "react"
import { Link } from "react-router"
import { Eye, EyeOff, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { AuthLayout } from "@/components/custom/auth/AuthLayout"
import { TrustStrip } from "@/components/custom/auth/TrustStrip"

export default function ResetPasswordPage() {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState(false)

  const strength = 75

  if (done) {
    return (
      <AuthLayout imageKey="reset" headline="Your password has been updated.">
        <div className="text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="size-7 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Password reset successfully</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your password has been updated. You can now sign in with your new password.</p>
        </div>
        <Link to="/auth/login">
          <Button className="mt-6 h-12 w-full rounded-xl text-sm font-semibold">
            Sign in
            <ChevronRight className="size-4" />
          </Button>
        </Link>
        <TrustStrip />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout imageKey="reset" headline="Choose a strong new password.">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground">Set new password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your new password must be different from your previous one.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field>
          <FieldLabel>New password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} placeholder="Enter new password" className="pr-10" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FieldContent>
        </Field>

        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Password strength</span>
            <span className="font-medium text-green-600">Strong</span>
          </div>
          <Progress value={strength} className="mt-1">
            <ProgressTrack>
              <ProgressIndicator className="bg-green-500" />
            </ProgressTrack>
          </Progress>
        </div>

        <Field>
          <FieldLabel>Confirm password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input type={showConfirm ? "text" : "password"} placeholder="Confirm new password" className="pr-10" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="size-3" />
              Passwords match
            </p>
          </FieldContent>
        </Field>

        <Button className="h-12 w-full rounded-xl text-sm font-semibold" onClick={() => setDone(true)}>
          Reset password
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
