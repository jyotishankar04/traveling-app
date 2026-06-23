# Refactor plan

This list tracks the problems found in the current frontend and the safe
steps to fix them. Each step is non-breaking. Steps 1 through 7 are
performed in this pass; the rest are queued for the backend integration
phase.

## Current problems found

- No 404 route, so unknown URLs render a blank page.
- No route guards, so all `/owner/*`, `/admin/*`, and `/profile/*`
  routes are reachable by guests.
- Public `:hotelId` and `:roomTypeId` params carry slugs, but owner and
  admin use real ids. The naming is misleading.
- `PropertyTypeCard` links to `/${slug}`, which points to no existing
  route.
- Duplicate `TableSkeleton`, `StatsSkeleton`, and `EmptyState` components
  across owner and admin.
- Five custom components have no importers (`PriceCard`, `RatingStars`,
  `AmenityIcon`, `FAQAccordion`, owner `LoadingSkeleton`).
- Unused assets: `hero.png`, `react.svg`, `vite.svg`.
- Layouts split across `src/layouts/` and `src/components/custom/*`.
- `LandingPage` reimplements its own navbar and footer instead of using
  `PublicLayout`.
- A stray `"use client"` directive sits in
  `pages/admin/hotels/hotel-detail-page.tsx`.
- `src/context/` is empty (signals unfinished global state plan).
- No `services/` or `types/` folder yet.
- No route constants file.

## Safe step-by-step refactor plan

The following steps are safe and non-breaking now. Do them in order.

### Phase A — Safe fixes performed in this pass

1. **Add a 404 route.** Create a `NotFoundPage` and add a catch-all
   `<Route path="*" element={<NotFoundPage />} />` in `App.tsx`.
2. **Add `app/routes.ts` route constants.** Centralize route paths so
   links and constants share one source of truth.
3. **Scaffold `ProtectedRoute`.** Add a role-aware wrapper as a
   placeholder. It currently renders children (no real auth yet) but
   documents the future hook.
4. **Fix `PropertyTypeCard` links.** Point them to `/hotels?type=${slug}`
   so they resolve to the existing hotels listing.
5. **Dedupe skeletons and `EmptyState`.** Add shared components in
   `components/custom/shared/` and re-point owner and admin imports.
6. **Remove unused files.** Delete `PriceCard`, `RatingStars`,
   `AmenityIcon`, `FAQAccordion`, owner `LoadingSkeleton`, and the three
   unused assets.
7. **Drop the stray `"use client"`** from the admin hotel detail page.

### Phase B — Structuring (during V4)

8. **Move all layouts into `src/layouts/`.** Move `OwnerLayout`,
   `AdminLayout`, `UserAccountLayout`, `AuthLayout`, and `CheckoutLayout`
   out of `components/custom/*` into `layouts/`.
9. **Create `src/types/`.** Add the shared interfaces from
   `09-data-models.md`.
10. **Create `src/services/`.** Start with `api-client.ts` and stub
    service files that still read from mock data, so pages can switch to
    services without a rewrite.
11. **Group public pages** into `pages/public/`.
12. **Move `PageHeader`** to `components/common/` and collapse the owner
    and admin page-header variants into it.

### Phase C — Route cleanup (during V4)

13. **Rename public params** from `:hotelId` to `:slug` and `:roomTypeId`
    to `:roomSlug` for clarity. Update the page lookups and links to
    match.
14. **Reconcile route paths** with the spec target. Move `/onboarding` to
    `/auth/onboarding` and `/onboarding/owner` to
    `/auth/owner-onboarding`. Move `/booking/checkout` to
    `/checkout/:hotelId/:roomTypeId`. Do this during backend integration
    so redirect rules can be added in one place.
15. **Wrap protected route groups** with `ProtectedRoute` once auth
    exists. Owner routes get the `owner` guard; admin routes get the
    `admin` guard; customer routes get the `customer` guard.

### Phase D — Data layer (during V4)

16. **Replace direct mock imports** with service calls backed by TanStack
    Query. Each page swaps `import { hotels }` for a `useHotels()` hook.
17. **Delete mock data** once services serve real data.
18. **Add Zod schemas** for all forms and request payloads.

## Components to extract

- `AvailabilityCalendar` from the inline room-availability page.
- `PricingForm` from the inline room-pricing page.
- `AmenitySelector` from the inline amenities page.
- `PolicyEditor` from the inline policies page.
- `GalleryManager` from the inline gallery pages.
- `ApprovalPanel` and `ModerationActions` from the admin pages.
- `PaymentHistoryTable` and `NotificationItem` from the customer pages.
- `PaymentMethodSelector` from `StepPayment`.
- `BookingStatePage` to unify the success, failed, and cancelled pages.

## Data files to centralize

- Move all mock data under a single `src/data/` with a barrel export until
  services replace it.
- Keep the `owner/` and `admin/` subfolders.

## Routes to fix

- Add the 404 catch-all.
- Fix `PropertyTypeCard` links.
- Reconcile `/onboarding` and `/booking/checkout` to the spec paths in
  Phase C.

## Dead code to remove

- The five unused custom components.
- The three unused assets.
- The stray `"use client"`.

## Files to rename

- `pages/profile/*` -> `pages/customer/*` for clarity (during Phase B).
- `UserAccountLayout` -> `CustomerLayout`.

## Risk areas

- Renaming route params touches many page lookups and link generators. Do
  it in Phase C with a full build run.
- Deduping skeletons requires updating every importer; a missed import
  breaks the build, so run `tsc -b` after each change.
- Moving layouts can break `App.tsx` imports. Update imports in the same
  step.

## Testing checklist

After each phase:

- Run `pnpm lint`.
- Run `pnpm tsc -b` (the project uses `noUnusedLocals` and
  `noUnusedParameters`).
- Run `pnpm build`.
- Manually click through each route group to confirm nothing blank-pages.

## Next steps

See `20-backend-integration-plan.md` for the service layer design that the
refactor unlocks.