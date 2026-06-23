/**
 * Centralized route path constants.
 *
 * Use these instead of string literals so links and navigation stay in sync
 * with the route declarations in `App.tsx`.
 */
export const ROUTES = {
  // Public
  home: "/",
  hotels: "/hotels",
  hotel: (slug: string) => `/hotels/${slug}`,
  room: (hotelSlug: string, roomSlug: string) =>
    `/hotels/${hotelSlug}/rooms/${roomSlug}`,
  hotelProfile: (slug: string) => `/hotels/${slug}/profile`,
  destinations: "/destinations",
  destination: (slug: string) => `/destinations/${slug}`,
  about: "/about",
  contact: "/contact",
  offers: "/offers",
  offer: (id: string) => `/offers/${id}`,
  help: "/help",
  helpArticle: (slug: string) => `/help/${slug}`,
  terms: "/terms",
  privacy: "/privacy",
  cancellationPolicy: "/cancellation-policy",
  // Auth
  login: "/auth/login",
  register: "/auth/register",
  verify: "/auth/verify",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  onboarding: "/onboarding",
  ownerOnboarding: "/onboarding/owner",
  // Customer
  profile: "/profile",
  editProfile: "/profile/edit",
  bookings: "/profile/bookings",
  bookingDetail: (bookingId: string) => `/profile/bookings/${bookingId}`,
  wishlist: "/profile/wishlist",
  reviews: "/profile/reviews",
  payments: "/profile/payments",
  settings: "/profile/settings",
  notifications: "/profile/notifications",
  // Booking
  checkout: "/booking/checkout",
  bookingSuccess: "/booking/success",
  bookingFailed: "/booking/failed",
  bookingCancelled: "/booking/cancelled",
  // Owner
  ownerDashboard: "/owner/dashboard",
  // Admin
  adminDashboard: "/admin/dashboard",
  // Fallback
  notFound: "*",
} as const