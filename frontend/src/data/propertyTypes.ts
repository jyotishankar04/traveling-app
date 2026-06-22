export interface PropertyType {
  id: string
  name: string
  slug: string
  count: number
  image: string
  description: string
}

export const propertyTypes: PropertyType[] = [
  {
    id: "villas",
    name: "Villas",
    slug: "villas",
    count: 12984,
    image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    description: "Private villas with pools and premium amenities",
  },
  {
    id: "apartments",
    name: "Apartments",
    slug: "apartments",
    count: 10627,
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    description: "Modern apartments in prime locations",
  },
  {
    id: "resorts",
    name: "Resorts",
    slug: "resorts",
    count: 367,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    description: "All-inclusive resort experiences",
  },
  {
    id: "cottages",
    name: "Cottages",
    slug: "cottages",
    count: 263,
    image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
    description: "Cozy cottages for peaceful getaways",
  },
  {
    id: "luxury-hotels",
    name: "Luxury Hotels",
    slug: "luxury-hotels",
    count: 1509,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    description: "Five-star luxury hotel experiences",
  },
]
