# Booking flow

This document traces a booking from search to result, and shows how the
customer, owner, and admin each see it.

## End-to-end flow

```mermaid
flowchart TD
  Search[Hotel search] --> Detail[Hotel detail page]
  Detail --> RoomSel[Room selection]
  RoomSel --> RoomDetail[Room detail page]
  RoomDetail --> Checkout[Checkout: room selection step]
  Checkout --> Guest[Checkout: guest info step]
  Guest --> Pay[Checkout: payment step]
  Pay --> Confirm[Checkout: confirmation step]
  Pay -->|payment| API[POST /bookings/checkout]
  API --> ConfirmBooking[POST /bookings]
  ConfirmBooking -->|paid| Success[/booking/success]
  ConfirmBooking -->|failed| Failed[/booking/failed]
  ConfirmBooking -->|cancel| Cancelled[/booking/cancelled]
  Success --> OwnerView[Owner sees new booking]
  Success --> AdminView[Admin sees new booking]
```

## Hotel search

The customer (or guest) uses the hero search on `/` or the filters on
`/hotels`. The frontend calls `GET /hotels` with query filters. Filters
should live in URL search params so the result is shareable.

## Hotel detail

The customer opens a hotel by slug at `/hotels/:slug`. The frontend calls
`GET /hotels/:slug` to get the hotel, its rooms, and reviews. The
`BookingSidebar` lets the customer pick dates and guests for a chosen
room.

## Room selection

The customer can open a single room at `/hotels/:slug/rooms/:roomSlug`, or
pick a room directly from the hotel page. Clicking **Reserve** sends them
to `/booking/checkout`.

## Checkout

The checkout page runs a four-step flow inside `CheckoutLayout`:

1. **Room selection** (`StepRoomSelection`): Confirm the room and dates.
   The frontend calls `GET /bookings/availability` to double-check stock.
2. **Guest info** (`StepGuestInfo`): Enter the lead guest and any special
   requests.
3. **Payment** (`StepPayment`): Pick a payment method. The frontend calls
   `POST /bookings/checkout`, which returns a price breakdown and a
   payment intent from the abstract payment provider slot.
4. **Confirmation** (`StepConfirmation`): On payment success, the frontend
   calls `POST /bookings` to create the booking record.

## Payment

The payment provider is an abstract slot today. When wired for real, the
flow is:

1. `POST /bookings/checkout` creates a payment intent and returns a client
   secret plus a `bookingDraftId` that locks availability for a short
   window.
2. The payment provider confirms the charge on the client.
3. `POST /bookings` finalizes the booking with the confirmed
   `paymentIntentId`.

## Booking success

If the payment and booking succeed, the frontend navigates to
`/booking/success`. The page shows the booking reference and a link to
`/profile/bookings/:bookingId`. The backend sends a confirmation email.

## Booking failed

If payment fails, the frontend navigates to `/booking/failed`. The page
lets the customer retry the payment or pick another room. The booking
stays in `paymentStatus: failed` and is not confirmed.

## Booking cancelled

If the customer cancels during checkout, the frontend navigates to
`/booking/cancelled`. No booking is created.

## User booking details

The customer views all bookings at `/profile/bookings`, filtered by
status: `upcoming`, `completed`, or `cancelled`. A single booking is at
`/profile/bookings/:bookingId`. The frontend calls
`GET /profile/bookings` and `GET /profile/bookings/:bookingId`.

To cancel an existing booking, the customer calls
`POST /bookings/:bookingId/cancel`. The refund amount depends on the
hotel's cancellation policy and how close the check-in date is.

## Owner booking visibility

An owner sees new bookings for their hotels in `/owner/bookings` and on
the owner dashboard. The frontend calls `GET /owner/bookings` with an
optional status filter. A single booking is at
`/owner/bookings/:bookingId`. The owner sees guest contact details and
can add internal notes, but cannot cancel a booking themselves (they
request cancellation through support, which an admin performs).

## Admin booking visibility

An admin sees all platform bookings at `/admin/bookings`. The frontend
calls `GET /admin/bookings`. An admin can cancel any booking through
`POST /bookings/:bookingId/cancel` and view an invoice at
`GET /bookings/:bookingId/invoice`.

## Availability locking

When `POST /bookings/checkout` runs, the backend should temporarily lock
the requested rooms (for example, for 10 minutes) so two customers cannot
double-book the last room. If `POST /bookings` does not arrive before the
lock expires, the rooms are released.

## Next steps

See `13-owner-dashboard-flow.md` for how owners manage the other side of
these bookings.