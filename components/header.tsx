"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">Highway Travels</span>
        </Link>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search experiences"
            className="hidden md:block px-4 py-2 rounded-lg bg-secondary text-foreground placeholder-muted-foreground border border-border"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
            Search
          </button>
        </div>
      </div>
    </header>
  )
}
