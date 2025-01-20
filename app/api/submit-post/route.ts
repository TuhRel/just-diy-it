import { updatePost } from "@/lib/actions/post.actions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, description, image, ytVideo, postId } = body

    updatePost({
      title: title,
      description: description,
      image: image,
      ytVideo: ytVideo,
      createdAt: new Date(),
      views: 0,
      postId: postId,
    })

    return NextResponse.json({ message: 'Post submitted successfully' })
    
  } catch (error) {

    console.error('Error processing request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }
}
// if (req.method === 'POST') {
//   const { title, description, imaage } = req.body

//   updatePost({
//     title: req?.body?.title,
//     description: req?.body?.description,
//     image: req?.body?.image,
//     createdAt: new Date().toLocaleDateString(),
//     views: 0,
//     plans: '',
//     postId: 99
//   })

//   return res.status(200).json({message: 'Post submitted successfully' })
// }

// return res.status(405).json({ message: 'Method not allowed' })