import { updatePlan } from "@/lib/actions/plan.actions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, description, image, planId } = body

    updatePlan({
      title: title,
      description: description,
      image: image,
      planId: planId,
    })

    return NextResponse.json({ message: 'Post submitted successfully' })
    
  } catch (error) {

    console.error('Error processing request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }
}