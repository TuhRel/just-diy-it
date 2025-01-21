import PostCard, { PostCardType } from "@/components/PostCard"
import { getPosts } from "@/lib/actions/post.actions"


const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  /** Search query obtained from the search bar */
  const query = (await searchParams).query
  const params = { search: query || '' }

  /** Get all post or post from search results */
  const videos = (await getPosts(`${params.search}`)) || []
  const sortedVideos = videos?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      {/* Hero Section */}
      <section className="orange_container !min-h-[228px]">
        <p className="tag">Just DIY It</p>

        <h1 className="heading">Posts</h1>

        <p className="sub-heading !max-w-3xl">
          Watch videos to all of my personal DIY projects.
        </p>

        {/* <SearchForm /> */}
      </section>

      <section className="section_container">
        {/* <p className="text-30-semibold">
          {query ? `Content results for "${query}"` : "Latest Content"}
        </p> */}

        <ul className="mt-7 card_grid">
          {sortedVideos?.length > 0 ? (
            sortedVideos.map((video: PostCardType) => (
              <PostCard
                key={video?.id}
                post={video} />
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