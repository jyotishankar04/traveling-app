import { useState } from "react"
import { Link } from "react-router"
import { ChevronRight, Users, ShieldCheck, BarChart3, HeadphonesIcon, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingStepper } from "@/components/custom/auth/OnboardingStepper"

const steps = ["Business Profile", "Hotel Basics", "Verification", "Banking", "First Hotel"]

const benefits = [
  { icon: Users, title: "Reach millions of travelers" },
  { icon: ShieldCheck, title: "Secure bookings and instant payouts" },
  { icon: BarChart3, title: "Powerful dashboard and insights" },
  { icon: HeadphonesIcon, title: "24/7 host support" },
]

export default function OwnerOnboardingPage() {
  const [step, setStep] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-neutral-900">
              <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">Horizoné</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Need help?</Link>
            <Link to="/">
              <Button variant="outline" className="h-9 rounded-full px-4 text-xs">Save & Exit</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-10 text-center">
        <div className="mx-auto max-w-[1200px] px-4">
          <Building2 className="mx-auto size-10 text-foreground" />
          <h1 className="mt-3 text-3xl font-bold text-foreground lg:text-4xl">Bring Your Property to Horizoné</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join our global community of trusted hosts and grow your hospitality business.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] px-4">
        <OnboardingStepper steps={steps} currentStep={step} />
      </div>

      <section className="py-10">
        <div className="mx-auto max-w-[900px] px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {step === 0 && (
                <div className="space-y-4 rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-semibold text-foreground">Business profile</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-foreground">Business name</label>
                      <input placeholder="Your property brand" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Business type</label>
                      <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50">
                        <option>Hotel</option>
                        <option>Villa</option>
                        <option>Apartment</option>
                        <option>Resort</option>
                        <option>Cottage</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Country</label>
                      <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50">
                        <option>United States</option>
                        <option>France</option>
                        <option>Indonesia</option>
                        <option>India</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-foreground">Address line 1</label>
                      <input placeholder="Street address" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">City</label>
                      <input placeholder="City" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">ZIP code</label>
                      <input placeholder="ZIP" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-foreground">Contact name</label>
                      <input placeholder="Primary contact" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Contact email</label>
                      <input type="email" placeholder="contact@property.com" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Phone</label>
                      <input placeholder="+1 (555) 000-0000" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                  </div>
                </div>
              )}

              {[1, 2, 3, 4].includes(step) && step > 0 && (
                <div className="flex items-center justify-center rounded-2xl border border-border bg-white p-14 text-center">
                  <div>
                    <Building2 className="mx-auto size-10 text-muted-foreground" />
                    <h3 className="mt-3 text-lg font-semibold text-foreground">Step {step + 1}: {steps[step]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">This section would collect {steps[step].toLowerCase()} details.</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button onClick={() => setStep(Math.max(0, step - 1))} className={`text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline ${step === 0 ? "invisible" : ""}`}>Back</button>
                <Button className="h-11 rounded-full px-6 text-sm font-semibold" onClick={() => step < 4 ? setStep(step + 1) : null}>
                  {step < 4 ? "Continue" : "Submit for review"}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-neutral-900 p-5 text-white">
                <h3 className="text-sm font-semibold">What You'll Get</h3>
                <div className="mt-4 space-y-4">
                  {benefits.map((b) => (
                    <div key={b.title} className="flex items-start gap-3">
                      <b.icon className="mt-0.5 size-4 shrink-0 text-white/70" />
                      <span className="text-sm text-white/80">{b.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <HeadphonesIcon className="size-6 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-foreground">Need help?</h3>
                <p className="mt-1 text-xs text-muted-foreground">Our team is here to help you get started. Reach out anytime.</p>
                <Button variant="outline" className="mt-3 h-8 w-full rounded-full text-xs">Contact support</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white py-6">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-xs text-muted-foreground">
          &copy; 2026 Horizoné. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
