# Versioning and modules

This document breaks Horizoné into versions and modules so the team can
ship in stages. It also defines a backend-style architecture for the
future server.

## Version plan

### V0 — Static UI foundation (current state)

- Public pages (homepage, search, hotel and room detail, destinations,
  offers, help, legal pages).
- Auth static pages (login, register, verify, forgot and reset, onboarding,
  owner onboarding).
- Mock data in `src/data/`.
- Basic routing with layouts.

### V1 — Customer booking MVP

- Hotel search backed by real data.
- Hotel and room detail backed by real data.
- Checkout flow with a real payment provider slot.
- Customer profile, bookings, wishlist, reviews, payments.
- Protected routes and sessions for customers.

### V2 — Owner platform

- Owner dashboard, analytics, and calendar.
- Hotel and room management.
- Availability and pricing.
- Owner bookings, reviews, payouts, notifications.
- Owner onboarding and verification.

### V3 — Admin platform

- Admin dashboard with real analytics.
- User and owner management.
- Hotel approval queue.
- Review moderation.
- Offers and destinations CRUD.
- Platform settings.

### V4 — Backend integration

- API service layer in `src/services/`.
- Auth tokens and refresh.
- Protected and role-guarded routes.
- TanStack Query for server state.
- File uploads to the blob store slot.
- Real email via the mail service slot.

### V5 — Production hardening

- Unit, component, and end-to-end testing.
- Performance tuning and code splitting.
- Accessibility audit.
- SEO basics (meta tags, prerendering).
- Error monitoring.
- Deployment pipeline.

## Modules

Each module groups routes, pages, components, services, data models, and
business rules.

### Public module

- **Routes:** `/`, `/hotels`, `/hotels/:slug`,
  `/hotels/:slug/rooms/:roomSlug`, `/hotels/:slug/profile`,
  `/destinations`, `/destinations/:slug`, `/offers`, `/offers/:id`,
  `/help`, `/help/:slug`, legal pages.
- **Pages:** in `pages/` (root) today, moving to `pages/public/`.
- **Components:** `components/public/`.
- **Services:** `hotels.service.ts`, `destinations.service.ts`,
  `offers.service.ts`, `help.service.ts`.
- **Data models:** `Hotel`, `RoomType`, `Destination`, `Offer`,
  `HelpArticle`, `PropertyType`.

### Auth module

- **Routes:** `/auth/*`, `/onboarding`, `/onboarding/owner`.
- **Pages:** `pages/auth/`.
- **Forms:** login, register, verify, reset, onboarding.
- **Component:** `components/auth/`.
- **Services:** `auth.service.ts`.
- **Guards:** `ProtectedRoute`, role redirect logic.
- **Data models:** `User`, `OwnerProfile`.

### Customer module

- **Routes:** `/profile/*`, `/booking/*`.
- **Sub-areas:** profile, bookings, wishlist, reviews, payments, settings,
  notifications, checkout.
- **Component:** `components/customer/`, `components/booking/`.
- **Services:** `profile.service.ts`, `bookings.service.ts`.
- **Data models:** `CustomerProfile`, `Booking`, `Payment`, `Review`,
  `Notification`, `WishlistItem`.

### Booking module

- **Routes:** `/booking/checkout`, `/booking/success`, `/booking/failed`,
  `/booking/cancelled`.
- **Pages:** `pages/booking/`.
- **Component:** `components/booking/`.
- **Services:** `bookings.service.ts` (checkout, create, cancel,
  invoice, availability).
- **Data models:** `Booking`, `Payment`, price breakdown.

### Owner module

- **Routes:** `/owner/*`.
- **Sub-areas:** dashboard, analytics, calendar, hotels, rooms, bookings,
  reviews, payouts, notifications, profile, settings.
- **Component:** `components/owner/`.
- **Services:** `owner.service.ts`.
- **Data models:** `OwnerProfile`, `OwnerHotel`, `OwnerRoom`,
  `OwnerBooking`, `OwnerReview`, `OwnerPayout`, `OwnerNotification`,
  `CalendarEvent`, analytics types.

### Admin module

- **Routes:** `/admin/*`.
- **Sub-areas:** dashboard, users, owners, hotels, bookings, reviews,
  offers, destinations, settings.
- **Component:** `components/admin/`.
- **Services:** `admin.service.ts`.
- **Data models:** `AdminUser`, `AdminOwner`, `AdminHotel`,
  `AdminBooking`, `AdminReview`, `AdminOffer`, `AdminDestination`,
  `AdminActivity`, `AdminAnalytics`.

## Frontend recommended module structure

As a first step, the frontend groups services by module:

```txt
src/
  modules/
    auth/
      auth.routes.ts
      auth.service.ts
      auth.types.ts
      auth.schemas.ts
    hotels/
      hotels.routes.ts
      hotels.service.ts
      hotels.types.ts
      hotels.schemas.ts
    bookings/
      bookings.routes.ts
      bookings.service.ts
      bookings.types.ts
      bookings.schemas.ts
    owner/
      owner.routes.ts
      owner.service.ts
      owner.types.ts
      owner.schemas.ts
    admin/
      admin.routes.ts
      admin.service.ts
      admin.types.ts
      admin.schemas.ts
```

## Future backend architecture

The backend mirrors the frontend modules and adds the
route-controller-service-repository layers.

```txt
server/
  src/
    modules/
      auth/
        auth.routes.ts
        auth.controller.ts
        auth.service.ts
        auth.repository.ts
        auth.schema.ts
        auth.types.ts
      users/
        users.routes.ts
        users.controller.ts
        users.service.ts
        users.repository.ts
        users.schema.ts
        users.types.ts
      hotels/
        hotels.routes.ts
        hotels.controller.ts
        hotels.service.ts
        hotels.repository.ts
        hotels.schema.ts
        hotels.types.ts
      rooms/
        rooms.routes.ts
        rooms.controller.ts
        rooms.service.ts
        rooms.repository.ts
        rooms.schema.ts
        rooms.types.ts
      bookings/
        bookings.routes.ts
        bookings.controller.ts
        bookings.service.ts
        bookings.repository.ts
        bookings.schema.ts
        bookings.types.ts
      reviews/
        reviews.routes.ts
        reviews.controller.ts
        reviews.service.ts
        reviews.repository.ts
        reviews.schema.ts
        reviews.types.ts
      payments/
        payments.routes.ts
        payments.controller.ts
        payments.service.ts
        payments.repository.ts
        payments.schema.ts
        payments.types.ts
      owner/
        owner.routes.ts
        owner.controller.ts
        owner.service.ts
        owner.repository.ts
        owner.schema.ts
        owner.types.ts
      admin/
        admin.routes.ts
        admin.controller.ts
        admin.service.ts
        admin.repository.ts
        admin.schema.ts
        admin.types.ts
```

## Layer responsibilities

### Routes

Define HTTP endpoints, attach middleware (auth, role, validation), and
call the controller. No business logic.

### Controller

Read request params, body, and query, call the service, and return the
HTTP response. No business logic.

### Service

Hold the business logic, enforce rules, coordinate repositories, and
handle workflows (for example, approve a hotel, settle a payout).

### Repository

Database access only. Prisma queries live here. No business logic, no HTTP
awareness.

### Schema

Zod validation schemas used by the route layer to validate input before it
reaches the controller.

### Types

Shared TypeScript types used across the module and by the frontend
service layer.

## Next steps

See `19-refactor-plan.md` for the safe steps to reach this structure, and
`20-backend-integration-plan.md` for the service layer details.