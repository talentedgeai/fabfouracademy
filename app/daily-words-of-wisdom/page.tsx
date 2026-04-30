// Revalidate every hour so today's post and recent posts update daily
export const revalidate = 3600

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import WOWPageHero from '@/components/WOWPageHero'
import WOWMonthlyThemes from '@/components/WOWMonthlyThemes'
import WOWRecent from '@/components/WOWRecent'
import JoinSignup from '@/components/JoinSignup'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Daily Words of Wisdom | Fab Four Academy',
  description:
    'Beatles-inspired insights delivered to your inbox every morning. Explore monthly journey themes and daily reflections from Fab Four Academy.',
}

export default function DailyWordsOfWisdomPage() {
  return (
    <>
      <Navbar />
      <main>
        <WOWPageHero />
        <WOWMonthlyThemes />
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
