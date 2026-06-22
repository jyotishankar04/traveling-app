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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <AuthLayout imageKey="register" headline="Create your account and start exploring.">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground">Create an account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Join Horizoné and unlock premium travel experiences.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>First name</FieldLabel>
            <FieldContent>
              <Input placeholder="Alex" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <FieldContent>
              <Input placeholder="Thompson" />
            </FieldContent>
          </Field>
        </div>
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
              <Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Confirm password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input type={showConfirm ? "text" : "password"} placeholder="Confirm your password" className="pr-10" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FieldContent>
        </Field>
        <label className="flex cursor-pointer items-start gap-2 text-sm text-muted-foreground">
          <Checkbox className="mt-0.5" />
          <span>I agree to the <Link to="/" className="font-medium text-foreground underline-offset-2 hover:underline">Terms of Service</Link> and <Link to="/" className="font-medium text-foreground underline-offset-2 hover:underline">Privacy Policy</Link></span>
        </label>
        <Button className="h-12 w-full rounded-xl text-sm font-semibold">
          Create account
          <ChevronRight className="size-4" />
        </Button>
      </form>

      <SocialAuthButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-foreground underline-offset-2 hover:underline">
          Sign in
        </Link>
      </p>

      <TrustStrip />
    </AuthLayout>
  )
}
