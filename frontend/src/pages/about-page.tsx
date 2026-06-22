import { Link } from "react-router"
import { ArrowRight, Sparkles, Globe, ShieldCheck, HeadphonesIcon, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/custom/shared/StatsCard"

const teamMembers = [
  { name: "Elena Voss", role: "CEO & Founder", image: "" },
  { name: "Marcus Chen", role: "CTO", image: "" },
  { name: "Sofia Patel", role: "Head of Design", image: "" },
  { name: "James Okonkwo", role: "VP of Operations", image: "" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-900 py-20 lg:py-28">
        <div className="absolute right-0 top-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.03]" />
        <div className="absolute bottom-0 left-0 size-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-white/[0.02]" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="text-4xl font-bold text-white lg:text-6xl">About Horizoné</h1>
          <p className="mt-4 text-lg text-white/65 lg:text-xl">
            Redefining the way you travel.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50">
            Horizoné is a premium hotel booking platform dedicated to curating extraordinary stays around the world. 
            We believe that where you stay matters, and we're here to help you find the perfect home away from home.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg"
                alt="Luxury travel"
                className="size-full object-cover min-h-[300px]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Founded in 2020, Horizoné was born from a simple idea: travel should be extraordinary. 
                What started as a small collection of handpicked villas has grown into a global platform 
                featuring thousands of premium properties across the world's most desirable destinations.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every property on our platform is carefully vetted to ensure it meets our rigorous 
                standards for quality, service, and experience. We partner with the best hoteliers, 
                villa owners, and resort managers to bring you stays that create lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatsCard value="500K+" label="Happy Travelers" />
            <StatsCard value="15K+" label="Properties Worldwide" />
            <StatsCard value="120+" label="Countries" />
            <StatsCard value="24/7" label="Customer Support" />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              To connect travelers with extraordinary accommodations that transform a simple trip 
              into an unforgettable journey. We're committed to making luxury travel accessible, 
              transparent, and effortless.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Curated Quality",
                desc: "Every property is handpicked and verified to ensure exceptional quality and service.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Access premium accommodations in over 120 countries across the globe.",
              },
              {
                icon: Heart,
                title: "Personalized Service",
                desc: "Dedicated concierge team available 24/7 to assist with every aspect of your stay.",
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                desc: "Deep local knowledge to help you discover authentic experiences in every destination.",
              },
              {
                icon: Sparkles,
                title: "Best Price Promise",
                desc: "We guarantee the best rates on every booking. Find a lower price and we'll match it.",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                desc: "Round-the-clock customer support in multiple languages, whenever you need us.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-md">
                <item.icon className="size-8 text-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
            <p className="mt-2 text-muted-foreground">The people behind Horizoné.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-600">
                  {member.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-14 text-center lg:px-14 lg:py-16">
            <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.03]" />
            <div className="relative z-10">
              <Sparkles className="mx-auto size-10 text-white/70" />
              <h2 className="mt-4 text-2xl font-bold text-white lg:text-3xl">
                Ready to experience the Horizoné difference?
              </h2>
              <p className="mt-2 text-white/65">
                Join millions of travelers who trust us for their perfect stay.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button className="rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 shadow-lg hover:bg-white/90">
                  Browse stays
                  <ArrowRight className="size-4" />
                </Button>
                <Link
                  to="/auth/register"
                  className="text-sm text-white/60 underline-offset-2 hover:text-white hover:underline"
                >
                  Sign up free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
