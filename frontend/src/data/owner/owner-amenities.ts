export interface AmenityCategory {
  id: string
  name: string
  amenities: { id: string; label: string; icon: string }[]
}

export const amenityCategories: AmenityCategory[] = [
  {
    id: "room", name: "Room Amenities",
    amenities: [
      { id: "wifi", label: "Free Wi-Fi", icon: "wifi" },
      { id: "ac", label: "Air Conditioning", icon: "snowflake" },
      { id: "tv", label: "Flat-screen TV", icon: "tv" },
      { id: "mini-bar", label: "Mini Bar", icon: "wine" },
      { id: "work-desk", label: "Work Desk", icon: "desk" },
      { id: "room-service", label: "Room Service", icon: "bell" },
      { id: "balcony", label: "Private Balcony", icon: "sun" },
      { id: "kitchen", label: "Kitchenette", icon: "utensils" },
    ],
  },
  {
    id: "property", name: "Property Amenities",
    amenities: [
      { id: "pool", label: "Swimming Pool", icon: "waves" },
      { id: "spa", label: "Spa & Wellness Center", icon: "sparkles" },
      { id: "gym", label: "Fitness Center", icon: "dumbbell" },
      { id: "parking", label: "Parking", icon: "car" },
      { id: "airport-shuttle", label: "Airport Shuttle", icon: "bus" },
      { id: "laundry", label: "Laundry Service", icon: "shirt" },
      { id: "conference", label: "Conference Room", icon: "users" },
      { id: "valet-parking", label: "Valet Parking", icon: "car" },
    ],
  },
  {
    id: "dining", name: "Dining",
    amenities: [
      { id: "restaurant", label: "Restaurant", icon: "utensils-crossed" },
      { id: "bar", label: "Bar & Lounge", icon: "wine" },
      { id: "breakfast", label: "Breakfast Included", icon: "coffee" },
      { id: "room-dining", label: "In-Room Dining", icon: "bell" },
    ],
  },
  {
    id: "accessibility", name: "Accessibility",
    amenities: [
      { id: "wheelchair", label: "Wheelchair Accessible", icon: "accessibility" },
      { id: "elevator", label: "Elevator Access", icon: "arrow-up" },
      { id: "braille", label: "Braille Signage", icon: "eye" },
    ],
  },
]

export const selectedAmenities = ["wifi", "ac", "tv", "mini-bar", "room-service", "spa", "gym", "restaurant", "bar", "parking"]
