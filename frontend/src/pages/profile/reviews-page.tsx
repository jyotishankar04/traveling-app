import { useState } from "react"
import { Link } from "react-router"
import { MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { myReviews } from "@/data/user-reviews"

const tabs = ["All Reviews", "With Photos", "Most Recent"]

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("All Reviews")

  const filtered = activeTab === "All Reviews" ? myReviews : myReviews

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">My Reviews</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>

      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              activeTab === tab ? "border-neutral-900 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-14 text-center">
          <MessageSquare className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No reviews yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Reviews will appear after your stays.</p>
          <Link to="/hotels"><Button className="mt-4 rounded-full">Browse hotels</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={r.hotelImage} alt={r.hotelName} className="size-12 rounded-xl object-cover" />
                  <div>
                    <Link to={`/hotels/${r.hotelId}`}><h3 className="font-semibold text-foreground hover:underline">{r.hotelName}</h3></Link>
                    <span className="text-xs text-muted-foreground">{r.stayedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground">{r.comment}</p>
              {r.hotelImage && (
                <div className="mt-3 flex gap-2">

                </div>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Verified stay</span>
                <span>·</span>
                <span>Found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
