# Error, loading, and empty states

This document defines how Horizoné handles loading, empty, and error
states across pages, so the experience stays consistent after backend
integration.

## Loading states

### Page loading skeleton

Each list page shows a skeleton layout that matches the real layout's
structure. This stops the page from jumping when data arrives.

- Hotels listing: a grid of `HotelCard` skeletons (image block, two text
  lines, price block).
- Dashboard pages: `StatsSkeleton` for the stat row, then
  `TableSkeleton` for the table.

### Card skeleton

A card skeleton is a `HotelCard` with a shimmering image block and gray
text bars. It has the same dimensions as the real card.

### Table skeleton

`TableSkeleton` renders `rows` placeholder rows with shimmering cells.
The dashboard uses it while waiting for `GET /owner/bookings` or
`GET /admin/bookings`. The owner and admin versions are identical today
and should be consolidated into `components/common/`.

### Stats skeleton

`StatsSkeleton` renders `count` placeholder stat cards. Used at the top of
dashboards while stats load.

### Form submission loading

On submit, the primary button shows a spinner and disables. Other inputs
become read-only. This applies to checkout, hotel edit, offer create, and
auth forms.

### Inline availability check

When the booking sidebar checks availability, the reserve button shows a
small spinner and the price readout shows a pulsing placeholder until the
result returns.

## Empty states

Every list page has an empty state component with:

- An icon that matches the area (for example, a bed for bookings).
- A short title.
- A one-line description.
- A primary action.

| Page | Empty message | Action |
|---|---|---|
| `/profile/bookings` | "You have no bookings yet." | "Browse hotels" -> `/hotels` |
| `/profile/wishlist` | "No saved stays yet." | "Find a hotel" -> `/hotels` |
| `/profile/reviews` | "You have not reviewed a stay yet." | "View bookings" -> `/profile/bookings` |
| `/owner/hotels` | "You have not added any hotels." | "Add your first hotel" -> `/owner/hotels/new` |
| `/owner/bookings` | "No bookings in this view." | "View all bookings" -> `/owner/bookings` |
| `/owner/reviews` | "No reviews yet." | (none) |
| `/owner/payouts` | "No payouts yet." | (none) |
| `/admin/hotels/pending` | "No hotels waiting for approval." | (none) |

## Error states

### Inline not found

Detail pages show the `NotFoundState` component when a record is missing.
It has a title, a short message, and a "Back to home" button. Used on
hotel detail, room detail, booking detail, and offer detail.

### Query error banner

When a TanStack Query returns `isError`, the page shows an inline error
banner with the message and a "Try again" button that calls `refetch`.

### Mutation error toast

Failed mutations show a toast via `sonner` with the error message and the
`error.code`. The form stays mounted so the user can fix and retry.

### Access denied page

When a user opens a route their role does not allow, the protected route
redirects to `/403`. The access-denied page explains they cannot view the
page and links back to their home.

## Not found page behavior

The router needs a catch-all `<Route path="*" element={<NotFound />} />`.
The NotFound page shows a friendly message and a link back to `/`. Today
this route is missing, so unknown URLs render a blank page. This is the
highest priority fix in `19-refactor-plan.md`.

## API error handling strategy

The API client (`src/services/api-client.ts`) centralizes error handling:

1. On a 401 response, attempt a token refresh once. If refresh fails, clear
   the auth session and redirect to `/auth/login`.
2. On a 403, show an "access denied" toast and let the page handle it.
3. On a 404, let the page render `NotFoundState` (the query returns
   `null` and the page checks for it).
4. On a 422 or 400 validation error, surface the `field` and message in
   the form.
5. On a 5xx, show a generic "something went wrong" toast and offer retry.

All errors map to the typed `ApiError` shape from `09-data-models.md` so
the frontend can switch on `error.code`.

## Next steps

See `17-ui-design-system.md` for the visual rules behind these states.