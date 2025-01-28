import Link from "next/link"
import { Button } from "./ui/button"
import { DollarSignIcon } from "lucide-react"
import DeleteButton from "./DeleteButton"
import { auth } from "@/auth"


export type ProductCardType = {
  productId: number,
  id: string,
  description: string,
  image: string,
  price: string,
  title: string,
}

const ProductCard = async ({ product }: { product: ProductCardType }) => {
  const session = await auth()
  let admin = false
  if (session?.user?.email === process.env.ADMIN_EMAIL) admin = true

  const {
    id,
    description,
    image,
    price,
    title,
  } = product

  return (
    <li className='project-card group'>
    <div className='flex-between !justify-end'>
      {/* <p className='project-card_date'>
        {productId}
      </p> */}

      <div className='flex gap-1'>
        <DollarSignIcon className='size-5 text-primary' />
        <span className='text-16-medium'>{price}</span>
      </div>
    </div>

    <div className='flex-between mt-5 gap-5'>
      <div className='flex-1'>
        <Link href={`/product-details/${id}`}>
          <h3 className='text-26-semibold line-clamp-1'>
            {title}
          </h3>
        </Link>
      </div>
    </div>

    <Link href={`/product-details/${id}`}>
      <p className='project-card_desc'>
        {description}
      </p>

      <img
        src={image}
        alt='placeholder'
        className='project-card_img' />
    </Link>

    <div className={!admin ? `flex-between gap-3 mt-5 !justify-end` : `flex-between gap-3 mt-5`}>
        {admin && (
          <DeleteButton id={id} resourceType='remove-plan' />
        )}

      <Button className='project-card_btn' asChild>
        <Link href={`/product-details/${id}`}>
          View Product
        </Link>
      </Button>
    </div>
  </li>
  )
}

export default ProductCard