import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


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

export function formatViews(view: string) {
  return view.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

export function getYouTubeVideoId(url: string) {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : ''
}