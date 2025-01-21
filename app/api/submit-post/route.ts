import { updatePost } from "@/lib/actions/post.actions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, description, image, ytVideo, postId } = body

    updatePost({
      postId: postId,
      createdAt: new Date(),
      title: title,
      description: description,
      image: image,
      ytVideo: ytVideo,
      views: 0,
    })

    return NextResponse.json({ message: 'Post submitted successfully' })
    
  } catch (error) {

    console.error('Error processing request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }
}