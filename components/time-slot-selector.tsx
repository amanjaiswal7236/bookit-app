"use client"

import type { TimeSlot } from "@/lib/types"

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[]
  selectedTime: string | null
  onTimeChange: (timeId: string) => void
}

export function TimeSlotSelector({ timeSlots, selectedTime, onTimeChange }: TimeSlotSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => onTimeChange(slot.id)}
          disabled={slot.available === 0}
          className={`p-3 rounded-lg border transition ${
            selectedTime === slot.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          <div className="font-medium text-sm">{slot.time}</div>
          <div className="text-xs opacity-75">{slot.available} spots left</div>
        </button>
      ))}
    </div>
  )
}
