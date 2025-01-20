import { getPostById } from '@/lib/actions/post.actions'
import { formatDate, getVideoDetails } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'


// TODO: Turn page into a Component, each type of details page will have its own component which will be conditionally rendered depending on what type of details need to be shown (e.g. video, Product, or plan)

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  const singlePost = await getPostById(id)
  if (!singlePost) return notFound()
  
  const { title, description, createdAt, views, image, ytVideo } = singlePost

  // console.log(singlePost)

  const videoDetails = await getVideoDetails(getYouTubeVideoId(ytVideo), process.env.YOUTUBE_API_KEY as string)
  // console.log(videoDetails)

  return (
    <>
      <section className="orange_container !min-h-[228px]">
        <p className="tag">{formatDate(createdAt)}</p>

        <h1 className="heading">{title}</h1>

        {/* <p className="sub-heading !max-w-3xl">{id}</p> */}
      </section>

      <section className='section_container'>

        {ytVideo ? (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(ytVideo)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='rounded-xl'></iframe>
        ) : (
          <img
          src={image}
          alt='thumbnail'
          className='w-full h-auto rounded-xl'
        />
        )}

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link href="/" className='flex gap-2 items-center mb-3'>
              <Image
                src={image}
                alt="avatar"
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className='text-20-medium'>{title}</p>
                <p className='text-16-medium !text-black-300'>{title}</p>
              </div>
            </Link>

              <p className='category-tag'>{views}</p>
          </div>

          <h3 className='text-30-bold'>{title}</h3>
          <article>
            <p>{description}</p>
          </article>
        </div>

        <hr className='divider' />
      </section>


    </>
  )
}

export default page

const getYouTubeVideoId = (url: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : ''
}