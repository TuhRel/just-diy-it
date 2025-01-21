import PlanCard, { PlanCardType } from '@/components/PlanCard'
import { getPlans } from '@/lib/actions/plan.actions'


const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  /** Search query obtained from the search bar */
  const query = (await searchParams).query
  const params = { search: query || '' }

  /** Get all post or post from search results */
  const plans = (await getPlans(`${params.search}`)) || []

  return (
    <>
      {/* Hero Section */}
      <section className="orange_container !min-h-[228px]">
        <p className="tag">Just DIY It</p>

        <h1 className="heading">Build Plans</h1>

        <p className="sub-heading !max-w-3xl">
          Gain access to my fully detailed build plans.
        </p>

      {/* <SearchForm /> */}
      </section>

      {/* Plans Section */}
      <section className="section_container">
        {/* <p className="text-30-semibold">
          {query ? `Content results for "${query}"` : "Latest Content"}
        </p> */}

        <ul className="mt-7 card_grid">
          {plans?.length > 0 ? (
            plans.map((plan: PlanCardType) => (
              <PlanCard
                key={plan?.id}
                plan={plan} />
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