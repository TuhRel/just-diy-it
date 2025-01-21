import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Button } from './ui/button'


interface YTDetails {
  title: string;
  description: string;
  thumbnail: string;
  views: string;
}

export type PostCardType = {
  id: string,
  createdAt: string,
  description: string,
  image: string,
  title: string,
  ytVideo: string,
  ytDetails: YTDetails,
  views: number,
}

const PostCard = async ({ post }: { post: PostCardType }) => {
  const {
    id,
    createdAt,
    description,
    image,
    title,
    ytDetails,
  } = post

  return (
    <li className='project-card group'>
      <div className='flex-between'>
        <p className='project-card_date'>
          {formatDate(createdAt)}
        </p>

        {/* <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div> */}
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          {/* <Link href={`/`}>
            <p className='text-16-medium line-clamp-1'>author</p>
          </Link> */}
          <Link href={`/details/${id}`}>
            <h3 className='text-26-semibold line-clamp-1'>
              {title.toUpperCase()}
            </h3>
          </Link>
        </div>
        {/* <Link href={`/`}>
          <Image
            src="https://placehold.co/48x48" 
            alt="placeholder"
            width={48} 
            height={48}
            className='rounded-full' />
        </Link> */}
      </div>

      <Link href={`/details/${id}`}>
        <p className='project-card_desc'>
          {description}
        </p>
        
        {ytDetails ? (
          <img
          src={ytDetails.thumbnail}
          alt='placeholder'
          className='project-card_img' />
        ) : (
          <img
          src={image}
          alt='placeholder'
          className='project-card_img' />
        )}
        
      </Link>

      <div className='flex-between gap-3 mt-5 !justify-end'>
        {/* <Link href={`/?query=${plans.toLowerCase()}`}>
          <p className='text-16-medium'>
            {plans}
          </p>
        </Link> */}

        <Button className='project-card_btn' asChild>
          <Link href={`/details/${id}`}>
            View Post
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default PostCard