// Always SSR so getTodaysPost() runs with the real current date on every request
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import WOWPageHero from '@/components/WOWPageHero'
import WOWMonthlyThemes from '@/components/WOWMonthlyThemes'
import WOWRecent from '@/components/WOWRecent'
import JoinSignup from '@/components/JoinSignup'
import Footer from '@/components/Footer'
import { fetchMonthlyPosts } from '@/lib/monthly-theme-fetcher'
import { parsePostDate } from '@/lib/wow-utils'

export const metadata: Metadata = {
  title: 'Daily Words of Wisdom | Fab Four Academy',
  description:
    'Beatles-inspired insights delivered to your inbox every morning. Explore monthly journey themes and daily reflections from Fab Four Academy.',
}

export default async function DailyWordsOfWisdomPage() {
  const allPosts = await fetchMonthlyPosts()
  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const posts = allPosts
    .filter(p => parsePostDate(p.month) <= currentMonthStart)
    .sort((a, b) => parsePostDate(a.month).getTime() - parsePostDate(b.month).getTime())

  return (
    <>
      <Navbar />
      <main>
        <WOWPageHero />
        <WOWMonthlyThemes posts={posts} />
        <WOWRecent />
        <JoinSignup
          source="/daily-words-of-wisdom"
          heading="Sign up for the Daily Words of Wisdom"
          subheading="One reflection a morning, free, forever. Unsubscribe any time."
        />
      </main>
      <Footer />
    </>
  )
}
