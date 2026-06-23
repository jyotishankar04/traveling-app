# Component architecture

This document lists every reusable component in Horizoné, grouped by
area. For each component you get the responsibility, props, the pages that
use it, reusability notes, and the current status: **existing**,
**missing**, **duplicate**, or **should refactor**.

The app has 57 shadcn/ui primitives in `components/ui/`. Those are standard
and are not listed here. This document covers the custom components in
`components/custom/` and the additional components the refactor should add.

## Common components

These are cross-cutting components that should live in
`components/common/` after the refactor.

| Component | Responsibility | Key props | Used by | Status |
|---|---|---|---|---|
| `PageHeader` | Page title, subtitle, and action slot | `title`, `subtitle`, `action` | Dashboards | Missing (owner/admin have their own `OwnerPageHeader`/`AdminPageHeader`) |
| `SectionHeader` | Section title, subtitle, "view all" link | `title`, `subtitle`, `to` | Public pages | Existing (`shared/`) |
| `EmptyState` | Icon, title, description, action | `icon`, `title`, `description`, `action` | Dashboards | Duplicate (owner and admin each have one) |
| `NotFoundState` | Inline "not found" card with back-home button | — | Detail pages | Existing (`shared/`) |
| `TableSkeleton` | Loading rows for tables | `rows`, `columns` | Dashboards | Duplicate (owner and admin each have one) |
| `StatsSkeleton` | Loading stat cards | `count` | Dashboards | Duplicate (owner and admin each have one) |
| `StatusBadge` | Generic status pill | `status`, `variant` | Tables | Missing (today there are many specific badges) |
| `RatingStars` | Star plus numeric rating pill | `rating`, `size` | Cards, detail | Existing but unused (`shared/RatingStars.tsx`) |
| `ImageUploadCard` | Image tile with remove and add buttons | `image`, `onRemove` | Owner galleries | Missing |

## Public components

These live (or should live) in `components/public/`.

| Component | Responsibility | Key props | Used by | Status |
|---|---|---|---|---|
| `PublicNavbar` | Fixed pill top nav | — | Public layout | Existing (`landing/navbar.tsx`) |
| `PublicFooter` | Dark footer with links and newsletter | — | Public layout | Existing (`shared/PublicFooter.tsx`) |
| `HeroSearchCard` | Destination, dates, guests search | — | Landing | Existing (`landing/hero-search.tsx`) |
| `HotelCard` | Grid hotel card | `hotel` | Listing, landing, destination | Existing (`shared/HotelCard.tsx`) |
| `HotelListCard` | Horizontal hotel card with image carousel | `hotel` | Listing | Existing (`shared/HotelListCard.tsx`) |
| `DestinationCard` | Destination card | `destination` | Destinations, landing | Existing (`shared/DestinationCard.tsx`) |
| `PropertyTypeCard` | Property type shortcut | `item` | Landing | Existing but link broken (`shared/PropertyTypeCard.tsx`) |
| `OfferCard` | Promotional offer card | `offer` | Landing, offers, destination | Existing (`shared/OfferCard.tsx`) |
| `ReviewCard` | Guest review card | `review` | Hotel detail, room detail | Existing (`shared/ReviewCard.tsx`) |
| `RoomOptionCard` | Room row with reserve button | `room` | Hotel detail | Existing (`shared/RoomOptionCard.tsx`) |
| `GalleryGrid` | One main plus three thumbnail images | `images` | Hotel detail, profile | Existing (`shared/GalleryGrid.tsx`) |
| `MapPreview` | Static map placeholder | `coordinates` | Detail pages | Existing (`shared/MapPreview.tsx`) |
| `BookingSidebar` | Sticky date, guest, price, reserve widget | `hotel`, `room` | Hotel and room detail | Existing (`shared/BookingSidebar.tsx`) |
| `FilterSidebar` | Hotel filters | `values`, `onChange` | Hotels listing | Existing (`shared/FilterSidebar.tsx`) |

## Auth components

These live in `components/auth/` and render inside `AuthLayout`.

| Component | Responsibility | Key props | Status |
|---|---|---|---|
| `AuthLayout` | Split-screen photo plus form | `imageKey`, `children` | Existing |
| `OnboardingStepper` | Numbered step indicator | `steps`, `current` | Existing |
| `OTPInputGroup` | Six-digit OTP input | — | Existing |
| `SocialAuthButtons` | Google plus divider | — | Existing |
| `TrustStrip` | Trust badges row | — | Existing |

## Customer components

| Component | Responsibility | Key props | Status |
|---|---|---|---|
| `CustomerLayout` | Account shell with sidebar | — | Existing as `UserAccountLayout` |
| `AccountSidebar` | Profile navigation | `active` | Existing |
| `StatsCard` | Big value plus label card | `label`, `value` | Existing (`shared/`) |
| `BookingCard` | Booking row card | `booking` | Existing (inline in pages) |
| `WishlistHotelCard` | Saved hotel card | `hotel` | Reuses `HotelCard` |
| `PaymentHistoryTable` | Payments table | `payments` | Missing (rendered inline) |
| `NotificationItem` | Notification row | `notification` | Missing (rendered inline) |

## Booking components

These live in `components/booking/`.

| Component | Responsibility | Key props | Status |
|---|---|---|---|
| `CheckoutLayout` | Checkout shell with stepper and footer buttons | `children`, `onBack`, `onContinue` | Existing |
| `CheckoutStepper` | Four-step progress | `current` | Existing |
| `BookingSummaryPanel` | Right-rail hotel summary | `hotel`, `room` | Existing |
| `StepRoomSelection` | Pick a room | `hotelId` | Existing |
| `StepGuestInfo` | Contact details and requests | — | Existing |
| `StepPayment` | Payment method radio list | — | Existing |
| `StepConfirmation` | Final summary | — | Existing |
| `PriceBreakdownCard` | Price summary with CTA | `price`, `nights` | Existing as `PriceCard` (unused) |
| `PaymentMethodSelector` | Payment radio group | — | Missing (inline in `StepPayment`) |
| `BookingStatePage` | Generic success/failed/cancelled screen | `state` | Missing (three separate pages exist) |

## Owner components

These live in `components/owner/`.

| Component | Responsibility | Status |
|---|---|---|
| `OwnerLayout` | Sidebar plus topbar shell | Existing |
| `OwnerSidebar` | Owner navigation with per-hotel sub-links | Existing |
| `OwnerTopbar` | Search, notifications bell, profile | Existing |
| `OwnerPageHeader` | Title, subtitle, action slot | Existing |
| `OwnerStatCard` | Stat with change percent and icon | Existing |
| `OwnerChartCard` | Chart container | Existing |
| `OwnerDataTable` | Table wrapper with header row | Existing |
| `OwnerStatusBadges` | `HotelStatusBadge`, `BookingStatusBadge`, `PaymentStatusBadge` | Existing |
| `BarChart` | Simple CSS bar chart | Existing |
| `EmptyState` | Owner empty state | Existing (duplicate) |
| `DataSkeletons` | `TableSkeleton`, `StatsSkeleton`, `ReviewCardSkeleton` | Existing |
| `LoadingSkeleton` | List placeholder | Existing but unused |
| `AvailabilityCalendar` | Per-day availability grid | Missing (rendered inline) |
| `PricingForm` | Base, weekend, extra guest pricing form | Missing (rendered inline) |
| `AmenitySelector` | Categorized amenity picker | Missing (rendered inline) |
| `PolicyEditor` | Sectioned policy editor | Missing (rendered inline) |
| `GalleryManager` | Image upload and reorder | Missing (rendered inline) |

## Admin components

These live in `components/admin/`.

| Component | Responsibility | Status |
|---|---|---|
| `AdminLayout` | Sidebar plus topbar shell | Existing |
| `AdminSidebar` | Admin navigation | Existing |
| `AdminTopbar` | Search, notifications, profile dropdown | Existing |
| `AdminPageHeader` | Title, subtitle, action slot | Existing |
| `AdminStatCard` | Stat with trend indicator | Existing |
| `AdminChartCard` | Chart container | Existing |
| `AdminDataTable` | Table wrapper | Existing |
| `AdminStatusBadges` | User, owner, approval, listing, review badges | Existing |
| `EmptyState` | Admin empty state | Existing (duplicate) |
| `LoadingSkeleton` | `TableSkeleton`, `StatsSkeleton` | Existing |
| `ApprovalPanel` | Approve or reject a hotel with notes | Missing (rendered inline) |
| `ModerationActions` | Publish or hide a review | Missing (rendered inline) |
| `AdminNotesCard` | Internal admin notes | Missing |
| `ActivityTimeline` | Platform activity feed | Missing (rendered inline) |

## Duplicates to consolidate

The refactor should move these into `components/common/` so owner and
admin share one copy:

- `EmptyState` (owner and admin variants differ only by default icon).
- `TableSkeleton` and `StatsSkeleton` (identical in both).
- `OwnerPageHeader` / `AdminPageHeader` (collapse into `PageHeader`).

## Components to remove

These are defined but have no importers (verified):

- `components/custom/shared/PriceCard.tsx`
- `components/custom/shared/RatingStars.tsx`
- `components/custom/shared/AmenityIcon.tsx`
- `components/custom/shared/FAQAccordion.tsx`
- `components/custom/owner/LoadingSkeleton.tsx`

## Next steps

See `19-refactor-plan.md` for the order to extract, consolidate, and
remove these components.