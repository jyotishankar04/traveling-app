import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface OnboardingStepperProps {
  steps: string[]
  currentStep: number
}

export function OnboardingStepper({ steps, currentStep }: OnboardingStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "active" : "pending"
        return (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition",
              state === "done" && "bg-neutral-900 text-white",
              state === "active" && "border-2 border-neutral-900 bg-white text-neutral-900",
              state === "pending" && "border border-border bg-muted text-muted-foreground",
            )}>
              {state === "done" ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={cn(
              "hidden text-sm sm:inline",
              state === "active" ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              {step}
            </span>
            {i < steps.length - 1 && <div className={cn("h-px w-8 sm:w-12", i < currentStep ? "bg-neutral-900" : "bg-border")} />}
          </div>
        )
      })}
    </div>
  )
}
