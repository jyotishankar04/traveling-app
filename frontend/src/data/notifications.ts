export interface NotificationItem {
  id: string
  type: "booking" | "promotion" | "account" | "system"
  icon: string
  title: string
  message: string
  timestamp: string
  unread: boolean
}

export const notifications: NotificationItem[] = [
  { id: "n-1", type: "booking", icon: "calendar-check", title: "Booking Confirmed", message: "Your stay at Lumière Hotel Paris has been confirmed.", timestamp: "2 hours ago", unread: true },
  { id: "n-2", type: "booking", icon: "bell", title: "Check-in Reminder", message: "You check into Aurelia Resort Bali in 3 days.", timestamp: "5 hours ago", unread: true },
  { id: "n-3", type: "promotion", icon: "percent", title: "Exclusive Offer", message: "Save 30% on your next booking. Limited time offer.", timestamp: "1 day ago", unread: true },
  { id: "n-4", type: "account", icon: "award", title: "New Reward Earned", message: "Congratulations! You've earned 500 bonus points.", timestamp: "3 days ago", unread: false },
  { id: "n-5", type: "promotion", icon: "trending-down", title: "Price Drop Alert", message: "Prices dropped for The Alpine Lodge. Save up to 20%.", timestamp: "5 days ago", unread: false },
  { id: "n-6", type: "booking", icon: "check-circle", title: "Booking Completed", message: "Your stay at The Alpine Lodge was completed. Please leave a review.", timestamp: "1 week ago", unread: false },
  { id: "n-7", type: "account", icon: "shield", title: "Account Security", message: "New login from Chrome on Windows detected.", timestamp: "2 weeks ago", unread: false },
  { id: "n-8", type: "promotion", icon: "zap", title: "Weekend Flash Sale", message: "Flash sale: Up to 50% off weekend getaways.", timestamp: "2 weeks ago", unread: false },
]
