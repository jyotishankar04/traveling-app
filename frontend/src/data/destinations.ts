export interface Destination {
  id: string
  name: string
  slug: string
  country: string
  description: string
  shortDescription: string
  image: string
  propertyCount: number
  bestTimeToVisit: string
  currency: string
  language: string
  timeZone: string
  rating: number
  coordinates: { lat: number; lng: number }
  featured: boolean
}

export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    slug: "paris",
    country: "France",
    description:
      "The City of Light needs no introduction. From the Eiffel Tower to the cobblestone streets of Montmartre, Paris is a timeless destination that captivates every traveler. World-class museums, exquisite cuisine, and unparalleled romance await.",
    shortDescription: "The timeless City of Light awaits.",
    image: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    propertyCount: 1247,
    bestTimeToVisit: "April - June, September - October",
    currency: "Euro (EUR)",
    language: "French",
    timeZone: "CET (UTC+1)",
    rating: 4.8,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    featured: true,
  },
  {
    id: "bali",
    name: "Bali",
    slug: "bali",
    country: "Indonesia",
    description:
      "The Island of the Gods offers a magical blend of lush landscapes, ancient temples, vibrant culture, and pristine beaches. From Ubud's rice terraces to Seminyak's sunset bars, Bali is a paradise for every kind of traveler.",
    shortDescription: "The Island of the Gods awaits.",
    image: "https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg",
    propertyCount: 2983,
    bestTimeToVisit: "April - October",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian, Balinese",
    timeZone: "WITA (UTC+8)",
    rating: 4.7,
    coordinates: { lat: -8.3405, lng: 115.0920 },
    featured: true,
  },
  {
    id: "santorini",
    name: "Santorini",
    slug: "santorini",
    country: "Greece",
    description:
      "Famous for its dramatic sunsets, whitewashed buildings, and blue-domed churches, Santorini is the crown jewel of the Greek Islands. Explore volcanic beaches, taste world-class wines, and sail the caldera.",
    shortDescription: "Dramatic sunsets and Cycladic beauty.",
    image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    propertyCount: 856,
    bestTimeToVisit: "May - October",
    currency: "Euro (EUR)",
    language: "Greek",
    timeZone: "EET (UTC+2)",
    rating: 4.9,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    featured: true,
  },
  {
    id: "maldives",
    name: "Maldives",
    slug: "maldives",
    country: "Maldives",
    description:
      "Crystal-clear turquoise waters, pristine white sand beaches, and luxurious overwater villas make the Maldives the ultimate tropical paradise. World-class diving, incredible marine life, and unparalleled relaxation.",
    shortDescription: "Ultimate tropical paradise in the Indian Ocean.",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    propertyCount: 423,
    bestTimeToVisit: "November - April",
    currency: "Maldivian Rufiyaa (MVR)",
    language: "Dhivehi",
    timeZone: "MVT (UTC+5)",
    rating: 4.9,
    coordinates: { lat: 3.2028, lng: 73.2207 },
    featured: true,
  },
  {
    id: "zermatt",
    name: "Zermatt",
    slug: "zermatt",
    country: "Switzerland",
    description:
      "Nestled at the foot of the iconic Matterhorn, Zermatt is a car-free Alpine paradise offering world-class skiing, hiking, and mountaineering. Charming chalets, gourmet dining, and breathtaking mountain scenery.",
    shortDescription: "Alpine paradise at the foot of the Matterhorn.",
    image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    propertyCount: 312,
    bestTimeToVisit: "December - March (ski), June - September (hike)",
    currency: "Swiss Franc (CHF)",
    language: "German, French",
    timeZone: "CET (UTC+1)",
    rating: 4.8,
    coordinates: { lat: 46.0207, lng: 7.7491 },
    featured: false,
  },
  {
    id: "goa",
    name: "Goa",
    slug: "goa",
    country: "India",
    description:
      "India's beach paradise offers golden sands, swaying palm trees, vibrant nightlife, and Portuguese-influenced architecture. From luxury resorts to beach shacks, Goa is a destination for every budget.",
    shortDescription: "India's golden beach paradise.",
    image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    propertyCount: 1567,
    bestTimeToVisit: "November - February",
    currency: "Indian Rupee (INR)",
    language: "Konkani, Marathi, Hindi, English",
    timeZone: "IST (UTC+5:30)",
    rating: 4.6,
    coordinates: { lat: 15.2993, lng: 74.1240 },
    featured: false,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    slug: "tokyo",
    country: "Japan",
    description:
      "A dazzling metropolis where tradition meets cutting-edge innovation. From serene temples and gardens to neon-lit streets and Michelin-starred restaurants, Tokyo offers endless discovery.",
    shortDescription: "Where tradition meets cutting-edge innovation.",
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    propertyCount: 3456,
    bestTimeToVisit: "March - May, October - November",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    timeZone: "JST (UTC+9)",
    rating: 4.7,
    coordinates: { lat: 35.6762, lng: 139.6503 },
    featured: true,
  },
  {
    id: "new-york",
    name: "New York",
    slug: "new-york",
    country: "United States",
    description:
      "The Big Apple needs no introduction. Iconic landmarks, world-class culture, diverse neighborhoods, and non-stop energy make New York City the most exciting city on Earth.",
    shortDescription: "The city that never sleeps.",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    propertyCount: 4567,
    bestTimeToVisit: "April - June, September - November",
    currency: "US Dollar (USD)",
    language: "English",
    timeZone: "EST (UTC-5)",
    rating: 4.6,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    featured: true,
  },
]
