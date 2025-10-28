"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ConfirmationDetails } from "@/components/confirmation-details"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import type { Booking } from "@/lib/types"

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch("/api/bookings")
        if (!response.ok) throw new Error("Failed to fetch bookings")
        const bookings: Booking[] = await response.json()
        const foundBooking = bookings.find((b) => b.id === bookingId)

        if (!foundBooking) {
          throw new Error("Booking not found")
        }

        setBooking(foundBooking)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading confirmation...</p>
        </div>
      </main>
    )
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Booking Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "We couldn't find your booking"}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-success/10 rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your experience has been successfully booked</p>
        </div>

        {/* Confirmation Details */}
        <ConfirmationDetails booking={booking} />

        {/* Next Steps */}
        <div className="bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">What's Next?</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Check your email for booking confirmation and details</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>You can cancel free of charge up to 24 hours before the experience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Arrive 15 minutes early on the day of your experience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Have a great time and share your experience with us!</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Browse More Experiences
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-secondary text-foreground py-3 rounded-lg font-medium hover:bg-secondary/80 transition border border-border"
          >
            Print Confirmation
          </button>
        </div>

        {/* Support */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Need help?</p>
          <a href="#" className="text-primary hover:opacity-80 transition font-medium">
            Contact our support team
          </a>
        </div>
      </div>
    </main>
  )
}
