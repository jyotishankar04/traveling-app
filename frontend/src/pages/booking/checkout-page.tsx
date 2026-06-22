import { useState } from "react"
import { useNavigate } from "react-router"
import { hotels } from "@/data/hotels"
import { CheckoutLayout } from "@/components/custom/booking/CheckoutLayout"
import { BookingSummaryPanel } from "@/components/custom/booking/BookingSummaryPanel"
import { StepRoomSelection } from "@/components/custom/booking/StepRoomSelection"
import { StepGuestInfo } from "@/components/custom/booking/StepGuestInfo"
import { StepPayment } from "@/components/custom/booking/StepPayment"
import { StepConfirmation } from "@/components/custom/booking/StepConfirmation"

const LAST_STEP = 3

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const hotel = hotels[0]

  function handleNext() {
    if (step < LAST_STEP) {
      setStep(step + 1)
    } else {
      navigate("/booking/success")
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <CheckoutLayout currentStep={step} onNext={handleNext} onBack={handleBack} isLastStep={step === LAST_STEP}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 0 && <StepRoomSelection hotelId={hotel.id} />}
          {step === 1 && <StepGuestInfo />}
          {step === 2 && <StepPayment />}
          {step === 3 && <StepConfirmation hotel={hotel} />}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingSummaryPanel hotel={hotel} />
          </div>
        </div>
      </div>
    </CheckoutLayout>
  )
}
