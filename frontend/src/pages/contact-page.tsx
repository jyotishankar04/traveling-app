import { useState } from "react"
import { MessageCircle, Mail, Phone, HelpCircle, Send, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/custom/shared/SectionHeader"
import { ContactMethodCard } from "@/components/custom/shared/ContactMethodCard"
import { MapPreview } from "@/components/custom/shared/MapPreview"

const offices = [
  { city: "New York", address: "350 Fifth Avenue, Suite 3000, New York, NY 10118", coords: { lat: 40.7484, lng: -73.9856 } },
  { city: "London", address: "71 Queen Victoria Street, London EC4V 4AY", coords: { lat: 51.5121, lng: -0.0951 } },
  { city: "Singapore", address: "1 Raffles Place, Singapore 048616", coords: { lat: 1.2845, lng: 103.8507 } },
]

const faqs = [
  { q: "How do I make a booking?", a: "Simply search for your desired destination, select a property, choose your dates, and complete the booking process. You'll receive a confirmation email immediately." },
  { q: "Can I modify or cancel my booking?", a: "Yes, you can modify or cancel your booking through your account dashboard. Cancellation policies vary by property and are displayed clearly during booking." },
  { q: "How do I contact the property directly?", a: "Once your booking is confirmed, you'll find direct contact information for the property in your booking confirmation email and account dashboard." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for select properties." },
  { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard SSL encryption and never store your full payment details on our servers." },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background">
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">We're Here to Help</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Got a question or need support? We're just a message away.
          </p>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactMethodCard
              icon={<MessageCircle className="size-6 text-foreground" />}
              title="Live Chat"
              description="Chat with our team in real-time."
              cta="Start chat"
            />
            <ContactMethodCard
              icon={<Mail className="size-6 text-foreground" />}
              title="Email Support"
              description="We'll respond within 24 hours."
              cta="Send email"
            />
            <ContactMethodCard
              icon={<Phone className="size-6 text-foreground" />}
              title="Call Us"
              description="Available 24/7 for urgent inquiries."
              cta="Call now"
            />
            <ContactMethodCard
              icon={<HelpCircle className="size-6 text-foreground" />}
              title="Help Center"
              description="Browse our comprehensive FAQ."
              cta="Visit help"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground">First name</label>
                    <input className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Last name</label>
                    <input className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Email</label>
                  <input className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Subject</label>
                  <input className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="How can we help?" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Message</label>
                  <textarea className="mt-1 min-h-[140px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Tell us more about your inquiry..." />
                </div>

                <Button className="h-12 w-full rounded-xl text-sm font-semibold">
                  <Send className="size-4" />
                  Send message
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Our offices</h2>
              <p className="mt-2 text-sm text-muted-foreground">Visit us at any of our global locations.</p>

              <div className="mt-6 space-y-4">
                {offices.map((office) => (
                  <div key={office.city} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="font-semibold text-foreground">{office.city}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{office.address}</p>
                  </div>
                ))}
              </div>

              <MapPreview
                lat={40.7484}
                lng={-73.9856}
                location="Our global headquarters"
                className="mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionHeader title="Frequently asked questions" />
          <div className="max-w-3xl">
            <div className="divide-y divide-border rounded-2xl border border-border bg-white">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-foreground transition"
                    >
                      {faq.q}
                      <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
