import { updateProduct } from "@/lib/actions/product.action"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, description, image, price, productId } = body

    await updateProduct({
      title: title,
      description: description,
      image: image,
      price: price,
      productId: productId,
    })

    return NextResponse.json({ message: 'Post submitted successfully' })
    
  } catch (error) {

    console.error('Error processing request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }
}