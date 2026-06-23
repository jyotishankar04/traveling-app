# User roles and permissions

Horizoné has four user roles. This document defines what each role can see
and do, both today (frontend prototype) and after backend integration.

## Roles

| Role | Description |
|---|---|
| **Guest** | Not signed in. Can browse public pages only. |
| **Authenticated customer** | Signed-in traveler. Can book, save, review, and manage their account. |
| **Hotel owner** | Signed-in partner who manages hotels, rooms, and bookings. |
| **Platform admin** | Signed-in staff who run the marketplace. |

A single user account has exactly one role. The role drives which routes
load and which API endpoints accept the request.

## Guest

### Accessible routes

All public routes: `/`, `/hotels`, `/hotels/:slug`, `/hotels/:slug/rooms/:roomSlug`,
`/hotels/:slug/profile`, `/destinations`, `/destinations/:slug`, `/about`,
`/contact`, `/offers`, `/offers/:offerId`, `/help`, `/help/:slug`, `/terms`,
`/privacy`, `/cancellation-policy`.

Also the auth pages: `/auth/login`, `/auth/register`, `/auth/verify`,
`/auth/forgot-password`, `/auth/reset-password`, `/onboarding`,
`/onboarding/owner`.

### Restricted routes

`/profile/*`, `/owner/*`, `/admin/*`, and `/booking/checkout` (checkout
needs a selected room, which requires login).

### Allowed actions

Browse, search, filter, view detail pages, and start the auth flow.

## Authenticated customer

### Accessible routes

All public routes, plus `/profile/*` and `/booking/*`.

### Restricted routes

`/owner/*` and `/admin/*`.

### Allowed actions

Book a room, save a hotel, leave a review, view booking history, manage
payments, and edit profile and settings.

## Hotel owner

### Accessible routes

All public routes, plus `/owner/*`. An owner can also keep a customer
profile at `/profile/*` (owners are users too).

### Restricted routes

`/admin/*` and other owners' hotel routes (an owner only sees hotels they
own).

### Allowed actions

Create and edit hotels and rooms, manage availability and pricing, view
and respond to bookings and reviews, view payouts and notifications.

## Platform admin

### Accessible routes

All public routes, plus `/admin/*`. An admin can also keep a customer
profile at `/profile/*`.

### Restricted routes

`/owner/*` (admins do not own hotels).

### Allowed actions

Approve or reject hotels, moderate reviews, manage users, owners, offers,
destinations, and platform settings, and view platform-wide analytics.

## Permissions matrix

The table below shows module-level access. **Y** means allowed, **N**
means denied, **O** means own resources only.

| Module | Guest | Customer | Owner | Admin |
|---|---|---|---|---|
| Browse public hotels | Y | Y | Y | Y |
| View destinations and offers | Y | Y | Y | Y |
| Register or log in | Y | — | — | — |
| Book a room | N | Y | Y | Y |
| Save a wishlist hotel | N | Y | Y | Y |
| Leave a review | N | Y | Y | Y |
| View own profile | N | Y | Y | Y |
| Edit own profile | N | Y | Y | Y |
| Create a hotel | N | N | Y | N |
| Edit own hotel | N | N | O | N |
| Approve or reject any hotel | N | N | N | Y |
| Manage room availability and pricing | N | N | O | N |
| View owner payouts | N | N | O | N |
| Reply to a review | N | N | O | N |
| View all users | N | N | N | Y |
| Suspend a user | N | N | N | Y |
| Moderate reviews | N | N | N | Y |
| Manage platform offers | N | N | N | Y |
| Manage destinations | N | N | N | Y |
| Edit platform settings | N | N | N | Y |
| View platform-wide bookings | N | N | N | Y |

## Future backend permissions

The backend will enforce the matrix above. Concretely:

- A **JWT auth middleware** checks that a request has a valid access token.
- A **role guard** checks that the token's role matches the route module
  (customer, owner, or admin).
- An **ownership check** in the owner service ensures an owner can only
  read or mutate hotels and rooms where `ownerId === token.userId`.
- An **admin guard** protects every `/admin/*` endpoint.

Until the backend exists, the frontend should add a `ProtectedRoute`
wrapper that redirects guests to login and blocks wrong roles from
protected layouts. See `19-refactor-plan.md`.

## Next steps

See `04-route-map.md` for the full route list mapped to these roles.