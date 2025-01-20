import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { connectDb } from "./mongoose"
// import Product from "./models/product.model"
// import Plan from "./models/plan.model"
// import Post from "./models/post.model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

export async function getVideoDetails(videoId: string, apiKey: string) {
  const url = `${process.env.YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`)
    }

    const data = await response.json()
    if (data.items && data.items.length > 0) {
      const video = data.items[0]
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
        view: video.statistics.viewCount,
      }
    } else {
      throw new Error("No video found with the given ID")
    }
  } catch (error) {
    console.error("Error fetching video details:", error)
    throw error
  }
}

// export async function getHomePageContent() {
//   connectDb("just-diy-it")

//   try {
//     const posts = await Post.find()
//     const products = await Product.find()
//     const plans = await Plan.find()
//     return { posts, products, plans }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(`Could not get products ${error.message}`)
//     } else {
//       console.error("An unknown error occurred.")
//     }
//   }
// }