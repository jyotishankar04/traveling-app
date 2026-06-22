export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  nationality: string
  language: string
  dateOfBirth: string
  gender: string
  memberSince: string
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum"
  rewardPoints: number
  tripsCompleted: number
  upcomingTrips: number
  savedStays: number
  preferences: {
    currency: string
    timezone: string
    language: string
    emailUpdates: boolean
    marketingEmails: boolean
    smsNotifications: boolean
  }
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export const currentUser: User = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "",
  nationality: "United States",
  language: "English",
  dateOfBirth: "1990-05-15",
  gender: "male",
  memberSince: "January 2023",
  membershipTier: "Gold",
  rewardPoints: 12450,
  tripsCompleted: 12,
  upcomingTrips: 3,
  savedStays: 8,
  preferences: {
    currency: "USD",
    timezone: "America/New_York",
    language: "English",
    emailUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
  },
  address: {
    street: "350 Fifth Avenue, Apt 12B",
    city: "New York",
    state: "NY",
    zip: "10118",
    country: "United States",
  },
}
