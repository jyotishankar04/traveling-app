export interface OwnerHotel {
  id: string
  name: string
  slug: string
  location: string
  city: string
  country: string
  image: string
  totalRooms: number
  status: "active" | "inactive" | "draft"
  occupancy: number
  revenueMTD: number
  rating: number
  reviewCount: number
  propertyType: string
  stars: number
  currency: string
  address: string
  phone: string
  email: string
  website: string
  shortDescription: string
  longDescription: string
  amenities: string[]
  images: string[]
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: string
  createdAt: string
}

export const ownerHotels: OwnerHotel[] = [
  {
    id: "oh-1",
    name: "Lumière Hotel Paris",
    slug: "lumiere-paris",
    location: "15 Avenue Montaigne, 75008 Paris",
    city: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    totalRooms: 48,
    status: "active",
    occupancy: 87,
    revenueMTD: 184500,
    rating: 4.9,
    reviewCount: 384,
    propertyType: "Luxury Hotel",
    stars: 5,
    currency: "EUR",
    address: "15 Avenue Montaigne, 75008 Paris, France",
    phone: "+33 1 53 67 15 00",
    email: "reservations@lumiereparis.com",
    website: "https://lumiereparis.com",
    shortDescription: "Classic French elegance meets modern luxury in the heart of Paris.",
    longDescription: "Nestled in the heart of Paris, Lumière Hotel offers an unparalleled blend of classic French elegance and modern luxury. Each room is meticulously designed with bespoke furnishings, marble bathrooms, and floor-to-ceiling windows offering breathtaking views of the City of Light.",
    amenities: ["wifi", "spa", "gym", "restaurant", "bar", "room-service", "conference", "valet-parking"],
    images: [
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    createdAt: "2024-06-01",
  },
  {
    id: "oh-2",
    name: "Skyline Hotel New York",
    slug: "skyline-nyc",
    location: "200 Central Park South, New York, NY 10019",
    city: "New York",
    country: "United States",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    totalRooms: 72,
    status: "active",
    occupancy: 78,
    revenueMTD: 265000,
    rating: 4.7,
    reviewCount: 291,
    propertyType: "Luxury Hotel",
    stars: 5,
    currency: "USD",
    address: "200 Central Park South, New York, NY 10019",
    phone: "+1 (212) 555-0198",
    email: "reservations@skylinenyc.com",
    website: "https://skylinenyc.com",
    shortDescription: "Urban luxury towering above Manhattan.",
    longDescription: "Towering above Manhattan, Skyline Hotel New York redefines urban luxury. Floor-to-ceiling windows frame iconic skyline views, while our world-class amenities include a rooftop infinity pool, Michelin-starred dining, and a 24-hour butler service.",
    amenities: ["wifi", "gym", "restaurant", "bar", "room-service", "conference", "laundry", "valet-parking"],
    images: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Cancellation allowed 72 hours before check-in.",
    createdAt: "2024-08-15",
  },
  {
    id: "oh-3",
    name: "The Alpine Lodge",
    slug: "alpine-lodge",
    location: "Bahnhofstrasse 1, 3920 Zermatt",
    city: "Zermatt",
    country: "Switzerland",
    image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    totalRooms: 36,
    status: "active",
    occupancy: 92,
    revenueMTD: 158000,
    rating: 4.9,
    reviewCount: 297,
    propertyType: "Mountain Resort",
    stars: 5,
    currency: "CHF",
    address: "Bahnhofstrasse 1, 3920 Zermatt, Switzerland",
    phone: "+41 27 966 00 00",
    email: "info@alpinelodge.ch",
    website: "https://alpinelodge.ch",
    shortDescription: "Luxurious alpine retreat with world-class skiing and mountain views.",
    longDescription: "Perched majestically in the Swiss Alps, The Alpine Lodge offers world-class skiing, exceptional hospitality, and breathtaking mountain panoramas.",
    amenities: ["wifi", "spa", "gym", "restaurant", "bar", "parking", "room-service", "pet-friendly"],
    images: [
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "10:00 AM",
    cancellationPolicy: "Free cancellation 7 days before check-in.",
    createdAt: "2024-05-20",
  },
  {
    id: "oh-4",
    name: "Seaside Escape Goa",
    slug: "seaside-goa",
    location: "Calangute Beach, Goa 403516",
    city: "Goa",
    country: "India",
    image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    totalRooms: 56,
    status: "active",
    occupancy: 71,
    revenueMTD: 102000,
    rating: 4.7,
    reviewCount: 423,
    propertyType: "Beach Resort",
    stars: 4,
    currency: "USD",
    address: "Calangute Beach, Goa 403516, India",
    phone: "+91 832 555 0199",
    email: "hello@seasidegoa.com",
    website: "https://seasidegoa.com",
    shortDescription: "Beachfront luxury on the golden shores of Goa.",
    longDescription: "Discover paradise at Seaside Escape Goa, where golden beaches meet luxury living. Our beachfront resort offers spacious villas with private pools.",
    amenities: ["pool", "beach-access", "restaurant", "bar", "wifi", "parking", "kids-club", "airport-shuttle"],
    images: [
      "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation 48 hours before check-in.",
    createdAt: "2024-07-10",
  },
  {
    id: "oh-5",
    name: "Zen Garden Tokyo",
    slug: "tokyo-inn",
    location: "3-7-8 Ginza, Chuo-ku, Tokyo 104-0061",
    city: "Tokyo",
    country: "Japan",
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    totalRooms: 28,
    status: "inactive",
    occupancy: 45,
    revenueMTD: 42000,
    rating: 4.6,
    reviewCount: 245,
    propertyType: "Boutique Hotel",
    stars: 4,
    currency: "JPY",
    address: "3-7-8 Ginza, Chuo-ku, Tokyo 104-0061",
    phone: "+81 3 5555 0100",
    email: "stay@zengarden.jp",
    website: "https://zengarden.jp",
    shortDescription: "Serene Japanese inn in the heart of Tokyo.",
    longDescription: "Find serenity in the heart of Tokyo at Zen Garden. Our minimalist Japanese inn combines traditional tatami rooms with cutting-edge technology.",
    amenities: ["wifi", "spa", "restaurant", "bar", "laundry", "room-service"],
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation 24 hours before check-in.",
    createdAt: "2024-09-01",
  },
]
