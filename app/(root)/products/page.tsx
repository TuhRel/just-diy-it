import ProductCard, { ProductCardType } from '@/components/ProductCard'
import { getProducts } from '@/lib/actions/product.action'


const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {

  /** Search query obtained from the search bar */
  const query = (await searchParams).query
  const params = { search: query || '' }

  /** Get all post or post from search results */
  const products = (await getProducts(`${params.search}`)) || []
  
  
  return (
    <>
      {/* Hero Section */}
      <section className="orange_container !min-h-[228px]">
        <p className="tag">Just DIY It</p>

        <h1 className="heading">Products</h1>

        <p className="sub-heading !max-w-3xl">
          Purchase any of my hand-crafted products.
        </p>

        {/* <SearchForm /> */}
      </section>

      <section className="section_container">
        {/* <p className="text-30-semibold">
          {query ? `Content results for "${query}"` : "Latest Content"}
        </p> */}

        <ul className="mt-7 card_grid">
          {products?.length > 0 ? (
            products.map((product: ProductCardType) => (
              <ProductCard
                key={product?.id}
                product={product} />
            ))
          ) : (
            <p className="no-results">No content found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default Page