import Link from "next/link"
import { Button } from "./ui/button"
import { DollarSignIcon } from "lucide-react"
import DeleteButton from "./DeleteButton"


export type PlanCardType = {
  id: string,
  planId: number,
  description: string,
  image: string,
  title: string,
  price: number,
}

const PlanCard = async ({ plan }: { plan: PlanCardType }) => {
  const {
    id,
    description,
    image,
    title,
    price,
  } = plan

  return (
    <li className='project-card group'>
      <div className='flex-between !justify-end'>
        <div className='flex gap-1.5'>
          <DollarSignIcon className='size-5 text-primary' />
          <span className='text-16-medium'>{price}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/plan-details/${id}`}>
            <h3 className='text-26-semibold line-clamp-1'>
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <Link href={`/plan-details/${id}`}>
        <p className='project-card_desc'>
          {description}
        </p>

        <img
          src={image}
          alt='placeholder'
          className='project-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <DeleteButton id={id} resourceType="plans" />

        <Button className='project-card_btn' asChild>
          <Link href={`/plan-details/${id}`}>
            View Plan
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default PlanCard