export interface Offer {
  id: string
  badge: string
  title: string
  discount: string
  cta: string
  ctaLink: string
  image: string
  description: string
  featured: boolean
}

export const offers: Offer[] = [
  {
    id: "summer-getaway",
    badge: "LIMITED TIME",
    title: "Summer Getaway Sale",
    discount: "45% OFF",
    cta: "Book now",
    ctaLink: "/offers/summer-getaway",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    description: "Escape to paradise with exclusive summer rates on luxury resorts worldwide.",
    featured: true,
  },
  {
    id: "weekend-escape",
    badge: "MEMBER EXCLUSIVE",
    title: "Weekend Escape Deals",
    discount: "30% OFF",
    cta: "Join for free",
    ctaLink: "/signup",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    description: "Sign up for free and unlock member-only weekend getaway pricing.",
    featured: true,
  },
  {
    id: "early-bird",
    badge: "EARLY BIRD",
    title: "Book Early & Save Big",
    discount: "25% OFF",
    cta: "View deals",
    ctaLink: "/deals/early-bird",
    image: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    description: "Plan ahead and enjoy up to 25% off on advance bookings.",
    featured: false,
  },
  {
    id: "last-minute",
    badge: "LAST MINUTE",
    title: "Last Minute Getaways",
    discount: "40% OFF",
    cta: "View deals",
    ctaLink: "/deals/last-minute",
    image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    description: "Spontaneous trip? Grab last-minute deals on premium stays.",
    featured: false,
  },
]
