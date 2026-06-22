import { ArrowRight, Sparkles, Building2, Globe, MessageCircle, Camera, Music, Send } from "lucide-react"
import { Link } from "react-router"
import Navbar from "@/components/custom/landing/navbar"
import HeroSection from "@/components/custom/landing/hero-section"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SectionHeader } from "@/components/custom/shared/SectionHeader"
import { PropertyTypeCard } from "@/components/custom/shared/PropertyTypeCard"
import { HotelCard } from "@/components/custom/shared/HotelCard"
import { OfferCard } from "@/components/custom/shared/OfferCard"
import { propertyTypes } from "@/data/propertyTypes"
import { hotels } from "@/data/hotels"
import { offers } from "@/data/offers"

const partners = [
  "Booking.com", "Expedia", "Airbnb", "Agoda", "Tripadvisor", "Traveloka",
]

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Contact Us", "Returns", "FAQ"],
  Resources: ["Travel Guide", "Terms of Service", "Privacy Policy", "Cookie Policy"],
}

const LandingPage = () => {
  const trendingHotels = hotels.filter((h) => h.featured).slice(0, 4)
  const featureOffers = offers.filter((o) => o.featured)

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <HeroSection />

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-[1200px] px-4">
            <SectionHeader
              title="Browse by property type"
              subtitle="Explore stays that match your style of travel."
              viewAllLink="/stays"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {propertyTypes.map((item) => (
                <PropertyTypeCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-[1200px] px-4">
            <SectionHeader
              title="Trending stays worldwide"
              subtitle="Handpicked stays loved by travelers around the globe."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-[1200px] px-4">
            <SectionHeader
              title="Exclusive offers"
              subtitle="Unlock the best deals on premium stays."
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featureOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="rounded-2xl border border-border bg-card px-8 py-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Trusted by millions. Partnered with the best.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {partners.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold tracking-wide text-muted-foreground/60 uppercase"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-14 lg:px-14 lg:py-16">
              <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.03]" />
              <div className="absolute bottom-0 left-0 size-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-white/[0.02]" />
              <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="size-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white lg:text-3xl">
                    Your next stay is a click away
                  </h2>
                  <p className="mt-2 text-white/65">
                    Sign up today and unlock member prices & perks.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
                  <Button className="rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 shadow-lg hover:bg-white/90">
                    Sign up for free
                    <ArrowRight className="size-4" />
                  </Button>
                  <Link
                    to="/auth/login"
                    className="text-sm text-white/60 underline-offset-2 hover:text-white hover:underline"
                  >
                    Already a member? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-neutral-950">
        <div className="mx-auto max-w-[1200px] px-4 py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white">
                  <Building2 className="size-4 text-neutral-900" />
                </span>
                <span className="text-lg font-semibold tracking-tight text-white">
                  Horizoné
                </span>
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Curated stays. Unforgettable experiences. Handpicked hotels, villas, apartments, resorts and cottages around the world.
              </p>
              <div className="mt-5 flex items-center gap-3">
                {[Globe, MessageCircle, Camera, Music].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold text-white">{heading}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link to="/" className="text-sm text-white/50 transition hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs text-white/40">&copy; 2026 Horizoné. All rights reserved.</p>
            <div className="flex max-w-xs items-center gap-2">
              <InputGroup className="h-9 rounded-full border-white/10 bg-white/10 shadow-none">
                <InputGroupInput
                  placeholder="Your email"
                  className="text-xs text-white placeholder:text-white/35"
                />
                <InputGroupAddon align="inline-end">
                  <Send className="size-3.5 text-white/50" />
                </InputGroupAddon>
              </InputGroup>
              <Button className="h-9 rounded-full bg-white px-3 text-xs font-semibold text-neutral-900 shadow-none hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
