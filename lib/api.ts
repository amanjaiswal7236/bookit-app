// Mock API client - In production, this would call real endpoints
const API_BASE = "/api"

export const experienceApi = {
  async getAll(): Promise<any[]> {
    const response = await fetch(`${API_BASE}/experiences`)
    if (!response.ok) throw new Error("Failed to fetch experiences")
    return response.json()
  },

  async getById(id: string): Promise<any> {
    const response = await fetch(`${API_BASE}/experiences/${id}`)
    if (!response.ok) throw new Error("Failed to fetch experience")
    return response.json()
  },
}

export const bookingApi = {
  async create(data: any): Promise<any> {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create booking")
    return response.json()
  },

  async validatePromoCode(code: string): Promise<{ valid: boolean; discount: number }> {
    const response = await fetch(`${API_BASE}/promo-codes/${code}`)
    if (!response.ok) return { valid: false, discount: 0 }
    return response.json()
  },
}
