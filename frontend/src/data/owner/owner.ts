export interface OwnerUser {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: string
  language: string
  businessName: string
  businessType: string
  registrationNumber: string
  country: string
  address: string
  verified: boolean
  joinedDate: string
}

export const ownerUser: OwnerUser = {
  id: "own-1",
  name: "John Anderson",
  email: "john.anderson@horizone.com",
  phone: "+1 (555) 987-6543",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  role: "Property Owner",
  language: "English (US)",
  businessName: "Anderson Hospitality Group",
  businessType: "Hotel Management Company",
  registrationNumber: "AHG-2024-88921",
  country: "United States",
  address: "350 Fifth Avenue, 34th Floor, New York, NY 10118",
  verified: true,
  joinedDate: "2024-03-15",
}
