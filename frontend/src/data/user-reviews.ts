export interface UserReview {
  id: string
  hotelId: string
  hotelName: string
  hotelSlug: string
  hotelImage: string
  location: string
  rating: number
  title: string
  comment: string
  stayedDate: string
  createdAt: string
}

export const myReviews: UserReview[] = [
  {
    id: "ur-1", hotelId: "alpine-lodge", hotelName: "The Alpine Lodge", hotelSlug: "alpine-lodge",
    hotelImage: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    location: "Zermatt, Switzerland", rating: 5,
    title: "Absolutely magical winter escape",
    comment: "The Alpine Lodge exceeded every expectation. The service was impeccable, the views breathtaking, and the spa was world-class. We will definitely be returning next winter.",
    stayedDate: "Feb 2026", createdAt: "2026-02-20",
  },
  {
    id: "ur-2", hotelId: "seaside-goa", hotelName: "Seaside Escape Goa", hotelSlug: "seaside-goa",
    hotelImage: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    location: "Goa, India", rating: 4,
    title: "Wonderful beach vacation",
    comment: "Beautiful property right on the beach. The staff was friendly and the food was excellent. The only downside was the Wi-Fi could be spotty at times.",
    stayedDate: "Mar 2026", createdAt: "2026-03-28",
  },
]
