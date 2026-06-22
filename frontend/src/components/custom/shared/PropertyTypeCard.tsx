import { Link } from "react-router"
import type { PropertyType } from "@/data/propertyTypes"

interface PropertyTypeCardProps {
  item: PropertyType
}

export function PropertyTypeCard({ item }: PropertyTypeCardProps) {
  return (
    <Link
      to={`/${item.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {item.count.toLocaleString()} stays
        </p>
      </div>
    </Link>
  )
}
