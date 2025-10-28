"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { DateSelector } from "@/components/date-selector"
import { TimeSlotSelector } from "@/components/time-slot-selector"
import { Loader2, ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import type { Experience } from "@/lib/types"

export default function DetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`/api/experiences/${id}`)
        if (!response.ok) throw new Error("Experience not found")
        const data = await response.json()
        setExperience(data)
        if (data.availableDates.length > 0) {
          setSelectedDate(data.availableDates[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time")
      return
    }

    const params = new URLSearchParams({
      experienceId: id,
      date: selectedDate,
      timeId: selectedTime,
      quantity: quantity.toString(),
    })

    router.push(`/checkout?${params.toString()}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading experience details...</p>
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
            <p className="font-medium">Error loading experience</p>
            <p className="text-sm">{error || "Experience not found"}</p>
          </div>
        </div>
      </main>
    )
  }

  const availableTimeSlots = experience.timeSlots.filter((slot) => slot.available > 0)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Experiences
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="rounded-lg overflow-hidden mb-8 h-96 bg-muted">
              <img
                src={experience.image || "/placeholder.svg"}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Basic Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">{experience.title}</h1>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Experience</h2>
              <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
            </div>

            {/* Rating */}
            <div className="bg-secondary rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold text-foreground">{experience.rating}</div>
                  <div className="text-sm text-muted-foreground">out of 5</div>
                </div>
                <div>
                  <p className="text-foreground font-medium">{experience.reviews} reviews</p>
                  <p className="text-sm text-muted-foreground">from verified travelers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm mb-2">Starting from</p>
                <p className="text-3xl font-bold text-foreground">₹{experience.price}</p>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Select Date</label>
                <DateSelector
                  dates={experience.availableDates}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>

              {/* Time Slot Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Select Time</label>
                {selectedDate && (
                  <TimeSlotSelector
                    timeSlots={availableTimeSlots}
                    selectedTime={selectedTime}
                    onTimeChange={setSelectedTime}
                  />
                )}
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Number of People</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border hover:bg-secondary transition flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-center"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border hover:bg-secondary transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">₹{experience.price * quantity}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">₹{experience.price * quantity}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                You won't be charged until you complete your booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
