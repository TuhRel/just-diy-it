import { getPlanById } from '@/lib/actions/plan.actions'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'


// TODO: Turn page into a Component, each type of details page will have its own component which will be conditionally rendered depending on what type of details need to be shown (e.g. video, Product, or plan)

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  const singlePlan = await getPlanById(id)
  if (!singlePlan) return notFound()
  
  const { title, description, image } = singlePlan

  // console.log(singlePlan)

  return (
    <>
      <section className="orange_container !min-h-[228px]">
        {/* <p className="tag">{formatDate(createdAt)}</p> */}

        <h1 className="heading">{title}</h1>

        {/* <p className="sub-heading !max-w-3xl">{id}</p> */}
      </section>

      <section className='section_container'>

          <img
          src={image}
          alt='thumbnail'
          className='w-full h-auto rounded-xl'
        />

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

              <p className='category-tag'>{title}</p>
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