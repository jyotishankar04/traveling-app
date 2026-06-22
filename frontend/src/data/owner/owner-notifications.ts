export interface OwnerNotification {
  id: string
  type: "booking" | "payment" | "review" | "availability" | "payout" | "system"
  title: string
  message: string
  timestamp: string
  unread: boolean
  actionable: boolean
  actionLabel?: string
  actionLink?: string
}

export const ownerNotifications: OwnerNotification[] = [
  { id: "on-1", type: "booking", title: "New Booking Received", message: "Sophie Laurent booked Deluxe Room at Lumière Hotel Paris for Jun 15-18.", timestamp: "2 hours ago", unread: true, actionable: true, actionLabel: "View Booking", actionLink: "/owner/bookings/ob-1" },
  { id: "on-2", type: "booking", title: "Check-in Today", message: "3 guests checking in today across your properties.", timestamp: "3 hours ago", unread: true, actionable: true, actionLabel: "View Calendar", actionLink: "/owner/calendar" },
  { id: "on-3", type: "payment", title: "Payment Received", message: "Payment of $3,250 received for Skyline Hotel New York booking.", timestamp: "5 hours ago", unread: true, actionable: false },
  { id: "on-4", type: "review", title: "New 5-Star Review", message: "Sophie Laurent left a 5-star review for Lumière Hotel Paris.", timestamp: "1 day ago", unread: true, actionable: true, actionLabel: "View Review", actionLink: "/owner/reviews/orev-1" },
  { id: "on-5", type: "availability", title: "Low Availability Alert", message: "Penthouse Suite at Lumière Hotel Paris has 0 rooms available.", timestamp: "2 days ago", unread: false, actionable: true, actionLabel: "Manage Rooms", actionLink: "/owner/hotels/oh-1/rooms" },
  { id: "on-6", type: "availability", title: "High Demand Alert", message: "The Alpine Lodge occupancy is at 92% for this month.", timestamp: "3 days ago", unread: false, actionable: false },
  { id: "on-7", type: "payout", title: "Payout Processed", message: "Your payout of $45,200 has been sent to your bank account.", timestamp: "5 days ago", unread: false, actionable: false },
  { id: "on-8", type: "booking", title: "Booking Cancelled", message: "Robert Kim cancelled his booking at Skyline Hotel New York.", timestamp: "1 week ago", unread: false, actionable: true, actionLabel: "View Details", actionLink: "/owner/bookings/ob-7" },
  { id: "on-9", type: "review", title: "New Review Requires Moderation", message: "Anonymous left a 2-star review for Skyline Hotel New York.", timestamp: "1 week ago", unread: false, actionable: true, actionLabel: "Moderate", actionLink: "/owner/reviews/orev-6" },
  { id: "on-10", type: "system", title: "System Update", message: "Horizoné owner dashboard has been updated with new features.", timestamp: "2 weeks ago", unread: false, actionable: false },
]
