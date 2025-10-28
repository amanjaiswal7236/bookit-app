const promoCodes: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  WELCOME: 0.15,
}

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const discount = promoCodes[code.toUpperCase()]

  if (!discount) {
    return Response.json({ error: "Invalid promo code" }, { status: 404 })
  }

  return Response.json({ valid: true, discount })
}
