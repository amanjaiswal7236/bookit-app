"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface DateSelectorProps {
  dates: string[]
  selectedDate: string | null
  onDateChange: (date: string) => void
}

export function DateSelector({ dates, selectedDate, onDateChange }: DateSelectorProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleDates = dates.slice(startIndex, startIndex + 3)

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(dates.length - 3, startIndex + 1))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="p-2 rounded-lg border border-border hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex gap-2 flex-1">
        {visibleDates.map((date) => {
          const { day, date: dateNum, month } = formatDate(date)
          const isSelected = selectedDate === date

          return (
            <button
              key={date}
              onClick={() => onDateChange(date)}
              className={`flex-1 p-3 rounded-lg border transition ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary"
              }`}
            >
              <div className="text-xs font-medium">{day}</div>
              <div className="text-sm font-bold">{dateNum}</div>
              <div className="text-xs">{month}</div>
            </button>
          )
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={startIndex >= dates.length - 3}
        className="p-2 rounded-lg border border-border hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
