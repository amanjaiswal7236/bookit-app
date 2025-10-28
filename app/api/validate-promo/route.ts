import { promoCodeDiscounts } from "@/lib/mock-data"

export async function POST(request: Request) {
  try {
    const { promoCode } = await request.json()

    if (!promoCode) {
      return Response.json({ valid: false, discount: 0 })
    }

    const discount = promoCodeDiscounts[promoCode]

    if (!discount) {
      return Response.json({ valid: false, discount: 0 })
    }

    return Response.json({ valid: true, discount: Math.round(discount * 100) })
  } catch (error) {
    return Response.json({ error: "Failed to validate promo code" }, { status: 500 })
  }
}
