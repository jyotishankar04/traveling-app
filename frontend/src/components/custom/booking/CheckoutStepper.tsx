import { CheckCircle2 } from "lucide-react"

const STEPS = ["Details", "Guest Info", "Payment", "Confirmation"]

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((label, index) => {
        const isDone = index < currentStep
        const isCurrent = index === currentStep
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold transition ${
              isDone ? "bg-neutral-900 text-white" : isCurrent ? "border-2 border-neutral-900 text-neutral-900" : "border border-border text-muted-foreground"
            }`}>
              {isDone ? <CheckCircle2 className="size-4" /> : index + 1}
            </div>
            <span className={`hidden text-sm font-medium sm:inline ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {index < STEPS.length - 1 && (
              <div className={`mx-2 h-px w-8 ${isDone ? "bg-neutral-900" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
