import { useState } from "react"
import { Link } from "react-router"
import { ChevronRight, Sparkles, Star, Sun, TreePine, Heart, Mountain, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingStepper } from "@/components/custom/auth/OnboardingStepper"

const interests = [
  { icon: Star, label: "Luxury Stays" },
  { icon: Sun, label: "Beach Getaways" },
  { icon: Sparkles, label: "City Escapes" },
  { icon: TreePine, label: "Nature & Outdoors" },
  { icon: Heart, label: "Wellness" },
  { icon: Mountain, label: "Adventure" },
]

const steps = ["Profile", "Preferences", "Destinations", "Notifications", "Complete"]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) => prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label])
  }

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
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Welcome to Horizoné</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Let's personalize your experience and help you find stays you'll love.
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
                  <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground">Full name</label>
                      <input defaultValue="Alex Thompson" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Email</label>
                      <input defaultValue="alex.thompson@example.com" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Phone</label>
                      <input placeholder="+1 (555) 000-0000" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Date of birth</label>
                      <input type="date" className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Nationality</label>
                      <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50">
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>India</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground">Language</label>
                      <select className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4 rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-semibold text-foreground">Travel interests</h2>
                  <p className="text-sm text-muted-foreground">Select the types of travel you enjoy.</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {interests.map((item) => {
                      const active = selectedInterests.includes(item.label)
                      return (
                        <button
                          key={item.label}
                          onClick={() => toggleInterest(item.label)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition ${
                            active ? "border-neutral-900 bg-neutral-50" : "border-border bg-white hover:border-muted-foreground"
                          }`}
                        >
                          <item.icon className={`size-6 ${active ? "text-neutral-900" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-semibold text-foreground">Preferred destinations</h2>
                  <p className="text-sm text-muted-foreground">Tell us where you'd like to travel.</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {["Europe", "Asia", "Caribbean", "Middle East", "Africa", "South America"].map((region) => (
                      <label key={region} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-4 text-sm font-medium text-foreground hover:bg-muted/50">
                        <input type="checkbox" className="size-4 accent-neutral-900" />
                        {region}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                  <p className="text-sm text-muted-foreground">Choose how we communicate with you.</p>
                  <div className="space-y-4">
                    {[
                      { label: "Email updates", desc: "Receive booking confirmations and receipts" },
                      { label: "Marketing emails", desc: "Get exclusive offers and travel inspiration" },
                      { label: "SMS notifications", desc: "Get real-time updates on your bookings" },
                      { label: "Push notifications", desc: "Enable browser notifications for alerts" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-xl border border-border p-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-neutral-900 peer-checked:after:translate-x-4" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 rounded-2xl border border-border bg-white p-6 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50">
                    <svg className="size-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
                  <p className="text-muted-foreground">Your profile is complete. Start exploring amazing stays around the world.</p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className={`text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline ${step === 0 ? "invisible" : ""}`}
                >
                  Back
                </button>
                <Button className="h-11 rounded-full px-6 text-sm font-semibold" onClick={() => step < 4 ? setStep(step + 1) : null}>
                  {step < 4 ? "Continue" : "Start exploring"}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="text-sm font-semibold text-foreground">Profile preview</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">AT</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Alex Thompson</p>
                    <p className="text-xs text-muted-foreground">alex.thompson@example.com</p>
                  </div>
                </div>
                {selectedInterests.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {selectedInterests.map((i) => (
                      <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-muted-foreground">{i}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-neutral-900 p-5 text-white">
                <Sparkles className="size-5" />
                <h3 className="mt-2 text-sm font-semibold">Why create a profile?</h3>
                <ul className="mt-2 space-y-1 text-xs text-white/65">
                  <li>Earn reward points on every booking</li>
                  <li>Exclusive member-only deals</li>
                  <li>Faster checkout with saved preferences</li>
                  <li>Personalized travel recommendations</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <Quote className="size-5 text-muted-foreground" />
                <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                  "Creating my profile was the best decision. I've saved hundreds on bookings and discovered amazing places I never knew existed."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-600">SM</div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Sarah M.</p>
                    <p className="text-[11px] text-muted-foreground">Gold Member · 24 trips</p>
                  </div>
                </div>
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
