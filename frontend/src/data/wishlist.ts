export interface WishlistItem {
  id: string
  hotelId: string
  addedAt: string
}

export const wishlist: WishlistItem[] = [
  { id: "w-1", hotelId: "lumiere-paris", addedAt: "2026-05-10" },
  { id: "w-2", hotelId: "aurelia-bali", addedAt: "2026-05-12" },
  { id: "w-3", hotelId: "santorini-villas", addedAt: "2026-05-15" },
  { id: "w-4", hotelId: "maldives-overwater", addedAt: "2026-06-01" },
  { id: "w-5", hotelId: "london-suite", addedAt: "2026-06-05" },
  { id: "w-6", hotelId: "grand-hotel-rome", addedAt: "2026-06-10" },
  { id: "w-7", hotelId: "tokyo-inn", addedAt: "2026-06-15" },
  { id: "w-8", hotelId: "skyline-nyc", addedAt: "2026-06-20" },
]
