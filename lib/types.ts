export interface Experience {
  id: string
  title: string
  location: string
  description: string
  image: string
  price: number
  rating: number
  reviews: number
  duration: string
  groupSize: string
  availableDates: string[]
  timeSlots: TimeSlot[]
}

export interface TimeSlot {
  id: string
  time: string
  available: number
  maxCapacity: number
}

export interface Booking {
  id: string
  experienceId: string
  fullName: string
  email: string
  date: string
  time: string
  quantity: number
  promoCode?: string
  discount: number
  subtotal: number
  total: number
  status: "confirmed" | "failed"
  createdAt: string
}

export interface BookingRequest {
  experienceId: string
  fullName: string
  email: string
  date: string
  time: string
  quantity: number
  promoCode?: string
}
