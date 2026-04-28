import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import WOWPageHero from '@/components/WOWPageHero'
import WOWMonthlyThemes from '@/components/WOWMonthlyThemes'
import WOWRecent from '@/components/WOWRecent'
import WOWCTA from '@/components/WOWCTA'
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
        <WOWCTA />
      </main>
      <Footer />
    </>
  )
}
