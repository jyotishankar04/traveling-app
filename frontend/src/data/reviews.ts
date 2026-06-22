export interface Review {
  id: string
  hotelId: string
  userName: string
  userAvatar: string
  rating: number
  date: string
  title: string
  comment: string
  travelType: "solo" | "couple" | "family" | "business"
  roomType: string
  stayDuration: string
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    hotelId: "lumiere-paris",
    userName: "Sophie Martin",
    userAvatar: "",
    rating: 5,
    date: "2026-05-15",
    title: "Absolutely magical experience",
    comment: "From the moment we arrived, everything was perfect. The staff anticipated our every need. The room was stunning with a view of the Eiffel Tower. The breakfast was the best we've ever had at a hotel.",
    travelType: "couple",
    roomType: "Eiffel Suite",
    stayDuration: "4 nights",
  },
  {
    id: "rev-2",
    hotelId: "lumiere-paris",
    userName: "James Wilson",
    userAvatar: "",
    rating: 4,
    date: "2026-04-22",
    title: "Excellent hotel with minor quirks",
    comment: "Beautiful property with incredible attention to detail. The only small issue was the Wi-Fi in our room was occasionally spotty. Otherwise, a world-class experience.",
    travelType: "business",
    roomType: "Deluxe Room",
    stayDuration: "3 nights",
  },
  {
    id: "rev-3",
    hotelId: "aurelia-bali",
    userName: "Priya Patel",
    userAvatar: "",
    rating: 5,
    date: "2026-06-01",
    title: "Paradise found",
    comment: "The Aurelia Resort exceeded every expectation. The private pool villa was incredible, the spa treatments were world-class, and the staff made us feel like royalty.",
    travelType: "couple",
    roomType: "Ocean Pool Villa",
    stayDuration: "7 nights",
  },
  {
    id: "rev-4",
    hotelId: "aurelia-bali",
    userName: "David Chen",
    userAvatar: "",
    rating: 5,
    date: "2026-03-10",
    title: "Best resort in Bali",
    comment: "We've stayed at many resorts in Bali and Aurelia is by far the best. The beach access is pristine, the food is exceptional, and the service is unmatched.",
    travelType: "family",
    roomType: "Family Suite",
    stayDuration: "5 nights",
  },
  {
    id: "rev-5",
    hotelId: "alpine-lodge",
    userName: "Hans Mueller",
    userAvatar: "",
    rating: 5,
    date: "2026-02-18",
    title: "Winter wonderland perfection",
    comment: "Ski-in/ski-out access was seamless. The fireplace suite was cozy and romantic. The hot tub overlooking the Alps was the highlight of our trip.",
    travelType: "couple",
    roomType: "Alpine Suite",
    stayDuration: "6 nights",
  },
  {
    id: "rev-6",
    hotelId: "alpine-lodge",
    userName: "Emma Thompson",
    userAvatar: "",
    rating: 4,
    date: "2026-01-05",
    title: "Great ski trip",
    comment: "Fantastic location, excellent facilities, and very helpful staff. The only reason not 5 stars is that the restaurant menu could have more variety.",
    travelType: "family",
    roomType: "Family Room",
    stayDuration: "4 nights",
  },
  {
    id: "rev-7",
    hotelId: "seaside-goa",
    userName: "Rajesh Kumar",
    userAvatar: "",
    rating: 5,
    date: "2026-05-20",
    title: "Perfect beach vacation",
    comment: "The Seaside Escape is a gem. The beachfront villa, the seafood restaurant, and the sunset views were extraordinary. Already planning our return visit.",
    travelType: "family",
    roomType: "Beach Villa",
    stayDuration: "5 nights",
  },
  {
    id: "rev-8",
    hotelId: "seaside-goa",
    userName: "Sarah O'Brien",
    userAvatar: "",
    rating: 4,
    date: "2026-04-12",
    title: "Relaxing getaway",
    comment: "Loved every moment. The pool area is stunning, the staff are incredibly friendly, and the beach is beautiful. Would highly recommend.",
    travelType: "solo",
    roomType: "Garden Room",
    stayDuration: "3 nights",
  },
]
