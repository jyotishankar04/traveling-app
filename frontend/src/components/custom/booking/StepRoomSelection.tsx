import { rooms, type RoomType } from "@/data/rooms"

interface StepRoomSelectionProps {
  hotelId: string
}

export function StepRoomSelection({ hotelId }: StepRoomSelectionProps) {
  const hotelRooms = rooms.filter((room) => room.hotelId === hotelId).slice(0, 3)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Review your booking</h1>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Your room</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {hotelRooms.map((room) => (
            <RoomOption key={room.id} room={room} defaultChecked={room.id === hotelId + "-deluxe"} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-semibold text-foreground">Cancellation policy</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.
        </p>
      </div>
    </div>
  )
}

function RoomOption({ room, defaultChecked }: { room: RoomType; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50">
      <input type="radio" name="room" defaultChecked={defaultChecked} className="mt-1 accent-neutral-900" />
      <div>
        <p className="text-sm font-medium text-foreground">{room.name}</p>
        <p className="text-xs text-muted-foreground">Sleeps {room.maxGuests} · {room.size}</p>
        <p className="mt-1 text-xs text-muted-foreground">{room.amenities.slice(0, 3).join(" · ")}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">${room.pricePerNight}/night</p>
      </div>
    </label>
  )
}
