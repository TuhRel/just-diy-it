import PlanCard, { PlanCardType } from "@/components/PlanCard";
import PostCard, { PostCardType } from "@/components/PostCard";
import ProductCard, { ProductCardType } from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";
import { getHomePageContent } from "@/lib/actions/post.actions";


// TODO: add option as admin to delete and edit post
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  /** Search query obtained from the search bar */
  const query = (await searchParams).query
  const params = { search: query || '' }

  const data = await getHomePageContent(`${params.search}`)
  const { posts, products, plans } = data || { posts: [], products: [], plans: [] }
  const sortedPosts = posts?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const latestPosts = sortedPosts?.slice(0, 3)
  
  return (
    <>
      {/* Hero Section */}
      <section className="orange_container">
        <p className="tag">Create. Build. Inspire</p>

        <h1 className="heading">Your Hub for <br /> Everything DIY.</h1>
        
        <p className="sub-heading !max-w-3xl">
          Watch step-by-step DIY videos or purchase products and build plans!
        </p>

        <SearchForm query={query} />
      </section>

      {/* Featured Content Section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Content results for "${query}"` : "Latest Content"}
        </p>

        <ul className="mt-7 card_grid">
          {latestPosts?.length > 0 ? (
            latestPosts.map((post: PostCardType) => (
              <PostCard
                key={post?.id}
                post={post} />
            ))
          ) : (
            <p className="no-results">No content found</p>
          )}
        </ul>
      </section>

      {/* Featured Products Section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Product results for "${query}"` : "Featured Products"}
        </p>

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

      {/* Featured Plans Section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Plan results for "${query}"` : "Popular Plans"}
        </p>

        <ul className="mt-7 card_grid">
          {plans?.length > 0 ? (
            plans.map((plan: PlanCardType) => (
              <PlanCard
                key={plan?.planId}
                plan={plan} />
            ))
          ) : (
            <p className="no-results">No content found</p>
          )}
        </ul>
      </section>
    </>
  );
}
