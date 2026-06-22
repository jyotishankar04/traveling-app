import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutStepper } from "./CheckoutStepper"

interface CheckoutLayoutProps {
  children: ReactNode
  currentStep: number
  onNext?: () => void
  onBack?: () => void
  isLastStep?: boolean
}

export function CheckoutLayout({ children, currentStep, onNext, onBack, isLastStep }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
            HORIZONÉ
          </Link>
          <CheckoutStepper currentStep={currentStep} />
          <div className="w-20" />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {children}

        <div className="mt-8 flex items-center justify-between">
          {onBack ? (
            <Button variant="outline" className="rounded-full" onClick={onBack}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
          ) : <div />}
          {onNext && (
            <Button className="rounded-full" onClick={onNext}>
              {isLastStep ? "Confirm booking" : "Continue"}
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
