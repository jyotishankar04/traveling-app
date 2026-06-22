export interface PolicySection {
  id: string
  name: string
  fields: PolicyField[]
}

export interface PolicyField {
  id: string
  label: string
  type: "textarea" | "select" | "time" | "number"
  value: string
  options?: { label: string; value: string }[]
}

export const policySections: PolicySection[] = [
  {
    id: "general", name: "General Policies",
    fields: [
      { id: "property-rules", label: "Property Rules", type: "textarea", value: "Quiet hours from 10 PM to 7 AM. No parties or events without prior approval. Smoking only in designated areas." },
      { id: "smoking", label: "Smoking Policy", type: "select", value: "designated", options: [{ label: "Allowed Everywhere", value: "allowed" }, { label: "Designated Areas Only", value: "designated" }, { label: "Not Allowed", value: "not-allowed" }] },
      { id: "events", label: "Events Policy", type: "select", value: "prior-approval", options: [{ label: "Allowed", value: "allowed" }, { label: "Prior Approval Required", value: "prior-approval" }, { label: "Not Allowed", value: "not-allowed" }] },
    ],
  },
  {
    id: "checkin", name: "Check-in / Check-out",
    fields: [
      { id: "checkin-time", label: "Check-in Time", type: "time", value: "3:00 PM" },
      { id: "checkout-time", label: "Check-out Time", type: "time", value: "11:00 AM" },
      { id: "early-checkin", label: "Early Check-in Policy", type: "textarea", value: "Early check-in available upon request and subject to availability. Additional fees may apply." },
      { id: "late-checkout", label: "Late Check-out Policy", type: "textarea", value: "Late check-out available until 2 PM (50% of nightly rate) or 6 PM (full nightly rate)." },
    ],
  },
  {
    id: "cancellation", name: "Cancellation Policy",
    fields: [
      { id: "cancel-policy", label: "Cancellation Policy", type: "select", value: "flexible", options: [
        { label: "Flexible - Free cancellation 24h before", value: "flexible" },
        { label: "Moderate - Free cancellation 48h before", value: "moderate" },
        { label: "Strict - Free cancellation 7 days before", value: "strict" },
        { label: "Non-refundable", value: "non-refundable" },
      ]},
      { id: "no-show", label: "No-show Policy", type: "textarea", value: "In case of no-show, the full booking amount will be charged." },
    ],
  },
  {
    id: "children", name: "Children & Beds",
    fields: [
      { id: "children-policy", label: "Children Policy", type: "select", value: "welcome", options: [
        { label: "Children Welcome", value: "welcome" },
        { label: "Adults Only", value: "adults-only" },
        { label: "Family Friendly", value: "family" },
      ]},
      { id: "extra-beds", label: "Extra Beds Policy", type: "textarea", value: "Extra beds available upon request. Charges may apply." },
    ],
  },
  {
    id: "pets", name: "Pets Policy",
    fields: [
      { id: "pets-allowed", label: "Pets Policy", type: "select", value: "allowed", options: [
        { label: "Pets Allowed", value: "allowed" },
        { label: "Only Small Pets", value: "small" },
        { label: "Service Animals Only", value: "service" },
        { label: "No Pets", value: "not-allowed" },
      ]},
      { id: "pet-fee", label: "Pet Fee", type: "number", value: "50" },
      { id: "pet-rules", label: "Pet Rules", type: "textarea", value: "Pets must be kept on a leash in public areas. Pets are not allowed in dining areas." },
    ],
  },
  {
    id: "payment", name: "Payment Policy",
    fields: [
      { id: "accepted-cards", label: "Accepted Payment Methods", type: "textarea", value: "Visa, Mastercard, American Express, PayPal, Bank Transfer" },
      { id: "deposit", label: "Deposit Policy", type: "textarea", value: "A 50% deposit is required at the time of booking. Balance due at check-in." },
    ],
  },
]
