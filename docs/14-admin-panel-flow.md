# Admin panel flow

This document describes how a platform admin runs the Horizoné
marketplace. It maps each admin function to the real admin pages and the
backend endpoints behind them.

## Admin dashboard

The admin lands on `/admin/dashboard`, which shows platform totals
(users, owners, hotels, bookings, revenue), growth charts, the pending
approvals queue, and the recent activity feed. The frontend calls
`GET /admin/dashboard`.

## User management

The admin views all users at `/admin/users` (`GET /admin/users`) and a
single user at `/admin/users/:userId` (`GET /admin/users/:userId`).
From the detail page, the admin can suspend or re-verify a user with
`PATCH /admin/users/:userId/status`.

## Owner management

The admin views all owners at `/admin/owners` (`GET /admin/owners`), with
their verification and account status. Approving an owner's verification
moves their `verificationStatus` to `verified` so they can publish hotels.

## Hotel approval flow

This is the most important admin workflow, because it gates what appears
on the public site.

```mermaid
flowchart TD
  NewHotel[Owner creates hotel, status pending] --> Queue[/admin/hotels/pending]
  Queue --> Review[/admin/hotels/:id]
  Review --> Check{Completeness and risk OK?}
  Check -->|Yes| Approve[POST /admin/hotels/:id/approve]
  Check -->|No, fixable| Reject[POST /admin/hotels/:id/reject]
  Approve --> Public[Hotel appears on public site]
  Reject --> Notify[Owner notified to fix]
  Notify --> Resubmit[Owner edits and resubmits]
  Resubmit --> Queue
```

The admin reviews:

- Completeness score and the `hasImages`, `hasDescription`,
  `hasAmenities`, `hasPolicies`, `hasRooms`, `hasPricing` flags.
- Risk flags (for example, missing contact details).
- The owner's verification status.

On approve, the backend records an `AdminActivity` of type
`hotel_approved` and notifies the owner. On reject, it records the reason
and the owner sees it in their dashboard.

## Booking monitoring

The admin views all platform bookings at `/admin/bookings`
(`GET /admin/bookings`), with filters for status, payment status, hotel,
and date range. An admin can cancel any booking through
`POST /bookings/:bookingId/cancel` and view an invoice.

## Review moderation

The admin moderates reviews at `/admin/reviews` (`GET /admin/reviews`)
with a status filter for `pending`, `flagged`, `published`, and `hidden`.

- `POST /admin/reviews/:reviewId/publish` makes a pending or flagged
  review public.
- `POST /admin/reviews/:reviewId/hide` removes a review from public view,
  with a reason.

A flagged review keeps its `flagReason` for the audit trail.

## Offer creation

The admin creates and edits offers in `/admin/offers`,
`/admin/offers/new`, and `/admin/offers/:offerId/edit`. Each offer has a
discount type (`percentage` or `fixed`), type (`seasonal`, `flash`,
`welcome`, `loyalty`), start and end dates, usage limits, and a target
membership tier (`bronze`, `silver`, `gold`, `platinum`, or `all`).

Endpoints: `POST /admin/offers`, `PATCH /admin/offers/:offerId`,
`DELETE /admin/offers/:offerId`.

## Destination management

The admin manages destinations at `/admin/destinations`. Each destination
has a `pageStatus` of `published`, `draft`, or `hidden`, which controls
whether it appears on the public `/destinations` page. Endpoints:
`GET /admin/destinations`, `POST /admin/destinations`,
`PATCH /admin/destinations/:destinationId`.

## Platform settings

The admin edits platform settings at `/admin/settings` in tabs. Settings
include commission rates, feature flags, email templates, and a
maintenance mode toggle. Endpoints: `GET /admin/settings`,
`PATCH /admin/settings`.

## Activity audit

Every admin action records an `AdminActivity` entry visible in the
dashboard feed and via `GET /admin/activity`. Types include
`hotel_approved`, `hotel_rejected`, `user_suspended`, `user_verified`, and
others. This gives the platform team a full audit trail.

## Next steps

See `15-state-management.md` for how the frontend should manage state for
these flows.