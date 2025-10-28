import { mockExperiences } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experience = mockExperiences.find((exp) => exp.id === id)

  if (!experience) {
    return Response.json({ error: "Experience not found" }, { status: 404 })
  }

  return Response.json(experience)
}
