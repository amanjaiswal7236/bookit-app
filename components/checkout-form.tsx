"use client"

import type React from "react"

import { useState } from "react"
import { Mail, User, Tag } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: { fullName: string; email: string; promoCode?: string }) => void
  isSubmitting: boolean
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [promoError, setPromoError] = useState("")
  const [promoValid, setPromoValid] = useState(false)

  const handleValidatePromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("")
      setPromoValid(false)
      return
    }

    try {
      const response = await fetch("/api/validate-promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode }),
      })

      const data = await response.json()

      if (data.valid) {
        setPromoError("")
        setPromoValid(true)
      } else {
        setPromoError("Invalid promo code")
        setPromoValid(false)
      }
    } catch (err) {
      setPromoError("Failed to validate promo code")
      setPromoValid(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim()) {
      alert("Please fill in all required fields")
      return
    }

    onSubmit({
      fullName,
      email,
      promoCode: promoCode.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Promo Code</h2>

        <div className="space-y-3">
          <div className="relative">
            <Tag className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value.toUpperCase())
                setPromoError("")
                setPromoValid(false)
              }}
              placeholder="Enter promo code (optional)"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {promoCode && (
            <button
              type="button"
              onClick={handleValidatePromo}
              className="text-sm text-primary hover:opacity-80 transition font-medium"
            >
              Validate Code
            </button>
          )}

          {promoValid && (
            <div className="text-sm text-success bg-success/10 p-3 rounded-lg">✓ Promo code applied successfully</div>
          )}

          {promoError && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{promoError}</div>}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Try codes: <span className="font-mono">SAVE10</span>, <span className="font-mono">SAVE20</span>, or{" "}
          <span className="font-mono">SAVE30</span>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Complete Booking"
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        By completing this booking, you agree to our Terms & Conditions
      </p>
    </form>
  )
}
