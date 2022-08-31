import Head from 'next/head'

type HomeProps = {
  allPostsData: {
    slug: string
    publishedAt: string
    title: string
    content: string
    description?: string
  }[]
}

export default function Home({ allPostsData }: HomeProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Web - Outstatic Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="inline-block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
            Outstatic Example
          </span>{' '}
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <a href="https://outstatic.com/docs">
            <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6">
              Read the docs
              <span className="ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
                →
              </span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          {allPostsData.map(({ slug, publishedAt, title, description }) => (
            <Link key={slug} href={`/posts/${slug}`}>
              <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                <small>{formatDate(publishedAt)}</small>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {title}
                </h2>
                <p className="font-normal text-gray-700">{description}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

import { getContentType } from 'outstatic/server'
import Link from 'next/link'

export async function getStaticProps() {
  const allPostsData = getContentType('posts')
  return {
    props: {
      allPostsData: allPostsData || []
    }
  }
}
