"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { ExperienceCard } from "@/components/experience-card"
import { Loader2 } from "lucide-react"
import type { Experience } from "@/lib/types"

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experiences")
        if (!response.ok) throw new Error("Failed to fetch experiences")
        const data = await response.json()
        setExperiences(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Discover Amazing Travel Experiences
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Book unique adventures and create unforgettable memories across India
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Experiences</h2>
          <p className="text-muted-foreground">{experiences.length} amazing experiences available for booking</p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading experiences...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg mb-8">
            <p className="font-medium">Error loading experiences</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No experiences available at the moment.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About Highway Travels</h3>
              <p className="text-sm text-muted-foreground">
                Discover and book unique travel experiences across India with trusted local guides.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Highway Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
