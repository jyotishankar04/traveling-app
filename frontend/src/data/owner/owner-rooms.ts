export interface OwnerRoom {
  id: string
  hotelId: string
  name: string
  description: string
  capacity: number
  size: string
  maxAdults: number
  maxChildren: number
  bedType: string
  view: string
  basePrice: number
  currency: string
  weekendPrice: number
  extraGuestPrice: number
  totalUnits: number
  availableUnits: number
  status: "active" | "inactive"
  amenities: string[]
  images: string[]
  bookedThisMonth: number
  occupancy: number
  revenueThisMonth: number
}

export const ownerRooms: OwnerRoom[] = [
  {
    id: "or-1", hotelId: "oh-1",
    name: "Deluxe Room", description: "Elegantly appointed deluxe room featuring bespoke furnishings and marble bathroom.",
    capacity: 2, size: "35 m²", maxAdults: 2, maxChildren: 1,
    bedType: "King", view: "City view",
    basePrice: 520, currency: "EUR", weekendPrice: 580, extraGuestPrice: 75,
    totalUnits: 20, availableUnits: 5, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony"],
    images: ["https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg"],
    bookedThisMonth: 15, occupancy: 75, revenueThisMonth: 78000,
  },
  {
    id: "or-2", hotelId: "oh-1",
    name: "Eiffel Suite", description: "Corner suite with panoramic Eiffel Tower views and separate living area.",
    capacity: 3, size: "55 m²", maxAdults: 3, maxChildren: 1,
    bedType: "King", view: "Eiffel Tower",
    basePrice: 890, currency: "EUR", weekendPrice: 990, extraGuestPrice: 100,
    totalUnits: 8, availableUnits: 2, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "living-room"],
    images: ["https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"],
    bookedThisMonth: 6, occupancy: 85, revenueThisMonth: 53400,
  },
  {
    id: "or-3", hotelId: "oh-1",
    name: "Penthouse Suite", description: "The pinnacle of luxury with a private rooftop terrace and butler service.",
    capacity: 4, size: "85 m²", maxAdults: 4, maxChildren: 2,
    bedType: "Emperor", view: "Panoramic Paris",
    basePrice: 2100, currency: "EUR", weekendPrice: 2500, extraGuestPrice: 200,
    totalUnits: 2, availableUnits: 0, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "room-service", "balcony", "living-room", "kitchen"],
    images: ["https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"],
    bookedThisMonth: 2, occupancy: 100, revenueThisMonth: 42000,
  },
  {
    id: "or-4", hotelId: "oh-2",
    name: "King Suite", description: "Spacious suite with Central Park views and modern luxury amenities.",
    capacity: 2, size: "45 m²", maxAdults: 2, maxChildren: 1,
    bedType: "King", view: "Central Park",
    basePrice: 650, currency: "USD", weekendPrice: 720, extraGuestPrice: 80,
    totalUnits: 25, availableUnits: 8, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "work-desk", "room-service"],
    images: ["https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg"],
    bookedThisMonth: 17, occupancy: 68, revenueThisMonth: 110500,
  },
  {
    id: "or-5", hotelId: "oh-2",
    name: "Corner Suite", description: "Corner suite with floor-to-ceiling windows offering breathtaking views.",
    capacity: 3, size: "60 m²", maxAdults: 3, maxChildren: 1,
    bedType: "King", view: "Manhattan skyline",
    basePrice: 950, currency: "USD", weekendPrice: 1100, extraGuestPrice: 100,
    totalUnits: 10, availableUnits: 2, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "work-desk", "living-room"],
    images: ["https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"],
    bookedThisMonth: 8, occupancy: 80, revenueThisMonth: 76000,
  },
  {
    id: "or-6", hotelId: "oh-2",
    name: "Presidential Suite", description: "The ultimate New York experience with panoramic views and private butler.",
    capacity: 4, size: "100 m²", maxAdults: 4, maxChildren: 2,
    bedType: "Emperor", view: "360° Manhattan",
    basePrice: 3200, currency: "USD", weekendPrice: 3800, extraGuestPrice: 250,
    totalUnits: 2, availableUnits: 0, status: "active",
    amenities: ["wifi", "ac", "tv", "mini-bar", "kitchen", "living-room", "balcony"],
    images: ["https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"],
    bookedThisMonth: 2, occupancy: 100, revenueThisMonth: 64000,
  },
  {
    id: "or-7", hotelId: "oh-3",
    name: "Alpine Room", description: "Cozy room with stunning mountain views and traditional alpine decor.",
    capacity: 2, size: "30 m²", maxAdults: 2, maxChildren: 1,
    bedType: "Queen", view: "Mountain view",
    basePrice: 480, currency: "CHF", weekendPrice: 550, extraGuestPrice: 60,
    totalUnits: 15, availableUnits: 3, status: "active",
    amenities: ["wifi", "ac", "tv", "balcony", "mini-bar"],
    images: ["https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg"],
    bookedThisMonth: 12, occupancy: 80, revenueThisMonth: 57600,
  },
]
