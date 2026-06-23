# Route map

This document lists every route in the Horizoné frontend. It reflects the
**actual** code in `src/App.tsx` today. The "Target route" column notes
where the original spec planned a different path; those changes are
collected in `19-refactor-plan.md`.

The app uses `react-router` v8 with a `<BrowserRouter>` in `main.tsx` and
nested `<Route>` elements in `App.tsx`. There are **no route guards** in
the current code, so the "Role" column below describes the intended role,
not an enforced one.

## Public routes

| Route path | Page component | Layout | Role | Params | Query params | Main data | Primary actions | Future API endpoint | Mock source |
|---|---|---|---|---|---|---|---|---|---|
| `/` | `landing-page` | none (own navbar + inline footer) | Guest | — | — | `hotels`, `destinations`, `offers`, `propertyTypes` | Search, browse property types, view featured | `GET /hotels`, `GET /destinations`, `GET /offers` | `data/hotels.ts` etc. |
| `/hotels` | `hotels-page` | `PublicLayout` | Guest | — | `destination`, `type`, `checkIn`, `checkOut`, `guests` | `hotels`, `rooms` | Filter, sort, toggle grid/list, paginate | `GET /hotels` | `data/hotels.ts` |
| `/hotels/:hotelId` | `hotel-detail-page` | `PublicLayout` | Guest | `hotelId` is a **slug** | — | `hotels` (by slug), `rooms`, `reviews` | View rooms, reserve a room | `GET /hotels/:slug` | `data/hotels.ts` |
| `/hotels/:hotelId/rooms/:roomTypeId` | `room-detail-page` | `PublicLayout` | Guest | both are **slugs** | — | `hotels` (by slug), `rooms` (by slug), `reviews` | Pick dates, reserve | `GET /hotels/:slug/rooms/:roomSlug` | `data/rooms.ts` |
| `/hotels/:hotelId/profile` | `hotel-profile-page` | `PublicLayout` | Guest | `hotelId` is a **slug** | — | `hotels` (by slug), `rooms`, `reviews` | View hotel profile | `GET /hotels/:slug/profile` | `data/hotels.ts` |
| `/destinations` | `destinations-page` | `PublicLayout` | Guest | — | `region` | `destinations` | Browse, filter by region | `GET /destinations` | `data/destinations.ts` |
| `/destinations/:slug` | `destination-detail-page` | `PublicLayout` | Guest | `slug` (slug) | — | `destinations` (by slug), `hotels` | View destination, browse hotels | `GET /destinations/:slug` | `data/destinations.ts` |
| `/about` | `about-page` | `PublicLayout` | Guest | — | — | static | Read about | — | — |
| `/contact` | `contact-page` | `PublicLayout` | Guest | — | — | static | Submit contact form | `POST /contact` | — |
| `/offers` | `offers-page` | `PublicLayout` | Guest | — | — | `offers`, `publicOffers` | Browse offers | `GET /offers` | `data/offers.ts`, `data/public-offers.ts` |
| `/offers/:offerId` | `offer-detail-page` | `PublicLayout` | Guest | `offerId` (id) | — | `publicOffers` (by id) | View offer, book | `GET /offers/:id` | `data/public-offers.ts` |
| `/help` | `help-page` | `PublicLayout` | Guest | — | `q` | `helpArticles` | Search help, open article | `GET /help` | `data/help-articles.ts` |
| `/help/:slug` | `help-article-page` | `PublicLayout` | Guest | `slug` | — | `helpArticles` (by slug) | Read article, see related | `GET /help/:slug` | `data/help-articles.ts` |
| `/terms` | `terms-page` | `PublicLayout` | Guest | — | — | static | Read terms | — | — |
| `/privacy` | `privacy-page` | `PublicLayout` | Guest | — | — | static | Read privacy | — | — |
| `/cancellation-policy` | `cancellation-policy-page` | `PublicLayout` | Guest | — | — | static | Read policy | — | — |

## Auth routes

These pages render inside an `AuthLayout` component (split-screen) that the
page itself mounts, so they have no shared route layout.

| Route path | Page component | Layout | Role | Target route (if different) | Future API endpoint |
|---|---|---|---|---|---|
| `/auth/login` | `auth/login-page` | `AuthLayout` | Guest | — | `POST /auth/login` |
| `/auth/register` | `auth/register-page` | `AuthLayout` | Guest | — | `POST /auth/register` |
| `/auth/verify` | `auth/verify-page` | `AuthLayout` | Guest | — | `POST /auth/verify-email` |
| `/auth/forgot-password` | `auth/forgot-password-page` | `AuthLayout` | Guest | — | `POST /auth/forgot-password` |
| `/auth/reset-password` | `auth/reset-password-page` | `AuthLayout` | Guest | — | `POST /auth/reset-password` |
| `/onboarding` | `auth/onboarding-page` | `AuthLayout` | Customer | `/auth/onboarding` | `POST /auth/onboarding` |
| `/onboarding/owner` | `auth/owner-onboarding-page` | `AuthLayout` | Owner | `/auth/owner-onboarding` | `POST /auth/owner-onboarding` |

## Customer routes

| Route path | Page component | Layout | Role | Params | Future API endpoint |
|---|---|---|---|---|---|
| `/profile` | `profile/profile-page` | `UserAccountLayout` | Customer | — | `GET /profile` |
| `/profile/edit` | `profile/edit-profile-page` | `UserAccountLayout` | Customer | — | `PATCH /profile` |
| `/profile/bookings` | `profile/bookings-page` | `UserAccountLayout` | Customer | — | `GET /profile/bookings` |
| `/profile/bookings/:bookingId` | `profile/booking-detail-page` | `UserAccountLayout` | Customer | `bookingId` | `GET /profile/bookings/:bookingId` |
| `/profile/wishlist` | `profile/wishlist-page` | `UserAccountLayout` | Customer | — | `GET /profile/wishlist` |
| `/profile/reviews` | `profile/reviews-page` | `UserAccountLayout` | Customer | — | `GET /profile/reviews` |
| `/profile/payments` | `profile/payments-page` | `UserAccountLayout` | Customer | — | `GET /profile/payments` |
| `/profile/settings` | `profile/settings-page` | `UserAccountLayout` | Customer | — | `PATCH /profile/settings` |
| `/profile/notifications` | `profile/notifications-page` | `UserAccountLayout` | Customer | — | `GET /profile/notifications` |

## Booking routes

These are standalone routes with no layout; `checkout-page` mounts
`CheckoutLayout` internally.

| Route path | Page component | Layout | Role | Params | Target route (if different) | Future API endpoint |
|---|---|---|---|---|---|---|
| `/booking/checkout` | `booking/checkout-page` | `CheckoutLayout` | Customer | — | `/checkout/:hotelId/:roomTypeId` | `POST /bookings/checkout`, `POST /bookings` |
| `/booking/success` | `booking/booking-success-page` | none | Customer | — | `/booking/success` | — |
| `/booking/failed` | `booking/booking-failed-page` | none | Customer | — | `/booking/failed` | — |
| `/booking/cancelled` | `booking/booking-cancelled-page` | none | Customer | — | `/booking/cancelled` | — |

## Owner routes

All owner routes render inside `OwnerLayout` (OwnerSidebar + OwnerTopbar).

| Route path | Page component | Params | Future API endpoint |
|---|---|---|---|
| `/owner/dashboard` | `owner/dashboard/dashboard-page` | — | `GET /owner/dashboard` |
| `/owner/analytics` | `owner/analytics/analytics-page` | — | `GET /owner/analytics` |
| `/owner/calendar` | `owner/calendar/calendar-page` | — | `GET /owner/calendar` |
| `/owner/hotels` | `owner/hotels/hotels-list-page` | — | `GET /owner/hotels` |
| `/owner/hotels/new` | `owner/hotels/new-hotel-page` | — | `POST /owner/hotels` |
| `/owner/hotels/:hotelId` | `owner/hotels/hotel-detail-page` | `hotelId` (id) | `GET /owner/hotels/:hotelId` |
| `/owner/hotels/:hotelId/edit` | `owner/hotels/edit-hotel-page` | `hotelId` | `PATCH /owner/hotels/:hotelId` |
| `/owner/hotels/:hotelId/gallery` | `owner/hotels/gallery-page` | `hotelId` | `PATCH /owner/hotels/:hotelId` |
| `/owner/hotels/:hotelId/amenities` | `owner/hotels/amenities-page` | `hotelId` | `PATCH /owner/hotels/:hotelId/amenities` |
| `/owner/hotels/:hotelId/policies` | `owner/hotels/policies-page` | `hotelId` | `PATCH /owner/hotels/:hotelId/policies` |
| `/owner/hotels/:hotelId/rooms` | `owner/rooms/rooms-list-page` | `hotelId` | `GET /owner/hotels/:hotelId/rooms` |
| `/owner/hotels/:hotelId/rooms/new` | `owner/rooms/new-room-page` | `hotelId` | `POST /owner/hotels/:hotelId/rooms` |
| `/owner/hotels/:hotelId/rooms/:roomTypeId` | `owner/rooms/room-detail-page` | both | `GET /owner/hotels/:hotelId/rooms/:roomTypeId` |
| `/owner/hotels/:hotelId/rooms/:roomTypeId/edit` | `owner/rooms/edit-room-page` | both | `PATCH /owner/.../rooms/:roomTypeId` |
| `/owner/hotels/:hotelId/rooms/:roomTypeId/gallery` | `owner/rooms/room-gallery-page` | `roomTypeId` | `PATCH /owner/.../rooms/:roomTypeId` |
| `/owner/hotels/:hotelId/rooms/:roomTypeId/availability` | `owner/rooms/room-availability-page` | `roomTypeId` | `PATCH /owner/.../rooms/:roomTypeId/availability` |
| `/owner/hotels/:hotelId/rooms/:roomTypeId/pricing` | `owner/rooms/room-pricing-page` | both | `PATCH /owner/.../rooms/:roomTypeId/pricing` |
| `/owner/bookings` | `owner/bookings/bookings-list-page` | — | `GET /owner/bookings` |
| `/owner/bookings/:bookingId` | `owner/bookings/booking-detail-page` | `bookingId` | `GET /owner/bookings/:bookingId` |
| `/owner/bookings/upcoming` | `owner/bookings/upcoming-bookings-page` | — | `GET /owner/bookings?status=upcoming` |
| `/owner/bookings/completed` | `owner/bookings/completed-bookings-page` | — | `GET /owner/bookings?status=completed` |
| `/owner/bookings/cancelled` | `owner/bookings/cancelled-bookings-page` | — | `GET /owner/bookings?status=cancelled` |
| `/owner/reviews` | `owner/reviews/reviews-list-page` | — | `GET /owner/reviews` |
| `/owner/reviews/:reviewId` | `owner/reviews/review-detail-page` | `reviewId` | `GET /owner/reviews/:reviewId`, `POST /owner/reviews/:reviewId/reply` |
| `/owner/profile` | `owner/profile/owner-profile-page` | — | `GET /owner/profile` |
| `/owner/settings` | `owner/settings/owner-settings-page` | — | `PATCH /owner/settings` |
| `/owner/payouts` | `owner/payouts/payouts-page` | — | `GET /owner/payouts` |
| `/owner/notifications` | `owner/notifications/owner-notifications-page` | — | `GET /owner/notifications` |

## Admin routes

All admin routes render inside `AdminLayout` (AdminSidebar + AdminTopbar).

| Route path | Page component | Params | Future API endpoint |
|---|---|---|---|
| `/admin/dashboard` | `admin/dashboard/dashboard-page` | — | `GET /admin/dashboard` |
| `/admin/users` | `admin/users/users-list-page` | — | `GET /admin/users` |
| `/admin/users/:userId` | `admin/users/user-detail-page` | `userId` | `GET /admin/users/:userId`, `PATCH /admin/users/:userId/status` |
| `/admin/owners` | `admin/owners/owners-list-page` | — | `GET /admin/owners` |
| `/admin/hotels` | `admin/hotels/hotels-list-page` | — | `GET /admin/hotels` |
| `/admin/hotels/:hotelId` | `admin/hotels/hotel-detail-page` | `hotelId` | `GET /admin/hotels/:hotelId`, `POST /admin/hotels/:hotelId/approve\|reject` |
| `/admin/hotels/pending` | `admin/hotels/pending-hotels-page` | — | `GET /admin/hotels/pending` |
| `/admin/bookings` | `admin/bookings/bookings-list-page` | — | `GET /admin/bookings` |
| `/admin/reviews` | `admin/reviews/reviews-list-page` | — | `GET /admin/reviews`, `POST /admin/reviews/:reviewId/publish\|hide` |
| `/admin/offers` | `admin/offers/offers-list-page` | — | `GET /admin/offers` |
| `/admin/offers/new` | `admin/offers/new-offer-page` | — | `POST /admin/offers` |
| `/admin/offers/:offerId/edit` | `admin/offers/edit-offer-page` | `offerId` | `PATCH /admin/offers/:offerId` |
| `/admin/destinations` | `admin/destinations/destinations-list-page` | — | `GET /admin/destinations`, `POST /admin/destinations` |
| `/admin/settings` | `admin/settings/settings-page` | — | `GET /admin/settings`, `PATCH /admin/settings` |

## Notes and issues

These issues are tracked in `19-refactor-plan.md`:

- **No 404 route.** A catch-all `<Route path="*" element={<NotFound />} />`
  must be added.
- **Public params are mislabeled.** `:hotelId` and `:roomTypeId` on public
  routes carry slugs, not ids. The refactor plan suggests renaming them to
  `:slug` / `:roomSlug` for clarity.
- **No route guards.** Every `/owner/*`, `/admin/*`, and `/profile/*` route
  is reachable by a guest. Add a `ProtectedRoute` wrapper per role.
- **`/admin/hotels/pending` ordering.** It is declared after
  `/admin/hotels/:hotelId`. React Router v8 ranks static segments higher, so
  it resolves correctly today, but it is a latent risk.

## Next steps

See `05-page-specifications.md` for what each page renders.