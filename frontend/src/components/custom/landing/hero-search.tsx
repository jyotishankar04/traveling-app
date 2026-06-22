import * as React from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  ArrowRight,
  CalendarIcon,
  ChevronDown,
  MapPin,
  Minus,
  Plus,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const filters = ["Hotels", "Villas", "Apartments", "Resorts", "Cottages"];

function HeroSearch() {
  const [activeFilter, setActiveFilter] = React.useState("Hotels");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [guests, setGuests] = React.useState(1);
  const [rooms, setRooms] = React.useState(1);

  const dateLabel =
    date?.from && date?.to
      ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd")}`
      : "Add dates";

  return (
    <Card className="w-full rounded-[1.5rem] border-white/70 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur-xl ring-0 md:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1.05fr_0.9fr_auto] lg:items-end">
        <Field label="Where to?">
          <InputGroup className="h-12 rounded-xl border-transparent bg-muted/70 shadow-none">
            <InputGroupAddon>
              <MapPin className="size-4 text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupInput
              placeholder="Search city, hotel or landmark"
              className="text-sm text-foreground placeholder:text-muted-foreground"
            />
          </InputGroup>
        </Field>

        <Field label="Check-in — Check-out">
          <Popover>
            <PopoverTrigger >
              <Button
                variant="ghost"
                className={cn(
                  "h-12 w-full justify-start rounded-xl bg-muted/70 px-4 text-sm font-normal text-muted-foreground hover:bg-muted",
                  date?.from && date?.to && "text-foreground"
                )}
              >
                <CalendarIcon className="mr-3 size-4" />
                {dateLabel}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto rounded-2xl p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Guests & Rooms">
          <Popover>
            <PopoverTrigger >
              <Button
                variant="ghost"
                className="h-12 w-full justify-between rounded-xl bg-muted/70 px-4 text-sm font-normal text-muted-foreground hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <UserRound className="size-4" />
                  {guests} guest{guests > 1 ? "s" : ""}, {rooms} room
                  {rooms > 1 ? "s" : ""}
                </span>

                <ChevronDown className="size-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[18rem] rounded-2xl p-4 md:w-80" align="start">
              <CounterRow
                label="Guests"
                value={guests}
                min={1}
                onMinus={() => setGuests((v) => Math.max(1, v - 1))}
                onPlus={() => setGuests((v) => v + 1)}
              />

              <div className="my-4 h-px bg-border" />

              <CounterRow
                label="Rooms"
                value={rooms}
                min={1}
                onMinus={() => setRooms((v) => Math.max(1, v - 1))}
                onPlus={() => setRooms((v) => v + 1)}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Button className="h-12 rounded-xl px-7 text-sm font-semibold shadow-lg shadow-black/15">
          Search stays
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="mr-1 text-sm font-semibold text-foreground">
          Popular filters:
        </p>

        {filters.map((filter) => (
          <Button
            key={filter}
            type="button"
            variant="outline"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "h-9 rounded-full border-border bg-white px-4 text-xs font-medium text-foreground hover:bg-muted",
              activeFilter === filter &&
                "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
            )}
          >
            {filter}
          </Button>
        ))}
      </div>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-foreground">{label}</label>
      {children}
    </div>
  );
}

function CounterRow({
  label,
  value,
  min,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  min: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          Select number of {label.toLowerCase()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-8 rounded-full"
          disabled={value <= min}
          onClick={onMinus}
        >
          <Minus className="size-4" />
        </Button>

        <span className="w-5 text-center text-sm font-semibold text-foreground">
          {value}
        </span>

        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-8 rounded-full"
          onClick={onPlus}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSearch;