import { auth } from "@/auth"
import FormSelector from "@/components/FormSelector"
import { redirect } from "next/navigation"


const page = async () => {
  const session = await auth()

  if (session?.user?.email !== process.env.ADMIN_EMAIL) redirect("/")

  return (
    <>
      <section className="orange_container !min-h-[228px]">
        <p className="tag">Just DIY It</p>
        <h1 className="heading">Submit Post</h1>
      </section>

      <FormSelector />
    </>
  )
}

export default page