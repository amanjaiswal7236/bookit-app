"use client"

import { Clock, Users, Calendar } from "lucide-react"
import type { Experience, TimeSlot } from "@/lib/types"

interface OrderSummaryProps {
  experience: Experience
  date: string
  timeSlot?: TimeSlot
  quantity: number
}

export function OrderSummary({ experience, date, timeSlot, quantity }: OrderSummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const subtotal = experience.price * quantity

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
      <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

      {/* Experience Card */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={experience.image || "/placeholder.svg"}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{experience.title}</h3>
            <p className="text-sm text-muted-foreground">{experience.location}</p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm font-medium text-foreground">{formatDate(date)}</p>
          </div>
        </div>

        {timeSlot && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-medium text-foreground">{timeSlot.time}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Participants</p>
            <p className="text-sm font-medium text-foreground">
              {quantity} person{quantity > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            ₹{experience.price} × {quantity}
          </span>
          <span className="text-foreground font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Taxes & Fees</span>
          <span className="text-foreground font-medium">₹0</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-medium text-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary">₹{subtotal}</span>
        </div>
      </div>

      {/* Info */}
      <div className="bg-secondary/50 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
        <p>✓ Free cancellation up to 24 hours before</p>
        <p>✓ Instant confirmation</p>
        <p>✓ Secure payment</p>
      </div>
    </div>
  )
}
