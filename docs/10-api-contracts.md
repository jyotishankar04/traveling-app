# API contracts

This document defines every backend endpoint for Horizoné. The frontend
uses mock data today, so these endpoints are inferred from the real pages
and flows. A backend developer can build directly from this document.

The contract uses REST with versioning.

## Base URL

```txt
/api/v1
```

## Conventions

Every response uses the `ApiResponse<T>` envelope from `09-data-models.md`.
List endpoints use `PaginatedResponse<T>`. Examples below show the `data`
payload directly when the envelope is implied.

- **Auth:** Most endpoints require a valid JWT access token in the
  `Authorization: Bearer <token>` header. The "Auth required" column says
  yes or no.
- **Roles:** Each endpoint lists the roles allowed.
- **Errors:** All errors return the `ApiError` shape with a `code`.
  Common codes: `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION`,
  `CONFLICT`, `RATE_LIMITED`, `INTERNAL`.
- **Pagination:** List endpoints accept `page`, `pageSize`, `sort`, and
  `order` query params and return `metadata` with totals.

---

## Auth APIs

### POST /api/v1/auth/register

Purpose: Create a new customer account and start email verification.

Auth required: No

Roles: Guest

Request:
```json
{
  "name": "Alex Thompson",
  "email": "alex@example.com",
  "password": "password123"
}
```

Success response (201):
```json
{
  "success": true,
  "message": "Registration successful. Check your email for a verification code.",
  "data": {
    "userId": "usr_abc123",
    "email": "alex@example.com",
    "verificationRequired": true
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Email already in use",
  "error": { "code": "EMAIL_TAKEN", "field": "email" }
}
```

Notes: Creates a User with role `customer`. Sends a verification email with
a six-digit code. Passwords are hashed with bcrypt.

### POST /api/v1/auth/login

Purpose: Log in a user and return access and refresh tokens.

Auth required: No

Roles: Guest

Request:
```json
{
  "email": "alex@example.com",
  "password": "password123"
}
```

Success response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "usr_abc123",
      "name": "Alex Thompson",
      "email": "alex@example.com",
      "role": "customer",
      "avatar": ""
    },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Invalid email or password",
  "error": { "code": "INVALID_CREDENTIALS" }
}
```

Notes: Unverified accounts can log in but see a banner prompting
verification. Both tokens are returned in the body and stored client-side.

### POST /api/v1/auth/verify-email

Purpose: Verify an email with a six-digit OTP.

Auth required: No

Roles: Guest (the just-registered user)

Request:
```json
{
  "userId": "usr_abc123",
  "code": "123456"
}
```

Success response (200):
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "userId": "usr_abc123",
    "emailVerified": true
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Invalid or expired verification code",
  "error": { "code": "INVALID_VERIFICATION_CODE" }
}
```

### POST /api/v1/auth/forgot-password

Purpose: Send a password reset email.

Auth required: No

Roles: Guest

Request:
```json
{ "email": "alex@example.com" }
```

Success response (200):
```json
{
  "success": true,
  "message": "If an account exists, a reset link has been sent.",
  "data": null
}
```

Error response: Same envelope always, to prevent email enumeration.

Notes: Sends a signed reset token to the email. The token expires in one
hour.

### POST /api/v1/auth/reset-password

Purpose: Set a new password from a reset token.

Auth required: No

Roles: Guest

Request:
```json
{
  "token": "reset_token_from_email",
  "password": "newPassword123"
}
```

Success response (200):
```json
{
  "success": true,
  "message": "Password reset successful",
  "data": null
}
```

Error response:
```json
{
  "success": false,
  "message": "Reset token expired or invalid",
  "error": { "code": "INVALID_RESET_TOKEN" }
}
```

### POST /api/v1/auth/logout

Purpose: Invalidate the refresh token.

Auth required: Yes

Roles: All authenticated

Request:
```json
{ "refreshToken": "eyJhbGciOi..." }
```

Success response (200):
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

Notes: Adds the refresh token to a denylist. The access token stays valid
until it expires, so the client must also discard it.

### GET /api/v1/auth/me

Purpose: Return the current user from the access token.

Auth required: Yes

Roles: All authenticated

Success response (200):
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "id": "usr_abc123",
    "name": "Alex Thompson",
    "email": "alex@example.com",
    "role": "customer",
    "avatar": "",
    "membershipTier": "gold",
    "isEmailVerified": true
  }
}
```

Error response:
```json
{ "success": false, "message": "Unauthorized", "error": { "code": "UNAUTHORIZED" } }
```

### POST /api/v1/auth/refresh-token

Purpose: Exchange a refresh token for a new access token.

Auth required: No (uses the refresh token in the body)

Roles: All authenticated

Request:
```json
{ "refreshToken": "eyJhbGciOi..." }
```

Success response (200):
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Invalid refresh token",
  "error": { "code": "INVALID_REFRESH_TOKEN" }
}
```

Notes: Rotates the refresh token. If the old token is reused, all tokens
for that user are revoked (reuse detection).

### POST /api/v1/auth/onboarding

Purpose: Save customer onboarding data.

Auth required: Yes

Roles: customer

Request:
```json
{
  "nationality": "United States",
  "language": "English",
  "interests": ["beach", "city", "spa"],
  "destinations": ["paris", "bali"],
  "notificationPreferences": { "emailUpdates": true, "marketingEmails": false }
}
```

Success response (200):
```json
{ "success": true, "message": "Onboarding complete", "data": null }
```

### POST /api/v1/auth/owner-onboarding

Purpose: Save owner business and verification data, upgrade role to owner.

Auth required: Yes

Roles: customer (upgrades to owner on success)

Request:
```json
{
  "businessName": "Aurelia Resorts LLC",
  "businessType": "LLC",
  "registrationNumber": "REG-99201",
  "country": "Indonesia",
  "address": "Jl. Pantai Balangan, Bali",
  "documents": ["doc_id_1"]
}
```

Success response (200):
```json
{
  "success": true,
  "message": "Owner application submitted. Verification pending.",
  "data": { "ownerId": "own_xyz", "verificationStatus": "pending" }
}
```

---

## Customer APIs

### GET /api/v1/profile

Purpose: Get the current customer's profile.

Auth required: Yes | Roles: customer

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "id": "usr_1",
    "name": "Alex Thompson",
    "email": "alex@example.com",
    "phone": "+1 (555) 123-4567",
    "avatar": "",
    "nationality": "United States",
    "language": "English",
    "dateOfBirth": "1990-05-15",
    "gender": "male",
    "memberSince": "January 2023",
    "membershipTier": "Gold",
    "rewardPoints": 12450,
    "tripsCompleted": 12,
    "upcomingTrips": 3,
    "savedStays": 8,
    "preferences": { "currency": "USD", "timezone": "America/New_York", "emailUpdates": true, "marketingEmails": false, "smsNotifications": true },
    "address": { "street": "350 Fifth Avenue, Apt 12B", "city": "New York", "state": "NY", "zip": "10118", "country": "United States" }
  }
}
```

### PATCH /api/v1/profile

Purpose: Update the customer profile.

Auth required: Yes | Roles: customer

Request (any subset of fields):
```json
{ "name": "Alex T.", "phone": "+1 (555) 987-6543", "avatar": "https://..." }
```

Success response: returns the updated `User` profile.

### GET /api/v1/profile/bookings

Purpose: List the customer's bookings.

Auth required: Yes | Roles: customer

Query params: `status` = `upcoming|completed|cancelled`, `page`, `pageSize`

Success response: `PaginatedResponse<Booking>`.

### GET /api/v1/profile/bookings/:bookingId

Purpose: Get one booking for the customer.

Auth required: Yes | Roles: customer

Path params: `bookingId`

Success response: `ApiResponse<Booking>`

Error: `NOT_FOUND` when the booking does not belong to the user.

### GET /api/v1/profile/wishlist

Purpose: List saved hotels.

Auth required: Yes | Roles: customer

Success response: `ApiResponse<Hotel[]>`

### POST /api/v1/profile/wishlist

Purpose: Save a hotel.

Auth required: Yes | Roles: customer

Request:
```json
{ "hotelId": "lumiere-paris" }
```

Error: `CONFLICT` when already saved.

### DELETE /api/v1/profile/wishlist/:hotelId

Purpose: Remove a saved hotel.

Auth required: Yes | Roles: customer

Path params: `hotelId`

Success response: `{ "success": true, "message": "Removed from wishlist", "data": null }`

### GET /api/v1/profile/reviews

Purpose: List the customer's reviews.

Auth required: Yes | Roles: customer

Success response: `ApiResponse<UserReview[]>`

### GET /api/v1/profile/payments

Purpose: List the customer's payment history.

Auth required: Yes | Roles: customer

Success response: `ApiResponse<Payment[]>`

### GET /api/v1/profile/notifications

Purpose: List the customer's notifications.

Auth required: Yes | Roles: customer

Query params: `unread=true`

Success response: `ApiResponse<Notification[]>`

### PATCH /api/v1/profile/notifications/:notificationId/read

Purpose: Mark a notification read.

Auth required: Yes | Roles: customer

Success response: `{ "success": true, ... }`

### PATCH /api/v1/profile/settings

Purpose: Update account settings and preferences.

Auth required: Yes | Roles: customer

Request:
```json
{ "preferences": { "emailUpdates": false } }
```

---

## Public hotel APIs

### GET /api/v1/hotels

Purpose: Search and list hotels.

Auth required: No | Roles: all

Query params: `destination`, `type`, `city`, `country`, `minPrice`,
`maxPrice`, `stars`, `minRating`, `amenities`, `freeCancellation`,
`featured`, `page`, `pageSize`, `sort`, `order`

Success response: `PaginatedResponse<Hotel>`

Notes: `sort` values include `price_asc`, `price_desc`, `rating`,
`recommended`. `amenities` is a comma-separated list.

### GET /api/v1/hotels/:slug

Purpose: Get one hotel by slug, with rooms and reviews.

Auth required: No | Roles: all

Path params: `slug`

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "hotel": { "id": "lumiere-paris", "name": "Lumière Hotel Paris", "...": "..." },
    "rooms": [],
    "reviews": []
  }
}
```

Error: `NOT_FOUND` when the slug does not exist.

### GET /api/v1/hotels/:slug/profile

Purpose: Get the hotel profile (amenities, rooms, reviews, location,
policies, contact).

Auth required: No | Roles: all

Success response: `ApiResponse<HotelProfile>` where `HotelProfile` nests the
hotel plus `popularHotels`, `houseRules`, and `contact`.

### GET /api/v1/hotels/:slug/rooms/:roomSlug

Purpose: Get one room type by slug.

Auth required: No | Roles: all

Success response: `ApiResponse<RoomType>`

### GET /api/v1/destinations

Purpose: List destinations.

Auth required: No | Roles: all

Query params: `region`, `featured`, `page`, `pageSize`

Success response: `PaginatedResponse<Destination>`

### GET /api/v1/destinations/:slug

Purpose: Get one destination with top hotels.

Auth required: No | Roles: all

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": { "destination": {}, "topHotels": [] }
}
```

### GET /api/v1/offers

Purpose: List active public offers.

Auth required: No | Roles: all

Query params: `featured`, `type`, `page`, `pageSize`

Success response: `PaginatedResponse<PublicOffer>`

### GET /api/v1/offers/:id

Purpose: Get one offer.

Auth required: No | Roles: all

Success response: `ApiResponse<PublicOffer>`

### GET /api/v1/property-types

Purpose: List property type shortcuts (for the landing page).

Auth required: No | Roles: all

Success response: `ApiResponse<PropertyType[]>`

### GET /api/v1/help

Purpose: List help articles.

Auth required: No | Roles: all

Query params: `q`

Success response: `ApiResponse<HelpArticle[]>`

### GET /api/v1/help/:slug

Purpose: Get one help article.

Auth required: No | Roles: all

Success response: `ApiResponse<HelpArticle>`

### POST /api/v1/contact

Purpose: Submit the contact form.

Auth required: No | Roles: all

Request:
```json
{ "name": "Alex", "email": "alex@example.com", "subject": "Hi", "message": "..." }
```

Success response: `{ "success": true, "message": "Message sent", "data": null }`

---

## Booking APIs

### POST /api/v1/bookings/checkout

Purpose: Validate a booking and return a payment client secret or session
from the abstract payment provider.

Auth required: Yes | Roles: customer

Request:
```json
{
  "hotelId": "lumiere-paris",
  "roomTypeId": "lumiere-eiffel-suite",
  "checkIn": "2026-07-15",
  "checkOut": "2026-07-20",
  "guests": 2,
  "rooms": 1,
  "paymentMethod": "card"
}
```

Success response:
```json
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "bookingDraftId": "bd_123",
    "priceBreakdown": { "roomRate": 7500, "taxes": 750, "total": 8250, "currency": "EUR" },
    "paymentIntent": { "clientSecret": "pi_secret_xxx", "provider": "abstract" }
  }
}
```

Notes: Confirms availability, locks the room for a short window, and
returns the price breakdown plus a payment intent from the payment
provider slot.

### POST /api/v1/bookings

Purpose: Confirm a booking after a successful payment.

Auth required: Yes | Roles: customer

Request:
```json
{
  "bookingDraftId": "bd_123",
  "paymentIntentId": "pi_xxx",
  "guestInfo": {
    "fullName": "Alex Thompson",
    "email": "alex@example.com",
    "phone": "+1 (555) 123-4567",
    "country": "United States"
  },
  "specialRequests": "High floor please"
}
```

Success response:
```json
{
  "success": true,
  "message": "Booking confirmed",
  "data": {
    "bookingId": "HZB-2026-001",
    "status": "confirmed",
    "paymentStatus": "paid"
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Payment failed",
  "error": { "code": "PAYMENT_FAILED" }
}
```

Notes: The frontend navigates to `/booking/success`, `/booking/failed`,
or `/booking/cancelled` based on the result.

### GET /api/v1/bookings/:bookingId

Purpose: Get one booking (customer, owner, or admin view based on role).

Auth required: Yes | Roles: customer (own), owner (own hotel), admin (any)

Path params: `bookingId`

Success response: `ApiResponse<Booking>`

### POST /api/v1/bookings/:bookingId/cancel

Purpose: Cancel a booking and start a refund.

Auth required: Yes | Roles: customer (own), admin

Request:
```json
{ "reason": "Plans changed" }
```

Success response:
```json
{
  "success": true,
  "message": "Booking cancelled",
  "data": { "bookingId": "HZB-2026-001", "status": "cancelled", "refundStatus": "processing" }
}
```

Notes: Refund amount depends on the hotel cancellation policy and how
close the check-in date is.

### GET /api/v1/bookings/:bookingId/invoice

Purpose: Download a booking invoice.

Auth required: Yes | Roles: customer (own), owner (own hotel), admin

Success response: a PDF file (`Content-Type: application/pdf`).

### GET /api/v1/bookings/availability

Purpose: Check room availability for given dates.

Auth required: No | Roles: all

Query params: `roomTypeId`, `checkIn`, `checkOut`

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": { "available": true, "remainingRooms": 4, "pricePerNight": 850 }
}
```

---

## Owner APIs

All owner endpoints require the `owner` role and verify that the requested
hotel or room belongs to the authenticated owner.

### GET /api/v1/owner/dashboard

Auth required: Yes | Roles: owner

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "stats": { "totalRevenue": 524000, "totalBookings": 142, "occupancy": 78, "avgDailyRate": 520 },
    "revenueByMonth": [],
    "recentBookings": [],
    "alerts": []
  }
}
```

### GET /api/v1/owner/analytics

Auth required: Yes | Roles: owner

Query params: `from`, `to`, `hotelId`

Success response: `ApiResponse<OwnerAnalyticsSummary>` plus the arrays in
`09-data-models.md` (`dailyMetrics`, `channels`, `occupancyTrend`,
`bookingWindows`, `marketComparison`, `revenueByHotel`,
`roomTypePerformance`).

### GET /api/v1/owner/calendar

Auth required: Yes | Roles: owner

Query params: `month` (for example `2026-06`), `hotelId`

Success response: `ApiResponse<CalendarEvent[]>`

### GET /api/v1/owner/hotels

Auth required: Yes | Roles: owner

Query params: `status`, `page`, `pageSize`

Success response: `PaginatedResponse<OwnerHotel>`

### POST /api/v1/owner/hotels

Auth required: Yes | Roles: owner

Request:
```json
{
  "name": "Aurelia Resort Bali",
  "location": "Jl. Pantai Balangan, Bali",
  "city": "Bali",
  "country": "Indonesia",
  "propertyType": "resorts",
  "starRating": 5,
  "shortDescription": "Tropical luxury on Bali's coastline.",
  "longDescription": "...",
  "amenities": ["pool", "spa", "beach-access"],
  "images": ["https://..."],
  "checkInTime": "14:00",
  "checkOutTime": "12:00",
  "cancellationPolicy": "Free up to 7 days before check-in."
}
```

Success response (201):
```json
{
  "success": true,
  "message": "Hotel created. Pending admin approval.",
  "data": { "hotelId": "hot_123", "slug": "aurelia-resort-bali", "approvalStatus": "pending" }
}
```

Notes: New hotels start with `approvalStatus: pending` and
`listingStatus: inactive`. They become public only after admin approval.

### GET /api/v1/owner/hotels/:hotelId

Auth required: Yes | Roles: owner (own hotel only)

Success response:
```json
{ "success": true, "message": "OK", "data": { "hotel": {}, "stats": {}, "rooms": [], "recentBookings": [] } }
```

Error: `FORBIDDEN` when the owner does not own the hotel.

### PATCH /api/v1/owner/hotels/:hotelId

Auth required: Yes | Roles: owner (own)

Request: any subset of hotel fields.

Success response: `ApiResponse<OwnerHotel>`

### DELETE /api/v1/owner/hotels/:hotelId

Auth required: Yes | Roles: owner (own)

Success response: `{ "success": true, "message": "Hotel deleted", "data": null }`

Notes: Soft delete or set `status: inactive`. Reject if active bookings
exist.

### PATCH /api/v1/owner/hotels/:hotelId/gallery

Auth required: Yes | Roles: owner (own)

Request:
```json
{ "images": ["https://...", "https://..."] }
```

Notes: Accepts a list of image URLs. Upload happens separately through the
blob store slot (see `20-backend-integration-plan.md`).

### PATCH /api/v1/owner/hotels/:hotelId/amenities

Auth required: Yes | Roles: owner (own)

Request:
```json
{ "amenities": ["wifi", "pool", "spa"] }
```

### PATCH /api/v1/owner/hotels/:hotelId/policies

Auth required: Yes | Roles: owner (own)

Request:
```json
{ "policies": [ { "id": "check-in", "fields": [ { "id": "time", "value": "14:00" } ] } ] }
```

### GET /api/v1/owner/hotels/:hotelId/rooms

Auth required: Yes | Roles: owner (own)

Success response: `ApiResponse<OwnerRoom[]>`

### POST /api/v1/owner/hotels/:hotelId/rooms

Auth required: Yes | Roles: owner (own)

Request:
```json
{
  "name": "Ocean Pool Villa",
  "description": "Private villa with infinity pool.",
  "maxAdults": 2,
  "maxChildren": 0,
  "bedType": "King",
  "size": "120 m²",
  "view": "Ocean view",
  "basePrice": 750,
  "weekendPrice": 850,
  "extraGuestPrice": 100,
  "currency": "USD",
  "totalUnits": 4,
  "amenities": ["pool", "wifi", "ac"],
  "images": ["https://..."]
}
```

Success response (201): `ApiResponse<OwnerRoom>`

### GET /api/v1/owner/hotels/:hotelId/rooms/:roomTypeId

Auth required: Yes | Roles: owner (own)

Success response: `ApiResponse<OwnerRoom>`

### PATCH /api/v1/owner/hotels/:hotelId/rooms/:roomTypeId

Auth required: Yes | Roles: owner (own)

Request: any subset of room fields.

### PATCH /api/v1/owner/hotels/:hotelId/rooms/:roomTypeId/availability

Auth required: Yes | Roles: owner (own)

Request:
```json
{
  "updates": [
    { "date": "2026-07-10", "availableUnits": 3, "price": 800, "isBlocked": false },
    { "date": "2026-07-11", "availableUnits": 0, "isBlocked": true }
  ]
}
```

Notes: Upserts `RoomAvailability` rows. The owner calendar page uses this
to block dates or adjust per-day inventory.

### PATCH /api/v1/owner/hotels/:hotelId/rooms/:roomTypeId/pricing

Auth required: Yes | Roles: owner (own)

Request:
```json
{
  "basePrice": 780,
  "weekendPrice": 880,
  "extraGuestPrice": 120,
  "currency": "USD"
}
```

### GET /api/v1/owner/bookings

Auth required: Yes | Roles: owner

Query params: `status` = `upcoming|completed|cancelled`, `hotelId`, `page`,
`pageSize`

Success response: `PaginatedResponse<OwnerBooking>`

### GET /api/v1/owner/bookings/:bookingId

Auth required: Yes | Roles: owner (must own the booked hotel)

Success response: `ApiResponse<OwnerBooking>`

### GET /api/v1/owner/reviews

Auth required: Yes | Roles: owner

Query params: `status`, `hotelId`

Success response: `PaginatedResponse<OwnerReview>`

### GET /api/v1/owner/reviews/:reviewId

Auth required: Yes | Roles: owner (own hotel)

Success response: `ApiResponse<OwnerReview>`

### POST /api/v1/owner/reviews/:reviewId/reply

Auth required: Yes | Roles: owner (own hotel)

Request:
```json
{ "reply": "Thank you for your kind words. We hope to welcome you back." }
```

Success response: `ApiResponse<OwnerReview>`

### GET /api/v1/owner/payouts

Auth required: Yes | Roles: owner

Query params: `status`, `from`, `to`

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": { "summary": { "totalEarningsThisMonth": 52000, "totalPayouts": 48000, "pendingPayout": 4000, "nextPayoutDate": "2026-07-01", "estimatedNextAmount": 4000, "payoutMethod": "Bank transfer" }, "items": [] }
}
```

### GET /api/v1/owner/notifications

Auth required: Yes | Roles: owner

Query params: `unread`

Success response: `ApiResponse<OwnerNotification[]>`

### GET /api/v1/owner/profile

Auth required: Yes | Roles: owner

Success response: `ApiResponse<OwnerUser>`

### PATCH /api/v1/owner/settings

Auth required: Yes | Roles: owner

Request: settings subset (notifications, language, payout method).

### POST /api/v1/uploads

Purpose: Upload an image to the blob store slot. Returns a URL to use in
hotel and room payloads.

Auth required: Yes | Roles: owner, admin

Request: `multipart/form-data` with a `file` field.

Success response:
```json
{
  "success": true,
  "message": "Upload complete",
  "data": { "url": "https://blob.store/abc.jpg", "id": "img_123" }
}
```

---

## Admin APIs

All admin endpoints require the `admin` role.

### GET /api/v1/admin/dashboard

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "summary": { "totalUsers": 0, "totalOwners": 0, "totalHotels": 0, "totalBookings": 0, "totalRevenue": 0, "pendingApprovals": 0, "flaggedReviews": 0, "failedPayouts": 0, "bookingDisputes": 0, "userGrowth": 0, "bookingGrowth": 0, "revenueGrowth": 0 },
    "monthlyRevenue": [],
    "monthlyBookings": [],
    "monthlyUsers": [],
    "pendingHotels": [],
    "activity": []
  }
}
```

### GET /api/v1/admin/users

Query params: `status`, `search`, `page`, `pageSize`

Success response: `PaginatedResponse<AdminUser>`

### GET /api/v1/admin/users/:userId

Success response: `ApiResponse<AdminUser>` plus recent bookings and activity.

### PATCH /api/v1/admin/users/:userId/status

Request:
```json
{ "status": "suspended" }
```

Notes: Sets the user to `active`, `suspended`, or `unverified`.

### GET /api/v1/admin/owners

Query params: `verificationStatus`, `accountStatus`, `page`, `pageSize`

Success response: `PaginatedResponse<AdminOwner>`

### GET /api/v1/admin/hotels

Query params: `approvalStatus`, `listingStatus`, `search`, `page`,
`pageSize`

Success response: `PaginatedResponse<AdminHotel>`

### GET /api/v1/admin/hotels/:hotelId

Success response:
```json
{
  "success": true,
  "message": "OK",
  "data": { "hotel": {}, "completeness": 92, "riskFlags": [], "owner": {} }
}
```

### GET /api/v1/admin/hotels/pending

Success response: `ApiResponse<AdminHotel[]>` (approvalStatus pending).

### POST /api/v1/admin/hotels/:hotelId/approve

Request:
```json
{ "notes": "Listing complete, approved." }
```

Success response:
```json
{ "success": true, "message": "Hotel approved", "data": { "hotelId": "hot_123", "approvalStatus": "approved", "listingStatus": "active" } }
```

Notes: Sets `approvalStatus: approved` and `listingStatus: active` so the
hotel appears on the public site. Records an `AdminActivity` of type
`hotel_approved`.

### POST /api/v1/admin/hotels/:hotelId/reject

Request:
```json
{ "reason": "Missing high-quality images." }
```

Success response:
```json
{ "success": true, "message": "Hotel rejected", "data": { "hotelId": "hot_123", "approvalStatus": "rejected" } }
```

### GET /api/v1/admin/bookings

Query params: `status`, `paymentStatus`, `hotelId`, `from`, `to`, `page`,
`pageSize`

Success response: `PaginatedResponse<AdminBooking>`

### GET /api/v1/admin/reviews

Query params: `status` = `pending|flagged|published|hidden`, `page`,
`pageSize`

Success response: `PaginatedResponse<AdminReview>`

### POST /api/v1/admin/reviews/:reviewId/publish

Success response: `ApiResponse<AdminReview>` with `status: published`.

### POST /api/v1/admin/reviews/:reviewId/hide

Request:
```json
{ "reason": "Violation of content policy." }
```

Success response: `ApiResponse<AdminReview>` with `status: hidden`.

### GET /api/v1/admin/offers

Query params: `status`, `type`, `page`, `pageSize`

Success response: `PaginatedResponse<AdminOffer>`

### POST /api/v1/admin/offers

Request:
```json
{
  "title": "Summer in Paris",
  "tagline": "Experience the City of Light",
  "description": "...",
  "longDescription": "...",
  "discount": 20,
  "discountType": "percentage",
  "type": "seasonal",
  "destination": "Paris, France",
  "hotelNames": ["Hôtel des Arts Montmartre"],
  "image": "https://...",
  "gallery": [],
  "startDate": "2026-06-01",
  "endDate": "2026-08-31",
  "terms": [],
  "featured": true,
  "usageLimit": 500,
  "minBookingAmount": 200,
  "maxDiscount": 400,
  "membershipTier": "all"
}
```

Success response (201): `ApiResponse<AdminOffer>`

### PATCH /api/v1/admin/offers/:offerId

Request: any subset of offer fields.

### DELETE /api/v1/admin/offers/:offerId

Success response: `{ "success": true, "message": "Offer deleted", "data": null }`

### GET /api/v1/admin/destinations

Query params: `pageStatus`, `page`, `pageSize`

Success response: `PaginatedResponse<AdminDestination>`

### POST /api/v1/admin/destinations

Request:
```json
{
  "name": "Lisbon",
  "country": "Portugal",
  "region": "Europe",
  "description": "...",
  "whyVisit": "...",
  "travelTips": "...",
  "image": "https://...",
  "featured": false
}
```

### PATCH /api/v1/admin/destinations/:destinationId

Request: any subset of destination fields, including `pageStatus`.

### GET /api/v1/admin/settings

Success response: `ApiResponse<PlatformSettings>`.

### PATCH /api/v1/admin/settings

Request: settings subset (commission rates, feature flags, email
templates, maintenance mode).

### GET /api/v1/admin/activity

Query params: `type`, `userId`, `from`, `to`, `page`, `pageSize`

Success response: `PaginatedResponse<AdminActivity>`

---

## Error summary

| HTTP status | code | When |
|---|---|---|
| 400 | VALIDATION | Request body or query fails Zod validation |
| 401 | UNAUTHORIZED | Missing or invalid access token |
| 403 | FORBIDDEN | Token valid but role or ownership check failed |
| 404 | NOT_FOUND | Resource does not exist |
| 409 | CONFLICT | Duplicate resource or impossible state change |
| 409 | PAYMENT_FAILED | Payment provider rejected the charge |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL | Unexpected server error |

## Next steps

Read `11-authentication-flow.md` for how the auth endpoints fit together, and
`20-backend-integration-plan.md` for the frontend service layer.