import { mockExperiences, promoCodeDiscounts } from "@/lib/mock-data"
import type { BookingRequest, Booking } from "@/lib/types"

// In-memory storage for bookings (in production, use a database)
const bookings: Booking[] = []

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json()

    // Validate experience exists
    const experience = mockExperiences.find((exp) => exp.id === body.experienceId)
    if (!experience) {
      return Response.json({ error: "Experience not found" }, { status: 404 })
    }

    // Validate time slot
    const timeSlot = experience.timeSlots.find((slot) => slot.id === body.time)
    if (!timeSlot || timeSlot.available < body.quantity) {
      return Response.json({ error: "Time slot not available" }, { status: 400 })
    }

    // Calculate pricing
    const subtotal = experience.price * body.quantity
    let discount = 0

    if (body.promoCode && promoCodeDiscounts[body.promoCode]) {
      discount = Math.round(subtotal * promoCodeDiscounts[body.promoCode])
    }

    const total = subtotal - discount

    // Create booking
    const booking: Booking = {
      id: `BOOK-${Date.now()}`,
      experienceId: body.experienceId,
      fullName: body.fullName,
      email: body.email,
      date: body.date,
      time: body.time,
      quantity: body.quantity,
      promoCode: body.promoCode,
      discount,
      subtotal,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    bookings.push(booking)

    // Update available slots
    if (timeSlot) {
      timeSlot.available -= body.quantity
    }

    return Response.json(booking, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET() {
  return Response.json(bookings)
}
