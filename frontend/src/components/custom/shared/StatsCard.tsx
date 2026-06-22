interface StatsCardProps {
  value: string
  label: string
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
