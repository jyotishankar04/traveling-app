import { useState } from "react"
import { useParams, Link } from "react-router"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { OwnerPageHeader } from "@/components/custom/owner/OwnerPageHeader"
import { policySections } from "@/data/owner/owner-policies"
import { ownerHotels } from "@/data/owner/owner-hotels"

export default function PoliciesPage() {
  const { hotelId } = useParams()
  const hotel = ownerHotels.find((h) => h.id === hotelId)
  if (!hotel) return <NotFoundState />
  const [section, setSection] = useState(policySections[0].id)

  const currentSection = policySections.find((s) => s.id === section) ?? policySections[0]

  return (
    <div>
      <OwnerPageHeader
        title="Policies"
        subtitle={`Set the rules and policies for ${hotel.name}`}
      >
        <Link to={`/owner/hotels/${hotel.id}`}><Button variant="outline" className="rounded-full">Cancel</Button></Link>
        <Button className="rounded-full">Save Policies</Button>
      </OwnerPageHeader>

      <div className="flex gap-6">
        <div className="hidden w-48 shrink-0 lg:block">
          <nav className="space-y-1">
            {policySections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                  section === s.id ? "bg-neutral-900 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-foreground">{currentSection.name}</h3>
            <div className="space-y-4">
              {currentSection.fields.map((field) => (
                <div key={field.id}>
                  <label className="text-xs font-semibold text-foreground">{field.label}</label>
                  {field.type === "textarea" && (
                    <textarea
                      defaultValue={field.value}
                      rows={3}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      defaultValue={field.value}
                      className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none"
                    >
                      {field.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  )}
                  {field.type === "time" && (
                    <input
                      defaultValue={field.value}
                      className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    />
                  )}
                  {field.type === "number" && (
                    <input
                      defaultValue={field.value}
                      type="number"
                      className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
