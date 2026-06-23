# Data models

This document defines the TypeScript entities and matching Prisma models
for the Horizoné backend. Every interface here is derived from the real
mock data in `frontend/src/data/`, so the frontend and backend share the
same shapes.

The backend stack is Node.js + Express + Prisma + PostgreSQL.

## Conventions

- ID columns are `String` with `@default(cuid())` unless noted.
- Slugs are unique strings used in public URLs.
- All money values are stored as `Decimal` in the database and exposed as
  `number` in the API. The API client converts for the frontend.
- Timestamps use `DateTime` and are exposed as ISO-8601 strings.
- Enum names are PascalCase in Prisma; the API sends the lower-case value
  the frontend already uses.
- Optional frontend fields (the `?` ones) map to nullable Prisma fields.

## Enums

The frontend uses several different "status" unions. Keep them separate to
avoid forcing unrelated values into one enum.

```prisma
enum UserRole {
  guest
  customer
  owner
  admin
}

enum MembershipTier {
  bronze
  silver
  gold
  platinum
}

enum HotelStatus {
  active
  inactive
  draft
}

enum HotelApprovalStatus {
  approved
  pending
  rejected
}

enum ListingStatus {
  active
  inactive
}

enum RoomStatus {
  active
  inactive
}

enum BookingStatus {
  confirmed
  upcoming
  completed
  cancelled
  failed
}

enum PaymentStatus {
  paid
  pending
  refunded
  failed
}

enum PayoutStatus {
  paid
  pending
  processing
  failed
}

enum ReviewStatus {
  published
  pending
  flagged
  hidden
}

enum VerificationStatus {
  verified
  pending
  rejected
}

enum AccountStatus {
  active
  suspended
  unverified
}

enum OfferType {
  seasonal
  flash
  welcome
  loyalty
}

enum DiscountType {
  percentage
  fixed
}

enum OfferStatus {
  active
  scheduled
  expired
  draft
}

enum OfferTier {
  bronze
  silver
  gold
  platinum
  all
}

enum PageStatus {
  published
  draft
  hidden
}

enum CalendarEventType {
  check_in
  check_out
  confirmed
  cancelled
  maintenance
}

enum NotificationType {
  booking
  promotion
  account
  system
  payment
  review
  availability
  payout
}

enum OwnerNotificationType {
  booking
  payment
  review
  availability
  payout
  system
}

enum AdminActivityType {
  account_created
  booking_made
  review_posted
  payment_completed
  hotel_approved
  hotel_rejected
  user_suspended
  user_verified
}

enum TravelType {
  solo
  couple
  family
  business
}
```

## User and accounts

### `User`

The base account. The `role` field decides which dashboard the user can
reach.

```ts
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isEmailVerified: boolean;
  nationality: string;
  language: string;
  dateOfBirth: string;
  gender: string;
  membershipTier: MembershipTier;
  rewardPoints: number;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model User {
  id              String        @id @default(cuid())
  email           String        @unique
  passwordHash    String
  name            String
  phone           String?
  avatar          String?
  role            UserRole      @default(customer)
  isEmailVerified Boolean       @default(false)
  nationality     String?
  language        String?
  dateOfBirth    String?
  gender          String?
  membershipTier  MembershipTier @default(bronze)
  rewardPoints    Int           @default(0)
  status          AccountStatus @default(unverified)

  customerProfile CustomerProfile?
  ownerProfile    OwnerProfile?
  bookings        Booking[]
  reviews         Review[]
  wishlist        WishlistItem[]
  notifications   Notification[]
  payments        Payment[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}
```

### `CustomerProfile`

Extended customer-only fields (preferences, address, trip stats).

```ts
export interface CustomerProfile {
  id: string;
  userId: string;
  preferences: UserPreferences;
  address: Address;
  tripsCompleted: number;
  upcomingTrips: number;
  savedStays: number;
}

export interface UserPreferences {
  currency: string;
  timezone: string;
  language: string;
  emailUpdates: boolean;
  marketingEmails: boolean;
  smsNotifications: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
```

In Prisma, store `preferences` and `address` as `Json` for flexibility, or
flatten the fields. The flattened option follows.

```prisma
model CustomerProfile {
  id               String   @id @default(cuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id])

  currency         String   @default("USD")
  timezone         String?
  language         String?
  emailUpdates     Boolean  @default(true)
  marketingEmails  Boolean  @default(false)
  smsNotifications Boolean  @default(true)

  street           String?
  city             String?
  state            String?
  zip              String?
  country          String?

  tripsCompleted   Int      @default(0)
  upcomingTrips    Int      @default(0)
  savedStays       Int      @default(0)
}
```

### `OwnerProfile`

Owner business and verification data, derived from `OwnerUser`.

```ts
export interface OwnerProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  registrationNumber: string;
  country: string;
  address: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  accountStatus: AccountStatus;
  joinedDate: string;
}

export interface AdminUser {
  id: string;
  userId: string;
  permissions: string[];
}
```

```prisma
model OwnerProfile {
  id                   String              @id @default(cuid())
  userId               String              @unique
  user                 User                @relation(fields: [userId], references: [id])
  businessName         String
  businessType         String?
  registrationNumber   String?
  country              String?
  address              String?
  verified             Boolean             @default(false)
  verificationStatus   VerificationStatus  @default(pending)
  accountStatus        AccountStatus       @default(active)
  hotels               Hotel[]
  payouts              Payout[]
  joinedDate           DateTime            @default(now())
}
```

## Hotels and rooms

### `Hotel`

Mirrors `Hotel` from `data/hotels.ts`, plus owner and approval fields
from `AdminHotel` and `OwnerHotel`.

```ts
export interface Hotel {
  id: string;
  slug: string;
  ownerId: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  city: string;
  country: string;
  propertyType: string;
  starRating: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  amenities: string[];
  status: HotelStatus;
  approvalStatus: HotelApprovalStatus;
  listingStatus: ListingStatus;
  freeCancellation: boolean;
  bestSeller: boolean;
  featured: boolean;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model Hotel {
  id                 String              @id @default(cuid())
  slug               String              @unique
  owner              OwnerProfile        @relation(fields: [ownerId], references: [id])
  ownerId            String
  name               String
  description        String?
  shortDescription   String?
  location           String
  city               String
  country            String
  propertyType       String
  starRating         Int                 @default(0)
  rating             Float               @default(0)
  reviewCount        Int                 @default(0)
  pricePerNight      Decimal             @db.Decimal(12, 2)
  currency           String              @default("USD")
  lat                Float?
  lng                Float?
  images             String[]
  amenities          String[]
  status             HotelStatus         @default(draft)
  approvalStatus     HotelApprovalStatus @default(pending)
  listingStatus      ListingStatus       @default(inactive)
  freeCancellation   Boolean             @default(false)
  bestSeller         Boolean             @default(false)
  featured           Boolean             @default(false)
  checkInTime        String?
  checkOutTime       String?
  cancellationPolicy String?
  contactEmail       String?
  contactPhone       String?
  website            String?
  riskFlags          String[]            @default([])

  roomTypes          RoomType[]
  reviews            Review[]
  offers             Offer[]
  bookings           Booking[]

  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  @@index([ownerId])
  @@index([approvalStatus])
  @@index([city])
  @@index([propertyType])
}
```

### `RoomType`

Mirrors `RoomType` plus the owner-specified `OwnerRoom` pricing fields.

```ts
export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  weekendPrice: number;
  extraGuestPrice: number;
  currency: string;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  size: string;
  view: string;
  images: string[];
  amenities: string[];
  available: boolean;
  totalUnits: number;
  availableUnits: number;
  remainingRooms: number;
  cancellationPolicy: string;
  boardBasis: string;
  status: RoomStatus;
  bookedThisMonth: number;
  occupancy: number;
  revenueThisMonth: number;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model RoomType {
  id                 String      @id @default(cuid())
  hotel              Hotel       @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  hotelId            String
  name               String
  slug               String      @unique
  description        String?
  shortDescription   String?
  pricePerNight      Decimal     @db.Decimal(12, 2)
  weekendPrice      Decimal     @db.Decimal(12, 2)
  extraGuestPrice   Decimal     @db.Decimal(12, 2)
  currency           String      @default("USD")
  maxGuests          Int
  maxAdults          Int          @default(2)
  maxChildren        Int          @default(0)
  bedType            String
  size               String?
  view               String?
  images             String[]
  amenities          String[]
  cancellationPolicy String?
  boardBasis         String?
  status             RoomStatus  @default(active)
  totalUnits         Int
  availableUnits     Int
  bookedThisMonth    Int         @default(0)
  occupancy          Float       @default(0)
  revenueThisMonth   Decimal     @db.Decimal(12, 2) @default(0)

  availability       RoomAvailability[]
  bookings           Booking[]

  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt

  @@index([hotelId])
}
```

### `RoomAvailability`

Per-day availability, needed for the owner availability calendar. This
table does not exist in the mock data but is implied by the availability
and pricing pages.

```prisma
model RoomAvailability {
  id          String   @id @default(cuid())
  roomType    RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)
  roomTypeId  String
  date        DateTime @db.Date
  availableUnits Int
  price       Decimal  @db.Decimal(12, 2)
  isWeekend   Boolean  @default(false)
  isBlocked   Boolean  @default(false)

  @@unique([roomTypeId, date])
  @@index([roomTypeId, date])
}
```

## Destinations

### `Destination`

Mirrors `Destination`.

```ts
export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  shortDescription: string;
  image: string;
  propertyCount: number;
  bestTimeToVisit: string;
  currency: string;
  language: string;
  timeZone: string;
  rating: number;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  pageStatus: PageStatus;
  whyVisit: string;
  travelTips: string;
  popularHotels: string[];
  offersCount: number;
  lastUpdated: string;
}
```

```prisma
model Destination {
  id              String      @id @default(cuid())
  slug            String      @unique
  name            String
  country         String
  region          String?
  description     String?
  shortDescription String?
  image           String?
  propertyCount   Int         @default(0)
  bestTimeToVisit String?
  currency        String?
  language        String?
  timeZone        String?
  rating          Float       @default(0)
  lat             Float?
  lng             Float?
  featured        Boolean     @default(false)
  pageStatus      PageStatus  @default(published)
  whyVisit        String?
  travelTips      String?
  popularHotels   String[]    @default([])
  offersCount     Int         @default(0)
  lastUpdated     DateTime    @default(now())
}
```

## Offers

### `Offer`

Mirrors `PublicOffer` plus the admin `AdminOffer` fields.

```ts
export interface Offer {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  discount: number;
  discountType: DiscountType;
  badge: string;
  type: OfferType;
  destination: string;
  hotelNames: string[];
  image: string;
  gallery: string[];
  startDate: string;
  endDate: string;
  terms: string[];
  featured: boolean;
  cta: string;
  ctaLink: string;
  status: OfferStatus;
  usageCount: number;
  usageLimit: number;
  minBookingAmount: number;
  maxDiscount: number;
  membershipTier: OfferTier;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model Offer {
  id              String       @id @default(cuid())
  slug            String       @unique
  title           String
  tagline         String?
  description     String?
  longDescription String?
  discount        Float
  discountType    DiscountType @default(percentage)
  badge           String?
  type            OfferType
  destination     String?
  hotelNames      String[]     @default([])
  image           String?
  gallery         String[]     @default([])
  startDate       DateTime
  endDate         DateTime
  terms           String[]     @default([])
  featured        Boolean       @default(false)
  cta             String?
  ctaLink         String?
  status          OfferStatus   @default(draft)
  usageCount      Int           @default(0)
  usageLimit      Int           @default(0)
  minBookingAmount Decimal      @db.Decimal(12, 2) @default(0)
  maxDiscount     Decimal       @db.Decimal(12, 2) @default(0)
  membershipTier  OfferTier     @default(all)

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([status])
  @@index([featured])
}
```

## Bookings and payments

### `Booking`

Combines the customer `Booking`, owner `OwnerBooking`, and admin
`AdminBooking` shapes. One table serves all three views.

```ts
export interface Booking {
  id: string;
  bookingId: string;       // human-readable, like HZB-2026-001
  customerId: string;
  customerName: string;
  hotelId: string;
  hotelName: string;
  hotelSlug: string;
  hotelImage: string;
  ownerId: string;
  ownerName: string;
  roomTypeId: string;
  roomType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  totalPaid: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  transactionId: string;
  source: string;
  specialRequests: string;
  internalNotes: string;
  paidOn: string;
  bookingDate: string;
  cancelledOn?: string;
  refundStatus?: string;
  cancellationReason?: string;
  reviewRating?: number;
  reviewComment?: string;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model Booking {
  id                 String        @id @default(cuid())
  bookingId          String        @unique
  customer           User          @relation(fields: [customerId], references: [id])
  customerId         String
  hotel              Hotel         @relation(fields: [hotelId], references: [id])
  hotelId            String
  roomType           RoomType      @relation(fields: [roomTypeId], references: [id])
  roomTypeId         String
  checkIn            DateTime
  checkOut           DateTime
  nights             Int
  rooms              Int
  guests             Int
  totalPaid          Decimal       @db.Decimal(12, 2)
  currency           String        @default("USD")
  status             BookingStatus @default(upcoming)
  paymentStatus      PaymentStatus @default(pending)
  paymentMethod      String?
  transactionId      String?
  source             String?
  specialRequests    String?
  internalNotes      String?
  cancelledOn        DateTime?
  refundStatus       String?
  cancellationReason String?
  reviewRating       Int?
  reviewComment      String?

  payment            Payment?

  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  @@index([customerId])
  @@index([hotelId])
  @@index([roomTypeId])
  @@index([status])
}
```

### `Payment`

Mirrors `Payment`.

```ts
export interface Payment {
  id: string;
  bookingId: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
}
```

```prisma
model Payment {
  id          String        @id @default(cuid())
  booking     Booking       @relation(fields: [bookingId], references: [id])
  bookingId   String        @unique
  user        User          @relation(fields: [userId], references: [id])
  userId      String
  date        DateTime
  description String?
  amount      Decimal       @db.Decimal(12, 2)
  currency    String        @default("USD")
  status      PaymentStatus @default(pending)
  method      String?
}
```

### `Payout`

Mirrors `OwnerPayout`.

```ts
export interface Payout {
  id: string;
  payoutId: string;
  ownerId: string;
  date: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  method: string;
  bookingCount: number;
  fees: number;
  netAmount: number;
}
```

```prisma
model Payout {
  id           String       @id @default(cuid())
  payoutId     String       @unique
  owner        OwnerProfile @relation(fields: [ownerId], references: [id])
  ownerId      String
  date         DateTime
  periodStart  DateTime
  periodEnd    DateTime
  amount       Decimal      @db.Decimal(12, 2)
  currency     String       @default("USD")
  status       PayoutStatus @default(pending)
  method       String?
  bookingCount Int          @default(0)
  fees         Decimal      @db.Decimal(12, 2) @default(0)
  netAmount    Decimal      @db.Decimal(12, 2) @default(0)
}
```

## Reviews

### `Review`

Combines `Review`, `UserReview`, `OwnerReview`, and `AdminReview`.

```ts
export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  roomTypeId: string;
  roomType: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userCountry: string;
  rating: number;
  title: string;
  comment: string;
  travelType: TravelType;
  stayDuration: string;
  date: string;
  status: ReviewStatus;
  flagReason?: string;
  reply?: string;
  replyDate?: string;
  images: string[];
  photosCount: number;
  cleanliness: number;
  staff: number;
  comfort: number;
  location: number;
  value: number;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}
```

```prisma
model Review {
  id          String       @id @default(cuid())
  hotel       Hotel        @relation(fields: [hotelId], references: [id])
  hotelId     String
  roomType    RoomType?    @relation(fields: [roomTypeId], references: [id])
  roomTypeId  String?
  user        User         @relation(fields: [userId], references: [id])
  userId      String
  owner       OwnerProfile @relation(fields: [ownerId], references: [id])
  ownerId     String
  rating      Int
  title       String
  comment     String
  travelType  TravelType?
  stayDuration String?
  status      ReviewStatus @default(pending)
  flagReason  String?
  reply       String?
  replyDate   DateTime?
  images      String[]     @default([])
  cleanliness Int?
  staff       Int?
  comfort     Int?
  location    Int?
  value       Int?

  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([hotelId])
  @@index([userId])
  @@index([status])
}
```

## Wishlist

The frontend `WishlistItem` stores `hotelId`. The backend adds `userId`.

```prisma
model WishlistItem {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  hotel     Hotel    @relation(fields: [hotelId], references: [id])
  hotelId   String
  addedAt   DateTime @default(now())

  @@unique([userId, hotelId])
}
```

## Notifications

Admin and owner notification types differ, so keep two enums. The
frontend `NotificationItem` is the customer type.

```ts
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  actionable?: boolean;
  actionLabel?: string;
  actionLink?: string;
}
```

```prisma
model Notification {
  id          String           @id @default(cuid())
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  type        NotificationType
  title       String
  message     String
  unread      Boolean          @default(true)
  actionable  Boolean          @default(false)
  actionLabel String?
  actionLink  String?
  createdAt   DateTime         @default(now())

  @@index([userId, unread])
}
```

## Amenities and policies

The frontend represents amenities as strings and policies as sectioned
form fields. The backend can keep amenity definitions in a lookup table and
store policy sections as JSON on the hotel.

```prisma
model Amenity {
  id       String @id @default(cuid())
  label    String
  slug     String @unique
  icon     String?
  category String
}
```

```ts
export interface AmenityCategory {
  id: string;
  name: string;
  amenities: { id: string; label: string; icon: string }[];
}

export interface PolicySection {
  id: string;
  name: string;
  fields: PolicyField[];
}

export interface PolicyField {
  id: string;
  label: string;
  type: PolicyFieldType;
  value: string;
  options?: { label: string; value: string }[];
}
```

Store the policies as `Json` on `Hotel` to keep the sectioned form flexible:

```prisma
// Add to Hotel model:
// policies Json?
```

## Calendar

`CalendarEvent` is derived from bookings, so it does not need its own
table. The owner calendar endpoint reads bookings plus room availability
and returns `CalendarEvent` shapes.

```ts
export interface CalendarEvent {
  id: string;
  hotelId: string;
  hotelName: string;
  roomType: string;
  guestName?: string;
  date: string;
  type: CalendarEventType;
}
```

## Analytics

Analytics are computed, not stored. These are the response shapes the
owner and admin analytics endpoints return.

### Owner analytics

```ts
export interface OwnerAnalyticsSummary {
  totalRevenue: number;
  totalBookings: number;
  avgOccupancy: number;
  avgDailyRate: number;
  revPAR: number;
  revenueGrowth: number;
  bookingGrowth: number;
  occupancyChange: number;
  adrChange: number;
  revPARChange: number;
}

export interface DailyMetric {
  date: string;
  revenue: number;
  bookings: number;
  occupancy: number;
}

export interface ChannelMetric {
  name: string;
  bookings: number;
  percentage: number;
}

export interface OccupancyMetric {
  month: string;
  occupancy: number;
  target: number;
}

export interface BookingWindowMetric {
  daysOut: number;
  bookings: number;
}

export interface MarketComparison {
  hotel: string;
  occupancy: number;
  avgRate: number;
  revPAR: number;
  ourOccupancy: number;
  ourAvgRate: number;
  ourRevPAR: number;
}

export interface RevenueByHotel {
  hotel: string;
  revenue: number;
  bookings: number;
  occupancy: number;
  avgRate: number;
  revPAR: number;
}

export interface RoomTypePerformance {
  roomType: string;
  hotel: string;
  revenue: number;
  bookings: number;
  occupancy: number;
  avgRate: number;
}
```

### Admin analytics

```ts
export interface AdminAnalytics {
  totalUsers: number;
  totalOwners: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  pendingApprovals: number;
  flaggedReviews: number;
  failedPayouts: number;
  bookingDisputes: number;
  userGrowth: number;
  bookingGrowth: number;
  revenueGrowth: number;
}

export interface RevenueMetric {
  month: string;
  revenue: number;
  previousRevenue: number;
}

export interface BookingMetric {
  month: string;
  bookings: number;
  previousBookings: number;
}

export interface UserMetric {
  month: string;
  users: number;
  previousUsers: number;
}

export interface AdminActivity {
  id: string;
  type: AdminActivityType;
  description: string;
  userId: string;
  userName: string;
  hotelId?: string;
  hotelName?: string;
  timestamp: string;
}
```

## API response wrappers

Every endpoint uses the same envelope.

```ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  field?: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sort?: string;
  order?: "asc" | "desc";
}
```

## Enum notes and gotchas

- **`BookingStatus`** differs between owner and admin views. The union of
  all values is `confirmed | upcoming | completed | cancelled | failed`.
  The owner view does not use `failed`; the admin view does not use
  `confirmed`. One enum with all five values covers both, and each view
  filters as needed.
- **`MembershipTier`** appears in both `User` (without `all`) and `Offer`
  (with `all`). Use `OfferTier` for offers and `MembershipTier` for users.
- **`flagReason`** in `AdminReview` is a plain string today. Keep it as a
  string so admins can write free text, or add a `FlagReason` enum later.
- **Slugs vs ids.** Public endpoints accept slugs. Owner and admin
  endpoints accept ids. The backend must keep both `slug` (unique) and `id`
  on `Hotel` and `RoomType`.

## Next steps

Read `10-api-contracts.md` for the endpoints that serve these models.