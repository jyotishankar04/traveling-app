# Page specifications

This document describes every page in Horizoné. Each entry covers the
purpose, role, layout, main sections, components used, data required, user
actions, and the loading, empty, and error states. Future API needs are
listed at the end of each entry.

Because the app has 78 pages, this document groups pages by area and keeps
a consistent template. Where a page is one of many near-identical list
pages (such as the owner bookings tabs), it is described once and the
variants are noted.

## Public pages

### `/` Landing page

- **Purpose:** Sell the platform and start a search.
- **Role:** Guest.
- **Layout:** Own navbar plus an inline footer (not `PublicLayout`).
- **Main sections:** Hero search, property type shortcuts, trending
  hotels grid, featured offers, partners strip, inline footer.
- **Components:** `navbar`, `hero-section`, `hero-search`,
  `PropertyTypeCard`, `HotelCard`, `OfferCard`, `PublicFooter`.
- **Data:** `hotels`, `destinations`, `offers`, `propertyTypes`.
- **Actions:** Search (navigate to `/hotels`), open a hotel, open an
  offer, open a property type.
- **States:** No loading (static). No empty state. No 404.
- **API:** `GET /hotels?featured=true`, `GET /destinations`,
  `GET /offers`, `GET /property-types`.

### `/hotels` Hotels listing

- **Purpose:** Search and filter hotels.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Hero heading, `FilterSidebar`, sort dropdown, grid/list
  toggle, results grid, pagination, trust badges.
- **Components:** `FilterSidebar`, `HotelCard`, `HotelListCard`,
  `SectionHeader`.
- **Data:** `hotels`. Filter values stored in `FilterValues`.
- **Actions:** Filter by price, star, rating, type, amenities; sort;
  toggle view; paginate; open a hotel.
- **States:** Loading skeleton grid. Empty "no hotels match your
  filters". Error banner.
- **API:** `GET /hotels` with query filters and pagination.

### `/hotels/:hotelId` Hotel detail

- **Purpose:** Show a single hotel and its rooms.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Gallery grid, about text, available rooms, reviews,
  policies, amenities, map preview, sticky booking sidebar.
- **Components:** `GalleryGrid`, `RoomOptionCard`, `ReviewCard`,
  `BookingSidebar`, `MapPreview`, `AmenityChip` (inline), `NotFoundState`.
- **Data:** `hotels` (by slug), `rooms`, `reviews`.
- **Actions:** Reserve a room (go to checkout), pick dates and guests.
- **States:** `NotFoundState` when the slug does not match.
- **API:** `GET /hotels/:slug` (include rooms and reviews).

### `/hotels/:hotelId/rooms/:roomTypeId` Room detail

- **Purpose:** Show a single room type and its booking options.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Image carousel, description, amenities, reviews, date and
  guest picker, sticky booking sidebar.
- **Components:** `BookingSidebar`, `ReviewCard`, amenity icons (inline).
- **Data:** `hotels` (by slug), `rooms` (by slug), `reviews`.
- **Actions:** Pick dates and guests, reserve.
- **States:** `NotFoundState` when the room slug does not match.
- **API:** `GET /hotels/:slug/rooms/:roomSlug`.

### `/hotels/:hotelId/profile` Hotel profile

- **Purpose:** A landing-style page for a hotel.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Hero name and stats, amenities, rooms, reviews, location,
  house rules, contact.
- **Components:** `GalleryGrid`, `ReviewCard`, `MapPreview`.
- **Data:** `hotels` (by slug), `rooms`, `reviews`.
- **Actions:** Open a room, view on map.
- **States:** `NotFoundState`.
- **API:** `GET /hotels/:slug/profile`.

### `/destinations` Destinations

- **Purpose:** Browse destinations.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Region filter, search, destination cards, seasonal offers,
  inspiration strip.
- **Components:** `DestinationCard`, `OfferCard`.
- **Data:** `destinations`, `offers`.
- **Actions:** Filter by region, open a destination.
- **API:** `GET /destinations`.

### `/destinations/:slug` Destination detail

- **Purpose:** Show a single destination.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Sections:** Hero, why visit, top hotels, location map.
- **Components:** `HotelCard`, `MapPreview`.
- **Data:** `destinations` (by slug), `hotels`.
- **States:** `NotFoundState`.
- **API:** `GET /destinations/:slug`.

### `/about`, `/contact`

- **Purpose:** Company info and contact form.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Contact components:** `ContactMethodCard`, `FAQAccordion` (inline),
  contact form.
- **API:** `POST /contact`.

### `/offers`, `/offers/:offerId`

- **Purpose:** Browse offers and view one offer.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Data:** `offers`, `publicOffers` (by id).
- **States:** `NotFoundState` on offer detail.
- **API:** `GET /offers`, `GET /offers/:id`.

### `/help`, `/help/:slug`

- **Purpose:** Help center and articles.
- **Role:** Guest.
- **Layout:** `PublicLayout`.
- **Components:** `HelpCard`.
- **Data:** `helpArticles`.
- **API:** `GET /help`, `GET /help/:slug`.

### Legal pages (`/terms`, `/privacy`, `/cancellation-policy`)

- **Purpose:** Static legal content.
- **Role:** Guest.
- **Layout:** `PublicLayout`.

## Auth pages

All auth pages mount the `AuthLayout` (split-screen) themselves and show a
`TrustStrip`.

### `/auth/login`

- **Purpose:** Log in.
- **Sections:** Email and password form, `SocialAuthButtons`, link to
  register and forgot-password.
- **Components:** `AuthLayout`, `SocialAuthButtons`, `TrustStrip`.
- **Actions:** Submit, navigate, social login.
- **API:** `POST /auth/login`.

### `/auth/register`

- **Purpose:** Create an account.
- **Sections:** Registration form, social, trust strip.
- **API:** `POST /auth/register`.

### `/auth/verify`

- **Purpose:** Verify email with a six-digit OTP.
- **Components:** `OTPInputGroup`.
- **API:** `POST /auth/verify-email`.

### `/auth/forgot-password`, `/auth/reset-password`

- **Purpose:** Request and set a new password. Both have a success state.
- **API:** `POST /auth/forgot-password`, `POST /auth/reset-password`.

### `/onboarding`, `/onboarding/owner`

- **Purpose:** Multi-step onboarding with a stepper.
- **Components:** `OnboardingStepper`.
- **API:** `POST /auth/onboarding`, `POST /auth/owner-onboarding`.

## Customer pages

All customer pages render inside `UserAccountLayout` (navbar, footer, and
`AccountSidebar`).

### `/profile`

- **Purpose:** Account dashboard.
- **Sections:** Welcome, stat cards, recent bookings.
- **Components:** `StatsCard`, `BookingCard`.
- **Data:** `currentUser`, `bookings`.
- **API:** `GET /profile`.

### `/profile/edit`

- **Purpose:** Edit personal info, photo, address, preferences.
- **API:** `PATCH /profile`.

### `/profile/bookings`, `/profile/bookings/:bookingId`

- **Purpose:** Bookings list with status tabs, and a single booking
  detail.
- **Components:** `BookingCard`.
- **Data:** `bookings`.
- **States:** Empty "no bookings yet". `NotFoundState` on detail.
- **API:** `GET /profile/bookings`, `GET /profile/bookings/:bookingId`.

### `/profile/wishlist`

- **Purpose:** Saved stays.
- **Components:** `WishlistHotelCard` (uses `HotelCard`).
- **Data:** `wishlist`, `hotels`.
- **API:** `GET /profile/wishlist`, `DELETE /profile/wishlist/:hotelId`.

### `/profile/reviews`

- **Purpose:** Past reviews.
- **Data:** `myReviews`.
- **API:** `GET /profile/reviews`.

### `/profile/payments`

- **Purpose:** Payment history.
- **Components:** `PaymentHistoryTable`.
- **Data:** `payments`.
- **API:** `GET /profile/payments`.

### `/profile/settings`

- **Purpose:** Account settings.
- **API:** `PATCH /profile/settings`.

### `/profile/notifications`

- **Purpose:** Notifications list, mark as read.
- **Components:** `NotificationItem`.
- **Data:** `notifications`.
- **API:** `GET /profile/notifications`,
  `PATCH /profile/notifications/:id/read`.

## Booking pages

### `/booking/checkout`

- **Purpose:** Four-step checkout.
- **Layout:** `CheckoutLayout` (logo, `CheckoutStepper`, back and
  continue buttons).
- **Steps:** `StepRoomSelection`, `StepGuestInfo`, `StepPayment`,
  `StepConfirmation`.
- **Components:** `CheckoutStepper`, `BookingSummaryPanel`.
- **Data:** `hotels`, `rooms` (selected by id).
- **Actions:** Pick a room, enter guest info, pick payment, confirm.
- **Result:** Navigate to `/booking/success`.
- **API:** `POST /bookings/checkout`, `POST /bookings`.

### `/booking/success`, `/booking/failed`, `/booking/cancelled`

- **Purpose:** Result pages after a booking attempt.
- **States:** Each is a single-screen message with a CTA.

## Owner pages

All owner pages render inside `OwnerLayout` (OwnerSidebar, OwnerTopbar).

### `/owner/dashboard`

- **Purpose:** Owner overview.
- **Sections:** Stat cards, revenue bar chart, recent bookings, alerts.
- **Components:** `OwnerStatCard`, `OwnerChartCard`, `BarChart`,
  `OwnerDataTable`, `OwnerStatusBadges`.
- **Data:** `ownerHotels`, `ownerBookings`.
- **States:** `StatsSkeleton`, `TableSkeleton`, `EmptyState`.
- **API:** `GET /owner/dashboard`.

### `/owner/analytics`

- **Purpose:** Analytics charts.
- **Data:** `dailyMetrics`, `channels`, `occupancyTrend`,
  `bookingWindows`, `marketComparison`, `revenueByHotel`,
  `roomTypePerformance`.
- **API:** `GET /owner/analytics`.

### `/owner/calendar`

- **Purpose:** Booking and availability calendar for the current month.
- **Data:** `calendarEvents`, `calendarData`.
- **API:** `GET /owner/calendar`.

### `/owner/hotels`

- **Purpose:** Owner hotel list with status and revenue.
- **Components:** `OwnerDataTable`, `HotelStatusBadge`.
- **Data:** `ownerHotels`.
- **API:** `GET /owner/hotels`.

### `/owner/hotels/new`

- **Purpose:** Create a hotel form.
- **API:** `POST /owner/hotels`.

### `/owner/hotels/:hotelId` (owner)

- **Purpose:** Single hotel overview with stats, bookings, reviews,
  revenue.
- **Data:** `ownerHotels` (by id), `ownerRooms`, `ownerBookings`.
- **API:** `GET /owner/hotels/:hotelId`.

### `/owner/hotels/:hotelId/edit`

- **Purpose:** Edit hotel in tabs (basic, contact, description, settings).
- **API:** `PATCH /owner/hotels/:hotelId`.

### `/owner/hotels/:hotelId/gallery`, `/amenities`, `/policies`

- **Purpose:** Manage images, amenities (by category), and policies (by
  section).
- **Components:** `ImageUploadCard` (planned), `AmenitySelector`,
  `PolicyEditor`.
- **Data:** `owner-amenities`, `owner-policies`.
- **API:** `PATCH ...` sub-resources.

### `/owner/hotels/:hotelId/rooms`, `/rooms/new`,
`/rooms/:roomTypeId`, `/rooms/:roomTypeId/edit`, `/rooms/:roomTypeId/gallery`,
`/rooms/:roomTypeId/availability`, `/rooms/:roomTypeId/pricing`

- **Purpose:** Room CRUD, gallery, per-day availability, and pricing
  (base, weekend, extra guest).
- **Data:** `ownerRooms`.
- **API:** `GET/POST/PATCH /owner/hotels/:hotelId/rooms[/:roomTypeId]`,
  `PATCH .../availability`, `PATCH .../pricing`.

### `/owner/bookings`, `/bookings/:bookingId`, `/bookings/upcoming`,
`/bookings/completed`, `/bookings/cancelled`

- **Purpose:** Bookings by status and a single booking detail.
- **Components:** `OwnerDataTable`, `BookingStatusBadge`,
  `PaymentStatusBadge`.
- **Data:** `ownerBookings`.
- **API:** `GET /owner/bookings`, `GET /owner/bookings/:bookingId`,
  `GET /owner/bookings?status=upcoming|completed|cancelled`.

### `/owner/reviews`, `/owner/reviews/:reviewId`

- **Purpose:** Review list and detail with reply.
- **Data:** `ownerReviews`.
- **API:** `GET /owner/reviews`, `GET /owner/reviews/:reviewId`,
  `POST /owner/reviews/:reviewId/reply`.

### `/owner/payouts`, `/owner/notifications`, `/owner/profile`,
`/owner/settings`

- **Purpose:** Payouts list and summary, notifications, owner profile,
  and settings.
- **Data:** `ownerPayouts`, `payoutSummary`, `ownerNotifications`,
  `ownerUser`.
- **API:** `GET /owner/payouts`, `GET /owner/notifications`,
  `GET /owner/profile`, `PATCH /owner/settings`.

## Admin pages

All admin pages render inside `AdminLayout` (AdminSidebar, AdminTopbar).

### `/admin/dashboard`

- **Purpose:** Platform overview.
- **Sections:** Platform stats, charts, approvals queue, activity feed.
- **Components:** `AdminStatCard`, `AdminChartCard`, `AdminDataTable`,
  `ApprovalPanel` (planned), `ActivityTimeline` (planned).
- **Data:** `adminSummary`, `monthlyRevenue`, `monthlyBookings`,
  `monthlyUsers`, `adminActivity`, `adminHotels`.
- **API:** `GET /admin/dashboard`.

### `/admin/users`, `/admin/users/:userId`

- **Purpose:** Users list and detail.
- **Components:** `AdminDataTable`, `AdminUserStatusBadge`.
- **Data:** `adminUsers`.
- **API:** `GET /admin/users`, `GET /admin/users/:userId`,
  `PATCH /admin/users/:userId/status`.

### `/admin/owners`

- **Purpose:** Owners list.
- **Components:** `AdminOwnerVerificationBadge`,
  `AdminApprovalBadge`.
- **Data:** `adminOwners`.
- **API:** `GET /admin/owners`.

### `/admin/hotels`, `/admin/hotels/:hotelId`, `/admin/hotels/pending`

- **Purpose:** All hotels, a single hotel with approval flow, and the
  pending queue.
- **Components:** `AdminDataTable`, `AdminApprovalBadge`,
  `AdminListingBadge`, `ModerationActions` (planned).
- **Data:** `adminHotels`.
- **API:** `GET /admin/hotels`, `GET /admin/hotels/:hotelId`,
  `GET /admin/hotels/pending`, `POST /admin/hotels/:hotelId/approve`,
  `POST /admin/hotels/:hotelId/reject`.

### `/admin/bookings`

- **Purpose:** Platform-wide bookings.
- **Data:** `adminBookings`.
- **API:** `GET /admin/bookings`.

### `/admin/reviews`

- **Purpose:** Review moderation.
- **Components:** `ModerationActions` (planned).
- **Data:** `adminReviews`.
- **API:** `GET /admin/reviews`, `POST /admin/reviews/:reviewId/publish`,
  `POST /admin/reviews/:reviewId/hide`.

### `/admin/offers`, `/admin/offers/new`,
`/admin/offers/:offerId/edit`

- **Purpose:** Offer list, create, edit.
- **Data:** `adminOffers`.
- **API:** `GET /admin/offers`, `POST /admin/offers`,
  `PATCH /admin/offers/:offerId`.

### `/admin/destinations`

- **Purpose:** Destinations management with page status.
- **Data:** `adminDestinations`.
- **API:** `GET /admin/destinations`, `POST /admin/destinations`,
  `PATCH /admin/destinations/:destinationId`.

### `/admin/settings`

- **Purpose:** Platform settings in tabs.
- **API:** `GET /admin/settings`, `PATCH /admin/settings`.

## Next steps

See `06-frontend-architecture.md` for how these pages compose inside the
app.