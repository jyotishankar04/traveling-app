export interface DailyMetric {
  date: string
  revenue: number
  bookings: number
  occupancy: number
}

export interface ChannelMetric {
  name: string
  bookings: number
  percentage: number
  color: string
}

export interface OccupancyMetric {
  month: string
  occupancy: number
  target: number
}

export interface BookingWindowMetric {
  daysOut: number
  bookings: number
}

export interface MarketComparison {
  hotel: string
  occupancy: number
  avgRate: number
  revPAR: number
  ourOccupancy: number
  ourAvgRate: number
  ourRevPAR: number
}

export interface RevenueByHotel {
  hotel: string
  revenue: number
  bookings: number
  occupancy: number
  avgRate: number
  revPAR: number
}

export interface RoomTypePerformance {
  roomType: string
  hotel: string
  revenue: number
  bookings: number
  occupancy: number
  avgRate: number
}

export const dailyMetrics: DailyMetric[] = [
  { date: "Jun 1", revenue: 12400, bookings: 8, occupancy: 72 },
  { date: "Jun 2", revenue: 14800, bookings: 10, occupancy: 75 },
  { date: "Jun 3", revenue: 13200, bookings: 9, occupancy: 74 },
  { date: "Jun 4", revenue: 16100, bookings: 12, occupancy: 78 },
  { date: "Jun 5", revenue: 18900, bookings: 14, occupancy: 82 },
  { date: "Jun 6", revenue: 22300, bookings: 16, occupancy: 85 },
  { date: "Jun 7", revenue: 21500, bookings: 15, occupancy: 84 },
  { date: "Jun 8", revenue: 17800, bookings: 11, occupancy: 80 },
  { date: "Jun 9", revenue: 14200, bookings: 9, occupancy: 76 },
  { date: "Jun 10", revenue: 19500, bookings: 13, occupancy: 83 },
  { date: "Jun 11", revenue: 21100, bookings: 15, occupancy: 86 },
  { date: "Jun 12", revenue: 23800, bookings: 17, occupancy: 88 },
  { date: "Jun 13", revenue: 25600, bookings: 18, occupancy: 90 },
  { date: "Jun 14", revenue: 24200, bookings: 16, occupancy: 87 },
  { date: "Jun 15", revenue: 18400, bookings: 12, occupancy: 81 },
]

export const channels: ChannelMetric[] = [
  { name: "Direct", bookings: 85, percentage: 28, color: "bg-neutral-900" },
  { name: "Booking.com", bookings: 72, percentage: 24, color: "bg-blue-600" },
  { name: "Expedia", bookings: 58, percentage: 19, color: "bg-amber-500" },
  { name: "Agoda", bookings: 42, percentage: 14, color: "bg-emerald-500" },
  { name: "Airbnb", bookings: 28, percentage: 9, color: "bg-red-500" },
  { name: "Other", bookings: 18, percentage: 6, color: "bg-purple-500" },
]

export const occupancyTrend: OccupancyMetric[] = [
  { month: "Jan", occupancy: 62, target: 70 },
  { month: "Feb", occupancy: 58, target: 65 },
  { month: "Mar", occupancy: 71, target: 72 },
  { month: "Apr", occupancy: 75, target: 72 },
  { month: "May", occupancy: 82, target: 78 },
  { month: "Jun", occupancy: 88, target: 85 },
]

export const bookingWindows: BookingWindowMetric[] = [
  { daysOut: 0, bookings: 5 },
  { daysOut: 7, bookings: 18 },
  { daysOut: 14, bookings: 35 },
  { daysOut: 21, bookings: 52 },
  { daysOut: 30, bookings: 68 },
  { daysOut: 45, bookings: 82 },
  { daysOut: 60, bookings: 95 },
  { daysOut: 90, bookings: 110 },
]

export const marketComparison: MarketComparison[] = [
  { hotel: "Lumière Hotel Paris", occupancy: 87, avgRate: 520, revPAR: 452, ourOccupancy: 87, ourAvgRate: 520, ourRevPAR: 452 },
  { hotel: "Skyline Hotel NY", occupancy: 78, avgRate: 650, revPAR: 507, ourOccupancy: 78, ourAvgRate: 650, ourRevPAR: 507 },
  { hotel: "The Alpine Lodge", occupancy: 92, avgRate: 480, revPAR: 442, ourOccupancy: 92, ourAvgRate: 480, ourRevPAR: 442 },
  { hotel: "Paris Competitor A", occupancy: 82, avgRate: 490, revPAR: 402, ourOccupancy: 87, ourAvgRate: 520, ourRevPAR: 452 },
  { hotel: "NY Competitor B", occupancy: 75, avgRate: 580, revPAR: 435, ourOccupancy: 78, ourAvgRate: 650, ourRevPAR: 507 },
]

export const revenueByHotel: RevenueByHotel[] = [
  { hotel: "Skyline Hotel New York", revenue: 265000, bookings: 42, occupancy: 78, avgRate: 650, revPAR: 507 },
  { hotel: "Lumière Hotel Paris", revenue: 184500, bookings: 38, occupancy: 87, avgRate: 520, revPAR: 452 },
  { hotel: "The Alpine Lodge", revenue: 158000, bookings: 25, occupancy: 92, avgRate: 480, revPAR: 442 },
  { hotel: "Seaside Escape Goa", revenue: 102000, bookings: 31, occupancy: 71, avgRate: 290, revPAR: 206 },
  { hotel: "Zen Garden Tokyo", revenue: 42000, bookings: 12, occupancy: 45, avgRate: 340, revPAR: 153 },
]

export const roomTypePerformance: RoomTypePerformance[] = [
  { roomType: "King Suite", hotel: "Skyline Hotel New York", revenue: 110500, bookings: 17, occupancy: 68, avgRate: 650 },
  { roomType: "Deluxe Room", hotel: "Lumière Hotel Paris", revenue: 78000, bookings: 15, occupancy: 75, avgRate: 520 },
  { roomType: "Corner Suite", hotel: "Skyline Hotel New York", revenue: 76000, bookings: 8, occupancy: 80, avgRate: 950 },
  { roomType: "Alpine Room", hotel: "The Alpine Lodge", revenue: 57600, bookings: 12, occupancy: 80, avgRate: 480 },
  { roomType: "Eiffel Suite", hotel: "Lumière Hotel Paris", revenue: 53400, bookings: 6, occupancy: 85, avgRate: 890 },
  { roomType: "Penthouse Suite", hotel: "Lumière Hotel Paris", revenue: 42000, bookings: 2, occupancy: 100, avgRate: 2100 },
  { roomType: "Presidential Suite", hotel: "Skyline Hotel New York", revenue: 64000, bookings: 2, occupancy: 100, avgRate: 3200 },
]

export const analyticsSummary = {
  totalRevenue: 751500,
  totalBookings: 148,
  avgOccupancy: 78,
  avgDailyRate: 456,
  revPAR: 356,
  revenueGrowth: 12.5,
  bookingGrowth: 8.3,
  occupancyChange: 4.2,
  adrChange: 3.8,
  revPARChange: 6.1,
}
