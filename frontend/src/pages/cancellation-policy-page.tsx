import { Link } from "react-router"
import { ChevronLeft, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const policyTypes = [
  {
    name: "Free Cancellation",
    badge: "success",
    badgeLabel: "Most Flexible",
    window: "Up to 48 hours before check-in",
    refund: "100% full refund",
    choose: "Ideal for flexible travellers who want maximum peace of mind. Best for trips where plans may change due to weather, work, or personal reasons.",
    features: [
      "Full refund to original payment method",
      "No cancellation fees or penalties",
      "Cancel online with one click",
      "Free modification available",
    ],
  },
  {
    name: "Moderate Cancellation",
    badge: "secondary",
    badgeLabel: "Balanced",
    window: "Up to 7 days before check-in",
    refund: "Full refund minus one night's stay",
    choose: "Great for travellers with reasonably firm plans who want a balance between savings and some cancellation flexibility.",
    features: [
      "Partial refund after cancellation fee",
      "One night charge applies",
      "Cancel online through your account",
      "Modifications allowed with rate adjustment",
    ],
  },
  {
    name: "Strict Cancellation",
    badge: "destructive",
    badgeLabel: "Limited Refund",
    window: "Up to 30 days before check-in",
    refund: "50% refund up to 30 days, no refund after",
    choose: "Best for travellers with confirmed, non-changeable plans who want to secure the lowest possible rate.",
    features: [
      "Partial refund within 30-day window",
      "No refund within 30 days of check-in",
      "Lower nightly rate than flexible options",
      "No modifications after cancellation window",
    ],
  },
]

const sections = [
  {
    title: "1. Overview",
    content: [
      "Horizoné offers a range of cancellation policies designed to accommodate different traveller needs and budgets. Each property on our platform selects the policy that best suits their business model, and the applicable policy is displayed clearly on the property page and during the checkout process before you confirm your booking.",
      "There are four main cancellation categories: Free Cancellation, Moderate Cancellation, Strict Cancellation, and Non-Refundable Rates. Understanding these options will help you choose the right balance of flexibility and value for your trip. Always review the cancellation policy carefully before completing your booking.",
    ],
  },
  {
    title: "2. Free Cancellation",
    content: [
      "Free Cancellation is our most flexible policy. It allows you to cancel your reservation at no charge up to forty-eight hours before the scheduled check-in time. If you cancel within this window, the full amount paid, including all taxes and fees, will be refunded to your original payment method.",
      "This policy is ideal for travellers whose plans are tentative or subject to change. While Free Cancellation rates are typically slightly higher than other options, the added flexibility ensures you can adjust your itinerary without financial penalty. Modifications to dates or room types are also free within the cancellation window.",
      "Cancellations made after the forty-eight-hour deadline are subject to a penalty of one night's stay plus applicable taxes. No refund is issued for cancellations made after check-in time on the scheduled arrival date.",
    ],
  },
  {
    title: "3. Moderate Cancellation",
    content: [
      "The Moderate Cancellation policy offers a middle ground between flexibility and value. You may cancel up to seven days before your scheduled check-in and receive a full refund, minus a cancellation fee equal to one night's stay plus applicable taxes. The remaining amount is refunded to your original payment method.",
      "Cancellations made between seven days and twenty-four hours before check-in are eligible for a fifty percent refund of the total booking amount. Cancellations made within twenty-four hours of check-in or no-shows are non-refundable.",
      "Modifications to bookings under the Moderate Cancellation policy are permitted up to seven days before check-in without penalty. Changes made within seven days of arrival may be subject to rate adjustments and availability constraints.",
    ],
  },
  {
    title: "4. Strict Cancellation",
    content: [
      "The Strict Cancellation policy provides limited refund options and is designed for travellers with confirmed, non-flexible plans. You may cancel up to thirty days before check-in and receive a refund of fifty percent of the total booking amount. Cancellations made within thirty days of check-in are non-refundable.",
      "No refunds are issued for early departures, late arrivals, or unused nights under the Strict policy. The full booking amount is charged at the time of reservation, and no portion of the payment is refundable after the cancellation deadline has passed.",
      "This policy typically offers the lowest nightly rates and is most suitable for travellers who are certain of their travel dates and do not anticipate needing to change or cancel their reservation.",
    ],
  },
  {
    title: "5. Non-Refundable Rates",
    content: [
      "Non-Refundable rates offer the lowest possible price but come with the strictest terms. Once a non-refundable booking is confirmed, no cancellations, modifications, or refunds are permitted under any circumstances, except where required by applicable law or our extenuating circumstances policy.",
      "We strongly recommend purchasing travel insurance if you book a non-refundable rate. Travel insurance can provide coverage for unforeseen events such as medical emergencies, flight cancellations, or other circumstances that may prevent you from travelling.",
      "Non-Refundable bookings are clearly labelled throughout the booking process, including on the search results page, the hotel detail page, and the checkout summary. You must acknowledge the non-refundable terms before completing your purchase.",
    ],
  },
  {
    title: "6. How to Cancel",
    content: [
      "To cancel a booking, log in to your Horizoné account and navigate to My Bookings. Locate the reservation you wish to cancel and click the Cancel Booking button. The system will display the applicable cancellation policy, any fees that apply, and the estimated refund amount before you confirm.",
      "You can also cancel directly from your booking confirmation email by clicking the Manage Booking link. This will take you to the same cancellation interface without requiring you to log in separately. Have your booking reference number ready for faster processing.",
      "After confirming the cancellation, you will receive a confirmation email with the cancellation details, including the refund amount and expected processing timeline. If you do not receive this email within fifteen minutes, please check your spam folder and contact support if needed.",
    ],
  },
  {
    title: "7. Refund Processing",
    content: [
      "Refunds for eligible cancellations are processed within five to seven business days from the date of cancellation. The refund is issued to the same payment method used for the original booking. Depending on your bank or card issuer, it may take an additional three to five business days for the funds to appear in your account.",
      "For bookings that used multiple payment methods or promotional credits, refunds are allocated proportionally. Promotional credits and loyalty points are returned to your Horizoné account balance and can be applied to future bookings. Cash portions are refunded to the original payment method.",
      "If you believe a refund is overdue or the amount does not match the cancellation policy, please contact our customer support team with your booking reference number. We will investigate and resolve any discrepancies within three business days.",
    ],
  },
  {
    title: "8. Exceptions",
    content: [
      "We understand that unforeseen circumstances can disrupt even the best-laid travel plans. Our Extenuating Circumstances policy provides for case-by-case review of cancellations due to events outside your control, including serious medical emergencies, natural disasters, government-mandated travel restrictions, and the death of an immediate family member.",
      "To request an exception, please contact our customer support team within fourteen days of the cancellation with supporting documentation. Acceptable documentation includes medical certificates, official travel advisories, insurance claim forms, or government orders. Each request is reviewed individually, and we will notify you of our decision within five business days.",
      "Please note that extenuating circumstances exceptions are granted at our discretion and are not guaranteed. We recommend purchasing comprehensive travel insurance to protect against unforeseen events that may not qualify under our Extenuating Circumstances policy.",
    ],
  },
  {
    title: "9. Special COVID-19 Policy",
    content: [
      "In response to the ongoing global health situation, Horizoné offers enhanced flexibility through our Flexible Booking Assurance programme. For bookings made on or after January 1, 2026, if you are unable to travel due to a COVID-19 related reason, including personal illness, mandatory quarantine, or government travel restrictions, you may cancel or modify your booking without the usual penalties.",
      "Under this policy, eligible guests may receive a full refund or a travel credit valid for twelve months from the date of cancellation. Travel credits can be applied to any future booking on our platform and are fully transferable to another person.",
      "This policy applies to all room types and rate plans, including non-refundable rates, with the exception of bookings made through certain wholesale partners or group bookings. Please contact our support team if you have questions about whether your booking qualifies.",
    ],
  },
]

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Cancellation Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {policyTypes.map((policy) => (
              <div
                key={policy.name}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground">{policy.name}</h3>
                  <Badge variant={policy.badge as "success" | "secondary" | "destructive"} className="shrink-0">
                    {policy.badgeLabel}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Cancellation Window
                    </p>
                    <p className="text-sm text-foreground">{policy.window}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Refund</p>
                    <p className="text-sm text-foreground">{policy.refund}</p>
                  </div>
                </div>
                <Separator className="my-3" />
                <ul className="space-y-1.5">
                  {policy.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground italic">
                  {policy.choose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                <div className="mt-3 space-y-4">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          <p className="text-sm text-muted-foreground">
            This Cancellation Policy was last updated on June 1, 2026. Horizoné reserves the right to modify this
            policy at any time. Changes will be posted on this page with an updated revision date. Bookings made before
            a policy change remain subject to the policy in effect at the time of booking.
          </p>
        </div>
      </section>
    </div>
  )
}
