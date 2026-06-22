export interface AdminAnalytics {
  totalUsers: number
  totalOwners: number
  totalHotels: number
  totalBookings: number
  totalRevenue: number
  pendingApprovals: number
  flaggedReviews: number
  failedPayouts: number
  bookingDisputes: number
  userGrowth: number
  bookingGrowth: number
  revenueGrowth: number
}

export interface RevenueMetric {
  month: string
  revenue: number
  previousRevenue: number
}

export interface BookingMetric {
  month: string
  bookings: number
  previousBookings: number
}

export interface UserMetric {
  month: string
  users: number
  previousUsers: number
}

export const adminSummary: AdminAnalytics = {
  totalUsers: 12450,
  totalOwners: 342,
  totalHotels: 523,
  totalBookings: 8917,
  totalRevenue: 4218600,
  pendingApprovals: 12,
  flaggedReviews: 8,
  failedPayouts: 3,
  bookingDisputes: 6,
  userGrowth: 18.4,
  bookingGrowth: 24.7,
  revenueGrowth: 31.2,
}

export const monthlyRevenue: RevenueMetric[] = [
  { month: "Jan", revenue: 320000, previousRevenue: 278000 },
  { month: "Feb", revenue: 295000, previousRevenue: 261000 },
  { month: "Mar", revenue: 358000, previousRevenue: 302000 },
  { month: "Apr", revenue: 374000, previousRevenue: 319000 },
  { month: "May", revenue: 412000, previousRevenue: 345000 },
  { month: "Jun", revenue: 398000, previousRevenue: 338000 },
  { month: "Jul", revenue: 445000, previousRevenue: 367000 },
  { month: "Aug", revenue: 421000, previousRevenue: 355000 },
  { month: "Sep", revenue: 382000, previousRevenue: 321000 },
  { month: "Oct", revenue: 356000, previousRevenue: 298000 },
  { month: "Nov", revenue: 312000, previousRevenue: 264000 },
  { month: "Dec", revenue: 346000, previousRevenue: 290000 },
]

export const monthlyBookings: BookingMetric[] = [
  { month: "Jan", bookings: 680, previousBookings: 590 },
  { month: "Feb", bookings: 615, previousBookings: 540 },
  { month: "Mar", bookings: 742, previousBookings: 625 },
  { month: "Apr", bookings: 789, previousBookings: 658 },
  { month: "May", bookings: 874, previousBookings: 712 },
  { month: "Jun", bookings: 835, previousBookings: 695 },
  { month: "Jul", bookings: 923, previousBookings: 755 },
  { month: "Aug", bookings: 901, previousBookings: 738 },
  { month: "Sep", bookings: 812, previousBookings: 672 },
  { month: "Oct", bookings: 758, previousBookings: 634 },
  { month: "Nov", bookings: 663, previousBookings: 561 },
  { month: "Dec", bookings: 725, previousBookings: 605 },
]

export const monthlyUsers: UserMetric[] = [
  { month: "Jan", users: 9820, previousUsers: 8450 },
  { month: "Feb", users: 10150, previousUsers: 8720 },
  { month: "Mar", users: 10480, previousUsers: 9010 },
  { month: "Apr", users: 10720, previousUsers: 9250 },
  { month: "May", users: 11050, previousUsers: 9510 },
  { month: "Jun", users: 11280, previousUsers: 9720 },
  { month: "Jul", users: 11510, previousUsers: 9920 },
  { month: "Aug", users: 11740, previousUsers: 10130 },
  { month: "Sep", users: 11920, previousUsers: 10300 },
  { month: "Oct", users: 12100, previousUsers: 10450 },
  { month: "Nov", users: 12280, previousUsers: 10600 },
  { month: "Dec", users: 12450, previousUsers: 10750 },
]
