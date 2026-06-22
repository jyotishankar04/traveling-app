import { Link } from "react-router"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const sections = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to Horizoné. By accessing or using our platform, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website, mobile application, or any of our services.",
      "Horizoné operates an online marketplace that connects travellers with hotels, resorts, and other accommodation providers worldwide. We facilitate bookings between guests and hosts but do not own, operate, or control any of the listed properties unless expressly stated otherwise.",
      "These terms constitute a legally binding agreement between you and Horizoné Travel Inc., a company registered in the State of Delaware. References to \"we,\" \"us,\" and \"our\" refer to Horizoné, while \"you\" and \"your\" refer to the user accessing our platform.",
    ],
  },
  {
    title: "2. Account Registration",
    content: [
      "To access certain features of our platform, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information promptly if it changes. Each registration is limited to one user account per email address.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use of your account or any other breach of security. We reserve the right to suspend or terminate accounts that violate these terms.",
      "By creating an account, you represent that you are at least eighteen years of age or the age of majority in your jurisdiction. If you are creating an account on behalf of a legal entity, you represent that you have the authority to bind that entity to these terms.",
    ],
  },
  {
    title: "3. Bookings & Reservations",
    content: [
      "When you make a booking through Horizoné, you enter into a direct contractual relationship with the accommodation provider. We act as an intermediary and handle the transaction processing, but the host is solely responsible for fulfilling the accommodation services described in your booking confirmation.",
      "All bookings are subject to availability and acceptance by the host. Upon completing a booking, you will receive a confirmation email containing your booking reference number, the property details, check-in and check-out information, and a summary of charges. It is your responsibility to verify that all details are accurate.",
      "You agree to provide accurate guest information for each reservation, including the correct number of guests and their full names. Exceeding the maximum occupancy of a room or providing false information may result in cancellation of your booking without refund at the host's discretion.",
    ],
  },
  {
    title: "4. Payments & Fees",
    content: [
      "We accept a variety of payment methods, including major credit cards, debit cards, and digital wallets such as PayPal and Apple Pay. All payments are processed through PCI-compliant payment gateways. Your payment information is encrypted and never stored in full on our servers.",
      "The total price displayed at checkout includes the nightly room rate, applicable taxes, service fees, and any additional charges selected during the booking process. Prices are displayed in the currency you selected, and your bank may apply foreign transaction fees for cross-currency payments.",
      "We reserve the right to change our service fees at any time. Fee changes will not affect bookings already confirmed. Any applicable taxes are calculated and charged based on the jurisdiction of the accommodation and may vary by location.",
    ],
  },
  {
    title: "5. Cancellations & Refunds",
    content: [
      "Cancellation policies are set by each host and displayed clearly on the property page and during checkout. These policies determine whether you are eligible for a full refund, partial refund, or no refund upon cancellation. By completing a booking, you accept the applicable cancellation policy.",
      "Refunds for eligible cancellations are processed to the original payment method within five to seven business days. Depending on your financial institution, it may take additional time for the refund to appear in your account. We are not responsible for delays caused by third-party payment processors.",
      "In cases of extenuating circumstances such as medical emergencies, natural disasters, or travel restrictions imposed by governmental authorities, you may request a discretionary review of our standard cancellation policy. Supporting documentation must be submitted within fourteen days of the cancellation.",
    ],
  },
  {
    title: "6. Host Obligations",
    content: [
      "Hosts listing properties on Horizoné agree to maintain accurate and up-to-date information regarding their property, including room availability, pricing, amenities, and house rules. Misrepresentation of a property may result in removal of the listing and suspension of the host's account.",
      "Hosts are responsible for honouring all confirmed bookings and providing accommodation that meets the standards described in their listing. This includes ensuring that the property is clean, safe, and in good working order at the time of the guest's arrival.",
      "Communication with guests must be professional and timely. Hosts agree to respond to booking inquiries and guest messages within twenty-four hours. Failure to maintain adequate communication standards may affect the host's listing visibility and ranking on our platform.",
    ],
  },
  {
    title: "7. User Conduct",
    content: [
      "You agree to use our platform only for lawful purposes and in accordance with these terms. Prohibited behaviour includes, but is not limited to, harassing other users, submitting false or fraudulent bookings, manipulating reviews or ratings, and attempting to circumvent our payment systems.",
      "You must not introduce any viruses, worms, malware, or other harmful code to our platform. Any attempt to gain unauthorised access to our systems, interfere with our servers, or disrupt the functionality of our services is strictly prohibited and may result in legal action.",
      "Reviews and ratings submitted by users must be honest, respectful, and based on genuine personal experience. We reserve the right to remove reviews that violate our content guidelines or are determined to be fraudulent, biased, or otherwise inappropriate.",
    ],
  },
  {
    title: "8. Intellectual Property",
    content: [
      "The Horizoné name, logo, design, text, graphics, software, and all other content on our platform are the exclusive property of Horizoné Travel Inc. or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
      "You retain ownership of any content you submit to our platform, including reviews, photos, and profile information. By submitting content, you grant us a non-exclusive, royalty-free, worldwide licence to use, display, reproduce, and distribute such content in connection with operating and promoting our platform.",
      "Users are prohibited from using any automated means, including bots, scrapers, or data mining tools, to access or extract data from our platform without prior written consent. Violation of this provision may result in legal action and immediate termination of your account.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "Horizoné provides its platform on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or secure at all times, and we disclaim all liability for any damages arising from your use of the platform.",
      "To the maximum extent permitted by law, Horizoné shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, resulting from your use of or inability to use our services.",
      "Our total liability to you for any claim arising out of or relating to these terms or your use of our platform is limited to the total amount paid by you to Horizoné in connection with the specific booking giving rise to the claim, or one hundred US dollars if no booking is involved.",
    ],
  },
  {
    title: "10. Termination",
    content: [
      "We reserve the right to suspend or terminate your account at any time, without prior notice, if we determine that you have violated these terms or engaged in conduct that could harm our platform, other users, or third parties. You may also terminate your account at any time by contacting our support team.",
      "Upon termination, your right to access and use our platform ceases immediately. Any bookings already confirmed at the time of termination will remain valid and subject to the applicable cancellation policies. We are not liable for any losses resulting from the suspension or termination of your account.",
      "Provisions of these terms that by their nature should survive termination, including but not limited to Sections 8, 9, and 11, shall remain in full force and effect after any termination of your account or these terms.",
    ],
  },
  {
    title: "11. Governing Law",
    content: [
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising out of or relating to these terms shall be resolved exclusively in the state or federal courts located in New York County, New York.",
      "We encourage you to contact us directly before initiating any legal proceedings so that we may attempt to resolve the matter informally. If a dispute cannot be resolved within sixty days of informal negotiations, either party may pursue arbitration or litigation as provided herein.",
      "The United Nations Convention on Contracts for the International Sale of Goods does not apply to these terms. If any provision of these terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "If you have any questions, concerns, or complaints regarding these Terms & Conditions, please contact our legal team. We are committed to addressing your inquiries promptly and transparently.",
      "You may reach us by email at legal@horizone.com or by postal mail at Horizoné Travel Inc., 350 Fifth Avenue, Suite 3000, New York, NY 10118, United States. We will respond to all written inquiries within ten business days.",
    ],
  },
]

export default function TermsPage() {
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

          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

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
            These Terms &amp; Conditions were last updated on June 1, 2026. We reserve the right to modify these terms at any time.
            Changes will be posted on this page with an updated revision date. Continued use of our platform after changes constitutes
            acceptance of the revised terms.
          </p>
        </div>
      </section>
    </div>
  )
}
