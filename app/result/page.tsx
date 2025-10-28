"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CheckCircle, XCircle } from "lucide-react"

interface BookingResult {
  id: string
  fullName: string
  status: "confirmed" | "failed"
  total: number
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<BookingResult | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("bookingResult")
    if (!data) {
      router.push("/")
      return
    }
    setResult(JSON.parse(data))
  }, [router])

  if (!result) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    )
  }

  const isSuccess = result.status === "confirmed"

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-card rounded-lg p-8 shadow-sm text-center">
          {isSuccess ? (
            <>
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed</h1>
              <p className="text-muted-foreground mb-6">Ref ID: {result.id}</p>
              <p className="text-lg font-semibold text-foreground mb-8">{result.fullName}</p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <XCircle className="w-16 h-16 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Booking Failed</h1>
              <p className="text-muted-foreground mb-6">Please try again</p>
            </>
          )}

          <button
            onClick={() => {
              sessionStorage.removeItem("bookingData")
              sessionStorage.removeItem("bookingResult")
              router.push("/")
            }}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}
