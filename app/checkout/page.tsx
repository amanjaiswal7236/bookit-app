"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { Loader2, ArrowLeft } from "lucide-react"
import type { Experience } from "@/lib/types"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const experienceId = searchParams.get("experienceId")
  const date = searchParams.get("date")
  const timeId = searchParams.get("timeId")
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!experienceId || !date || !timeId) {
      setError("Invalid booking parameters")
      setLoading(false)
      return
    }

    const fetchExperience = async () => {
      try {
        const response = await fetch(`/api/experiences/${experienceId}`)
        if (!response.ok) throw new Error("Experience not found")
        const data = await response.json()
        setExperience(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [experienceId, date, timeId])

  const handleSubmit = async (formData: {
    fullName: string
    email: string
    promoCode?: string
  }) => {
    if (!experience) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId,
          fullName: formData.fullName,
          email: formData.email,
          date,
          time: timeId,
          quantity,
          promoCode: formData.promoCode,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Booking failed")
      }

      const booking = await response.json()
      router.push(`/confirmation/${booking.id}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Booking failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </main>
    )
  }

  if (error || !experience) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
            <p className="font-medium">Error loading checkout</p>
            <p className="text-sm">{error || "Invalid booking"}</p>
          </div>
        </div>
      </main>
    )
  }

  const timeSlot = experience.timeSlots.find((slot) => slot.id === timeId)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Details
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary experience={experience} date={date} timeSlot={timeSlot} quantity={quantity} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background">
          <Header />
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
