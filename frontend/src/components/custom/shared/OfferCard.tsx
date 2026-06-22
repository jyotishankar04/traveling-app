import { ArrowRight } from "lucide-react"
import type { Offer } from "@/data/offers"

interface OfferCardProps {
  offer: Offer
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[260px]">
      <img
        src={offer.image}
        alt={offer.title}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-end p-6 lg:p-8">
        <span className="mb-2 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-sm uppercase">
          {offer.badge}
        </span>
        <h3 className="text-xl font-bold text-white lg:text-2xl">{offer.title}</h3>
        <p className="mt-1 text-3xl font-extrabold text-white lg:text-4xl">
          {offer.discount}
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-white/90">
          {offer.cta}
          <ArrowRight className="size-4" />
        </span>
      </div>
    </div>
  )
}
