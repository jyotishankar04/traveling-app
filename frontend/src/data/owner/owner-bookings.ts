export interface OwnerBooking {
  id: string
  bookingId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  guestAvatar: string
  guestCountry: string
  hotelId: string
  hotelName: string
  hotelImage: string
  roomType: string
  roomTypeId: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  rooms: number
  amount: number
  currency: string
  paymentStatus: "paid" | "pending" | "refunded" | "failed"
  bookingStatus: "confirmed" | "upcoming" | "completed" | "cancelled"
  source: string
  specialRequests: string
  internalNotes: string
  createdAt: string
  cancelledOn?: string
  refundStatus?: string
  cancellationReason?: string
  reviewRating?: number
  reviewComment?: string
}

export const ownerBookings: OwnerBooking[] = [
  {
    id: "ob-1", bookingId: "HZB-2026-1001",
    guestName: "Sophie Laurent", guestEmail: "sophie.l@example.com", guestPhone: "+33 6 12 34 56 78",
    guestAvatar: "", guestCountry: "France",
    hotelId: "oh-1", hotelName: "Lumière Hotel Paris", hotelImage: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    roomType: "Deluxe Room", roomTypeId: "or-1",
    checkIn: "2026-06-15", checkOut: "2026-06-18", nights: 3, guests: 2, rooms: 1,
    amount: 1560, currency: "EUR", paymentStatus: "paid", bookingStatus: "confirmed", source: "Booking.com",
    specialRequests: "Late check-in around 8 PM", internalNotes: "VIP guest - add welcome amenity",
    createdAt: "2026-05-20",
  },
  {
    id: "ob-2", bookingId: "HZB-2026-1002",
    guestName: "James Mitchell", guestEmail: "james.m@example.com", guestPhone: "+1 (212) 555-1234",
    guestAvatar: "", guestCountry: "United States",
    hotelId: "oh-2", hotelName: "Skyline Hotel New York", hotelImage: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    roomType: "King Suite", roomTypeId: "or-4",
    checkIn: "2026-06-20", checkOut: "2026-06-25", nights: 5, guests: 2, rooms: 1,
    amount: 3250, currency: "USD", paymentStatus: "paid", bookingStatus: "upcoming", source: "Direct",
    specialRequests: "High floor please", internalNotes: "",
    createdAt: "2026-06-01",
  },
  {
    id: "ob-3", bookingId: "HZB-2026-1003",
    guestName: "Elena Weber", guestEmail: "elena.w@example.com", guestPhone: "+41 79 555 6789",
    guestAvatar: "", guestCountry: "Switzerland",
    hotelId: "oh-3", hotelName: "The Alpine Lodge", hotelImage: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    roomType: "Alpine Room", roomTypeId: "or-7",
    checkIn: "2026-07-01", checkOut: "2026-07-05", nights: 4, guests: 2, rooms: 1,
    amount: 1920, currency: "CHF", paymentStatus: "paid", bookingStatus: "upcoming", source: "Expedia",
    specialRequests: "Vegetarian meal options", internalNotes: "Allergic to feathers - use synthetic pillows",
    createdAt: "2026-06-10",
  },
  {
    id: "ob-4", bookingId: "HZB-2026-1004",
    guestName: "Raj Patel", guestEmail: "raj.p@example.com", guestPhone: "+91 98765 43210",
    guestAvatar: "", guestCountry: "India",
    hotelId: "oh-4", hotelName: "Seaside Escape Goa", hotelImage: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    roomType: "Deluxe Room", roomTypeId: "or-1",
    checkIn: "2026-06-10", checkOut: "2026-06-14", nights: 4, guests: 3, rooms: 1,
    amount: 1160, currency: "USD", paymentStatus: "paid", bookingStatus: "completed", source: "Agoda",
    specialRequests: "Airport pickup needed", internalNotes: "",
    createdAt: "2026-05-05",
    reviewRating: 5, reviewComment: "Amazing property! Will definitely return.",
  },
  {
    id: "ob-5", bookingId: "HZB-2026-1005",
    guestName: "Yuki Tanaka", guestEmail: "yuki.t@example.com", guestPhone: "+81 90 5555 1234",
    guestAvatar: "", guestCountry: "Japan",
    hotelId: "oh-5", hotelName: "Zen Garden Tokyo", hotelImage: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    roomType: "Deluxe Room", roomTypeId: "or-1",
    checkIn: "2026-05-20", checkOut: "2026-05-23", nights: 3, guests: 1, rooms: 1,
    amount: 1020, currency: "JPY", paymentStatus: "paid", bookingStatus: "completed", source: "Direct",
    specialRequests: "", internalNotes: "",
    createdAt: "2026-04-15",
    reviewRating: 4, reviewComment: "Beautiful quiet hotel in Ginza. The onsen was wonderful.",
  },
  {
    id: "ob-6", bookingId: "HZB-2026-1006",
    guestName: "Maria Garcia", guestEmail: "maria.g@example.com", guestPhone: "+34 612 345 678",
    guestAvatar: "", guestCountry: "Spain",
    hotelId: "oh-1", hotelName: "Lumière Hotel Paris", hotelImage: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    roomType: "Eiffel Suite", roomTypeId: "or-2",
    checkIn: "2026-07-10", checkOut: "2026-07-15", nights: 5, guests: 2, rooms: 1,
    amount: 4450, currency: "EUR", paymentStatus: "pending", bookingStatus: "upcoming", source: "Booking.com",
    specialRequests: "Anniversary celebration - rose petals and champagne please", internalNotes: "Honeymoon couple - upgrade if available",
    createdAt: "2026-06-18",
  },
  {
    id: "ob-7", bookingId: "HZB-2026-1007",
    guestName: "Robert Kim", guestEmail: "robert.k@example.com", guestPhone: "+82 10 5555 6789",
    guestAvatar: "", guestCountry: "South Korea",
    hotelId: "oh-2", hotelName: "Skyline Hotel New York", hotelImage: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    roomType: "Corner Suite", roomTypeId: "or-5",
    checkIn: "2026-06-05", checkOut: "2026-06-08", nights: 3, guests: 2, rooms: 1,
    amount: 2850, currency: "USD", paymentStatus: "refunded", bookingStatus: "cancelled", source: "Expedia",
    specialRequests: "", internalNotes: "Cancelled due to flight issues",
    createdAt: "2026-05-10", cancelledOn: "2026-06-03", refundStatus: "fully_refunded", cancellationReason: "Flight cancellation",
  },
  {
    id: "ob-8", bookingId: "HZB-2026-1008",
    guestName: "Priya Sharma", guestEmail: "priya.s@example.com", guestPhone: "+91 99887 76655",
    guestAvatar: "", guestCountry: "India",
    hotelId: "oh-4", hotelName: "Seaside Escape Goa", hotelImage: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    roomType: "Deluxe Room", roomTypeId: "or-1",
    checkIn: "2026-07-20", checkOut: "2026-07-25", nights: 5, guests: 2, rooms: 1,
    amount: 1450, currency: "USD", paymentStatus: "paid", bookingStatus: "confirmed", source: "Direct",
    specialRequests: "Beach view room preferred", internalNotes: "",
    createdAt: "2026-07-01",
  },
]
