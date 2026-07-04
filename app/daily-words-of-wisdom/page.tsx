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

const MONTH_ORDER = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default async function DailyWordsOfWisdomPage() {
  const allPosts = await fetchMonthlyPosts()

  // One entry per calendar month — most recent year wins
  const monthMap = new Map<string, (typeof allPosts)[0]>()
  for (const p of allPosts) {
    const name = p.month.split(' ')[0]
    const existing = monthMap.get(name)
    if (!existing || parsePostDate(p.month) > parsePostDate(existing.month)) {
      monthMap.set(name, p)
    }
  }
  const posts = MONTH_ORDER.filter(m => monthMap.has(m)).map(m => monthMap.get(m)!)

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
