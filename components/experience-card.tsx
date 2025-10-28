"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import type { Experience } from "@/lib/types"

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link href={`/details/${experience.id}`}>
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer h-full flex flex-col">
        <div className="relative w-full h-48 bg-muted">
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-foreground mb-1">{experience.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{experience.location}</p>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{experience.rating}</span>
            <span className="text-xs text-muted-foreground">({experience.reviews})</span>
          </div>

          <div className="mt-auto">
            <p className="text-lg font-bold text-foreground mb-3">From ₹{experience.price}</p>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
