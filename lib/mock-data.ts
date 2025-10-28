import type { Experience } from "./types"

export const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "Taj Mahal Sunrise Tour",
    location: "Agra, India",
    description:
      "Experience the breathtaking beauty of the Taj Mahal at sunrise with a guided tour including breakfast.",
    image: "/taj-mahal-sunrise.jpg",
    price: 4999,
    rating: 4.8,
    reviews: 324,
    duration: "4 hours",
    groupSize: "2-8 people",
    availableDates: ["2025-11-15", "2025-11-16", "2025-11-17", "2025-11-18", "2025-11-19"],
    timeSlots: [
      { id: "1", time: "05:00 AM", available: 5, maxCapacity: 8 },
      { id: "2", time: "06:00 AM", available: 3, maxCapacity: 8 },
    ],
  },
  {
    id: "2",
    title: "Backwaters Houseboat Cruise",
    location: "Kerala, India",
    description: "Cruise through the serene backwaters of Kerala on a traditional houseboat with lunch included.",
    image: "/kerala-backwaters-houseboat.jpg",
    price: 7999,
    rating: 4.9,
    reviews: 512,
    duration: "8 hours",
    groupSize: "4-12 people",
    availableDates: ["2025-11-15", "2025-11-16", "2025-11-17", "2025-11-18"],
    timeSlots: [
      { id: "1", time: "08:00 AM", available: 8, maxCapacity: 12 },
      { id: "2", time: "02:00 PM", available: 6, maxCapacity: 12 },
    ],
  },
  {
    id: "3",
    title: "Jaipur City Palace Tour",
    location: "Jaipur, India",
    description: "Explore the magnificent City Palace and Jantar Mantar with an expert guide.",
    image: "/jaipur-city-palace.jpg",
    price: 2999,
    rating: 4.6,
    reviews: 287,
    duration: "3 hours",
    groupSize: "1-6 people",
    availableDates: ["2025-11-15", "2025-11-16", "2025-11-17", "2025-11-18", "2025-11-19", "2025-11-20"],
    timeSlots: [
      { id: "1", time: "09:00 AM", available: 4, maxCapacity: 6 },
      { id: "2", time: "02:00 PM", available: 5, maxCapacity: 6 },
      { id: "3", time: "04:00 PM", available: 3, maxCapacity: 6 },
    ],
  },
  {
    id: "4",
    title: "Goa Beach Adventure",
    location: "Goa, India",
    description: "Water sports and beach activities including parasailing, jet skiing, and beach volleyball.",
    image: "/goa-beach-adventure.jpg",
    price: 5999,
    rating: 4.7,
    reviews: 445,
    duration: "5 hours",
    groupSize: "2-10 people",
    availableDates: ["2025-11-15", "2025-11-16", "2025-11-17", "2025-11-18"],
    timeSlots: [
      { id: "1", time: "09:00 AM", available: 7, maxCapacity: 10 },
      { id: "2", time: "02:00 PM", available: 5, maxCapacity: 10 },
    ],
  },
]

export const promoCodeDiscounts: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  SAVE30: 0.3,
}
