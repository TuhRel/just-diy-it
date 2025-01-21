import Counter from "../models/counter.model";
import Plan from "../models/plan.model";
import Post from "../models/post.model";
import Product from "../models/product.model";
import { connectDb } from '../mongoose'
import { getVideoDetails, getYouTubeVideoId } from "../utils";


interface Params {
  postId: number;
  createdAt: Date;
  title: string;
  description: string;
  image: string;
  ytVideo?: string;
  ytDetails?: object;
  views: number;
}

/* Create or Update a Post in MongoDB */
export async function updatePost({
  postId,
  createdAt,
  title,
  description,
  image,
  ytVideo,
  ytDetails,
  views,
}: Params): Promise <void> {
  connectDb("just-diy-it")

  try {
    if (!postId) {
      const counter = await Counter.findOneAndUpdate(
        { model: "Post", field: "postId" },
        { $inc: { count: 1 } },
        { new: true, upsert: true },
      )

      postId = counter.count
    }
    
    if (ytVideo) {
      const videoDetails = await getVideoDetails(await getYouTubeVideoId(ytVideo), process.env.YOUTUBE_API_KEY as string)
      ytDetails = videoDetails
    }

    await Post.findOneAndUpdate(
      { postId },
      {
        postId,
        createdAt,
        title,
        description,
        image,
        ytVideo,
        ytDetails,
        views,
      },
      { upsert: true },
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not create/update post: ${error.message}`)
    } else {
      console.error("An unknown error occurred")
    }
  }
}

/* GET all post(s) in the MongoDB databse */
export async function getPosts(toFind: string) {
  connectDb("just-diy-it")

  try {
    const posts = await Post.find({ title: new RegExp(toFind, "i")})
    return posts
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get posts" ${error.message}`)
    } else {
      console.error("An unknown error occurred")
    }
  }
}

export async function getPostById(id: string) {
  connectDb("just-diy-it")

  try {
    const post = await Post.findById(id)
    return post
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get post by ID: ${error.message}`)
    } else {
      console.error("An unknown error occurred")
    }
  }
}

export async function getHomePageContent(toFind: string) {
  await connectDb("just-diy-it")

  try {
    const posts = await Post.find({ title: new RegExp(toFind, "i")})
    const products = await Product.find({ title: new RegExp(toFind, "i")})
    const plans = await Plan.find({ title: new RegExp(toFind, "i")})
    return { posts, products, plans }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get products ${error.message}`)
    } else {
      console.error("An unknown error occurred.")
    }
  }
}