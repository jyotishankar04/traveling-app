export interface Booking {
  id: string
  bookingId: string
  hotelId: string
  hotelName: string
  hotelSlug: string
  hotelImage: string
  location: string
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  rooms: number
  guests: number
  totalPaid: number
  currency: string
  status: "confirmed" | "completed" | "cancelled" | "upcoming"
  paymentStatus: "paid" | "refunded" | "failed"
  paymentMethod: string
  transactionId: string
  paidOn: string
  bookingDate: string
}

export const bookings: Booking[] = [
  {
    id: "b-1", bookingId: "HZB-2026-001",
    hotelId: "lumiere-paris", hotelName: "Lumière Hotel Paris", hotelSlug: "lumiere-paris",
    hotelImage: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    location: "Paris, France", roomType: "Eiffel Suite",
    checkIn: "2026-07-15", checkOut: "2026-07-20", nights: 5, rooms: 1, guests: 2,
    totalPaid: 7500, currency: "EUR", status: "upcoming", paymentStatus: "paid",
    paymentMethod: "Visa ending in 4242", transactionId: "TXN-78901234", paidOn: "2026-06-10", bookingDate: "2026-06-10",
  },
  {
    id: "b-2", bookingId: "HZB-2026-002",
    hotelId: "aurelia-bali", hotelName: "Aurelia Resort Bali", hotelSlug: "aurelia-bali",
    hotelImage: "https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg",
    location: "Bali, Indonesia", roomType: "Ocean Pool Villa",
    checkIn: "2026-08-01", checkOut: "2026-08-08", nights: 7, rooms: 1, guests: 2,
    totalPaid: 5250, currency: "USD", status: "upcoming", paymentStatus: "paid",
    paymentMethod: "PayPal", transactionId: "TXN-78901235", paidOn: "2026-06-12", bookingDate: "2026-06-12",
  },
  {
    id: "b-3", bookingId: "HZB-2026-003",
    hotelId: "alpine-lodge", hotelName: "The Alpine Lodge", hotelSlug: "alpine-lodge",
    hotelImage: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    location: "Zermatt, Switzerland", roomType: "Alpine Suite",
    checkIn: "2026-02-10", checkOut: "2026-02-15", nights: 5, rooms: 1, guests: 2,
    totalPaid: 4900, currency: "CHF", status: "completed", paymentStatus: "paid",
    paymentMethod: "Mastercard ending in 1234", transactionId: "TXN-78901236", paidOn: "2025-12-15", bookingDate: "2025-12-15",
  },
  {
    id: "b-4", bookingId: "HZB-2026-004",
    hotelId: "seaside-goa", hotelName: "Seaside Escape Goa", hotelSlug: "seaside-goa",
    hotelImage: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    location: "Goa, India", roomType: "Beach Villa",
    checkIn: "2026-03-20", checkOut: "2026-03-25", nights: 5, rooms: 1, guests: 3,
    totalPaid: 1450, currency: "USD", status: "completed", paymentStatus: "paid",
    paymentMethod: "Visa ending in 4242", transactionId: "TXN-78901237", paidOn: "2026-01-05", bookingDate: "2026-01-05",
  },
  {
    id: "b-5", bookingId: "HZB-2026-005",
    hotelId: "maldives-overwater", hotelName: "Maldives Overwater Resort", hotelSlug: "maldives-overwater",
    hotelImage: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    location: "Malé, Maldives", roomType: "Overwater Villa",
    checkIn: "2026-09-10", checkOut: "2026-09-15", nights: 5, rooms: 1, guests: 2,
    totalPaid: 6000, currency: "USD", status: "upcoming", paymentStatus: "paid",
    paymentMethod: "Apple Pay", transactionId: "TXN-78901238", paidOn: "2026-07-01", bookingDate: "2026-07-01",
  },
  {
    id: "b-6", bookingId: "HZB-2026-006",
    hotelId: "santorini-villas", hotelName: "Santorini Azure Villas", hotelSlug: "santorini-villas",
    hotelImage: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    location: "Santorini, Greece", roomType: "Caldera Suite",
    checkIn: "2026-04-01", checkOut: "2026-04-05", nights: 4, rooms: 1, guests: 2,
    totalPaid: 3120, currency: "EUR", status: "cancelled", paymentStatus: "refunded",
    paymentMethod: "PayPal", transactionId: "TXN-78901239", paidOn: "2026-02-20", bookingDate: "2026-02-20",
  },
]
