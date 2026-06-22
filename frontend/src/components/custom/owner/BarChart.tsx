interface BarDatum {
  key: string
  value: number
  label: string
}

interface BarChartProps {
  data: BarDatum[]
  maxValue: number
  height?: number
  color?: string
  formatLabel?: (label: string) => string
  formatTooltip?: (value: number) => string
}

export function BarChart({
  data,
  maxValue,
  height = 140,
  color = "bg-neutral-900",
  formatLabel,
  formatTooltip,
}: BarChartProps) {
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((datum) => {
        const barHeight = maxValue > 0 ? (datum.value / maxValue) * (height - 20) : 4
        const tooltip = formatTooltip ? formatTooltip(datum.value) : `${datum.value}`
        const label = formatLabel ? formatLabel(datum.label) : datum.label

        return (
          <div key={datum.key} className="group relative flex flex-1 flex-col items-center justify-end">
            <div className="absolute -top-6 hidden whitespace-nowrap text-[10px] text-muted-foreground group-hover:block">
              {tooltip}
            </div>
            <div
              className={`w-full rounded-t transition ${color}`}
              style={{ height: `${Math.max(barHeight, 4)}px` }}
            />
            <span className="mt-1 text-[9px] text-muted-foreground">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

interface LegendProps {
  items: { label: string; color: string; shape?: "bar" | "circle" | "dashed" }[]
}

export function ChartLegend({ items }: LegendProps) {
  return (
    <div className="mt-3 flex justify-center gap-6 text-xs text-muted-foreground">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.shape === "dashed" ? (
            <span className={`size-3 rounded border-2 border-dashed ${item.color}`} />
          ) : (
            <span className={`size-3 rounded ${item.color} ${item.shape === "circle" ? "rounded-full" : ""}`} />
          )}
          {item.label}
        </span>
      ))}
    </div>
  )
}
