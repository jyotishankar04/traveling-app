export interface CalendarEvent {
  id: string
  hotelId: string
  hotelName: string
  roomType: string
  guestName?: string
  date: string
  type: "check-in" | "check-out" | "confirmed" | "cancelled" | "maintenance"
}

export const calendarEvents: CalendarEvent[] = [
  { id: "ce-1", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Deluxe Room", guestName: "Sophie Laurent", date: "2026-06-15", type: "check-in" },
  { id: "ce-2", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Deluxe Room", guestName: "Sophie Laurent", date: "2026-06-18", type: "check-out" },
  { id: "ce-3", hotelId: "oh-2", hotelName: "Skyline Hotel New York", roomType: "King Suite", guestName: "James Mitchell", date: "2026-06-20", type: "check-in" },
  { id: "ce-4", hotelId: "oh-2", hotelName: "Skyline Hotel New York", roomType: "King Suite", guestName: "James Mitchell", date: "2026-06-25", type: "check-out" },
  { id: "ce-5", hotelId: "oh-3", hotelName: "The Alpine Lodge", roomType: "Alpine Room", guestName: "Elena Weber", date: "2026-07-01", type: "check-in" },
  { id: "ce-6", hotelId: "oh-3", hotelName: "The Alpine Lodge", roomType: "Alpine Room", guestName: "Elena Weber", date: "2026-07-05", type: "check-out" },
  { id: "ce-7", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Eiffel Suite", guestName: "Maria Garcia", date: "2026-07-10", type: "check-in" },
  { id: "ce-8", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Eiffel Suite", guestName: "Maria Garcia", date: "2026-07-15", type: "check-out" },
  { id: "ce-9", hotelId: "oh-4", hotelName: "Seaside Escape Goa", roomType: "Deluxe Room", guestName: "Priya Sharma", date: "2026-07-20", type: "confirmed" },
  { id: "ce-10", hotelId: "oh-1", hotelName: "Lumière Hotel Paris", roomType: "Penthouse Suite", date: "2026-06-15", type: "maintenance" },
]

export const calendarData = {
  currentMonth: "June 2026",
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    events: calendarEvents.filter((e) => {
      const day = parseInt(e.date.split("-")[2])
      return day === i + 1
    }),
  })),
}
