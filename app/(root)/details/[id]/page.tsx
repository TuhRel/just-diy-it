import { getPostById } from '@/lib/actions/post.actions'
import { formatDate, formatViews, getYouTubeVideoId } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import { notFound } from 'next/navigation'


// TODO #1: Turn page into a Component, each type of details page will have its own component which will be conditionally rendered depending on what type of details need to be shown (e.g. video, Product, or plan)

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  const singlePost = await getPostById(id)
  if (!singlePost) return notFound()
  
  const { title, description, createdAt, views, image, ytVideo, ytDetails } = singlePost

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
            <h3 className='text-30-bold'>{ytDetails ? ytDetails.title : title}</h3>

            <div className='flex gap-1.5'>
              <EyeIcon className='size-6 text-primary top-2 relative'/>
              <p className='category-tag'>{ytDetails ? formatViews(ytDetails.view) : views}</p>
            </div>
          </div>

          <article>
            <p>{ytDetails ? ytDetails.description : description}</p>
          </article>
        </div>

        <hr className='divider' />
      </section>
    </>
  )
}

export default page