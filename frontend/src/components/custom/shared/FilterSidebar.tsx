import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal } from "lucide-react"

export interface FilterValues {
  priceMin: string
  priceMax: string
  starRating: number[]
  guestRating: number[]
  propertyTypes: string[]
  amenities: string[]
}

export interface FilterSidebarProps {
  className?: string
  onApply?: (values: FilterValues) => void
}

const EMPTY: FilterValues = {
  priceMin: "",
  priceMax: "",
  starRating: [],
  guestRating: [],
  propertyTypes: [],
  amenities: [],
}

interface FilterSectionProps {
  label: string
  children: React.ReactNode
}

function FilterSection({ label, children }: FilterSectionProps) {
  return (
    <div className="border-b border-border pb-4">
      <p className="mb-3 text-sm font-semibold text-foreground">{label}</p>
      {children}
    </div>
  )
}

export function FilterSidebar({ className = "", onApply }: FilterSidebarProps) {
  const [values, setValues] = useState<FilterValues>(EMPTY)

  function set<K extends keyof FilterValues>(key: K, v: FilterValues[K]) {
    setValues((prev) => ({ ...prev, [key]: v }))
  }

  function handleReset() {
    setValues(EMPTY)
    onApply?.(EMPTY)
  }

  function handleApply() {
    onApply?.({ ...values })
  }

  return (
    <aside className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-xs text-muted-foreground"
          onClick={handleReset}
        >
          <SlidersHorizontal className="size-3.5" />
          Reset
        </Button>
      </div>

      <FilterSection label="Price range">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="$0"
            value={values.priceMin}
            onChange={(e) => set("priceMin", e.target.value)}
          />
          <span className="text-xs text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="$1000"
            value={values.priceMax}
            onChange={(e) => set("priceMax", e.target.value)}
          />
        </div>
      </FilterSection>

      <FilterSection label="Star rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <Checkbox
                id={`star-${star}`}
                checked={values.starRating.includes(star)}
                onCheckedChange={(checked) => {
                  if (checked) set("starRating", [...values.starRating, star])
                  else
                    set(
                      "starRating",
                      values.starRating.filter((s) => s !== star)
                    )
                }}
              />
              {star === 5 ? "5 stars" : `${star}+ stars`}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Guest rating">
        <div className="space-y-2">
          {[
            { label: "Excellent: 9+", value: 9 },
            { label: "Very Good: 8+", value: 8 },
            { label: "Good: 7+", value: 7 },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <Checkbox
                id={`guest-${item.value}`}
                checked={values.guestRating.includes(item.value)}
                onCheckedChange={(checked) => {
                  if (checked)
                    set("guestRating", [...values.guestRating, item.value])
                  else
                    set(
                      "guestRating",
                      values.guestRating.filter((r) => r !== item.value)
                    )
                }}
              />
              {item.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Property type">
        <div className="space-y-2">
          {["Hotels", "Villas", "Apartments", "Resorts", "Cottages"].map(
            (type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
              >
                <Checkbox
                  id={`property-${type.toLowerCase()}`}
                  checked={values.propertyTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked)
                      set("propertyTypes", [...values.propertyTypes, type])
                    else
                      set(
                        "propertyTypes",
                        values.propertyTypes.filter((t) => t !== type)
                      )
                  }}
                />
                {type}
              </label>
            )
          )}
        </div>
      </FilterSection>

      <FilterSection label="Amenities">
        <div className="space-y-2">
          {[
            "Free WiFi",
            "Pool",
            "Spa",
            "Restaurant",
            "Free Parking",
            "Pet friendly",
          ].map((a) => (
            <label
              key={a}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <Checkbox
                id={`amenity-${a.toLowerCase().replace(/\s+/g, "-")}`}
                checked={values.amenities.includes(a)}
                onCheckedChange={(checked) => {
                  if (checked) set("amenities", [...values.amenities, a])
                  else
                    set("amenities", values.amenities.filter((x) => x !== a))
                }}
              />
              {a}
            </label>
          ))}
        </div>
      </FilterSection>

      <Button className="w-full rounded-xl" onClick={handleApply}>
        Apply filters
      </Button>
    </aside>
  )
}
