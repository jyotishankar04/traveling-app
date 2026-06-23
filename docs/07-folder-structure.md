# Folder structure

This document shows the current frontend folder structure and the
recommended target. The goal is a layout that scales to backend
integration without rewriting pages.

## Current structure

The frontend lives in `frontend/src`. Today it looks like this:

```txt
src/
  App.tsx
  main.tsx
  index.css
  assets/            # hero.png, react.svg, vite.svg (mostly unused)
  components/
    HelpCard.tsx     # one stray component at the root
    ui/              # 57 shadcn primitives
    custom/
      admin/         # 10 admin components
      auth/          # 5 auth components
      booking/       # 7 checkout components
      landing/       # navbar, hero-section, hero-search
      owner/         # 12 owner components
      shared/        # 20 shared components
      user/          # UserAccountLayout, AccountSidebar
  context/           # empty
  data/              # mock data (top-level + owner/ + admin/)
  hooks/             # only use-mobile.ts
  layouts/           # only PublicLayout.tsx
  lib/               # only utils.ts (cn helper)
  pages/
    (16 root public pages)
    auth/            # 7 pages
    booking/         # 4 pages
    profile/         # 9 customer pages
    owner/           # 28 pages across subfolders
    admin/           # 14 pages across subfolders
```

## Problems with the current structure

- **Layouts are split.** `PublicLayout` is in `layouts/`, but
  `OwnerLayout`, `AdminLayout`, `UserAccountLayout`, `AuthLayout`, and
  `CheckoutLayout` are in `components/custom/*`. They should live together.
- **`context/` is empty.** It signals an unfinished plan for global state.
- **`lib/` has only `cn`.** Route constants, formatters, and constants are
  missing.
- **`assets/` holds unused files** (`hero.png`, `react.svg`, `vite.svg`).
- **One stray component** (`HelpCard.tsx`) sits at the `components/` root
  instead of in a feature folder.
- **No `services/` or `types/` folders.** Backend integration needs both.
- **Public pages are not grouped.** Sixteen page files sit at the `pages/`
  root rather than in `pages/public/`.
- **Mock data is not centralized into typed modules.** Data is spread
  across 23 files with no shared `types/` to reuse.

## Recommended structure

```txt
src/
  app/
    router.tsx        # route declarations, moved out of App.tsx
    providers.tsx     # BrowserRouter, future AuthProvider, QueryClientProvider
  assets/
    images/
  components/
    ui/               # shadcn primitives (unchanged)
    common/           # cross-cutting: PageHeader, EmptyState, skeletons, StatusBadge
    public/           # PublicNavbar, PublicFooter, HeroSearchCard, HotelCard, DestinationCard, OfferCard, ReviewCard
    auth/             # AuthLayout, AuthFormCard, OTPInputGroup, SocialAuthButtons, TrustStrip
    customer/         # CustomerLayout, AccountSidebar, BookingCard, WishlistHotelCard, PaymentHistoryTable, NotificationItem
    booking/          # CheckoutStepper, BookingSummaryCard, PriceBreakdownCard, PaymentMethodSelector
    owner/            # OwnerLayout, OwnerSidebar, OwnerStatCard, OwnerDataTable, AvailabilityCalendar, PricingForm
    admin/            # AdminLayout, AdminSidebar, AdminDataTable, ApprovalPanel, ModerationActions
  data/               # mock data (kept until services replace it)
    hotels.ts
    rooms.ts
    destinations.ts
    offers.ts
    users.ts
    bookings.ts
    reviews.ts
    payments.ts
    notifications.ts
    owner.ts
    admin.ts
  hooks/
    use-mobile.ts
    use-toast.ts
  layouts/
    PublicLayout.tsx
    AuthLayout.tsx
    CustomerLayout.tsx
    OwnerLayout.tsx
    AdminLayout.tsx
  lib/
    utils.ts          # cn helper
    routes.ts         # route path constants
    constants.ts      # app-wide constants
    formatters.ts     # currency, date, number formatters
  pages/
    public/
    auth/
    customer/
    booking/
    owner/
    admin/
  services/
    api/
    api-client.ts
    auth.service.ts
    hotels.service.ts
    bookings.service.ts
    users.service.ts
    owner.service.ts
    admin.service.ts
  types/
    hotel.ts
    booking.ts
    user.ts
    owner.ts
    admin.ts
    api.ts
  styles/
    globals.css       # moved from src/index.css
  main.tsx
  App.tsx
```

## Why this structure is better

- **Routes are centralized.** `app/router.tsx` and `lib/routes.ts` keep
  paths in one place, so links and navigation do not drift.
- **Layouts live together.** Every layout sits in `layouts/`, which matches
  its responsibility.
- **Components are grouped by domain.** A developer working on the owner
  dashboard finds everything under `components/owner/` and `pages/owner/`.
- **Types are shared.** `types/` holds the entities that both pages and
  services use, so the mock data and the future API responses share shapes.
- **Services are isolated.** `services/` is the only place that talks to
  the backend. Swapping mocks for real APIs touches only this layer.
- **Public pages are grouped.** `pages/public/` keeps the root clean.

## What goes where

| Layer | Rule |
|---|---|
| `pages/` | Route-level components only. No business logic, no direct data fetching after the refactor. |
| `components/` | Presentational and small interactive pieces. No route awareness beyond links. |
| `layouts/` | Chrome wrappers that render an `<Outlet />`. |
| `hooks/` | Reusable stateful logic. |
| `lib/` | Pure helpers and constants, no React. |
| `data/` | Mock data, removed once services are live. |
| `services/` | The only layer that calls the backend. |
| `types/` | Shared TypeScript types and Zod schemas. |

## What does not belong in pages

- Direct imports of mock data after backend integration (move to services).
- Complex business rules (move to a service or hook).
- Layout chrome (use a layout).
- Shared types (live in `types/`).

## Naming conventions

- **Files:** `kebab-case.tsx` for components and pages,
  `kebab-case.ts` for data, hooks, services, and types.
- **Components:** PascalCase named exports (`export function HotelCard`).
- **Hooks:** `use-thing.ts` exporting `useThing`.
- **Services:** `thing.service.ts` exporting `ThingService` functions.
- **Types:** one default interface per file where possible, named in
  PascalCase.
- **Routes:** keep `kebab-case` path segments and use constants from
  `lib/routes.ts`.

## Next steps

See `08-component-architecture.md` for the full component inventory, and
`19-refactor-plan.md` for the step-by-step move plan.