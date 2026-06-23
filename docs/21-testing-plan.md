# Testing plan

This document lists the testing strategy for Horizoné across unit,
component, route, form, service, end-to-end, accessibility, visual
regression, and manual QA. No tests exist today; this plan defines what
to add.

## Unit tests

Test pure functions and utilities in isolation.

| Target | Tool | What to test |
|---|---|---|
| `lib/utils.ts` (`cn`) | Vitest | Class merge output |
| `lib/formatters.ts` (future) | Vitest | Currency, date, number format |
| `lib/routes.ts` (future) | Vitest | Route constant values |
| `services/*` mocks | Vitest + msw | Request building and response parsing |
| Zod schemas | Vitest | Valid and invalid payloads |

## Component tests

Test reusable components with React Testing Library.

| Component | What to test |
|---|---|
| `HotelCard` | Renders fields, link uses slug, wishlist button fires callback |
| `FilterSidebar` | Filters update and reset |
| `BookingSidebar` | Date and guest pickers update state |
| `CheckoutStepper` | Highlights the current step |
| `StatusBadge` variants | Maps each status to the right variant |
| `EmptyState` | Renders icon, title, description, and action |
| `NotFoundState` | Renders message and back-home link |
| `OwnerDataTable` | Renders rows from props |

## Route tests

Test the router setup in isolation with a memory router.

- All public routes render without crashing.
- Unknown route renders the NotFound page.
- `ProtectedRoute` redirects guests to login.
- `ProtectedRoute` blocks wrong roles from protected layouts.
- Dynamic param pages handle a missing record with `NotFoundState`.

## Form tests

Test forms with `react-hook-form` + Zod once added.

| Form | What to test |
|---|---|
| Login | Invalid email, wrong password, success navigates |
| Register | Password mismatch, duplicate email, success |
| Reset password | Token required, password strength, success |
| Checkout guest info | Required fields, validation |
| New hotel | Required fields, amenity and image arrays |
| New offer | Discount type, dates, usage limits |

## API service tests

Test the service layer with `msw` to mock the backend.

- `apiClient` attaches the access token.
- `apiClient` refreshes once on 401 and retries.
- `apiClient` clears the session on a failed refresh.
- Each service sends the right method and path.
- Services unwrap the `ApiResponse` envelope and throw `ApiError` on
  failure.

## End-to-end tests

Use Playwright for the critical paths.

| Flow | Steps |
|---|---|
| Search a hotel | Home -> `/hotels` with filters -> open a hotel |
| Book a room | Hotel detail -> checkout all four steps -> success |
| Customer cancel booking | `/profile/bookings` -> cancel -> result |
| Owner create hotel | `/owner/hotels/new` -> submit -> appears in list |
| Admin approve hotel | `/admin/hotels/pending` -> approve -> public site |
| Review moderation | `/admin/reviews` -> hide -> disappears on hotel page |

## Accessibility tests

- Run axe-core on every page in the E2E suite.
- Check keyboard navigation on the checkout, filters, and tables.
- Verify color contrast on status badges and toasts.
- Verify focus order in the owner and admin drawerson mobile.

## Visual regression checklist

Use a tool like Chromatic or Playwright snapshots.

| Surface | Check |
|---|---|
| Landing hero | Layout and hero search on mobile and desktop |
| Hotels grid and list toggle | Both layouts |
| Hotel and room detail | Gallery, sidebar, sticky behavior |
| Owner dashboard | Stat row, chart, table |
| Admin dashboard | Stat row, charts, approvals queue |
| Auth pages | Split-screen layout on mobile and desktop |
| 404 and access-denied pages | Full render |

## Manual QA checklist

Walk through each area by hand before a release.

- Public: search, filter, sort, paginate, open detail pages, use the
  booking sidebar.
- Auth: register, verify, log in, forgot and reset, logout, onboarding,
  owner onboarding.
- Customer: profile, edit profile, bookings and detail, wishlist, reviews,
  payments, settings, notifications.
- Booking: all four checkout steps, success, failed, cancelled.
- Owner: dashboard, analytics, calendar, hotel CRUD, room CRUD,
  availability, pricing, bookings, review reply, payouts, notifications.
- Admin: dashboard, users, owners, hotel approval, bookings, review
  moderation, offers CRUD, destinations, settings.
- Responsive: every dashboard at mobile, tablet, and desktop widths.
- 404: an unknown URL shows the NotFound page.
- Access denied: a wrong-role attempt redirects safely.

## Tooling

- **Vitest** for unit and component tests.
- **React Testing Library** for component tests.
- **msw** for service-layer mocking.
- **Playwright** for end-to-end and visual regression.
- **axe-core** for accessibility.

Add `pnpm test`, `pnpm test:e2e`, and `pnpm test:a11y` scripts.

## Next steps

See `22-deployment-plan.md` for shipping the tested app.