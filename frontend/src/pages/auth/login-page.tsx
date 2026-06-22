import { useState } from "react"
import { Link } from "react-router"
import { Eye, EyeOff, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { AuthLayout } from "@/components/custom/auth/AuthLayout"
import { SocialAuthButtons } from "@/components/custom/auth/SocialAuthButtons"
import { TrustStrip } from "@/components/custom/auth/TrustStrip"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthLayout imageKey="login" headline="Your perfect stay begins here.">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to access your account and bookings.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input type="email" placeholder="alex@example.com" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FieldContent>
        </Field>
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <Checkbox />
            Remember me
          </label>
          <Link to="/auth/forgot-password" className="text-sm font-medium text-foreground underline-offset-2 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button className="h-12 w-full rounded-xl text-sm font-semibold">
          Sign in
          <ChevronRight className="size-4" />
        </Button>
      </form>

      <SocialAuthButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-medium text-foreground underline-offset-2 hover:underline">
          Create one
        </Link>
      </p>

      <TrustStrip />
    </AuthLayout>
  )
}
