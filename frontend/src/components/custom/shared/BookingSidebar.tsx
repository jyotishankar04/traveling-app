import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle2, Minus, Plus, UserRound } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

interface BookingSidebarProps {
  pricePerNight: number
  currency: string
}

export function BookingSidebar({ pricePerNight, currency }: BookingSidebarProps) {
  const navigate = useNavigate()
  const [guests, setGuests] = useState(2)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$"

  return (
    <div className="sticky top-28 space-y-4">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-lg">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">
            {symbol}{pricePerNight}
          </span>
          <span className="text-sm text-muted-foreground">/per night</span>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-foreground">Check-in — Check-out</label>
            <Popover>
              <PopoverTrigger className="mt-1 flex h-12 w-full items-center gap-3 rounded-xl bg-muted/70 px-4 text-sm text-muted-foreground data-[popover-open]:border data-[popover-open]:border-foreground">
                <CalendarIcon className="size-4 shrink-0" />
                <span className={cn(!dateRange?.from && "text-muted-foreground")}>
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>{format(dateRange.from, "MMM d")} — {format(dateRange.to, "MMM d")}</>
                    ) : (
                      format(dateRange.from, "MMM d")
                    )
                  ) : (
                    "Select dates"
                  )}
                </span>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Guests</label>
            <div className="mt-1 flex h-12 items-center justify-between rounded-xl bg-muted/70 px-4">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="size-4" />
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuests((v) => Math.max(1, v - 1))}
                  className="flex size-7 items-center justify-center rounded-full border border-border"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-4 text-center text-sm font-semibold text-foreground">{guests}</span>
                <button
                  onClick={() => setGuests((v) => v + 1)}
                  className="flex size-7 items-center justify-center rounded-full border border-border"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-5 h-12 w-full rounded-xl text-sm font-semibold" onClick={() => navigate("/booking/checkout")}>
          Check availability
        </Button>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-green-600" />
            Free cancellation
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-green-600" />
            No prepayment needed
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{symbol}{pricePerNight} x 5 nights</span>
            <span>{symbol}{(pricePerNight * 5).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Cleaning fee</span>
            <span>{symbol}75</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Service fee</span>
            <span>{symbol}50</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
            <span>Total</span>
            <span>{symbol}{(pricePerNight * 5 + 125).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-xl">
        Save for later
      </Button>
    </div>
  )
}
