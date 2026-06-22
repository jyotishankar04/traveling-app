export interface OwnerReview {
  id: string
  hotelId: string
  hotelName: string
  roomType: string
  guestName: string
  guestAvatar: string
  guestCountry: string
  rating: number
  title: string
  comment: string
  date: string
  status: "published" | "pending" | "hidden"
  reply?: string
  replyDate?: string
  cleanliness: number
  staff: number
  comfort: number
  location: number
  value: number
  images: string[]
}

export const ownerReviews: OwnerReview[] = [
  {
    id: "orev-1", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Deluxe Room",
    guestName: "Sophie Laurent", guestAvatar: "", guestCountry: "France",
    rating: 5, title: "Absolute perfection in Paris", comment: "This hotel exceeded all expectations. The room was meticulously clean, the staff anticipated our every need, and the location is unbeatable. Will definitely return!",
    date: "2026-06-19", status: "published",
    reply: "Thank you Sophie! We're delighted you enjoyed your stay. Looking forward to welcoming you back.", replyDate: "2026-06-20",
    cleanliness: 5, staff: 5, comfort: 5, location: 5, value: 4,
    images: [],
  },
  {
    id: "orev-2", hotelId: "oh-2", hotelName: "Skyline Hotel New York", roomType: "King Suite",
    guestName: "James Mitchell", guestAvatar: "", guestCountry: "United States",
    rating: 4, title: "Great views, excellent service", comment: "The views from our room were spectacular. Service was top-notch. Only minor issue was the wait for the elevator during peak hours.",
    date: "2026-06-26", status: "published",
    reply: "Thank you James! We've noted your feedback about the elevators and are working on improving wait times.", replyDate: "2026-06-27",
    cleanliness: 5, staff: 5, comfort: 4, location: 5, value: 3,
    images: [],
  },
  {
    id: "orev-3", hotelId: "oh-4", hotelName: "Seaside Escape Goa", roomType: "Deluxe Room",
    guestName: "Raj Patel", guestAvatar: "", guestCountry: "India",
    rating: 5, title: "Paradise found!", comment: "The beach access is incredible. Rooms are spacious, food is delicious, and the staff goes above and beyond. Perfect family vacation spot.",
    date: "2026-06-15", status: "published",
    cleanliness: 5, staff: 5, comfort: 5, location: 5, value: 5,
    images: [],
  },
  {
    id: "orev-4", hotelId: "oh-5", hotelName: "Zen Garden Tokyo", roomType: "Deluxe Room",
    guestName: "Yuki Tanaka", guestAvatar: "", guestCountry: "Japan",
    rating: 4, title: "Tranquil oasis in Ginza", comment: "Beautiful authentic Japanese experience. The onsen was incredibly relaxing. Room was a bit small but that's expected in Tokyo. Staff very courteous.",
    date: "2026-05-24", status: "published",
    cleanliness: 5, staff: 5, comfort: 4, location: 4, value: 4,
    images: [],
  },
  {
    id: "orev-5", hotelId: "oh-3", hotelName: "The Alpine Lodge", roomType: "Alpine Room",
    guestName: "Elena Weber", guestAvatar: "", guestCountry: "Switzerland",
    rating: 5, title: "Magical winter wonderland", comment: "The Alpine Lodge is pure magic. The staff remembered our names, the spa was world-class, and waking up to the mountain views was unforgettable.",
    date: "2026-07-06", status: "pending",
    cleanliness: 5, staff: 5, comfort: 5, location: 5, value: 4,
    images: [],
  },
  {
    id: "orev-6", hotelId: "oh-2", hotelName: "Skyline Hotel New York", roomType: "Corner Suite",
    guestName: "Anonymous", guestAvatar: "", guestCountry: "Unknown",
    rating: 2, title: "Disappointed with service", comment: "Room was nice but the air conditioning didn't work properly. Called front desk multiple times but no one came to fix it. Not worth the price.",
    date: "2026-06-12", status: "pending",
    cleanliness: 3, staff: 2, comfort: 2, location: 5, value: 1,
    images: [],
  },
]
