# State management

This document explains how Horizoné manages state today and how it should
manage state after backend integration.

## Current approach

Today there is no global state. The `src/context/` folder is empty, and
no stores exist. State lives in three places:

- **Local component state** for forms, modals, tabs, and toggles.
- **Inline data lookups** where each page imports mock data and filters it
  by route params.
- **Component-local search and filter state** on the hotels page.

This works for a static prototype but will not scale to live data.

## Recommended future approach

Split state into three buckets, each with the right tool.

### Auth session and role (global)

Use a small Zustand store or a Context for the auth session. This is the
only true global state. It holds:

- The current user (id, name, email, role, avatar).
- The access and refresh tokens.
- `isAuthenticated` and `isEmailVerified` flags.

The `ProtectedRoute` wrapper reads from this store. The API client reads
the access token from it on every request.

### Server data (server state)

Use TanStack Query for all data that comes from the backend. This gives
you caching, background refetching, invalidation, and loading or error
flags for free.

- `useQuery` for reads (hotels, bookings, reviews).
- `useMutation` for writes (create hotel, cancel booking, reply to
  review).
- Query keys should encode the resource and route params, for example
  `['hotels', filters]` or `['owner', 'bookings', status]`.
- Mutations call `queryClient.invalidateQueries` to refresh affected
  lists.

### URL state (shareable)

Anything the user might share or bookmark belongs in URL search params:

| State | Where |
|---|---|
| Hotel search filters | `?destination=…&type=…&page=…` |
| Sort and order | `?sort=price_asc` |
| Pagination | `?page=2&pageSize=12` |
| Bookings tab | `?status=upcoming` |
| Checkout selection (hotelId, roomTypeId, dates, guests) | `?hotelId=…&roomTypeId=…&checkIn=…&checkOut=…&guests=…` |

Use `URLSearchParams` or a hook like `useSearchParams` from react-router.
Filters read from the URL drive the TanStack Query keys.

### Local component state (UI only)

Use plain `useState` for anything that is purely visual and never shared:

- Form field values before submit.
- Modal and dialog open or closed.
- Selected tab inside a settings page.
- Hover and focus states.

### Toaster and modals

Use `sonner` for toasts (already a dependency) and shadcn dialogs for
modals. Both stay local to the component that triggers them.

## What should not be global

- Server data should not live in a global store. TanStack Query caches
  it, so a second store only causes sync bugs.
- Per-page filter state should not be global if the page owns it. Use URL
  params instead.
- Form state should not be lifted to a global store. Keep it in the form
  component.

## State by area

### Auth state

Lives in the auth store (Zustand or Context). Updated on login, register,
verify, refresh, and logout. Persisted to memory or `localStorage` so a
refresh keeps the session.

### Search and filter state

Lives in URL search params on `/hotels`. TanStack Query reads the params
and fetches. The `FilterSidebar` writes to the URL, never to a global
store.

### Wishlist state

Lives on the server. The wishlist page calls `GET /profile/wishlist`. The
hotel card heart icon uses a mutation to `POST` or `DELETE` the wishlist
item, then invalidates the wishlist query. No local wishlist array.

### Booking and checkout state

The selected room, dates, guests, and payment method live in URL params on
`/booking/checkout`. The four steps read from these params. On confirm,
the checkout calls `POST /bookings/checkout` and `POST /bookings`.

### Owner dashboard state

Stats and charts come from TanStack Query per page. Table filters (status,
search) live in URL params. Mutations (edit hotel, set availability)
invalidate the relevant queries.

### Admin table and filter state

Same as the owner dashboard. List pages use TanStack Query + URL params.
Moderation and approval actions are mutations that invalidate the list and
the dashboard.

## Server state invalidation map

After backend integration, these mutations should invalidate these queries:

| Mutation | Invalidate |
|---|---|
| Create hotel | `['owner', 'hotels']` |
| Approve or reject hotel | `['admin', 'hotels']`, `['admin', 'hotels', 'pending']`, `['admin', 'dashboard']` |
| Create or cancel booking | `['profile', 'bookings']`, `['owner', 'bookings']`, `['owner', 'dashboard']`, `['admin', 'bookings']` |
| Reply to review | `['owner', 'reviews']` |
| Publish or hide review | `['admin', 'reviews']`, [`hotels`, slug, 'reviews'] |
| Update profile | `['profile']`, `['auth', 'me']` |

## Next steps

See `16-error-loading-empty-states.md` for how loading, error, and empty
states fit into this model.