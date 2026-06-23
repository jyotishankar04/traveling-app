# Requirements

This document lists every functional and non-functional requirement that
the frontend implies. Each one is extracted from real pages, routes, and
mock data in the codebase.

## Functional requirements

### Public browsing

- The homepage shows a hero search, property type shortcuts, trending
  hotels, and featured offers.
- A guest can open the hotel listing page and toggle between grid and list
  views.
- A guest can page through hotel results.

### Hotel search

- A guest can search by destination, check-in and check-out dates, and
  guest count from the hero search.
- The hotel listing page can filter by price range, star rating, guest
  rating, property type, and amenities.
- The hotel listing page can sort results and reflect filters in the URL.

### Hotel details

- A guest can view a hotel by slug, including a gallery, a description,
  available rooms, reviews, amenities, policies, and a location map.
- A guest can reserve a room from the hotel detail page, which sends them
  to checkout.

### Room details

- A guest can view a room type by hotel slug and room slug, including an
  image carousel, amenities, reviews, a date and guest picker, and a
  booking sidebar.

### Hotel profile

- A guest can open a hotel profile page with hero stats, amenities, rooms,
  reviews, location, house rules, and contact details.

### Destination browsing

- A guest can browse all destinations and filter by region.
- A guest can open a destination by slug to see why to visit, top hotels,
  and a location map.

### Auth

- A customer can register with email and password.
- A customer can log in with email and password.
- A customer can verify their email with a six-digit OTP.
- A customer can request a password reset link by email.
- A customer can set a new password from a reset link.
- Social login buttons exist on login and register pages (mock today).

### User onboarding

- A new customer can complete a multi-step onboarding that collects
  profile, interests, destinations, and notification preferences.

### Owner onboarding

- A new owner can complete a multi-step onboarding that collects business
  and verification details.

### Customer profile

- A customer can view an account dashboard with stats and recent bookings.
- A customer can edit their profile, address, and preferences.
- A customer can manage notification settings.

### Wishlist

- A customer can view saved stays and remove a saved hotel.
- A customer can save a hotel from the hotel card or detail page.

### Bookings

- A customer can view their bookings grouped by status (upcoming,
  completed, cancelled).
- A customer can open a single booking detail.

### Reviews

- A customer can view their past reviews.
- A customer can see which completed stays still need a review.

### Payments

- A customer can view a payment history table linked to bookings.

### Checkout

- A customer can complete a four-step checkout: room selection, guest
  info, payment method, and confirmation.
- The checkout shows a live price breakdown and a sticky booking summary.

### Booking result states

- A booking can resolve to a success, failed, or cancelled result page.

### Owner hotel management

- An owner can view a list of their hotels with status and revenue.
- An owner can create a new hotel.
- An owner can edit hotel basics, contact, description, and settings.
- An owner can manage a hotel image gallery.
- An owner can manage hotel amenities by category.
- An owner can manage hotel policies by section.

### Owner room management

- An owner can list room types for a hotel.
- An owner can create and edit a room type.
- An owner can manage a room image gallery.
- An owner can manage per-day room availability on a calendar.
- An owner can manage room pricing, including weekend and extra guest
  rates.

### Owner bookings

- An owner can view all bookings, plus upcoming, completed, and cancelled
  tabs.
- An owner can open a booking detail with guest info and internal notes.

### Owner reviews

- An owner can view guest reviews by status.
- An owner can reply to a review.

### Owner payouts

- An owner can view a payout summary and a list of past payouts.

### Owner notifications

- An owner can view actionable notifications.

### Admin users

- An admin can view a list of users and their status.
- An admin can open a single user detail.

### Admin owners

- An admin can view a list of hotel owners with verification and account
  status.

### Admin hotels

- An admin can view all platform hotels.
- An admin can open a single hotel with approval status, completeness, and
  risk flags.
- An admin can view a pending approval queue.

### Admin bookings

- An admin can view platform-wide bookings.

### Admin reviews

- An admin can moderate reviews (publish, hide, flagged review handling).

### Admin offers

- An admin can list, create, and edit promotional offers.

### Admin destinations

- An admin can manage destinations and their page status.

### Admin settings

- An admin can edit platform settings.

## Non-functional requirements

## Responsive design

- Every public and dashboard page works from mobile to desktop.
- The owner and admin dashboards use a mobile drawer for navigation.

## Accessibility

- Pages use semantic headings, lists, and tables.
- Interactive controls use shadcn/ui primitives that ship with ARIA roles.

## Performance

- The build uses Vite with Tree-shaking and code splitting via dynamic
  route components.

## Maintainability

- The codebase separates pages, layouts, components, mock data, and utils.

## Reusable components

- Shared cards, status badges, skeletons, and empty states are reused
  across pages.

## Type safety

- The project compiles with `noUnusedLocals` and `noUnusedParameters`
  enabled.

## Backend readiness

- Mock data shapes map cleanly to future API responses (see
  `09-data-models.md` and `10-api-contracts.md`).

## Clean folder structure

- See `07-folder-structure.md` for the current structure and the
  recommended target.

## Error handling

- Detail pages show an inline `NotFoundState` when an item is missing.
- See `16-error-loading-empty-states.md` for the full strategy.

## Loading states

- Dashboard pages use `TableSkeleton` and `StatsSkeleton` placeholders.

## Empty states

- Owner and admin pages use an `EmptyState` component with an icon, title,
  description, and action.

## Next steps

See `04-route-map.md` for how these requirements map to real routes.