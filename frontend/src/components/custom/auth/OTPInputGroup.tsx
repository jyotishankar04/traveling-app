import { useRef, useId } from "react"
import { cn } from "@/lib/utils"

interface OTPInputGroupProps {
  length?: number
  value: string
  onChange: (val: string) => void
}

export function OTPInputGroup({ length = 6, value, onChange }: OTPInputGroupProps) {
  const id = useId()
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (idx: number, char: string) => {
    if (!/^\d?$/.test(char)) return
    const newVal = value.split("")
    newVal[idx] = char
    const joined = newVal.join("").slice(0, length)
    onChange(joined)
    if (char && idx < length - 1) refs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus()
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          id={`${id}-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "h-12 w-12 rounded-xl border border-input bg-background text-center text-lg font-semibold text-foreground outline-none transition",
            "focus:border-ring focus:ring-3 focus:ring-ring/50",
            value[i] && "border-neutral-900"
          )}
        />
      ))}
    </div>
  )
}
