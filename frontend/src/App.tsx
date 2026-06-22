import { Route, Routes } from "react-router"
import { PublicLayout } from "./layouts/PublicLayout"
import { UserAccountLayout } from "@/components/custom/user/UserAccountLayout"
import { OwnerLayout } from "@/components/custom/owner/OwnerLayout"
import LandingPage from "./pages/landing-page"
import HotelsPage from "./pages/hotels-page"
import HotelDetailPage from "./pages/hotel-detail-page"
import RoomDetailPage from "./pages/room-detail-page"
import HotelProfilePage from "./pages/hotel-profile-page"
import DestinationsPage from "./pages/destinations-page"
import DestinationDetailPage from "./pages/destination-detail-page"
import AboutPage from "./pages/about-page"
import ContactPage from "./pages/contact-page"
import OffersPage from "./pages/offers-page"
import OfferDetailPage from "./pages/offer-detail-page"
import HelpPage from "./pages/help-page"
import HelpArticlePage from "./pages/help-article-page"
import TermsPage from "./pages/terms-page"
import PrivacyPage from "./pages/privacy-page"
import CancellationPolicyPage from "./pages/cancellation-policy-page"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"
import VerifyPage from "./pages/auth/verify-page"
import ForgotPasswordPage from "./pages/auth/forgot-password-page"
import ResetPasswordPage from "./pages/auth/reset-password-page"
import OnboardingPage from "./pages/auth/onboarding-page"
import OwnerOnboardingPage from "./pages/auth/owner-onboarding-page"
import ProfilePage from "./pages/profile/profile-page"
import EditProfilePage from "./pages/profile/edit-profile-page"
import BookingsPage from "./pages/profile/bookings-page"
import BookingDetailPage from "./pages/profile/booking-detail-page"
import WishlistPage from "./pages/profile/wishlist-page"
import ReviewsPage from "./pages/profile/reviews-page"
import PaymentsPage from "./pages/profile/payments-page"
import SettingsPage from "./pages/profile/settings-page"
import NotificationsPage from "./pages/profile/notifications-page"
import CheckoutPage from "./pages/booking/checkout-page"
import BookingSuccessPage from "./pages/booking/booking-success-page"
import BookingFailedPage from "./pages/booking/booking-failed-page"
import BookingCancelledPage from "./pages/booking/booking-cancelled-page"
import OwnerDashboardPage from "./pages/owner/dashboard/dashboard-page"
import AnalyticsPage from "./pages/owner/analytics/analytics-page"
import CalendarPage from "./pages/owner/calendar/calendar-page"
import HotelsListPage from "./pages/owner/hotels/hotels-list-page"
import NewHotelPage from "./pages/owner/hotels/new-hotel-page"
import HotelDetailPageOwner from "./pages/owner/hotels/hotel-detail-page"
import EditHotelPage from "./pages/owner/hotels/edit-hotel-page"
import HotelGalleryPage from "./pages/owner/hotels/gallery-page"
import HotelAmenitiesPage from "./pages/owner/hotels/amenities-page"
import HotelPoliciesPage from "./pages/owner/hotels/policies-page"
import RoomsListPage from "./pages/owner/rooms/rooms-list-page"
import NewRoomPage from "./pages/owner/rooms/new-room-page"
import RoomDetailPageOwner from "./pages/owner/rooms/room-detail-page"
import EditRoomPage from "./pages/owner/rooms/edit-room-page"
import RoomGalleryPage from "./pages/owner/rooms/room-gallery-page"
import RoomAvailabilityPage from "./pages/owner/rooms/room-availability-page"
import RoomPricingPage from "./pages/owner/rooms/room-pricing-page"
import OwnerBookingsListPage from "./pages/owner/bookings/bookings-list-page"
import OwnerBookingDetailPage from "./pages/owner/bookings/booking-detail-page"
import UpcomingBookingsPage from "./pages/owner/bookings/upcoming-bookings-page"
import CompletedBookingsPage from "./pages/owner/bookings/completed-bookings-page"
import CancelledBookingsPage from "./pages/owner/bookings/cancelled-bookings-page"
import OwnerReviewsListPage from "./pages/owner/reviews/reviews-list-page"
import OwnerReviewDetailPage from "./pages/owner/reviews/review-detail-page"
import OwnerProfilePage from "./pages/owner/profile/owner-profile-page"
import OwnerSettingsPage from "./pages/owner/settings/owner-settings-page"
import PayoutsPage from "./pages/owner/payouts/payouts-page"
import OwnerNotificationsPage from "./pages/owner/notifications/owner-notifications-page"
import { AdminLayout } from "@/components/custom/admin/AdminLayout"
import AdminDashboardPage from "./pages/admin/dashboard/dashboard-page"
import AdminUsersPage from "./pages/admin/users/users-list-page"
import AdminUserDetailPage from "./pages/admin/users/user-detail-page"
import AdminOwnersPage from "./pages/admin/owners/owners-list-page"
import AdminHotelsPage from "./pages/admin/hotels/hotels-list-page"
import AdminHotelDetailPage from "./pages/admin/hotels/hotel-detail-page"
import AdminPendingHotelsPage from "./pages/admin/hotels/pending-hotels-page"
import AdminBookingsPage from "./pages/admin/bookings/bookings-list-page"
import AdminReviewsPage from "./pages/admin/reviews/reviews-list-page"
import AdminOffersPage from "./pages/admin/offers/offers-list-page"
import AdminNewOfferPage from "./pages/admin/offers/new-offer-page"
import AdminEditOfferPage from "./pages/admin/offers/edit-offer-page"
import AdminDestinationsPage from "./pages/admin/destinations/destinations-list-page"
import AdminSettingsPage from "./pages/admin/settings/settings-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<PublicLayout />}>
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
        <Route path="/hotels/:hotelId/rooms/:roomTypeId" element={<RoomDetailPage />} />
        <Route path="/hotels/:hotelId/profile" element={<HotelProfilePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/offers/:offerId" element={<OfferDetailPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/:slug" element={<HelpArticlePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
      </Route>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/verify" element={<VerifyPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/owner" element={<OwnerOnboardingPage />} />
      <Route element={<UserAccountLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/bookings" element={<BookingsPage />} />
        <Route path="/profile/bookings/:bookingId" element={<BookingDetailPage />} />
        <Route path="/profile/wishlist" element={<WishlistPage />} />
        <Route path="/profile/reviews" element={<ReviewsPage />} />
        <Route path="/profile/payments" element={<PaymentsPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
        <Route path="/profile/notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="/booking/checkout" element={<CheckoutPage />} />
      <Route path="/booking/success" element={<BookingSuccessPage />} />
      <Route path="/booking/failed" element={<BookingFailedPage />} />
      <Route path="/booking/cancelled" element={<BookingCancelledPage />} />
      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
        <Route path="/owner/analytics" element={<AnalyticsPage />} />
        <Route path="/owner/calendar" element={<CalendarPage />} />
        <Route path="/owner/hotels" element={<HotelsListPage />} />
        <Route path="/owner/hotels/new" element={<NewHotelPage />} />
        <Route path="/owner/hotels/:hotelId" element={<HotelDetailPageOwner />} />
        <Route path="/owner/hotels/:hotelId/edit" element={<EditHotelPage />} />
        <Route path="/owner/hotels/:hotelId/gallery" element={<HotelGalleryPage />} />
        <Route path="/owner/hotels/:hotelId/amenities" element={<HotelAmenitiesPage />} />
        <Route path="/owner/hotels/:hotelId/policies" element={<HotelPoliciesPage />} />
        <Route path="/owner/hotels/:hotelId/rooms" element={<RoomsListPage />} />
        <Route path="/owner/hotels/:hotelId/rooms/new" element={<NewRoomPage />} />
        <Route path="/owner/hotels/:hotelId/rooms/:roomTypeId" element={<RoomDetailPageOwner />} />
        <Route path="/owner/hotels/:hotelId/rooms/:roomTypeId/edit" element={<EditRoomPage />} />
        <Route path="/owner/hotels/:hotelId/rooms/:roomTypeId/gallery" element={<RoomGalleryPage />} />
        <Route path="/owner/hotels/:hotelId/rooms/:roomTypeId/availability" element={<RoomAvailabilityPage />} />
        <Route path="/owner/hotels/:hotelId/rooms/:roomTypeId/pricing" element={<RoomPricingPage />} />
        <Route path="/owner/bookings" element={<OwnerBookingsListPage />} />
        <Route path="/owner/bookings/:bookingId" element={<OwnerBookingDetailPage />} />
        <Route path="/owner/bookings/upcoming" element={<UpcomingBookingsPage />} />
        <Route path="/owner/bookings/completed" element={<CompletedBookingsPage />} />
        <Route path="/owner/bookings/cancelled" element={<CancelledBookingsPage />} />
        <Route path="/owner/reviews" element={<OwnerReviewsListPage />} />
        <Route path="/owner/reviews/:reviewId" element={<OwnerReviewDetailPage />} />
        <Route path="/owner/profile" element={<OwnerProfilePage />} />
        <Route path="/owner/settings" element={<OwnerSettingsPage />} />
        <Route path="/owner/payouts" element={<PayoutsPage />} />
        <Route path="/owner/notifications" element={<OwnerNotificationsPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/users/:userId" element={<AdminUserDetailPage />} />
        <Route path="/admin/owners" element={<AdminOwnersPage />} />
        <Route path="/admin/hotels" element={<AdminHotelsPage />} />
        <Route path="/admin/hotels/:hotelId" element={<AdminHotelDetailPage />} />
        <Route path="/admin/hotels/pending" element={<AdminPendingHotelsPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/reviews" element={<AdminReviewsPage />} />
        <Route path="/admin/offers" element={<AdminOffersPage />} />
        <Route path="/admin/offers/new" element={<AdminNewOfferPage />} />
        <Route path="/admin/offers/:offerId/edit" element={<AdminEditOfferPage />} />
        <Route path="/admin/destinations" element={<AdminDestinationsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
