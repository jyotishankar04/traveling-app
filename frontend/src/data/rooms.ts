export interface RoomType {
  id: string
  hotelId: string
  name: string
  slug: string
  description: string
  shortDescription: string
  pricePerNight: number
  currency: string
  maxGuests: number
  bedType: string
  size: string
  view: string
  images: string[]
  amenities: string[]
  available: boolean
  remainingRooms: number
  cancellationPolicy: string
  boardBasis: string
}

export const rooms: RoomType[] = [
  // ─── Lumière Hotel Paris ───
  {
    id: "lumiere-deluxe",
    hotelId: "lumiere-paris",
    name: "Deluxe Room",
    slug: "deluxe-room",
    description:
      "Elegantly appointed deluxe room featuring bespoke furnishings, marble bathroom with soaking tub, and views of the Parisian skyline. Includes complimentary minibar, Nespresso machine, and 24-hour room service.",
    shortDescription: "Elegant room with Parisian skyline views.",
    pricePerNight: 520,
    currency: "EUR",
    maxGuests: 2,
    bedType: "King",
    size: "35 m²",
    view: "City view",
    images: [
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony"],
    available: true,
    remainingRooms: 5,
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    boardBasis: "Room only",
  },
  {
    id: "lumiere-eiffel-suite",
    hotelId: "lumiere-paris",
    name: "Eiffel Suite",
    slug: "eiffel-suite",
    description:
      "Our crown jewel suite offering panoramic Eiffel Tower views, a separate living room, dining area for six, and a private terrace. Features include a grand piano, butler service, and champagne upon arrival.",
    shortDescription: "Panoramic Eiffel Tower views with butler service.",
    pricePerNight: 1500,
    currency: "EUR",
    maxGuests: 4,
    bedType: "King + Sofa bed",
    size: "85 m²",
    view: "Eiffel Tower view",
    images: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "ocean-view"],
    available: true,
    remainingRooms: 2,
    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",
    boardBasis: "Breakfast included",
  },
  {
    id: "lumiere-junior-suite",
    hotelId: "lumiere-paris",
    name: "Junior Suite",
    slug: "junior-suite",
    description:
      "Spacious junior suite with a seating area, walk-in closet, and magnificent city views. Features a separate rainfall shower and deep soaking tub.",
    shortDescription: "Spacious suite with separate seating area.",
    pricePerNight: 850,
    currency: "EUR",
    maxGuests: 3,
    bedType: "King",
    size: "55 m²",
    view: "City view",
    images: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service"],
    available: true,
    remainingRooms: 3,
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    boardBasis: "Breakfast included",
  },

  // ─── Aurelia Resort Bali ───
  {
    id: "aurelia-pool-villa",
    hotelId: "aurelia-bali",
    name: "Ocean Pool Villa",
    slug: "ocean-pool-villa",
    description:
      "Private villa with personal infinity pool overlooking the Indian Ocean. Features an outdoor shower, tropical garden, sun deck, and indoor-outdoor living space.",
    shortDescription: "Private villa with infinity pool and ocean views.",
    pricePerNight: 750,
    currency: "USD",
    maxGuests: 2,
    bedType: "King",
    size: "120 m²",
    view: "Ocean view",
    images: [
      "https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    ],
    amenities: ["pool", "wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "ocean-view"],
    available: true,
    remainingRooms: 4,
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    boardBasis: "Half board",
  },
  {
    id: "aurelia-family-suite",
    hotelId: "aurelia-bali",
    name: "Family Suite",
    slug: "family-suite",
    description:
      "Designed for families, this suite features two connecting bedrooms, a shared living area, kitchenette, and a private garden with plunge pool.",
    shortDescription: "Two-bedroom suite perfect for families.",
    pricePerNight: 520,
    currency: "USD",
    maxGuests: 5,
    bedType: "King + Twin",
    size: "100 m²",
    view: "Garden view",
    images: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    ],
    amenities: ["pool", "wifi", "ac", "tv", "mini-bar", "kitchen", "kids-club"],
    available: true,
    remainingRooms: 6,
    cancellationPolicy: "Free cancellation up to 5 days before check-in.",
    boardBasis: "Breakfast included",
  },

  // ─── The Alpine Lodge ───
  {
    id: "alpine-suite",
    hotelId: "alpine-lodge",
    name: "Alpine Suite",
    slug: "alpine-suite",
    description:
      "Luxurious suite with a stone fireplace, private hot tub on the balcony, and panoramic views of the Matterhorn. Features a separate living area and ski-in/ski-out access.",
    shortDescription: "Mountain luxury with fireplace and hot tub.",
    pricePerNight: 980,
    currency: "CHF",
    maxGuests: 2,
    bedType: "King",
    size: "70 m²",
    view: "Mountain view",
    images: [
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "pet-friendly"],
    available: true,
    remainingRooms: 3,
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    boardBasis: "Half board",
  },
  {
    id: "alpine-family-room",
    hotelId: "alpine-lodge",
    name: "Family Room",
    slug: "family-room",
    description:
      "Spacious family accommodation with bunk beds for children, a master bedroom, and a cozy living area. Includes ski storage and boot warmers.",
    shortDescription: "Cozy family accommodation with ski access.",
    pricePerNight: 650,
    currency: "CHF",
    maxGuests: 4,
    bedType: "King + Bunk beds",
    size: "55 m²",
    view: "Mountain view",
    images: [
      "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "balcony", "parking"],
    available: true,
    remainingRooms: 5,
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    boardBasis: "Full board",
  },

  // ─── Seaside Escape Goa ───
  {
    id: "seaside-beach-villa",
    hotelId: "seaside-goa",
    name: "Beach Villa",
    slug: "beach-villa",
    description:
      "Steps from the sand, this beachfront villa features a private plunge pool, outdoor shower, hammock, and a rooftop terrace perfect for sunset cocktails.",
    shortDescription: "Beachfront villa with private plunge pool.",
    pricePerNight: 420,
    currency: "USD",
    maxGuests: 3,
    bedType: "King",
    size: "90 m²",
    view: "Ocean view",
    images: [
      "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    ],
    amenities: ["pool", "wifi", "ac", "tv", "mini-bar", "balcony", "beach-access"],
    available: true,
    remainingRooms: 4,
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    boardBasis: "Breakfast included",
  },
  {
    id: "seaside-garden-room",
    hotelId: "seaside-goa",
    name: "Garden Room",
    slug: "garden-room",
    description:
      "Surrounded by tropical gardens, these rooms offer a peaceful retreat with direct pool access, a private patio, and indoor-outdoor bathroom.",
    shortDescription: "Garden-facing room with direct pool access.",
    pricePerNight: 220,
    currency: "USD",
    maxGuests: 2,
    bedType: "Queen",
    size: "40 m²",
    view: "Garden view",
    images: [
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "pool"],
    available: true,
    remainingRooms: 8,
    cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
    boardBasis: "Room only",
  },

  // ─── Grand Hotel Roma ───
  {
    id: "roma-suite",
    hotelId: "grand-hotel-rome",
    name: "Roman Suite",
    slug: "roman-suite",
    description:
      "Magnificent suite with hand-painted frescoed ceilings, antique furnishings, and a marble balcony overlooking the Spanish Steps.",
    shortDescription: "Frescoed suite with Spanish Steps views.",
    pricePerNight: 980,
    currency: "EUR",
    maxGuests: 2,
    bedType: "King",
    size: "75 m²",
    view: "Landmark view",
    images: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony"],
    available: true,
    remainingRooms: 2,
    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",
    boardBasis: "Breakfast included",
  },

  // ─── Skyline NYC ───
  {
    id: "nyc-penthouse",
    hotelId: "skyline-nyc",
    name: "Sky Penthouse",
    slug: "sky-penthouse",
    description:
      "Perched on the 60th floor, this penthouse offers 360-degree views of Manhattan. Features a private rooftop terrace, grand piano, and personal butler.",
    shortDescription: "60th-floor penthouse with Manhattan panoramas.",
    pricePerNight: 2500,
    currency: "USD",
    maxGuests: 6,
    bedType: "King + 2 Queen",
    size: "150 m²",
    view: "Panoramic skyline",
    images: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    ],
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "gym"],
    available: true,
    remainingRooms: 1,
    cancellationPolicy: "Non-refundable.",
    boardBasis: "Room only",
  },
]

export function getRoomsByHotelId(hotelId: string): RoomType[] {
  return rooms.filter((r) => r.hotelId === hotelId)
}

export function getRoomById(id: string): RoomType | undefined {
  return rooms.find((r) => r.id === id)
}
