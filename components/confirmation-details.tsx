"use client"

import { Calendar, Clock, Users, MapPin, Mail, User } from "lucide-react"
import type { Booking } from "@/lib/types"
import { useEffect, useState } from "react"
import type { Experience } from "@/lib/types"

interface ConfirmationDetailsProps {
  booking: Booking
}

export function ConfirmationDetails({ booking }: ConfirmationDetailsProps) {
  const [experience, setExperience] = useState<Experience | null>(null)
  const [timeSlot, setTimeSlot] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`/api/experiences/${booking.experienceId}`)
        if (response.ok) {
          const data = await response.json()
          setExperience(data)
          const slot = data.timeSlots.find((s: any) => s.id === booking.time)
          if (slot) {
            setTimeSlot(slot.time)
          }
        }
      } catch (err) {
        console.error("Failed to fetch experience:", err)
      }
    }

    fetchExperience()
  }, [booking.experienceId, booking.time])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Booking Reference */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Booking Reference</h2>
          <button
            onClick={() => navigator.clipboard.writeText(booking.id)}
            className="text-sm text-primary hover:opacity-80 transition"
          >
            Copy
          </button>
        </div>
        <div className="bg-secondary rounded-lg p-4 font-mono text-center text-foreground font-bold text-lg">
          {booking.id}
        </div>
      </div>

      {/* Experience Details */}
      {experience && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Experience Details</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-medium text-foreground">{experience.title}</p>
                <p className="text-sm text-muted-foreground">{experience.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{formatDate(booking.date)}</p>
              </div>
            </div>

            {timeSlot && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{timeSlot}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="font-medium text-foreground">
                  {booking.quantity} person{booking.quantity > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passenger Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Passenger Information</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{booking.fullName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{booking.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Price Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium">₹{booking.subtotal}</span>
          </div>

          {booking.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount {booking.promoCode && `(${booking.promoCode})`}</span>
              <span className="text-success font-medium">-₹{booking.discount}</span>
            </div>
          )}

          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-medium text-foreground">Total Amount Paid</span>
            <span className="text-xl font-bold text-primary">₹{booking.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
