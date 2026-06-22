import { Link } from "react-router"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you create an account, make a booking, or interact with our platform, we collect personal information that you provide directly. This includes your full name, email address, phone number, billing address, and payment details. We may also collect your date of birth and government-issued identification for verification purposes when required.",
      "When you use our platform, we automatically collect certain usage data, including your IP address, browser type, operating system, referring URLs, device information, and pages visited. We use cookies, web beacons, and similar tracking technologies to gather this information and to remember your preferences across sessions.",
      "Booking-related information includes your travel dates, the number of guests, room preferences, special requests, and any communications you exchange with hosts through our messaging system. We also collect reviews and ratings you submit about your travel experiences.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use your personal information primarily to process and confirm your bookings, communicate with you about your reservations, and provide customer support. This includes sending booking confirmations, pre-arrival information, post-stay follow-ups, and responses to your inquiries.",
      "We analyse usage data to personalise your experience on our platform, recommend hotels and destinations that match your preferences, and improve our services. This includes showing relevant search results, tailored promotions, and content based on your browsing behaviour and booking history.",
      "With your consent, we may send you marketing communications about special offers, new destinations, and travel inspiration. You can opt out of marketing emails at any time through your account settings or by clicking the unsubscribe link in any marketing email. We will continue to send you transactional emails related to your bookings regardless of your marketing preferences.",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "We share your booking information with the hotel or accommodation provider you have booked to fulfil your reservation. This includes your name, contact details, check-in and check-out dates, the number of guests, and any special requests you have made. Hotels may use this information to prepare for your arrival and comply with local registration requirements.",
      "We engage trusted third-party service providers to process payments, deliver emails, analyse data, and provide customer support. These providers are contractually obligated to protect your information and may only use it for the specific services they perform on our behalf. They are prohibited from using your data for any other purpose.",
      "We may disclose your information if required by law, regulation, or legal process, such as a court order or subpoena. We also reserve the right to disclose information when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others, or to investigate fraud or other unlawful activity.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These measures include Secure Socket Layer encryption, firewalls, intrusion detection systems, and regular security audits conducted by independent third-party firms.",
      "Payment information is processed through PCI DSS-compliant payment gateways. We do not store full credit card numbers, CVV codes, or magnetic stripe data on our servers. All sensitive payment data is tokenised, and only the last four digits of your card number are retained for reference purposes.",
      "Despite our best efforts, no method of electronic storage or transmission is completely secure. We cannot guarantee absolute security of your data. In the event of a data breach that affects your personal information, we will notify you promptly and provide guidance on steps you can take to protect yourself.",
    ],
  },
  {
    title: "5. Your Rights",
    content: [
      "You have the right to access the personal information we hold about you and request a copy of that data in a structured, commonly used format. You may also request correction of inaccurate or incomplete information at any time through your account settings or by contacting our support team.",
      "You may request deletion of your account and associated personal data, subject to certain legal obligations that require us to retain specific information for compliance purposes. Upon deletion, your profile and personal information will be permanently removed from our active systems within thirty days.",
      "If you are located in the European Economic Area, the United Kingdom, or other jurisdictions with comprehensive data protection laws, you may have additional rights, including the right to restrict processing, object to processing, and request data portability. You also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
  {
    title: "6. Cookies",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform. Essential cookies are necessary for the platform to function properly, enabling core features such as secure login, session management, and booking processing. These cookies do not require your consent but are essential for our service to work.",
      "Analytics and performance cookies help us understand how visitors interact with our platform, which pages are most popular, and where users encounter errors. We use this data to improve our website and services. These cookies collect aggregated, anonymised information and do not personally identify you.",
      "You can control cookie preferences through your browser settings. Most browsers allow you to block or delete cookies, but please note that disabling certain cookies may affect the functionality of our platform. For more detailed information about the specific cookies we use, please refer to our Cookie Policy.",
    ],
  },
  {
    title: "7. Third-Party Services",
    content: [
      "Our platform may contain links to third-party websites, services, and applications that are not owned or controlled by Horizoné. This includes payment processors, mapping services, social media platforms, and external booking widgets. We are not responsible for the privacy practices of these third parties.",
      "We encourage you to review the privacy policies of any third-party services you access through our platform. Your interactions with these services are governed by their own terms and privacy policies, not by ours. We do not endorse or assume any liability for the content or practices of third-party websites.",
      "Some third-party services integrated into our platform, such as Google Maps and social media login features, may collect information about your interactions even if you do not directly use those features. We recommend reviewing the privacy settings on your third-party accounts to control what information is shared.",
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      "Our platform is not directed to individuals under the age of eighteen, and we do not knowingly collect personal information from minors. If you are under eighteen, please do not use our services or provide any personal information to us. If we become aware that we have collected personal data from a minor without parental consent, we will take steps to delete that information promptly.",
      "In jurisdictions where the age of digital consent is higher than eighteen, we comply with applicable local laws. Parents or legal guardians who believe that their child has provided us with personal information without their consent should contact us immediately so that we can take appropriate action.",
    ],
  },
  {
    title: "9. Changes to Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or industry standards. When we make material changes, we will notify you by email and by posting a prominent notice on our platform prior to the changes taking effect.",
      "We encourage you to review this policy periodically to stay informed about how we are protecting your information. Your continued use of our platform after any changes to this Privacy Policy constitutes your acceptance of the updated terms. If you do not agree with the changes, you may close your account and cease using our services.",
      "The date at the top of this policy indicates when it was last revised. We will maintain an archive of previous versions of this policy for your reference upon request.",
    ],
  },
  {
    title: "10. Contact",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer. We are committed to addressing your privacy inquiries promptly and transparently.",
      "You may reach our DPO by email at privacy@horizone.com or by postal mail at Horizoné Travel Inc., Attn: Data Protection Officer, 350 Fifth Avenue, Suite 3000, New York, NY 10118, United States. We will respond to all privacy-related inquiries within thirty days.",
    ],
  },
]

export default function PrivacyPage() {
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

          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Privacy Policy</h1>
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
            This Privacy Policy was last updated on June 1, 2026. We reserve the right to modify this policy at any time.
            Changes will be posted on this page with an updated revision date. Continued use of our platform after changes
            constitutes acceptance of the revised policy.
          </p>
        </div>
      </section>
    </div>
  )
}
