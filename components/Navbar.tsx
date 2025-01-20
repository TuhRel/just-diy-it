import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const session = await auth()

  let admin = false

  if (session?.user?.email === process.env.ADMIN_EMAIL)
    admin = true

  return (
    <header
      className="px-5 py-3 bg-white shadow-sm font-roboto-condensed">
      <nav
        className="flex justify-between items-center">
        <Link
          href="/"
          className="overflow-hidden rounded-full">
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={30} />
        </Link>

        <div
          className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                href="/posts">
                <span>posts</span>
              </Link>
              <Link
                href="/products">
                <span>products</span>
              </Link>
              <Link
                href="/plans">
                <span>plans</span>
              </Link>

              {admin && (
                <Link
                  href="/adminStrict">
                  <span>create</span>
                </Link>
              )}

              <form action={async () => {
                "use server"

                await signOut()
              }}>
                <button
                  type="submit">
                  <span>logout</span>
                </button>
              </form>
              
              {/* Profile photo */}
              <Link
                href="/"
                className="overflow-hidden rounded-full">
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  width={48}
                  height={30} />
              </Link>
            </>
          ) : (
            <>
              <Link
              href="/posts">
                <span>videos</span>
              </Link>
              <Link
              href="/products">
                <span>products</span>
              </Link>
              <Link
              href="/plans">
                <span>plans</span>
              </Link>
              <form action={async () => {
                "use server"

                await signIn('google')
              }}>
                <button
                  type="submit">
                  <span>login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar