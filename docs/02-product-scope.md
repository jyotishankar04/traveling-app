# Product scope

This document defines what Horizoné is and is not, so the team stays
aligned on what to build. It separates the product vision from the current
prototype scope.

## Vision

Become the cleanest marketplace for booking premium hotel stays, with a full
toolkit for hotel owners and a control center for the platform team.

## In scope (current prototype)

The frontend today covers a complete clickable prototype of the whole
marketplace. Each of the following is built as real, navigable pages with
mock data:

- Public discovery: homepage hero search, hotel listing with filters,
  hotel detail, room detail, hotel profile, destinations, destination
  detail, offers listing, offer detail, about, contact, help center, help
  articles, and three legal pages (terms, privacy, cancellation policy).
- Auth surface: login, register, email verification with OTP, forgot
  password, reset password, customer onboarding, and owner onboarding.
- Customer account: profile dashboard, edit profile, bookings list,
  booking detail, wishlist, reviews, payments, settings, notifications.
- Booking: a four-step checkout plus success, failed, and cancelled result
  pages.
- Owner platform: dashboard, analytics, calendar, hotels CRUD, rooms CRUD,
  room availability and pricing, bookings list and detail, reviews and
  review reply, payouts, notifications, profile, settings.
- Admin platform: dashboard, users, owners, hotels approval queue,
  bookings, review moderation, offers CRUD, destinations, settings.

## Out of scope (not built yet)

The following are intentionally left for the backend phases and are not in
the current prototype:

- Real authentication sessions and token refresh.
- Real payment processing and refunds.
- Image upload to a storage provider.
- Email sending for verification, reset, and notifications.
- Live availability and pricing from a server.
- Internationalization beyond static English copy.
- SEO server rendering or prerendering.
- Automated testing.
- Real-time notifications (websockets or push).

## Target users (summary)

See `03-user-roles-and-permissions.md` for the full role breakdown. In
short, Horizoné serves four user groups: guests, customers, hotel owners,
and platform admins.

## Success criteria

The frontend is considered backend-ready when:

1. A developer can run the app against a real API by swapping the
   `src/services` mocks for live calls, with no page rewrites.
2. Every protected route rejects guests and enforces roles.
3. The booking flow can create a real booking and show the right result
   page.
4. Owners can create a hotel, add rooms, and see them flow to admin approval.
5. Admins can approve a hotel and see it appear on the public site.

## Versioned roadmap (summary)

See `18-versioning-and-modules.md` for the full plan. The short version:

| Version | Focus |
|---|---|
| V0 | Static UI foundation (where the app is now) |
| V1 | Customer booking MVP with real data |
| V2 | Owner platform with real data |
| V3 | Admin platform with real data |
| V4 | Backend integration (API, auth, uploads) |
| V5 | Production hardening (tests, SEO, monitoring) |

## Next steps

Continue to `03-user-roles-and-permissions.md` for the permissions model.